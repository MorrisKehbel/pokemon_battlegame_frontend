const API_URL = "http://localhost:3000";

export const getLeaderboard = async () => {
  try {
    const res = await fetch(`${API_URL}/leaderboard`);
    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard");
    }
    return await res.json();
  } catch (error) {
    console.error("Leaderboard fetch error:", error.message);
    throw error;
  }
};

export const postLeaderboard = async ({ username, score }) => {
  try {
    const res = await fetch(`${API_URL}/leaderboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, score }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to save score");
    }

    return await res.json();
  } catch (error) {
    console.error("Leaderboard post error:", error.message);
    throw error;
  }
};
