import React from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";

type CustomInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
};

export default function CustomInput({
  placeholder,
  onChangeText,
}: CustomInputProps) {
  return (
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
        onChangeText={onChangeText}
        maxLength={10}
        keyboardType="number-pad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
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
    fontSize: 18,
    fontWeight: 500,
    width: 225,
    height: 48,
  },
});
