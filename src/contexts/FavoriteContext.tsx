import React, { createContext, useContext, useMemo, useCallback } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AnimalData } from '../types/api/AnimalProtectAPI';

type FavoriteContextType = {
  favorites: string[]; // ID 배열 (기존 호환성 유지)
  favoriteAnimals: AnimalData[]; // 동물 정보 배열
  toggleFavorite: (animal: AnimalData) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 동물 정보를 Record 형태로 저장 (ID를 키로 사용)
  const [favoriteAnimalsMap, setFavoriteAnimalsMap] = useLocalStorage<
    Record<string, AnimalData>
  >('favoriteAnimals', {});

  // ID 배열과 동물 정보 배열을 메모이제이션
  const favorites = useMemo(
    () => Object.keys(favoriteAnimalsMap),
    [favoriteAnimalsMap]
  );

  const favoriteAnimals = useMemo(
    () => Object.values(favoriteAnimalsMap),
    [favoriteAnimalsMap]
  );

  const toggleFavorite = useCallback(
    (animal: AnimalData) => {
      const idStr = String(animal.ABDM_IDNTFY_NO);
      const updated = { ...favoriteAnimalsMap };

      if (updated[idStr]) {
        // 이미 있으면 제거
        delete updated[idStr];
      } else {
        // 없으면 추가
        updated[idStr] = animal;
      }

      setFavoriteAnimalsMap(updated);
    },
    [favoriteAnimalsMap, setFavoriteAnimalsMap]
  );

  // Context value도 메모이제이션
  const value = useMemo(
    () => ({
      favorites,
      favoriteAnimals,
      toggleFavorite,
    }),
    [favorites, favoriteAnimals, toggleFavorite]
  );

  return (
    <FavoriteContext.Provider value={value}>
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
