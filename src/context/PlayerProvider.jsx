import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { PlayerContext } from ".";
import { me } from "../data/auth";

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState("");
  const [selected, setSelected] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [checkSession, setCheckSession] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me();

        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          console.error(error);
          toast.error("Failed connection to server", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            progress: undefined,
            theme: "light",
          });
          setIsAuthenticated(null);
          return;
        }
        setIsAuthenticated(false);
      } finally {
        setCheckSession(false);
      }
    };

    checkSession && getUser();
  }, [checkSession]);

  const value = {
    playerName,
    setPlayerName,
    selected,
    setSelected,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    checkSession,
    setCheckSession,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
