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
import CameraPermissionScreen from "../ScanCrop";

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
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreenStack}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ScanCrop"
        component={CameraPermissionScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
