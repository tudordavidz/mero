import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FullReviewsScreen from "../screens/FullReviewsScreen";
import LeaveReviewScreen from "../screens/LeaveReviewScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

// Define and export types for the navigation stack
export type RootStackParamList = {
  Home: undefined;
  Profile?: { profileId: string };
  FullReviewsScreen: { profileId: string };
  LeaveReviewScreen: { profileId: string; rating: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => ({
        // Default back button for all screens except "Home" and "LeaveReviewScreen"
        headerLeft:
          route.name === "Home" || route.name === "LeaveReviewScreen"
            ? undefined
            : () => (
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                  <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={{ marginLeft: 15 }}
                  />
                </TouchableOpacity>
              ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Mero" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "One barbershop",
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name="FullReviewsScreen"
        component={FullReviewsScreen}
        options={({ navigation }) => ({
          title: "One barbershop",
          presentation: "modal",
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="close"
                size={24}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="LeaveReviewScreen"
        component={LeaveReviewScreen}
        options={({ navigation }) => ({
          title: "Despre experiența ta",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="close"
                size={24}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => null,
        })}
      />
    </Stack.Navigator>
  );
}
