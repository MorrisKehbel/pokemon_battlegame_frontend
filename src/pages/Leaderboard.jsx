import { useEffect, useState } from "react";
import { getLeaderboard } from "../data/leaderboard";

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const data = await getLeaderboard();
        setLeaders(data);
      } catch (err) {
        console.error("Could not load leaderboard:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/bg_image.webp')] bg-cover bg-center">
        <p className="text-xl text-white">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[url('/bg_image.webp')] bg-cover bg-center p-8">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Leaderboard
        </h1>

        {leaders.length === 0 ? (
          <p className="text-center text-gray-600">No entries yet.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {leaders.map((player, index) => (
              <li
                key={player._id || player.id}
                className="flex justify-between py-3 px-2 text-gray-800 font-medium"
              >
                <span>
                  {index + 1}. {player.username}
                </span>
                <span>{player.score} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};
