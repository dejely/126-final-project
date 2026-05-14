import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SeriesGame from "../pages/SeriesGame";
import CharacterGame from "../pages/CharacterGame";
import Achievements from "../pages/Achievements";
import Leaderboard from "../pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/SeriesGame",
    element: <SeriesGame />,
  },
  {
    path: "/CharacterGame",
    element: <CharacterGame />
  },
  {
    path: "/Achievements",
    element: <Achievements />
  },
  {
    path: "/Leaderboard",
    element: <Leaderboard />
  }
]);

export default router;