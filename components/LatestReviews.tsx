import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReviews } from "../services/api";
import { VisibleFeedbackDetails } from "../types";
import ReviewCard from "./ReviewCard";
import LeaveReviewModal from "./LeaveReviewModal";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";

interface LatestReviewsProps {
  profileId: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

export default function LatestReviews({ profileId }: LatestReviewsProps) {
  const [reviews, setReviews] = useState<VisibleFeedbackDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  // Function to fetch reviews and handle stored review display
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const storedReview = await AsyncStorage.getItem("userReview");
      const reviewData = await getReviews(profileId, storedReview ? 2 : 3); // Adjust limit based on whether the user review exists

      if (reviewData && reviewData.data) {
        const visibleReviews = reviewData.data.filter(
          (review): review is VisibleFeedbackDetails => !review.isAnonymous
        );
        if (storedReview) {
          const userReview = JSON.parse(storedReview);
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
    fetchReviews();
  }, [profileId]);

  // Refresh reviews after leaving a new review
  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, [profileId])
  );

  const handleAddReview = () => {
    setShowLeaveReviewModal(true);
  };

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
          <TouchableOpacity
            style={styles.moreReviewsButton}
            onPress={() =>
              navigation.navigate("FullReviewsScreen", { profileId })
            }
          >
            <Text style={styles.moreReviewsText}>Vezi mai multe recenzii</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={handleAddReview}
          >
            <Text style={styles.addReviewText}>Adauga recenzie</Text>
          </TouchableOpacity>
        </>
      )}
      {showLeaveReviewModal && (
        <LeaveReviewModal
          visible={showLeaveReviewModal}
          onClose={() => setShowLeaveReviewModal(false)}
          profileName="One Barbershop"
          onRatingSelect={(rating) => {
            setShowLeaveReviewModal(false);
            navigation.navigate("LeaveReviewScreen", { profileId, rating });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
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
  moreReviewsText: { color: "#007bff", fontSize: 16, textAlign: "center" },
  addReviewButton: {
    marginTop: 15,
    alignSelf: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addReviewText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
