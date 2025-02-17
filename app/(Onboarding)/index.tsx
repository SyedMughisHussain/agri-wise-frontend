import { setItem } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
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
            <Image source={require("../../assets/images/onboarding1.png")} />
          ),
          title: "Monitoring Soil and Plant",
          subtitle:
            "we aim to use optical (VIR) sensing to observe te fields and make timely crop management decisions.",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image source={require("../../assets/images/onboarding2.png")} />
          ),
          title: "Early detection of plant and soil diseases",
          subtitle:
            "our project can detect plant and soil diseases using an existing camera sensor that tracks the plants in real-time day by day.",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image source={require("../../assets/images/onboarding3.png")} />
          ),
          title: "Improve agriculture precision",
          subtitle:
            "we will use satellite imagery, image processing, deep learning, computer vision, and remote sensing to detect changes in the field and crops and solve the problems whenever they pop.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
