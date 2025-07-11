import { useState } from "react";
import { PlayerContext } from ".";

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState("");
  const [selected, setSelected] = useState([]);

  // console.log(playerName);
  // console.log(selected);

  const value = {
    playerName,
    setPlayerName,
    selected,
    setSelected,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
