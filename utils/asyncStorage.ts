import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save an item to AsyncStorage
export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Function to retrieve an item from AsyncStorage
export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

// Function to remove an item from AsyncStorage
export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};
