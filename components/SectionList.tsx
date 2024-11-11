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
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#0000FF",
  },
  text: {
    fontSize: 16,
    color: "#0000FF",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
