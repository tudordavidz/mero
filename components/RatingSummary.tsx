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
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginLeft: 17,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: "700",
    color: "#000",
    marginLeft: 17,
  },
  totalRatings: {
    fontSize: 16,
    color: "#666",
    marginTop: -5,
    marginLeft: 17,
  },
});
