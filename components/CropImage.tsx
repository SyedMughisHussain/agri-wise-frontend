import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "./CustomButton";

const { height, width } = Dimensions.get("window");

interface CropImageProps {
  imageUrl: string;
  onClose?: () => void;
  onConfirm?: () => void;
  loading: boolean;
  disease: string | null;
  setImage: (image: any) => void;
  setDisease: any;
  diseaseDetails: any;
}

const CropImage = ({
  imageUrl,
  onClose,
  onConfirm,
  loading,
  disease,
  setImage,
  setDisease,
  diseaseDetails,
}: CropImageProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [sectionsData, setSectionsData] = useState([
    { type: "symptoms", content: "" },
    { type: "prevention", content: "" },
    { type: "solutions", content: "" },
  ]);
  const [activeTab, setActiveTab] = useState<
    "symptoms" | "prevention" | "solutions"
  >("symptoms");

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

  // Method to handle bottom sheet presentation
  const presentBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  function parseDiseaseSectionsAsArray(text: string) {
    const symptomsMatch = text.match(
      /\*\*Symptoms:\*\*([\s\S]*?)(?=\*\*Prevention:|$)/
    );
    const preventionMatch = text.match(
      /\*\*Prevention:\*\*([\s\S]*?)(?=\*\*Suitable Solutions:|$)/
    );
    const solutionsMatch = text.match(
      /\*\*Suitable Solutions:\*\*([\s\S]*?)(?=$)/
    );

    return [
      {
        type: "symptoms",
        content: symptomsMatch ? symptomsMatch[1].trim() : "",
      },
      {
        type: "prevention",
        content: preventionMatch ? preventionMatch[1].trim() : "",
      },
      {
        type: "solutions",
        content: solutionsMatch ? solutionsMatch[1].trim() : "",
        title: "Suitable Solutions",
      },
    ];
  }

  useEffect(() => {
    if (diseaseDetails) {
      const parsedSections = parseDiseaseSectionsAsArray(diseaseDetails);
      setSectionsData(parsedSections);
    }
  }, [diseaseDetails]);

  useEffect(() => {
    if (disease && diseaseDetails && !loading) {
      presentBottomSheet();
    }
  }, [disease, diseaseDetails, presentBottomSheet, loading]);

  const snapPoints = useMemo(() => ["75%"], []);

  const handleTakeNewPicture = () => {
    bottomSheetModalRef.current?.dismiss();
    setImage(null);
    setDisease(null);
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        // Bottom sheet is closed
        setImage(null);
        setDisease(null);
      }
    },
    [setImage, setDisease]
  );

  const renderTabContent = () => {
    const currentSection = sectionsData.find(
      (section) => section.type === activeTab
    );
    return (
      <Text style={styles.tabContent}>{currentSection?.content || ""}</Text>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
            !disease && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Text style={styles.checkmark}>✓</Text>
              </TouchableOpacity>
            )
          )}

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            style={styles.bottomSheet}
            backgroundStyle={styles.modalBackground}
            handleIndicatorStyle={styles.indicator}
            backdropComponent={({ style }) => (
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
              <Text style={styles.logoutTitle}>{disease}</Text>

              {/* Tab Navigation */}
              <View style={styles.tabNavigation}>
                <TouchableOpacity
                  style={[styles.tabButton]}
                  onPress={() => setActiveTab("symptoms")}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      activeTab === "symptoms" && styles.activeTabButtonText,
                    ]}
                  >
                    Symptoms
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tabButton]}
                  onPress={() => setActiveTab("prevention")}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      activeTab === "prevention" && styles.activeTabButtonText,
                    ]}
                  >
                    Prevention
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tabButton]}
                  onPress={() => setActiveTab("solutions")}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      activeTab === "solutions" && styles.activeTabButtonText,
                    ]}
                  >
                    Suitable Solutions
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Fixed Tab Content Area with Scrollview */}
              <View style={styles.tabContentContainer}>
                {renderTabContent()}
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Take New Picture"
                  onPress={handleTakeNewPicture}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default CropImage;

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
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  logoutTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  logoutMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
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
  // New Tabs-related Styles
  tabNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  tabButton: {
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabButtonText: {
    color: "#A1A1A1",
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabButtonText: {
    color: "#4BA26A",
    fontWeight: "bold",
  },
  tabContentContainer: {
    flex: 1,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollViewContent: {
    flex: 1,
  },
  scrollViewContentContainer: {
    padding: 15,
  },
  tabContent: {
    padding: 10,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
