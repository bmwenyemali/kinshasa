import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Publics — État Civil, Santé, Justice",
  description:
    "Tous les services publics de Kinshasa : état civil, santé, justice, éducation, sécurité. Prix officiels, documents requis et démarches détaillées.",
  openGraph: {
    title: "Services Publics de Kinshasa",
    description:
      "État civil, santé, justice, éducation — prix officiels et documents requis pour chaque service.",
    images: [
      "/api/og?title=Services%20Publics&desc=Prix%20officiels%20et%20documents%20requis%20%C3%A0%20Kinshasa",
    ],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
