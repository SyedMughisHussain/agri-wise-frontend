import { View, StyleSheet, Text, Pressable } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  disabled = false,
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
      onPress={!disabled ? onPress : undefined}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4BA26A",
    padding: 13,
    margin: 19,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 48,
  },
  pressedButton: {
    opacity: 0.7,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  disabledText: {
    color: "darkgray",
  },
});
