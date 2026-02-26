import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";
import { LieuType } from "@kinservices/api";

const FAVORITES_KEY = "kinservices_favoris";

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

export default function FavorisScreen() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  const removeFavorite = async (id: string) => {
    Alert.alert(
      "Retirer des favoris",
      "Voulez-vous vraiment retirer ce lieu de vos favoris ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Retirer",
          style: "destructive",
          onPress: async () => {
            const newIds = favoriteIds.filter((fid) => fid !== id);
            setFavoriteIds(newIds);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newIds));
          },
        },
      ],
    );
  };

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Favoris</Text>
        <Text style={styles.subtitle}>
          {favoriteIds.length} lieu(x) sauvegardé(s)
        </Text>
      </View>

      {favoriteIds.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Feather name="heart" size={48} color={colors.muted} />
          </View>
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>
            Ajoutez des lieux à vos favoris pour les retrouver facilement
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push("/explorer")}
          >
            <Text style={styles.emptyButtonText}>Explorer les services</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <FavoritesList ids={favoriteIds} onRemove={removeFavorite} />
          <View style={{ height: spacing.xl }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function FavoritesList({
  ids,
  onRemove,
}: {
  ids: string[];
  onRemove: (id: string) => void;
}) {
  return (
    <View style={styles.listContainer}>
      {ids.map((id) => (
        <FavoriteItem key={id} id={id} onRemove={onRemove} />
      ))}
    </View>
  );
}

function FavoriteItem({
  id,
  onRemove,
}: {
  id: string;
  onRemove: (id: string) => void;
}) {
  const { data: lieu, isLoading } = trpc.lieux.getById.useQuery(id);

  if (isLoading) {
    return (
      <View style={styles.listItem}>
        <View style={styles.loadingIcon} />
        <View style={styles.loadingContent}>
          <View style={styles.loadingTitle} />
          <View style={styles.loadingSubtitle} />
        </View>
      </View>
    );
  }

  if (!lieu) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => router.push(`/lieu/${lieu.id}`)}
    >
      <View style={styles.listItemIcon}>
        <Feather name="map-pin" size={20} color={colors.primary} />
      </View>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle} numberOfLines={1}>
          {lieu.nom}
        </Text>
        <View style={styles.listItemMeta}>
          <Text style={styles.listItemType}>{LIEU_TYPE_LABELS[lieu.type]}</Text>
          {lieu.verified && (
            <>
              <Text style={styles.listItemDot}>•</Text>
              <View style={styles.verifiedBadge}>
                <Feather name="check-circle" size={10} color={colors.success} />
                <Text style={styles.verifiedText}>Vérifié</Text>
              </View>
            </>
          )}
        </View>
        {lieu.commune && (
          <Text style={styles.listItemLocation}>
            <Feather name="map-pin" size={10} color={colors.muted} />{" "}
            {lieu.commune.name}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(lieu.id)}
      >
        <Feather name="trash-2" size={18} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: colors.muted,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${colors.muted}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.base,
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  emptyButtonText: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: "white",
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
  listItemMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  listItemType: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  listItemDot: {
    fontSize: fontSize.xs,
    color: colors.muted,
    marginHorizontal: spacing.xs,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  verifiedText: {
    fontSize: fontSize.xs,
    color: colors.success,
  },
  listItemLocation: {
    fontSize: fontSize.xs,
    color: colors.muted,
    marginTop: 2,
  },
  removeButton: {
    padding: spacing.sm,
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
