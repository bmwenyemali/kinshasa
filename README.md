# 🏙️ Kin Services

Plateforme complète (web + mobile) répertoriant tous les services publics de Kinshasa : communes, quartiers, zones de santé, hôpitaux, bureaux administratifs avec informations détaillées (localisation, documents requis, prix officiels, délais, contacts).

## 📋 Technologies

- **Frontend Web**: Next.js 15, React 19, TailwindCSS
- **Frontend Mobile**: React Native, Expo
- **Backend**: tRPC, Supabase
- **Base de données**: PostgreSQL (Supabase)
- **Cartes**: MapBox
- **Images**: Cloudinary
- **Monorepo**: Turborepo

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 18.0.0
- npm >= 10.0.0

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/bmwenyemali/kinshasa.git
cd kinshasa

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env

# Générer les types Prisma
npm run db:generate

# Lancer en développement
npm run dev
```

## 📁 Structure du projet

```
kinservices/
├── apps/
│   ├── web/          # Application Next.js
│   └── mobile/       # Application Expo/React Native
├── packages/
│   ├── api/          # tRPC routers & types
│   ├── database/     # Prisma schema & client
│   └── ui/           # Composants partagés
└── turbo.json        # Configuration Turborepo
```

## 🛠️ Commandes

| Commande              | Description                                     |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Démarrer tous les projets en mode développement |
| `npm run dev:web`     | Démarrer uniquement le web                      |
| `npm run dev:mobile`  | Démarrer uniquement le mobile                   |
| `npm run build`       | Build de production                             |
| `npm run lint`        | Linter tous les projets                         |
| `npm run db:generate` | Générer le client Prisma                        |
| `npm run db:push`     | Pousser le schema vers Supabase                 |

## 📱 Applications

### Web (Next.js)

- URL locale: http://localhost:3000
- URL production: https://kinshasa-services.vercel.app

### Mobile (Expo)

- Démarrer avec `npm run dev:mobile`
- Scanner le QR code avec Expo Go

## 🗃️ Base de données

Le schéma inclut:

- **communes**: 24 communes de Kinshasa
- **quartiers**: Quartiers par commune
- **zones_sante**: 35 zones de santé
- **lieux**: Hôpitaux, cliniques, administrations
- **services_proposes**: Services disponibles par lieu
- **avis_utilisateurs**: Notes et commentaires
- **signalements**: Signalements d'erreurs

## 📄 Licence

MIT © 2026 Akili Group
