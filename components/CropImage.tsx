import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

interface CropImageProps {
  imageUrl: string;
  onClose?: any;
  onConfirm?: any;
}

const CropImage = ({ imageUrl, onClose, onConfirm }: CropImageProps) => {
  return (
    <View style={styles.container}>
      {/* Main Image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          onClose();
        }}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          onConfirm();
        }}
      >
        <Text style={styles.checkmark}>✓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width,
    height: height * 0.8,
    borderRadius: 15,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 45, // Increased from 30 to 35
    height: 45, // Increased from 30 to 35
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 35,
  },
  confirmButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#4BA26A",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  checkmark: {
    color: "white",
    fontSize: 35,
  },
});

export default CropImage;
