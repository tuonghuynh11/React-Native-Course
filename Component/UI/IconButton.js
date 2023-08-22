import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ onPress, size, icon, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}
export default IconButton;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
