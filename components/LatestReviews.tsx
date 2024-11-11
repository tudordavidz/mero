import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getReviews } from "../services/api";
import { VisibleFeedbackDetails } from "../types";
import ReviewCard from "./ReviewCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation"; // Import RootStackParamList

interface LatestReviewsProps {
  profileId: string;
}

// Define the type for the navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

export default function LatestReviews({ profileId }: LatestReviewsProps) {
  const [reviews, setReviews] = useState<VisibleFeedbackDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>(); // Specify navigation type

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const reviewData = await getReviews(profileId, 3); // Limit to 3 reviews
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

  // Check if there are more than 3 reviews by using the length of the reviews array
  const hasMoreReviews = reviews.length === 3;

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
      {reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>No reviews yet</Text>
      ) : (
        <>
          <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            keyExtractor={(item) => item._id}
          />
          {hasMoreReviews && (
            <TouchableOpacity
              style={styles.moreReviewsButton}
              onPress={() =>
                navigation.navigate("FullReviewsScreen", { profileId })
              }
            >
              <Text style={styles.moreReviewsText}>
                Vezi mai multe recenzii
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  noReviewsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  moreReviewsButton: {
    marginTop: 15,
    alignSelf: "center",
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  moreReviewsText: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "center",
  },
});
