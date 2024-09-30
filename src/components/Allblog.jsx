import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; 
import { db } from "../Firebase/firebasemethods";
import { collection, getDocs } from "firebase/firestore";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const getAllBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      const blogsData = [];

      querySnapshot.forEach((doc) => {
        blogsData.push({ id: doc.id, ...doc.data() });
      });

      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Error fetching blogs. Please try again."); // User feedback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {blogs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-lg rounded-lg p-6 transition-shadow duration-300 transform hover:scale-105"
                >
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{item.title}</h2>
                  <p className="text-gray-600 text-center mb-4">{item.description}</p>
                  <p className="text-sm text-center font-medium text-gray-500">By {item.userName}</p>
                  <button
                    onClick={() => navigate(`/userblogs/${item.userName}`)} 
                    className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 w-full" // Full width
                  >
                    See All From This User
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No blogs available.</p>
          )}
          <Outlet />
        </>
      )}
    </div>
  );
}

export default AllBlogs;
