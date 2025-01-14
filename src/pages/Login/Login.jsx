import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { saveUsr } from "../../api/utils.";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Login() {
  const { signInUser, loginWithGoogle } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    // check user email
    const isTrue = firedUser.some((user) => user?.email === email);
    if (isTrue) {
      toast.error("This user has already been fired.");
    }

    signInUser(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success("Your login successful");
      })
      .catch(() => toast.error("Your email or password is incorrect!"));
  };

  // google login
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      await saveUsr(result);
      toast.success("Your login was successful with Google");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className=" px-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Login now!</h1>
        </div>
        <div className="card bg-base-100 shadow-2xl rounded-lg p-8">
          <form onSubmit={handleLoginSubmit} className="space-y-2">
            <div className="form-control">
              <label className="label mb-2 text-lg font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered border w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label mb-2 text-lg font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered border w-full p-3  text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-primary w-full py-3 rounded-lg text-white font-semibold hover:bg-blue-900">
                Login
              </button>
            </div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="btn bg-primary text-white w-full py-3  mt-4 border border-primaryColor rounded-md flex items-center justify-center gap-2 text-primaryColor font-semibold text-xl mb-2 hover:bg-blue-900 "
          >
            <FaGoogle />
            Login with Google
          </button>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
