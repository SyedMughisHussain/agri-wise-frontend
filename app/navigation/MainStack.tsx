import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "../(tabs)/_layout";
import Profile from "../Profile";
import Privacy from "../Privacy";
import Account from "../Account";
import Login from "../login";
import Languages from "../Languages";
import MyFields from "../MyFields";
import CameraPermissionScreen from "../ScanCrop";
import CameraPermission from "../ScanCrop";
import ProfileScreenStack from "./ProfileStack";
import CropImage from "../../components/CropImage";
import DiagnoseDisease from "../DiagnoseDisease";
import ScanCrop from "../ScanCrop";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={"(tabs)"}>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="Languages"
        component={Languages}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyFields"
        component={MyFields}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ScanCrop"
        component={ScanCrop}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="navigation/ProfileStack"
        component={ProfileScreenStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DiagnoseDisease"
        component={DiagnoseDisease}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
