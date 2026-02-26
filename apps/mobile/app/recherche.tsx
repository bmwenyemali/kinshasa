import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";
import { LieuType, ServiceCategorie } from "@kinservices/api";

const LIEU_TYPE_LABELS: Record<LieuType, string> = {
  HOPITAL: "Hôpital",
  CLINIQUE: "Clinique",
  CENTRE_SANTE: "Centre de Santé",
  ADMINISTRATION: "Administration",
  MAIRIE: "Mairie",
  COMMISSARIAT: "Commissariat",
  TRIBUNAL: "Tribunal",
  ECOLE: "École",
  UNIVERSITE: "Université",
  AUTRE: "Autre",
};

const SERVICE_CATEGORIE_LABELS: Record<ServiceCategorie, string> = {
  ETAT_CIVIL: "État Civil",
  SANTE: "Santé",
  JUSTICE: "Justice",
  EDUCATION: "Éducation",
  IMPOTS: "Impôts",
  URGENCE: "Urgence",
  SOCIAL: "Social",
  TRANSPORT: "Transport",
  AUTRE: "Autre",
};

export default function RechercheScreen() {
  const params = useLocalSearchParams();
  const initialQuery = (params.q as string) || "";
  const initialType = params.type as LieuType | undefined;
  const initialCategory = params.category as ServiceCategorie | undefined;

  const [query, setQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<LieuType[]>(
    initialType ? [initialType] : [],
  );
  const [selectedCategories, setSelectedCategories] = useState<
    ServiceCategorie[]
  >(initialCategory ? [initialCategory] : []);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: results,
    isLoading,
    refetch,
  } = trpc.search.advanced.useQuery({
    query: query || undefined,
    types: selectedTypes.length > 0 ? selectedTypes : undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    verified: true,
    limit: 30,
  });

  const toggleType = (type: LieuType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleCategory = (cat: ServiceCategorie) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
  };

  const hasFilters = selectedTypes.length > 0 || selectedCategories.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Recherche",
          headerSearchBarOptions: undefined,
        }}
      />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={18} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un service..."
            placeholderTextColor={colors.muted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Feather name="x" size={18} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.filterButton,
            showFilters && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather
            name="sliders"
            size={18}
            color={showFilters ? colors.primary : colors.foreground}
          />
          {hasFilters && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {selectedTypes.length + selectedCategories.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Type de lieu</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.entries(LIEU_TYPE_LABELS).map(([type, label]) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterChip,
                    selectedTypes.includes(type as LieuType) &&
                      styles.filterChipActive,
                  ]}
                  onPress={() => toggleType(type as LieuType)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedTypes.includes(type as LieuType) &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Catégorie</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.entries(SERVICE_CATEGORIE_LABELS).map(([cat, label]) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterChip,
                    selectedCategories.includes(cat as ServiceCategorie) &&
                      styles.filterChipActive,
                  ]}
                  onPress={() => toggleCategory(cat as ServiceCategorie)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCategories.includes(cat as ServiceCategorie) &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {hasFilters && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Feather name="x" size={14} color={colors.error} />
              <Text style={styles.clearButtonText}>Effacer les filtres</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Results */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : results && results.items.length > 0 ? (
          <>
            <Text style={styles.resultsCount}>
              {results.total} résultat(s) trouvé(s)
            </Text>
            {results.items.map((lieu) => (
              <TouchableOpacity
                key={lieu.id}
                style={styles.resultItem}
                onPress={() => router.push(`/lieu/${lieu.id}`)}
              >
                <View style={styles.resultIcon}>
                  <Feather name="map-pin" size={20} color={colors.primary} />
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultName} numberOfLines={1}>
                    {lieu.nom}
                  </Text>
                  <View style={styles.resultMeta}>
                    <Text style={styles.resultType}>
                      {LIEU_TYPE_LABELS[lieu.type]}
                    </Text>
                    {lieu.commune && (
                      <>
                        <Text style={styles.resultDot}>•</Text>
                        <Text style={styles.resultCommune}>
                          {lieu.commune.name}
                        </Text>
                      </>
                    )}
                  </View>
                  {lieu.servicesProposed &&
                    lieu.servicesProposed.length > 0 && (
                      <Text style={styles.resultServices}>
                        {lieu.servicesProposed.length} service(s)
                      </Text>
                    )}
                </View>
                {lieu.verified && (
                  <Feather
                    name="check-circle"
                    size={16}
                    color={colors.success}
                  />
                )}
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Feather name="search" size={48} color={colors.muted} />
            <Text style={styles.emptyTitle}>Aucun résultat</Text>
            <Text style={styles.emptyText}>
              Essayez avec d'autres termes ou modifiez vos filtres
            </Text>
          </View>
        )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.foreground,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonActive: {
    backgroundColor: `${colors.primary}15`,
  },
  filterBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  filtersContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterSection: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  filterTitle: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.muted,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    color: colors.muted,
  },
  filterChipTextActive: {
    color: colors.primary,
    fontWeight: "500",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  clearButtonText: {
    fontSize: fontSize.sm,
    color: colors.error,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  loadingContainer: {
    paddingVertical: spacing.xl * 2,
    alignItems: "center",
  },
  resultsCount: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginBottom: spacing.md,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  resultIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  resultType: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  resultDot: {
    fontSize: fontSize.xs,
    color: colors.muted,
    marginHorizontal: spacing.xs,
  },
  resultCommune: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  resultServices: {
    fontSize: fontSize.xs,
    color: colors.primary,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
    marginTop: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
