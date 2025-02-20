import { useRouter } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";

export default function Otp() {
  const navigation = useRouter();

  function hnadleNavigation() {
    navigation.push("/Success");
  }
  return (
    <>
      <Text>Otp Screen</Text>
      <Button title="Push" onPress={hnadleNavigation} />
    </>
  );
}
