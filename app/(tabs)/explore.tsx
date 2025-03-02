import { StyleSheet, Image, Platform, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

function TabTwoScreen() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <Text>Hello World</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default TabTwoScreen;
