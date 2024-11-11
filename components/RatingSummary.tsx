import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface RatingSummaryProps {
  averageRating: number;
  totalRatingsCount: number;
}

export default function RatingSummary({
  averageRating,
  totalRatingsCount,
}: RatingSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recenzii și evaluări</Text>
      <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
      <Text style={styles.totalRatings}>{totalRatingsCount} evaluări</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  averageRating: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#000",
  },
  totalRatings: {
    fontSize: 16,
    color: "#444",
    marginTop: 5,
  },
});
