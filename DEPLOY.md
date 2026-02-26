# Kin Services - Script de déploiement

## Prérequis

1. Node.js 18+ installé
2. pnpm installé (`npm install -g pnpm`)
3. Comptes configurés:
   - Vercel (pour le web)
   - Expo/EAS (pour le mobile)
   - Supabase (base de données)

## Installation locale

```bash
# Cloner le projet
git clone https://github.com/your-org/kinservices.git
cd kinservices

# Installer les dépendances
pnpm install

# Copier les variables d'environnement
cp apps/web/.env.example apps/web/.env.local

# Générer le client Prisma
pnpm --filter @kinservices/database db:generate

# Appliquer les migrations
pnpm --filter @kinservices/database db:push

# Seeder la base de données
pnpm --filter @kinservices/database db:seed

# Lancer en développement
pnpm dev
```

## Déploiement Web (Vercel)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd apps/web
vercel

# Configurer les variables d'environnement dans Vercel Dashboard:
# - DATABASE_URL
# - DIRECT_URL
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
# - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

# Déployer en production
vercel --prod
```

## Déploiement Mobile (EAS)

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter
eas login

# Configurer le projet
cd apps/mobile
eas build:configure

# Build Android (preview)
eas build --platform android --profile preview

# Build Android (production)
eas build --platform android --profile production

# Build iOS (production)
eas build --platform ios --profile production

# Soumettre au Play Store
eas submit --platform android --profile production

# Soumettre à l'App Store
eas submit --platform ios --profile production
```

## Structure des commandes Turborepo

```bash
# Build tous les packages
pnpm build

# Lancer tous les dev servers
pnpm dev

# Lancer les tests
pnpm test

# Linter
pnpm lint

# Type check
pnpm typecheck
```

## Base de données

```bash
# Générer le client Prisma
pnpm --filter @kinservices/database db:generate

# Appliquer les migrations en dev
pnpm --filter @kinservices/database db:push

# Créer une migration
pnpm --filter @kinservices/database db:migrate

# Ouvrir Prisma Studio
pnpm --filter @kinservices/database db:studio

# Seeder la base
pnpm --filter @kinservices/database db:seed
```

## Variables d'environnement requises

### Web (apps/web/.env.local)

- `DATABASE_URL` - URL PostgreSQL avec pooling
- `DIRECT_URL` - URL PostgreSQL directe
- `NEXT_PUBLIC_SUPABASE_URL` - URL Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé anonyme Supabase
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` - Token MapBox
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Nom du cloud Cloudinary
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Preset d'upload

### Mobile (apps/mobile/.env)

- `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` - Token MapBox
- `EXPO_PUBLIC_API_URL` - URL de l'API
