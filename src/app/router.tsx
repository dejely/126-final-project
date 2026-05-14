import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SeriesGame from "../pages/SeriesGame";
import CharacterGame from "../pages/CharacterGame";
import Achievements from "../pages/Achievements";
import Leaderboard from "../pages/Leaderboard";
import Error from "../pages/NotFound";

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
  },
  {
    path: "*",
    element: <Error/>
  }
]);

export default router;