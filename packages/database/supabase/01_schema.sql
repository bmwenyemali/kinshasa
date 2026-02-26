-- ============================================
-- KIN SERVICES - SCHEMA SQL POUR SUPABASE
-- À exécuter dans l'ordre: 01_schema.sql, 02_seed_data.sql
-- ============================================

-- Supprimer les tables existantes (optionnel, pour reset complet)
-- DROP TABLE IF EXISTS alertes CASCADE;
-- DROP TABLE IF EXISTS search_history CASCADE;
-- DROP TABLE IF EXISTS favoris CASCADE;
-- DROP TABLE IF EXISTS signalements CASCADE;
-- DROP TABLE IF EXISTS avis_utilisateurs CASCADE;
-- DROP TABLE IF EXISTS services_proposes CASCADE;
-- DROP TABLE IF EXISTS lieux CASCADE;
-- DROP TABLE IF EXISTS zones_sante CASCADE;
-- DROP TABLE IF EXISTS quartiers CASCADE;
-- DROP TABLE IF EXISTS communes CASCADE;

-- ============================================
-- TYPES ENUM
-- ============================================

DO $$ BEGIN
    CREATE TYPE lieu_type AS ENUM (
        'HOPITAL',
        'CLINIQUE',
        'CENTRE_SANTE',
        'ADMINISTRATION',
        'MAIRIE',
        'COMMISSARIAT',
        'TRIBUNAL',
        'ECOLE',
        'UNIVERSITE',
        'AUTRE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE service_categorie AS ENUM (
        'ETAT_CIVIL',
        'SANTE',
        'JUSTICE',
        'EDUCATION',
        'IMPOTS',
        'URGENCE',
        'SOCIAL',
        'TRANSPORT',
        'AUTRE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE signalement_type AS ENUM (
        'INFO_ERRONNEE',
        'CORRUPTION',
        'FERME',
        'PRIX_INCORRECT',
        'AUTRE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- TABLES GÉOGRAPHIQUES
-- ============================================

CREATE TABLE IF NOT EXISTS communes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    population INTEGER,
    superficie FLOAT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quartiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    commune_id UUID NOT NULL REFERENCES communes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(commune_id, name)
);

CREATE TABLE IF NOT EXISTS zones_sante (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    commune_responsable VARCHAR(100),
    population INTEGER,
    nombre_aires_sante INTEGER,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    telephone VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLES LIEUX & SERVICES
-- ============================================

CREATE TABLE IF NOT EXISTS lieux (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(200) NOT NULL,
    type lieu_type NOT NULL,
    commune_id UUID REFERENCES communes(id),
    quartier_id UUID REFERENCES quartiers(id),
    zone_sante_id UUID REFERENCES zones_sante(id),
    adresse TEXT,
    reperes TEXT,
    telephone VARCHAR(50),
    telephone_2 VARCHAR(50),
    email VARCHAR(100),
    site_web VARCHAR(200),
    horaires JSONB,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    photos TEXT[],
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_by VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services_proposes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lieu_id UUID NOT NULL REFERENCES lieux(id) ON DELETE CASCADE,
    categorie service_categorie NOT NULL,
    nom_service VARCHAR(200) NOT NULL,
    description TEXT,
    documents_requis TEXT[],
    prix_officiel DECIMAL(12, 2),
    devise VARCHAR(10) DEFAULT 'FC',
    delai VARCHAR(100),
    procedure TEXT,
    conditions_particulieres TEXT,
    actif BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLES INTERACTIONS UTILISATEURS
-- ============================================

CREATE TABLE IF NOT EXISTS avis_utilisateurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lieu_id UUID NOT NULL REFERENCES lieux(id) ON DELETE CASCADE,
    user_id VARCHAR(100),
    user_name VARCHAR(100),
    note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    date_experience DATE,
    approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS signalements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lieu_id UUID REFERENCES lieux(id),
    service_id UUID,
    type signalement_type NOT NULL,
    description TEXT NOT NULL,
    user_id VARCHAR(100),
    email VARCHAR(100),
    traite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favoris (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(100) NOT NULL,
    lieu_id UUID NOT NULL REFERENCES lieux(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, lieu_id)
);

-- ============================================
-- TABLES RECHERCHE & ANALYTICS
-- ============================================

CREATE TABLE IF NOT EXISTS search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(100),
    query VARCHAR(200) NOT NULL,
    filters JSONB,
    result_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alertes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    commune_id UUID,
    actif BOOLEAN DEFAULT true,
    date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
    date_fin TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEX POUR OPTIMISATION
-- ============================================

CREATE INDEX IF NOT EXISTS idx_quartiers_commune ON quartiers(commune_id);
CREATE INDEX IF NOT EXISTS idx_lieux_commune ON lieux(commune_id);
CREATE INDEX IF NOT EXISTS idx_lieux_quartier ON lieux(quartier_id);
CREATE INDEX IF NOT EXISTS idx_lieux_zone_sante ON lieux(zone_sante_id);
CREATE INDEX IF NOT EXISTS idx_lieux_type ON lieux(type);
CREATE INDEX IF NOT EXISTS idx_lieux_verified ON lieux(verified);
CREATE INDEX IF NOT EXISTS idx_services_lieu ON services_proposes(lieu_id);
CREATE INDEX IF NOT EXISTS idx_services_categorie ON services_proposes(categorie);
CREATE INDEX IF NOT EXISTS idx_services_nom ON services_proposes(nom_service);
CREATE INDEX IF NOT EXISTS idx_avis_lieu ON avis_utilisateurs(lieu_id);
CREATE INDEX IF NOT EXISTS idx_avis_user ON avis_utilisateurs(user_id);
CREATE INDEX IF NOT EXISTS idx_signalements_lieu ON signalements(lieu_id);
CREATE INDEX IF NOT EXISTS idx_signalements_traite ON signalements(traite);
CREATE INDEX IF NOT EXISTS idx_favoris_user ON favoris(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_user ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_query ON search_history(query);
CREATE INDEX IF NOT EXISTS idx_alertes_actif ON alertes(actif);
CREATE INDEX IF NOT EXISTS idx_alertes_commune ON alertes(commune_id);

-- ============================================
-- TRIGGER POUR updated_at AUTOMATIQUE
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Application des triggers
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'public'
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS update_%I_updated_at ON %I;
            CREATE TRIGGER update_%I_updated_at 
            BEFORE UPDATE ON %I 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        ', t, t, t, t);
    END LOOP;
END;
$$;

-- ============================================
-- ENABLE RLS (Row Level Security) - Optionnel
-- ============================================

-- ALTER TABLE communes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE lieux ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE services_proposes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE avis_utilisateurs ENABLE ROW LEVEL SECURITY;

-- Politique pour lecture publique
-- CREATE POLICY "Public read access" ON communes FOR SELECT USING (true);
-- CREATE POLICY "Public read access" ON lieux FOR SELECT USING (true);
-- CREATE POLICY "Public read access" ON services_proposes FOR SELECT USING (true);

-- Schema créé avec succès!
