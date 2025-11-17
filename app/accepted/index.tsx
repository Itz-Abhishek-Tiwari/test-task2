import { useDecisionStore } from "@/store/store";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function AcceptedScreen() {
  const accepted = useDecisionStore((s) => s.accepted);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accepted Profiles</Text>

      <FlatList
        data={accepted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.info}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  title: { color: "white", fontSize: 24, marginBottom: 20 },
  card: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { color: "white", fontSize: 20, fontWeight: "bold" },
  info: { color: "#ccc" },
});
