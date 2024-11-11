import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getReviews } from "../services/api";
import {
  PageReviews,
  PublicFeedbackDetails,
  VisibleFeedbackDetails,
} from "../types";
import ReviewCard from "./ReviewCard";

interface LatestReviewsProps {
  profileId: string;
}

export default function LatestReviews({ profileId }: LatestReviewsProps) {
  const [reviews, setReviews] = useState<VisibleFeedbackDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const reviewData = await getReviews(profileId, 3);
        if (reviewData && reviewData.data) {
          const visibleReviews = reviewData.data.filter(
            (review): review is VisibleFeedbackDetails => !review.isAnonymous
          );
          setReviews(visibleReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
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
    marginTop: 10,
  },
});
