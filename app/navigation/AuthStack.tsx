import { getItem } from "@/utils/asyncStorage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import OnboardingScreen from "../(Onboarding)";
import Login from "../login";
import Otp from "../Otp";
import Success from "../Success";
import TabLayout from "../(tabs)/_layout";

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
  console.log(showOnboarding);

  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? "(Onboarding)" : "Login"}
    >
      <Stack.Screen
        name="Login"
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
    </Stack.Navigator>
  );
};

export default AuthStack;
