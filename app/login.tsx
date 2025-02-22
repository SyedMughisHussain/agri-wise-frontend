// import { useRouter } from "expo-router";
// import {
//   Button,
//   Text,
//   Image,
//   View,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import CustomInput from "@/components/CustomInput";
// import CustomButton from "@/components/CustomButton";
// import { Client, Account, ID } from "react-native-appwrite";

// import { useState } from "react";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("67954a8700063b9eee96")
//   .setPlatform("com.mughis.agri-wise");

// const account = new Account(client);

// export default function Login() {
//   const navigation = useRouter();

//   const [phoneNumber, setPhoneNumber] = useState("");

// const validatePhoneNumber = () => {
//   if (!phoneNumber) {
//     setErrorMessage("Phone number is required.");
//     return false;
//   }
//   if (!/^\d{10}$/.test(phoneNumber)) {
//     setErrorMessage("Phone number must be exactly 10 digits.");
//     return false;
//   }
//   setErrorMessage("");
//   return true;
// };

// const handleSubmit = async () => {
//   if (!validatePhoneNumber()) return;

//   try {
//     await account.createPhoneToken(ID.unique(), `+92${phoneNumber}`);
//     navigation.push("/Otp");
//   } catch (error: any) {
//     Alert.alert("Error", error.message);
//   }
// };

//   return (
//     <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
//       <View style={styles.imageWrapper}>
//         <Image source={require("../assets/images/login.png")} />
//       </View>
//       <Text style={styles.title}>Log In</Text>
//       <Text style={styles.description}>Please sign in to continue</Text>
//       <Text
//         style={{
//           marginTop: 24,
//           fontSize: 20,
//           fontWeight: 600,
//           marginLeft: 19,
//           textAlign: "center",
//           color: "#4BA26A",
//         }}
//       >
//         Login to Your Account
//       </Text>

//       <View
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: 320,
//           height: 36,
//           borderRadius: 8,
//           borderWidth: 1,
//           borderColor: "#B0ABAB",
//           marginLeft: 19,
//           marginTop: 24,
//         }}
//       >
//         <Text
//           style={{
//             color: "#B0ABAB",
//             fontWeight: 600,
//             fontSize: 14,
//           }}
//         >
//           Phone Number
//         </Text>
//       </View>

//       <CustomInput
//         placeholder="3193039832"
//         onChangeText={setPhoneNumber}
//         maxLength={10}
//       />
//       <CustomButton title="Send OTP" onPress={handleSubmit} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   imageWrapper: {
//     alignItems: "center",
//     marginTop: 48,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 700,
//     marginLeft: 19,
//     marginTop: 24,
//   },
//   description: {
//     fontSize: 16,
//     marginLeft: 19,
//     marginTop: 8,
//     color: "#B0ABAB",
//   },
// });

import { useRouter } from "expo-router";
import {
  Button,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Client, Account, ID } from "react-native-appwrite";
import { useState } from "react";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67954a8700063b9eee96")
  .setPlatform("com.mughis.agri-wise");

const account = new Account(client);

export default function Login() {
  const navigation = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setErrorMessage("Phone number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber()) return;

    try {
      await account.createPhoneToken(ID.unique(), `+92${phoneNumber}`);
      navigation.push("/Otp");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 20 }}>
      <View style={styles.imageWrapper}>
        <Image source={require("../assets/images/login.png")} />
      </View>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.description}>Please sign in to continue</Text>

      <Text style={styles.label}>Phone Number</Text>

      {/* Input Field and Error Message Container */}
      <View style={styles.inputWrapper}>
        <CustomInput
          placeholder="3193039832"
          onChangeText={(text) => {
            setPhoneNumber(text.replace(/[^0-9]/g, "")); // Only allow numbers
            setErrorMessage("");
          }}
          maxLength={10}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <CustomButton title="Send OTP" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: "center",
    marginTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginLeft: 19,
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    marginLeft: 19,
    marginTop: 8,
    color: "#B0ABAB",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 19,
    marginTop: 24,
    color: "#4BA26A",
  },
  inputWrapper: {
    marginTop: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4, // Adds spacing between input and error message
    marginLeft: 4,
  },
});
