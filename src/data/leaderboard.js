const API_URL = import.meta.env.VITE_API_URL;

const boardURL = `${API_URL}/leaderboard`;

export const getAllLeaderboards = async () => {
  try {
    const res = await fetch(boardURL, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch leaderboard");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    throw error;
  }
};

export const createLeaderboardEntry = async (formData) => {
  try {
    const res = await fetch(boardURL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create leaderboard entry");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating leaderboard entry:", error.message);
    throw error;
  }
};

export const updateLeaderboard = async (id, formData) => {
  const res = await fetch(`${boardURL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while updating the Leaderboard entry");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();

  return data;
};
