import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebasemethods";
import { signOut } from "firebase/auth";
import {
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaBlog,
  FaUserPlus,
  FaBars,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const signOutUser = () => {
    Swal.fire({
      title: "Are you sure to signout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: "Signout Successfully",
              icon: "success",
            });
            navigate("/login");
          })
          .catch((error) => {
            console.error("Sign out error", error);
          });
      }
    });
  };

  const isLoggedIn = auth.currentUser !== null;

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link to="/">Blogging App</Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <FaBars className="w-6 h-6" />
        </button>

        <div className="hidden md:flex space-x-8 items-center text-lg">
          <Link
            className="text-white hover:text-gray-300 transition duration-300 flex items-center"
            to="/"
          >
            <FaHome className="inline-block mr-1 align-middle" /> 
            <span className="align-middle">Home</span>
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                className="text-white hover:text-gray-300 transition duration-300 flex items-center"
                to="/login"
              >
                <FaUser className="inline-block mr-1 align-middle" /> 
                <span className="align-middle">Login</span>
              </Link>
              <Link
                className="block text-white hover:text-gray-300 py-2 transition duration-300 flex items-center"
                to="/signup"
                onClick={toggleMenu}
              >
                <FaUserPlus className="mr-2 align-middle" />
                <span className="align-middle">Signup</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                className="text-white hover:text-gray-300 transition duration-300 flex items-center"
                to="/addblog"
              >
                <FaBlog className="inline-block mr-1 align-middle" /> 
                <span className="align-middle">Add Blog</span>
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300 flex items-center"
                to={`/yourblogs`}
              >
                <FaBlog className="inline-block mr-1 align-middle" /> 
                <span className="align-middle">Your Blogs</span>
              </Link>
              <button
                onClick={signOutUser}
                className="text-white hover:text-gray-300 transition duration-300 flex items-center"
              >
                <FaSignOutAlt className="inline-block mr-1 align-middle" /> 
                <span className="align-middle">Sign Out</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-700 p-4`}
      >
        <Link
          className="block text-white hover:text-gray-300 py-2 transition duration-300 flex items-center"
          to="/"
          onClick={toggleMenu}
        >
          <FaHome className="inline-block mr-1 align-middle" /> 
          <span className="align-middle">Home</span>
        </Link>
        {!isLoggedIn ? (
          <>
            <Link
              className="block text-white hover:text-gray-300 py-2 transition duration-300 flex items-center"
              to="/login"
              onClick={toggleMenu}
            >
              <FaUser className="inline-block mr-1 align-middle" /> 
              <span className="align-middle">Login</span>
            </Link>
            <Link
              className="block text-white hover:text-gray-300 py-2 transition duration-300 flex items-center"
              to="/signup"
              onClick={toggleMenu}
            >
              <FaUserPlus className="mr-2 align-middle" />
              <span className="align-middle">Signup</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              className="block text-white hover:text-gray-300 py-2 transition duration-300 flex items-center"
              to="/addblog"
              onClick={toggleMenu}
            >
              <FaBlog className="inline-block mr-1 align-middle" /> 
              <span className="align-middle">Add Blog</span>
            </Link>
            <Link
              className="text-white hover:text-gray-300 transition duration-300 flex items-center"
              to={`/yourblogs`}
            >
              <FaBlog className="inline-block mr-1 align-middle" /> 
              <span className="align-middle">Your Blogs</span>
            </Link>
            <button
              className="block text-white hover:text-gray-300 py-2 transition duration-300 flex items-center"
              onClick={signOutUser}
            >
              <FaSignOutAlt className="inline-block mr-1 align-middle" /> 
              <span className="align-middle">Sign Out</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
