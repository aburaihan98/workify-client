import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { saveUsr } from "../../api/utils.";
import technical from "../../assets/login.json";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Login() {
  const { signInUser, loginWithGoogle, userLogout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  // get all fired user
  const { data: firedUser = [] } = useQuery({
    queryKey: ["firedUsers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/firedUser");
      return data;
    },
  });

  // email password  login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // check fired user email
    const isTrue = firedUser.some((user) => user?.email === email);
    if (isTrue) {
      toast.error("This user has already been fired.");
      return;
    }

    signInUser(email, password)
      .then((result) => {
        navigate(location.state ? location.state : "/");
        toast.success("Your login successful");
      })
      .catch(() => toast.error("Your email or password is incorrect!"));
  };

  // google login
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      // check fired user email
      const isTrue = firedUser.some(
        (user) => user?.email === result?.user?.email
      );
      if (isTrue) {
        userLogout();
        toast.error("This user has already been fired.");
        return;
      }
      await saveUsr(result);
      toast.success("Your login was successful with Google");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // fillCredentials
  const fillCredentials = (role) => {
    if (role === "admin") {
      setEmail("admin@example.com");
      setPassword("Admin123#");
    } else if (role === "hr") {
      setEmail("hr@example.com");
      setPassword("Hr123#");
    } else if (role === "employee") {
      setEmail("employee@example.com");
      setPassword("Employee123#");
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto py-6 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-52">
        <div className="hidden md:block">
          <Lottie animationData={technical} loop={true} />
        </div>
        <div className="">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold  mb-4 text-center ">
              Login now!
            </h1>
            <div className="card bg-base-100 shadow-2xl rounded-lg p-8">
              <div className="flex justify-between gap-2 mb-4">
                <button
                  className="bg-[#0b8500] text-white px-5 py-3 rounded-lg"
                  onClick={() => fillCredentials("admin")}
                >
                  Admin
                </button>
                <button
                  className="bg-[#fc7d14] text-white px-5 py-3 rounded-lg"
                  onClick={() => fillCredentials("hr")}
                >
                  HR
                </button>
                <button
                  className="bg-[#0d6dfc] text-white px-5 py-3 rounded-lg"
                  onClick={() => fillCredentials("employee")}
                >
                  Employee
                </button>
              </div>
              <form onSubmit={handleLoginSubmit} className=" space-y-4">
                <div className="form-control">
                  <label className="label font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    className="input input-bordered border w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    className="input input-bordered border w-full p-3  text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <button className="btn bg-button w-full py-3 rounded-lg text-white font-semibold hover:text-primary">
                    Login
                  </button>
                </div>
              </form>
              <div className="divider">OR</div>
              <button
                onClick={handleGoogleLogin}
                className="btn bg-button text-white w-full py-3 border border-primaryColor rounded-md flex items-center justify-center gap-2 text-primaryColor font-semibold text-xl mb-2 hover:text-primary"
              >
                <FaGoogle />
                Login with Google
              </button>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="hover:underline text-primary font-semibold"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
