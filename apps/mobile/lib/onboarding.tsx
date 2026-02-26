import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingData {
  commune?: string;
  age?: string;
  sexe?: string;
}

interface OnboardingContextType {
  isOnboarded: boolean;
  data: OnboardingData;
  setOnboardingData: (data: OnboardingData) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

const ONBOARDING_KEY = "kinservices_onboarding";

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [data, setData] = useState<OnboardingData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOnboardingState();
  }, []);

  const loadOnboardingState = async () => {
    try {
      const stored = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsOnboarded(parsed.completed || false);
        setData(parsed.data || {});
      }
    } catch (error) {
      console.error("Failed to load onboarding state:", error);
    } finally {
      setLoading(false);
    }
  };

  const setOnboardingData = (newData: OnboardingData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(
        ONBOARDING_KEY,
        JSON.stringify({ completed: true, data }),
      );
      setIsOnboarded(true);
    } catch (error) {
      console.error("Failed to save onboarding state:", error);
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      setIsOnboarded(false);
      setData({});
    } catch (error) {
      console.error("Failed to reset onboarding:", error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarded,
        data,
        setOnboardingData,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
