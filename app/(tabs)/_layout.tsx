import React from "react";
import { Platform, Image, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabTwoScreen from "./explore";
import HomeScreen from "./Home";
import Notifications from "./notifications";
import HomeScreenStack from "../navigation/HomeScreenStack";
import { useRouter } from "expo-router";

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
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={focused ? "#4BA26A" : "#9DD0AF"}
            />
          ),
          headerLeft: () => (
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 70, height: 65, marginLeft: 12 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => navigate.push("/Profile")}
            >
              <Image
                source={require("../../assets/images/profile.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
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
        name="location"
        component={TabTwoScreen}
        options={{
          title: "Location",
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="location.fill"
              color={focused ? "#4BA26A" : "#9DD0AF"}
            />
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
          tabBarIcon: ({ focused }) => (
            <IconSymbol
              size={28}
              name="bell.fill"
              color={focused ? "#4BA26A" : "#9DD0AF"}
            />
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
