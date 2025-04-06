import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";

// Define TypeScript interfaces for the component state
interface LocationState {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

export default function LocationTracker(): React.ReactElement {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = async (): Promise<void> => {
    setIsLoading(true);

    try {
      // Ask for permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

      // Get the current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation as LocationState);
    } catch (error: any) {
      setErrorMsg(`Error getting location: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Tracker</Text>

      <Button
        title={isLoading ? "Getting location..." : "Get Current Location"}
        onPress={getLocation}
        disabled={isLoading}
      />

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {location ? (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Latitude: {location.coords.latitude}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.coords.longitude}
          </Text>
          <Text style={styles.locationText}>
            Accuracy: {location.coords.accuracy} meters
          </Text>
          <Text style={styles.locationText}>
            Timestamp: {new Date(location.timestamp).toLocaleString()}
          </Text>
        </View>
      ) : (
        <Text style={styles.infoText}>
          Press the button to get your current location
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  locationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
  },
  locationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
