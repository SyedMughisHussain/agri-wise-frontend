import { getItem } from "@/utils/asyncStorage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import OnboardingScreen from "../(Onboarding)";
import Login from "../login";
import Otp from "../Otp";
import Success from "../Success";
import TabLayout from "../(tabs)/_layout";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={"(tabs)"}>
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
