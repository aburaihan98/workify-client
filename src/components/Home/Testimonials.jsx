import { StarIcon } from "@heroicons/react/24/solid";
import { Carousel } from "@material-tailwind/react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, ExampleCorp",
      company: "ExampleCorp",
      experience: "5+ Years Working with Us",
      rating: 5,
      feedback:
        "This company has transformed the way we work. Their services are reliable, and the team is highly professional!",
      image:
        "https://cdn.pixabay.com/photo/2021/04/26/09/30/man-6208470_1280.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "HR Manager, TechWorld",
      company: "TechWorld",
      experience: "3 Years as a Happy Client",
      rating: 4,
      feedback:
        "The support and service are outstanding. I highly recommend them to anyone looking for top-notch solutions.",
      image:
        "https://cdn.pixabay.com/photo/2022/01/15/15/40/old-man-6939927_640.jpg",
    },
    {
      id: 3,
      name: "Alex Johnson",
      position: "Developer, StartUp Inc.",
      company: "StartUp Inc.",
      experience: "2 Years of Amazing Collaboration",
      rating: 5,
      feedback:
        "Amazing experience working with this team. They understand client needs and deliver beyond expectations.",
      image:
        "https://cdn.pixabay.com/photo/2023/04/28/07/16/man-7956041_1280.jpg",
    },
  ];

  return (
    <section className="dark:bg-[#222a3d] dark:text-[#a4aab0]">
      <div className="py-10 md:py-16 w-11/12 mx-auto">
        <div className="text-center">
          <h2 className="text-center text-5xl font-extrabold tracking-wide mb-8">
            What Our Clients Say
          </h2>
          <Carousel autoplay={true} loop={true} autoplayDelay={5000}>
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center bg-white dark:bg-[#1a202e] shadow-xl rounded-xl overflow-hidden"
              >
                {/* Left Side - Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[450px] w-full object-cover object-top"
                  />
                </div>

                {/* Right Side - Text */}
                <div className="w-full md:w-1/2 p-8 text-left ">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-[#96a3b5]">
                    {item.name}
                  </h3>
                  <p className="text-lg font-medium text-gray-600 dark:text-[#96a3b5]">
                    {item.position} at{" "}
                    <span className="text-blue-500 font-semibold dark:text-[#96a3b5]">
                      {item.company}
                    </span>
                  </p>

                  {/* Experience */}
                  <p className="mt-2 text-sm text-gray-500 dark:text-[#96a3b5]">
                    {item.experience}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center mt-3 text-yellow-500">
                    {[...Array(item.rating)].map((_, index) => (
                      <StarIcon key={index} className="h-6 w-6" />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="mt-5 text-gray-700 text-lg italic dark:text-[#96a3b5]">
                    "{item.feedback}"
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
