import { Text, FlatList, View, StyleSheet } from "react-native";
import MealItem from "./MealItem";

function MealList({ items }) {
  function renderMealItem(itemData) {
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <MealItem {...mealItemProps} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={renderMealItem}
      ></FlatList>
    </View>
  );
}
export default MealList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
