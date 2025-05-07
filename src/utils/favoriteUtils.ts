export const getFavorites = (): string[] => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (
  id: string | number,
  current: string[]
): string[] => {
  const idStr = String(id);
  return current.includes(idStr)
    ? current.filter((fid) => fid !== idStr)
    : [...current, idStr];
};

export const saveFavorites = (favorites: string[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
