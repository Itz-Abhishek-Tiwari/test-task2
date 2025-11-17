import { ExpoRoot } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ExpoRoot />
    </GestureHandlerRootView>
  );
}
