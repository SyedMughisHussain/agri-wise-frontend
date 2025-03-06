import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "../(tabs)/_layout";
import Profile from "../Profile";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={"(tabs)"}>
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;
