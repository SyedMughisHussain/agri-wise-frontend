import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
  console.log("Showing Onboarding");

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image source={require("../../assets/images/splash-icon.png")} />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
