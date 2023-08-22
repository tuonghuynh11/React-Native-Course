import { Text, FlatList, View, StyleSheet } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy_data";
import { useContext, useLayoutEffect } from "react";
import MealItem from "../components/MealList/MealItem";
import MealList from "../components/MealList/MealList";
import { useSelector } from "react-redux";

function FavoriteScreen() {
  //   const favoriteMealCxt = useContext(FavoritesContext);
  //   const favoritesIds = favoriteMealCxt.ids;
  const favoritesIds = useSelector((state) => state.favoriteMeals.ids);
  const favoritesMeals = MEALS.filter((meal) => favoritesIds.includes(meal.id));
  if (favoritesMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meal yet.</Text>
      </View>
    );
  }
  return <MealList items={favoritesMeals} />;
}
export default FavoriteScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
