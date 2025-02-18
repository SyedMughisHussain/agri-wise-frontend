import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./(Onboarding)";
import { getItem } from "@/utils/asyncStorage";
import TabLayout from "./(tabs)/_layout";
import Login from "./login";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const checkIfAlreadyOnboarded = async () => {
      let onBoarded = await getItem("onboarded");
      setShowOnboarding(onBoarded !== "1");
    };
    checkIfAlreadyOnboarded();
  }, []);

  useEffect(() => {
    async function prepare() {
      if (loaded) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
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

  if (!appReady || showOnboarding === null) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName={showOnboarding ? "(Onboarding)" : "(tabs)"}
      >
        <Stack.Screen
          name="(Onboarding)"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
          component={TabLayout}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={Login}
        />
      </Stack.Navigator>
    </View>
  );
}
