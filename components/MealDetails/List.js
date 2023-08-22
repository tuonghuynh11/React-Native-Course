import { View, Text, StyleSheet } from "react-native";

function List({ data }) {
  return data.map((dataPoint) => {
    return (
      <View key={dataPoint} style={styles.listItem}>
        <Text style={styles.itemText}>{dataPoint}</Text>
      </View>
    );
  });
}
export default List;
const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    marginHorizontal: 8,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#e2b497",
  },
  itemText: {
    textAlign: "center",
    color: "#351401",
  },
});
