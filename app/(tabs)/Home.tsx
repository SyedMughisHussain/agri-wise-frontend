import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";

import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getItem } from "@/utils/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";

type WeatherApiType = {
  cityName: string;
  country: string;
  weather: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
};

type LatLon = {
  lat: number;
  lon: number;
};

export default function HomeScreen() {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [latiLong, setLatiLong] = useState<LatLon | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherApiType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useRouter();

  const crops = [
    { name: "Wheat", image: require("../../assets/images/wheat.png") },
    {
      name: "Watermelon",
      image: require("../../assets/images/watermelon.png"),
    },
    { name: "Corn", image: require("../../assets/images/corn.png") },
    { name: "Tomato", image: require("../../assets/images/tomato.png") },
    { name: "Rice", image: require("../../assets/images/rice.png") },
    { name: "Cotton", image: require("../../assets/images/cotton.png") },
    {
      name: "Sugar Cane",
      image: require("../../assets/images/sugarcane.png"),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=karachi,pk&appid=ed9762be5575457144a931c00af77267"
      );
      const data = await response.json();

      setWeatherData({
        cityName: data.name,
        country: data.sys.country,
        weather: data.weather[0].main,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
      });
      setIsLoading(false);
    };
    // fetchData();
    fetchUser();
  }, []);

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

  // Helper function to get crop image based on crop name
  const getCropImage = (cropName: string) => {
    const crop = crops.find((c) => c.name === cropName);
    return crop ? crop.image : require("../../assets/images/wheat.png");
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const getCurrentWeather = async () => {
    console.log(latiLong?.lat);
    console.log(latiLong?.lon);
    setIsLoading(true);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latiLong?.lat}&lon=${latiLong?.lon}&appid=ed9762be5575457144a931c00af77267`
    );
    const data = await response.json();

    setWeatherData({
      cityName: data.name,
      country: data.sys.country,
      weather: data.weather[0].main,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
    });
    setIsLoading(false);

    console.log(data);
  };

  useEffect(() => {
    getCurrentWeather();
  }, [latiLong]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLatiLong({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingRight: 13,
        paddingLeft: 12,
      }}
    >
      {/* Add Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => {
            nav.push("/navigation/ProfileStack");
          }}
        >
          <Image
            source={require("../../assets/images/profile.png")}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Weather Card */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#4BA26A" />
        ) : (
          <LinearGradient
            colors={["#4BA26A", "#9DD0AF", "#BEE3CB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.weatherCard}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.temperatureText}>
                  {weatherData
                    ? Math.round(weatherData.temperature - 273.15)
                    : "29"}
                </Text>
                <Text style={{ fontSize: 50, color: "white" }}>°</Text>
              </View>
              <Text style={styles.locationSmallText}>
                H:{weatherData?.humidity}° W:{weatherData?.windSpeed}°
              </Text>
              <Text style={styles.locationText}>{weatherData?.cityName}</Text>
            </View>
            <View style={styles.weatherIconContainer}>
              <Image
                source={require("../../assets/images/weather.png")}
                style={styles.weatherImage}
                resizeMode="contain"
              />
              <Text style={styles.weatherCondition}>
                {weatherData?.weather}
              </Text>
            </View>
          </LinearGradient>
        )}

        <Text style={styles.myCrops}>My Crops</Text>
        {/* Add Crop Button */}

        {selectedCrops.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedCropsContainer}
          >
            {selectedCrops.map((cropName, index) => (
              <View key={index} style={styles.cropItem}>
                <View style={styles.cropIconContainer}>
                  <Image
                    source={getCropImage(cropName)}
                    style={styles.cropImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.cropText}>{cropName}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          // <View style={styles.noCropsContainer}>
          <Text style={styles.noCropsText}>
            Add your crop to get latest insights
          </Text>
          // </View>
        )}

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
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              nav.push("/AddCrops");
            }}
          >
            <IconSymbol size={30} name="chevron.right" color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Main Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Main Features</Text>

          <View style={styles.featuresGrid}>
            {/* Diagnose Diseases Feature */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require("../../assets/images/diagnose-disease.png")}
                  style={{ width: 35, height: 35 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureDescription}>Diagnose your crop</Text>
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Diagnose Diseases</Text>
                <View style={styles.featureArrowButton}>
                  <IconSymbol size={18} name="chevron.right" color="#4CAF50" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Soil Status Feature */}
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require("../../assets/images/soil-status.png")}
                  style={{ width: 35, height: 35 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureDescription}>
                Follow your soil status
              </Text>
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Soil Status</Text>
                <View style={styles.featureArrowButton}>
                  <IconSymbol size={18} name="chevron.right" color="#4CAF50" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require("../../assets/images/irrigation-control.png")}
                  style={{ width: 35, height: 35 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureDescription}>
                Control and save water
              </Text>
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Irrigation Control</Text>
                <View style={styles.featureArrowButton}>
                  <IconSymbol size={18} name="chevron.right" color="#4CAF50" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Image
                  source={require("../../assets/images/scan-crop.png")}
                  style={{ width: 35, height: 35 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.featureDescription}>Scan your crop</Text>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => {
                  nav.push("/ScanCrop");
                }}
              >
                <Text style={styles.featureButtonText}>Scan Crop</Text>
                <View style={styles.featureArrowButton}>
                  <IconSymbol size={18} name="chevron.right" color="#4CAF50" />
                </View>
              </TouchableOpacity>
            </View>
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
    marginTop: 15,
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
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 30,
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
  myCrops: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 10,
    width: "48%",
    marginBottom: 15,
    height: 170,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
  },
  featureIconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 70,
    height: 70,
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
    fontSize: 13,
    color: "#4BA26A",
    textAlign: "center",
  },
  featureButton: {
    backgroundColor: "#4BA26A",
    width: 142,
    borderRadius: 10,
    padding: 8,
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
  featureArrowButton: {
    backgroundColor: "white",
    borderRadius: 4,
    width: 24,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  leafIcon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoImage: {
    width: 65,
    height: 70,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 12,
  },
  selectedCropsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cropItem: {
    alignItems: "center",
    marginRight: 18,
    width: 80,
  },
  cropIconContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cropImage: {
    width: 35,
    height: 35,
  },
  cropText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4BA26A",
    textAlign: "center",
  },
  noCropsContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 15,
    alignItems: "center",
  },
  noCropsText: {
    color: "#888888",
    fontSize: 16,
    marginTop: 15,
    fontWeight: "bold",
  },
});
