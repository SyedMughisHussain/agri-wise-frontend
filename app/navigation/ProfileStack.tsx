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
import Privacy from "../Privacy";
import Languages from "../Languages";

const Stack = createNativeStackNavigator();

const ProfileScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Languages"
        component={Languages}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreenStack;
