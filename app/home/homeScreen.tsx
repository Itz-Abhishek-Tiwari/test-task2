import { useDecisionStore, useLogin, useUserStore } from "@/store/store";

import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";

const HomeScreen = () => {
  const router = useRouter();
  const logout = useLogin((s) => s.logout);
  const { users, loading, error, fetchUsers } = useUserStore();
  const { addAccepted, addRejected } = useDecisionStore();

  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading users</Text>;

  const handleAccept = () => {
    const user = users[page];
    addAccepted(user);

    // go to next page
    if (page < users.length - 1) {
      pagerRef.current.setPage(page + 1);
      setPage(page + 1);
    }
  };

  const handleReject = () => {
    const user = users[page];
    addRejected(user);

    // go to next page
    if (page < users.length - 1) {
      pagerRef.current.setPage(page + 1);
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* SWIPE CARDS */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => router.push("/accepted")}
        >
          <Text style={styles.viewTxt}>View Accepted</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => router.push("/rejected")}
        >
          <Text style={styles.viewTxt}>View Rejected</Text>
        </TouchableOpacity>
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {users.map((u) => (
          <View style={styles.card} key={u.id}>
            <Text style={styles.name}>
              {u.firstName} {u.lastName}
            </Text>
            <Text style={styles.info}>Age: {u.age}</Text>
            <Text style={styles.info}>Email: {u.email}</Text>
          </View>
        ))}
      </PagerView>

      {/* BUTTONS */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.reject} onPress={handleReject}>
          <Text style={styles.txt}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accept} onPress={handleAccept}>
          <Text style={styles.txt}>Accept</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          logout();
          router.push("/login/loginScreen");
        }}
      >
        <Text style={styles.logoutTxt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#111" },
  pager: { flex: 1 },
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: "white", fontSize: 28, fontWeight: "bold" },
  info: { color: "#ccc", marginTop: 8, fontSize: 18 },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  reject: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  accept: {
    backgroundColor: "#44cc44",
    padding: 15,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  txt: { color: "white", fontSize: 18, fontWeight: "bold" },

  logout: {
    padding: 12,
    backgroundColor: "red",
    margin: 15,
    borderRadius: 10,
  },
  logoutTxt: { color: "white", textAlign: "center", fontSize: 16 },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  viewBtn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  viewTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
