// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState, useCallback } from "react";
// import { View } from "react-native";
// import "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import OnboardingScreen from "./(Onboarding)";
// import HomeScreen from "./(tabs)";
// import { getItem } from "@/utils/asyncStorage";

// SplashScreen.preventAutoHideAsync();

// const Stack = createNativeStackNavigator();

// export default function RootLayout() {
//   const [appReady, setAppReady] = useState(false);
//   const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   // useEffect(() => {
//   //   const checkIfAlreadyOnboarded = async () => {
//   //     let onBoarded = await getItem("onboarded");
//   //     if (onBoarded == 1) {
//   //       setShowOnboarding(false);
//   //     } else {
//   //       setShowOnboarding(true);
//   //     }
//   //   };
//   //   checkIfAlreadyOnboarded();
//   // }, []);

//   useEffect(() => {
//     const checkIfAlreadyOnboarded = async () => {
//       let onBoarded = await getItem("onboarded");
//       if (onBoarded === "1") {
//         setShowOnboarding(false);
//       } else {
//         setShowOnboarding(true);
//       }
//     };
//     checkIfAlreadyOnboarded();
//   }, []);

//   useEffect(() => {
//     async function prepare() {
//       if (loaded) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setAppReady(true);
//       }
//     }
//     prepare();
//   }, [loaded]);

//   const onLayoutRootView = useCallback(async () => {
//     if (appReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [appReady]);

//   if (!appReady) {
//     return null;
//   }

//   if (showOnboarding == null) {
//     return null;
//   }

//   if (showOnboarding) {
//     return (
//       <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Onboarding">
//             <Stack.Screen
//               name="(Onboarding)"
//               options={{
//                 headerShown: false,
//               }}
//               component={OnboardingScreen}
//             />
//             <Stack.Screen
//               name="(tabs)"
//               options={{
//                 headerShown: false,
//               }}
//               component={HomeScreen}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </View>
//     );
//   } else {
//     return (
//       <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="(tabs)">
//             <Stack.Screen
//               name="(tabs)"
//               options={{
//                 headerShown: false,
//               }}
//               component={HomeScreen}
//             />
//             <Stack.Screen
//               name="(Onboarding)"
//               options={{
//                 headerShown: false,
//               }}
//               component={OnboardingScreen}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </View>
//     );
//   }
// }

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./(Onboarding)";
import { getItem } from "@/utils/asyncStorage";
import TabLayout from "./(tabs)/_layout";

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
    // <NavigationContainer>

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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
    // </NavigationContainer>
  );
}
