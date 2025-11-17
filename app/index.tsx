import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.subtitle}>
        Please continue to login or create an account
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/login/loginScreen")}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineBtn}
        onPress={() => router.push("/login/accountScreen")}
      >
        <Text  style={styles.outlineBtnText}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
  },

  btn: {
    backgroundColor: "#0A84FF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  outlineBtn: {
    borderWidth: 2,
    borderColor: "#0A84FF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  outlineBtnText: {
    color: "#0A84FF",
    fontSize: 18,
    fontWeight: "700",
  },
});
