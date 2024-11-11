import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface SectionListProps {
  onSectionSelect: (section: string) => void;
}

const sections = ["Servicii", "Specialisti", "Recenzii", "Produse", "Contact"];

export default function SectionList({ onSectionSelect }: SectionListProps) {
  const [selectedSection, setSelectedSection] = useState("Recenzii");

  const handlePress = (section: string) => {
    setSelectedSection(section);
    onSectionSelect(section);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {sections.map((section) => (
        <TouchableOpacity
          key={section}
          onPress={() => handlePress(section)}
          style={[
            styles.button,
            selectedSection === section && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.text,
              selectedSection === section && styles.selectedText,
            ]}
          >
            {section}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    shadowColor: "#888", // Light gray shadow color
    shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical shadow offset
    shadowOpacity: 0.15, // Reduce opacity for a softer shadow
    shadowRadius: 4, // Slightly smaller blur radius for subtlety
    elevation: 3, // Shadow for Android
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "blue",
  },
  text: {
    fontSize: 16,
    color: "blue",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
