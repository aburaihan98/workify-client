import { Carousel } from "@material-tailwind/react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, ExampleCorp",
      feedback:
        "This company has transformed the way we work. Their services are reliable, and the team is highly professional!",
      image:
        "https://cdn.pixabay.com/photo/2021/04/26/09/30/man-6208470_640.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "HR Manager, TechWorld",
      feedback:
        "The support and service are outstanding. I highly recommend them to anyone looking for top-notch solutions.",
      image:
        "https://cdn.pixabay.com/photo/2020/04/15/16/58/smile-5047506_640.jpg",
    },
    {
      id: 3,
      name: "Alex Johnson",
      position: "Developer, StartUp Inc.",
      feedback:
        "Amazing experience working with this team. They understand client needs and deliver beyond expectations.",
      image:
        "https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_640.jpg",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="w-11/12 mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          What Our Clients Say
        </h2>
        <Carousel className="">
          {testimonials.map((item) => (
            <div key={item.id} className="relative h-[500px]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full  rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-sm font-medium mb-4">{item.position}</p>
                <p className="text-center italic max-w-lg">{item.feedback}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
