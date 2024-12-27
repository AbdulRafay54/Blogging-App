import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Firebase/firebasemethods";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await loginUser(data);
      Swal.fire({
        title: "Login Successfully ✅",
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
      });      navigate("/"); 
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      
      if (error.code === "auth/user-not-found") {
        alert("Account is not found. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        Swal.fire({
          icon: "error",
          title: "Account Not Found!",
        });      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900"> 
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg"> 
        <h2 className="text-2xl font-bold text-center text-white">Login</h2> 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            Login
          </button>
        </form>
        <div className="text-sm text-center text-gray-300"> 
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
