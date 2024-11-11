import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface LeaveReviewModalProps {
  visible: boolean;
  onClose: () => void;
  profileName: string;
  onRatingSelect: (rating: number) => void;
  initialRating?: number;
}

export default function LeaveReviewModal({
  visible,
  onClose,
  profileName,
  onRatingSelect,
}: LeaveReviewModalProps) {
  const ratings = [
    { label: "Oribil", value: 1 },
    { label: "Slab", value: 2 },
    { label: "Bine", value: 3 },
    { label: "Foarte bine", value: 4 },
    { label: "Excelent", value: 5 },
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            Evaluează serviciile oferite de {profileName}
          </Text>
          <Text style={styles.subtitle}>Click pe o stea pentru a evalua</Text>

          {/* Stars with labels */}
          <View style={styles.starsContainer}>
            {ratings.map((rating) => (
              <View key={rating.value} style={styles.starWithLabel}>
                <TouchableOpacity
                  onPress={() => onRatingSelect(rating.value)}
                  style={styles.starButton}
                >
                  <MaterialIcons name="star-border" size={36} color="#555" />
                </TouchableOpacity>
                <Text style={styles.label}>{rating.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Mai târziu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  starWithLabel: {
    alignItems: "center",
    width: 65,
  },
  starButton: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  closeText: {
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
