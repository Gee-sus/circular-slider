# Circular Slider (Expo + React Native Reanimated)

A bottom-aligned, snapping carousel of circular avatars that updates the full-screen background as you scroll. Built with Expo Router, React Native Reanimated 3, and static assets living under `assets/custom`.

![Circular slider preview](docs/preview.gif)

## Features

- Smooth translate/bounce animation for the focused avatar
- Snap-to-item horizontal scroll with `Animated.FlatList`
- Cross-fading background image that tracks the active item
- Pure JS: no native modules beyond Reanimated
- Plug-and-play assets—drop images in `assets/custom` and list them once

## Project Structure

```
app/
  _layout.tsx            # Expo Router tabs (Home + Circular Slider)
  circular-slider.tsx    # Carousel screen
  Home.tsx               # Sample home tab
assets/
  custom/
    index.ts             # sliderImages array (static requires)
    image-1.jpg
    image-2.jpg
    ...
```

## Getting Started

1. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the Expo dev server
   ```bash
   npx expo start
   ```

3. Open the project in Expo Go, iOS Simulator, or Android Emulator and navigate to the **Circular Slider** tab.

## Adding / Updating Images

1. Copy your `.jpg` / `.png` files into `assets/custom/`.
2. Update `assets/custom/index.ts`:
   ```ts
   export const sliderImages = [
     require("./image-1.jpg"),
     require("./image-2.jpg"),
     require("./image-3.jpg"),
   ];
   ```
3. Restart Metro (`expo start`) so the new assets are registered.

## Animation Breakdown

- `useSharedValue` + `useAnimatedScrollHandler` track the FlatList offset and normalize it to item indices.
- `useAnimatedStyle` drives each avatar’s bounce & border color via `interpolate` and `interpolateColor`.
- `FadeIn` / `FadeOut` transitions on an `Animated.Image` cross-fade the background as the `activeIndex` changes.
- `snapToInterval` and `decelerationRate="fast"` keep the carousel aligned to the center item.

## Customization Ideas

- Tweak `_itemSize` / `_spacing` constants in `app/circular-slider.tsx` to change avatar size and gutter.
- Replace the border with shadows or glows in the `CarouselItem` animated style.
- Add captions or call-to-action buttons tied to the `activeIndex`.
- Apply a gradient or blur overlay atop the background image using `expo-linear-gradient`.

## Troubleshooting

- **Metro can’t find your images**: confirm the filenames in `sliderImages` match exactly (case-sensitive, no spaces).
- **Background looks stretched**: keep `resizeMode="cover"` and the `width/height: "100%"` styles on the `Animated.Image`.
- **Reanimated errors**: ensure the Babel plugin is configured (auto-added by Expo) and that you restart Metro after installing dependencies.

## License

MIT © Your Name
