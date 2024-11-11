import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PageProfile } from "../types";
import { FontAwesome } from "@expo/vector-icons";

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
        {/* Star Icon */}
        <FontAwesome
          name="star"
          size={18}
          color="#FFD700"
          style={styles.star}
        />

        {/* Rating and Reviews */}
        <Text style={styles.rating}>{profile.feedback.score.toFixed(2)}</Text>
        <TouchableOpacity>
          <Text style={styles.reviews}>
            ({profile.feedback.total} evaluări)
          </Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 10,
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
    marginRight: 4,
    marginLeft: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  reviews: {
    fontSize: 16,
    color: "blue",
  },
  location: {
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
  },
});
