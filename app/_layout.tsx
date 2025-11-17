import { useLogin } from "@/store/store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayoutNav() {
  const isLogin = useLogin((s) => s.isLogin);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0A84FF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      {isLogin ? (
        <>
          <Stack.Screen
            name="home/homeScreen"
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: "#6C63FF",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="index"
            options={{
              title: "Welcome",
              headerStyle: {
                backgroundColor: "#222",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />

          <Stack.Screen
            name="login/loginScreen"
            options={{
              title: "Login",
              headerStyle: {
                backgroundColor: "#ff3b30",
              },
              headerTitle: "Login",
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
        </>
      )}
    </Stack>
  );
}
