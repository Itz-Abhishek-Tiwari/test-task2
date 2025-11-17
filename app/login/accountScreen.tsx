import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (mail) => /\S+@\S+\.\S+/.test(mail);

  const handleCreateAccount = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      await AsyncStorage.setItem("user_account", JSON.stringify(userData));
      setSuccess("Account created & saved successfully!");
    } catch (err) {
      setError("Error saving data");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
        onChangeText={setName}
        value={name}
      />

      <TextInput
        placeholder="Email"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
        onChangeText={setPassword}
        value={password}
      />

      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}
      {success ? (
        <Text style={{ color: "green", marginBottom: 10 }}>{success}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleCreateAccount}
        style={{
          backgroundColor: "black",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Save Account</Text>
      </TouchableOpacity>
    </View>
  );
}
