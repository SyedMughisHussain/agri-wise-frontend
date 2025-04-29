import { setItem } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
  const navigation = useRouter();

  const handleDone = () => {
    navigation.push("/login");
    setItem("onboarded", "1");
  };

  return (
    <Onboarding
      onSkip={handleDone}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={styles.imageWrapper}>
              <Image
                style={styles.imageWrapper}
                source={require("../../assets/images/onboarding1.png")}
              />
            </View>
          ),
          title: "Smart Crop Suggestions",
          subtitle:
            "Get personalized crop recommendations based on your soil, weather, and market conditions—powered by AI, made for your farm.",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={styles.imageWrapper}>
              <Image
                style={styles.imageWrapper}
                source={require("../../assets/images/onboarding2.png")}
              />
            </View>
          ),
          title: "Real-Time Monitoring & Forecasts",
          subtitle:
            "Monitor crop health and get accurate weather alerts and harvest predictions—so you’re always one step ahead.",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={styles.imageWrapper}>
              <Image
                style={styles.imageWrapper}
                source={require("../../assets/images/onboarding3.png")}
              />
            </View>
          ),
          title: "Detect Diseases with a Snap",
          subtitle:
            "Just take a photo of your crop—AgriWise will analyze it and alert you to possible diseases with instant recommendations.",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default OnboardingScreen;
