import * as React from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CropImage from "../components/CropImage";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function CameraPermission() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<boolean>(false);
  const [image, setImage] = useState<string | null | undefined>(null);
  const [disease, setDisease] = useState("");
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const navigate = useRouter();

  const GEMINI_API_KEY = "AIzaSyC1dhRhA9TB51M8zoKbDh_XYa3JFam_Vuo";

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo?.uri);
      } catch (error) {
        console.error("Failed to take picture:", error);
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };
  console.log("disease", disease);

  const getInsights = async () => {
    if (!image) {
      console.log("NO Image");
      return;
    }

    try {
      setLoading(true);
      const base64Image = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const apiUrl =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      const apiKey = GEMINI_API_KEY;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: "your task is to identify plant or crop health issues with precision. Analyze any image of a plant or leaf or crop I provide, and detect all abnormal conditions, whether they are diseases, pests, deficiencies, or decay. Respond strictly with the name of the condition identified, and nothing else—no explanations, no additional text. If a condition is unrecognizable, reply with 'I don't know'. If the image is not plant-related or crop-related, say 'Please pick another image'",
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
        safety_settings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
        ],
        generation_config: {
          temperature: 0.4,
          top_p: 1,
          top_k: 32,
          max_output_tokens: 1024,
        },
      };

      const response = await axios({
        method: "post",
        url: `${apiUrl}?key=${apiKey}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: requestBody,
      });

      if (response.status === 200) {
        const generatedText = response.data.candidates[0].content.parts[0].text;
        setDisease(generatedText);
      } else {
        console.error("API Error Response:", JSON.stringify(response.data));
        setDisease(
          `Error: ${response.status} - ${
            response.data?.error?.message || "Unknown error"
          }`
        );
      }
    } catch (err: any) {
      console.error("Exception during image analysis:", err);

      if (err.response) {
        console.error(
          "Error response data:",
          JSON.stringify(err.response.data)
        );
        console.error("Error response status:", err.response.status);
        console.error(
          "Error response headers:",
          JSON.stringify(err.response.headers)
        );

        setDisease(
          `Error ${err.response.status}: ${JSON.stringify(
            err.response.data.error || {}
          )}`
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        setDisease("Error: No response from API server");
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", err.message);
        setDisease(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const onClose = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                navigate.back();
              }}
            >
              <Ionicons name="close-circle" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Identify the crop</Text>
          </View>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            enableTorch={flash}
          >
            <View style={styles.controlsContainer}>
              <TouchableOpacity style={styles.sideButton} onPress={pickImage}>
                <Ionicons name="images-outline" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureInner}></View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sideButton} onPress={toggleFlash}>
                <Ionicons
                  name={flash ? "flash-outline" : "flash-off-outline"}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </CameraView>
        </>
      ) : (
        <CropImage
          imageUrl={image}
          onClose={onClose}
          onConfirm={getInsights}
          loading={loading}
          disease={disease}
          setImage={setImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    position: "absolute",
    top: 40,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  closePreview: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  closeButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerText: {
    marginRight: 100,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
