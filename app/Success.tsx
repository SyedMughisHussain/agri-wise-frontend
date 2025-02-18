import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function Success() {
  const navigation = useRouter();

  function hnadleNavigation() {
    navigation.push("/(tabs)");
    console.log("Pushing");
  }
  return (
    <>
      <Text>Success screen</Text>
      <Button title="Push" onPress={hnadleNavigation} />
    </>
  );
}
