import React from "react";

function Banner() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/2148737935/photo/doctor-coach-and-applause-with-team-in-meeting-for-collaboration-conference-or-health.jpg?s=1024x1024&w=is&k=20&c=Qe-c2BTBV7K63xgnwRXgVTQfdRuuehxrKHFVttdRBns=)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Celebrating 10 Years of Excellence
          </h1>
          <p className="text-xl mb-6">
            Empowering businesses and delivering unparalleled solutions to our
            valued clients worldwide.
          </p>
          <button className="px-6 py-3 bg-primary hover:bg-blue-900 rounded-lg text-lg font-semibold transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
