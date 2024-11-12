import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { getProfile } from "../services/api";
import { PageProfile } from "../types";
import ImageGallery from "../components/ImageGallery";
import ProfileDetails from "../components/ProfileDetails";
import LastAppointments from "../components/LastAppointments";
import SectionList from "../components/SectionList";
import RatingSummary from "../components/RatingSummary";
import LatestReviews from "../components/LatestReviews";
import FavoriteShareButtons from "../components/FavoriteShareButtons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<PageProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isHeaderButtonVisible, setIsHeaderButtonVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const navigation = useNavigation();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const profileData = await getProfile("one-barbershop");
        setProfile(profileData);
        setSelectedSection((prev) => prev || "Recenzii");
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Set up the header buttons based on scroll position
  useEffect(() => {
    if (isHeaderButtonVisible && profile) {
      navigation.setOptions({
        headerRight: () => (
          <FavoriteShareButtons
            imageUrl={profile.images[0].large}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            variant="header"
          />
        ),
      });
    } else {
      // Remove header buttons when not needed
      navigation.setOptions({ headerRight: () => null });
    }
  }, [navigation, profile, isHeaderButtonVisible, isFavorite]);

  // Scroll handler to toggle header button visibility
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const threshold = 70;
    if (yOffset > threshold && !isHeaderButtonVisible) {
      setIsHeaderButtonVisible(true);
    } else if (yOffset <= threshold && isHeaderButtonVisible) {
      setIsHeaderButtonVisible(false);
    }
  };

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

  const content = [
    {
      key: "imageGallery",
      content: (
        <ImageGallery
          images={profile.images}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      ),
    },
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
      onScroll={handleScroll}
      scrollEventThrottle={16}
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
    paddingVertical: 5,
  },
});
