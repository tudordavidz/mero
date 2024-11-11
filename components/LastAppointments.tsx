import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

interface Appointment {
  id: string;
  status: "CONFIRMAT" | "FINALIZAT";
  title: string;
  date: string;
}

// Simulated appointment data
const mockAppointments: Appointment[] = [
  {
    id: "1",
    status: "CONFIRMAT",
    title: "Tuns + spălat",
    date: "Du. 8 dec. - 13:30",
  },
  {
    id: "2",
    status: "FINALIZAT",
    title: "Tuns VIP",
    date: "Sâ. 7 iun. - 09:30",
  },
  {
    id: "3",
    status: "CONFIRMAT",
    title: "Masaj scalp",
    date: "Lu. 10 mai - 15:00",
  },
];

// Simulated API call
const fetchAppointments = (): Promise<Appointment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAppointments);
    }, 1000); // Simulate a 1-second delay
  });
};

export default function LastAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAppointments() {
      setLoading(true);
      const data = await fetchAppointments(); // Simulate API call
      setAppointments(data);
      setLoading(false);
    }
    loadAppointments();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color="#0000ff"
        style={{ marginVertical: 20 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ultimele programări</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.card}>
            <Text
              style={[
                styles.status,
                appointment.status === "CONFIRMAT"
                  ? styles.confirmed
                  : styles.finalized,
              ]}
            >
              {appointment.status}
            </Text>
            <Text style={styles.title}>{appointment.title}</Text>
            <Text style={styles.date}>{appointment.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    width: 140,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "uppercase",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  confirmed: {
    backgroundColor: "#E0F8E4",
    color: "#27AE60",
  },
  finalized: {
    backgroundColor: "#ECEBF4",
    color: "#6C757D",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
});
