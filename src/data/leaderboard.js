const API_URL = import.meta.env.VITE_API_URL;

const baseURL = `${API_URL}/leaderboard`;

export const createLeaderboardEntry = async (formData) => {
  const res = await fetch(`${baseURL}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while creating the Leaderboard entry");
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();

  return data;
};
