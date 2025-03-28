import { getItem } from "@/utils/asyncStorage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import OnboardingScreen from "../(Onboarding)";
import Login from "../login";
import Otp from "../Otp";
import Success from "../Success";
import TabLayout from "../(tabs)/_layout";
import Profile from "../Profile";
import CameraPermission from "../ScanCrop";
import ScanCrop from "../ScanCrop";
import ProfileScreenStack from "./ProfileStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfAlreadyOnboarded = async () => {
      let onBoarded = await getItem("onboarded");
      setShowOnboarding(onBoarded !== "1");
    };
    checkIfAlreadyOnboarded();
  }, []);

  if (showOnboarding === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? "(Onboarding)" : "login"}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(Onboarding)"
        options={{ headerShown: false }}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="navigation/ProfileStack"
        component={ProfileScreenStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanCrop"
        component={ScanCrop}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
