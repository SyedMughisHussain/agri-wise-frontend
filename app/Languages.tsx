import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomButton from "@/components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function Languages() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <MaterialIcons name="language" size={24} color="#4BA26A" />
          <Text style={styles.headerTitle}>Languages</Text>
        </View>
      </View>

      {/* Language Options */}
      <View style={styles.languageList}>
        <TouchableOpacity style={styles.languageItem}>
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.languageItem}>
          <Text style={styles.languageText}>Urdu</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <CustomButton title="Save" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#e0f2e9",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  languageList: {
    backgroundColor: "white",
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  languageText: {
    fontSize: 16,
  },
});
