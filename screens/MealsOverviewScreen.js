import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy_data";
import MealList from "../components/MealList/MealList";
function MealsOverViewScreen({ route, navigation }) {
  const catId = route.params.categoryId;
  const displayMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });
  const selectCategory = CATEGORIES.find((category) => {
    return category.id === catId;
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectCategory.title,
    });
  }, [catId, navigation, selectCategory]);

  return <MealList items={displayMeals} />;
}
export default MealsOverViewScreen;
