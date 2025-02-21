import { Button, View, StyleSheet, Text, Pressable } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <Pressable
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View style={styles.button}>
        <Text
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4BA26A",
    padding: 13,
    borderRadius: 12,
    width: 320,
    height: 48,
  },
});
