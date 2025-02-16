import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function checkFirstLaunch() {
      console.log("Running");
      try {
        const appData = await AsyncStorage.getItem("appLaunched");

        if (appData === null) {
          // First time launching the app
          setFirstLaunch(true);
          await AsyncStorage.setItem("appLaunched", "true"); // Store as launched
          console.log("firstLaunch1", firstLaunch);
        } else {
          setFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error reading launch state:", error);
      }
    }
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    async function prepare() {
      if (loaded && firstLaunch !== null) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Reduce delay
        setAppReady(true);
      }
    }
    prepare();
  }, [loaded, firstLaunch]);

  console.log("firstLaunch", firstLaunch);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady || firstLaunch === null) {
    return null; // Prevent rendering until everything is ready
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        {firstLaunch ? (
          <Stack.Screen name="(Onboarding)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
