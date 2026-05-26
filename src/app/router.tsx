import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SeriesGame from "../pages/SeriesGame";
import CharacterGame from "../pages/CharacterGame";
import Achievements from "../pages/Achievements";
import Leaderboard from "../pages/Leaderboard";
import Error from "../pages/NotFound";
import GameOver from "../pages/GameOver";

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
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
        path: "/GameOver",
        element: <GameOver />
      },
      {
        path: "*",
        element: <Error/>
      }
    ]
  }
]);

export default router;