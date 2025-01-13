import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const totalPrice = 1;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setIsProcessing(false);

    if (error) {
      setPaymentError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Handle success (you can send paymentMethod to your server)
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    console.log("confirm error", confirmError);
    console.log("payment intent", paymentIntent);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d0d7df",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {paymentError && (
          <div className="text-red-600 text-sm text-center">{paymentError}</div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none ${
            isProcessing || !stripe ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
