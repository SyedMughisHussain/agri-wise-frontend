import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";

type CustomInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
};

export default function CustomInput({
  placeholder,
  onChangeText,
}: CustomInputProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Enable button when we have exactly 10 digits (12 chars with spaces)
    const digitsOnly = inputValue.replace(/\D/g, "");
  }, [inputValue]);

  // Function to format phone number with spaces after the 3rd and 6th digits
  const formatPhoneNumber = (text: string) => {
    // Remove any non-digit characters
    const digitsOnly = text.replace(/\D/g, "");

    // Format with spaces only after positions 3 and 6
    let formatted = "";
    for (let i = 0; i < digitsOnly.length; i++) {
      if ((i === 3 || i === 6) && i < digitsOnly.length) {
        formatted += " ";
      }
      formatted += digitsOnly[i];
    }

    return formatted;
  };

  const handleTextChange = (text: string) => {
    // Format the input with spaces
    const formatted = formatPhoneNumber(text);
    setInputValue(formatted);

    // Pass the formatted value back to parent component
    onChangeText(formatted);
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#B0ABAB",
              fontWeight: 500,
              paddingHorizontal: 8,
              paddingVertical: 2,
              lineHeight: 24,
            }}
          >
            +92
          </Text>
          <Image source={require("../assets/images/subtract.png")} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          value={inputValue}
          maxLength={12}
          keyboardType="number-pad"
        />
      </View>
      <Text style={styles.helperText}>Example: 319 303 9832</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#B0ABAB33",
    paddingTop: 6,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 6,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 500,
    width: 225,
    height: 48,
  },
  helperText: {
    fontSize: 14,
    color: "darkgray",
    marginLeft: 113,
  },
});
