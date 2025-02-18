const MeetOurTeam = () => {
  const employees = [
    {
      name: "John Doe",
      position: "HR Manager",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      position: "Senior Developer",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Michael Brown",
      position: "Project Manager",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="w-11/12 mx-auto text-center py-10">
      <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
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
            <h3 className="text-xl font-semibold">{emp.name}</h3>
            <p className="text-gray-500">{emp.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;
