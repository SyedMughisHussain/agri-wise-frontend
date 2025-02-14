import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  useEffect(() => {
    async function prepare() {
      if (loaded) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAppReady(true);
      }
    }
    prepare();
  }, [loaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
