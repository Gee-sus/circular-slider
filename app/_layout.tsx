import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{ title: "Home", headerShown: false }} />
      
      
      <Tabs.Screen name="circular-slider" options={{ title: "Circular Slider", headerShown: false }} />
    
    
    
    </Tabs>



  )
}
