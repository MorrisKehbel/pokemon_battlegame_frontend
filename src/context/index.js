import { createContext, useContext } from "react";
import { PlayerProvider } from "./PlayerProvider";

const PlayerContext = createContext();

const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within an PlayerProvider");
  return context;
};

export { PlayerContext, PlayerProvider, usePlayer };
