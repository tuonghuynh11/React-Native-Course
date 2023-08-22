import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { MEALS } from "../data/dummy_data";
import { useContext, useLayoutEffect } from "react";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetails/Subtitle";
import List from "../components/MealDetails/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
// import { FavoritesContext } from "../store/context/favorites-context";
function MealDetailScreen({ route, navigation }) {
  // const favoriteMealCxt = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const mealIsFavorite = favoriteMealIds.includes(mealId);
  const displayMeal = MEALS.find((meal) => {
    return meal.id === mealId;
  });
  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      // favoriteMealCxt.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealCxt.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // title: displayMeal.title,
      headerBackTitle: "Back",
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            onPress={changeFavoriteStatusHandler}
            color={"#d4ff00"}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Image style={styles.image} source={{ uri: displayMeal.imageUrl }} />
        <Text style={styles.title}>{displayMeal.title}</Text>
        <MealDetails
          duration={displayMeal.duration}
          complexity={displayMeal.complexity}
          affordability={displayMeal.affordability}
          textStyle={styles.detailText}
        />
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Ingredient</Subtitle>
            <List data={displayMeal.ingredients} />
            <Subtitle>Steps</Subtitle>
            <List data={displayMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 8,
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});
