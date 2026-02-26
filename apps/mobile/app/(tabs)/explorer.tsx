import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";
import { ServiceCategorie, LieuType } from "@kinservices/api";

type Tab = "communes" | "zones" | "categories";

const SERVICE_CATEGORIES: Array<{
  key: ServiceCategorie;
  label: string;
  description: string;
  icon: string;
  color: string;
}> = [
  {
    key: "ETAT_CIVIL",
    label: "État Civil",
    description: "Actes de naissance, mariage, décès",
    icon: "file-text",
    color: "#3B82F6",
  },
  {
    key: "SANTE",
    label: "Santé",
    description: "Hôpitaux, vaccinations, analyses",
    icon: "heart",
    color: "#EF4444",
  },
  {
    key: "EDUCATION",
    label: "Éducation",
    description: "Inscriptions, diplômes, équivalences",
    icon: "book",
    color: "#22C55E",
  },
  {
    key: "SECURITE",
    label: "Sécurité",
    description: "Attestations, casier judiciaire",
    icon: "shield",
    color: "#8B5CF6",
  },
  {
    key: "TRANSPORT",
    label: "Transport",
    description: "Permis, carte grise, transport",
    icon: "truck",
    color: "#F59E0B",
  },
  {
    key: "COMMERCE",
    label: "Commerce",
    description: "Licences commerciales, RCCM",
    icon: "shopping-bag",
    color: "#EC4899",
  },
  {
    key: "SOCIAL",
    label: "Social",
    description: "Aide sociale, pensions",
    icon: "users",
    color: "#06B6D4",
  },
  {
    key: "AUTRE",
    label: "Autre",
    description: "Autres services administratifs",
    icon: "more-horizontal",
    color: "#6B7280",
  },
];

export default function ExplorerScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("communes");

  const { data: communes, isLoading: loadingCommunes } =
    trpc.communes.getAll.useQuery();
  const { data: zones, isLoading: loadingZones } =
    trpc.zonesSante.getAll.useQuery();

  const tabs: Array<{ key: Tab; label: string; icon: string }> = [
    { key: "communes", label: "Communes", icon: "map-pin" },
    { key: "zones", label: "Zones Santé", icon: "activity" },
    { key: "categories", label: "Services", icon: "grid" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorer</Text>
        <Text style={styles.subtitle}>
          Parcourez les services par commune, zone de santé ou catégorie
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Feather
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.key ? colors.primary : colors.muted}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "communes" && (
          <View style={styles.listContainer}>
            {loadingCommunes ? (
              <LoadingPlaceholder count={10} />
            ) : (
              communes?.map((commune) => (
                <TouchableOpacity
                  key={commune.id}
                  style={styles.listItem}
                  onPress={() => router.push(`/commune/${commune.id}`)}
                >
                  <View style={styles.listItemIcon}>
                    <Feather name="map-pin" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{commune.name}</Text>
                    <Text style={styles.listItemSubtitle}>
                      {commune._count?.quartiers || 0} quartiers •{" "}
                      {commune._count?.lieux || 0} lieux
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    size={20}
                    color={colors.muted}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {activeTab === "zones" && (
          <View style={styles.listContainer}>
            {loadingZones ? (
              <LoadingPlaceholder count={10} />
            ) : (
              zones?.map((zone) => (
                <TouchableOpacity
                  key={zone.id}
                  style={styles.listItem}
                  onPress={() => router.push(`/zone-sante/${zone.id}`)}
                >
                  <View
                    style={[
                      styles.listItemIcon,
                      { backgroundColor: `${colors.error}10` },
                    ]}
                  >
                    <Feather name="activity" size={20} color={colors.error} />
                  </View>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>ZS {zone.name}</Text>
                    <Text style={styles.listItemSubtitle}>
                      {zone.commune?.name || "Kinshasa"} •{" "}
                      {zone._count?.lieux || 0} établissements
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    size={20}
                    color={colors.muted}
                  />
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {activeTab === "categories" && (
          <View style={styles.categoriesGrid}>
            {SERVICE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={styles.categoryCard}
                onPress={() => router.push(`/recherche?category=${cat.key}`)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: `${cat.color}15` },
                  ]}
                >
                  <Feather name={cat.icon as any} size={28} color={cat.color} />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
                <Text style={styles.categoryDescription}>
                  {cat.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function LoadingPlaceholder({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.loadingItem}>
          <View style={styles.loadingIcon} />
          <View style={styles.loadingContent}>
            <View style={styles.loadingTitle} />
            <View style={styles.loadingSubtitle} />
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: `${colors.primary}10`,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.sm,
    color: colors.muted,
    fontWeight: "500",
  },
  tabTextActive: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  listContainer: {
    gap: spacing.sm,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
  },
  listItemSubtitle: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: 2,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  categoryLabel: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
  },
  categoryDescription: {
    fontSize: fontSize.xs,
    color: colors.muted,
    marginTop: 2,
  },
  loadingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  loadingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.border,
  },
  loadingContent: {
    flex: 1,
    gap: spacing.xs,
  },
  loadingTitle: {
    height: 16,
    width: "60%",
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  loadingSubtitle: {
    height: 12,
    width: "40%",
    backgroundColor: colors.border,
    borderRadius: 4,
  },
});
