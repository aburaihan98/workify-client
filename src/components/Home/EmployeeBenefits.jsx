const EmployeeBenefits = () => {
  const benefits = [
    {
      title: "Health Insurance",
      icon: "🏥",
      description: "Comprehensive health coverage for all employees.",
    },
    {
      title: "Flexible Work Hours",
      icon: "⏳",
      description: "Balance work and life with our flexible policies.",
    },
    {
      title: "Yearly Bonuses",
      icon: "💰",
      description: "Performance-based bonuses every year.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto text-center py-6 md:py-12">
      <h2 className="text-3xl font-bold mb-4 md:mb-8">
        Employee Benefits & Perks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((perk, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg text-center"
          >
            <div className="text-5xl">{perk.icon}</div>
            <h3 className="text-xl font-semibold mt-4 text-gray-700">
              {perk.title}
            </h3>
            <p className="text-gray-500 mt-2">{perk.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployeeBenefits;
