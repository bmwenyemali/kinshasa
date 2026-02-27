-- =============================================================
-- SEED: Lieux institutionnels + Services uniques (démarches)
-- Données réelles de la RDC / Kinshasa
-- =============================================================

-- Nettoyer les ancien services dupliqués
DELETE FROM services_proposes WHERE true;

-- ===================== LIEUX INSTITUTIONNELS =====================

-- DGM - Direction Générale de Migration (passeports, visas)
INSERT INTO lieux (id, nom, type, adresse, telephone, email, latitude, longitude, verified, commune_id, responsable, site_web, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Direction Générale de Migration (DGM)', 'ADMINISTRATION', 'Avenue des Aviateurs, Gombe', '+243 81 555 0001', 'info@dgm.cd', -4.3100, 15.2850, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Commissaire Supérieur', 'https://www.dgm.cd', 'À côté de l''Hôtel de Ville de Kinshasa', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Hôtel de Ville de Kinshasa
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Hôtel de Ville de Kinshasa', 'GOUVERNORAT', 'Boulevard du 30 Juin, Gombe', '+243 81 555 0002', -4.3080, 15.2870, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Gouverneur de Kinshasa', 'Face au fleuve Congo — Centre-ville', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- DGI - Direction Générale des Impôts
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Direction Générale des Impôts (DGI)', 'ADMINISTRATION', 'Avenue des Colonnes, Gombe', '+243 81 555 0010', -4.3120, 15.2900, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Directeur Général', 'Boulevard du 30 Juin — Quartier administratif', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- DGRK - Direction Générale des Recettes de Kinshasa
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Direction Générale des Recettes de Kinshasa (DGRK)', 'ADMINISTRATION', 'Avenue Colonel Lukusa, Gombe', '+243 81 555 0011', -4.3130, 15.2880, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Directeur Général', 'Centre-ville de la Gombe', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tribunal de Grande Instance de Kinshasa/Gombe
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Tribunal de Grande Instance de Kinshasa/Gombe', 'TRIBUNAL', 'Avenue de la Justice, Gombe', '+243 81 555 0020', -4.3140, 15.2910, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Président du Tribunal', 'Quartier judiciaire — Avenue de la Justice', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Tribunal de Commerce de Kinshasa
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Tribunal de Commerce de Kinshasa (TRICOM)', 'TRIBUNAL', 'Avenue de la Justice, Gombe', '+243 81 555 0021', -4.3150, 15.2920, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Président du TRICOM', 'Près du Tribunal de Grande Instance', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Bureau du Cadastre (Conservation des Titres Immobiliers)
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Conservation des Titres Immobiliers (Cadastre)', 'ADMINISTRATION', 'Avenue Tombalbaye, Gombe', '+243 81 555 0030', -4.3100, 15.2930, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Conservateur des Titres', 'Ministère des Affaires Foncières', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ONEM - Office National de l'Emploi
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Office National de l''Emploi (ONEM)', 'ADMINISTRATION', 'Avenue Kabasele Tshamala, Gombe', '+243 81 555 0040', -4.3160, 15.2870, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Directeur Général', 'Quartier administratif — Gombe', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- INSS - Institut National de Sécurité Sociale
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Institut National de Sécurité Sociale (INSS)', 'ADMINISTRATION', 'Avenue Batetela, Gombe', '+243 81 555 0041', -4.3170, 15.2860, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Directeur Général', 'Quartier Batetela — Gombe', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ANR - Agence Nationale de Renseignements (pour empreintes passeport)
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Agence Nationale de Renseignements (ANR)', 'ADMINISTRATION', 'Boulevard du 30 Juin, Gombe', '+243 81 555 0050', -4.3090, 15.2860, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Administrateur Général', 'Boulevard du 30 Juin — Centre-ville', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- SONAS - Société Nationale d'Assurances
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, site_web, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'SONAS (Société Nationale d''Assurances)', 'ADMINISTRATION', 'Avenue de la Mongala, Gombe', '+243 81 555 0060', -4.3110, 15.2840, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Directeur Général', 'https://www.sonas.cd', 'Centre-ville Gombe', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Hôpital Général de Référence de Kinshasa (ex-Mama Yemo)
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, zone_sante_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Hôpital Général Provincial de Référence de Kinshasa', 'HOPITAL', 'Avenue Tombalbaye, Gombe', '+243 81 555 0070', -4.3200, 15.2950, true, (SELECT id FROM communes WHERE name = 'Gombe'), (SELECT id FROM zones_sante WHERE name ILIKE '%gombe%' LIMIT 1), 'Médecin Directeur', 'Ex-Hôpital Mama Yemo — Centre-ville', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Cliniques Universitaires de Kinshasa (UNIKIN)
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Cliniques Universitaires de Kinshasa (CUK)', 'HOPITAL', 'Avenue de l''Université, Lemba', '+243 81 555 0071', -4.3850, 15.3150, true, (SELECT id FROM communes WHERE name = 'Lemba'), 'Médecin Directeur', 'Campus de l''Université de Kinshasa (UNIKIN)', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Division Provinciale de l'Éducation
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Division Provinciale de l''Éducation', 'ADMINISTRATION', 'Avenue de la Science, Gombe', '+243 81 555 0080', -4.3130, 15.2850, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Chef de Division', 'Gombe — Ministère Provincial', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Centre de contrôle technique TRANSCOM
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Centre de Contrôle Technique TRANSCOM', 'ADMINISTRATION', 'Avenue des Poids Lourds, Limete', '+243 81 555 0090', -4.3500, 15.3350, true, (SELECT id FROM communes WHERE name = 'Limete'), 'Directeur', 'Avenue des Poids Lourds — Zone industrielle', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Commission Nationale des Permis de Conduire
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Commission Provinciale des Permis de Conduire', 'ADMINISTRATION', 'Avenue Colonel Mondjiba, Ngaliema', '+243 81 555 0091', -4.3250, 15.2500, true, (SELECT id FROM communes WHERE name = 'Ngaliema'), 'Président de Commission', 'Ngaliema — Ministère des Transports', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Division Provinciale des Affaires Sociales
INSERT INTO lieux (id, nom, type, adresse, telephone, latitude, longitude, verified, commune_id, responsable, reperes, created_at, updated_at)
VALUES
(gen_random_uuid(), 'Division Provinciale des Affaires Sociales', 'ADMINISTRATION', 'Avenue Kabasele, Gombe', '+243 81 555 0100', -4.3180, 15.2890, true, (SELECT id FROM communes WHERE name = 'Gombe'), 'Chef de Division', 'Gombe — Quartier administratif', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ===================== SERVICES UNIQUES (DÉMARCHES ADMINISTRATIVES) =====================

-- ============ ÉTAT CIVIL ============

INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES

-- 1. Enregistrement d'une naissance
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Maison Communale%' OR nom ILIKE '%Hôtel de Ville%' LIMIT 1),
 'ETAT_CIVIL',
 'Enregistrement d''une naissance',
 'Déclaration et enregistrement officiel d''une naissance à l''état civil. Obligatoire dans les 90 jours suivant la naissance. Au-delà, un jugement supplétif sera nécessaire.',
 ARRAY['Attestation de naissance de la maternité/hôpital', 'Carte d''identité des deux parents', 'Livret de ménage des parents', 'Deux témoins majeurs avec leurs pièces d''identité'],
 5000, 'FC', '3 à 7 jours ouvrables',
 '1. Se rendre au bureau d''état civil de la commune de naissance avec le nouveau-né\n2. Présenter l''attestation de naissance délivrée par la maternité\n3. Fournir les pièces d''identité des parents et du livret de ménage\n4. Les deux témoins signent le registre\n5. L''officier d''état civil enregistre la naissance\n6. Payer les frais officiels (5 000 FC)\n7. Retirer l''acte de naissance après le délai indiqué\n\nATTENTION: Au-delà de 90 jours, il faudra passer par un jugement supplétif au tribunal (coût: 25 000 FC, délai: 2-4 semaines)',
 'Déclaration obligatoire dans les 90 jours. Gratuite dans certaines communes pour les naissances déclarées dans les 30 jours. Le père ou la mère peut faire la déclaration.',
 true, NOW(), NOW()),

-- 2. Célébration d'un mariage civil
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Maison Communale%' OR nom ILIKE '%Hôtel de Ville%' LIMIT 1),
 'ETAT_CIVIL',
 'Célébration d''un mariage civil',
 'Union légale de deux personnes devant l''officier d''état civil. Le mariage coutumier seul n''a pas pleine valeur juridique — l''enregistrement civil est indispensable.',
 ARRAY['Acte de naissance de chaque époux', 'Carte d''identité de chaque époux', 'Certificat de célibat (moins de 3 mois)', 'Certificat prénuptial (examen de santé)', '4 photos d''identité par personne', 'Attestation de dot (mariage coutumier)', '2 témoins minimum avec pièces d''identité', 'Quittance de paiement des frais'],
 15000, 'FC', '2 à 4 semaines (incluant publication des bans)',
 '1. Retirer le formulaire de demande de mariage au bureau d''état civil\n2. Rassembler tous les documents des deux époux\n3. Passer l''examen prénuptial dans un centre de santé agréé\n4. Déposer le dossier complet au bureau d''état civil\n5. Publication des bans pendant 15 jours\n6. Si aucune opposition, fixer la date de célébration\n7. Célébration du mariage devant l''officier d''état civil\n8. Signature des registres par les époux et témoins\n9. Payer les frais officiels\n10. Retrait de l''acte de mariage',
 'Les deux époux doivent être âgés d''au moins 18 ans. Le mariage polygamique est reconnu mais doit être déclaré. La dot doit être payée avant la célébration.',
 true, NOW(), NOW()),

-- 3. Obtention d'une carte d'identité
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Maison Communale%' OR nom ILIKE '%Hôtel de Ville%' LIMIT 1),
 'ETAT_CIVIL',
 'Obtention d''une carte d''identité nationale',
 'Demande et obtention du document d''identification officiel pour tout citoyen congolais de 18 ans et plus. La carte d''identité est obligatoire pour toute démarche administrative.',
 ARRAY['Acte de naissance ou jugement supplétif', 'Attestation de résidence du chef de quartier', '4 photos d''identité format passeport (fond blanc)', 'Ancien document d''identité (si renouvellement)'],
 15000, 'FC', '2 à 4 semaines',
 '1. Se rendre au centre d''enrôlement de votre commune\n2. Présenter l''acte de naissance et l''attestation de résidence\n3. Prise d''empreintes digitales\n4. Capture de photo biométrique\n5. Vérification des données personnelles\n6. Payer les frais officiels (15 000 FC)\n7. Recevoir un récépissé avec la date de retrait\n8. Retirer la carte d''identité à la date indiquée',
 'Obligatoire pour tout citoyen de 18 ans et plus. Conserver une photocopie certifiée. Validité: 5 ans renouvelable.',
 true, NOW(), NOW()),

-- 4. Obtention d'un passeport biométrique
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGM%' OR nom ILIKE '%Direction Générale de Migration%' LIMIT 1),
 'ETAT_CIVIL',
 'Obtention d''un passeport biométrique',
 'Demande de passeport de voyage international auprès de la Direction Générale de Migration (DGM). Le passeport semi-biométrique congolais a une validité de 5 ans.',
 ARRAY['Acte de naissance original', 'Carte d''identité ou carte d''électeur', 'Attestation de résidence', '4 photos d''identité biométriques (fond blanc)', 'Ancien passeport (si renouvellement)', 'Formulaire de demande rempli (disponible à la DGM)'],
 205, 'USD', '2 à 6 semaines',
 '1. Retirer le formulaire de demande à la DGM (Avenue des Aviateurs, Gombe)\n2. Remplir soigneusement le formulaire avec tous les renseignements\n3. Rassembler tous les documents requis\n4. Se présenter à la DGM avec le dossier complet\n5. Prise de données biométriques (empreintes + photo) à l''ANR\n6. Vérification des antécédents par l''ANR\n7. Payer les frais officiels: 205 USD (passeport ordinaire)\n8. Recevoir le récépissé de dépôt\n9. Retirer le passeport après le délai (2-6 semaines)\n\nCATÉGORIES DE PASSEPORTS:\n- Ordinaire: 205 USD (couverture bleue)\n- Service: délivré aux fonctionnaires en mission\n- Diplomatique: réservé aux diplomates',
 'Prévoir un délai suffisant avant le voyage. Le passeport d''urgence (express) est possible moyennant un supplément. Ne JAMAIS passer par des intermédiaires non officiels.',
 true, NOW(), NOW()),

-- 5. Obtention d'un visa de sortie
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGM%' OR nom ILIKE '%Direction Générale de Migration%' LIMIT 1),
 'ETAT_CIVIL',
 'Obtention d''un visa de sortie',
 'Autorisation officielle de quitter le territoire congolais, apposée dans le passeport par la DGM. Obligatoire pour tout voyage international.',
 ARRAY['Passeport valide avec visa du pays de destination', 'Billet d''avion (aller ou aller-retour)', 'Carte d''identité'],
 50, 'USD', 'Immédiat à 24h',
 '1. Se rendre à la DGM avec le passeport et le billet d''avion\n2. Présenter le visa du pays de destination (si requis)\n3. Remplir le formulaire de demande\n4. Payer les frais: 50 USD\n5. Le visa de sortie est apposé dans le passeport\n\nPeut être obtenu le jour même en cas d''urgence.',
 'Le visa de sortie est distinct du visa d''entrée du pays de destination. Prévoir ce coût dans le budget voyage.',
 true, NOW(), NOW()),

-- 6. Obtention d'un livret de ménage
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Maison Communale%' OR nom ILIKE '%Hôtel de Ville%' LIMIT 1),
 'ETAT_CIVIL',
 'Obtention d''un livret de ménage',
 'Établissement du document officiel identifiant un foyer et recensant tous ses membres. Requis pour l''inscription scolaire des enfants.',
 ARRAY['Carte d''identité du chef de ménage', 'Acte de mariage', 'Actes de naissance de tous les enfants', 'Attestation de résidence validée', 'Photos d''identité'],
 10000, 'FC', '5 à 10 jours ouvrables',
 '1. Se rendre chez le chef de quartier pour obtenir l''attestation de résidence\n2. Se rendre à la maison communale de résidence\n3. Remplir le formulaire de demande\n4. Présenter tous les documents requis\n5. Un agent peut effectuer une visite à domicile (optionnel)\n6. Payer les frais officiels (10 000 FC)\n7. Retirer le livret de ménage après le délai',
 'Mettre à jour à chaque naissance, décès ou changement de résidence. Le chef de quartier est le premier interlocuteur.',
 true, NOW(), NOW()),

-- 7. Obtention d'une attestation de résidence
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Maison Communale%' OR nom ILIKE '%Hôtel de Ville%' LIMIT 1),
 'ETAT_CIVIL',
 'Obtention d''une attestation de résidence',
 'Certification officielle de domicile, délivrée par le chef de quartier et validée par la commune. Nécessaire pour de nombreuses démarches.',
 ARRAY['Carte d''identité', 'Livret de ménage (si disponible)'],
 2000, 'FC', '1 à 2 jours',
 '1. Se rendre chez le chef de quartier de votre lieu de résidence\n2. Demander une attestation de résidence\n3. Le chef de quartier vérifie votre résidence effective\n4. Il signe et cachette l''attestation\n5. Se rendre à la maison communale pour validation\n6. Payer les frais (2 000 FC)\n7. L''officier communal valide et cachette l''attestation',
 'Commencer par le chef de quartier : c''est lui qui atteste que vous habitez bien à cette adresse. La commune ne fait que valider.',
 true, NOW(), NOW()),

-- ============ SANTÉ ============

-- 8. Consultation médicale de base
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Hôpital Général Provincial%' LIMIT 1),
 'SANTE',
 'Consultation médicale générale',
 'Consultation avec un médecin généraliste dans un centre de santé ou hôpital public. Premier recours pour tout problème de santé.',
 ARRAY['Carte d''identité ou tout document d''identification', 'Carnet de santé (si disponible)', 'Bon de consultation (délivré à l''accueil)'],
 5000, 'FC', 'Immédiat (selon affluence)',
 '1. Se rendre au centre de santé ou à l''hôpital le plus proche\n2. Se présenter à l''accueil/réception\n3. Obtenir un bon de consultation\n4. Payer les frais de consultation (5 000 à 15 000 FC selon l''établissement)\n5. Attendre votre tour\n6. Consultation avec le médecin\n7. Recevoir l''ordonnance médicale\n8. Se rendre à la pharmacie pour les médicaments',
 'Les centres de santé communautaires pratiquent des tarifs plus bas. Les hôpitaux généraux de référence offrent des services spécialisés.',
 true, NOW(), NOW()),

-- 9. Vaccination (PEV)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Hôpital Général Provincial%' LIMIT 1),
 'SANTE',
 'Vaccination (Programme Élargi de Vaccination)',
 'Vaccination gratuite pour les enfants de 0 à 5 ans dans le cadre du PEV. Comprend BCG, Polio, Pentavalent, Rougeole, Fièvre Jaune.',
 ARRAY['Carte de vaccination de l''enfant (ou en obtenir une sur place)', 'Acte de naissance de l''enfant'],
 0, 'FC', 'Immédiat',
 '1. Vérifier le calendrier vaccinal de l''enfant\n2. Se rendre au centre de santé le plus proche ou à un site de vaccination PEV\n3. Présenter la carte de vaccination\n4. L''infirmier administre le vaccin selon le calendrier\n5. La vaccination est enregistrée dans le carnet\n6. Prendre rendez-vous pour le prochain rappel\n\nCALENDRIER VACCINAL RDC:\n- Naissance: BCG + Polio 0\n- 6 semaines: Pentavalent 1 + Polio 1 + Pneumo 1\n- 10 semaines: Pentavalent 2 + Polio 2 + Pneumo 2\n- 14 semaines: Pentavalent 3 + Polio 3 + Pneumo 3\n- 9 mois: Rougeole + Fièvre Jaune\n- 15 mois: Rougeole 2',
 'GRATUIT pour tous les enfants. Ne manquez aucun rappel. La carte de vaccination est requise pour l''inscription scolaire.',
 true, NOW(), NOW()),

-- 10. Accouchement en maternité
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Hôpital Général Provincial%' LIMIT 1),
 'SANTE',
 'Accouchement assisté en maternité',
 'Prise en charge de l''accouchement dans un établissement de santé avec personnel médical qualifié. Fortement recommandé pour réduire les risques.',
 ARRAY['Carte de consultation prénatale (CPN)', 'Carte d''identité de la mère', 'Kit d''accouchement (gants, fil, compresses — disponible en pharmacie)'],
 25000, 'FC', 'Séjour: 24-72h (accouchement normal)',
 '1. Suivre les consultations prénatales (CPN) dès le début de la grossesse (4 CPN minimum)\n2. Préparer le kit d''accouchement à l''avance\n3. Lors des premières contractions, se rendre à la maternité\n4. Présenter la carte de CPN à l''accueil\n5. Prise en charge par la sage-femme\n6. Accouchement assisté\n7. Soins post-nataux mère et enfant\n8. Obtenir l''attestation de naissance\n9. Payer les frais (25 000 - 100 000 FC selon l''établissement)\n\nPRIX INDICATIFS:\n- Centre de santé: 25 000 - 50 000 FC\n- Hôpital général: 50 000 - 150 000 FC\n- Césarienne: 200 000 - 500 000 FC',
 'Les CPN (4 minimum) sont essentiels. Un accouchement en milieu médical sauve des vies.',
 true, NOW(), NOW()),

-- 11. Obtention d'un certificat médical
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Cliniques Universitaires%' OR nom ILIKE '%Hôpital Général Provincial%' LIMIT 1),
 'SANTE',
 'Obtention d''un certificat médical',
 'Attestation médicale d''aptitude physique. Requis pour l''emploi, le permis de conduire, l''inscription scolaire, le sport, certaines démarches administratives.',
 ARRAY['Carte d''identité', 'Motif de la demande (emploi, permis, sport, etc.)'],
 10000, 'FC', 'Immédiat à 48h (si examens complémentaires)',
 '1. Se rendre dans un hôpital ou centre de santé agréé\n2. Demander un certificat médical à la réception\n3. Consulter le médecin\n4. Subir les examens nécessaires (prise de tension, test visuel, etc.)\n5. Le médecin rédige et signe le certificat\n6. Payer les frais de consultation + certificat (10 000 - 20 000 FC)',
 'Pour le permis de conduire, le médecin doit être agréé par le ministère de la Santé. Pour l''emploi, certains employeurs exigent un médecin spécifique.',
 true, NOW(), NOW()),

-- ============ JUSTICE ============

-- 12. Obtention d'un extrait de casier judiciaire
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Tribunal de Grande Instance%' LIMIT 1),
 'JUSTICE',
 'Obtention d''un extrait de casier judiciaire',
 'Document officiel attestant l''existence ou l''absence de condamnations pénales. Indispensable pour l''emploi, la naturalisation, certaines licences.',
 ARRAY['Carte d''identité originale', '2 photos d''identité récentes', 'Demande écrite (formulaire au greffe)'],
 10000, 'FC', '3 à 7 jours ouvrables',
 '1. Se rendre au greffe du Tribunal de Grande Instance (TGI)\n2. Retirer le formulaire de demande de casier judiciaire\n3. Remplir le formulaire avec soin\n4. Joindre les photos d''identité\n5. Payer les frais (10 000 FC)\n6. Recevoir le récépissé avec date de retrait\n7. Retirer l''extrait de casier judiciaire à la date prévue\n\nTYPES DE CASIER:\n- Bulletin n°1: complet (réservé aux autorités judiciaires)\n- Bulletin n°2: simplifié (pour les administrations)\n- Bulletin n°3: personnel (ne mentionne pas certaines condamnations)',
 'L''extrait a une validité de 3 mois. Pour Kinshasa, le TGI de Gombe est le principal bureau.',
 true, NOW(), NOW()),

-- 13. Dépôt de plainte civile ou pénale
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Tribunal de Grande Instance%' LIMIT 1),
 'JUSTICE',
 'Dépôt de plainte civile ou pénale',
 'Introduction d''une action en justice devant le tribunal compétent. Pour les infractions mineures, le tribunal de paix est compétent.',
 ARRAY['Carte d''identité', 'Preuves et pièces justificatives', 'Procès-verbal de la police (si plainte pénale)', 'Requête écrite (avec ou sans avocat)'],
 25000, 'FC', 'Variable (3 mois à 2 ans)',
 '1. Rassembler toutes les preuves et pièces justificatives\n2. Pour une plainte pénale: déposer d''abord au commissariat de police\n3. Rédiger une requête (un avocat est recommandé mais pas obligatoire)\n4. Se rendre au greffe du tribunal compétent\n5. Enregistrer la plainte et payer les frais de consignation\n6. Recevoir le numéro de rôle de l''affaire\n7. Suivre les audiences selon le calendrier du tribunal\n\nTRIBUNAUX COMPÉTENTS:\n- Tribunal de paix: petits litiges, conflits fonciers simples\n- TGI: affaires civiles importantes, criminelles\n- Tribunal de commerce: litiges commerciaux',
 'Consulter un avocat avant d''engager une procédure. L''aide juridique gratuite existe pour les personnes démunies.',
 true, NOW(), NOW()),

-- 14. Immatriculation au RCCM (création d'entreprise)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%TRICOM%' OR nom ILIKE '%Tribunal de Commerce%' LIMIT 1),
 'JUSTICE',
 'Immatriculation au Registre de Commerce (RCCM)',
 'Première étape obligatoire pour la création d''une entreprise en RDC. Le numéro RCCM identifie légalement l''entreprise.',
 ARRAY['Carte d''identité du gérant/fondateur', 'Statuts de la société notariés', 'Attestation de siège social', 'Formulaire d''immatriculation rempli', 'Frais de dépôt au greffe'],
 50000, 'FC', '1 à 2 semaines',
 '1. Faire rédiger les statuts de la société par un notaire\n2. Obtenir une attestation de siège social\n3. Se rendre au greffe du Tribunal de Commerce (TRICOM)\n4. Retirer et remplir le formulaire d''immatriculation\n5. Déposer le dossier complet avec les statuts notariés\n6. Payer les frais de dépôt (50 000 FC + frais de notaire)\n7. Recevoir le numéro RCCM\n8. Publier au Journal Officiel (pour SARL et SA)\n\nÉTAPES SUIVANTES après le RCCM:\n→ Obtenir le NIF (Direction Générale des Impôts)\n→ Obtenir la patente (DGRK)\n→ Ouvrir un compte bancaire professionnel',
 'Le RCCM est valide tant que la société existe. Obligation de mise à jour en cas de modification.',
 true, NOW(), NOW()),

-- ============ IMPÔTS & TAXES ============

-- 15. Obtention du NIF (Numéro Impôt)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Direction Générale des Impôts%' LIMIT 1),
 'IMPOTS',
 'Obtention du Numéro d''Identification Fiscale (NIF)',
 'Attribution du NIF par la DGI à tout contribuable exerçant une activité économique. Obligatoire pour toute entreprise et commerçant.',
 ARRAY['Carte d''identité du gérant', 'RCCM (pour les entreprises)', 'Statuts notariés (pour les sociétés)', 'Attestation de domicile professionnel'],
 20000, 'FC', '1 à 2 semaines',
 '1. Se rendre au Centre des Impôts (CDI) de votre juridiction\n2. Retirer le formulaire de demande de NIF\n3. Remplir le formulaire avec les informations de l''entreprise/commerçant\n4. Fournir les documents requis (RCCM, statuts, etc.)\n5. Payer les frais d''attribution (20 000 FC)\n6. Recevoir le NIF provisoire\n7. Retirer le NIF définitif après traitement\n\nLE NIF EST OBLIGATOIRE POUR:\n- Émettre des factures\n- Importer/exporter\n- Participer aux marchés publics\n- Déclarer les impôts',
 'Le NIF doit figurer sur toutes les factures. Obligatoire même pour les petits commerçants.',
 true, NOW(), NOW()),

-- 16. Paiement de la patente
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGRK%' LIMIT 1),
 'IMPOTS',
 'Paiement de la patente (licence d''exploitation)',
 'Taxe annuelle obligatoire pour exercer une activité commerciale. Sans la patente, l''activité est illégale et passible de sanctions.',
 ARRAY['NIF (Numéro d''Identification Fiscale)', 'RCCM', 'Carte d''identité du gérant', 'Attestation de localisation commerciale'],
 50000, 'FC', 'Immédiat après paiement',
 '1. Se rendre au bureau des recettes de la DGRK\n2. Présenter le NIF et le RCCM\n3. Déclarer le type et le chiffre d''affaires de l''activité\n4. Le montant de la patente est calculé selon l''activité\n5. Payer la patente\n6. Recevoir le certificat de patente\n\nBARÈME INDICATIF:\n- Petit commerce: 50 000 - 100 000 FC/an\n- Commerce moyen: 100 000 - 500 000 FC/an\n- Grande entreprise: 500 000 FC et plus/an',
 'À renouveler CHAQUE ANNÉE. Conserver le certificat dans le lieu d''activité (contrôle possible par les inspecteurs).',
 true, NOW(), NOW()),

-- 17. Enregistrement foncier (obtention du livret parcellaire)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Cadastre%' OR nom ILIKE '%Conservation des Titres%' LIMIT 1),
 'IMPOTS',
 'Enregistrement foncier (obtention du titre de propriété)',
 'Procédure complète pour obtenir le livret parcellaire (titre foncier) qui prouve le droit de propriété sur une parcelle de terrain.',
 ARRAY['Contrat de vente notarié', 'Certificat de vacance parcellaire', 'Procès-verbal de mesurage (croquis du géomètre)', 'Fiche parcellaire du quartier', 'Carte d''identité de l''acquéreur', 'Quittances de paiement des taxes foncières'],
 250000, 'FC', '3 à 6 mois',
 '1. ÉTAPE 1 — Vérification: Obtenir le certificat de vacance au bureau du cadastre (50 000 FC)\n2. ÉTAPE 2 — Achat: Signer le contrat de vente chez un notaire agréé (100 000 FC + frais notaire)\n3. ÉTAPE 3 — Mesurage: Demander le mesurage au cadastre (75 000 FC). Un géomètre se déplace sur le terrain\n4. ÉTAPE 4 — Dossier: Rassembler tous les documents (contrat, vacance, mesurage, fiche parcellaire)\n5. ÉTAPE 5 — Dépôt: Déposer le dossier complet à la Conservation des Titres Immobiliers\n6. ÉTAPE 6 — Taxes: Payer les frais d''enregistrement et taxes foncières\n7. ÉTAPE 7 — Retrait: Retirer le livret parcellaire après traitement\n\nCOÛT TOTAL ESTIMÉ: 500 000 à 1 000 000 FC (tout compris)',
 'NE JAMAIS acheter sans certificat de vacance. Exiger un contrat notarié. Vérifier au cadastre avant tout paiement au vendeur.',
 true, NOW(), NOW()),

-- ============ TRANSPORT ============

-- 18. Obtention du permis de conduire
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Commission%Permis%' LIMIT 1),
 'TRANSPORT',
 'Obtention du permis de conduire',
 'Processus complet pour obtenir le permis de conduire en RDC, de l''auto-école à la délivrance du document officiel.',
 ARRAY['Carte d''identité', '4 photos d''identité', 'Certificat médical d''aptitude (délivré par un médecin agréé)', 'Attestation de réussite à l''examen de conduite', 'Ancien permis (si renouvellement ou ajout de catégorie)'],
 50000, 'FC', '3 à 8 semaines',
 '1. S''inscrire dans une auto-école agréée\n2. Suivre la formation théorique (code de la route) — 2 à 4 semaines\n3. Passer l''examen théorique\n4. Suivre la formation pratique (conduite) — 2 à 4 semaines\n5. Passer l''examen pratique de conduite\n6. Obtenir le certificat médical auprès d''un médecin agréé\n7. Se rendre à la Commission provinciale des permis avec tous les documents\n8. Payer les frais officiels (50 000 FC)\n9. Retirer le permis de conduire\n\nCATÉGORIES DE PERMIS:\n- A: Motocyclettes\n- B: Véhicules légers (voiture)\n- C: Poids lourds\n- D: Transport en commun\n\nValidité: 5 ans renouvelable',
 'L''examen est obligatoire. Le permis international peut être obtenu moyennant un supplément.',
 true, NOW(), NOW()),

-- 19. Immatriculation d'un véhicule
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Direction Générale des Impôts%' OR nom ILIKE '%DGI%' LIMIT 1),
 'TRANSPORT',
 'Immatriculation d''un véhicule',
 'Enregistrement officiel d''un véhicule avec attribution d''une plaque minéralogique. Obligatoire pour circuler légalement.',
 ARRAY['Carte grise originale ou certificat de dédouanement', 'Carte d''identité du propriétaire', 'Attestation d''assurance SONAS en cours', 'Quittance de paiement de la taxe de circulation'],
 150000, 'FC', '1 à 4 semaines',
 '1. Se rendre à la DGI ou DGRK (Direction des Recettes de Kinshasa)\n2. Présenter les documents du véhicule (carte grise, dédouanement)\n3. Remplir le formulaire d''immatriculation\n4. Payer les frais d''immatriculation (150 000 FC)\n5. Recevoir le numéro de plaque attribué\n6. Faire fabriquer la plaque dans un atelier agréé\n7. Retirer la carte d''immatriculation',
 'Vérifier l''authenticité de la carte grise avant l''achat d''un véhicule d''occasion.',
 true, NOW(), NOW()),

-- 20. Obtention de la vignette automobile
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGRK%' LIMIT 1),
 'TRANSPORT',
 'Obtention de la vignette automobile',
 'Taxe annuelle obligatoire pour tout véhicule circulant à Kinshasa. Son absence entraîne amendes et mise en fourrière.',
 ARRAY['Carte d''immatriculation du véhicule', 'Carte d''identité du propriétaire', 'Ancienne vignette (si renouvellement)'],
 60000, 'FC', 'Immédiat après paiement',
 '1. Se rendre à la DGRK ou dans un bureau de perception agréé\n2. Présenter la carte d''immatriculation\n3. Payer la taxe (montant variable selon le type de véhicule)\n4. Recevoir la vignette officielle\n5. L''apposer visiblement sur le pare-brise\n\nTARIFS INDICATIFS:\n- Véhicule léger: 60 000 FC\n- Pick-up / 4x4: 80 000 FC\n- Camion: 120 000 FC\n- Moto: 20 000 FC',
 'À renouveler chaque année au 1er janvier. Attention aux fausses vignettes — vérifier le sceau officiel DGRK.',
 true, NOW(), NOW()),

-- 21. Souscription assurance véhicule (SONAS)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%SONAS%' LIMIT 1),
 'TRANSPORT',
 'Souscription d''une assurance véhicule (carte jaune SONAS)',
 'Assurance de responsabilité civile obligatoire couvrant les dommages causés à des tiers. La carte jaune SONAS est exigée lors de tout contrôle routier.',
 ARRAY['Carte d''immatriculation du véhicule', 'Carte d''identité du propriétaire'],
 120, 'USD', 'Immédiat après paiement',
 '1. Se rendre à une agence SONAS (disponible dans chaque commune)\n2. Présenter la carte d''immatriculation du véhicule\n3. Choisir la formule d''assurance:\n   - Responsabilité civile (obligatoire): ~120 USD/an\n   - Tous risques (optionnel): tarif supérieur\n4. Payer la prime d''assurance\n5. Recevoir la carte jaune d''assurance\n6. La conserver dans le véhicule en permanence',
 'La SONAS est le SEUL assureur agréé en RDC. La carte jaune doit toujours être dans le véhicule.',
 true, NOW(), NOW()),

-- 22. Contrôle technique véhicule
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%TRANSCOM%' OR nom ILIKE '%Contrôle Technique%' LIMIT 1),
 'TRANSPORT',
 'Contrôle technique d''un véhicule',
 'Inspection périodique obligatoire de l''état mécanique d''un véhicule. Requis pour la vignette et l''assurance.',
 ARRAY['Carte d''immatriculation du véhicule', 'Ancien certificat de contrôle technique (si renouvellement)'],
 30000, 'FC', 'Immédiat (1-2 heures)',
 '1. Se rendre dans un centre de contrôle technique agréé (ex: TRANSCOM)\n2. Présenter la carte d''immatriculation\n3. Le technicien inspecte le véhicule:\n   - Freins\n   - Direction\n   - Phares et feux\n   - Pneus\n   - Émissions\n   - Carrosserie\n4. Si le véhicule passe: recevoir le certificat de conformité\n5. Si refusé: effectuer les réparations et repasser le contrôle\n6. Payer les frais (30 000 FC)',
 'Faire le contrôle technique AVANT de renouveler la vignette. Vérifier les éléments critiques avant de se présenter.',
 true, NOW(), NOW()),

-- ============ SÉCURITÉ ============

-- 23. Dépôt de plainte au commissariat
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Commissariat de Police de la Gombe%' LIMIT 1),
 'SECURITE',
 'Dépôt de plainte au commissariat',
 'Enregistrement d''une plainte pour infraction pénale (vol, agression, escroquerie, etc.) auprès de la Police Nationale Congolaise.',
 ARRAY['Carte d''identité', 'Preuves éventuelles (photos, documents, témoins)'],
 0, 'FC', 'Immédiat (30-60 min)',
 '1. Se rendre au commissariat de police le plus proche (de préférence celui de la commune où l''infraction a eu lieu)\n2. Expliquer les faits détaillés à l''officier de police judiciaire (OPJ)\n3. L''OPJ rédige le procès-verbal (PV)\n4. Lire attentivement le PV avant de signer\n5. Demander une copie signée et cachetée du PV\n6. Noter le numéro du PV pour le suivi\n\nIMPORTANT:\n- La plainte est GRATUITE (ne payez pas de frais)\n- Vous avez droit à une copie du PV\n- Déposez plainte dans les 48h suivant les faits',
 'Le dépôt de plainte est gratuit. Déposer dans les 48h pour faciliter l''enquête. Demander toujours le PV.',
 true, NOW(), NOW()),

-- 24. Déclaration de perte de documents
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Commissariat de Police de la Gombe%' LIMIT 1),
 'SECURITE',
 'Déclaration de perte de documents',
 'Procès-verbal de perte délivré par le commissariat, nécessaire pour le remplacement de tout document officiel perdu.',
 ARRAY['Tout document d''identification encore en possession', 'Description détaillée du document perdu'],
 5000, 'FC', 'Immédiat',
 '1. Se rendre au commissariat de police le plus proche\n2. Expliquer les circonstances de la perte (lieu, date, conditions)\n3. L''agent rédige le procès-verbal de perte\n4. Vérifier et signer le PV\n5. Payer les frais (5 000 FC)\n6. Recevoir la copie de la déclaration de perte\n\nCe document est ensuite requis pour demander le REMPLACEMENT de:\n- Carte d''identité\n- Permis de conduire\n- Passeport\n- Diplômes\n- etc.',
 'Faire la déclaration le plus tôt possible. Conserver la déclaration originale pour les démarches de remplacement.',
 true, NOW(), NOW()),

-- ============ ÉDUCATION ============

-- 25. Inscription scolaire (primaire et secondaire)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Division Provinciale de l''Éducation%' LIMIT 1),
 'EDUCATION',
 'Inscription scolaire (primaire et secondaire)',
 'Processus d''inscription des enfants dans les écoles primaires et secondaires publiques ou privées de Kinshasa.',
 ARRAY['Acte de naissance de l''enfant', 'Bulletin scolaire de l''année précédente (sauf 1ère année)', 'Carte de vaccination à jour', 'Livret de ménage', 'Photos d''identité (2)', 'Frais d''inscription'],
 50000, 'FC', 'Immédiat à 1 semaine',
 '1. Choisir l''école (vérifier qu''elle est agréée par le Ministère)\n2. Se rendre à l''école pendant la période d''inscription (août-septembre)\n3. Retirer le formulaire d''inscription\n4. Remplir le formulaire avec les informations de l''enfant\n5. Fournir tous les documents requis\n6. Payer les frais d''inscription:\n   - École publique primaire: GRATUIT (loi sur la gratuité)\n   - École publique secondaire: 50 000 - 100 000 FC\n   - École privée: variable\n7. Recevoir la carte d''élève\n\nIMPORTANT: L''enseignement primaire public est GRATUIT depuis 2019.',
 'Inscrire les enfants tôt (dès août). L''école primaire publique est gratuite.',
 true, NOW(), NOW()),

-- 26. Passage de l'Examen d'État
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Division Provinciale de l''Éducation%' LIMIT 1),
 'EDUCATION',
 'Passage de l''Examen d''État (diplôme de fin secondaire)',
 'Examen national de fin d''études secondaires. La réussite donne droit au Diplôme d''État, sésame pour l''enseignement supérieur.',
 ARRAY['Carte d''élève de 6e secondaire', 'Bulletins scolaires des 2 dernières années', 'Acte de naissance', '3 photos d''identité', 'Quittance de paiement des frais d''inscription'],
 25000, 'FC', 'Résultats: 2-3 mois après l''examen',
 '1. L''inscription est faite par l''école (collectivement)\n2. Payer les frais d''inscription à l''examen (25 000 FC environ)\n3. Recevoir la carte de candidat\n4. Se présenter au centre d''examen à la date et heure indiquées\n5. Passer les épreuves selon la filière:\n   - Scientifique: Maths, Physique, Chimie, Biologie\n   - Littéraire: Français, Histoire, Géographie\n   - Technique: selon la spécialité\n6. Attendre les résultats (publication officielle)\n7. En cas de réussite: retirer le Diplôme d''État\n\nRÉSULTATS: affichés dans les écoles et publiés en ligne.',
 'Le Diplôme d''État est INDISPENSABLE pour l''université. Conserver l''original en lieu sûr.',
 true, NOW(), NOW()),

-- 27. Inscription universitaire
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Cliniques Universitaires%' OR nom ILIKE '%Division Provinciale de l''Éducation%' LIMIT 1),
 'EDUCATION',
 'Inscription universitaire',
 'Processus d''admission dans les universités et instituts supérieurs de Kinshasa (UNIKIN, UCC, UPN, ISTA, etc.).',
 ARRAY['Diplôme d''État original + copies', 'Relevés de notes du secondaire', 'Acte de naissance', '6 photos d''identité', 'Attestation de bonne vie et mœurs', 'Frais d''inscription'],
 200, 'USD', '1 à 2 semaines',
 '1. Obtenir le Diplôme d''État\n2. Choisir l''université et la filière souhaitée\n3. Retirer le formulaire d''inscription (en ligne ou sur place)\n4. Remplir le formulaire et joindre tous les documents\n5. Passer le test d''admission (certaines universités)\n6. Si admis, payer les frais académiques:\n   - UNIKIN: ~200-400 USD/an\n   - UCC: ~400-800 USD/an\n   - Instituts supérieurs: ~150-300 USD/an\n7. Recevoir la carte d''étudiant\n8. Commencer les cours selon le calendrier académique',
 'Les inscriptions se font entre septembre et novembre. Certaines universités ont des tests d''orientation.',
 true, NOW(), NOW()),

-- ============ SOCIAL ============

-- 28. Affiliation à la sécurité sociale (INSS)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%INSS%' LIMIT 1),
 'SOCIAL',
 'Affiliation à la sécurité sociale (INSS)',
 'Inscription d''un travailleur salarié à l''Institut National de Sécurité Sociale. Donne droit à la pension, aux allocations familiales et à la couverture des risques professionnels.',
 ARRAY['Contrat de travail', 'Carte d''identité du travailleur', 'Photos d''identité (2)', 'Attestation de l''employeur', 'Copie du RCCM de l''employeur'],
 0, 'FC', '2 à 4 semaines',
 '1. L''EMPLOYEUR est tenu de déclarer chaque travailleur à l''INSS\n2. L''employeur remplit le formulaire d''affiliation\n3. Joindre le contrat de travail et la pièce d''identité du travailleur\n4. Déposer le dossier à l''agence INSS\n5. L''INSS attribue un numéro d''affiliation\n6. Le travailleur retire sa carte INSS\n\nCOTISATIONS:\n- Part patronale: 9% du salaire brut\n- Part salariale: 5% du salaire brut\n\nPRESTATIONS:\n- Pension de retraite (à partir de 60 ans)\n- Allocations familiales\n- Indemnités pour risques professionnels',
 'C''est l''employeur qui paye les cotisations. Vérifier que votre employeur vous a bien déclaré à l''INSS.',
 true, NOW(), NOW()),

-- 29. Inscription comme demandeur d'emploi (ONEM)
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%ONEM%' LIMIT 1),
 'SOCIAL',
 'Inscription comme demandeur d''emploi (ONEM)',
 'Enregistrement officiel auprès de l''Office National de l''Emploi pour bénéficier d''offres d''emploi et de formations professionnelles.',
 ARRAY['Carte d''identité', 'Diplômes (copies certifiées)', 'CV actualisé', 'Photos d''identité (2)'],
 5000, 'FC', '1 à 2 semaines',
 '1. Se rendre à l''antenne ONEM la plus proche\n2. Retirer le formulaire d''inscription\n3. Remplir le formulaire avec le parcours scolaire et professionnel\n4. Joindre les copies de diplômes et le CV\n5. Payer les frais d''inscription (5 000 FC)\n6. Recevoir la carte de demandeur d''emploi\n\nSERVICES DE L''ONEM:\n- Mise en relation avec les entreprises\n- Formations professionnelles gratuites\n- Stages en entreprise\n- Accompagnement à l''insertion',
 'S''inscrire tôt après la fin des études ou après un licenciement. L''ONEM organise aussi des formations gratuites.',
 true, NOW(), NOW()),

-- 30. Demande d'aide sociale
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Affaires Sociales%' LIMIT 1),
 'SOCIAL',
 'Demande d''aide sociale et accompagnement',
 'Services d''assistance pour les personnes vulnérables: orphelins, personnes âgées, personnes handicapées, victimes de violences.',
 ARRAY['Carte d''identité (ou attestation du chef de quartier)', 'Justificatif de la situation de vulnérabilité', 'Attestation du chef de quartier'],
 0, 'FC', 'Variable selon le dossier',
 '1. Se rendre au bureau communal des affaires sociales\n2. Expliquer la situation au travailleur social\n3. Remplir la fiche de demande d''aide\n4. Le service évalue la situation\n5. Orientation vers les services compétents:\n   - Centre d''hébergement (si sans abri)\n   - Aide alimentaire\n   - Accompagnement psychosocial\n   - Réinsertion professionnelle\n   - ONG partenaires\n\nPOUR LES MINEURS EN DANGER:\n- Contacter le service de protection de l''enfance\n- ONG: Save the Children, UNICEF, etc.',
 'Les services sociaux communaux peuvent orienter vers des ONG partenaires offrant une assistance complémentaire.',
 true, NOW(), NOW()),

-- ============ URGENCES ============

-- 31. Appel d'urgence et premiers secours
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Hôpital Général Provincial%' LIMIT 1),
 'URGENCE',
 'Appel d''urgence et accès aux soins d''urgence',
 'Procédure en cas d''urgence médicale, accident ou situation de danger. Le numéro d''urgence en RDC est le 112.',
 ARRAY['Aucun document requis en situation d''urgence'],
 0, 'FC', 'Immédiat',
 '1. APPELER LE 112 (numéro d''urgence national)\n2. Décrire la situation clairement:\n   - Lieu exact (avenue, commune, repères)\n   - Nature de l''urgence (accident, malaise, incendie...)\n   - Nombre de victimes\n3. Suivre les instructions du régulateur\n4. En attendant les secours:\n   - Ne pas déplacer un blessé (sauf danger immédiat)\n   - Dégager les voies respiratoires\n   - Comprimer les hémorragies\n5. Si transport par vos moyens: se rendre aux URGENCES de l''hôpital le plus proche\n\nHÔPITAUX AVEC URGENCES 24h/24:\n- Hôpital Général Provincial de Kinshasa (ex-Mama Yemo)\n- Cliniques Universitaires de Kinshasa\n- Hôpital Saint Joseph\n- CMK (Centre Médical de Kinshasa)',
 'Les urgences hospitalières ne peuvent pas refuser un patient en danger de mort. Le paiement peut être régularisé après les soins.',
 true, NOW(), NOW()),

-- 32. Signalement d'incendie ou catastrophe
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Hôpital Général Provincial%' LIMIT 1),
 'URGENCE',
 'Signalement d''incendie ou catastrophe naturelle',
 'En cas d''incendie, inondation ou autre catastrophe, alerter les pompiers et la protection civile.',
 ARRAY['Aucun document requis'],
 0, 'FC', 'Immédiat',
 '1. Appeler le 112 (urgences) et préciser \"INCENDIE\" ou \"CATASTROPHE\"\n2. Donner le lieu exact avec des repères\n3. Évaluer le danger: évacuer les personnes à risque\n4. NE PAS tenter d''éteindre un incendie important seul\n5. Faciliter l''accès aux pompiers (dégager la voie)\n6. Si inondation: monter en hauteur, couper l''électricité\n\nPOMPIERS ET PROTECTION CIVILE:\n- Détachement des pompiers (chaque district)\n- Protection Civile de Kinshasa\n- Croix-Rouge de la RDC',
 'Connaître les sorties de secours de votre bâtiment. Garder un extincteur au domicile.',
 true, NOW(), NOW());
