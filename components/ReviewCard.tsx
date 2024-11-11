import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { VisibleFeedbackDetails } from "../types";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icons for stars

interface ReviewCardProps {
  review: VisibleFeedbackDetails;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user, feedback } = review;

  const getUserInitials = () => {
    const firstnameInitial = user.firstname ? user.firstname.charAt(0) : "";
    const lastnameInitial = user.lastname ? user.lastname.charAt(0) : "";
    return `${firstnameInitial}${lastnameInitial}`.toUpperCase();
  };

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i <= score ? "star" : "star-border"}
          size={16}
          color="#FFD700" // Gold color for stars
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* User Image or Initials */}
        {user.profilePhoto ? (
          <Image
            source={{ uri: user.profilePhoto.thumbnail }}
            style={styles.userPhoto}
          />
        ) : (
          <View style={styles.userInitials}>
            <Text style={styles.initials}>{getUserInitials()}</Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user.firstname} {user.lastname}
          </Text>
          <View style={styles.ratingContainer}>
            {renderStars(feedback.score)}
            <Text style={styles.ratingText}>{feedback.score} din 5</Text>
          </View>
          {/* Feedback Review */}
          {feedback.review && (
            <Text style={styles.reviewText}>{feedback.review}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top to avoid misalignment
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  initials: {
    fontSize: 16,
    color: "#555",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    lineHeight: 20,
  },
});
