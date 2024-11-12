import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface FavoriteShareButtonsProps {
  imageUrl: string;
  isFavorite?: boolean;
  toggleFavorite?: () => void;
  variant?: "header" | "overlay";
}

export default function FavoriteShareButtons({
  imageUrl,
  isFavorite: externalIsFavorite,
  toggleFavorite: externalToggleFavorite,
  variant = "overlay",
}: FavoriteShareButtonsProps) {
  const [internalFavorite, setInternalFavorite] = useState(false);

  const isFavorite = externalIsFavorite ?? internalFavorite;
  const toggleFavorite =
    externalToggleFavorite ?? (() => setInternalFavorite(!internalFavorite));

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out this profile!",
        url: imageUrl,
      });
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <View
      style={
        variant === "overlay" ? styles.overlayContainer : styles.headerContainer
      }
    >
      <TouchableOpacity
        onPress={toggleFavorite}
        style={[
          styles.button,
          variant === "overlay" ? styles.overlayButton : styles.headerButton,
        ]}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite ? "red" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleShare}
        style={[
          styles.button,
          variant === "overlay" ? styles.overlayButton : styles.headerButton,
        ]}
      >
        <MaterialIcons name="ios-share" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  overlayButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  headerButton: {
    backgroundColor: "transparent",
  },
});
