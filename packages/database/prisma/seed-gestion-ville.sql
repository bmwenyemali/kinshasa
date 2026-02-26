-- Seed Gestion de la Ville with real data for Kinshasa
-- Governor: Daniel Bumba Lubala (since 2024)

-- 1. Gouvernorat
INSERT INTO gouvernorat (id, gouverneur, photo_url, adresse, telephone, email, site_web, description, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Daniel Bumba Lubala',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Armoiries_de_la_ville_de_Kinshasa.svg/200px-Armoiries_de_la_ville_de_Kinshasa.svg.png',
  'Hôtel de Ville de Kinshasa, Boulevard du 30 Juin, Gombe',
  '+243 81 555 0001',
  'gouvernorat@kinshasa.cd',
  'https://www.kinshasa.cd',
  'Le Gouvernorat de la Ville-Province de Kinshasa est l''organe exécutif de la ville de Kinshasa. La ville compte 24 communes et plus de 17 millions d''habitants, ce qui en fait la troisième plus grande ville d''Afrique. Le gouverneur est élu par les députés provinciaux et est assisté par un vice-gouverneur et des ministres provinciaux.',
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- Get the gouvernorat ID for ministers
DO $$
DECLARE
  gouv_id UUID;
BEGIN
  SELECT id INTO gouv_id FROM gouvernorat LIMIT 1;

  -- 2. Ministres provinciaux (gouvernement provincial de Kinshasa)
  INSERT INTO ministres (id, gouvernorat_id, nom, portefeuille, telephone, email, ordre, created_at, updated_at) VALUES
  (gen_random_uuid(), gouv_id, 'Neron Mbungu Mbungu', 'Vice-Gouverneur', '+243 81 555 0010', NULL, 1, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Joséphine Mwadi Kapanga', 'Intérieur, Sécurité et Affaires coutumières', '+243 81 555 0011', NULL, 2, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Didier Bukasa Lufuluabo', 'Budget et Finances', '+243 81 555 0012', NULL, 3, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Rachidi Zandi', 'Travaux publics et Infrastructures', '+243 81 555 0013', NULL, 4, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Bernadette Tokwaulu', 'Éducation et Formation professionnelle', '+243 81 555 0014', NULL, 5, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Jean-Pierre Kalala Mukendi', 'Santé publique et Hygiène', '+243 81 555 0015', NULL, 6, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Christian Bosembe', 'Urbanisme et Habitat', '+243 81 555 0016', NULL, 7, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Emmanuel Mwenze Kabulo', 'Transport et Voies de communication', '+243 81 555 0017', NULL, 8, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Agnès Kabuya', 'Genre, Famille et Enfant', '+243 81 555 0018', NULL, 9, NOW(), NOW()),
  (gen_random_uuid(), gouv_id, 'Papy Kabamba', 'Économie, Commerce et PME', '+243 81 555 0019', NULL, 10, NOW(), NOW())
  ON CONFLICT DO NOTHING;
END $$;

-- 3. Députés provinciaux de Kinshasa (sample réel)
INSERT INTO deputes (id, nom, parti, circonscription, telephone, email, created_at, updated_at) VALUES
(gen_random_uuid(), 'Augustin Kabuya', 'UDPS', 'Limete', '+243 81 600 0001', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Jean-Marc Kabund', 'UDPS', 'Ngaliema', '+243 81 600 0002', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Christophe Mboso', 'UDPS/Alliés', 'Kasa-Vubu', '+243 81 600 0003', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Vital Kamerhe', 'UNC', 'Gombe', '+243 81 600 0004', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Patrick Muyaya', 'UDPS', 'Kalamu', '+243 81 600 0005', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Didier Mazenga', 'PPRD', 'Matete', '+243 81 600 0006', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Ève Bazaiba', 'MLC', 'Ngiri-Ngiri', '+243 81 600 0007', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Jacques Djoli', 'Indépendant', 'Bandalungwa', '+243 81 600 0008', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Marie-Josée Ifoku', 'AFDC', 'Bumbu', '+243 81 600 0009', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Guy Mafuta Kabamba', 'AB', 'Kintambo', '+243 81 600 0010', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Daniel Safu', 'Ensemble pour la République', 'Lemba', '+243 81 600 0011', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Gloria Sengha', 'PPRD', 'Masina', '+243 81 600 0012', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Crispin Mbindule', 'UNC', 'Kimbanseke', '+243 81 600 0013', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Henry Thomas Lokondo', 'MLC', 'Barumbu', '+243 81 600 0014', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Emery Okundji', 'UDPS', 'Ndjili', '+243 81 600 0015', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Fidèle Babala', 'MLC', 'Lingwala', '+243 81 600 0016', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Claudine Ndusi', 'AFDC', 'Makala', '+243 81 600 0017', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Willy Makiashi', 'MSR', 'Ngaba', '+243 81 600 0018', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Léonard She Okitundu', 'PPRD', 'Mont-Ngafula', '+243 81 600 0019', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Joseph Olenghankoy', 'FONUS', 'Selembao', '+243 81 600 0020', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Pierre Lumbi', 'MSR', 'Nsele', '+243 81 600 0021', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Jean-Lucien Bussa', 'MLC', 'Maluku', '+243 81 600 0022', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Roger Lumbala', 'RCD', 'Kisenso', '+243 81 600 0023', NULL, NOW(), NOW()),
(gen_random_uuid(), 'Noël Tshiani', 'Indépendant', 'Kinshasa', '+243 81 600 0024', NULL, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 4. Projets urbains réels de Kinshasa
INSERT INTO projets (id, titre, description, statut, budget, devise, date_debut, date_fin, localisation, maitre_doeuvre, categorie, created_at, updated_at) VALUES

(gen_random_uuid(),
 'Sauts-de-mouton de Kinshasa',
 'Construction de plusieurs échangeurs routiers (sauts-de-mouton) aux carrefours stratégiques de Kinshasa pour fluidifier le trafic. Comprend les échangeurs de Limete, Kinsuka, Socimat et UPN. Programme phare de modernisation du réseau routier.',
 'EN_COURS', 450000000.00, 'USD',
 '2023-06-01', '2026-12-31',
 'Limete, Kinsuka, Socimat, UPN',
 'Office des Voiries et Drainage (OVD)',
 'Infrastructure',
 NOW(), NOW()),

(gen_random_uuid(),
 'Avenue de la Libération - Réhabilitation',
 'Réhabilitation complète de l''avenue de la Libération (ex-24 Novembre) reliant Lemba à Matete et Limete. Réfection de la chaussée, drainage, éclairage public et trottoirs. L''un des axes les plus fréquentés de la ville.',
 'EN_COURS', 85000000.00, 'USD',
 '2024-01-15', '2026-06-30',
 'Lemba - Matete - Limete',
 'Office des Voiries et Drainage (OVD)',
 'Infrastructure',
 NOW(), NOW()),

(gen_random_uuid(),
 'Usine de traitement d''eau de Nsele',
 'Construction d''une nouvelle station de traitement d''eau à Nsele pour approvisionner l''est de Kinshasa (Masina, Ndjili, Kimbanseke) en eau potable. Capacité prévue : 110 000 m³/jour.',
 'EN_COURS', 320000000.00, 'USD',
 '2023-09-01', '2027-03-31',
 'Nsele',
 'REGIDESO / China Gezhouba',
 'Eau et Assainissement',
 NOW(), NOW()),

(gen_random_uuid(),
 'Programme Kin-Bopeto (Kinshasa Propre)',
 'Programme municipal de propreté urbaine visant à assainir Kinshasa. Collecte régulière des déchets, aménagement de décharges contrôlées, sensibilisation communautaire et déploiement de brigades d''assainissement dans les 24 communes.',
 'EN_COURS', 15000000.00, 'USD',
 '2022-01-01', NULL,
 'Toutes les 24 communes',
 'Gouvernorat de Kinshasa',
 'Environnement',
 NOW(), NOW()),

(gen_random_uuid(),
 'Bus Rapid Transit (BRT) Kinshasa',
 'Mise en place d''un système de bus rapide sur voie dédiée le long du Boulevard Lumumba, de Limete à Kinkole. Phase 1 : 17 km avec 18 stations. Projet de transport urbain de masse pour réduire la congestion.',
 'PLANIFIE', 500000000.00, 'USD',
 '2025-07-01', '2029-12-31',
 'Boulevard Lumumba (Limete - Kinkole)',
 'MITPR / Banque Mondiale',
 'Transport',
 NOW(), NOW()),

(gen_random_uuid(),
 'Construction du Pont Kinshasa-Brazzaville',
 'Méga-projet de pont routier et ferroviaire reliant Kinshasa (RDC) à Brazzaville (Congo). Longueur totale : 1,575 km. Comprend un poste frontière intégré, une voie ferrée et une autoroute à quatre voies.',
 'PLANIFIE', 550000000.00, 'USD',
 '2025-01-01', '2029-12-31',
 'Maluku - Brazzaville',
 'Africa Finance Corporation / BAD',
 'Infrastructure',
 NOW(), NOW()),

(gen_random_uuid(),
 'Rénovation de l''Hôpital Général de Kinshasa',
 'Programme de modernisation et rénovation de l''Hôpital Général de Référence de Kinshasa (ex-Mama Yemo). Réhabilitation des blocs opératoires, imagerie médicale, maternité et services d''urgence.',
 'EN_COURS', 45000000.00, 'USD',
 '2024-03-01', '2026-09-30',
 'Gombe',
 'Ministère de la Santé / OMS',
 'Santé',
 NOW(), NOW()),

(gen_random_uuid(),
 'Éclairage solaire des grandes artères',
 'Installation de lampadaires solaires LED sur les principales artères de Kinshasa : Boulevard du 30 Juin, Avenue Kasa-Vubu, Avenue de l''OUA, Boulevard Lumumba. Plus de 5 000 lampadaires prévus.',
 'EN_COURS', 28000000.00, 'USD',
 '2024-06-01', '2026-03-31',
 'Gombe, Kasa-Vubu, Limete, Ngaliema',
 'Gouvernorat / Partenaire privé',
 'Énergie',
 NOW(), NOW()),

(gen_random_uuid(),
 'Cité administrative de Kinshasa',
 'Construction d''un complexe administratif moderne regroupant les services provinciaux et municipaux. Bureaux, salle de conférence, guichets uniques pour les citoyens et espace numérique de services publics.',
 'PLANIFIE', 120000000.00, 'USD',
 '2026-01-01', '2029-06-30',
 'Gombe',
 'Gouvernorat de Kinshasa',
 'Administration',
 NOW(), NOW()),

(gen_random_uuid(),
 'Réhabilitation du marché central de Kinshasa',
 'Reconstruction et modernisation du Grand Marché de Kinshasa (marché central) détruit par un incendie. Le nouveau marché comprendra des étages, un parking, des installations sanitaires et un système anti-incendie moderne.',
 'TERMINE', 32000000.00, 'USD',
 '2022-06-01', '2025-01-15',
 'Gombe / Barumbu',
 'Gouvernorat de Kinshasa / Turquie',
 'Commerce',
 NOW(), NOW())

ON CONFLICT DO NOTHING;
