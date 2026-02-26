-- Add services for each police station
INSERT INTO services_proposes (id, lieu_id, nom_service, description, categorie, prix_officiel, devise, created_at, updated_at)
SELECT
  gen_random_uuid(),
  l.id,
  s.nom,
  s.description,
  'SECURITE'::"ServiceCategorie",
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
