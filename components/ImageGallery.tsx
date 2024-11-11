import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { PageImage } from "../types";

interface ImageGalleryProps {
  images: PageImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
