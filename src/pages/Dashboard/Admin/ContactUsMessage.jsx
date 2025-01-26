import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function ContactUsMessage() {
  const axiosSecure = useAxiosSecure();
  // admin logic
  const { data: visitorOpinions = [], isLoading } = useQuery({
    queryKey: ["visitor-opinions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contact");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 w-11/12 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Visitor Messages</h1>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Message</th>
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
}

export default ContactUsMessage;
