const WorkplaceInsights = () => {
  const insights = [
    { title: "Total Employees", count: "250+", icon: "👥" },
    { title: "Employee Satisfaction", count: "92%", icon: "😊" },
    { title: "Projects Completed", count: "150+", icon: "🚀" },
  ];

  return (
    <section className="w-11/12 mx-auto text-center py-10">
      <h2 className="text-3xl font-bold mb-6">
        Workplace Insights & Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg text-center"
          >
            <div className="text-5xl">{stat.icon}</div>
            <h3 className="text-2xl font-semibold mt-4">{stat.count}</h3>
            <p className="text-gray-500 mt-2">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkplaceInsights;
