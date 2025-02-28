import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
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
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <Text style={[styles.text, disabled && styles.disabledText]}>
          {title}
        </Text>
      )}
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
