-- =============================================================
-- SUPPLEMENT: Add more quartiers to ensure comprehensive coverage
-- Uses INSERT ... ON CONFLICT to avoid duplicates
-- Run after the existing seed-quartiers.sql
-- =============================================================

-- BANDALUNGWA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Camp Kokolo', 35000, NULL, 'Près du camp militaire'),
  ('Lufungula', 40000, NULL, 'Avenue de la Libération'),
  ('Mfinda', 33000, NULL, 'Près de la paroisse Notre-Dame'),
  ('Mukulua', 36000, NULL, 'Avenue Kikwit Sud'),
  ('Pumbu', 38000, NULL, 'Coin avenue Victoire')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Bandalungwa'
ON CONFLICT (commune_id, name) DO NOTHING;

-- BARUMBU - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Citas', 24000, NULL, 'Près de la RTNC'),
  ('Immo-Congo', 26000, NULL, 'Avenue Kalemie'),
  ('Kauka', 29000, NULL, 'Coin avenue Tombalbaye'),
  ('Lokoro', 23000, NULL, 'Près du cimetière de Barumbu'),
  ('Sans Fil', 25000, NULL, 'Avenue des Huileries')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Barumbu'
ON CONFLICT (commune_id, name) DO NOTHING;

-- BUMBU - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Herady', 44000, NULL, 'Avenue Assosa'),
  ('Mateba', 41000, NULL, 'Coin marché de Bumbu'),
  ('Mur du Zaïre', 46000, NULL, 'Près du mur de soutènement'),
  ('Ngafani', 43000, NULL, 'Avenue Kabambare Nord'),
  ('Nkufi', 42000, NULL, 'Vers rond-point Ngaba'),
  ('Shalalo', 39000, NULL, 'Coin paroisse Sainte-Anne')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Bumbu'
ON CONFLICT (commune_id, name) DO NOTHING;

-- GOMBE - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Socimat', 11000, NULL, 'Près de la Socimat, vers le fleuve'),
  ('Huileries', 10000, NULL, 'Avenue des Huileries'),
  ('Royal', 9000, NULL, 'Coin Hôtel Royal')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Gombe'
ON CONFLICT (commune_id, name) DO NOTHING;

-- KALAMU - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Biyela', 42000, NULL, 'Avenue du Commerce'),
  ('Djelo Binza', 38000, NULL, 'Coin Djelo Binza'),
  ('Kalunga', 40000, NULL, 'Près de la Poste'),
  ('Kimpe', 35000, NULL, 'Avenue Kimpe'),
  ('Matonge', 55000, NULL, 'Rond-point Victoire, cœur de Matonge'),
  ('Pinzi', 33000, NULL, 'Avenue Pinzi'),
  ('Résidentiel', 28000, NULL, 'Zone résidentielle, avenue Katanga'),
  ('Yolo-Nord', 44000, NULL, 'Avenue Yolo, secteur nord'),
  ('Yolo-Sud', 41000, NULL, 'Avenue Yolo, secteur sud'),
  ('Immo-Kwango', 37000, NULL, 'Près de Immo-Kwango')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Kalamu'
ON CONFLICT (commune_id, name) DO NOTHING;

-- KASA-VUBU - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('ANC', 32000, NULL, 'Ancien camp ANC'),
  ('Bethanie', 28000, NULL, 'Près de la Mission Bethanie'),
  ('Évêché', 26000, NULL, 'Coin cathédrale Notre-Dame'),
  ('Lumumba', 35000, NULL, 'Avenue Lumumba'),
  ('Mpaka', 24000, NULL, 'Coin avenue Mpaka'),
  ('Muete', 27000, NULL, 'Quartier Muete'),
  ('Okito', 29000, NULL, 'Avenue Okito Kasavubu'),
  ('Pétro-Congo', 22000, NULL, 'Près de la station Pétro-Congo'),
  ('Saio', 25000, NULL, 'Coin avenue du Saio'),
  ('Singa-Mopepe', 30000, NULL, 'Avenue Singa-Mopepe')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Kasa-Vubu'
ON CONFLICT (commune_id, name) DO NOTHING;

-- KIMBANSEKE - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Bahumbu', 65000, NULL, 'Quartier Bahumbu, route de Nsele'),
  ('Bikanga', 55000, NULL, 'Vers Bikanga'),
  ('Esali', 50000, NULL, 'Quartier Esali'),
  ('Kabinda', 60000, NULL, 'Avenue Kabinda'),
  ('Komboso', 52000, NULL, 'Quartier Komboso'),
  ('Libongo', 58000, NULL, 'Coin Libongo'),
  ('Mangala', 48000, NULL, 'Route de Mangala'),
  ('Mikonga', 62000, NULL, 'Quartier Mikonga'),
  ('Mitendi', 45000, NULL, 'Vers Mitendi'),
  ('Nsanga', 55000, NULL, 'Quartier Nsanga'),
  ('Peti-Peti', 50000, NULL, 'Coin Peti-Peti'),
  ('Tshangu', 64000, NULL, 'Avenue Tshangu'),
  ('Vivi', 42000, NULL, 'Quartier Vivi')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Kimbanseke'
ON CONFLICT (commune_id, name) DO NOTHING;

-- KINSHASA (commune) - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Amba', 18000, NULL, 'Quartier Amba'),
  ('Congo', 20000, NULL, 'Coin avenue du Congo'),
  ('Libulu', 16000, NULL, 'Quartier Libulu'),
  ('Mombele', 14000, NULL, 'Quartier Mombele, coin fleuve'),
  ('Ngobila', 17000, NULL, 'Près du Beach Ngobila'),
  ('Zando', 25000, NULL, 'Grand Marché de Zando')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Kinshasa'
ON CONFLICT (commune_id, name) DO NOTHING;

-- KINTAMBO - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Bayaka', 32000, NULL, 'Coin avenue Bayaka'),
  ('Gbadolite', 28000, NULL, 'Quartier Gbadolite'),
  ('Kintambo-Magasin', 30000, NULL, 'Près du marché Kintambo'),
  ('Lukunga', 26000, NULL, 'Avenue Lukunga'),
  ('Mandrandele', 24000, NULL, 'Quartier Mandrandele'),
  ('Mbaki', 29000, NULL, 'Vers Mbaki'),
  ('Nganda', 31000, NULL, 'Avenue Nganda'),
  ('Pêcheurs', 22000, NULL, 'Coin des pêcheurs, fleuve Congo'),
  ('Virunga', 27000, NULL, 'Quartier Virunga')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Kintambo'
ON CONFLICT (commune_id, name) DO NOTHING;

-- KISENSO - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Bakali', 48000, NULL, 'Colline de Bakali'),
  ('Batende', 42000, NULL, 'Quartier Batende'),
  ('De la Paix', 45000, NULL, 'Avenue de la Paix'),
  ('Kisanga', 39000, NULL, 'Quartier Kisanga'),
  ('Lubudi', 43000, NULL, 'Colline Lubudi'),
  ('Mfumu Nsuka', 37000, NULL, 'Vers Mfumu Nsuka'),
  ('Mission', 35000, NULL, 'Près de la mission catholique'),
  ('ONATRA', 41000, NULL, 'Quartier ONATRA'),
  ('Révolution', 40000, NULL, 'Avenue Révolution'),
  ('Salongo', 44000, NULL, 'Coin Salongo')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Kisenso'
ON CONFLICT (commune_id, name) DO NOTHING;

-- LEMBA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Echangeur', 48000, NULL, 'Échangeur de Limete-Lemba'),
  ('Funa', 40000, NULL, 'Quartier Funa'),
  ('Gombele', 35000, NULL, 'Coin Gombele'),
  ('Lemba-Terminus', 44000, NULL, 'Terminus des bus Lemba'),
  ('Livulu', 38000, NULL, 'Quartier Livulu'),
  ('Mbanza-Lemba', 37000, NULL, 'Avenue Mbanza-Lemba'),
  ('Molo', 33000, NULL, 'Quartier Molo'),
  ('Mososo', 41000, NULL, 'Vers Mososo'),
  ('Righini', 45000, NULL, 'Coin Righini, campus UNIKIN')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Lemba'
ON CONFLICT (commune_id, name) DO NOTHING;

-- LIMETE - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Camp Kabila', 35000, NULL, 'Ancien camp Kabila'),
  ('Foire', 42000, NULL, 'Foire Internationale de Kinshasa'),
  ('Industriel', 22000, NULL, 'Zone industrielle de Limete'),
  ('Kingabwa', 55000, NULL, 'Quartier Kingabwa, marécages'),
  ('Kingabwa-Pêcheurs', 38000, NULL, 'Coin fleuve, pêcheurs'),
  ('Mombele', 44000, NULL, 'Quartier Mombele'),
  ('Mosala', 36000, NULL, 'Avenue Mosala'),
  ('Ndanu', 32000, NULL, 'Quartier Ndanu'),
  ('Résidentiel', 28000, NULL, 'Zone résidentielle de Limete')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Limete'
ON CONFLICT (commune_id, name) DO NOTHING;

-- LINGWALA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Basoko', 22000, NULL, 'Quartier Basoko'),
  ('Bolia', 20000, NULL, 'Coin Bolia'),
  ('Boyera', 24000, NULL, 'Avenue Boyera'),
  ('Cité Mama Mobutu', 30000, NULL, 'Cité Mama Mobutu'),
  ('Lompoko', 23000, NULL, 'Quartier Lompoko'),
  ('Mongala', 26000, NULL, 'Avenue Mongala')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Lingwala'
ON CONFLICT (commune_id, name) DO NOTHING;

-- MAKALA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Bolingo', 55000, NULL, 'Quartier Bolingo'),
  ('Kibambe', 42000, NULL, 'Coin Kibambe'),
  ('Kwamwita', 58000, NULL, 'Avenue Kwamwita'),
  ('Lukusa', 46000, NULL, 'Quartier Lukusa'),
  ('Mbanza-Mboma', 44000, NULL, 'Coin Mbanza-Mboma'),
  ('Ndjili-Brasserie', 56000, NULL, 'Près de la Brasserie'),
  ('Ndjoko', 39000, NULL, 'Quartier Ndjoko'),
  ('Nsola', 48000, NULL, 'Vers Nsola')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Makala'
ON CONFLICT (commune_id, name) DO NOTHING;

-- MALUKU - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Dingi-Dingi', 12000, NULL, 'Vers Dingi-Dingi'),
  ('Kimpoko', 15000, NULL, 'Quartier Kimpoko, fleuve'),
  ('Maluku-Centre', 20000, NULL, 'Centre de Maluku'),
  ('Mangengenge', 10000, NULL, 'Zone rurale Mangengenge'),
  ('Menkao', 8000, NULL, 'Vers Menkao'),
  ('Mongata', 13000, NULL, 'Quartier Mongata'),
  ('Nsanda', 11000, NULL, 'Coin Nsanda')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Maluku'
ON CONFLICT (commune_id, name) DO NOTHING;

-- MASINA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Abattoir', 48000, NULL, 'Près de l''ancien abattoir'),
  ('Bebey', 54000, NULL, 'Quartier Bebey'),
  ('Congo', 40000, NULL, 'Coin Congo'),
  ('Mapela', 58000, NULL, 'Avenue Mapela'),
  ('Masina I', 52000, NULL, 'Masina secteur 1'),
  ('Masina II', 56000, NULL, 'Masina secteur 2'),
  ('Masina III', 46000, NULL, 'Masina secteur 3'),
  ('Petro-Congo', 43000, NULL, 'Coin station Petro-Congo'),
  ('Sans Fil', 38000, NULL, 'Quartier Sans Fil'),
  ('Tshuenge', 50000, NULL, 'Vers Tshuenge')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Masina'
ON CONFLICT (commune_id, name) DO NOTHING;

-- MATETE - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Anuarite', 38000, NULL, 'Coin Anuarite'),
  ('Bakusu', 33000, NULL, 'Quartier Bakusu'),
  ('Débonhomme', 30000, NULL, 'Avenue Débonhomme'),
  ('Herady', 35000, NULL, 'Quartier Herady'),
  ('Maziba', 32000, NULL, 'Coin Maziba'),
  ('Totaka', 36000, NULL, 'Quartier Totaka'),
  ('Vélodrome', 37000, NULL, 'Près du Vélodrome')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Matete'
ON CONFLICT (commune_id, name) DO NOTHING;

-- MONT-NGAFULA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Kindele', 40000, NULL, 'Quartier Kindele, coin UNIKIN'),
  ('Kimwenza', 28000, NULL, 'Vers Kimwenza, route de Matadi'),
  ('Lutendele', 22000, NULL, 'Quartier Lutendele, fleuve'),
  ('Mama Yemo', 35000, NULL, 'Coin Mama Yemo'),
  ('Mbenseke', 52000, NULL, 'Quartier Mbenseke'),
  ('Mitendi', 38000, NULL, 'Route de Mitendi'),
  ('Mont-Ngafula I', 42000, NULL, 'Mont-Ngafula secteur 1'),
  ('Mont-Ngafula II', 36000, NULL, 'Mont-Ngafula secteur 2'),
  ('Ngansele', 30000, NULL, 'Quartier Ngansele'),
  ('UPN', 25000, NULL, 'Près de l''Université Pédagogique')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Mont-Ngafula'
ON CONFLICT (commune_id, name) DO NOTHING;

-- NDJILI - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Aéroport', 28000, NULL, 'Près de l''aéroport de Ndjili'),
  ('Cecomaf', 38000, NULL, 'Quartier Cecomaf'),
  ('Kanda-Kanda', 43000, NULL, 'Avenue Kanda-Kanda'),
  ('Mangana', 33000, NULL, 'Quartier Mangana'),
  ('Mpasa I', 48000, NULL, 'Mpasa secteur 1'),
  ('Mpasa II', 40000, NULL, 'Mpasa secteur 2'),
  ('Ndjili-Centre', 36000, NULL, 'Centre de Ndjili'),
  ('Tshibangu', 38000, NULL, 'Quartier Tshibangu')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Ndjili'
ON CONFLICT (commune_id, name) DO NOTHING;

-- NGABA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Bulambemba', 38000, NULL, 'Quartier Bulambemba'),
  ('Lubudi', 33000, NULL, 'Coin Lubudi'),
  ('Lukemi', 30000, NULL, 'Quartier Lukemi'),
  ('Lwange', 35000, NULL, 'Avenue Lwange'),
  ('Matadi-Kibala', 40000, NULL, 'Coin Matadi-Kibala'),
  ('Salongo', 32000, NULL, 'Quartier Salongo'),
  ('Sans Fil', 28000, NULL, 'Quartier Sans Fil')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Ngaba'
ON CONFLICT (commune_id, name) DO NOTHING;

-- NGALIEMA - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Binza-Delvaux', 28000, NULL, 'Quartier Delvaux, route de Matadi'),
  ('Binza-Météo', 25000, NULL, 'Près de la station météo'),
  ('Binza-Ozone', 33000, NULL, 'Quartier Ozone'),
  ('Binza-Pigeon', 22000, NULL, 'Coin Pigeon'),
  ('Binza-UPN', 30000, NULL, 'Vers UPN'),
  ('Camp Tshatshi', 16000, NULL, 'Camp militaire Tshatshi'),
  ('Djelo-Binza', 38000, NULL, 'Quartier Djelo-Binza'),
  ('Joli-Parc', 20000, NULL, 'Quartier résidentiel Joli-Parc'),
  ('Kinsuka-Pêcheurs', 35000, NULL, 'Vers Kinsuka, coin fleuve'),
  ('Ma Campagne', 40000, NULL, 'Quartier Ma Campagne'),
  ('Mama Mobutu', 28000, NULL, 'Cité Mama Mobutu')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Ngaliema'
ON CONFLICT (commune_id, name) DO NOTHING;

-- NGIRI-NGIRI - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Assossa', 38000, NULL, 'Avenue Assossa'),
  ('Bilolo', 30000, NULL, 'Quartier Bilolo'),
  ('Kasavubu', 35000, NULL, 'Avenue Kasavubu'),
  ('Lisala', 32000, NULL, 'Quartier Lisala'),
  ('Mongo', 28000, NULL, 'Coin Mongo'),
  ('Révolution', 30000, NULL, 'Avenue de la Révolution'),
  ('Sans Fil', 25000, NULL, 'Quartier Sans Fil')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Ngiri-Ngiri'
ON CONFLICT (commune_id, name) DO NOTHING;

-- NSELE - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Bibwa', 22000, NULL, 'Quartier Bibwa'),
  ('Kinkole', 28000, NULL, 'Vers Kinkole, fleuve'),
  ('Mikonga', 32000, NULL, 'Quartier Mikonga'),
  ('Mpasa', 25000, NULL, 'Coin Mpasa'),
  ('Nsele-Centre', 30000, NULL, 'Centre de Nsele'),
  ('Tshangu', 20000, NULL, 'Quartier Tshangu')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Nsele'
ON CONFLICT (commune_id, name) DO NOTHING;

-- SELEMBAO - add missing quartiers
INSERT INTO quartiers (id, commune_id, name, population, chef_quartier, reference_adresse, created_at, updated_at)
SELECT gen_random_uuid(), c.id, q.name, q.pop, q.chef, q.addr, NOW(), NOW()
FROM communes c,
(VALUES
  ('Amba', 40000, NULL, 'Quartier Amba'),
  ('Congo', 33000, NULL, 'Coin Congo'),
  ('Kalunga', 38000, NULL, 'Avenue Kalunga'),
  ('Kimbondo', 28000, NULL, 'Quartier Kimbondo, vers l''hôpital'),
  ('Lubudi', 35000, NULL, 'Quartier Lubudi'),
  ('Madiata', 30000, NULL, 'Coin Madiata'),
  ('Moluka', 32000, NULL, 'Quartier Moluka'),
  ('Ngafani', 37000, NULL, 'Avenue Ngafani'),
  ('Sinki', 28000, NULL, 'Quartier Sinki')
) AS q(name, pop, chef, addr)
WHERE c.name = 'Selembao'
ON CONFLICT (commune_id, name) DO NOTHING;
