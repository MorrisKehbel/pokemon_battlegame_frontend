import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { PlayerContext } from ".";
import { me, signout } from "../data/auth";

export const PlayerProvider = ({ children }) => {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [selected, setSelected] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [checkSession, setCheckSession] = useState(true);

  const restart = async () => {
    await signout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me();

        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
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
    restart,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
