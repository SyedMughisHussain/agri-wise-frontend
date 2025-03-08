import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PrivacyScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function Privacy({ navigation }: PrivacyScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <MaterialIcons name="security" size={24} color="#4BA26A" />
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.missionText}>
          We're on a mission to make renting the new black, by providing
          seamless comfort with affordable pricing.
        </Text>

        <Text style={styles.descriptionText}>
          With us, you can rent a wide range of well-conditioned vehicles, like,
          SUVs, MUVs, sedans, vintage cars and chariots at very affordable
          prices.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#e0f2e9",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  missionText: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
