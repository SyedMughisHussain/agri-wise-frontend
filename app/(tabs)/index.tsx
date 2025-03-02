import { Image, StyleSheet, Platform, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingRight: 13,
        paddingLeft: 12,
      }}
    >
      <Text>Hello World</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
