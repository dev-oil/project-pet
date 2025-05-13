import React, { createContext, useContext } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoriteContextType = {
  favorites: string[];
  toggleFavorite: (id: string | number) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const toggleFavorite = (id: string | number) => {
    const idStr = String(id);
    const updated = favorites.includes(idStr)
      ? favorites.filter((fav) => fav !== idStr)
      : [...favorites, idStr];
    setFavorites(updated);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite은 FavoriteProvider 안에서 사용해야 함');
  }
  return context;
};
