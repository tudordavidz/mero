import React, { useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import { PageImage } from "../types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface ImageGalleryProps {
  images: PageImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this profile!",
        url: images[0].large,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log("Shared with activity type:", result.activityType);
        } else {
          // console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log("Share dismissed");
      }
    } catch (error: any) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.galleryContainer}
      >
        {images.map((image) => (
          <Image
            key={image._id}
            source={{ uri: image.large }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>

      {/* Separate Buttons for Favorite and Share */}
      <View style={styles.overlayContainer}>
        <TouchableOpacity onPress={toggleFavorite} style={styles.button}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.button}>
          <MaterialIcons name="ios-share" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  galleryContainer: {
    height: 250,
    marginBottom: 0,
    paddingBottom: 0,
  },
  galleryImage: {
    width: 300,
    height: 240,
    borderRadius: 10,
    marginRight: 10,
  },
  overlayContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
