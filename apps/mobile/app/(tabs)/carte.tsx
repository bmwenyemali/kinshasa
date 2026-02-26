import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import MapboxGL from "@rnmapbox/maps";
import * as Location from "expo-location";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";
import { LieuType } from "@kinservices/api";

// Initialize Mapbox
MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || "");

const { width, height } = Dimensions.get("window");

const LIEU_TYPE_COLORS: Record<LieuType, string> = {
  HOPITAL: "#EF4444",
  CLINIQUE: "#F87171",
  CENTRE_SANTE: "#FB923C",
  ADMINISTRATION: "#3B82F6",
  MAIRIE: "#60A5FA",
  COMMISSARIAT: "#8B5CF6",
  TRIBUNAL: "#A78BFA",
  ECOLE: "#22C55E",
  UNIVERSITE: "#34D399",
  AUTRE: "#6B7280",
};

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

interface Lieu {
  id: string;
  nom: string;
  type: LieuType;
  latitude: number | null;
  longitude: number | null;
  adresse: string | null;
  verified: boolean;
  commune?: { name: string } | null;
}

export default function CarteScreen() {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  const [selectedLieu, setSelectedLieu] = useState<Lieu | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<LieuType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const { data: lieux, isLoading } = trpc.lieux.search.useQuery({
    types: selectedTypes.length > 0 ? selectedTypes : undefined,
    verified: true,
    limit: 500,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const toggleType = (type: LieuType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const filteredLieux =
    lieux?.filter((lieu) => lieu.latitude && lieu.longitude) || [];

  const handleMarkerPress = (lieu: Lieu) => {
    setSelectedLieu(lieu);
    if (lieu.latitude && lieu.longitude) {
      cameraRef.current?.setCamera({
        centerCoordinate: [lieu.longitude, lieu.latitude],
        zoomLevel: 15,
        animationDuration: 500,
      });
    }
  };

  const centerOnUser = () => {
    if (userLocation) {
      cameraRef.current?.setCamera({
        centerCoordinate: [userLocation.longitude, userLocation.latitude],
        zoomLevel: 14,
        animationDuration: 500,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Carte</Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showFilters && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather
            name="filter"
            size={18}
            color={showFilters ? colors.primary : colors.foreground}
          />
          {selectedTypes.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{selectedTypes.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
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
                <View
                  style={[
                    styles.filterChipDot,
                    {
                      backgroundColor: LIEU_TYPE_COLORS[type as LieuType],
                    },
                  ]}
                />
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
      )}

      {/* Map */}
      <View style={styles.mapContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Chargement de la carte...</Text>
          </View>
        ) : (
          <MapboxGL.MapView
            ref={mapRef}
            style={styles.map}
            styleURL={MapboxGL.StyleURL.Street}
            logoEnabled={false}
            attributionEnabled={false}
          >
            <MapboxGL.Camera
              ref={cameraRef}
              zoomLevel={11}
              centerCoordinate={[15.2663, -4.4419]} // Kinshasa center
              animationMode="flyTo"
              animationDuration={0}
            />

            {/* User location */}
            <MapboxGL.UserLocation visible={true} />

            {/* Markers */}
            {filteredLieux.map((lieu) => (
              <MapboxGL.PointAnnotation
                key={lieu.id}
                id={lieu.id}
                coordinate={[lieu.longitude!, lieu.latitude!]}
                onSelected={() => handleMarkerPress(lieu)}
              >
                <View
                  style={[
                    styles.marker,
                    {
                      backgroundColor: LIEU_TYPE_COLORS[lieu.type],
                      transform: [
                        { scale: selectedLieu?.id === lieu.id ? 1.3 : 1 },
                      ],
                    },
                  ]}
                >
                  <Feather name="map-pin" size={12} color="white" />
                </View>
              </MapboxGL.PointAnnotation>
            ))}
          </MapboxGL.MapView>
        )}

        {/* Center on user button */}
        {userLocation && (
          <TouchableOpacity style={styles.centerButton} onPress={centerOnUser}>
            <Feather name="navigation" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {filteredLieux.length} lieu(x) affiché(s)
          </Text>
        </View>
      </View>

      {/* Selected lieu panel */}
      {selectedLieu && (
        <View style={styles.lieuPanel}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedLieu(null)}
          >
            <Feather name="x" size={20} color={colors.muted} />
          </TouchableOpacity>

          <View style={styles.lieuContent}>
            <View
              style={[
                styles.lieuTypeIcon,
                { backgroundColor: `${LIEU_TYPE_COLORS[selectedLieu.type]}15` },
              ]}
            >
              <Feather
                name="map-pin"
                size={24}
                color={LIEU_TYPE_COLORS[selectedLieu.type]}
              />
            </View>
            <View style={styles.lieuInfo}>
              <Text style={styles.lieuName} numberOfLines={2}>
                {selectedLieu.nom}
              </Text>
              <View style={styles.lieuMeta}>
                <View style={styles.lieuBadge}>
                  <Text style={styles.lieuBadgeText}>
                    {LIEU_TYPE_LABELS[selectedLieu.type]}
                  </Text>
                </View>
                {selectedLieu.verified && (
                  <View style={[styles.lieuBadge, styles.lieuBadgeSuccess]}>
                    <Feather name="check" size={10} color={colors.success} />
                    <Text
                      style={[styles.lieuBadgeText, { color: colors.success }]}
                    >
                      Vérifié
                    </Text>
                  </View>
                )}
              </View>
              {selectedLieu.adresse && (
                <Text style={styles.lieuAddress} numberOfLines={1}>
                  {selectedLieu.adresse}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.lieuActions}>
            <TouchableOpacity
              style={styles.lieuActionButton}
              onPress={() => router.push(`/lieu/${selectedLieu.id}`)}
            >
              <Text style={styles.lieuActionText}>Voir détails</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.lieuActionButton, styles.lieuActionButtonOutline]}
              onPress={() => {
                // Open in maps
              }}
            >
              <Feather name="navigation" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: colors.foreground,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  filterChipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    color: colors.muted,
  },
  filterChipTextActive: {
    color: colors.primary,
    fontWeight: "500",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.muted,
  },
  marker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  centerButton: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsText: {
    fontSize: fontSize.sm,
    color: colors.muted,
  },
  lieuPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    padding: spacing.xs,
  },
  lieuContent: {
    flexDirection: "row",
    gap: spacing.md,
  },
  lieuTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  lieuInfo: {
    flex: 1,
  },
  lieuName: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
  },
  lieuMeta: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  lieuBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
  },
  lieuBadgeSuccess: {
    backgroundColor: `${colors.success}15`,
  },
  lieuBadgeText: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  lieuAddress: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  lieuActions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  lieuActionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  lieuActionButtonOutline: {
    flex: 0,
    width: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  lieuActionText: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: "white",
  },
});
