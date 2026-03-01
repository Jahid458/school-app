import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";


import Student from "../Pages/Student";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Teacher from "../pages/Teacher";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", Component: Home },
      { path: "/admin", Component: Admin },
      { path: "/teacher", Component: Teacher },
      { path: "/student", Component: Student },
    ],
  },
]);