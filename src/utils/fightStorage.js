const KEY = "battleState";

export const loadFight = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveFight = (state) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

export const clearFight = () => {
  localStorage.removeItem(KEY);
};
