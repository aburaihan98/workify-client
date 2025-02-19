import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function ContactUs() {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //  users logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    const contactInfo = { email, message };

    axiosPublic
      .post("/contact", contactInfo)
      .then(() => {
        toast.success("Your message has been sent successfully");
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto p-4 md:p-8 rounded-lg shadow-lg">
        {/* Company Address */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Contact Us</h2>
          <p className="mt-2">We'd love to hear from you!</p>
        </div>

        <div className="p-4 rounded-lg mb-8">
          <h3 className="text-xl font-semibold">Our Company</h3>
          <p className="mt-2">1234 Street Name, City, Country</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-primary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium ">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
              className="text-primary mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn w-full bg-primary text-white py-2 px-4 rounded-md hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
