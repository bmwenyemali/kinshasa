-- ============================================
-- KIN SERVICES - DONNÉES DE BASE + EXEMPLES
-- À exécuter APRÈS 01_schema.sql
-- ============================================

-- ============================================
-- 1. COMMUNES DE KINSHASA (24 communes)
-- ============================================

INSERT INTO communes (id, name, description, population, superficie, latitude, longitude) VALUES
-- Communes de l'Ouest
('c1000001-0000-0000-0000-000000000001', 'Bandalungwa', 'Commune résidentielle et commerciale de l''ouest de Kinshasa', 189521, 6.82, -4.3333, 15.3167),
('c1000001-0000-0000-0000-000000000002', 'Barumbu', 'Commune centrale historique près du fleuve Congo', 115298, 4.72, -4.3125, 15.3042),
('c1000001-0000-0000-0000-000000000003', 'Bumbu', 'Commune populaire du centre-ouest', 348564, 5.30, -4.3583, 15.2917),
('c1000001-0000-0000-0000-000000000004', 'Gombe', 'Centre administratif et des affaires de Kinshasa', 35231, 29.33, -4.3000, 15.2833),
('c1000001-0000-0000-0000-000000000005', 'Kalamu', 'Commune résidentielle dense du centre', 247843, 6.64, -4.3583, 15.3083),
('c1000001-0000-0000-0000-000000000006', 'Kasa-Vubu', 'Commune centrale anciennement Dendale', 118987, 5.04, -4.3417, 15.3083),
('c1000001-0000-0000-0000-000000000007', 'Kinshasa', 'Commune historique centre-ville', 89234, 2.87, -4.3256, 15.3136),
('c1000001-0000-0000-0000-000000000008', 'Kintambo', 'Commune de l''ouest avec vue sur le fleuve', 168945, 2.72, -4.3167, 15.2667),
('c1000001-0000-0000-0000-000000000009', 'Lemba', 'Commune universitaire (UNIKIN)', 456234, 23.70, -4.4167, 15.3083),
('c1000001-0000-0000-0000-000000000010', 'Limete', 'Commune résidentielle et industrielle', 312456, 67.61, -4.3833, 15.3500),
('c1000001-0000-0000-0000-000000000011', 'Lingwala', 'Petite commune centrale', 75432, 2.87, -4.3208, 15.2958),
('c1000001-0000-0000-0000-000000000012', 'Makala', 'Commune populaire du sud', 289765, 5.58, -4.3917, 15.3083),
('c1000001-0000-0000-0000-000000000013', 'Maluku', 'Plus grande commune, rurale à l''est', 456789, 7948.80, -4.0833, 15.8500),
('c1000001-0000-0000-0000-000000000014', 'Masina', 'Grande commune de l''est', 876543, 70.95, -4.3833, 15.4000),
('c1000001-0000-0000-0000-000000000015', 'Matete', 'Commune résidentielle du centre-sud', 298765, 4.88, -4.3750, 15.3250),
('c1000001-0000-0000-0000-000000000016', 'Mont-Ngafula', 'Commune collinaire au sud-ouest', 234567, 358.92, -4.4500, 15.2167),
('c1000001-0000-0000-0000-000000000017', 'Ndjili', 'Commune avec l''aéroport international', 543210, 11.40, -4.3917, 15.4333),
('c1000001-0000-0000-0000-000000000018', 'Ngaba', 'Petite commune résidentielle', 156789, 3.96, -4.3917, 15.3167),
('c1000001-0000-0000-0000-000000000019', 'Ngaliema', 'Commune résidentielle et diplomatique', 543210, 224.00, -4.3333, 15.2333),
('c1000001-0000-0000-0000-000000000020', 'Ngiri-Ngiri', 'Commune populaire dense', 187654, 3.06, -4.3500, 15.3000),
('c1000001-0000-0000-0000-000000000021', 'Nsele', 'Grande commune rurale à l''est', 765432, 898.79, -4.3000, 15.5500),
('c1000001-0000-0000-0000-000000000022', 'Selembao', 'Commune collinaire au sud-ouest', 345678, 23.18, -4.3917, 15.2583),
('c1000001-0000-0000-0000-000000000023', 'Kisenso', 'Commune collinaire au sud-est', 456123, 16.60, -4.4167, 15.3417),
('c1000001-0000-0000-0000-000000000024', 'Kimbanseke', 'Commune la plus peuplée de Kinshasa', 1234567, 237.80, -4.4333, 15.4000)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    population = EXCLUDED.population,
    superficie = EXCLUDED.superficie,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;

-- ============================================
-- 2. ZONES DE SANTÉ (35 zones)
-- ============================================

INSERT INTO zones_sante (id, name, description, commune_responsable, population, nombre_aires_sante, latitude, longitude) VALUES
('z1000001-0000-0000-0000-000000000001', 'Bandalungwa', 'Zone de Santé de Bandalungwa', 'Bandalungwa', 245000, 18, -4.3333, 15.3167),
('z1000001-0000-0000-0000-000000000002', 'Barumbu', 'Zone de Santé de Barumbu-Kinshasa', 'Barumbu', 185000, 12, -4.3125, 15.3042),
('z1000001-0000-0000-0000-000000000003', 'Binza-Météo', 'Zone de Santé de Binza-Météo', 'Ngaliema', 320000, 22, -4.3800, 15.2400),
('z1000001-0000-0000-0000-000000000004', 'Binza-Ozone', 'Zone de Santé de Binza-Ozone', 'Ngaliema', 280000, 20, -4.3600, 15.2500),
('z1000001-0000-0000-0000-000000000005', 'Biyela', 'Zone de Santé de Biyela', 'Nsele', 150000, 15, -4.3200, 15.5800),
('z1000001-0000-0000-0000-000000000006', 'Bumbu', 'Zone de Santé de Bumbu', 'Bumbu', 380000, 25, -4.3583, 15.2917),
('z1000001-0000-0000-0000-000000000007', 'Gombe', 'Zone de Santé de Gombe', 'Gombe', 95000, 8, -4.3000, 15.2833),
('z1000001-0000-0000-0000-000000000008', 'Kalamu I', 'Zone de Santé de Kalamu I', 'Kalamu', 185000, 14, -4.3550, 15.3050),
('z1000001-0000-0000-0000-000000000009', 'Kalamu II', 'Zone de Santé de Kalamu II', 'Kalamu', 175000, 13, -4.3620, 15.3120),
('z1000001-0000-0000-0000-000000000010', 'Kasa-Vubu', 'Zone de Santé de Kasa-Vubu', 'Kasa-Vubu', 165000, 12, -4.3417, 15.3083),
('z1000001-0000-0000-0000-000000000011', 'Kikimi', 'Zone de Santé de Kikimi', 'Nsele', 95000, 10, -4.2800, 15.6200),
('z1000001-0000-0000-0000-000000000012', 'Kimbanseke', 'Zone de Santé de Kimbanseke', 'Kimbanseke', 580000, 35, -4.4333, 15.4000),
('z1000001-0000-0000-0000-000000000013', 'Kingabwa', 'Zone de Santé de Kingabwa', 'Limete', 420000, 28, -4.3900, 15.3600),
('z1000001-0000-0000-0000-000000000014', 'Kingasani', 'Zone de Santé de Kingasani', 'Kimbanseke', 450000, 30, -4.4200, 15.4200),
('z1000001-0000-0000-0000-000000000015', 'Kinshasa', 'Zone de Santé de Kinshasa-Centre', 'Kinshasa', 145000, 10, -4.3256, 15.3136),
('z1000001-0000-0000-0000-000000000016', 'Kintambo', 'Zone de Santé de Kintambo', 'Kintambo', 195000, 15, -4.3167, 15.2667),
('z1000001-0000-0000-0000-000000000017', 'Kisenso', 'Zone de Santé de Kisenso', 'Kisenso', 520000, 32, -4.4167, 15.3417),
('z1000001-0000-0000-0000-000000000018', 'Lemba', 'Zone de Santé de Lemba', 'Lemba', 380000, 24, -4.4167, 15.3083),
('z1000001-0000-0000-0000-000000000019', 'Limete', 'Zone de Santé de Limete', 'Limete', 285000, 20, -4.3833, 15.3500),
('z1000001-0000-0000-0000-000000000020', 'Lingwala', 'Zone de Santé de Lingwala', 'Lingwala', 125000, 9, -4.3208, 15.2958),
('z1000001-0000-0000-0000-000000000021', 'Makala', 'Zone de Santé de Makala', 'Makala', 420000, 28, -4.3917, 15.3083),
('z1000001-0000-0000-0000-000000000022', 'Maluku I', 'Zone de Santé de Maluku I', 'Maluku', 85000, 12, -4.0500, 15.8000),
('z1000001-0000-0000-0000-000000000023', 'Maluku II', 'Zone de Santé de Maluku II', 'Maluku', 75000, 10, -4.1200, 15.8800),
('z1000001-0000-0000-0000-000000000024', 'Masina I', 'Zone de Santé de Masina I', 'Masina', 480000, 30, -4.3750, 15.3950),
('z1000001-0000-0000-0000-000000000025', 'Masina II', 'Zone de Santé de Masina II', 'Masina', 520000, 32, -4.3920, 15.4100),
('z1000001-0000-0000-0000-000000000026', 'Matete', 'Zone de Santé de Matete', 'Matete', 340000, 22, -4.3750, 15.3250),
('z1000001-0000-0000-0000-000000000027', 'Mont-Ngafula I', 'Zone de Santé de Mont-Ngafula I', 'Mont-Ngafula', 185000, 18, -4.4400, 15.2100),
('z1000001-0000-0000-0000-000000000028', 'Mont-Ngafula II', 'Zone de Santé de Mont-Ngafula II', 'Mont-Ngafula', 165000, 16, -4.4600, 15.2300),
('z1000001-0000-0000-0000-000000000029', 'Ndjili', 'Zone de Santé de Ndjili', 'Ndjili', 620000, 38, -4.3917, 15.4333),
('z1000001-0000-0000-0000-000000000030', 'Ngaba', 'Zone de Santé de Ngaba', 'Ngaba', 195000, 14, -4.3917, 15.3167),
('z1000001-0000-0000-0000-000000000031', 'Ngiri-Ngiri', 'Zone de Santé de Ngiri-Ngiri', 'Ngiri-Ngiri', 245000, 17, -4.3500, 15.3000),
('z1000001-0000-0000-0000-000000000032', 'Police', 'Zone de Santé de la Police', 'Gombe', 45000, 5, -4.3100, 15.2900),
('z1000001-0000-0000-0000-000000000033', 'Selembao', 'Zone de Santé de Selembao', 'Selembao', 420000, 26, -4.3917, 15.2583),
('z1000001-0000-0000-0000-000000000034', 'Camp Luka', 'Zone de Santé de Camp Luka', 'Ngaliema', 55000, 6, -4.3400, 15.2200),
('z1000001-0000-0000-0000-000000000035', 'Kokolo', 'Zone de Santé Militaire de Kokolo', 'Lingwala', 35000, 4, -4.3250, 15.2850)
ON CONFLICT (name) DO UPDATE SET 
    description = EXCLUDED.description,
    commune_responsable = EXCLUDED.commune_responsable,
    population = EXCLUDED.population,
    nombre_aires_sante = EXCLUDED.nombre_aires_sante;

-- ============================================
-- 3. QUELQUES QUARTIERS EXEMPLES
-- ============================================

INSERT INTO quartiers (commune_id, name, latitude, longitude) 
SELECT 
    c.id,
    q.name,
    q.latitude,
    q.longitude
FROM (VALUES
    ('Gombe', 'Socimat', -4.2980, 15.2850),
    ('Gombe', 'Rotonde', -4.3050, 15.2800),
    ('Gombe', 'Golf', -4.2900, 15.2750),
    ('Gombe', 'Haut-Commandement', -4.3020, 15.2920),
    ('Limete', 'Industriel', -4.3850, 15.3550),
    ('Limete', 'Résidentiel', -4.3800, 15.3450),
    ('Limete', '7ème Rue', -4.3900, 15.3400),
    ('Lemba', 'Campus UNIKIN', -4.4200, 15.3100),
    ('Lemba', 'Righini', -4.4100, 15.3050),
    ('Lemba', 'Livulu', -4.4150, 15.3150),
    ('Ngaliema', 'Binza-Pigeon', -4.3450, 15.2400),
    ('Ngaliema', 'Binza-UPN', -4.3600, 15.2350),
    ('Ngaliema', 'Ma Campagne', -4.3350, 15.2500),
    ('Bandalungwa', 'Lingwala', -4.3320, 15.3100),
    ('Bandalungwa', 'Bisengo', -4.3380, 15.3200),
    ('Masina', 'Sans-Fil', -4.3850, 15.4050),
    ('Masina', 'Petro-Congo', -4.3900, 15.4100),
    ('Ndjili', 'Aéroport', -4.3880, 15.4400),
    ('Ndjili', 'Cecomaf', -4.3950, 15.4350),
    ('Kimbanseke', 'Mikondo', -4.4250, 15.4050),
    ('Kimbanseke', 'Mango', -4.4380, 15.3950)
) AS q(commune_name, name, latitude, longitude)
JOIN communes c ON c.name = q.commune_name
ON CONFLICT (commune_id, name) DO NOTHING;

-- ============================================
-- 4. LIEUX EXEMPLES - HÔPITAUX & CENTRES DE SANTÉ
-- ============================================

-- Hôpital Général de Kinshasa (ex-Mama Yemo)
INSERT INTO lieux (id, nom, type, commune_id, zone_sante_id, adresse, telephone, email, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000001',
    'Hôpital Général Provincial de Référence de Kinshasa',
    'HOPITAL'::lieu_type,
    c.id,
    z.id,
    'Avenue de l''Hôpital, Commune de Gombe',
    '+243 81 000 0001',
    'contact@hgprk.cd',
    '{"lundi": "24h/24", "mardi": "24h/24", "mercredi": "24h/24", "jeudi": "24h/24", "vendredi": "24h/24", "samedi": "24h/24", "dimanche": "24h/24"}'::jsonb,
    -4.3180,
    15.3080,
    true,
    true
FROM communes c, zones_sante z
WHERE c.name = 'Gombe' AND z.name = 'Gombe'
ON CONFLICT DO NOTHING;

-- Clinique Ngaliema
INSERT INTO lieux (id, nom, type, commune_id, zone_sante_id, adresse, telephone, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000002',
    'Clinique Ngaliema',
    'CLINIQUE'::lieu_type,
    c.id,
    z.id,
    'Avenue des Cliniques, Ngaliema',
    '+243 81 000 0002',
    '{"lundi": "07:00-19:00", "mardi": "07:00-19:00", "mercredi": "07:00-19:00", "jeudi": "07:00-19:00", "vendredi": "07:00-19:00", "samedi": "08:00-14:00", "dimanche": "Urgences uniquement"}'::jsonb,
    -4.3280,
    15.2620,
    true,
    true
FROM communes c, zones_sante z
WHERE c.name = 'Ngaliema' AND z.name = 'Binza-Météo'
ON CONFLICT DO NOTHING;

-- Centre Hospitalier Monkole
INSERT INTO lieux (id, nom, type, commune_id, zone_sante_id, adresse, telephone, site_web, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000003',
    'Centre Hospitalier Monkole',
    'HOPITAL'::lieu_type,
    c.id,
    z.id,
    'Avenue Ngafani n°1, Mont-Ngafula',
    '+243 81 555 0001',
    'https://www.monkole.cd',
    '{"lundi": "24h/24", "mardi": "24h/24", "mercredi": "24h/24", "jeudi": "24h/24", "vendredi": "24h/24", "samedi": "24h/24", "dimanche": "24h/24"}'::jsonb,
    -4.4450,
    15.2180,
    true,
    true
FROM communes c, zones_sante z
WHERE c.name = 'Mont-Ngafula' AND z.name = 'Mont-Ngafula I'
ON CONFLICT DO NOTHING;

-- Centre de Santé Boyambi
INSERT INTO lieux (id, nom, type, commune_id, zone_sante_id, adresse, telephone, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000004',
    'Centre de Santé Boyambi',
    'CENTRE_SANTE'::lieu_type,
    c.id,
    z.id,
    'Avenue Boyambi n°45, Lemba',
    '+243 82 333 4455',
    '{"lundi": "07:30-17:00", "mardi": "07:30-17:00", "mercredi": "07:30-17:00", "jeudi": "07:30-17:00", "vendredi": "07:30-17:00", "samedi": "08:00-12:00"}'::jsonb,
    -4.4120,
    15.3050,
    true,
    false
FROM communes c, zones_sante z
WHERE c.name = 'Lemba' AND z.name = 'Lemba'
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. LIEUX - ADMINISTRATIONS
-- ============================================

-- Hôtel de Ville de Kinshasa
INSERT INTO lieux (id, nom, type, commune_id, adresse, telephone, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000010',
    'Hôtel de Ville de Kinshasa',
    'MAIRIE'::lieu_type,
    c.id,
    'Avenue de la Libération, Gombe',
    '+243 81 700 0001',
    '{"lundi": "08:00-15:00", "mardi": "08:00-15:00", "mercredi": "08:00-15:00", "jeudi": "08:00-15:00", "vendredi": "08:00-12:00"}'::jsonb,
    -4.3100,
    15.2850,
    true,
    true
FROM communes c WHERE c.name = 'Gombe'
ON CONFLICT DO NOTHING;

-- Commune de Lemba
INSERT INTO lieux (id, nom, type, commune_id, adresse, telephone, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000011',
    'Commune de Lemba - Bureau de l''État Civil',
    'ADMINISTRATION'::lieu_type,
    c.id,
    'Avenue de l''Université, Lemba',
    '+243 81 700 0002',
    '{"lundi": "08:00-15:00", "mardi": "08:00-15:00", "mercredi": "08:00-15:00", "jeudi": "08:00-15:00", "vendredi": "08:00-12:00"}'::jsonb,
    -4.4100,
    15.3080,
    true,
    false
FROM communes c WHERE c.name = 'Lemba'
ON CONFLICT DO NOTHING;

-- Commissariat Central
INSERT INTO lieux (id, nom, type, commune_id, adresse, telephone, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000012',
    'Commissariat Provincial de la Police',
    'COMMISSARIAT'::lieu_type,
    c.id,
    'Avenue Colonel Lukusa, Gombe',
    '+243 81 800 0001',
    '{"lundi": "24h/24", "mardi": "24h/24", "mercredi": "24h/24", "jeudi": "24h/24", "vendredi": "24h/24", "samedi": "24h/24", "dimanche": "24h/24"}'::jsonb,
    -4.3050,
    15.2920,
    true,
    true
FROM communes c WHERE c.name = 'Gombe'
ON CONFLICT DO NOTHING;

-- Tribunal de Grande Instance
INSERT INTO lieux (id, nom, type, commune_id, adresse, telephone, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000013',
    'Tribunal de Grande Instance de Kinshasa/Gombe',
    'TRIBUNAL'::lieu_type,
    c.id,
    'Avenue de la Justice, Gombe',
    '+243 81 900 0001',
    '{"lundi": "08:00-15:30", "mardi": "08:00-15:30", "mercredi": "08:00-15:30", "jeudi": "08:00-15:30", "vendredi": "08:00-12:00"}'::jsonb,
    -4.3150,
    15.2880,
    true,
    true
FROM communes c WHERE c.name = 'Gombe'
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. LIEUX - ÉCOLES & UNIVERSITÉS
-- ============================================

-- UNIKIN
INSERT INTO lieux (id, nom, type, commune_id, adresse, telephone, site_web, horaires, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000020',
    'Université de Kinshasa (UNIKIN)',
    'UNIVERSITE'::lieu_type,
    c.id,
    'B.P. 190, Kinshasa XI, Lemba',
    '+243 81 500 0001',
    'https://www.unikin.ac.cd',
    '{"lundi": "07:30-17:00", "mardi": "07:30-17:00", "mercredi": "07:30-17:00", "jeudi": "07:30-17:00", "vendredi": "07:30-14:00"}'::jsonb,
    -4.4210,
    15.3080,
    true,
    true
FROM communes c WHERE c.name = 'Lemba'
ON CONFLICT DO NOTHING;

-- UCC
INSERT INTO lieux (id, nom, type, commune_id, adresse, telephone, site_web, latitude, longitude, verified, featured)
SELECT 
    'l1000001-0000-0000-0000-000000000021',
    'Université Catholique du Congo (UCC)',
    'UNIVERSITE'::lieu_type,
    c.id,
    'Avenue de l Université 2, Limete',
    '+243 81 500 0002',
    'https://www.ucc.ac.cd',
    -4.3880,
    15.3480,
    true,
    false
FROM communes c WHERE c.name = 'Limete'
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. SERVICES PROPOSÉS - EXEMPLES
-- ============================================

-- Services État Civil - Commune de Lemba
INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000011',
    'ETAT_CIVIL'::service_categorie,
    'Acte de Naissance',
    'Obtention d''un acte de naissance pour enfant né dans la commune',
    ARRAY['Attestation de naissance de la maternité', 'Pièce d''identité des parents', 'Attestation de mariage (si applicable)'],
    5000,
    'FC',
    '48 heures',
    '1. Se présenter au bureau de l''État Civil
2. Remplir le formulaire de déclaration de naissance
3. Présenter les documents requis
4. Payer les frais
5. Récupérer l''acte de naissance'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000011');

INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000011',
    'ETAT_CIVIL'::service_categorie,
    'Attestation de Résidence',
    'Obtention d''une attestation de résidence dans la commune',
    ARRAY['Pièce d''identité', 'Facture d''électricité ou de loyer', 'Témoignage de deux voisins'],
    3000,
    'FC',
    '24 heures',
    '1. Se présenter au bureau du Quartier avec un chef de localité
2. Remplir le formulaire
3. Payer les frais
4. Recevoir le document'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000011');

INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000011',
    'ETAT_CIVIL'::service_categorie,
    'Acte de Mariage',
    'Célébration et enregistrement du mariage civil',
    ARRAY['Actes de naissance des époux', 'Pièces d''identité', 'Certificats de célibat', 'Attestation de publication des bans'],
    50000,
    'FC',
    '1 mois (après publication des bans)',
    '1. Dépôt du dossier
2. Publication des bans (10 jours)
3. Fixation de la date de célébration
4. Cérémonie de mariage
5. Remise de l''acte de mariage'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000011');

-- Services Santé - Hôpital Général
INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000001',
    'SANTE'::service_categorie,
    'Consultation Générale',
    'Consultation médicale avec un médecin généraliste',
    ARRAY['Carnet de santé ou de consultation'],
    5000,
    'FC',
    'Immédiat (selon affluence)',
    '1. Se présenter à l''accueil
2. Payer les frais de consultation
3. Recevoir un numéro
4. Attendre son tour
5. Consulter le médecin'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000001');

INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000001',
    'URGENCE'::service_categorie,
    'Urgences 24h/24',
    'Service d''urgences médicales ouvert 24h/24 et 7j/7',
    ARRAY['Aucun document obligatoire en urgence'],
    10000,
    'FC',
    'Immédiat',
    '1. Se présenter directement aux urgences
2. Triage par l''infirmier
3. Prise en charge selon gravité'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000001');

-- Services Justice - Tribunal
INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000013',
    'JUSTICE'::service_categorie,
    'Casier Judiciaire',
    'Obtention d''un extrait du casier judiciaire',
    ARRAY['Pièce d''identité', 'Acte de naissance', 'Photo passeport récente'],
    15000,
    'FC',
    '5 jours ouvrables',
    '1. Se présenter au greffe
2. Remplir le formulaire de demande
3. Payer les frais légaux
4. Attendre le délai de traitement
5. Récupérer l''extrait'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000013');

-- Services Éducation - UNIKIN
INSERT INTO services_proposes (lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure)
SELECT 
    'l1000001-0000-0000-0000-000000000020',
    'EDUCATION'::service_categorie,
    'Inscription Licence',
    'Inscription en première année de licence',
    ARRAY['Diplôme d''État', 'Relevé de notes', 'Acte de naissance', 'Photos passeport', 'Attestation de réussite au concours'],
    200,
    'USD',
    '1 semaine',
    '1. Réussir le concours d''admission
2. Constituer le dossier
3. Payer les frais académiques
4. Déposer le dossier au secrétariat
5. Recevoir la carte d''étudiant'
WHERE EXISTS (SELECT 1 FROM lieux WHERE id = 'l1000001-0000-0000-0000-000000000020');

-- ============================================
-- 8. AVIS EXEMPLES
-- ============================================

INSERT INTO avis_utilisateurs (lieu_id, user_name, note, commentaire, date_experience, approved)
VALUES
('l1000001-0000-0000-0000-000000000001', 'Jean M.', 4, 'Service d urgences efficace, bien que l attente soit parfois longue. Personnel compétent.', '2026-01-15', true),
('l1000001-0000-0000-0000-000000000001', 'Marie K.', 3, 'Hôpital bien équipé mais manque de personnel. Prévoir beaucoup de temps.', '2026-01-20', true),
('l1000001-0000-0000-0000-000000000002', 'Patrick L.', 5, 'Excellente clinique, personnel très professionnel et accueillant.', '2026-02-01', true),
('l1000001-0000-0000-0000-000000000003', 'Chantal B.', 5, 'Monkole est vraiment au niveau international. Je recommande vivement.', '2026-02-10', true),
('l1000001-0000-0000-0000-000000000011', 'Joseph T.', 4, 'J ai obtenu mon acte de naissance en 2 jours. Service correct.', '2026-01-25', true),
('l1000001-0000-0000-0000-000000000011', 'Béatrice M.', 2, 'Trop de va-et-vient, on m a demandé de revenir plusieurs fois. Frustrant.', '2026-02-05', true),
('l1000001-0000-0000-0000-000000000020', 'Didier K.', 4, 'Grande université avec beaucoup de ressources. Campus agréable.', '2025-12-10', true);

-- ============================================
-- 9. ALERTES EXEMPLES
-- ============================================

INSERT INTO alertes (titre, message, type, date_debut, date_fin, actif)
VALUES
('Grève des services publics', 'Les bureaux de l''État Civil seront fermés le 28 février 2026 en raison d''un mouvement social.', 'warning', '2026-02-27', '2026-02-28', true),
('Campagne de vaccination gratuite', 'Vaccination gratuite contre la polio dans tous les centres de santé du 1er au 15 mars 2026.', 'info', '2026-03-01', '2026-03-15', true),
('Nouveaux horaires - Hôtel de Ville', 'L''Hôtel de Ville adopte de nouveaux horaires: 7h30-14h30 à partir du 1er mars.', 'info', '2026-03-01', NULL, true);

-- ============================================
-- ✅ Données insérées avec succès!
-- Résumé:
-- - 24 communes
-- - 35 zones de santé
-- - ~20 quartiers exemple
-- - 8 lieux (hôpitaux, administrations, écoles)
-- - 8 services proposés
-- - 7 avis utilisateurs
-- - 3 alertes
-- ============================================
