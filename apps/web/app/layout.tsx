import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc-provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://kinshasa-seven.vercel.app";
const OG_IMAGE = `${SITE_URL}/api/og`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kin Services — Guide des Services Publics de Kinshasa",
    template: "%s | Kin Services",
  },
  description:
    "Trouvez facilement les services publics à Kinshasa : communes, hôpitaux, commissariats, tribunaux, écoles. Prix officiels, documents requis, horaires et itinéraires.",
  keywords: [
    "Kinshasa",
    "services publics",
    "communes Kinshasa",
    "hôpitaux Kinshasa",
    "administration RDC",
    "mairie Kinshasa",
    "commissariat Kinshasa",
    "acte de naissance Kinshasa",
    "état civil RDC",
    "carte interactive Kinshasa",
    "Congo",
    "RDC",
    "Kin Services",
  ],
  authors: [{ name: "Akili Group" }],
  creator: "Akili Group",
  publisher: "Akili Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Kin Services — Guide des Services Publics de Kinshasa",
    description:
      "Communes, hôpitaux, administrations de Kinshasa — prix officiels, documents requis et itinéraires. Le guide citoyen de la ville-province.",
    url: SITE_URL,
    siteName: "Kin Services",
    locale: "fr_CD",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kin Services - Services Publics de Kinshasa",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kin Services — Guide des Services Publics de Kinshasa",
    description:
      "Communes, hôpitaux, administrations — trouvez les services publics de Kinshasa avec prix officiels et itinéraires.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "government",
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#0077BE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kin Services" />
      </head>
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
