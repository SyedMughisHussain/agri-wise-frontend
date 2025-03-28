import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { getItem, setItem } from "@/utils/asyncStorage";

import { Client, Account, ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

const client = new Client()
  .setProject("67e5a6e300357b67e6b9")
  .setPlatform("com.company.agri-wise");

const account = new Account(client);

export default function Profile({ navigation }: { navigation: any }) {
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
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
      setUserData(data.user);
    } catch (error: any) {
      console.error("Error fetching user:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
      setItem("token", "");
      setItem("appwriteUserId", "");
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };

  const snapPoints = useMemo(() => ["35%"], []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.profileSection}>
            <Image
              source={require("../assets/images/profile.png")}
              style={styles.profileImage}
            />
            {loading ? (
              <View>
                <ActivityIndicator size="large" color="#4BA26A" />
              </View>
            ) : error ? (
              <View>
                <Text style={styles.error}>{error}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.name}>
                  {userData.name || "Your Name Here"}
                </Text>
                <Text style={styles.phone}>+92{userData.phoneNumber}</Text>
              </View>
            )}
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Account");
              }}
            >
              <MaterialIcons name="person" size={24} color="#4BA26A" />
              <Text style={styles.menuText}>My Account</Text>
              <MaterialIcons name="chevron-right" size={24} color="#4BA26A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Privacy");
              }}
            >
              <MaterialIcons name="security" size={24} color="#4BA26A" />
              <Text style={styles.menuText}>Privacy Policy</Text>
              <MaterialIcons name="chevron-right" size={24} color="#4BA26A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("MyFields");
              }}
            >
              <MaterialIcons name="eco" size={24} color="#4BA26A" />
              <Text style={styles.menuText}>My Fields</Text>
              <MaterialIcons name="chevron-right" size={24} color="#4BA26A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Languages");
              }}
            >
              <MaterialIcons name="language" size={24} color="#4BA26A" />
              <Text style={styles.menuText}>Languages</Text>
              <MaterialIcons name="chevron-right" size={24} color="#4BA26A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem]}
              onPress={handlePresentModalPress}
            >
              <MaterialIcons name="logout" size={24} color="#4BA26A" />
              <Text style={[styles.menuText]}>Log Out</Text>
              <MaterialIcons name="chevron-right" size={24} color="#4BA26A" />
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={styles.bottomSheet}
            backgroundStyle={styles.modalBackground}
            handleIndicatorStyle={styles.indicator}
            backdropComponent={({ animatedIndex, style }) => (
              <View
                style={[
                  style,
                  {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    flex: 1,
                  },
                ]}
              />
            )}
          >
            <BottomSheetView style={styles.modalContent}>
              <Text style={styles.logoutTitle}>Logout</Text>
              <View style={styles.modalDivider} />
              <Text style={styles.logoutMessage}>
                Are You Sure you want to logout?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => bottomSheetModalRef.current?.dismiss()}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.logoutButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonText}>Yes, Logout</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  backButton: {
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: "#98A1A1",
    marginLeft: 15,
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    padding: 20,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  logoutTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  logoutMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: "auto",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#F3F3F3",
  },
  logoutButton: {
    backgroundColor: "#F3F3F3",
  },
  cancelButtonText: {
    color: "#A1A1A1",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButtonText: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "500",
  },
  modalBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: "#4BA26A",
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
    marginVertical: 12,
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "500",
  },
});
