import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { TRPCProvider } from "@/lib/trpc";
import { ThemeProvider } from "@/lib/theme";
import { OnboardingProvider, useOnboarding } from "@/lib/onboarding";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TRPCProvider>
      <ThemeProvider>
        <OnboardingProvider>
          <RootNavigator />
        </OnboardingProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
}

function RootNavigator() {
  const { isOnboarded } = useOnboarding();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFFFFF" },
          animation: "slide_from_right",
        }}
      >
        {!isOnboarded ? (
          <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        )}
        <Stack.Screen
          name="lieu/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="commune/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="zone-sante/[id]"
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitle: "Retour",
          }}
        />
        <Stack.Screen
          name="recherche"
          options={{
            headerShown: true,
            headerTitle: "Recherche",
            headerBackTitle: "Retour",
          }}
        />
      </Stack>
    </>
  );
}
