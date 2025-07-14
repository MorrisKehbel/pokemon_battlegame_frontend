import { useEffect, useState } from "react";
import { getAllLeaderboards, postLeaderboard } from "../data/leaderboard";

export const Leaderboard = ({ battleResult }) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const data = await getAllLeaderboards();
        setLeaders(data);
      } catch (err) {
        console.error("Could not load leaderboard:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !battleResult) {
      setError("Username and battle result are required.");
      return;
    }

    const { score, team } = battleResult;

    try {
      await postLeaderboard({
        username,
        score,
        team,
        date: new Date().toISOString(),
      });
      setSubmitted(true);
      setUsername("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/bg_image.webp')] bg-cover bg-center">
        <p className="text-xl text-white">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-[url('/bg_image.webp')] bg-cover bg-center p-8">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Leaderboard
        </h1>

        {battleResult && !submitted && (
          <form onSubmit={handleSubmit} className="mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="p-2 border rounded w-full mb-2"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Submit Score
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        )}

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
