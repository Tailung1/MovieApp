import { Outlet, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./shared/Header";
import Input from "./shared/Input";
import Series from "./pages/series";
import Movies from "./pages/Movies";
import BookMarked from "./pages/BookMarked";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />, // No header here
    children: [
      { index: true, element: <Login /> }, // "/" will go to Login
      { path: "signup", element: <SignUp /> },
    ],
  },

  // Routes WITH Header (Home, etc.)
  {
    element: (
      <div>
        <Header />
        <Input />
        <Outlet />
      </div>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/series", element: <Series /> },
      { path: "/movies", element: <Movies /> },
      { path: "/bookMarked", element: <BookMarked /> },
    ],
  },
]);

export default router