import "./App.css";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import MovieContext from "./MovieContext";

function App() {
  return (
    <>
      <MovieContext>
        <RouterProvider router={router} />
      </MovieContext>
    </>
  );
}

export default App;
