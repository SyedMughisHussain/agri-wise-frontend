import { getItem } from "@/utils/asyncStorage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import OnboardingScreen from "../(Onboarding)";
import Login from "../login";
import Otp from "../Otp";
import Success from "../Success";
import TabLayout from "../(tabs)/_layout";
import HomeScreen from "../(tabs)/Home";
import Profile from "../Profile";
import ProfileScreenStack from "./ProfileStack";

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreenStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
