import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FullReviewsScreen from "../screens/FullReviewsScreen"; // Import FullReviewsScreen

// Define and export types for the navigation stack
export type RootStackParamList = {
  Home: undefined;
  Profile: { profileId: string }; // Define Profile screen with profileId as a parameter
  FullReviewsScreen: { profileId: string }; // Define FullReviewsScreen with profileId as a parameter
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="FullReviewsScreen"
        component={FullReviewsScreen}
        options={{ title: "Toate Recenziile" }}
      />
    </Stack.Navigator>
  );
}
