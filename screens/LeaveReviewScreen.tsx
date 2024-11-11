import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { RootStackParamList } from "../navigation";

type LeaveReviewScreenRouteProp = RouteProp<
  RootStackParamList,
  "LeaveReviewScreen"
>;

export default function LeaveReviewScreen({
  route,
}: {
  route: LeaveReviewScreenRouteProp;
}) {
  const { profileId, rating } = route.params;
  const [reviewText, setReviewText] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const review = {
      _id: "userReview",
      user: { firstname: "George", lastname: "D.", profilePhoto: null },
      feedback: { score: rating, review: reviewText },
    };
    await AsyncStorage.setItem("userReview", JSON.stringify(review));
    Alert.alert("Recenzie salvată!");
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i <= score ? "star" : "star-border"}
          size={24}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Header with Date, Profile Name, and Stars */}
        <View style={styles.header}>
          <Text style={styles.dateText}>
            {format(new Date(), "dd MMM. yyyy")} (Robert - One Barbershop)
          </Text>
          <View style={styles.starContainer}>{renderStars(rating)}</View>
        </View>

        {/* User Information */}
        <View style={styles.userInfo}>
          <View style={styles.userInitials}>
            <Text style={styles.initials}>GD</Text>
          </View>
          <Text style={styles.userName}>George D.</Text>
        </View>

        {/* Review Prompt */}
        <Text style={styles.title}>Descrie experiența ta</Text>
        <Text style={styles.description}>
          Opinia ta îi ajută la îmbunătățirea calității serviciilor, iar
          viitorii clienți primesc așteptările corecte.
        </Text>

        {/* Review Input */}
        <TextInput
          style={styles.input}
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Ajută-i pe alții oferind detalii despre experiența ta..."
          placeholderTextColor="#888"
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Trimite</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
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
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#333",
    backgroundColor: "#f8f8f8",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    bottom: -350,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
