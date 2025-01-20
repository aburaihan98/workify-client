import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

function ContactUs() {
  const [role, isLoading] = useRole();
  const axiosSecure = useAxiosSecure();
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

  // admin logic
  const { data: visitorOpinions = [] } = useQuery({
    queryKey: ["visitor-opinions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contact");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (role === "admin") {
    return (
      <div className="p-4 w-11/12 mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Visitor Messages
        </h1>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Email</th>
                <th className="border border-gray-300 p-2 text-left">
                  Message
                </th>
                <th className="border border-gray-300 p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {visitorOpinions.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{msg.email}</td>
                  <td className="border border-gray-300 p-2">{msg.message}</td>
                  <td className="border border-gray-300 p-2">{msg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* Company Address */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
            <p className="mt-2 text-gray-600">We'd love to hear from you!</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800">Our Company</h3>
            <p className="mt-2 text-gray-600">
              1234 Street Name, City, Country
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactUs;
