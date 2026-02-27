-- =============================================================
-- SEED: FAQ dynamiques par catégorie
-- Questions fréquemment posées par les Kinois
-- =============================================================

INSERT INTO faqs (id, question, reponse, categorie, ordre, actif, created_at, updated_at) VALUES

-- ============ ÉTAT CIVIL ============
(gen_random_uuid(), 'Mon enfant est né il y a plus de 90 jours et je n''ai pas déclaré la naissance. Que faire ?',
 'Passé le délai de 90 jours, vous devez obtenir un jugement supplétif au tribunal de paix de votre commune. Coût estimé: 25 000 FC. Délai: 2-4 semaines. Il vous faudra l''attestation de naissance de la maternité, votre carte d''identité et deux témoins majeurs.',
 'ETAT_CIVIL', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Puis-je obtenir une copie de mon acte de naissance si j''ai perdu l''original ?',
 'Oui. Rendez-vous à la maison communale de votre commune de naissance avec votre carte d''identité. Demandez un extrait d''acte de naissance (copie conforme). Coût: 3 000-5 000 FC. Si les registres ont été détruits, un jugement supplétif sera nécessaire.',
 'ETAT_CIVIL', 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Le mariage coutumier a-t-il une valeur légale en RDC ?',
 'Le mariage coutumier est reconnu mais doit être enregistré à l''état civil pour avoir une pleine valeur juridique. Sans l''enregistrement civil, les droits de succession et de propriété ne sont pas pleinement protégés. Il est fortement recommandé de faire les deux.',
 'ETAT_CIVIL', 3, true, NOW(), NOW()),

(gen_random_uuid(), 'Combien de temps faut-il pour obtenir un passeport congolais ?',
 'Le délai normal est de 2 à 6 semaines. Le passeport coûte 205 USD (passeport ordinaire). Rendez-vous à la DGM (Avenue des Aviateurs, Gombe) avec votre acte de naissance, carte d''identité, 4 photos biométriques et l''attestation de résidence. Un service express existe moyennant un supplément.',
 'ETAT_CIVIL', 4, true, NOW(), NOW()),

(gen_random_uuid(), 'Comment changer le nom sur ma carte d''identité après le mariage ?',
 'Après un mariage, la femme peut ajouter le nom de son époux. Se rendre à la maison communale avec l''acte de mariage, l''ancienne carte d''identité et 4 nouvelles photos. Frais: 15 000 FC environ.',
 'ETAT_CIVIL', 5, true, NOW(), NOW()),

-- ============ SANTÉ ============
(gen_random_uuid(), 'Les vaccins pour les enfants sont-ils gratuits ?',
 'OUI ! Tous les vaccins du Programme Élargi de Vaccination (PEV) sont GRATUITS pour les enfants de 0 à 5 ans. Cela comprend: BCG, Polio, Pentavalent, Pneumo, Rougeole et Fièvre Jaune. Ne payez RIEN pour ces vaccins — si on vous demande de payer, c''est anormal.',
 'SANTE', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Quel est le numéro à appeler en cas d''urgence médicale ?',
 'Composez le 112 (numéro d''urgence national). Si ce numéro ne fonctionne pas, rendez-vous directement aux urgences de l''hôpital le plus proche. Les urgences hospitalières fonctionnent 24h/24 et ne peuvent refuser un patient en danger de mort.',
 'SANTE', 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Combien coûte un accouchement à Kinshasa ?',
 'Les coûts varient selon l''établissement: Centre de santé communautaire: 25 000-50 000 FC. Hôpital général: 50 000-150 000 FC. Clinique privée: 100 000-500 000 FC. Césarienne: 200 000-500 000 FC (public) à 1 000 000+ FC (privé). Préparer un kit d''accouchement à l''avance.',
 'SANTE', 3, true, NOW(), NOW()),

(gen_random_uuid(), 'Où obtenir un certificat médical pour le travail ou le permis ?',
 'Tout hôpital ou centre de santé agréé peut délivrer un certificat médical. Pour le permis de conduire, le médecin doit être agréé par le ministère de la Santé. Coût: 10 000-20 000 FC (consultation + certificat).',
 'SANTE', 4, true, NOW(), NOW()),

-- ============ JUSTICE ============
(gen_random_uuid(), 'Combien de temps le casier judiciaire est-il valide ?',
 'L''extrait de casier judiciaire a une validité de 3 mois. Au-delà, vous devez en demander un nouveau. Se rendre au greffe du TGI avec votre carte d''identité, 2 photos et 10 000 FC.',
 'JUSTICE', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Comment créer une entreprise à Kinshasa ?',
 'Les étapes sont: 1) Immatriculation au RCCM au Tribunal de Commerce (~50 000 FC). 2) Obtention du NIF à la DGI (~20 000 FC). 3) Paiement de la patente à la DGRK (variable). 4) Ouverture d''un compte bancaire professionnel. Délai total: 2-4 semaines.',
 'JUSTICE', 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Puis-je déposer plainte sans avocat ?',
 'Oui, le dépôt de plainte au commissariat est gratuit et ne nécessite pas d''avocat. Pour une action en justice devant le tribunal, un avocat est recommandé mais pas obligatoire. L''aide juridique gratuite existe pour les personnes démunies.',
 'JUSTICE', 3, true, NOW(), NOW()),

-- ============ IMPÔTS ============
(gen_random_uuid(), 'Que risque-t-on si on exerce un commerce sans patente ?',
 'L''exercice d''une activité commerciale sans patente est passible d''amendes et de la fermeture de l''établissement par les inspecteurs. La patente est renouvelable chaque année. Coût: 50 000 FC et plus selon l''activité.',
 'IMPOTS', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Comment obtenir un livret parcellaire (titre de propriété) ?',
 'C''est un processus en 7 étapes: 1) Certificat de vacance (50 000 FC), 2) Contrat notarié, 3) Mesurage par géomètre (75 000 FC), 4) Dépôt au cadastre, 5) Paiement des taxes, 6) Enregistrement, 7) Retrait. Coût total: 500 000-1 000 000 FC. Délai: 3-6 mois.',
 'IMPOTS', 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Faut-il un NIF pour un petit commerce ?',
 'Oui, le NIF est obligatoire pour toute activité économique, même un petit commerce. Il coûte environ 20 000 FC et s''obtient au Centre des Impôts (CDI). Le NIF doit figurer sur toutes vos factures.',
 'IMPOTS', 3, true, NOW(), NOW()),

-- ============ TRANSPORT ============
(gen_random_uuid(), 'Quelles sont les catégories de permis de conduire en RDC ?',
 'Catégorie A: Motocyclettes. Catégorie B: Véhicules légers (voitures). Catégorie C: Poids lourds. Catégorie D: Transport en commun. Le permis B suffit pour les véhicules légers. Coût: ~50 000 FC. Validité: 5 ans.',
 'TRANSPORT', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'La vignette automobile est-elle obligatoire ?',
 'OUI, la vignette est obligatoire pour tout véhicule circulant à Kinshasa. Son absence entraîne une amende et possiblement la mise en fourrière. Coût: 60 000 FC (véhicule léger) à 120 000 FC (camion). À renouveler chaque année au 1er janvier.',
 'TRANSPORT', 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Où faire le contrôle technique de mon véhicule ?',
 'Dans un centre agréé comme TRANSCOM (Avenue des Poids Lourds, Limete). Coût: 30 000 FC. Durée: 1-2 heures. Le contrôle est requis pour renouveler la vignette. Vérifier freins, phares et pneus avant de s''y rendre.',
 'TRANSPORT', 3, true, NOW(), NOW()),

-- ============ SÉCURITÉ ============
(gen_random_uuid(), 'Le dépôt de plainte au commissariat est-il payant ?',
 'NON, le dépôt de plainte est GRATUIT. Si on vous demande de payer pour enregistrer votre plainte, c''est irrégulier. Vous avez droit à une copie du procès-verbal. Demandez-la systématiquement.',
 'SECURITE', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Que faire en cas de perte de sa carte d''identité ?',
 'Étape 1: Se rendre au commissariat pour obtenir une déclaration de perte (5 000 FC). Étape 2: Se rendre au centre d''enrôlement avec la déclaration de perte, l''acte de naissance et des photos. Étape 3: Demander le remplacement (15 000 FC). Délai: 2-4 semaines.',
 'SECURITE', 2, true, NOW(), NOW()),

-- ============ ÉDUCATION ============
(gen_random_uuid(), 'L''école primaire publique est-elle vraiment gratuite ?',
 'OUI, depuis 2019, l''enseignement primaire public est gratuit en RDC. Les parents ne doivent payer aucun frais scolaire (minerval). Si une école publique primaire vous demande des frais, signalez-le à l''Inspection de l''enseignement.',
 'EDUCATION', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Comment faire reconnaître un diplôme étranger en RDC ?',
 'Déposer une demande d''équivalence au Ministère de l''Enseignement Supérieur. Documents: diplôme original, relevés de notes, acte de naissance, traduction certifiée (si nécessaire). Coût: ~50 000 FC. Délai: 1-3 mois.',
 'EDUCATION', 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Quand ont lieu les inscriptions à l''université ?',
 'Les inscriptions universitaires se font généralement entre septembre et novembre. Les universités publiques (UNIKIN, UPN, ISTA) ont leurs propres calendriers. Frais: 200-800 USD/an selon l''université et la filière.',
 'EDUCATION', 3, true, NOW(), NOW()),

-- ============ SOCIAL ============
(gen_random_uuid(), 'Mon employeur ne m''a pas inscrit à l''INSS. Que faire ?',
 'L''inscription à l''INSS est une obligation de l''employeur. Vous pouvez: 1) Demander à votre employeur de régulariser. 2) Signaler à l''Inspection du travail. 3) Se rendre à l''INSS pour vérifier votre situation. L''employeur risque des sanctions.',
 'SOCIAL', 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Comment obtenir une aide sociale si je suis sans emploi ?',
 'Rendez-vous au bureau communal des affaires sociales avec votre carte d''identité et une attestation du chef de quartier. Un travailleur social évaluera votre situation et vous orientera vers les services ou ONG appropriés.',
 'SOCIAL', 2, true, NOW(), NOW()),

-- ============ QUESTIONS GÉNÉRALES (pas de catégorie) ============
(gen_random_uuid(), 'Quels sont les prix officiels des démarches administratives ?',
 'Kin Services affiche les prix officiels de chaque démarche. Si on vous demande un montant supérieur, c''est potentiellement de la corruption. Vous pouvez signaler tout abus via notre fonction "Signaler un problème".',
 NULL, 1, true, NOW(), NOW()),

(gen_random_uuid(), 'Comment signaler un cas de corruption ?',
 'Utilisez la fonction "Signaler" de Kin Services en sélectionnant le type "Corruption". Indiquez le lieu, la date, le montant demandé vs le prix officiel. Vous pouvez aussi contacter la Cour des comptes ou la Commission de lutte contre la corruption.',
 NULL, 2, true, NOW(), NOW()),

(gen_random_uuid(), 'Où se trouvent les maisons communales de Kinshasa ?',
 'Chaque commune de Kinshasa (24 au total) dispose de sa maison communale, généralement située sur l''avenue principale de la commune. Consultez la section "Communes" de Kin Services pour les adresses exactes et les contacts.',
 NULL, 3, true, NOW(), NOW()),

(gen_random_uuid(), 'Kin Services est-il un service officiel du gouvernement ?',
 'Kin Services est une plateforme d''information citoyenne indépendante. Nous compilons les informations officielles des services publics de Kinshasa pour faciliter l''accès à l''information. Les prix et procédures indiqués sont basés sur les tarifs officiels.',
 NULL, 4, true, NOW(), NOW());
