// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from  "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";
import Layout from "../Layout.jsx";
import Allblog from "./components/Allblog.jsx";
import Addblog from "./components/Addblog.jsx";
import UserBlogs from "./components/userblogs.jsx";
import YourBlogs from "./components/Yourblog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Allblog />,
      },
      {
        path: "addblog",
        element: <Addblog />,
      },
      {
        path: "yourblogs",
        element: <YourBlogs />, 
    },
    {
      path: "userblogs/:userName",
      element: <UserBlogs />, 
  },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
