import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carte Interactive — Services Publics de Kinshasa",
  description:
    "Explorez la carte interactive de Kinshasa : hôpitaux, commissariats, mairies, tribunaux, écoles. Localisez les services publics proches de vous.",
  openGraph: {
    title: "Carte Interactive — Services Publics de Kinshasa",
    description:
      "Explorez la carte interactive de Kinshasa pour localiser hôpitaux, commissariats, mairies et plus.",
    images: [
      "/api/og?title=Carte%20Interactive&desc=Localisez%20les%20services%20publics%20de%20Kinshasa",
    ],
  },
};

export default function CarteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
