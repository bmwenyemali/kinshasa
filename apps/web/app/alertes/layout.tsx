import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alertes — Informations Urgentes Kinshasa",
  description:
    "Alertes et informations urgentes concernant les services publics de Kinshasa : fermetures, perturbations, annonces officielles.",
  openGraph: {
    title: "Alertes — Kin Services",
    description: "Informations urgentes sur les services publics de Kinshasa.",
    images: [
      "/api/og?title=Alertes%20Kinshasa&desc=Informations%20urgentes%20sur%20les%20services%20publics",
    ],
  },
};

export default function AlertesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
