import React from "react";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import { PageImage } from "../types";
import FavoriteShareButtons from "./FavoriteShareButtons";

interface ImageGalleryProps {
  images: PageImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
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

      {/* Render FavoriteShareButtons as an absolute overlay in the top-right */}
      <View style={styles.favoriteShareContainer}>
        <FavoriteShareButtons imageUrl={images[0].large} />
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
  favoriteShareContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
  },
});
