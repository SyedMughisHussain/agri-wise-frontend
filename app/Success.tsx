import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet, Image } from "react-native";

export default function Success() {
  const navigation = useRouter();

  function hnadleNavigation() {
    navigation.push("/(tabs)");
    console.log("Pushing");
  }
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingTop: 165,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8.58,
          width: "100%",
        }}
      >
        <View style={styles.imageWrapper}>
          <Image source={require("../assets/images/success.png")} />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // width: "72%",
          }}
        >
          <Text style={styles.title}>Phone Number Verified</Text>
          <Text style={styles.description}>
            You will be redirected to the main page in a few moments
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 23.59,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 26,
    width: 255,
    color: "#B0ABAB",
  },
});
