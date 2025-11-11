import { View, Text, Image, Dimensions, FlatList } from "react-native";
import { sliderImages } from "@/assets/custom";

const { width } = Dimensions.get("window");

export default function CircularSlider() {
  return (
    <FlatList
      data={sliderImages}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={item} style={{ width: 250, height: 250 }} />
      )}
    />
  );
}
