import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kin Services - Services Publics de Kinshasa",
  description:
    "Trouvez facilement les services publics à Kinshasa : communes, hôpitaux, administrations, avec les prix officiels, documents requis et itinéraires.",
  keywords: [
    "Kinshasa",
    "services publics",
    "communes",
    "hôpitaux",
    "administration",
    "RDC",
    "Congo",
  ],
  authors: [{ name: "Akili Group" }],
  openGraph: {
    title: "Kin Services - Services Publics de Kinshasa",
    description:
      "Trouvez facilement les services publics à Kinshasa avec les prix officiels et documents requis.",
    url: "https://kinshasa-services.vercel.app",
    siteName: "Kin Services",
    locale: "fr_CD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0077BE" />
      </head>
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
