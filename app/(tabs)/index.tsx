import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingRight: 13,
        paddingLeft: 12,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Weather Card */}
        <LinearGradient
          colors={["#4BA26A", "#9DD0AF", "#BEE3CB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.weatherCard}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.temperatureText}>29</Text>
              <Text style={{ fontSize: 50, color: "white" }}>°</Text>
            </View>
            <Text style={styles.locationSmallText}>H:32° L:27°</Text>
            <Text style={styles.locationText}>Pakistan, Karachi</Text>
          </View>
          <View style={styles.weatherIconContainer}>
            <Image
              source={require("../../assets/images/weather.png")}
              style={styles.weatherImage}
              resizeMode="contain"
            />
            <Text style={styles.weatherCondition}>Cloudy</Text>
          </View>
        </LinearGradient>

        {/* Add Crop Button */}
        <View style={styles.addCropContainer}>
          <TouchableOpacity style={styles.addCropButton}>
            <View style={styles.addCropIconContainer}>
              <Image
                source={require("../../assets/images/add-crop.png")}
                style={styles.addCropImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.addCropText}>Add Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton}>
            <IconSymbol size={24} name="chevron.right" color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Main Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Main Features</Text>

          <View style={styles.featuresGrid}>
            {/* Diagnose Diseases Feature */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <IconSymbol
                  size={28}
                  name="waveform.path.ecg"
                  color="#4CAF50"
                />
              </View>
              <Text style={styles.featureDescription}>Diagnose your crop</Text>
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Diagnose Diseases</Text>
                <IconSymbol size={16} name="chevron.right" color="white" />
              </TouchableOpacity>
            </View>

            {/* Soil Status Feature */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <IconSymbol size={28} name="leaf.fill" color="#4CAF50" />
              </View>
              <Text style={styles.featureDescription}>
                Follow your soil status
              </Text>
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Soil Status</Text>
                <IconSymbol size={16} name="chevron.right" color="white" />
              </TouchableOpacity>
            </View>

            {/* Additional Feature Cards (placeholder) */}
            <View style={styles.featureCard}></View>
            <View style={styles.featureCard}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  weatherCard: {
    borderRadius: 30,
    padding: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 170,
    overflow: "hidden",
  },
  temperatureText: {
    fontSize: 60,
    letterSpacing: 1,
    color: "white",
    marginBottom: -5,
  },
  locationSmallText: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginTop: 5,
  },
  weatherIconContainer: {
    alignItems: "flex-end",
  },
  weatherImage: {
    width: 150,
    height: 150,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 35,
  },
  weatherCondition: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    marginRight: 50,
    marginBottom: 110,
  },
  addCropContainer: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    marginTop: 20,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  addCropButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addCropIconContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addCropImage: {
    width: 24,
    height: 24,
  },
  addCropText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  arrowButton: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featuresSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 20,
    width: "48%",
    marginBottom: 15,
    height: 170,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIconContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  featureButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  featureButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  leafIcon: {
    width: 24,
    height: 24,
  },
});
