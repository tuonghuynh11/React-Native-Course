import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadPlaces, setLoadPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList places={loadPlaces} />;
}
export default AllPlaces;
