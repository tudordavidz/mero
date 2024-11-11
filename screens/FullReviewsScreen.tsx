import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";
import { getReviews } from "../services/api";
import { VisibleFeedbackDetails } from "../types";
import ReviewCard from "../components/ReviewCard";

type FullReviewsScreenRouteProp = RouteProp<
  RootStackParamList,
  "FullReviewsScreen"
>;

export default function FullReviewsScreen() {
  const route = useRoute<FullReviewsScreenRouteProp>();
  const { profileId } = route.params;
  const [reviews, setReviews] = useState<VisibleFeedbackDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);

      // Retrieve the stored user review
      const storedReview = await AsyncStorage.getItem("userReview");
      const userReview = storedReview ? JSON.parse(storedReview) : null;

      // Fetch all reviews from API
      const reviewData = await getReviews(profileId, 9999);

      if (reviewData && reviewData.data) {
        // Filter out anonymous reviews
        const visibleReviews = reviewData.data.filter(
          (review): review is VisibleFeedbackDetails => !review.isAnonymous
        );

        // Place user review at the top, if it exists
        if (userReview) {
          setReviews([userReview, ...visibleReviews]);
        } else {
          setReviews(visibleReviews);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [profileId]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginVertical: 20 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Toate Recenziile</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewCard review={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
