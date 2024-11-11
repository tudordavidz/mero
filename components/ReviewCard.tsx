import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { VisibleFeedbackDetails } from "../types";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LeaveReviewModal from "./LeaveReviewModal";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "LeaveReviewScreen"
>;

interface ReviewCardProps {
  review: VisibleFeedbackDetails;
  onRefresh: () => void;
  profileId: string;
}

export default function ReviewCard({
  review,
  onRefresh,
  profileId,
}: ReviewCardProps) {
  const { user, feedback } = review;
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUserReview, setIsUserReview] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  // Check if this is the user's own review on component mount
  useEffect(() => {
    const checkUserReview = async () => {
      const storedReview = await AsyncStorage.getItem("userReview");
      if (storedReview) {
        const parsedReview = JSON.parse(storedReview);
        setIsUserReview(parsedReview._id === review._id);
      }
    };

    checkUserReview();
  }, [review._id]);

  const openMenu = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Modifica recenzie", "Sterge recenzie", "Anuleaza"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setShowEditModal(true);
        } else if (buttonIndex === 1) {
          Alert.alert("Confirmare", "Ești sigur că vrei să ștergi recenzia?", [
            { text: "Anulează", style: "cancel" },
            {
              text: "Șterge",
              style: "destructive",
              onPress: async () => {
                await AsyncStorage.removeItem("userReview");
                onRefresh();
              },
            },
          ]);
        }
      }
    );
  };

  const handleEditRating = (newRating: number) => {
    const updatedReview = {
      ...review,
      feedback: { ...review.feedback, score: newRating },
    };
    AsyncStorage.setItem("userReview", JSON.stringify(updatedReview));
    setShowEditModal(false);
    onRefresh();
    navigation.navigate("LeaveReviewScreen", {
      profileId: profileId,
      rating: newRating,
    });
  };

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
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      {isUserReview && (
        <View style={styles.userReviewHeader}>
          <Text style={styles.userReviewText}>Recenzia ta</Text>
          <TouchableOpacity onPress={openMenu}>
            <Text style={styles.menuIcon}>...</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
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
          {feedback.review && (
            <Text style={styles.reviewText}>{feedback.review}</Text>
          )}
        </View>
      </View>

      {showEditModal && (
        <LeaveReviewModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          profileName="One Barbershop"
          initialRating={feedback.score}
          onRatingSelect={handleEditRating}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userReviewHeader: { flexDirection: "row", justifyContent: "space-between" },
  userReviewText: { fontWeight: "bold", fontSize: 16 },
  menuIcon: { fontSize: 30, top: -15, color: "#007bff" },
  header: { flexDirection: "row", alignItems: "flex-start" },
  userPhoto: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  initials: { fontSize: 16, color: "#555" },
  userInfo: { flex: 1 },
  userName: { fontWeight: "bold", fontSize: 16, color: "#333" },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  ratingText: { fontSize: 14, color: "#555", marginLeft: 5 },
  reviewText: { fontSize: 14, color: "#555", marginTop: 5, lineHeight: 20 },
});
