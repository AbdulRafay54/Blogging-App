import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebasemethods"; 
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { BallTriangle } from "react-loader-spinner";

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const arr = []
        const querySnapshot = await getDocs(collection(db, "Blogs"));
        querySnapshot.forEach((doc) => {
          if (auth.currentUser.uid === doc.data().uid){
            arr.push({ id: doc.id, ...doc.data() }); 
            setBlogs([...arr]);
          }
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load blogs",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

 const deleteTodo = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "Blogs", id)); 
          setBlogs(blogs.filter(blog => blog.id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your blog has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
            title: "Error",
            text: "Error deleting blog. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const editTodo = async (id) => {
    Swal.fire({
      title: "Edit Blog Details",
      input: "text",
      inputLabel: "Enter new blog title",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Next",
      preConfirm: (updatedTitle) => {
        if (!updatedTitle) {
          return Swal.showValidationMessage("Please enter a valid title.");
        }
        return updatedTitle; 
      }
    }).then((titleResult) => {
      if (titleResult.isConfirmed) {
        const updatedTitle = titleResult.value;
  
        Swal.fire({
          title: "Edit Blog Description",
          input: "text",
          inputLabel: "Enter new blog description",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Update Blog",
          preConfirm: (updatedDescription) => {
            if (!updatedDescription) {
              return Swal.showValidationMessage("Please enter a valid description.");
            }
            return updatedDescription; 
          }
        }).then(async (descriptionResult) => {
          if (descriptionResult.isConfirmed) {
            const updatedDescription = descriptionResult.value;
  
            try {
              const blogRef = doc(db, "Blogs", id);
              await updateDoc(blogRef, {
                title: updatedTitle,
                description: updatedDescription,
              });
              setBlogs(blogs.map(blog =>
                blog.id === id ? { ...blog, title: updatedTitle, description: updatedDescription } : blog
              ));
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Blog has been updated",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (error) {
              console.error("Error updating blog:", error);
              Swal.fire({
                title: "Error",
                text: "Error updating blog. Please try again.",
                icon: "error",
              });
            }
          }
        });
      }
    });
  };
  

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              {blogs.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105 transform flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-center text-teal-400 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-white font-semibold text-center mb-4">
                      {item.description}
                    </p>
                    <p className="text-md text-center font-medium text-sky-400">
                      By {item.userName}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-red-500 text-white  px-4 py-2 rounded"
                      onClick={() => deleteTodo(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => editTodo(item.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">
              No blogs available from this user.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default YourBlogs;
