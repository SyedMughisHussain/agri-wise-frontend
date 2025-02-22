import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";

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

const Otp = () => {
  const navigation = useRouter();
  const [otpInput, setOtpInput] = useState("");
  const input = useRef<OTPTextView>(null);

  const handleOtpChange = (otp: string) => {
    setOtpInput(otp);
  };

  const handleSubmit = () => {
    console.log("Entered OTP:", otpInput);
    navigation.push("/Success");
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
        <Pressable>
          <Text style={styles.pressable}>Resend OTP</Text>
        </Pressable>
        <CustomButton title="Verify OTP" onPress={handleSubmit} />
        {/* <View style={styles.buttonWrapper}>
          <Button title="Submit OTP" onPress={handleSubmit} />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
