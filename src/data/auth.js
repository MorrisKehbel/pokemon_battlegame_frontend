const API_URL = import.meta.env.VITE_API_URL;

const authURL = `${API_URL}/auth`;

export const me = async () => {
  const res = await fetch(`${authURL}/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred signing in");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};

export const signout = async () => {
  const res = await fetch(`${authURL}/signout`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred signing out");
    }
    throw new Error(errorData.error);
  }

  const data = await res.json();
  return data;
};
