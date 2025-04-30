import { Outlet, createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import BookMarked from "./pages/BookMarked";
import LayoutWithHeader from "./pages/LayoutWithHeader";


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
     <LayoutWithHeader />
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/series", element: <Series /> },
      { path: "/movies", element: <Movies /> },
      { path: "/bookmarked", element: <BookMarked /> },
    ],
  },
]);

export default router;
