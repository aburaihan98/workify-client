import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
    <div className="py-6 md:py-12">
      <motion.h2
        animate={{ x: 0 }}
        initial={{ x: -100 }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        className="text-4xl font-bold text-center mb-4 md:mb-8"
      >
        Visitor Messages
      </motion.h2>

      {/* Responsive Table Container */}
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 100 }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        className="overflow-x-auto"
      >
        <table className="min-w-full table-auto overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {visitorOpinions.map((msg) => (
              <tr
                key={msg.id}
                className=" border-primary hover:bg-gray-100 hover:text-primary"
              >
                <td className="border py-4 px-6">{msg.email}</td>
                <td className="border py-4 px-6">{msg.message}</td>
                <td className="border py-4 px-6">{msg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default ContactUsMessage;
