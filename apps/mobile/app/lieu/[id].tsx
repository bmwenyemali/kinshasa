import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Share,
  Alert,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trpc } from "@/lib/trpc";
import { colors, spacing, fontSize, borderRadius } from "@/lib/theme";
import { LieuType, ServiceCategorie } from "@kinservices/api";

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

export default function LieuDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const {
    data: lieu,
    isLoading,
    error,
  } = trpc.lieux.getById.useQuery(id || "");

  useEffect(() => {
    checkFavorite();
  }, [id]);

  const checkFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const ids = JSON.parse(stored);
        setIsFavorite(ids.includes(id));
      }
    } catch (error) {
      console.error("Failed to check favorite:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let ids: string[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        ids = ids.filter((fid) => fid !== id);
      } else {
        ids.push(id || "");
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleShare = async () => {
    if (!lieu) return;
    try {
      await Share.share({
        message: `${lieu.nom}\n${lieu.adresse || ""}\nTrouvé sur Kin Services`,
        title: lieu.nom,
      });
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleDirections = () => {
    if (!lieu?.latitude || !lieu?.longitude) {
      Alert.alert("Erreur", "Coordonnées non disponibles");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lieu.latitude},${lieu.longitude}`;
    Linking.openURL(url);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerTitle: "Chargement..." }} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !lieu) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerTitle: "Erreur" }} />
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={48} color={colors.error} />
          <Text style={styles.errorTitle}>Lieu non trouvé</Text>
          <Text style={styles.errorText}>
            Ce lieu n'existe pas ou a été supprimé.
          </Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => router.back()}
          >
            <Text style={styles.errorButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Group services by category
  const servicesByCategory = lieu.servicesProposed?.reduce(
    (acc, service) => {
      const cat = service.categorie;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(service);
      return acc;
    },
    {} as Record<ServiceCategorie, typeof lieu.servicesProposed>,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={toggleFavorite}
              >
                <Feather
                  name="heart"
                  size={20}
                  color={isFavorite ? colors.error : colors.foreground}
                  fill={isFavorite ? colors.error : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleShare}
              >
                <Feather name="share-2" size={20} color={colors.foreground} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.typeIcon}>
            <Feather name="map-pin" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>{lieu.nom}</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {LIEU_TYPE_LABELS[lieu.type]}
              </Text>
            </View>
            {lieu.verified && (
              <View style={[styles.badge, styles.badgeSuccess]}>
                <Feather name="check-circle" size={12} color={colors.success} />
                <Text style={[styles.badgeText, { color: colors.success }]}>
                  Vérifié
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Location & Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.card}>
            {lieu.adresse && (
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Feather name="map-pin" size={18} color={colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Adresse</Text>
                  <Text style={styles.infoValue}>{lieu.adresse}</Text>
                </View>
              </View>
            )}
            {lieu.commune && (
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Feather name="home" size={18} color={colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Commune</Text>
                  <Text style={styles.infoValue}>{lieu.commune.name}</Text>
                </View>
              </View>
            )}
            {lieu.telephone && (
              <TouchableOpacity
                style={styles.infoItem}
                onPress={() => handleCall(lieu.telephone!)}
              >
                <View style={styles.infoIcon}>
                  <Feather name="phone" size={18} color={colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Téléphone</Text>
                  <Text style={[styles.infoValue, { color: colors.primary }]}>
                    {lieu.telephone}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {lieu.horaires && (
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Feather name="clock" size={18} color={colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Horaires</Text>
                  <Text style={styles.infoValue}>{lieu.horaires}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Directions button */}
          {lieu.latitude && lieu.longitude && (
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={handleDirections}
            >
              <Feather name="navigation" size={18} color="white" />
              <Text style={styles.directionsText}>Obtenir l'itinéraire</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Services */}
        {servicesByCategory && Object.keys(servicesByCategory).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services disponibles</Text>
            {Object.entries(servicesByCategory).map(([cat, services]) => (
              <View key={cat} style={styles.serviceCategory}>
                <Text style={styles.serviceCategoryTitle}>
                  {SERVICE_CATEGORIE_LABELS[cat as ServiceCategorie]}
                </Text>
                {services?.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    style={styles.serviceItem}
                    onPress={() =>
                      setExpandedService(
                        expandedService === service.id ? null : service.id,
                      )
                    }
                  >
                    <View style={styles.serviceHeader}>
                      <Text style={styles.serviceName}>{service.nom}</Text>
                      <Feather
                        name={
                          expandedService === service.id
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={18}
                        color={colors.muted}
                      />
                    </View>
                    {service.prixOfficiel && (
                      <Text style={styles.servicePrice}>
                        {service.prixOfficiel} FC
                      </Text>
                    )}
                    {expandedService === service.id && (
                      <View style={styles.serviceDetails}>
                        {service.documentsRequis && (
                          <View style={styles.serviceDetail}>
                            <Text style={styles.serviceDetailLabel}>
                              Documents requis:
                            </Text>
                            <Text style={styles.serviceDetailValue}>
                              {service.documentsRequis}
                            </Text>
                          </View>
                        )}
                        {service.delaiEstime && (
                          <View style={styles.serviceDetail}>
                            <Text style={styles.serviceDetailLabel}>
                              Délai estimé:
                            </Text>
                            <Text style={styles.serviceDetailValue}>
                              {service.delaiEstime}
                            </Text>
                          </View>
                        )}
                        {service.procedure && (
                          <View style={styles.serviceDetail}>
                            <Text style={styles.serviceDetailLabel}>
                              Procédure:
                            </Text>
                            <Text style={styles.serviceDetailValue}>
                              {service.procedure}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Reviews */}
        {lieu.avis && lieu.avis.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avis ({lieu.avis.length})</Text>
            {lieu.avis.slice(0, 5).map((avis) => (
              <View key={avis.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewStars}>
                    {[...Array(5)].map((_, i) => (
                      <Feather
                        key={i}
                        name="star"
                        size={14}
                        color={i < avis.note ? colors.warning : colors.border}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewDate}>
                    {new Date(avis.createdAt).toLocaleDateString("fr-FR")}
                  </Text>
                </View>
                {avis.commentaire && (
                  <Text style={styles.reviewComment}>{avis.commentaire}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={{ height: spacing.xl * 2 }} />
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: colors.muted,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  errorTitle: {
    fontSize: fontSize.xl,
    fontWeight: "600",
    color: colors.foreground,
    marginTop: spacing.md,
  },
  errorText: {
    fontSize: fontSize.base,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  errorButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  errorButtonText: {
    color: "white",
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  headerButton: {
    padding: spacing.xs,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  typeIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "bold",
    color: colors.foreground,
    textAlign: "center",
  },
  badges: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
  },
  badgeSuccess: {
    backgroundColor: `${colors.success}15`,
  },
  badgeText: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.sm,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  infoValue: {
    fontSize: fontSize.base,
    color: colors.foreground,
    marginTop: 2,
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  directionsText: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: "white",
  },
  serviceCategory: {
    marginBottom: spacing.md,
  },
  serviceCategoryTitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  serviceItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceName: {
    fontSize: fontSize.base,
    fontWeight: "500",
    color: colors.foreground,
    flex: 1,
  },
  servicePrice: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: spacing.xs,
  },
  serviceDetails: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  serviceDetail: {
    marginBottom: spacing.sm,
  },
  serviceDetailLabel: {
    fontSize: fontSize.sm,
    fontWeight: "500",
    color: colors.foreground,
  },
  serviceDetailValue: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: 2,
  },
  reviewItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
  },
  reviewDate: {
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  reviewComment: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    lineHeight: 20,
  },
});
