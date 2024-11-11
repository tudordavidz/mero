import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, RouteProp } from "@react-navigation/native";
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
      _id: "userReview", // a unique ID
      user: { firstname: "George", lastname: "D.", profilePhoto: null },
      feedback: { score: rating, review: reviewText },
    };
    await AsyncStorage.setItem("userReview", JSON.stringify(review));
    Alert.alert("Review saved successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Descrie experiența ta</Text>
      <TextInput
        style={styles.input}
        value={reviewText}
        onChangeText={setReviewText}
        placeholder="Ajută-i pe alții oferind detalii despre experiența ta..."
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Trimite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButtonText: { color: "white", textAlign: "center", fontSize: 16 },
});
