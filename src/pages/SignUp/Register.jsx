import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImageUrl } from "../../api/utils.";
import useAuth from "./../../hooks/useAuth";

const RegistrationPage = () => {
  const { createUser, loginWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();

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
      await updateUserProfile(name, imageUrl);
      // save user info in db
      navigate(location.state ? location.state : "/");
      toast.success("Signup Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // google login
  const handleGoogleLogin = () => {
    const result = loginWithGoogle()
      .then(async () => {
        navigate(location.state ? location.state : "/");
        toast.success(" Your login successful by Google");
      })
      .catch(() => {
        toast.error("Enter your valid email");
      });
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
            type="text"
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
          <input
            type="text"
            id="designation"
            name="designation"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
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
