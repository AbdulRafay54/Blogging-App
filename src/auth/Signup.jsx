import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth, signUpUser } from "../Firebase/firebasemethods";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password, name } = data;
    console.log(data);
    console.log(email, password, name);

    try {
      const userData = await signUpUser({
        email,
        password,
        fullName: name,
      });
      console.log(userData);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      Swal.fire({
        title: "Signup Successfully ✅",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("Account pehly se bana hua hai is email se.");
      } else {
        alert("Koi error aayi hai: " + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900"> 
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg"> 
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2> 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white"> 
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Full name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-2 text-white bg-gray-600 border border-gray-500 rounded-lg focus:outline-none" // Text updated to white
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white"> 
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 text-white bg-gray-600 border border-gray-500 rounded-lg focus:outline-none" // Text updated to white
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white"> 
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 text-white bg-gray-600 border border-gray-500 rounded-lg focus:outline-none" // Text updated to white
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button className="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:bg-blue-600"> {/* Button color updated */}
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
