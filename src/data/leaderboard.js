const API_URL = "http://localhost:3000/leaderboard";

export const getAllLeaderboards = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch leaderboard");
    return await res.json();
  } catch (err) {
    console.error("getAllLeaderboards error:", err);
    throw err;
  }
};

export const postLeaderboard = async (entry) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create leaderboard entry");
    }

    return await res.json();
  } catch (err) {
    console.error("postLeaderboard error:", err);
    throw err;
  }
};
