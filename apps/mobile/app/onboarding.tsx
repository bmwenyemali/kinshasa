import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useOnboarding } from "@/lib/onboarding";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";

const { width } = Dimensions.get("window");

type Step = "welcome" | "commune" | "profile" | "complete";

export default function OnboardingScreen() {
  const [step, setStep] = useState<Step>("welcome");
  const [selectedCommune, setSelectedCommune] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedSexe, setSelectedSexe] = useState<string | null>(null);

  const { setOnboardingData, completeOnboarding } = useOnboarding();
  const { data: communes } = trpc.communes.getAll.useQuery();

  const handleNext = () => {
    if (step === "welcome") {
      setStep("commune");
    } else if (step === "commune") {
      setOnboardingData({ commune: selectedCommune || undefined });
      setStep("profile");
    } else if (step === "profile") {
      setOnboardingData({
        age: selectedAge || undefined,
        sexe: selectedSexe || undefined,
      });
      setStep("complete");
    } else if (step === "complete") {
      completeOnboarding();
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace("/(tabs)");
  };

  const ageRanges = [
    "Moins de 18 ans",
    "18-25 ans",
    "26-35 ans",
    "36-45 ans",
    "46-55 ans",
    "Plus de 55 ans",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        {/* Skip button */}
        {step !== "complete" && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        )}

        {/* Welcome Step */}
        {step === "welcome" && (
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Feather name="map-pin" size={64} color="white" />
            </View>
            <Text style={styles.title}>Bienvenue sur{"\n"}Kin Services</Text>
            <Text style={styles.subtitle}>
              Trouvez facilement tous les services publics de Kinshasa avec les
              informations dont vous avez besoin.
            </Text>

            <View style={styles.features}>
              <FeatureItem
                icon="search"
                text="Recherchez des services près de chez vous"
              />
              <FeatureItem
                icon="file-text"
                text="Documents requis et prix officiels"
              />
              <FeatureItem icon="clock" text="Délais et horaires d'ouverture" />
              <FeatureItem icon="navigation" text="Directions et itinéraires" />
            </View>
          </View>
        )}

        {/* Commune Step */}
        {step === "commune" && (
          <View style={styles.content}>
            <Text style={styles.stepTitle}>Votre Commune</Text>
            <Text style={styles.stepSubtitle}>
              Sélectionnez votre commune pour des recommandations personnalisées
            </Text>

            <ScrollView
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            >
              {communes?.map((commune) => (
                <TouchableOpacity
                  key={commune.id}
                  style={[
                    styles.optionItem,
                    selectedCommune === commune.id && styles.optionItemSelected,
                  ]}
                  onPress={() => setSelectedCommune(commune.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCommune === commune.id &&
                        styles.optionTextSelected,
                    ]}
                  >
                    {commune.name}
                  </Text>
                  {selectedCommune === commune.id && (
                    <Feather name="check" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Profile Step */}
        {step === "profile" && (
          <View style={styles.content}>
            <Text style={styles.stepTitle}>À propos de vous</Text>
            <Text style={styles.stepSubtitle}>
              Ces informations nous aident à personnaliser votre expérience
              (optionnel)
            </Text>

            <Text style={styles.sectionLabel}>Tranche d'âge</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            >
              {ageRanges.map((age) => (
                <TouchableOpacity
                  key={age}
                  style={[
                    styles.chipItem,
                    selectedAge === age && styles.chipItemSelected,
                  ]}
                  onPress={() => setSelectedAge(age)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedAge === age && styles.chipTextSelected,
                    ]}
                  >
                    {age}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionLabel}>Genre</Text>
            <View style={styles.genderRow}>
              {["Homme", "Femme", "Autre"].map((sexe) => (
                <TouchableOpacity
                  key={sexe}
                  style={[
                    styles.genderItem,
                    selectedSexe === sexe && styles.genderItemSelected,
                  ]}
                  onPress={() => setSelectedSexe(sexe)}
                >
                  <Feather
                    name={
                      sexe === "Homme"
                        ? "user"
                        : sexe === "Femme"
                          ? "user"
                          : "users"
                    }
                    size={24}
                    color={selectedSexe === sexe ? colors.primary : "white"}
                  />
                  <Text
                    style={[
                      styles.genderText,
                      selectedSexe === sexe && styles.genderTextSelected,
                    ]}
                  >
                    {sexe}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Complete Step */}
        {step === "complete" && (
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Feather name="check-circle" size={64} color="white" />
            </View>
            <Text style={styles.title}>Tout est prêt !</Text>
            <Text style={styles.subtitle}>
              Vous pouvez maintenant explorer tous les services publics de
              Kinshasa.
            </Text>
          </View>
        )}

        {/* Navigation */}
        <View style={styles.navigation}>
          <View style={styles.dots}>
            {["welcome", "commune", "profile", "complete"].map((s, i) => (
              <View
                key={s}
                style={[styles.dot, step === s && styles.dotActive]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>
              {step === "complete" ? "Commencer" : "Suivant"}
            </Text>
            <Feather name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Feather name={icon as any} size={20} color={colors.primary} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  skipButton: {
    alignSelf: "flex-end",
    padding: spacing.sm,
  },
  skipText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: fontSize.base,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize["3xl"],
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 26,
  },
  features: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    color: "white",
    fontSize: fontSize.base,
    flex: 1,
  },
  stepTitle: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: "white",
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    fontSize: fontSize.base,
    color: "rgba(255,255,255,0.8)",
    marginBottom: spacing.lg,
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  optionItemSelected: {
    backgroundColor: "white",
  },
  optionText: {
    color: "white",
    fontSize: fontSize.base,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  sectionLabel: {
    color: "white",
    fontSize: fontSize.base,
    fontWeight: "600",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  horizontalList: {
    flexGrow: 0,
  },
  chipItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  chipItemSelected: {
    backgroundColor: "white",
  },
  chipText: {
    color: "white",
    fontSize: fontSize.sm,
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  genderRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  genderItem: {
    flex: 1,
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: borderRadius.lg,
  },
  genderItemSelected: {
    backgroundColor: "white",
  },
  genderText: {
    color: "white",
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  genderTextSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  dots: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  dotActive: {
    backgroundColor: "white",
    width: 24,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  nextText: {
    color: "white",
    fontSize: fontSize.base,
    fontWeight: "600",
  },
});
