import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" hidden={false} />
      <Navigator />
    </NavigationContainer>
  );
}
