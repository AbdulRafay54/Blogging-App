import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; 
import { db } from "../Firebase/firebasemethods";
import { collection, getDocs } from "firebase/firestore";
import { BallTriangle } from "react-loader-spinner";

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
    <div className="min-h-screen bg-gray-900 p-8"> {/* Dark background to match navbar */}
      {loading ? (
         <div className="flex justify-center items-center w-full h-full mt-72">
         <BallTriangle
           height={100}
           width={100}
           radius={5}
           color="#4fa94d"
           ariaLabel="ball-triangle-loading"
           wrapperStyle={{}}
           wrapperClass=""
           visible={true}
         />
       </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {blogs.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 shadow-lg rounded-lg p-6 transition-shadow duration-300 transform hover:scale-105 flex flex-col justify-between" // Flex for layout
                >
                  <div>
                    <h2 className="text-2xl font-bold text-center text-teal-400 mb-2">{item.title}</h2> {/* Updated Title Color */}
                    <p className="text-white font-semibold text-center mb-4">{item.description}</p>
                    <p className="text-md text-center font-medium text-sky-400">By {item.userName}</p> {/* Updated User Name Color */}
                  </div>
                  <button
                    onClick={() => navigate(`/userblogs/${item.userName}`)} 
                    className="mt-4 bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-300 w-full" // Updated Button Color
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
