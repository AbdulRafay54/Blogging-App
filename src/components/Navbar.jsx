import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebasemethods';
import { signOut } from 'firebase/auth';
import { FaSignOutAlt, FaUser, FaHome, FaBlog } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        alert("User signed out successfully");
        navigate('/login'); 
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const isLoggedIn = auth.currentUser !== null;

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link to="/">Blogging App</Link>
        </div>

        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          <FaUser className="w-6 h-6" />
        </button>

        <div className="hidden md:flex space-x-8 items-center text-lg">
          <Link className="text-white hover:text-gray-300 transition duration-300" to="/">
            <FaHome className="inline-block mr-1" /> Home
          </Link>
          {!isLoggedIn ? (
            <>
              <Link className="text-white hover:text-gray-300 transition duration-300" to="/login">
                <FaUser className="inline-block mr-1" /> Login
              </Link>
              <Link className="text-white hover:text-gray-300 transition duration-300" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link className="text-white hover:text-gray-300 transition duration-300" to="/addblog">
                <FaBlog className="inline-block mr-1" /> Add Blog
              </Link>
              <button onClick={signOutUser} className="text-white hover:text-gray-300 transition duration-300">
                <FaSignOutAlt className="inline-block mr-1" /> Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700 p-4`}>
        <Link className="block text-white hover:text-gray-300 py-2 transition duration-300" to="/" onClick={toggleMenu}>
          <FaHome className="inline-block mr-1" /> Home
        </Link>
        {!isLoggedIn ? (
          <>
            <Link className="block text-white hover:text-gray-300 py-2 transition duration-300" to="/login" onClick={toggleMenu}>
              <FaUser className="inline-block mr-1" /> Login
            </Link>
            <Link className="block text-white hover:text-gray-300 py-2 transition duration-300" to="/signup" onClick={toggleMenu}>
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link className="block text-white hover:text-gray-300 py-2 transition duration-300" to="/addblog" onClick={toggleMenu}>
              <FaBlog className="inline-block mr-1" /> Add Blog
            </Link>
            <button className="block text-white hover:text-gray-300 py-2 transition duration-300" onClick={signOutUser}>
              <FaSignOutAlt className="inline-block mr-1" /> Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
