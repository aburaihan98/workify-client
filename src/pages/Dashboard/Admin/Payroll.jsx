function Payroll() {
  // const [employees, setEmployees] = useState([
  //     {
  //       id: 1,
  //       name: "John Doe",
  //       salary: "$3000",
  //       month: "January",
  //       year: "2025",
  //       paymentDate: "",
  //       isPaid: false,
  //     },
  //     {
  //       id: 2,
  //       name: "Jane Smith",
  //       salary: "$3200",
  //       month: "January",
  //       year: "2025",
  //       paymentDate: "",
  //       isPaid: false,
  //     },
  //   ]);

  //   const handlePayment = (id) => {
  //     setEmployees((prev) =>
  //       prev.map((employee) =>
  //         employee.id === id
  //           ? {
  //               ...employee,
  //               paymentDate: new Date().toLocaleDateString(),
  //               isPaid: true,
  //             }
  //           : employee
  //       )
  //     );
  //   };

  return (
    <div className="w-11/12 m-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Employee Payment Requests
      </h1>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Salary</th>
            <th className="py-3 px-6 text-left">Month</th>
            <th className="py-3 px-6 text-left">Year</th>
            <th className="py-3 px-6 text-left">Payment Date</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {/* {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-100">
              <td className="py-4 px-6">{employee.name}</td>
              <td className="py-4 px-6">{employee.salary}</td>
              <td className="py-4 px-6">{employee.month}</td>
              <td className="py-4 px-6">{employee.year}</td>
              <td className="py-4 px-6">
                {employee.paymentDate || (
                  <span className="text-red-500 font-medium">Pending</span>
                )}
              </td>
              <td className="py-4 px-6 text-center">
                <button
                  onClick={() => handlePayment(employee.id)}
                  className={`px-4 py-2 rounded-md text-white ${
                    employee.isPaid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={employee.isPaid}
                >
                  {employee.isPaid ? "Paid" : "Pay"}
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default Payroll;
