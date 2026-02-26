import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communes de Kinshasa — 24 Communes",
  description:
    "Découvrez les 24 communes de Kinshasa : population, quartiers, services disponibles, maisons communales. Guide complet de chaque commune.",
  openGraph: {
    title: "Les 24 Communes de Kinshasa",
    description:
      "Population, quartiers et services disponibles dans chaque commune de Kinshasa.",
    images: [
      "/api/og?title=Communes%20de%20Kinshasa&desc=Les%2024%20communes%20et%20leurs%20services",
    ],
  },
};

export default function CommunesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
