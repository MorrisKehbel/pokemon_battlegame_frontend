import { useEffect } from "react";
import { useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";

import { usePlayer } from "../context/index";

export const Battle = () => {
  const { isAuthenticated, checkSession, restart, playerName } = usePlayer();

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkSession && !isAuthenticated) {
      window.location.replace("/");
    }
  }, [checkSession, isAuthenticated, navigate]);

  if (checkSession) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <PulseLoader />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-[url('/battle_img.webp')] bg-cover bg-center mx-auto items-center">
      <div className="flex flex-col gap-6 items-center">
        <button
          className="bg-gray-700 mx-auto cursor-pointer"
          onClick={() => restart()}
        >
          Placeholder Restart
        </button>
      </div>
    </div>
  );
};
