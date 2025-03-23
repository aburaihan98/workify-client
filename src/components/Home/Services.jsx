import React from "react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Workflow Monitoring",
      description:
        "Track and monitor the progress of employee tasks efficiently in real-time.",
      icon: "📊",
    },
    {
      id: 2,
      title: "Salary Management",
      description:
        "Manage salaries, payment histories, and ensure timely payments to employees.",
      icon: "💰",
    },
    {
      id: 3,
      title: "Employee Records",
      description:
        "Maintain comprehensive records of employees, including designations, roles, and bank details.",
      icon: "🗂️",
    },
    {
      id: 4,
      title: "Performance Analysis",
      description:
        "Analyze employee performance to identify strengths and areas for improvement.",
      icon: "📈",
    },
  ];

  return (
    <section
      className="py-12 bg-gradient-to-l from-[#078aa5] to-[#03ab82]"
      id="services"
    >
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-white text-center text-5xl font-extrabold tracking-wide mb-8">
          Our Services
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-gray-50"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
