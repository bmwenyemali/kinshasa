-- =============================================================
-- SEED: Replace gouvernorat ministers, commissaires généraux, and députés
-- with real data from the current Exécutif Provincial
-- =============================================================

-- First, clear existing ministers and députés to replace with real data
DELETE FROM ministres;
DELETE FROM deputes;

-- Insert ministers (type = MINISTRE)
INSERT INTO ministres (id, gouvernorat_id, nom, portefeuille, type, ordre, created_at, updated_at)
SELECT gen_random_uuid(), g.id, m.nom, m.portefeuille, m.type, m.ordre, NOW(), NOW()
FROM gouvernorat g,
(VALUES
  ('Mimie Bikela Mundele', 'Intérieur, Sécurité, Décentralisation et Affaires coutumières', 'MINISTRE', 1),
  ('Magloire Kabemba Okandja', 'Finances, Économie et Numérique', 'MINISTRE', 2),
  ('Alain Tshilungu', 'Infrastructures et Travaux publics', 'MINISTRE', 3),
  ('Jésus-Noël Sheke Wa Domene', 'Plan, Budget, Emploi et Tourisme', 'MINISTRE', 4),
  ('Léon Mulumba Mwana Nshiya', 'Environnement, Propreté et Embellissement de la Ville', 'MINISTRE', 5),
  ('Bob Amisso Yoka', 'Transports et Mobilité Urbaine', 'MINISTRE', 6),
  ('Jeannot Canon Larose', 'Éducation et Citoyenneté', 'MINISTRE', 7),
  ('Fiston Lukwebo Musengo', 'Partenariat Public-Privé, Commerce et Artisanat', 'MINISTRE', 8),
  ('Israël Kabenda Kayuwa', 'Jeunesse, Hydrocarbures, Culture et Arts', 'MINISTRE', 9),
  ('Patricia Gongo Abakazi', 'Santé, Hygiène et Prévention', 'MINISTRE', 10)
) AS m(nom, portefeuille, type, ordre)
LIMIT 10;

-- Insert commissaires généraux (type = COMMISSAIRE_GENERAL)
INSERT INTO ministres (id, gouvernorat_id, nom, portefeuille, type, ordre, created_at, updated_at)
SELECT gen_random_uuid(), g.id, m.nom, m.portefeuille, m.type, m.ordre, NOW(), NOW()
FROM gouvernorat g,
(VALUES
  ('Raphaël Kebongo Raphaël', 'Affaires Foncières, Urbanisme, Habitat et Aménagement', 'COMMISSAIRE_GENERAL', 11),
  ('Edith Kanefu Bahati', 'Genre, Famille et Personnes vulnérables', 'COMMISSAIRE_GENERAL', 12),
  ('Zacharie Kendabingu Mulangala', 'Agriculture et Développement rural', 'COMMISSAIRE_GENERAL', 13),
  ('Norbertine Matende Simiyama', 'Affaires Sociales, Fonction Publique et Entrepreneuriat', 'COMMISSAIRE_GENERAL', 14),
  ('Jared Babaka Phanzu', 'Communication, Coopération décentralisée et Porte-Parole du Gouvernement', 'COMMISSAIRE_GENERAL', 15),
  ('Samuel Kimbukusu Lungungu', 'Pêche et Élevage', 'COMMISSAIRE_GENERAL', 16),
  ('Jackson Mpunga Tshimankinda', 'Mines, Portefeuille, Nouvelles Technologies de l''Information et de la Communication', 'COMMISSAIRE_GENERAL', 17),
  ('Tom Kisenda Matondo', 'Sports et Loisirs', 'COMMISSAIRE_GENERAL', 18),
  ('Sylvie Tshituka Mbombo Muswamba', 'Formation professionnelle, Réinsertion et Actions Humanitaires', 'COMMISSAIRE_GENERAL', 19),
  ('Léon Junior Nembalemba', 'Industrie et Énergie', 'COMMISSAIRE_GENERAL', 20)
) AS m(nom, portefeuille, type, ordre)
LIMIT 10;

-- Insert députés provinciaux with their circonscription (commune)
INSERT INTO deputes (id, nom, circonscription, created_at, updated_at) VALUES
  -- Bandalungwa
  (gen_random_uuid(), 'Patrick Muyaya Katembwe', 'Bandalungwa', NOW(), NOW()),
  -- Barumbu
  (gen_random_uuid(), 'Bob Amisso Yoka Lumbila', 'Barumbu', NOW(), NOW()),
  -- Bumbu
  (gen_random_uuid(), 'Pepitho Kahromon Kilala', 'Bumbu', NOW(), NOW()),
  -- Gombe
  (gen_random_uuid(), 'Fiston Lukwebo Musengo', 'Gombe', NOW(), NOW()),
  -- Kalamu
  (gen_random_uuid(), 'Micke Kabasele Tubajika', 'Kalamu', NOW(), NOW()),
  (gen_random_uuid(), 'Lambert Osango Nsenga', 'Kalamu', NOW(), NOW()),
  -- Kasa-Vubu
  (gen_random_uuid(), 'André Nkongolo Nkongolo', 'Kasa-Vubu', NOW(), NOW()),
  -- Kimbanseke
  (gen_random_uuid(), 'Paty Mubenga Lumbala', 'Kimbanseke', NOW(), NOW()),
  (gen_random_uuid(), 'Levi Mbuta Sangupamba', 'Kimbanseke', NOW(), NOW()),
  (gen_random_uuid(), 'Jeannot Canon Larose', 'Kimbanseke', NOW(), NOW()),
  (gen_random_uuid(), 'Honoré Mbokoso Amous-Kempay', 'Kimbanseke', NOW(), NOW()),
  (gen_random_uuid(), 'Pathy Kafuti Kiyamba', 'Kimbanseke', NOW(), NOW()),
  -- Kinshasa
  (gen_random_uuid(), 'Israël Kabenda Kayuwa', 'Kinshasa', NOW(), NOW()),
  -- Kintambo
  (gen_random_uuid(), 'Justin Moïse Kadima Kabongo', 'Kintambo', NOW(), NOW()),
  -- Kisenso
  (gen_random_uuid(), 'Joseph Kasinzi Mafolo', 'Kisenso', NOW(), NOW()),
  (gen_random_uuid(), 'Olivier Niangi Kahonda', 'Kisenso', NOW(), NOW()),
  -- Lemba
  (gen_random_uuid(), 'Peter Kazadi Kankonde', 'Lemba', NOW(), NOW()),
  (gen_random_uuid(), 'Norbertine Matanda Simiyama', 'Lemba', NOW(), NOW()),
  -- Limete
  (gen_random_uuid(), 'Gérard Gecoco Mulumba Kongolo', 'Limete', NOW(), NOW()),
  (gen_random_uuid(), 'Jean-Jacques Tembele Buku', 'Limete', NOW(), NOW()),
  (gen_random_uuid(), 'Edith Kanefu Bahati', 'Limete', NOW(), NOW()),
  -- Lingwala
  (gen_random_uuid(), 'Jésus Noël Sheke wa Domene Laku', 'Lingwala', NOW(), NOW()),
  -- Makala
  (gen_random_uuid(), 'Edug Eden Lumbu Kukiel', 'Makala', NOW(), NOW()),
  -- Maluku
  (gen_random_uuid(), 'Jacques Munze Epiana', 'Maluku', NOW(), NOW()),
  -- Masina
  (gen_random_uuid(), 'Jean Ngoy Mvunzi', 'Masina', NOW(), NOW()),
  (gen_random_uuid(), 'Francis Tshibalabala Mukunay', 'Masina', NOW(), NOW()),
  (gen_random_uuid(), 'Raphaël Kebongo Raphaël', 'Masina', NOW(), NOW()),
  -- Matete
  (gen_random_uuid(), 'Martyr Diyabanza Mwananene', 'Matete', NOW(), NOW()),
  -- Mont-Ngafula
  (gen_random_uuid(), 'Socrates Mubengaie Kamanga', 'Mont-Ngafula', NOW(), NOW()),
  (gen_random_uuid(), 'Aubain Mukanu Isukama', 'Mont-Ngafula', NOW(), NOW()),
  (gen_random_uuid(), 'Jack Mabaya Kashit', 'Mont-Ngafula', NOW(), NOW()),
  -- Ndjili
  (gen_random_uuid(), 'Constantin Shakob Woot', 'Ndjili', NOW(), NOW()),
  -- Ngaba
  (gen_random_uuid(), 'Monplaisir Bolokole Lombo', 'Ngaba', NOW(), NOW()),
  -- Ngaliema
  (gen_random_uuid(), 'Charmant Eliezer Ntambwe Mposhi', 'Ngaliema', NOW(), NOW()),
  (gen_random_uuid(), 'Germaine Tshinyama Mpemba', 'Ngaliema', NOW(), NOW()),
  (gen_random_uuid(), 'Guylain Pohungu Malamba', 'Ngaliema', NOW(), NOW()),
  (gen_random_uuid(), 'Daniel Iyeli Molangi', 'Ngaliema', NOW(), NOW()),
  (gen_random_uuid(), 'Dieumerci Mayibanziluanga Divengi', 'Ngaliema', NOW(), NOW()),
  -- Ngiri-Ngiri
  (gen_random_uuid(), 'Eddy Iyeli Molangi', 'Ngiri-Ngiri', NOW(), NOW()),
  -- Nsele
  (gen_random_uuid(), 'Auguy Kalonji Kalonji', 'Nsele', NOW(), NOW()),
  (gen_random_uuid(), 'Franck Mbo Nzolameso', 'Nsele', NOW(), NOW()),
  (gen_random_uuid(), 'Clauvis Samba Mwamolele', 'Nsele', NOW(), NOW()),
  -- Selembao
  (gen_random_uuid(), 'Jean-Paul Dikuyi Cinkenke', 'Selembao', NOW(), NOW()),
  (gen_random_uuid(), 'Mao Ntuene Munsilueyi', 'Selembao', NOW(), NOW());
