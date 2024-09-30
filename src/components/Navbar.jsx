import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebasemethods';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const signOutUser = () => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          resolve("User signed out successfully");
          alert("User signed out successfully");
          navigate('/login'); 
        })
        .catch((error) => {
          reject(error);
          console.error("Sign out error", error);
        });
    });
  };

  const isLoggedIn = auth.currentUser !== null;

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-6 shadow-lg border-b-2 border-indigo-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-extrabold text-white hover:text-gray-200 transition duration-300">
          <Link to="/">Blogging App</Link>
        </div>

        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <img 
            src="https://www.shareicon.net/data/512x512/2017/05/09/885755_list_512x512.png" 
            alt="Menu Icon" 
            className="w-10 h-10 hover:opacity-90 transition duration-300" 
          />
        </button>

        <div className="hidden md:flex space-x-8 items-center text-lg font-semibold">
          <Link className="text-gray-200 hover:text-white hover:underline transition duration-300" to="/">Home</Link>
          
          {!isLoggedIn && (
            <>
              <Link className="text-gray-200 hover:text-white hover:underline transition duration-300" to="/login">Login</Link>
              <Link className="text-gray-200 hover:text-white hover:underline transition duration-300" to="/signup">Signup</Link>
            </>
          )}
          
          {isLoggedIn && (
            <>
              <Link className="text-gray-200 hover:text-white hover:underline transition duration-300" to="/addblog">Add Blog</Link>
              <button onClick={signOutUser} className="text-gray-200 hover:text-white py-2 hover:underline transition duration-300">
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-indigo-800 p-4 shadow-lg transition-all duration-300`}>
        <Link className="block text-gray-200 hover:text-white text-lg py-2 hover:underline transition duration-300" to="/" onClick={toggleMenu}>Home</Link>

        {!isLoggedIn && (
          <>
            <Link className="block text-gray-200 hover:text-white text-lg py-2 hover:underline transition duration-300" to="/login" onClick={toggleMenu}>Login</Link>
            <Link className="block text-gray-200 hover:text-white text-lg py-2 hover:underline transition duration-300" to="/signup" onClick={toggleMenu}>Signup</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link className="block text-gray-200 hover:text-white text-lg py-2 hover:underline transition duration-300" to="/addblog" onClick={toggleMenu}>Add Blog</Link>
            <button className="block text-gray-200 hover:text-white text-lg py-2 hover:underline transition duration-300" onClick={signOutUser}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
