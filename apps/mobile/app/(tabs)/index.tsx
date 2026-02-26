import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";
import { ServiceCategorie, LieuType } from "@kinservices/api";

const { width } = Dimensions.get("window");
const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

const SERVICE_CATEGORIES: Array<{
  key: ServiceCategorie;
  label: string;
  icon: string;
  color: string;
}> = [
  {
    key: "ETAT_CIVIL",
    label: "État Civil",
    icon: "file-text",
    color: "#3B82F6",
  },
  { key: "SANTE", label: "Santé", icon: "heart", color: "#EF4444" },
  { key: "EDUCATION", label: "Éducation", icon: "book", color: "#22C55E" },
  { key: "SECURITE", label: "Sécurité", icon: "shield", color: "#8B5CF6" },
  { key: "TRANSPORT", label: "Transport", icon: "truck", color: "#F59E0B" },
  {
    key: "COMMERCE",
    label: "Commerce",
    icon: "shopping-bag",
    color: "#EC4899",
  },
];

const LIEU_TYPES: Array<{
  key: LieuType;
  label: string;
  icon: string;
}> = [
  { key: "HOPITAL", label: "Hôpitaux", icon: "activity" },
  { key: "ADMINISTRATION", label: "Administrations", icon: "briefcase" },
  { key: "COMMISSARIAT", label: "Commissariats", icon: "shield" },
  { key: "ECOLE", label: "Écoles", icon: "book-open" },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { data: featuredLieux, refetch: refetchFeatured } =
    trpc.lieux.featured.useQuery({ limit: 4 });
  const { data: communes } = trpc.communes.getAll.useQuery();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchFeatured();
    setRefreshing(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigateToCategory = (category: ServiceCategorie) => {
    router.push(`/recherche?category=${category}`);
  };

  const navigateToType = (type: LieuType) => {
    router.push(`/recherche?type=${type}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header with Search */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Mbote! 👋</Text>
            <Text style={styles.title}>Trouvez un service public</Text>

            <View style={styles.searchContainer}>
              <Feather name="search" size={20} color={colors.muted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un service..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Feather name="x" size={20} color={colors.muted} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <TouchableOpacity onPress={() => router.push("/explorer")}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={styles.categoryCard}
                onPress={() => navigateToCategory(cat.key)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: `${cat.color}20` },
                  ]}
                >
                  <Feather name={cat.icon as any} size={24} color={cat.color} />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>
          <View style={styles.quickAccessGrid}>
            {LIEU_TYPES.map((type) => (
              <TouchableOpacity
                key={type.key}
                style={styles.quickAccessCard}
                onPress={() => navigateToType(type.key)}
              >
                <View style={styles.quickAccessIcon}>
                  <Feather
                    name={type.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.quickAccessLabel}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Lieux */}
        {featuredLieux && featuredLieux.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lieux populaires</Text>
              <TouchableOpacity onPress={() => router.push("/explorer")}>
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {featuredLieux.map((lieu) => (
                <TouchableOpacity
                  key={lieu.id}
                  style={styles.featuredCard}
                  onPress={() => router.push(`/lieu/${lieu.id}`)}
                >
                  <View style={styles.featuredImagePlaceholder}>
                    <Feather name="map-pin" size={32} color={colors.primary} />
                  </View>
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredName} numberOfLines={2}>
                      {lieu.nom}
                    </Text>
                    {lieu.commune && (
                      <View style={styles.featuredLocation}>
                        <Feather
                          name="map-pin"
                          size={12}
                          color={colors.muted}
                        />
                        <Text style={styles.featuredLocationText}>
                          {lieu.commune.name}
                        </Text>
                      </View>
                    )}
                    {lieu.verified && (
                      <View style={styles.verifiedBadge}>
                        <Feather
                          name="check-circle"
                          size={12}
                          color={colors.success}
                        />
                        <Text style={styles.verifiedText}>Vérifié</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Explore Communes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Communes</Text>
            <TouchableOpacity onPress={() => router.push("/explorer")}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.communesContainer}
          >
            {communes?.slice(0, 8).map((commune) => (
              <TouchableOpacity
                key={commune.id}
                style={styles.communeChip}
                onPress={() => router.push(`/commune/${commune.id}`)}
              >
                <Text style={styles.communeChipText}>{commune.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom spacing */}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {},
  greeting: {
    fontSize: fontSize.lg,
    color: "rgba(255,255,255,0.9)",
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: "white",
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
  },
  seeAll: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  categoriesContainer: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  categoryCard: {
    alignItems: "center",
    width: 80,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  categoryLabel: {
    fontSize: fontSize.xs,
    color: colors.foreground,
    textAlign: "center",
  },
  quickAccessGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  quickAccessCard: {
    width: cardWidth,
    backgroundColor: "white",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAccessLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: "500",
    color: colors.foreground,
  },
  featuredContainer: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  featuredCard: {
    width: 200,
    backgroundColor: "white",
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredImagePlaceholder: {
    height: 100,
    backgroundColor: `${colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredContent: {
    padding: spacing.md,
  },
  featuredName: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  featuredLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featuredLocationText: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: spacing.xs,
  },
  verifiedText: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: "500",
  },
  communesContainer: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  communeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "white",
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  communeChipText: {
    fontSize: fontSize.sm,
    color: colors.foreground,
  },
});
