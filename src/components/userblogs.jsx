// UserBlogs.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebasemethods";
import { collection, query, where, getDocs } from "firebase/firestore";

function UserBlogs() {
  const { userName } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserBlogs = async () => {
    try {
      const q = query(collection(db, "Blogs"), where("userName", "==", userName));
      const querySnapshot = await getDocs(q);
      const blogsData = [];

      querySnapshot.forEach((doc) => {
        blogsData.push({ id: doc.id, ...doc.data() });
      });

      setBlogs(blogsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, [userName]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {loading ? (
        <div className="absolute top-0 flex justify-center items-center w-full h-full">
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No blogs available from this user.</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserBlogs;
