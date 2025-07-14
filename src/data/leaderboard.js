const API_URL = import.meta.env.VITE_API_URL;

const boardURL = `${API_URL}/leaderboard`;

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
