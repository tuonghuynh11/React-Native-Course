import React from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
function GoalItem(item) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressItem}
        android_ripple={{ color: "#dddddd" }}
        onPress={item.onDeleteItem.bind(this, item.id)}
      >
        <Text style={styles.goalText}>{item.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;
const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  pressItem: {
    opacity: 0.6,
    backgroundColor: "orange",
    borderRadius: 10,
  },
});
