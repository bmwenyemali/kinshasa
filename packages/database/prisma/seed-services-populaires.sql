-- =============================================================
-- SEED: Services populaires supplémentaires
-- Achat de parcelle, achat de véhicule, ouverture de magasin,
-- inscription scolaire détaillée, inscription universitaire,
-- voyage local et international
-- =============================================================

-- ============ ACHAT DE PARCELLE (FONCIER) ============

-- Service: Achat d'une parcelle de terrain
INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Cadastre%' OR nom ILIKE '%Conservation des Titres%' LIMIT 1),
 'IMPOTS',
 'Achat d''une parcelle de terrain à Kinshasa',
 'Procédure complète pour acheter une parcelle de terrain en toute légalité à Kinshasa. En RDC, le sol appartient à l''État (Loi foncière n°73-021 du 20 juillet 1973). L''acheteur obtient un droit de concession perpétuelle (pour les Congolais) ou ordinaire (pour les étrangers). L''acquisition doit obligatoirement passer par le Bureau du Cadastre et la Conservation des Titres Immobiliers.',
 ARRAY[
   'Carte d''identité de l''acheteur',
   'Carte d''identité du vendeur',
   'Certificat de vacance parcellaire (délivré par le cadastre)',
   'Contrat de vente notarié (signé devant notaire)',
   'Procès-verbal de mesurage (croquis du géomètre assermenté)',
   'Plan cadastral de la parcelle',
   'Fiche parcellaire du quartier (délivrée par le chef de quartier)',
   'Quittance de paiement de la taxe foncière',
   'Certificat de non-litige foncier (greffe du tribunal)',
   'Attestation de résidence du vendeur',
   'Titre de propriété du vendeur (livret parcellaire ou certificat d''enregistrement)'
 ],
 500000, 'FC', '3 à 12 mois (selon la complexité du dossier)',
 E'=== PROCÉDURE COMPLÈTE D''ACHAT D''UNE PARCELLE ===\n\n📋 ÉTAPE 1 — VÉRIFICATION PRÉALABLE (indispensable)\n1. Exiger de voir le titre de propriété original du vendeur (livret parcellaire)\n2. Se rendre au Bureau du Cadastre pour vérifier la validité du titre\n3. Demander un certificat de vacance parcellaire (50 000 à 100 000 FC)\n4. Vérifier au greffe du tribunal qu''il n''y a pas de litige en cours sur la parcelle\n5. Consulter le chef de quartier pour confirmer les limites exactes\n6. Visiter physiquement la parcelle avec des voisins témoins\n\n📝 ÉTAPE 2 — NÉGOCIATION ET CONTRAT\n7. Négocier le prix avec le vendeur\n8. Se rendre chez un notaire agréé pour rédiger le contrat de vente\n9. Le contrat doit mentionner : identité des parties, description de la parcelle, prix, conditions\n10. Les deux parties signent le contrat devant le notaire\n11. Frais de notaire : environ 5% du prix de vente\n\n📐 ÉTAPE 3 — MESURAGE OFFICIEL\n12. Demander le mesurage au Bureau du Cadastre (75 000 à 150 000 FC)\n13. Un géomètre assermenté se déplace sur le terrain\n14. Il établit le procès-verbal de mesurage et le croquis officiel\n15. Le PV est signé par les parties, les voisins et le géomètre\n\n🏛️ ÉTAPE 4 — ENREGISTREMENT\n16. Rassembler tout le dossier (contrat notarié, PV mesurage, vacance, etc.)\n17. Déposer le dossier complet à la Conservation des Titres Immobiliers\n18. Payer les frais d''enregistrement et les taxes foncières\n19. Le conservateur vérifie et enregistre le transfert de propriété\n20. Retirer le nouveau livret parcellaire (titre de propriété) à votre nom\n\n💰 COÛTS ESTIMÉS (tout compris) :\n- Certificat de vacance : 50 000 - 100 000 FC\n- Frais de notaire : 5% du prix de vente\n- Mesurage cadastral : 75 000 - 150 000 FC\n- Enregistrement : 150 000 - 300 000 FC\n- TOTAL hors prix de la parcelle : 500 000 à 1 500 000 FC\n\n⏱️ PRIX INDICATIFS DES PARCELLES (2024) :\n- Communes populaires (Masina, Kimbanseke, Ndjili) : 3 000 - 15 000 USD\n- Communes intermédiaires (Lemba, Matete, Kalamu) : 15 000 - 50 000 USD\n- Communes résidentielles (Ngaliema, Gombe) : 50 000 - 300 000 USD et plus',
 E'⚠️ ATTENTION — PRÉCAUTIONS ESSENTIELLES :\n- NE JAMAIS acheter sans certificat de vacance du cadastre\n- NE JAMAIS payer avant d''avoir vu l''original du titre de propriété\n- TOUJOURS passer par un notaire (un simple papier entre particuliers n''a pas de valeur juridique complète)\n- Vérifier qu''il n''y a pas de litige au tribunal\n- Faire venir les voisins lors du mesurage\n- Méfiez-vous des prix trop bas (risque d''arnaque ou de double vente)\n\n🏗️ OBLIGATION DE MISE EN VALEUR :\nSelon la loi foncière congolaise, une parcelle concédée doit être mise en valeur (construction ou exploitation) dans un délai raisonnable. Une parcelle laissée vide pendant plus de 3 ans peut théoriquement être reprise par l''État. En pratique, commencez au moins la clôture ou les fondations.',
 true, NOW(), NOW());

-- ============ ACHAT DE VÉHICULE ============

-- Service: Achat d'un véhicule d'occasion
INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGRK%' LIMIT 1),
 'TRANSPORT',
 'Achat et mutation d''un véhicule à Kinshasa',
 'Procédure complète pour acheter un véhicule (neuf ou d''occasion) et effectuer le transfert de propriété (mutation) à Kinshasa. Comprend le changement de nom sur la carte grise et la mise en règle administrative.',
 ARRAY[
   'Carte d''identité de l''acheteur',
   'Carte d''identité du vendeur',
   'Carte grise originale du véhicule (au nom du vendeur)',
   'Certificat de contrôle technique valide',
   'Attestation d''assurance SONAS (carte jaune)',
   'Contrat de vente (rédigé et signé par les deux parties)',
   'Vignette automobile à jour',
   'Quittance de paiement de la taxe de mutation',
   'Certificat de dédouanement (pour véhicule importé)'
 ],
 200000, 'FC', '2 à 4 semaines',
 E'=== PROCÉDURE D''ACHAT ET MUTATION D''UN VÉHICULE ===\n\n🔍 ÉTAPE 1 — VÉRIFICATION AVANT ACHAT\n1. Vérifier que le vendeur est bien le propriétaire (carte grise à son nom)\n2. S''assurer que le véhicule n''est pas frappé d''opposition (vérifier à la DGI/DGRK)\n3. Vérifier l''authenticité de la carte grise (attention aux faux documents)\n4. Exiger un contrôle technique récent\n5. Vérifier que la vignette et l''assurance sont à jour\n6. Faire inspecter le véhicule par un mécanicien de confiance\n\n📝 ÉTAPE 2 — CONTRAT DE VENTE\n7. Rédiger un contrat de vente mentionnant :\n   - Identité complète des deux parties\n   - Marque, modèle, année, numéro de châssis, immatriculation\n   - Prix de vente convenu\n   - État du véhicule (kilométrage, dommages éventuels)\n8. Signature des deux parties (de préférence devant témoins ou notaire)\n\n🏛️ ÉTAPE 3 — MUTATION (transfert de propriété)\n9. Se rendre à la DGRK ou au bureau de la DGI\n10. Présenter le contrat de vente et les documents du véhicule\n11. Remplir le formulaire de demande de mutation\n12. Payer les frais de mutation :\n   - Taxe de mutation : ~200 000 FC (variable selon la cylindrée)\n   - Frais administratifs : ~50 000 FC\n13. Recevoir la nouvelle carte grise à votre nom\n14. Faire fabriquer de nouvelles plaques si nécessaire\n\n🛡️ ÉTAPE 4 — MISE EN RÈGLE\n15. Souscrire une assurance SONAS à votre nom (carte jaune)\n16. Payer la vignette automobile à la DGRK\n17. Effectuer le contrôle technique si pas récent\n\n💰 COÛTS ESTIMÉS :\n- Mutation : 200 000 - 400 000 FC\n- Assurance SONAS : ~120 USD/an\n- Vignette : 60 000 - 120 000 FC/an\n- Contrôle technique : 30 000 FC\n- TOTAL mise en règle : ~500 000 FC hors prix du véhicule',
 E'⚠️ CONSEILS IMPORTANTS :\n- Ne JAMAIS acheter un véhicule sans carte grise originale\n- Vérifier le numéro de châssis sur le véhicule et sur la carte grise\n- Se méfier des véhicules volés (prix trop bas, documents suspects)\n- Faire la mutation rapidement après l''achat\n- Conserver tous les reçus et le contrat de vente original\n- Pour les véhicules importés : exiger le certificat de dédouanement original',
 true, NOW(), NOW());

-- ============ OUVERTURE DE MAGASIN / ACTIVITÉ COMMERCIALE ============

INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%TRICOM%' OR nom ILIKE '%Tribunal de Commerce%' LIMIT 1),
 'JUSTICE',
 'Ouverture d''un magasin ou commerce à Kinshasa',
 'Procédure complète pour ouvrir légalement un commerce, magasin, restaurant ou toute activité commerciale à Kinshasa. Inclut l''immatriculation, les autorisations et les taxes obligatoires.',
 ARRAY[
   'Carte d''identité du gérant/propriétaire',
   'Contrat de bail du local commercial (ou titre de propriété)',
   'Statuts de la société notariés (si SARL/SARLU)',
   'Numéro RCCM (Registre de Commerce)',
   'NIF (Numéro d''Identification Fiscale)',
   'Patente commerciale (DGRK)',
   'Certificat d''attestation de localisation',
   'Autorisation d''ouverture de la commune',
   'Photos d''identité (4)',
   'Plan du local (pour certains commerces)'
 ],
 150000, 'FC', '4 à 8 semaines',
 E'=== PROCÉDURE D''OUVERTURE D''UN COMMERCE ===\n\n📋 ÉTAPE 1 — PRÉPARATION\n1. Choisir l''emplacement du commerce\n2. Signer un contrat de bail commercial (ou disposer du titre de propriété)\n3. Définir la forme juridique :\n   - Entreprise individuelle (simple, pour petit commerce)\n   - SARLU (Société à Responsabilité Limitée Unipersonnelle)\n   - SARL (avec des associés)\n\n📝 ÉTAPE 2 — IMMATRICULATION AU RCCM\n4. Se rendre au greffe du Tribunal de Commerce (TRICOM)\n5. Pour une société : faire rédiger les statuts par un notaire\n6. Remplir le formulaire d''immatriculation\n7. Payer les frais (50 000 - 100 000 FC)\n8. Obtenir le numéro RCCM\n\n🏛️ ÉTAPE 3 — IDENTIFICATION FISCALE\n9. Se rendre à la DGI (Direction Générale des Impôts)\n10. Demander le NIF (Numéro d''Identification Fiscale)\n11. Fournir le RCCM et les documents d''identité\n12. Payer les frais (20 000 FC)\n\n💳 ÉTAPE 4 — PATENTE ET AUTORISATION\n13. Se rendre à la DGRK\n14. Demander la patente commerciale\n15. Montant variable selon l''activité (50 000 - 500 000 FC/an)\n16. Obtenir l''autorisation d''ouverture auprès de la commune\n\n🏪 ÉTAPE 5 — DÉMARRAGE\n17. Ouvrir un compte bancaire professionnel\n18. Installer la signalisation du commerce\n19. Afficher visiblement la patente et le RCCM dans le local\n20. Tenir une comptabilité régulière\n\n💰 BUDGET ESTIMÉ POUR DÉMARRER :\n- RCCM : 50 000 - 100 000 FC\n- NIF : 20 000 FC\n- Patente : 50 000 - 500 000 FC/an\n- Notaire (si société) : 200 000 - 400 000 FC\n- Bail commercial (avance) : variable\n- TOTAL démarches administratives : 300 000 - 1 000 000 FC',
 E'OBLIGATIONS CONTINUES :\n- Renouveler la patente chaque année\n- Déclarer les impôts mensuellement ou trimestriellement\n- Afficher les prix et facturer avec le NIF\n- Conserver tous les documents dans le local (contrôle possible)\n\nSECTEURS NÉCESSITANT DES AUTORISATIONS SPÉCIALES :\n- Restauration : certificat sanitaire + inspection\n- Pharmacie : autorisation du Ministère de la Santé\n- Débit de boissons : licence spéciale de la commune\n- Télécommunications : licence ARPTC',
 true, NOW(), NOW());

-- ============ INSCRIPTION SCOLAIRE DÉTAILLÉE ============

INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Division Provinciale de l''Éducation%' LIMIT 1),
 'EDUCATION',
 'Inscription scolaire détaillée (maternelle au secondaire)',
 'Guide complet pour inscrire un enfant dans une école maternelle, primaire ou secondaire à Kinshasa, incluant les frais, les documents et les périodes d''inscription. L''enseignement primaire public est gratuit depuis 2019 (politique de gratuité).',
 ARRAY[
   'Acte de naissance de l''enfant (original + copie)',
   'Bulletin scolaire de l''année précédente (sauf 1ère maternelle/1ère primaire)',
   'Carte de vaccination à jour (carnet PEV)',
   'Livret de ménage des parents',
   '4 photos d''identité de l''enfant',
   'Photos d''identité des parents (2)',
   'Attestation de réussite (si changement d''école)',
   'Carte d''identité du parent/tuteur',
   'Certificat médical (pour certaines écoles)'
 ],
 0, 'FC', 'Inscription : immédiat à 1 semaine',
 E'=== GUIDE D''INSCRIPTION SCOLAIRE À KINSHASA ===\n\n📅 PÉRIODE D''INSCRIPTION : Août - Septembre (avant la rentrée)\n\n🔍 ÉTAPE 1 — CHOIX DE L''ÉCOLE\n1. Vérifier que l''école est agréée par le Ministère de l''EPST\n2. Visiter l''école et rencontrer la direction\n3. Comparer les frais entre écoles publiques et privées\n4. Vérifier la distance domicile-école\n\n📝 ÉTAPE 2 — INSCRIPTION\n5. Se rendre à l''école avec l''enfant et les documents\n6. Retirer et remplir le formulaire d''inscription\n7. Présenter tous les documents requis\n8. L''enfant peut passer un test de niveau (certaines écoles)\n9. Payer les frais d''inscription\n\n💰 FRAIS SCOLAIRES (indicatifs 2024) :\n\n🏫 ÉCOLE PUBLIQUE :\n- Primaire : GRATUIT (politique de gratuité depuis 2019)\n- Secondaire : 50 000 - 150 000 FC/an (frais de fonctionnement)\n- MINERVAL : supprimé au primaire, maintenu au secondaire\n\n🏢 ÉCOLE PRIVÉE :\n- Maternelle : 100 - 500 USD/an\n- Primaire : 150 - 1 000 USD/an\n- Secondaire : 200 - 2 000 USD/an\n- Écoles internationales : 2 000 - 10 000 USD/an\n\n📋 DOCUMENTS À OBTENIR APRÈS INSCRIPTION :\n10. Carte d''élève (délivrée par l''école)\n11. Uniforme scolaire (obligatoire dans la plupart des écoles)\n12. Liste des fournitures scolaires\n\n📆 CALENDRIER SCOLAIRE :\n- 1er trimestre : Septembre - Décembre\n- 2ème trimestre : Janvier - Mars\n- 3ème trimestre : Avril - Juin/Juillet\n- Vacances : Juillet - Août',
 E'INFORMATIONS IMPORTANTES :\n- L''enseignement primaire public est GRATUIT (ne payez pas de frais illégaux)\n- La carte de vaccination est obligatoire pour l''inscription\n- Inscrivez votre enfant tôt (les places sont limitées dans les bonnes écoles)\n- En cas de transfert d''école : demandez le dossier scolaire complet\n- Vérifiez que l''école figure sur la liste officielle du Ministère\n- L''âge minimum pour le primaire est 6 ans au 31 décembre de l''année scolaire',
 true, NOW(), NOW());

-- ============ INSCRIPTION UNIVERSITAIRE DÉTAILLÉE ============

INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%Cliniques Universitaires%' LIMIT 1),
 'EDUCATION',
 'Inscription universitaire détaillée (UNIKIN, UCC, UPN, etc.)',
 'Guide complet pour s''inscrire dans une université ou un institut supérieur à Kinshasa. Couvre les différentes universités publiques (UNIKIN, UPN, ISP, ISTA) et privées (UCC, UPC, UNIKIN).',
 ARRAY[
   'Diplôme d''État original + 2 copies certifiées conformes',
   'Relevés de notes du secondaire (5ème et 6ème)',
   'Acte de naissance original + copie',
   '8 photos d''identité format passeport',
   'Attestation de bonne vie et mœurs (délivrée par la commune)',
   'Carte d''identité',
   'Formulaire d''inscription rempli',
   'Quittance de paiement des frais académiques',
   'Lettre de motivation (certaines universités)',
   'Certificat médical (certaines universités)'
 ],
 300, 'USD', '2 à 4 semaines',
 E'=== GUIDE D''INSCRIPTION UNIVERSITAIRE À KINSHASA ===\n\n📅 PÉRIODE : Septembre - Novembre (inscription), Octobre - Novembre (début des cours)\n\n🏛️ PRINCIPALES UNIVERSITÉS DE KINSHASA :\n\n📗 PUBLIQUES :\n- UNIKIN (Université de Kinshasa) — campus de Lemba\n- UPN (Université Pédagogique Nationale) — Ngaliema/Binza\n- ISP (Institut Supérieur Pédagogique) — Gombe\n- ISTA (Institut Supérieur des Techniques Appliquées) — Barumbu\n- IFASIC (Institut Facultaire des Sciences de l''Information et de la Communication)\n\n📘 PRIVÉES :\n- UCC (Université Catholique du Congo) — Limete\n- UPC (Université Protestante au Congo) — Lingwala\n- UCG (Université Catholique de Graben)\n- Université Libre de Kinshasa\n\n📋 PROCÉDURE D''INSCRIPTION :\n\n1. Obtenir le Diplôme d''État (obligatoire)\n2. Choisir la faculté/filière souhaitée\n3. Retirer le formulaire d''inscription (sur place ou en ligne pour certaines)\n4. Remplir le formulaire et joindre tous les documents\n5. Passer le test d''orientation (UNIKIN) ou d''admission (privées)\n6. Consulter les résultats d''admission\n7. Si admis : payer les frais académiques\n8. Valider l''inscription au secrétariat de la faculté\n9. Recevoir la carte d''étudiant\n10. Commencer les cours selon le calendrier\n\n💰 FRAIS ACADÉMIQUES (indicatifs 2024) :\n\nUNIKIN : 250 - 500 USD/an selon la faculté\n- Médecine : 500 USD/an\n- Droit, Économie : 300 USD/an\n- Sciences : 350 USD/an\n\nUPN : 200 - 350 USD/an\nISTA : 200 - 400 USD/an\nUCC : 500 - 1 200 USD/an\nUPC : 400 - 800 USD/an\n\n📝 FILIÈRES LES PLUS DEMANDÉES :\n- Médecine, Pharmacie, Sciences biomédicales\n- Droit\n- Sciences économiques et gestion\n- Informatique et télécommunications\n- Génie civil et architecture',
 E'CONSEILS :\n- Inscrivez-vous tôt (les places sont limitées, surtout en Médecine)\n- Gardez toujours l''original du Diplôme d''État en sécurité\n- Les frais académiques peuvent être payés en tranches (négocier avec le secrétariat)\n- Vérifiez que l''institution est reconnue par le Ministère de l''ESU\n- Les étudiants boursiers doivent se renseigner auprès du secrétariat académique\n- Logement : prévoir le campus (UNIKIN a des homes) ou location en ville',
 true, NOW(), NOW());

-- ============ VOYAGE LOCAL (à l'intérieur du Congo) ============

INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGM%' OR nom ILIKE '%Direction Générale de Migration%' LIMIT 1),
 'TRANSPORT',
 'Voyage local (à l''intérieur de la RDC)',
 'Procédure et documents nécessaires pour voyager à l''intérieur de la République Démocratique du Congo depuis Kinshasa (par avion, bus, bateau ou train).',
 ARRAY[
   'Carte d''identité ou carte d''électeur',
   'Billet de transport (avion, bus, bateau)',
   'Ordre de mission (si voyage professionnel)',
   'Carnet de vaccination (recommandé)'
 ],
 0, 'FC', 'Selon le moyen de transport',
 E'=== VOYAGE À L''INTÉRIEUR DE LA RDC ===\n\n✈️ PAR AVION (le plus rapide)\n1. Acheter un billet auprès d''une compagnie aérienne locale :\n   - Congo Airways (compagnie nationale)\n   - CAA (Compagnie Africaine d''Aviation)\n   - FlyCAA\n   - Malu Aviation\n2. Se munir de sa carte d''identité\n3. Se présenter à l''aéroport de Ndjili 2h avant le vol\n4. Payer la taxe aéroportuaire (~15 USD vol intérieur)\n5. Embarquement après contrôle de sécurité\n\n💰 PRIX INDICATIFS (aller simple) :\n- Kinshasa → Lubumbashi : 250 - 400 USD\n- Kinshasa → Kisangani : 200 - 350 USD\n- Kinshasa → Goma : 250 - 400 USD\n- Kinshasa → Mbuji-Mayi : 200 - 350 USD\n\n🚌 PAR BUS / ROUTE\n1. Se rendre à la gare routière (ex: gare de Kinkole pour l''Est)\n2. Acheter un billet\n3. Destinations possibles par route depuis Kinshasa :\n   - Matadi (Kongo-Central) : ~6-8h\n   - Kikwit (Kwilu) : ~12-16h\n   - Bandundu ville : ~8-12h\n4. Prévoir eau, nourriture et téléphone chargé\n\n🚢 PAR BATEAU (fleuve Congo)\n1. Se rendre au port de Kinshasa (SCTP/ONATRA)\n2. Acheter un billet pour la destination souhaitée\n3. Le voyage Kinshasa → Kisangani dure ~7-14 jours en remontant\n4. Prévoir ravitaillement et couchage\n\n🚂 PAR TRAIN\n- Ligne Matadi-Kinshasa (SCTP) : en cours de réhabilitation\n- Se renseigner auprès de la SCTP pour les horaires',
 E'CONSEILS POUR LE VOYAGE INTÉRIEUR :\n- Toujours avoir sa carte d''identité sur soi\n- Garder une copie de ses documents importants\n- Pour les voyages par route : privilégier les compagnies de bus reconnues\n- Vérifier les conditions de sécurité de la destination (certaines provinces ont des zones instables)\n- Prévoir de l''argent liquide (les cartes bancaires ne sont pas acceptées partout)\n- Le téléphone (Vodacom, Airtel, Orange) capte dans les grandes villes',
 true, NOW(), NOW());

-- ============ VOYAGE INTERNATIONAL ============

INSERT INTO services_proposes (id, lieu_id, categorie, nom_service, description, documents_requis, prix_officiel, devise, delai, procedure, conditions_particulieres, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 (SELECT id FROM lieux WHERE nom ILIKE '%DGM%' OR nom ILIKE '%Direction Générale de Migration%' LIMIT 1),
 'TRANSPORT',
 'Voyage international depuis Kinshasa',
 'Procédure complète et documents nécessaires pour voyager à l''étranger depuis Kinshasa. Comprend les étapes du passeport, du visa, du visa de sortie et du passage à l''aéroport.',
 ARRAY[
   'Passeport biométrique valide (6 mois minimum)',
   'Visa du pays de destination (si requis)',
   'Visa de sortie DGM (50 USD)',
   'Billet d''avion aller-retour (ou aller simple avec justificatif)',
   'Certificat de vaccination internationale (carnet jaune OMS)',
   'Test COVID négatif (selon la destination)',
   'Preuve d''hébergement ou lettre d''invitation',
   'Preuve de moyens financiers (relevé bancaire)',
   'Carte d''identité'
 ],
 50, 'USD', 'Préparation : 2 à 8 semaines avant le voyage',
 E'=== PROCÉDURE DE VOYAGE INTERNATIONAL ===\n\n📕 ÉTAPE 1 — PASSEPORT\n1. Si vous n''avez pas de passeport : en demander un à la DGM (205 USD, 2-6 semaines)\n2. Si votre passeport expire dans moins de 6 mois : le renouveler\n3. Vérifier qu''il reste des pages vierges pour les visas et tampons\n\n🌐 ÉTAPE 2 — VISA DU PAYS DE DESTINATION\n4. Vérifier si un visa est requis pour votre destination :\n   - Pays sans visa pour les Congolais : très peu (certains pays africains)\n   - Visa requis pour : Europe (Schengen), USA, Canada, Chine, etc.\n5. Se rendre à l''ambassade ou au consulat du pays de destination\n6. Fournir les documents demandés (varient selon le pays)\n7. Payer les frais de visa et attendre la délivrance\n\n📄 ÉTAPE 3 — VISA DE SORTIE\n8. Se rendre à la DGM avec le passeport et le billet d''avion\n9. Payer le visa de sortie : 50 USD\n10. Le visa est apposé dans le passeport\n11. Peut être obtenu le jour même\n\n💉 ÉTAPE 4 — VACCINATIONS\n12. Vaccination contre la fièvre jaune OBLIGATOIRE\n13. Se rendre dans un centre de vaccination agréé\n14. Obtenir le certificat international de vaccination (carnet jaune OMS)\n15. Certaines destinations exigent aussi d''autres vaccins\n\n✈️ ÉTAPE 5 — JOUR DU DÉPART\n16. Se rendre à l''Aéroport International de Ndjili 3 à 4h avant le vol\n17. Contrôle de sécurité à l''entrée de l''aéroport\n18. Enregistrement au comptoir de la compagnie aérienne\n19. Passage immigration DGM (vérification visa de sortie)\n20. Contrôle de sécurité\n21. Embarquement\n\n💰 BUDGET ESTIMÉ (hors billet d''avion) :\n- Passeport : 205 USD\n- Visa de sortie : 50 USD\n- Visa de destination : 50 - 200 USD (selon le pays)\n- Vaccination fièvre jaune : 20 - 30 USD\n- Transport jusqu''à l''aéroport : 10 - 30 USD\n\n✈️ PRINCIPALES COMPAGNIES À NDJILI :\n- Ethiopian Airlines (Addis-Abeba → monde entier)\n- Kenya Airways (Nairobi → monde entier)\n- Turkish Airlines (Istanbul → Europe)\n- Air France (Paris)\n- Brussels Airlines (Bruxelles)\n- RwandAir (Kigali)\n- ASKY Airlines (Lomé → Afrique de l''Ouest)',
 E'CONSEILS VOYAGE INTERNATIONAL :\n- Commencer les démarches au moins 2 MOIS avant le voyage\n- Faire des photocopies de tous les documents et les séparer\n- Enregistrer les numéros d''urgence de l''ambassade de RDC dans le pays de destination\n- Déclarer les devises supérieures à 10 000 USD à la douane\n- Vérifier les exigences sanitaires de la destination avant de voyager\n- Les tarifs des billets sont plus bas si réservés à l''avance',
 true, NOW(), NOW());

-- ============ NOUVELLE CATÉGORIE : COMMERCE ============

-- Mise à jour du service ouverture magasin vers catégorie COMMERCE s'il existe,
-- sinon il reste en JUSTICE (RCCM est délivré au tribunal)

-- ============ DOCUMENTS SUPPLÉMENTAIRES ============

-- Document: Titre de propriété (livret parcellaire)
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, base_juridique, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Titre de propriété (livret parcellaire)',
 'titre-de-propriete-livret-parcellaire',
 'IMPOTS',
 'Document officiel attestant le droit de concession sur une parcelle de terrain.',
 'Le livret parcellaire (ou certificat d''enregistrement) est le titre foncier officiel en RDC. Il prouve que le titulaire a un droit de concession perpétuelle (pour les Congolais) ou ordinaire (pour les étrangers) sur une parcelle de terrain. Il est délivré par la Conservation des Titres Immobiliers.',
 'Preuve officielle de propriété foncière. Requis pour : vendre un terrain, obtenir un prêt hypothécaire, effectuer une construction autorisée, protéger ses droits fonciers.',
 250000, 'FC', '3 à 6 mois',
 ARRAY['Contrat de vente notarié', 'Certificat de vacance parcellaire', 'Procès-verbal de mesurage', 'Carte d''identité', 'Quittances de paiement des taxes'],
 E'1. Faire vérifier la vacance de la parcelle au cadastre\n2. Signer le contrat de vente chez un notaire agréé\n3. Faire effectuer le mesurage par un géomètre assermenté\n4. Déposer le dossier complet à la Conservation des Titres\n5. Payer les droits d''enregistrement et taxes foncières\n6. Attendre le traitement du dossier (3-6 mois)\n7. Retirer le livret parcellaire',
 'Conservation des Titres Immobiliers (Bureau du Cadastre), Avenue Tombalbaye, Gombe, Kinshasa.',
 E'Ne jamais acheter un terrain sans titre de propriété vérifié. Exiger toujours l''original du vendeur. Faire vérifier au cadastre avant tout paiement.',
 'Loi n°73-021 du 20 juillet 1973 portant régime général des biens, régime foncier et immobilier et régime des sûretés.',
 ARRAY['livret parcellaire', 'certificat d''enregistrement', 'titre foncier', 'contrat de concession'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Certificat de vacance parcellaire
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Certificat de vacance parcellaire',
 'certificat-de-vacance-parcellaire',
 'IMPOTS',
 'Document attestant qu''une parcelle est libre de tout droit de concession.',
 'Le certificat de vacance parcellaire est délivré par le Bureau du Cadastre. Il confirme que la parcelle n''est pas déjà concédée à un tiers et qu''elle peut être acquise. C''est le document de vérification préalable indispensable avant tout achat.',
 'Vérification que le terrain est libre et disponible à la vente. Document obligatoire avant tout contrat de vente.',
 75000, 'FC', '1 à 2 semaines',
 ARRAY['Requête de vérification', 'Indication de la localisation parcellaire'],
 E'1. Se rendre au Bureau du Cadastre de la juridiction\n2. Déposer une requête de vérification de vacance\n3. Payer les frais (50 000 - 100 000 FC)\n4. Le service vérifie les registres fonciers\n5. Si la parcelle est vacante, le certificat est délivré',
 'Bureau du Cadastre / Conservation des Titres Immobiliers, Gombe, Kinshasa.',
 'Toujours commencer par cette vérification avant de payer quoi que ce soit au vendeur.',
 ARRAY['vacance parcellaire', 'certificat vacance', 'vérification terrain'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Contrat de vente notarié
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Contrat de vente notarié (immobilier)',
 'contrat-de-vente-notarie',
 'IMPOTS',
 'Acte authentique de vente immobilière rédigé et certifié par un notaire.',
 'Le contrat de vente notarié est l''acte officiel qui formalise la vente d''un bien immobilier (parcelle, maison). Il a force probante et constitue un titre exécutoire. Un simple acte sous seing privé (entre particuliers) n''offre pas les mêmes garanties juridiques.',
 'Formaliser légalement la transaction immobilière. Protéger l''acheteur et le vendeur. Document requis pour l''enregistrement au cadastre.',
 null, 'FC', '1 à 2 semaines',
 ARRAY['Carte d''identité des deux parties', 'Titre de propriété du vendeur', 'Certificat de vacance'],
 E'1. Les deux parties se rendent chez un notaire agréé\n2. Le notaire vérifie les documents de propriété\n3. Il rédige le contrat de vente (mentionnant prix, description, conditions)\n4. Lecture du contrat aux deux parties\n5. Signature par les deux parties et le notaire\n6. Le notaire enregistre l''acte et délivre des copies authentiques\n\nFrais de notaire : environ 5% du prix de vente (négociable)',
 'Étude notariale agréée. Plusieurs notaires à Gombe et dans les autres communes.',
 'Ne jamais acheter un terrain sur simple papier entre particuliers. Le contrat notarié est votre protection juridique.',
 ARRAY['acte de vente', 'contrat notarié', 'acte authentique', 'vente immobilière'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Plan cadastral
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Plan cadastral (croquis de mesurage)',
 'plan-cadastral-croquis-mesurage',
 'IMPOTS',
 'Dessin technique officiel décrivant les limites et dimensions d''une parcelle.',
 'Le plan cadastral (ou croquis de mesurage) est le document technique établi par un géomètre assermenté du cadastre après mesurage physique de la parcelle. Il indique les dimensions exactes, la superficie, les limites avec les voisins et les repères géographiques.',
 'Définir officiellement les limites d''une parcelle. Requis pour l''obtention du titre de propriété.',
 100000, 'FC', '2 à 4 semaines',
 ARRAY['Demande de mesurage', 'Certificat de vacance', 'Présence des voisins lors du mesurage'],
 E'1. Déposer une demande de mesurage au Bureau du Cadastre\n2. Payer les frais de mesurage (75 000 - 150 000 FC)\n3. Un géomètre assermenté se déplace sur le terrain\n4. Les voisins doivent être présents pour confirmer les limites\n5. Le géomètre établit le procès-verbal et le croquis\n6. Le PV est signé par toutes les parties\n7. Le plan cadastral est archivé au cadastre',
 'Bureau du Cadastre, Service du Mesurage.',
 'Insister pour que les voisins soient présents lors du mesurage. Cela évite les litiges futurs.',
 ARRAY['croquis parcellaire', 'mesurage cadastral', 'plan de terrain', 'PV de mesurage'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Carte grise (certificat d'immatriculation)
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Carte grise (certificat d''immatriculation)',
 'carte-grise-certificat-immatriculation',
 'TRANSPORT',
 'Document officiel d''identification et d''immatriculation d''un véhicule.',
 'La carte grise est le certificat d''immatriculation délivré par l''administration. Elle identifie le véhicule (marque, modèle, numéro de châssis, cylindrée) et son propriétaire. Elle doit être présentée lors de tout contrôle routier.',
 'Prouver la propriété et l''immatriculation d''un véhicule. Obligatoire pour circuler. Requise pour l''assurance et la vignette.',
 150000, 'FC', '1 à 4 semaines',
 ARRAY['Bon de commande ou facture d''achat', 'Carte d''identité du propriétaire', 'Certificat de dédouanement (si importé)', 'Ancien carte grise (si mutation)'],
 E'1. Se rendre à la DGI ou DGRK\n2. Présenter les documents du véhicule\n3. Remplir le formulaire d''immatriculation\n4. Payer les frais\n5. Recevoir le numéro d''immatriculation\n6. Retirer la carte grise',
 'Direction Générale des Impôts (DGI) ou DGRK, selon la juridiction.',
 'Vérifier l''authenticité de la carte grise lors de l''achat d''un véhicule d''occasion. Comparer le numéro de châssis sur le véhicule et sur le document.',
 ARRAY['certificat d''immatriculation', 'immatriculation véhicule', 'carte grise voiture'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Carte jaune SONAS (assurance véhicule)
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Carte jaune SONAS (assurance véhicule)',
 'carte-jaune-sonas-assurance-vehicule',
 'TRANSPORT',
 'Attestation d''assurance de responsabilité civile automobile obligatoire.',
 'La carte jaune SONAS est l''attestation d''assurance délivrée par la SONAS (Société Nationale d''Assurances), seul assureur agréé en RDC. L''assurance de responsabilité civile couvre les dommages causés à des tiers en cas d''accident.',
 'Obligation légale pour tout véhicule en circulation. À présenter lors de tout contrôle routier. Requise pour la vignette.',
 120, 'USD', 'Immédiat après paiement',
 ARRAY['Carte d''immatriculation du véhicule', 'Carte d''identité du propriétaire'],
 E'1. Se rendre dans une agence SONAS\n2. Présenter la carte d''immatriculation\n3. Choisir la couverture (RC obligatoire ou tous risques)\n4. Payer la prime annuelle\n5. Recevoir la carte jaune',
 'Agences SONAS dans toutes les communes de Kinshasa.',
 'La carte jaune doit toujours se trouver dans le véhicule. La SONAS est le seul assureur agréé en RDC.',
 ARRAY['assurance auto', 'carte jaune', 'assurance SONAS', 'RC auto'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: RCCM (Registre de Commerce et du Crédit Mobilier)
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, base_juridique, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'RCCM (Registre de Commerce)',
 'rccm-registre-de-commerce',
 'JUSTICE',
 'Numéro d''immatriculation au registre commercial, obligatoire pour toute activité commerciale en RDC.',
 'Le RCCM (Registre de Commerce et du Crédit Mobilier) est le numéro unique attribué à toute personne physique ou morale exerçant une activité commerciale. Il est tenu par le greffe du Tribunal de Commerce et constitue la carte d''identité du commerçant.',
 'Obligatoire pour exercer légalement le commerce. Requis pour : obtenir la patente, ouvrir un compte bancaire professionnel, signer des contrats commerciaux, participer à des marchés publics.',
 75000, 'FC', '3 à 10 jours ouvrables',
 ARRAY['Carte d''identité', 'Statuts notariés (pour les sociétés)', 'Contrat de bail du local commercial', 'Photo d''identité', 'Requête d''immatriculation'],
 E'1. Se rendre au greffe du Tribunal de Commerce (TRICOM)\n2. Retirer le formulaire de demande d''immatriculation\n3. Remplir le formulaire avec les informations de l''activité\n4. Joindre tous les documents requis\n5. Payer les frais d''immatriculation\n6. Le greffier vérifie le dossier\n7. Attribution du numéro RCCM\n8. Retirer l''extrait du RCCM',
 'Greffe du Tribunal de Commerce de Kinshasa (TRICOM), Avenue de la Justice, Gombe.',
 'Le RCCM doit être renouvelé pour certaines modifications (changement d''adresse, d''activité). Afficher le numéro dans le local commercial.',
 'Acte Uniforme OHADA relatif au droit commercial général',
 ARRAY['registre commerce', 'RCCM', 'immatriculation commerce', 'numéro commerçant'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: NIF (Numéro d'Identification Fiscale)
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'NIF (Numéro d''Identification Fiscale)',
 'nif-numero-identification-fiscale',
 'IMPOTS',
 'Identifiant fiscal unique attribué à toute personne physique ou morale assujettie à l''impôt.',
 'Le NIF est le numéro d''identification fiscale délivré par la Direction Générale des Impôts (DGI). Il est attribué à tout contribuable (entreprise ou personne physique exerçant une activité imposable) et doit figurer sur toutes les factures et déclarations fiscales.',
 'Obligatoire pour : payer les impôts, émettre des factures légales, importer/exporter des marchandises, participer aux marchés publics.',
 20000, 'FC', '3 à 5 jours ouvrables',
 ARRAY['RCCM ou attestation d''activité', 'Carte d''identité', 'Statuts de la société (si SARL)', 'Contrat de bail'],
 E'1. Se rendre à la DGI (Direction Générale des Impôts)\n2. Présenter le RCCM et les documents d''identité\n3. Remplir le formulaire de demande de NIF\n4. Le service vérifie les informations\n5. Attribution du NIF et délivrance du certificat',
 'Direction Générale des Impôts (DGI), siège à Gombe ou centres fiscaux de proximité.',
 'Le NIF est gratuit ou coûte un frais minimal. Il est obligatoire même pour les petits commerces. Le NIF doit figurer sur toutes les factures émises.',
 ARRAY['NIF', 'numéro fiscal', 'identification fiscale', 'impôt identification'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Patente commerciale
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Patente commerciale',
 'patente-commerciale',
 'IMPOTS',
 'Taxe annuelle obligatoire pour l''exercice d''une activité commerciale, délivrée par la DGRK.',
 'La patente est un impôt provincial annuel que doit payer tout commerçant ou prestataire de services pour exercer son activité à Kinshasa. Elle est délivrée sous forme d''un document/carte à afficher dans le local commercial.',
 'Autorisation fiscale d''exercer le commerce. Doit être affichée visiblement dans le local. Contrôlée par les agents de la DGRK.',
 100000, 'FC', 'Immédiat après paiement',
 ARRAY['RCCM', 'NIF', 'Carte d''identité', 'Contrat de bail'],
 E'1. Se rendre à la DGRK (bureaux de taxation)\n2. Présenter le RCCM et le NIF\n3. Le montant est calculé selon le type et la taille de l''activité\n4. Payer la taxe\n5. Recevoir la patente (valide 1 an)\n6. Afficher la patente dans le local commercial',
 'DGRK (Direction Générale des Recettes de Kinshasa), bureaux dans chaque commune.',
 'La patente doit être renouvelée chaque année (janvier). Les montants varient : 50 000 FC pour un petit commerce à 500 000+ FC pour une grande entreprise.',
 ARRAY['patente', 'taxe commerce', 'impôt commercial', 'droit d''exercer'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Diplôme d'État
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, base_juridique, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Diplôme d''État',
 'diplome-detat',
 'EDUCATION',
 'Diplôme sanctionnant la fin des études secondaires en RDC (équivalent du baccalauréat).',
 'Le Diplôme d''État est le certificat délivré après réussite de l''Examen d''État (EXETAT) à la fin du cycle secondaire (6ème des humanités). C''est le diplôme le plus important du système éducatif secondaire congolais et permet l''accès à l''enseignement supérieur.',
 'Obligatoire pour : s''inscrire à l''université ou institut supérieur, postuler à certains emplois, participer à des concours publics.',
 0, 'FC', '2 à 6 mois après l''examen',
 ARRAY['Carte d''inscription à l''EXETAT', 'Avoir réussi l''Examen d''État', 'Photos d''identité'],
 E'1. Passer l''Examen d''État (juin-juillet de chaque année)\n2. Attendre la publication des résultats (août-septembre)\n3. En cas de réussite, le diplôme est délivré par le Ministère de l''EPST\n4. Retirer le diplôme auprès de l''école ou de la Division Provinciale de l''Éducation\n5. En cas de perte : demander un duplicata au Ministère de l''EPST (avec attestation de perte de la police)',
 'Ministère de l''EPST (Enseignement Primaire, Secondaire et Technique) via les écoles et Divisions Provinciales.',
 'Conserver l''original en lieu sûr. Faire des copies certifiées conformes. En cas de perte, signaler immédiatement à la police et demander un duplicata.',
 'Loi-cadre n°14/004 du 11 février 2014 de l''enseignement national',
 ARRAY['diplôme état', 'EXETAT', 'bac congolais', 'diplôme secondaire', 'humanités'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Visa de sortie DGM
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Visa de sortie (DGM)',
 'visa-de-sortie-dgm',
 'TRANSPORT',
 'Autorisation de sortie du territoire congolais délivrée par la Direction Générale de Migration.',
 'Le visa de sortie est un cachet obligatoire apposé dans le passeport par la DGM pour tout ressortissant congolais ou étranger quittant le territoire de la RDC. Sans ce visa, l''embarquement est refusé à l''aéroport.',
 'Obligatoire pour tout voyage international au départ de la RDC. À obtenir avant le jour du départ.',
 50, 'USD', 'Même jour (quelques heures)',
 ARRAY['Passeport biométrique valide', 'Billet d''avion', 'Visa du pays de destination (si requis)'],
 E'1. Se rendre à la DGM (Direction Générale de Migration)\n2. Présenter le passeport et le billet d''avion\n3. Payer les frais : 50 USD\n4. Le visa de sortie est apposé dans le passeport\n5. Peut aussi être obtenu au guichet DGM de l''aéroport de Ndjili (mais préférable de le faire avant)',
 'DGM — Direction Générale de Migration, Avenue des Aviateurs, Gombe. Aussi disponible au guichet DGM de l''Aéroport de Ndjili.',
 'Obtenir le visa de sortie quelques jours avant le départ pour éviter le stress. Avoir le montant exact en USD.',
 ARRAY['visa sortie', 'exit visa', 'visa DGM', 'autorisation sortie', 'quitter le pays'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Certificat de vaccination internationale (carnet jaune)
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Certificat de vaccination internationale (carnet jaune OMS)',
 'certificat-vaccination-internationale',
 'SANTE',
 'Carnet international de vaccination attestant les vaccinations requises pour le voyage international.',
 'Le certificat de vaccination internationale, communément appelé « carnet jaune », est un document standardisé par l''OMS qui atteste des vaccinations reçues, notamment la fièvre jaune (obligatoire pour la RDC). Il est exigé à l''entrée et à la sortie de nombreux pays.',
 'Obligatoire pour tout voyage international. Contrôlé aux frontières et aéroports. Requis pour : sortir de la RDC, entrer dans la plupart des pays africains et certains pays d''autres continents.',
 25, 'USD', 'Immédiat après vaccination',
 ARRAY['Carte d''identité ou passeport', 'Ancien carnet jaune (si renouvellement)'],
 E'1. Se rendre dans un centre de vaccination agréé\n2. Recevoir le vaccin contre la fièvre jaune (obligatoire)\n3. Le médecin remplit le carnet jaune OMS\n4. Le carnet est tamponné et signé\n5. Conserver le carnet précieusement (valable à vie pour la fièvre jaune depuis 2016)',
 'Centres de vaccination agréés : CHK (Centre Hospitalier de Kinshasa), Cliniques Ngaliema, dispensaires agréés dans chaque commune.',
 'Le vaccin contre la fièvre jaune est valable À VIE (depuis 2016, pas besoin de rappel). Faire la vaccination au moins 10 jours avant le voyage.',
 ARRAY['carnet jaune', 'vaccination internationale', 'fièvre jaune certificat', 'yellow card', 'carnet OMS'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Vignette automobile
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Vignette automobile',
 'vignette-automobile',
 'TRANSPORT',
 'Taxe annuelle obligatoire pour tout véhicule en circulation à Kinshasa.',
 'La vignette automobile est une taxe provinciale annuelle perçue par la DGRK. Elle autorise la mise en circulation du véhicule pour l''année en cours. Le non-paiement expose à des amendes et à l''immobilisation du véhicule.',
 'Passage obligatoire pour tout véhicule circulant à Kinshasa. Prouve le paiement de la taxe de circulation.',
 80000, 'FC', 'Immédiat après paiement',
 ARRAY['Carte grise du véhicule', 'Carte d''identité du propriétaire', 'Ancienne vignette (si renouvellement)'],
 E'1. Se rendre à un guichet DGRK ou chez un agent agréé\n2. Présenter la carte grise\n3. Payer le montant (variable selon la cylindrée du véhicule)\n4. Recevoir la vignette autocollante\n5. Coller la vignette sur le pare-brise du véhicule',
 'DGRK — Bureaux de taxation dans chaque commune. Également disponible chez certains agents agréés.',
 'La vignette est à renouveler au début de chaque année. Contrôlée fréquemment par la police. Montants : 60 000 FC (petite cylindrée) à 200 000+ FC (grosses cylindrées et 4x4).',
 ARRAY['vignette', 'taxe circulation', 'vignette auto', 'taxe véhicule'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Document: Attestation de bonne vie et mœurs
INSERT INTO documents (id, nom, slug, categorie, description, definition, role, prix_estimatif, devise, delai_estimatif, documents_requis, procedure, ou_obtenir, conseils, aliases, actif, created_at, updated_at)
VALUES
(gen_random_uuid(),
 'Attestation de bonne vie et mœurs',
 'attestation-bonne-vie-moeurs',
 'JUSTICE',
 'Document attestant l''absence de condamnations pénales et la bonne moralité d''une personne.',
 'L''attestation de bonne vie et mœurs (ou certificat de bonne conduite) est un document délivré par le Parquet attestant que la personne n''a pas de casier judiciaire et jouit d''une bonne réputation morale. Elle est l''équivalent du « casier judiciaire vierge » dans d''autres pays.',
 'Requise pour : inscription universitaire, candidature à un emploi, demande de visa, création d''entreprise, adoption, candidature à un poste public.',
 10000, 'FC', '3 à 7 jours ouvrables',
 ARRAY['Carte d''identité', 'Attestation de résidence (délivrée par le chef de quartier)', '2 photos d''identité'],
 E'1. Se rendre au Parquet de Grande Instance de sa juridiction\n2. Présenter l''attestation de résidence et la carte d''identité\n3. Remplir le formulaire de demande\n4. Payer les frais\n5. Enquête de moralité (vérification du casier)\n6. Retirer l''attestation après le délai',
 'Parquet de Grande Instance (Gombe pour le centre-ville, Kalamu, Matete, etc. selon la juridiction de résidence).',
 'Durée de validité : généralement 3 mois. Anticiper les délais si c''est pour un dossier de visa. Certaines communes délivrent aussi une attestation au niveau local.',
 ARRAY['bonne vie et moeurs', 'casier judiciaire', 'certificat de bonne conduite', 'moralité', 'bonne conduite'],
 true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;
