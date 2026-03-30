import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export const [FavoritesProvider, useFavorites] = createContextHook<FavoritesContextType>(() => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    void AsyncStorage.getItem("favorites").then((stored) => {
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    });
  }, []);

  const addFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      if (!prev.includes(id)) {
        const newFavorites = [...prev, id];
        void AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      }
      return prev;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((f) => f !== id);
      void AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }, [favorites, addFavorite, removeFavorite]);

  return useMemo(() => ({ 
    favorites, 
    addFavorite, 
    removeFavorite, 
    isFavorite, 
    toggleFavorite 
  }), [favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite]);
});
