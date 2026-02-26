-- Seed police stations for all 24 communes of Kinshasa
-- Each commune gets at least one police station (Commissariat de Police)

INSERT INTO lieux (id, nom, type, adresse, telephone, email, latitude, longitude, verified, commune_id, responsable, created_at, updated_at)
VALUES
-- Bandalungwa
(gen_random_uuid(), 'Commissariat de Police de Bandalungwa', 'POLICE', 'Avenue Kikwit, Bandalungwa', '+243 81 500 0001', 'police.bandalungwa@pnc.cd', -4.3333, 15.2833, true, (SELECT id FROM communes WHERE name = 'Bandalungwa'), 'Commissaire Principal Adjoint Mbala', NOW(), NOW()),

-- Barumbu
(gen_random_uuid(), 'Commissariat de Police de Barumbu', 'POLICE', 'Avenue Bokasa, Barumbu', '+243 81 500 0002', 'police.barumbu@pnc.cd', -4.3167, 15.3100, true, (SELECT id FROM communes WHERE name = 'Barumbu'), 'Commissaire Principal Adjoint Lukusa', NOW(), NOW()),

-- Bumbu
(gen_random_uuid(), 'Commissariat de Police de Bumbu', 'POLICE', 'Avenue Kimbangu, Bumbu', '+243 81 500 0003', 'police.bumbu@pnc.cd', -4.3500, 15.2833, true, (SELECT id FROM communes WHERE name = 'Bumbu'), 'Commissaire Supérieur Mwamba', NOW(), NOW()),

-- Gombe
(gen_random_uuid(), 'Commissariat de Police de la Gombe', 'POLICE', 'Avenue Colonel Lukusa, Gombe', '+243 81 500 0004', 'police.gombe@pnc.cd', -4.3100, 15.2900, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Commissaire Divisionnaire Tshilombo', NOW(), NOW()),
(gen_random_uuid(), 'Sous-Commissariat Central Gombe', 'POLICE', 'Boulevard du 30 Juin, Gombe', '+243 81 500 0040', NULL, -4.3050, 15.2850, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Commissaire Adjoint Ngoy', NOW(), NOW()),

-- Kalamu
(gen_random_uuid(), 'Commissariat de Police de Kalamu', 'POLICE', 'Avenue Kabinda, Kalamu', '+243 81 500 0005', 'police.kalamu@pnc.cd', -4.3400, 15.3100, true, (SELECT id FROM communes WHERE name = 'Kalamu'), 'Commissaire Principal Adjoint Ilunga', NOW(), NOW()),

-- Kasa-Vubu
(gen_random_uuid(), 'Commissariat de Police de Kasa-Vubu', 'POLICE', 'Avenue de la Victoire, Kasa-Vubu', '+243 81 500 0006', 'police.kasavubu@pnc.cd', -4.3333, 15.3000, true, (SELECT id FROM communes WHERE name = 'Kasa-Vubu'), 'Commissaire Principal Kabongo', NOW(), NOW()),

-- Kimbanseke
(gen_random_uuid(), 'Commissariat de Police de Kimbanseke', 'POLICE', 'Avenue Ndjili, Kimbanseke', '+243 81 500 0007', 'police.kimbanseke@pnc.cd', -4.4000, 15.3500, true, (SELECT id FROM communes WHERE name = 'Kimbanseke'), 'Commissaire Divisionnaire Adjoint Kasongo', NOW(), NOW()),
(gen_random_uuid(), 'Sous-Commissariat Kimbanseke Sud', 'POLICE', 'Avenue de la Paix, Kimbanseke', '+243 81 500 0070', NULL, -4.4100, 15.3550, true, (SELECT id FROM communes WHERE name = 'Kimbanseke'), 'Commissaire Adjoint Mutombo', NOW(), NOW()),

-- Kinshasa (commune)
(gen_random_uuid(), 'Commissariat de Police de Kinshasa', 'POLICE', 'Avenue Kasa-Vubu, Kinshasa', '+243 81 500 0008', 'police.kinshasa@pnc.cd', -4.3250, 15.3150, true, (SELECT id FROM communes WHERE name = 'Kinshasa'), 'Commissaire Principal Kalala', NOW(), NOW()),

-- Kintambo
(gen_random_uuid(), 'Commissariat de Police de Kintambo', 'POLICE', 'Avenue de Kintambo, Kintambo', '+243 81 500 0009', 'police.kintambo@pnc.cd', -4.3200, 15.2700, true, (SELECT id FROM communes WHERE name = 'Kintambo'), 'Commissaire Principal Adjoint Lombe', NOW(), NOW()),

-- Kisenso
(gen_random_uuid(), 'Commissariat de Police de Kisenso', 'POLICE', 'Avenue Kisenso, Kisenso', '+243 81 500 0010', 'police.kisenso@pnc.cd', -4.3800, 15.3300, true, (SELECT id FROM communes WHERE name = 'Kisenso'), 'Commissaire Supérieur Kabila', NOW(), NOW()),

-- Lemba
(gen_random_uuid(), 'Commissariat de Police de Lemba', 'POLICE', 'Avenue de l''Université, Lemba', '+243 81 500 0011', 'police.lemba@pnc.cd', -4.3833, 15.3167, true, (SELECT id FROM communes WHERE name = 'Lemba'), 'Commissaire Principal Katanga', NOW(), NOW()),

-- Limete
(gen_random_uuid(), 'Commissariat de Police de Limete', 'POLICE', 'Avenue des Poids Lourds, Limete', '+243 81 500 0012', 'police.limete@pnc.cd', -4.3500, 15.3333, true, (SELECT id FROM communes WHERE name = 'Limete'), 'Commissaire Divisionnaire Adjoint Nyembo', NOW(), NOW()),

-- Lingwala
(gen_random_uuid(), 'Commissariat de Police de Lingwala', 'POLICE', 'Avenue Tombalbaye, Lingwala', '+243 81 500 0013', 'police.lingwala@pnc.cd', -4.3100, 15.2950, true, (SELECT id FROM communes WHERE name = 'Lingwala'), 'Commissaire Principal Adjoint Tshibangu', NOW(), NOW()),

-- Makala
(gen_random_uuid(), 'Commissariat de Police de Makala', 'POLICE', 'Avenue Luambo Makiadi, Makala', '+243 81 500 0014', 'police.makala@pnc.cd', -4.3700, 15.2900, true, (SELECT id FROM communes WHERE name = 'Makala'), 'Commissaire Supérieur Adjoint Kalonji', NOW(), NOW()),

-- Maluku
(gen_random_uuid(), 'Commissariat de Police de Maluku', 'POLICE', 'Avenue Principale, Maluku Centre', '+243 81 500 0015', 'police.maluku@pnc.cd', -4.0500, 15.6500, true, (SELECT id FROM communes WHERE name = 'Maluku'), 'Commissaire Divisionnaire Kikwanga', NOW(), NOW()),

-- Masina
(gen_random_uuid(), 'Commissariat de Police de Masina', 'POLICE', 'Avenue Luambo, Masina', '+243 81 500 0016', 'police.masina@pnc.cd', -4.3833, 15.3833, true, (SELECT id FROM communes WHERE name = 'Masina'), 'Commissaire Principal Banza', NOW(), NOW()),

-- Matete
(gen_random_uuid(), 'Commissariat de Police de Matete', 'POLICE', 'Avenue Pierre Mulele, Matete', '+243 81 500 0017', 'police.matete@pnc.cd', -4.3667, 15.3167, true, (SELECT id FROM communes WHERE name = 'Matete'), 'Commissaire Principal Adjoint Tshisekedi', NOW(), NOW()),

-- Mont-Ngafula
(gen_random_uuid(), 'Commissariat de Police de Mont-Ngafula', 'POLICE', 'Avenue de Mont-Ngafula, Mont-Ngafula', '+243 81 500 0018', 'police.montngafula@pnc.cd', -4.4000, 15.2000, true, (SELECT id FROM communes WHERE name = 'Mont-Ngafula'), 'Commissaire Divisionnaire Adjoint Nkulu', NOW(), NOW()),

-- Ndjili
(gen_random_uuid(), 'Commissariat de Police de Ndjili', 'POLICE', 'Avenue Ndjili, Ndjili', '+243 81 500 0019', 'police.ndjili@pnc.cd', -4.3900, 15.3700, true, (SELECT id FROM communes WHERE name = 'Ndjili'), 'Commissaire Principal Mulako', NOW(), NOW()),

-- Ngaba
(gen_random_uuid(), 'Commissariat de Police de Ngaba', 'POLICE', 'Avenue du Commerce, Ngaba', '+243 81 500 0020', 'police.ngaba@pnc.cd', -4.3733, 15.3100, true, (SELECT id FROM communes WHERE name = 'Ngaba'), 'Commissaire Supérieur Adjoint Mukendi', NOW(), NOW()),

-- Ngaliema
(gen_random_uuid(), 'Commissariat de Police de Ngaliema', 'POLICE', 'Avenue du Mont Amba, Ngaliema', '+243 81 500 0021', 'police.ngaliema@pnc.cd', -4.3300, 15.2500, true, (SELECT id FROM communes WHERE name = 'Ngaliema'), 'Commissaire Divisionnaire Lumumba', NOW(), NOW()),
(gen_random_uuid(), 'Sous-Commissariat Ma Campagne', 'POLICE', 'Avenue Ma Campagne, Ngaliema', '+243 81 500 0210', NULL, -4.3350, 15.2450, true, (SELECT id FROM communes WHERE name = 'Ngaliema'), 'Commissaire Adjoint Mfumu', NOW(), NOW()),

-- Ngiri-Ngiri
(gen_random_uuid(), 'Commissariat de Police de Ngiri-Ngiri', 'POLICE', 'Avenue Assossa, Ngiri-Ngiri', '+243 81 500 0022', 'police.ngiri@pnc.cd', -4.3433, 15.2933, true, (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri'), 'Commissaire Principal Adjoint Kamwanya', NOW(), NOW()),

-- Nsele
(gen_random_uuid(), 'Commissariat de Police de la Nsele', 'POLICE', 'Avenue de la Nsele, Nsele', '+243 81 500 0023', 'police.nsele@pnc.cd', -4.2900, 15.4500, true, (SELECT id FROM communes WHERE name = 'Nsele'), 'Commissaire Divisionnaire Adjoint Nzambi', NOW(), NOW()),

-- Selembao
(gen_random_uuid(), 'Commissariat de Police de Selembao', 'POLICE', 'Avenue de Selembao, Selembao', '+243 81 500 0024', 'police.selembao@pnc.cd', -4.3600, 15.2600, true, (SELECT id FROM communes WHERE name = 'Selembao'), 'Commissaire Principal Kabeya', NOW(), NOW());

-- Add services for each police station
INSERT INTO services_proposes (id, lieu_id, nom_service, description, categorie, prix_officiel, devise, created_at, updated_at)
SELECT
  gen_random_uuid(),
  l.id,
  s.nom,
  s.description,
  'SECURITE'::service_categorie,
  s.prix,
  'FC',
  NOW(),
  NOW()
FROM lieux l
CROSS JOIN (
  VALUES
    ('Dépôt de plainte', 'Enregistrement des plaintes pour infractions pénales', NULL::decimal),
    ('Attestation de perte de pièces', 'Délivrance d''attestation de perte de documents', 5000.00),
    ('Attestation de bonne conduite', 'Certificat de bonne conduite, vie et moeurs', 10000.00),
    ('Intervention d''urgence', 'Intervention rapide en cas d''urgence sécuritaire', NULL::decimal),
    ('Médiation de conflits', 'Résolution amiable de conflits de voisinage', NULL::decimal),
    ('Déclaration de vol', 'Enregistrement de déclaration de vol ou cambriolage', NULL::decimal),
    ('Autorisation de manifestation', 'Délivrance d''autorisation pour événements publics', 15000.00),
    ('Escort et protection', 'Service d''accompagnement et de protection', 25000.00)
) AS s(nom, description, prix)
WHERE l.type = 'POLICE';
