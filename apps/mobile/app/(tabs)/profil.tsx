import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useOnboarding } from "@/lib/onboarding";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";

export default function ProfilScreen() {
  const { data, resetOnboarding } = useOnboarding();
  const { data: commune } = trpc.communes.getById.useQuery(data.commune || "", {
    enabled: !!data.commune,
  });

  const handleResetOnboarding = () => {
    Alert.alert(
      "Réinitialiser les préférences",
      "Voulez-vous vraiment réinitialiser vos préférences ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () => {
            resetOnboarding();
            router.replace("/onboarding");
          },
        },
      ],
    );
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Feather name="user" size={40} color={colors.primary} />
          </View>
          <Text style={styles.title}>Mon Profil</Text>
          <Text style={styles.subtitle}>
            Gérez vos préférences et paramètres
          </Text>
        </View>

        {/* User Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes préférences</Text>
          <View style={styles.card}>
            <View style={styles.cardItem}>
              <View style={styles.cardItemIcon}>
                <Feather name="map-pin" size={18} color={colors.primary} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>Commune</Text>
                <Text style={styles.cardItemValue}>
                  {commune?.name || "Non définie"}
                </Text>
              </View>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardItem}>
              <View style={styles.cardItemIcon}>
                <Feather name="calendar" size={18} color={colors.primary} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>Tranche d'âge</Text>
                <Text style={styles.cardItemValue}>
                  {data.age || "Non définie"}
                </Text>
              </View>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardItem}>
              <View style={styles.cardItemIcon}>
                <Feather name="user" size={18} color={colors.primary} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>Genre</Text>
                <Text style={styles.cardItemValue}>
                  {data.sexe || "Non défini"}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleResetOnboarding}
          >
            <Feather name="edit-2" size={16} color={colors.primary} />
            <Text style={styles.editButtonText}>Modifier mes préférences</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.card}>
            <View style={styles.cardItem}>
              <View style={styles.cardItemIcon}>
                <Feather name="bell" size={18} color={colors.foreground} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>Notifications</Text>
              </View>
              <Switch
                value={true}
                trackColor={{
                  false: colors.border,
                  true: `${colors.primary}50`,
                }}
                thumbColor={colors.primary}
              />
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardItem}>
              <View style={styles.cardItemIcon}>
                <Feather name="map" size={18} color={colors.foreground} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>Localisation</Text>
              </View>
              <Switch
                value={true}
                trackColor={{
                  false: colors.border,
                  true: `${colors.primary}50`,
                }}
                thumbColor={colors.primary}
              />
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => openLink("https://kinservices.cd/about")}
            >
              <View style={styles.cardItemIcon}>
                <Feather name="info" size={18} color={colors.foreground} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>
                  À propos de Kin Services
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </TouchableOpacity>
            <View style={styles.cardDivider} />
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => openLink("https://kinservices.cd/privacy")}
            >
              <View style={styles.cardItemIcon}>
                <Feather name="shield" size={18} color={colors.foreground} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>
                  Politique de confidentialité
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </TouchableOpacity>
            <View style={styles.cardDivider} />
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => openLink("https://kinservices.cd/terms")}
            >
              <View style={styles.cardItemIcon}>
                <Feather name="file-text" size={18} color={colors.foreground} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>
                  Conditions d'utilisation
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </TouchableOpacity>
            <View style={styles.cardDivider} />
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() =>
                openLink("mailto:contact@kinservices.cd?subject=Feedback")
              }
            >
              <View style={styles.cardItemIcon}>
                <Feather name="mail" size={18} color={colors.foreground} />
              </View>
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemLabel}>Nous contacter</Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Version */}
        <View style={styles.version}>
          <Text style={styles.versionText}>Kin Services v1.0.0</Text>
          <Text style={styles.versionSubtext}>Fait avec ❤️ pour Kinshasa</Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: colors.foreground,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  cardItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  cardItemContent: {
    flex: 1,
  },
  cardItemLabel: {
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  cardItemValue: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 60,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  editButtonText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  version: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.muted,
  },
  versionSubtext: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
});
