import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question:
      "How can I manage a multi-national workforce in HR software while providing a localized experience for my people?",
    answer:
      "You can use HR software that offers localization settings, multi-language support, and compliance with different country regulations. This allows you to create tailored experiences for employees across different regions.",
  },
  {
    question: "Can I manage local and global payroll with Bob?",
    answer:
      "Yes, Bob provides payroll management solutions for both local and international teams, including features for calculating salaries, taxes, benefits, and compliance support across various countries.",
  },
  {
    question: "Does Bob support remote onboarding?",
    answer:
      "Absolutely! Bob offers remote onboarding features including digital document signing, task automation, and self-service options for employees. This enables smooth onboarding from any location.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 w-11/12 mx-auto">
      <h2 className="text-center text-5xl font-extrabold tracking-wide mb-8">
        Popular FAQ
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* FAQ Section */}
        <div className="flex-1 space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <FaChevronUp className="w-7 h-7 text-blue-500" />
                ) : (
                  <FaChevronDown className="w-7 h-7 text-blue-500" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-6 text-lg text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
