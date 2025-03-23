import React from "react";
import Navbar from "../Shared/Navbar/NavBar";

function Banner() {
  return (
    <div
      className="relative w-full h-[550px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <Navbar />
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
        </div>
      </div>
    </div>
  );
}

export default Banner;
