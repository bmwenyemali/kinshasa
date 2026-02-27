-- =============================================================
-- SEED: Districts of Kinshasa + assign communes to districts
-- =============================================================

-- Create the 4 districts
INSERT INTO districts (id, name, description, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Lukunga', 'District de Lukunga — partie ouest de Kinshasa, comprend les communes historiques et résidentielles.', NOW(), NOW()),
  (gen_random_uuid(), 'Funa', 'District de la Funa — partie centre-sud, communes populaires et commerciales.', NOW(), NOW()),
  (gen_random_uuid(), 'Mont-Amba', 'District de Mont-Amba — partie sud, communes universitaires et collinaires.', NOW(), NOW()),
  (gen_random_uuid(), 'Tshangu', 'District de Tshangu — partie est, communes les plus peuplées et périurbaines.', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Assign communes to District Lukunga
UPDATE communes SET district_id = (SELECT id FROM districts WHERE name = 'Lukunga')
WHERE name IN ('Barumbu', 'Gombe', 'Kinshasa', 'Kintambo', 'Lingwala', 'Ngaliema');

-- Assign communes to District Funa
UPDATE communes SET district_id = (SELECT id FROM districts WHERE name = 'Funa')
WHERE name IN ('Bandalungwa', 'Bumbu', 'Kalamu', 'Kasa-Vubu', 'Makala', 'Ngiri-Ngiri', 'Selembao');

-- Assign communes to District Mont-Amba
UPDATE communes SET district_id = (SELECT id FROM districts WHERE name = 'Mont-Amba')
WHERE name IN ('Kisenso', 'Lemba', 'Limete', 'Matete', 'Mont-Ngafula', 'Ngaba');

-- Assign communes to District Tshangu
UPDATE communes SET district_id = (SELECT id FROM districts WHERE name = 'Tshangu')
WHERE name IN ('Kimbanseke', 'Maluku', 'Masina', 'Ndjili', 'Nsele');
