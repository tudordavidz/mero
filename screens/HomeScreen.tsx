import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation"; // Now this import will work

// Define the type for navigation
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleViewProfile = () => {
    navigation.navigate("Profile"); // Navigate to the Profile screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MERO App</Text>
      <Button title="View Profile" onPress={handleViewProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
