import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { getProfile } from "../services/api";
import { PageProfile } from "../types";
import ImageGallery from "../components/ImageGallery";
import ProfileDetails from "../components/ProfileDetails";
import LastAppointments from "../components/LastAppointments";
import SectionList from "../components/SectionList";
import RatingSummary from "../components/RatingSummary";
import LatestReviews from "../components/LatestReviews";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<PageProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSection, setSelectedSection] = useState<string>(""); // Track selected section

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const profileData = await getProfile("one-barbershop"); // Use actual profile ID
        setProfile(profileData);
        // Automatically set to "Recenzii" if it was selected previously
        setSelectedSection((prev) => prev || "Recenzii");
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text>Profile data not available.</Text>
      </View>
    );
  }

  // Define content for each component in the FlatList
  const content = [
    { key: "imageGallery", content: <ImageGallery images={profile.images} /> },
    { key: "profileDetails", content: <ProfileDetails profile={profile} /> },
    { key: "lastAppointments", content: <LastAppointments /> },
    {
      key: "sectionList",
      content: <SectionList onSectionSelect={handleSectionSelect} />,
    },
    ...(selectedSection === "Recenzii"
      ? [
          {
            key: "ratingSummary",
            content: (
              <RatingSummary
                averageRating={profile.feedback.score}
                totalRatingsCount={profile.feedback.total}
              />
            ),
          },
          {
            key: "latestReviews",
            content: <LatestReviews profileId={profile._id} />,
          },
        ]
      : []),
  ];

  return (
    <FlatList
      data={content}
      renderItem={({ item }) => (
        <View style={styles.sectionContainer}>{item.content}</View>
      )}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    paddingVertical: 5, // Minimal padding for readability
  },
});
