import React from "react";
import { Platform, Image, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabTwoScreen from "./explore";
import HomeScreen from "./index";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: "Home",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerLeft: () => (
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 70, height: 65 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("Profile Clicked")}>
              <Image
                source={require("../../assets/images/avatar.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 15,
                }}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="explore"
        component={TabTwoScreen}
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
