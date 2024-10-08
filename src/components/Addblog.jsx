import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, sendData } from "../Firebase/firebasemethods";

function Addblog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onsubmit = (data) => {
    console.log(data);
    const sendingData = {
      title: data.title,
      description: data.content,
      uid: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
    };
    console.log(sendingData);


    sendData(sendingData, "Blogs")
      .then(() => {
        alert("Blog successfully added!");
        reset();
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105 flex flex-col justify-between">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Add New Blog
        </h2>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div>
            <label className="block text-md font-medium text-white">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`mt-1 w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder="Title" ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-md font-medium text-white">
              Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              className={`mt-1 w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 ${
                errors.content ? "border-red-500" : ""
              }`}
              rows="5"
            />
            {errors.content && (
              <p className="text-sm text-red-600 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addblog;
