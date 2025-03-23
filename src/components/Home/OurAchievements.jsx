const achive = [
  {
    title: "10+ Years",
    desc: "Experience in the industry",
    icon: "⏳",
  },
  {
    title: "500+ Clients",
    desc: "Satisfied with our services",
    icon: "🤝",
  },
  {
    title: "1000+ Projects",
    desc: "Successfully delivered",
    icon: "📦",
  },
  {
    title: "Total Employees",
    count: "250+",
    icon: "👥",
  },
  {
    title: "Employee Satisfaction",
    count: "92%",
    icon: "😊",
  },
  {
    title: "Projects Completed",
    count: "150+",
    icon: "🚀",
  },
];

function OurAchievements() {
  return (
    <section className="py-12 text-white bg-gradient-to-l from-[#078aa5] to-[#03ab82]">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-center text-5xl font-extrabold tracking-wide mb-8">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achive?.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-6xl">{item.icon}</div>
              <h3 className="text-3xl font-semibold  mt-4">{item.title}</h3>
              {item.count ? (
                <p className="text-xl  mt-2">{item.count}</p>
              ) : (
                <p className="text-xl  mt-2">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurAchievements;
