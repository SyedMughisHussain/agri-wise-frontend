import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { getItem } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";

const AddCrops = () => {
  const navigate = useRouter();
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const crops = [
    { name: "Wheat", image: require("../assets/images/wheat.png") },
    { name: "Watermelon", image: require("../assets/images/watermelon.png") },
    { name: "Corn", image: require("../assets/images/corn.png") },
    { name: "Tomato", image: require("../assets/images/tomato.png") },
    { name: "Rice", image: require("../assets/images/rice.png") },
    { name: "Cotton", image: require("../assets/images/cotton.png") },
    { name: "Sugar Cane", image: require("../assets/images/sugarcane.png") },
  ];

  const toggleCrop = (cropName: string) => {
    if (selectedCrops.includes(cropName)) {
      setSelectedCrops(selectedCrops.filter((name) => name !== cropName));
    } else {
      setSelectedCrops([...selectedCrops, cropName]);
    }
  };

  const goBack = () => {
    navigate.back();
  };

  const updateUserCrops = async () => {
    try {
      setLoading(true);
      const token = await getItem("token");

      if (!token) {
        Alert.alert("Error", "Please login first");
        return;
      }

      const response = await fetch(
        "https://agri-wise-backend.vercel.app/api/v1/user/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            crops: selectedCrops,
          }),
        }
      );

      const data = await response.json();

      console.log("data", data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Alert.alert("Success", "Crops updated successfully", );
      Alert.alert("Success", "Crops updated successfully.", [
        { text: "OK", onPress: goBack },
      ]);
    } catch (error: any) {
      console.error("Update failed:", error);
      Alert.alert("Error", error.message || "Failed to update crops");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      // setLoading(true);
      const token = await getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        "https://agri-wise-backend.vercel.app/api/v1/user/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // setUserData(data.user);
      setSelectedCrops(data.user.crops);
      console.log("Data", data.user.crops);
    } catch (error: any) {
      console.error("Error fetching user:", error);
      // setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Crop Grid */}
      <ScrollView contentContainerStyle={styles.cropContainer}>
        <View style={styles.cropGrid}>
          {crops.map((crop, index) => (
            <View key={index} style={styles.cropItem}>
              <TouchableOpacity
                style={[
                  styles.cropCircle,
                  selectedCrops.includes(crop.name) && styles.selectedCircle,
                ]}
                onPress={() => toggleCrop(crop.name)}
              >
                <Image source={crop.image} style={styles.cropImage} />
                {selectedCrops.includes(crop.name) && (
                  <View style={styles.checkMark}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.cropName}>{crop.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <CustomButton
          title="Confirm"
          onPress={updateUserCrops}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  cropContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cropGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cropItem: {
    width: "33%",
    alignItems: "center",
    marginBottom: 24,
  },
  cropCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedCircle: {
    backgroundColor: "#E8F5E9", // Light green background for selected items
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  cropImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  checkMark: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cropName: {
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  progressIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressDot: {
    width: 24,
    height: 4,
    backgroundColor: "#666",
    marginHorizontal: 4,
    borderRadius: 2,
  },
  progressDotInactive: {
    backgroundColor: "#E0E0E0",
  },
});

export default AddCrops;
