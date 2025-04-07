import React from "react";
import { Platform, Image, TouchableOpacity } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "./notifications";
import HomeScreenStack from "../navigation/HomeScreenStack";
import { useRouter } from "expo-router";
import LocationTracker from "./Fields";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const navigate = useRouter();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4BA26A",
        tabBarInactiveTintColor: "#9DD0AF",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "white",
            height: 85,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          default: {
            backgroundColor: "white",
            height: 55,
            borderTopWidth: 0,
            elevation: 8,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeScreenStack}
        options={{
          title: "Home",
          headerTitle: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#4BA26A" />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                size={28}
                color="#9DD0AF"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Fields"
        component={LocationTracker}
        options={{
          title: "Fields",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="leaf" size={24} color="#4BA26A" />
            ) : (
              <Ionicons name="leaf-outline" size={24} color="#9DD0AF" />
            ),
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="bell" size={24} color="#4BA26A" />
            ) : (
              <FontAwesome name="bell-o" size={24} color="#9DD0AF" />
            ),
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
}
