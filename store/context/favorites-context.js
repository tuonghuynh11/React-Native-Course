import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: {},
  removeFavorite: {},
});

function FavoritesContextProvider({ children }) {
  const [favoritesMealIds, setFavoriteMealIds] = useState([]);
  function addFavorite(id) {
    setFavoriteMealIds((current) => [...current, id]);
  }
  function removeFavorite(id) {
    setFavoriteMealIds((current) => current.filter((mealId) => mealId !== id));
  }
  const value = {
    ids: favoritesMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
export default FavoritesContextProvider;
