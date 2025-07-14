import { useEffect, useState } from "react";
import { getAllLeaderboards } from "../data/leaderboard";
import { PulseLoader } from "react-spinners";
import { format } from "date-fns";

export const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getAllLeaderboards();
        // Sort by score descending (just in case it's not already)
        const sorted = data.sort((a, b) => b.score - a.score);
        setEntries(sorted);
      } catch (err) {
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
          🏆 Leaderboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <PulseLoader color="#9333ea" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-gray-500">
            No leaderboard entries yet.
          </p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-purple-200 text-purple-800 text-left">
                <th className="p-3">Rank</th>
                <th className="p-3">Player</th>
                <th className="p-3">Score</th>
                <th className="p-3 hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={entry._id}
                  className="odd:bg-white even:bg-purple-50 hover:bg-purple-100 transition"
                >
                  <td className="p-3 font-semibold text-purple-700">
                    #{index + 1}
                  </td>
                  <td className="p-3">{entry.username}</td>
                  <td className="p-3">{entry.score}</td>
                  <td className="p-3 hidden md:table-cell text-sm text-gray-500">
                    {format(new Date(entry.date), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};
