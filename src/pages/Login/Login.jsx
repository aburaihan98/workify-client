import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { saveUsr } from "../../api/utils.";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Login() {
  const { signInUser, loginWithGoogle, userLogout } = useAuth();

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

  return (
    <div className="px-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-4">Login now!</h1>
        </div>
        <div className="card bg-base-100 shadow-2xl rounded-lg p-8">
          <form onSubmit={handleLoginSubmit} className=" space-y-4">
            <div className="form-control">
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
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
  );
}
