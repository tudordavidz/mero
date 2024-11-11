import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PageProfile } from "../types";

interface ProfileDetailsProps {
  profile: PageProfile;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  const hardcodedDistance = "350m";

  return (
    <View style={styles.container}>
      {/* Profile Name and Logo */}
      <View style={styles.header}>
        <Text style={styles.title}>{profile.name}</Text>
        {profile.profilePhoto && (
          <Image
            source={{ uri: profile.profilePhoto.thumbnail }}
            style={styles.logo}
          />
        )}
      </View>

      {/* Feedback Rating and Total Reviews */}
      <View style={styles.ratingContainer}>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.rating}>{profile.feedback.score.toFixed(2)}</Text>
        <TouchableOpacity>
          <Text style={styles.reviews}>
            ({profile.feedback.total} evaluări)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location with Hardcoded Distance */}
      <Text style={styles.location}>
        {hardcodedDistance} - {profile.location.address},{" "}
        {profile.location.city}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  star: {
    fontSize: 18,
    color: "#FFD700", // Gold color for the star
    marginRight: 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark gray for the rating number
    marginRight: 5,
  },
  reviews: {
    fontSize: 16,
    color: "blue", // Blue color for the review count to indicate it's clickable
  },
  location: {
    fontSize: 16,
    color: "gray",
  },
});
