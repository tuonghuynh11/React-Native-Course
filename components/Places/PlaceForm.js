import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickedLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickedLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}
export default PlaceForm;
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    padding: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});
