import { setItem } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
  const router = useRouter();

  const handleDone = () => {
    router.push("/(tabs)");
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
          title: "Monitoring Soil and Plant",
          subtitle:
            "we aim to use optical (VIR) sensing to observe te fields and make timely crop management decisions.",
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
          title: "Early detection of plant and soil diseases",
          subtitle:
            "our project can detect plant and soil diseases using an existing camera sensor that tracks the plants in real-time day by day.",
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
          title: "Improve agriculture precision",
          subtitle:
            "we will use satellite imagery, image processing, deep learning, computer vision, and remote sensing to detect changes in the field and crops and solve the problems whenever they pop.",
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
