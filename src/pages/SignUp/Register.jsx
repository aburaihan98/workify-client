import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveUsr, uploadImageUrl } from "../../api/utils.";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "./../../hooks/useAuth";

const RegistrationPage = () => {
  const { createUser, loginWithGoogle, updateUserProfile, userLogout } =
    useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // get all fired user
  const { data: firedUser = [] } = useQuery({
    queryKey: ["firedUsers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/firedUser");
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const bankAccountNo = form.bankAccountNo.value;
    const salary = form.salary.value;
    const designation = form.designation.value;
    const photo = form.photo.files[0];

    // uploadImageUrl
    const imageUrl = await uploadImageUrl(photo);

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least six characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    }

    try {
      // sign in
      await createUser(email, password);
      // update user
      await updateUserProfile(name, imageUrl)
        .then(() => {
          const userInfo = {
            name,
            email,
            password,
            role,
            bankAccountNo,
            salary,
            designation,
            photo: imageUrl,
          };
          axiosPublic
            .post(`/users/${email}`, userInfo)
            .then(() => {
              navigate(location.state ? location.state : "/");
              toast.success("Signup Successful");
              userLogout();
              navigate("/login");
            })
            .catch((error) => {
              toast.error("Error saving user info: " + error.message);
            });
        })
        .catch((error) => {
          toast.error("Error updating profile: " + error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
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
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        {/* Bank Account */}
        <div>
          <label htmlFor="bankAccountNo" className="block text-gray-700">
            Bank Account No
          </label>
          <input
            type="text"
            id="bankAccountNo"
            name="bankAccountNo"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-gray-700">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Designation */}
        <div>
          <label htmlFor="designation" className="block text-gray-700">
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select a designation
            </option>
            <option value="Sales Assistant">Sales Assistant</option>
            <option value="Social Media Executive">
              Social Media Executive
            </option>
            <option value="Digital Marketer">Digital Marketer</option>
            <option value="Support Specialist">Support Specialist</option>
            <option value="HR Executive">HR Executive</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <label htmlFor="photo" className="block text-gray-700">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary font-semibold hover:bg-blue-900 text-white w-full py-3 rounded-md"
          >
            Register
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
      <p className="px-6 font-semibold text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="hover:underline hover:text-blue-900 text-primary"
        >
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default RegistrationPage;
