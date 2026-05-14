import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SeriesGame from "../pages/SeriesGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/SeriesGame",
    element: <SeriesGame />,
  },
]);

export default router;