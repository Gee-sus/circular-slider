import { View, Image, Dimensions, StyleSheet } from "react-native";
import { sliderImages } from "@/assets/custom";
import Animated, {
  
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  SharedValue,
  interpolateColor,
  runOnJS,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";   

import { useState } from "react";

const { width } = Dimensions.get("window");

const _itemSize = width * 0.23;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

const CarouselItem = ({
  source,
  index,
  scrollX,
}: {
  source: any;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
        borderWidth: 4, 
        borderColor: interpolateColor(scrollX.value, [index - 1, index, index + 1], ["transparent", "black", "transparent"]),
        
        overflow: "hidden",
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        { width: _itemSize, height: _itemSize, borderRadius: _itemSize / 2},
        stylez,
      ]}
    >
      <Image
        source={source}
        style={{
          flex: 1,
          width: _itemSize, height: _itemSize,
          borderRadius: _itemSize / 2,
          
        }}
      />
    </Animated.View>
  );
};

export default function CircularSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  
    const ScrollX = useSharedValue(0);


  const onScroll = useAnimatedScrollHandler((e) => {
    ScrollX.value = e.contentOffset.x / _itemTotalSize;
    
    const newActiveIndex = Math.round(ScrollX.value);

    if (newActiveIndex !== activeIndex) {
     runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
       <View style={[StyleSheet.absoluteFillObject]}>   {/* Background Image */}
        <Animated.Image 
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
        key={`image-${activeIndex}`}
        source={sliderImages[activeIndex]}
        style={{
            flex: 1, 
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        }}
        />
       </View>

      <Animated.FlatList
        style={{ flexGrow: 0, paddingBottom: _itemSize }}
        data={sliderImages}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        renderItem={({ item, index }) => (
          <CarouselItem source={item} index={index} scrollX={ScrollX} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        snapToInterval={_itemTotalSize}
        decelerationRate={"fast"}
      />
    </View>
  );
}
