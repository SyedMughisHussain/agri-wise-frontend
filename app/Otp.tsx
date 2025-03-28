import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Client, Account, ID } from "react-native-appwrite";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { setItem } from "@/utils/asyncStorage";

const client = new Client()
  .setProject("67e5a6e300357b67e6b9")
  .setPlatform("com.company.agri-wise");

const account = new Account(client);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFF",
    padding: 5,
    paddingVertical: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    padding: 5,
    paddingVertical: 20,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  title: {
    marginTop: 25,
    fontSize: 32,
    fontWeight: 600,
  },
  description: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 32,
    color: "#B0ABAB",
    marginTop: 15,
  },
  pressable: {
    padding: 10,
    color: "#4BA26A",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 15,
  },
});

const Otp = ({ route }: any) => {
  const navigation = useRouter();
  const [otpInput, setOtpInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const input = useRef<OTPTextView>(null);

  const { modifiedPhoneNumber, userId } = route.params;
  const phoneNumber = modifiedPhoneNumber;

  const handleOtpChange = (otp: string) => {
    setOtpInput(otp);
  };

  useEffect(() => {
    const response = !validateOtp();
    setIsDisabled(response);
  }, [otpInput]);

  const validateOtp = () => {
    if (!otpInput) {
      return false;
    }
    if (!/^\d{6}$/.test(otpInput)) {
      return false;
    }
    setIsDisabled(false);
    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await account.createSession(userId, otpInput);
      const fetchResponse = await fetch(
        "https://agri-wise-backend.vercel.app/api/v1/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber }),
        }
      );
      const res = await fetchResponse.json();
      setItem("token", res.token);
      setItem("appwriteUserId", userId);
      navigation.push("/Success");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await account.createPhoneToken(ID.unique(), `+92${modifiedPhoneNumber}`);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>Phone Verification</Text>
      <Text style={styles.description}>
        Enter 6 digit verification code sent to your phone number
      </Text>

      <ScrollView contentContainerStyle={styles.container}>
        <OTPTextView
          ref={input}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
          keyboardType="numeric"
          handleTextChange={handleOtpChange}
        />
        <Pressable onPress={handleResendOtp}>
          <Text style={styles.pressable}>Resend OTP</Text>
        </Pressable>
        <CustomButton
          title="Verify OTP"
          onPress={handleSubmit}
          disabled={isDisabled}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
