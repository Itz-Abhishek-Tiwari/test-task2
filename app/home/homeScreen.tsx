import { useDecisionStore, useLogin, useUserStore } from "@/store/store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const logout = useLogin((s) => s.logout);
  const { users, loading, error, fetchUsers } = useUserStore();
  const { addAccepted, addRejected } = useDecisionStore();
  const [swipedAll, setSwipedAll] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.centerText}>Error loading users</Text>;
  if (users.length === 0)
    return <Text style={styles.centerText}>No users available</Text>;

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navRow}>
        <Text style={styles.navBtn} onPress={() => router.push("/accepted")}>
          Accepted
        </Text>
        <Text style={styles.navBtn} onPress={() => router.push("/rejected")}>
          Rejected
        </Text>
      </View>

      {/* Swipe Cards */}
      <View style={styles.swiperContainer}>
        {swipedAll ? (
          <Text style={styles.centerText}>No more profiles!</Text>
        ) : (
          <Swiper
            cards={users}
            stackSize={3}
            cardVerticalMargin={20}
            animateCardOpacity
            verticalSwipe={false}
            backgroundColor="transparent"
            containerStyle={{ flex: 1 }}
            renderCard={(user) => (
              <View style={styles.card}>
                <Text style={styles.name}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.info}>Age: {user.age}</Text>
                <Text style={styles.info}>Email:</Text>
                <Text style={styles.infoEmail}>{user.email}</Text>
              </View>
            )}
            onSwipedRight={(index) => addAccepted(users[index])}
            onSwipedLeft={(index) => addRejected(users[index])}
            onSwipedAll={() => setSwipedAll(true)}
          />
        )}
      </View>

      {/* Logout */}
      <Text
        style={styles.logout}
        onPress={() => {
          logout();
          router.push("/login/loginScreen");
        }}
      >
        Logout
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  navBtn: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },

  swiperContainer: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.8,
    height: height * 0.55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 8,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 10,
  },
  infoEmail: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 4,
    textAlign: "center",
    flexWrap: "wrap",
  },

  logout: {
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#ff3b30",
    borderRadius: 12,
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    width: "90%",
  },

  centerText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
});
