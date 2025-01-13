import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-red-800 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-primary-dark transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
