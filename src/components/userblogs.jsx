import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebasemethods";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BallTriangle } from "react-loader-spinner";

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
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
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
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {blogs.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105 transform flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-center text-teal-400 mb-2">{item.title}</h2>
                    <p className="text-white font-semibold text-center mb-4">{item.description}</p>
                    <p className="text-md text-center font-medium text-sky-400">By {item.userName}</p>
                  </div>
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
