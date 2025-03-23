import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";

const { height, width } = Dimensions.get("window");

interface CropImageProps {
  imageUrl: string;
  onClose?: () => void;
  onConfirm?: () => void;
  loading: boolean;
  disease: any;
  setImage: any;
}

const CropImage = ({
  imageUrl,
  onClose,
  onConfirm,
  loading,
  disease,
  setImage,
}: CropImageProps) => {
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleClose}
        activeOpacity={0.7}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      {loading ? (
        <>
          <View style={styles.blurOverlay} />
          <View style={styles.loadingContainer}>
            <View style={styles.loadingCircle}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
            <Text style={styles.loadingText}>Upload in progress</Text>
          </View>
        </>
      ) : (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Text style={styles.checkmark}>✓</Text>
        </TouchableOpacity>
      )}
      {disease &&
        Alert.alert("Disease Name", disease, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Take New Picture",
            onPress: () => {
              setImage(null);
            },
          },
        ])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    width: 45,
    height: 45,
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
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 15,
  },
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  loadingCircle: {
    marginBottom: 15,
  },
  loadingText: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
});

export default CropImage;
