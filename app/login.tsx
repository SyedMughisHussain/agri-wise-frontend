import { useRouter } from "expo-router";
import { Text, Image, View, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { Client, Account, ID } from "react-native-appwrite";

import { useEffect, useState } from "react";
import React from "react";

const client = new Client()
  .setProject("67fb9198001182c310a2")
  .setPlatform("com.syedmughis.agriwise");

const account = new Account(client);

export default function Login() {
  const navigation = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const response = !validatePhoneNumber();
    setIsDisabled(response);
  }, [phoneNumber]);

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneError("");
      return false;
    }

    const trimmedNumber = phoneNumber.trim();

    // Check if first digit is zero
    if (trimmedNumber.startsWith("0")) {
      setPhoneError("Do not include zero in starting, start without zero");
      return false;
    }

    const digitsOnly = trimmedNumber.replace(/\s+/g, "");
    if (digitsOnly.length !== 10) {
      setPhoneError(
        digitsOnly.length > 10
          ? "Phone number too long"
          : "Phone number too short"
      );
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber()) return;
    const modifiedPhoneNumber = phoneNumber.replaceAll(" ", "");
    try {
      setLoading(true);
      const token = await account.createPhoneToken(
        ID.unique(),
        `+92${modifiedPhoneNumber}`
      );
      if (token) {
        navigation.push({
          pathname: "/Otp",
          params: { modifiedPhoneNumber, userId: token.userId },
        });
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
      <View style={styles.imageWrapper}>
        <Image source={require("../assets/images/login.png")} />
      </View>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.description}>Please sign in to continue</Text>
      <Text
        style={{
          marginTop: 24,
          fontSize: 20,
          fontWeight: 600,
          marginLeft: 19,
          textAlign: "center",
          color: "#4BA26A",
        }}
      >
        Login to Your Account
      </Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 320,
          height: 36,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#B0ABAB",
          marginLeft: 19,
          marginTop: 24,
        }}
      >
        <Text
          style={{
            color: "#B0ABAB",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Phone Number
        </Text>
      </View>

      <CustomInput
        placeholder="Enter Phone Number.."
        onChangeText={setPhoneNumber}
      />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      <CustomButton
        title="Send OTP"
        onPress={handleSubmit}
        disabled={isDisabled}
        loading={loading}
      />
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
    fontWeight: 700,
    marginLeft: 19,
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    marginLeft: 19,
    marginTop: 8,
    color: "#B0ABAB",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 112,
    marginBottom: 8,
  },
});
