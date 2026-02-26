"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  LogOut,
  Shield,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  prenom?: string | null;
  nom?: string | null;
  role: string;
  photoUrl?: string | null;
}

const AGE_RANGES = ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"];

const SEXE_OPTIONS = [
  { value: "M", label: "Masculin" },
  { value: "F", label: "Féminin" },
  { value: "AUTRE", label: "Autre" },
];

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [phone, setPhone] = useState("");
  const [sexe, setSexe] = useState("");
  const [trancheAge, setTrancheAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [saved, setSaved] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("kinservices_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  // Load profile from API
  const { data: profile } = trpc.auth.getProfile.useQuery(
    { userId: user?.id || "" },
    { enabled: !!user?.id },
  );

  // Sync profile data to form
  useEffect(() => {
    if (profile) {
      setPrenom(profile.prenom || "");
      setNom(profile.nom || "");
      setPhone(profile.phone || "");
      setSexe(profile.sexe || "");
      setTrancheAge(profile.trancheAge || "");
      setPhotoUrl(profile.photoUrl || "");
    }
  }, [profile]);

  const updateMutation = trpc.auth.updateProfile.useMutation({
    onSuccess: (data) => {
      setSaved(true);
      // Update localStorage
      const stored = localStorage.getItem("kinservices_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          "kinservices_user",
          JSON.stringify({ ...parsed, ...data }),
        );
      }
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    updateMutation.mutate({
      userId: user.id,
      prenom: prenom || undefined,
      nom: nom || undefined,
      phone: phone || undefined,
      sexe: sexe || undefined,
      trancheAge: trancheAge || undefined,
      photoUrl: photoUrl || undefined,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("kinservices_user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  const ROLE_LABELS: Record<string, string> = {
    VISITEUR: "Visiteur",
    GESTIONNAIRE: "Gestionnaire",
    ADMINISTRATEUR: "Administrateur",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary to-primary-dark h-24" />
          <div className="px-6 pb-6 relative">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center -mt-10 relative z-10">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Photo"
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {(prenom || user.email)?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="mt-3">
              <h1 className="text-xl font-bold text-foreground">
                {prenom || nom ? `${prenom} ${nom}`.trim() : user.email}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  <Shield className="w-3 h-3" />
                  {ROLE_LABELS[user.role] || user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Informations personnelles
            </h2>

            {saved && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Profil mis à jour avec succès !
              </div>
            )}

            <div className="space-y-4">
              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <Camera className="w-4 h-4 inline mr-1" />
                  URL de la photo
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://exemple.com/photo.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Jean"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Mukendi"
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+243 81 000 0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Sexe
                  </label>
                  <select
                    value={sexe}
                    onChange={(e) => setSexe(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="">Non spécifié</option>
                    {SEXE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Tranche d&apos;âge
                  </label>
                  <select
                    value={trancheAge}
                    onChange={(e) => setTrancheAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                  >
                    <option value="">Non spécifié</option>
                    {AGE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range} ans
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
