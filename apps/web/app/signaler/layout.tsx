import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signaler un Problème — Kin Services",
  description:
    "Signalez un problème dans les services publics de Kinshasa : corruption, information erronée, lieu fermé. Votre signalement sera transmis aux autorités.",
  openGraph: {
    title: "Signaler un Problème — Kin Services",
    description:
      "Aidez à améliorer les services publics de Kinshasa en signalant les problèmes.",
    images: [
      "/api/og?title=Signaler%20un%20Probl%C3%A8me&desc=Am%C3%A9liorez%20les%20services%20publics%20de%20Kinshasa",
    ],
  },
};

export default function SignalerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
