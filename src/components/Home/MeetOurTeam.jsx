const MeetOurTeam = () => {
  const employees = [
    {
      name: "John Doe",
      position: "HR Manager",
      img: "https://cdn.pixabay.com/photo/2017/08/25/03/14/politics-2679002_640.jpg",
    },
    {
      name: "Jane Smith",
      position: "Senior Developer",
      img: "https://cdn.pixabay.com/photo/2018/05/15/22/30/smith-3404450_640.jpg",
    },
    {
      name: "Michael Brown",
      position: "Project Manager",
      img: "https://cdn.pixabay.com/photo/2017/10/10/16/33/shaman-2837843_640.jpg",
    },
  ];

  return (
    <section className="w-11/12 mx-auto text-center py-6 md:py-12">
      <h2 className="text-3xl font-bold mb-4 md:mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employees.map((emp, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg text-center"
          >
            <img
              src={emp.img}
              alt={emp.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">{emp.name}</h3>
            <p className="text-gray-500">{emp.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;
