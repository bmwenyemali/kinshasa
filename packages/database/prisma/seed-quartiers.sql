-- Update quartier details with population estimates, chef de quartier, and reference addresses
-- Based on the 24 communes of Kinshasa and their known quartiers

-- BANDALUNGWA (6 quartiers)
UPDATE quartiers SET population = 42000, chef_quartier = 'Chef Mukoko Jean-Pierre', reference_adresse = 'Près du marché de Bandalungwa' WHERE name = 'Adoula' AND commune_id = (SELECT id FROM communes WHERE name = 'Bandalungwa');
UPDATE quartiers SET population = 38000, chef_quartier = 'Chef Kasongo Marie', reference_adresse = 'En face de l''école EP Bandalungwa' WHERE name = 'Bisengo' AND commune_id = (SELECT id FROM communes WHERE name = 'Bandalungwa');
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Lumbala Patrick', reference_adresse = 'Avenue Kikwit, coin rue des écoles' WHERE name = 'Camps Luka' AND commune_id = (SELECT id FROM communes WHERE name = 'Bandalungwa');
UPDATE quartiers SET population = 41000, chef_quartier = 'Chef Ngalula Sophie', reference_adresse = 'Rond-point Kimbaseke' WHERE name = 'Lingwala' AND commune_id = (SELECT id FROM communes WHERE name = 'Bandalungwa');
UPDATE quartiers SET population = 39000, chef_quartier = 'Chef Mbuyi Robert', reference_adresse = 'Près de la paroisse Saint-Joseph' WHERE name = 'Luka' AND commune_id = (SELECT id FROM communes WHERE name = 'Bandalungwa');
UPDATE quartiers SET population = 37000, chef_quartier = 'Chef Tshimanga David', reference_adresse = 'Avenue Victoire, à côté du stade' WHERE name = 'Makelele' AND commune_id = (SELECT id FROM communes WHERE name = 'Bandalungwa');

-- BARUMBU (6 quartiers)
UPDATE quartiers SET population = 28000, chef_quartier = 'Chef Kabamba Paul', reference_adresse = 'Près du marché central' WHERE name = 'Barumbu' AND commune_id = (SELECT id FROM communes WHERE name = 'Barumbu');
UPDATE quartiers SET population = 25000, chef_quartier = 'Chef Mutamba Cécile', reference_adresse = 'Avenue Bokasa, coin dispensaire' WHERE name = 'Boyoma' AND commune_id = (SELECT id FROM communes WHERE name = 'Barumbu');
UPDATE quartiers SET population = 30000, chef_quartier = 'Chef Lukusa Pierre', reference_adresse = 'Boulevard du 30 Juin Est' WHERE name = 'Centre' AND commune_id = (SELECT id FROM communes WHERE name = 'Barumbu');
UPDATE quartiers SET population = 26000, chef_quartier = 'Chef Nzita Marie-Claire', reference_adresse = 'Près de la mosquée de Barumbu' WHERE name = 'Mongo' AND commune_id = (SELECT id FROM communes WHERE name = 'Barumbu');
UPDATE quartiers SET population = 32000, chef_quartier = 'Chef Kabuya Joseph', reference_adresse = 'Avenue des Aviateurs' WHERE name = 'Ngiri' AND commune_id = (SELECT id FROM communes WHERE name = 'Barumbu');
UPDATE quartiers SET population = 27000, chef_quartier = 'Chef Mwenze Sylvie', reference_adresse = 'Coin avenue Mushie' WHERE name = 'Zaire' AND commune_id = (SELECT id FROM communes WHERE name = 'Barumbu');

-- BUMBU (6 quartiers)
UPDATE quartiers SET population = 52000, chef_quartier = 'Chef Kalala Simon', reference_adresse = 'Avenue Kimbangu, près du marché' WHERE name = 'Bumbu' AND commune_id = (SELECT id FROM communes WHERE name = 'Bumbu');
UPDATE quartiers SET population = 48000, chef_quartier = 'Chef Mujinga Rachel', reference_adresse = 'Coin avenue de la Libération' WHERE name = 'Camp Kabila' AND commune_id = (SELECT id FROM communes WHERE name = 'Bumbu');
UPDATE quartiers SET population = 45000, chef_quartier = 'Chef Nkongolo Albert', reference_adresse = 'Près de l''église kimbanguiste' WHERE name = 'Libération' AND commune_id = (SELECT id FROM communes WHERE name = 'Bumbu');
UPDATE quartiers SET population = 50000, chef_quartier = 'Chef Kabwika Thérèse', reference_adresse = 'Avenue Kabambare' WHERE name = 'Mongala' AND commune_id = (SELECT id FROM communes WHERE name = 'Bumbu');
UPDATE quartiers SET population = 47000, chef_quartier = 'Chef Tshibangu Michel', reference_adresse = 'Rond-point Ngaba nord' WHERE name = 'Salongo' AND commune_id = (SELECT id FROM communes WHERE name = 'Bumbu');
UPDATE quartiers SET population = 43000, chef_quartier = 'Chef Kapinga Rose', reference_adresse = 'Coin rue du commerce' WHERE name = 'Tshimanga' AND commune_id = (SELECT id FROM communes WHERE name = 'Bumbu');

-- GOMBE (6 quartiers)
UPDATE quartiers SET population = 15000, chef_quartier = 'Chef Ongombe Charles', reference_adresse = 'Boulevard du 30 Juin, secteur ministères' WHERE name = 'Centre-Ville' AND commune_id = (SELECT id FROM communes WHERE name = 'Gombe');
UPDATE quartiers SET population = 12000, chef_quartier = 'Chef Bolangi Francine', reference_adresse = 'Avenue des Nations Unies' WHERE name = 'Golf' AND commune_id = (SELECT id FROM communes WHERE name = 'Gombe');
UPDATE quartiers SET population = 18000, chef_quartier = 'Chef Lokoto Fred', reference_adresse = 'Near Hôtel Memling' WHERE name = 'Haut-Commandement' AND commune_id = (SELECT id FROM communes WHERE name = 'Gombe');
UPDATE quartiers SET population = 10000, chef_quartier = 'Chef Bikela Mireille', reference_adresse = 'Près ambassade de France' WHERE name = 'Cliniques' AND commune_id = (SELECT id FROM communes WHERE name = 'Gombe');
UPDATE quartiers SET population = 14000, chef_quartier = 'Chef Mampasi Georges', reference_adresse = 'Avenue Colonel Lukusa' WHERE name = 'Socimat' AND commune_id = (SELECT id FROM communes WHERE name = 'Gombe');
UPDATE quartiers SET population = 11000, chef_quartier = 'Chef Ngandu Solange', reference_adresse = 'Boulevard Tshatshi' WHERE name = 'Colline' AND commune_id = (SELECT id FROM communes WHERE name = 'Gombe');

-- KALAMU (6 quartiers)
UPDATE quartiers SET population = 55000, chef_quartier = 'Chef Mutombo Didier', reference_adresse = 'Avenue Kabinda, marché Gambela' WHERE name = 'Bongolo' AND commune_id = (SELECT id FROM communes WHERE name = 'Kalamu');
UPDATE quartiers SET population = 48000, chef_quartier = 'Chef Kabongo Pascale', reference_adresse = 'Près du stade des Martyrs' WHERE name = 'Kauka' AND commune_id = (SELECT id FROM communes WHERE name = 'Kalamu');
UPDATE quartiers SET population = 52000, chef_quartier = 'Chef Lukusa Étienne', reference_adresse = 'Avenue Kabambare' WHERE name = 'Kimbangu' AND commune_id = (SELECT id FROM communes WHERE name = 'Kalamu');
UPDATE quartiers SET population = 46000, chef_quartier = 'Chef Nsimba Béatrice', reference_adresse = 'Rond-point Victoire' WHERE name = 'Matonge' AND commune_id = (SELECT id FROM communes WHERE name = 'Kalamu');
UPDATE quartiers SET population = 50000, chef_quartier = 'Chef Mputu Roger', reference_adresse = 'Avenue de la Victoire' WHERE name = 'Pinzi' AND commune_id = (SELECT id FROM communes WHERE name = 'Kalamu');
UPDATE quartiers SET population = 44000, chef_quartier = 'Chef Kalombo Christine', reference_adresse = 'Coin Yolo sud' WHERE name = 'Yolo-Sud' AND commune_id = (SELECT id FROM communes WHERE name = 'Kalamu');

-- KASA-VUBU (6 quartiers)
UPDATE quartiers SET population = 42000, chef_quartier = 'Chef Nkumu André', reference_adresse = 'Avenue de la Victoire, section A' WHERE name = 'ANC' AND commune_id = (SELECT id FROM communes WHERE name = 'Kasa-Vubu');
UPDATE quartiers SET population = 38000, chef_quartier = 'Chef Bafunyama Jeanne', reference_adresse = 'Près du grand marché' WHERE name = 'Byela' AND commune_id = (SELECT id FROM communes WHERE name = 'Kasa-Vubu');
UPDATE quartiers SET population = 40000, chef_quartier = 'Chef Dikanga Marcel', reference_adresse = 'Avenue Flambeau' WHERE name = 'Kasa-Vubu' AND commune_id = (SELECT id FROM communes WHERE name = 'Kasa-Vubu');
UPDATE quartiers SET population = 36000, chef_quartier = 'Chef Munganga Béa', reference_adresse = 'Coin avenue Kasa-Vubu' WHERE name = 'Lumumba' AND commune_id = (SELECT id FROM communes WHERE name = 'Kasa-Vubu');
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Ntumba Vital', reference_adresse = 'Près de l''école' WHERE name = 'Sinatra' AND commune_id = (SELECT id FROM communes WHERE name = 'Kasa-Vubu');
UPDATE quartiers SET population = 37000, chef_quartier = 'Chef Kabwe Colette', reference_adresse = 'Quartier résidentiel nord' WHERE name = 'Yandongi' AND commune_id = (SELECT id FROM communes WHERE name = 'Kasa-Vubu');

-- KIMBANSEKE (6 quartiers)
UPDATE quartiers SET population = 120000, chef_quartier = 'Chef Mbaya François', reference_adresse = 'Avenue Ndjili centrale' WHERE name = 'Kimbanseke' AND commune_id = (SELECT id FROM communes WHERE name = 'Kimbanseke');
UPDATE quartiers SET population = 95000, chef_quartier = 'Chef Muteba Joséphine', reference_adresse = 'Route de Kinkole' WHERE name = 'Mikonga' AND commune_id = (SELECT id FROM communes WHERE name = 'Kimbanseke');
UPDATE quartiers SET population = 85000, chef_quartier = 'Chef Kasanda Emmanuel', reference_adresse = 'Coin avenue de la Paix' WHERE name = 'Mushie' AND commune_id = (SELECT id FROM communes WHERE name = 'Kimbanseke');
UPDATE quartiers SET population = 110000, chef_quartier = 'Chef Ngalula Patience', reference_adresse = 'Marché de Kimbanseke' WHERE name = 'Nsanga' AND commune_id = (SELECT id FROM communes WHERE name = 'Kimbanseke');
UPDATE quartiers SET population = 90000, chef_quartier = 'Chef Tshilumba Serge', reference_adresse = 'Avenue de la Rivière' WHERE name = 'Punda' AND commune_id = (SELECT id FROM communes WHERE name = 'Kimbanseke');
UPDATE quartiers SET population = 105000, chef_quartier = 'Chef Kabila Monique', reference_adresse = 'Terminus Kimbanseke' WHERE name = 'Salongo' AND commune_id = (SELECT id FROM communes WHERE name = 'Kimbanseke');

-- KINSHASA (commune - 6 quartiers)
UPDATE quartiers SET population = 22000, chef_quartier = 'Chef Bola Gabriel', reference_adresse = 'Coin avenue de la Gare' WHERE name = 'Bakongo' AND commune_id = (SELECT id FROM communes WHERE name = 'Kinshasa');
UPDATE quartiers SET population = 18000, chef_quartier = 'Chef Mwana Jocelyne', reference_adresse = 'Près de la cathédrale' WHERE name = 'Katanga' AND commune_id = (SELECT id FROM communes WHERE name = 'Kinshasa');
UPDATE quartiers SET population = 25000, chef_quartier = 'Chef Lubamba Patrick', reference_adresse = 'Avenue Kasa-Vubu nord' WHERE name = 'Kinshasa' AND commune_id = (SELECT id FROM communes WHERE name = 'Kinshasa');
UPDATE quartiers SET population = 20000, chef_quartier = 'Chef Ngimbi Thérèse', reference_adresse = 'Marché de Kinshasa' WHERE name = 'Lubudi' AND commune_id = (SELECT id FROM communes WHERE name = 'Kinshasa');
UPDATE quartiers SET population = 19000, chef_quartier = 'Chef Kabange Dieudonné', reference_adresse = 'Avenue de la Libération' WHERE name = 'Ngombe' AND commune_id = (SELECT id FROM communes WHERE name = 'Kinshasa');
UPDATE quartiers SET population = 21000, chef_quartier = 'Chef Mushiya Carine', reference_adresse = 'Coin place du marché' WHERE name = 'Kimpwanza' AND commune_id = (SELECT id FROM communes WHERE name = 'Kinshasa');

-- KINTAMBO (6 quartiers)
UPDATE quartiers SET population = 32000, chef_quartier = 'Chef Lendo Benjamin', reference_adresse = 'Avenue de Kintambo, marché central' WHERE name = 'Bayaka' AND commune_id = (SELECT id FROM communes WHERE name = 'Kintambo');
UPDATE quartiers SET population = 28000, chef_quartier = 'Chef Mafuta Rose', reference_adresse = 'Près du fleuve Congo' WHERE name = 'Jamaïque' AND commune_id = (SELECT id FROM communes WHERE name = 'Kintambo');
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Monga Claude', reference_adresse = 'Avenue du Petit Pont' WHERE name = 'Kintambo' AND commune_id = (SELECT id FROM communes WHERE name = 'Kintambo');
UPDATE quartiers SET population = 30000, chef_quartier = 'Chef Tshikala Marguerite', reference_adresse = 'Quartier résidentiel ouest' WHERE name = 'Lukunga' AND commune_id = (SELECT id FROM communes WHERE name = 'Kintambo');
UPDATE quartiers SET population = 27000, chef_quartier = 'Chef Nkashama Prosper', reference_adresse = 'Coin usine Utexafrica' WHERE name = 'Mukulua' AND commune_id = (SELECT id FROM communes WHERE name = 'Kintambo');
UPDATE quartiers SET population = 29000, chef_quartier = 'Chef Banza Félicité', reference_adresse = 'Près de la gare de Kintambo' WHERE name = 'Tomba' AND commune_id = (SELECT id FROM communes WHERE name = 'Kintambo');

-- KISENSO (6 quartiers)
UPDATE quartiers SET population = 65000, chef_quartier = 'Chef Kabongo Justin', reference_adresse = 'Avenue principale Kisenso' WHERE name = 'Kisenso' AND commune_id = (SELECT id FROM communes WHERE name = 'Kisenso');
UPDATE quartiers SET population = 58000, chef_quartier = 'Chef Mumba Geneviève', reference_adresse = 'Route de la colline' WHERE name = 'Kingabua' AND commune_id = (SELECT id FROM communes WHERE name = 'Kisenso');
UPDATE quartiers SET population = 55000, chef_quartier = 'Chef Tshimungu Fabrice', reference_adresse = 'Marché de Kisenso' WHERE name = 'Mfidi' AND commune_id = (SELECT id FROM communes WHERE name = 'Kisenso');
UPDATE quartiers SET population = 62000, chef_quartier = 'Chef Nkala Béatrice', reference_adresse = 'Près de l''école primaire' WHERE name = 'Mission' AND commune_id = (SELECT id FROM communes WHERE name = 'Kisenso');
UPDATE quartiers SET population = 51000, chef_quartier = 'Chef Kabeya Thomas', reference_adresse = 'Avenue de la Rivière' WHERE name = 'Ndanu' AND commune_id = (SELECT id FROM communes WHERE name = 'Kisenso');
UPDATE quartiers SET population = 60000, chef_quartier = 'Chef Luvualu Emerance', reference_adresse = 'Coin quartier collinaire' WHERE name = 'Revolution' AND commune_id = (SELECT id FROM communes WHERE name = 'Kisenso');

-- LEMBA (6 quartiers)
UPDATE quartiers SET population = 48000, chef_quartier = 'Chef Kayembe André', reference_adresse = 'Avenue de l''Université' WHERE name = 'Lemba' AND commune_id = (SELECT id FROM communes WHERE name = 'Lemba');
UPDATE quartiers SET population = 42000, chef_quartier = 'Chef Ntumba Marie', reference_adresse = 'Rond-point UNIKIN' WHERE name = 'Livulu' AND commune_id = (SELECT id FROM communes WHERE name = 'Lemba');
UPDATE quartiers SET population = 45000, chef_quartier = 'Chef Mukendi Paul', reference_adresse = 'Avenue Nguma' WHERE name = 'Mateba' AND commune_id = (SELECT id FROM communes WHERE name = 'Lemba');
UPDATE quartiers SET population = 40000, chef_quartier = 'Chef Mulumba Colette', reference_adresse = 'Quartier résidentiel est' WHERE name = 'Mosala' AND commune_id = (SELECT id FROM communes WHERE name = 'Lemba');
UPDATE quartiers SET population = 38000, chef_quartier = 'Chef Kasongo Victor', reference_adresse = 'Coin marché Lemba' WHERE name = 'Righini' AND commune_id = (SELECT id FROM communes WHERE name = 'Lemba');
UPDATE quartiers SET population = 43000, chef_quartier = 'Chef Kabila Justine', reference_adresse = 'Avenue du Plateau' WHERE name = 'Salongo' AND commune_id = (SELECT id FROM communes WHERE name = 'Lemba');

-- LIMETE (6 quartiers)
UPDATE quartiers SET population = 55000, chef_quartier = 'Chef Mpangala Robert', reference_adresse = 'Avenue des Poids Lourds' WHERE name = 'Funa' AND commune_id = (SELECT id FROM communes WHERE name = 'Limete');
UPDATE quartiers SET population = 48000, chef_quartier = 'Chef Mwamba Jeannette', reference_adresse = 'Coin échangeur Limete' WHERE name = 'Kingabwa' AND commune_id = (SELECT id FROM communes WHERE name = 'Limete');
UPDATE quartiers SET population = 52000, chef_quartier = 'Chef Tshisekedi Daniel', reference_adresse = 'Avenue By-Pass' WHERE name = 'Limete' AND commune_id = (SELECT id FROM communes WHERE name = 'Limete');
UPDATE quartiers SET population = 45000, chef_quartier = 'Chef Kanyinda Clarisse', reference_adresse = 'Résidentiel Limete' WHERE name = 'Mombele' AND commune_id = (SELECT id FROM communes WHERE name = 'Limete');
UPDATE quartiers SET population = 50000, chef_quartier = 'Chef Ngandu Félix', reference_adresse = 'Avenue des Industries' WHERE name = 'Ndanu' AND commune_id = (SELECT id FROM communes WHERE name = 'Limete');
UPDATE quartiers SET population = 47000, chef_quartier = 'Chef Bapuya Rose', reference_adresse = 'Quartier industriel Limete' WHERE name = 'Résidentiel' AND commune_id = (SELECT id FROM communes WHERE name = 'Limete');

-- LINGWALA (6 quartiers)
UPDATE quartiers SET population = 18000, chef_quartier = 'Chef Lele François', reference_adresse = 'Avenue Tombalbaye' WHERE name = 'Buchanan' AND commune_id = (SELECT id FROM communes WHERE name = 'Lingwala');
UPDATE quartiers SET population = 22000, chef_quartier = 'Chef Manzila Brigitte', reference_adresse = 'Coin avenue des Fleurs' WHERE name = 'Congo' AND commune_id = (SELECT id FROM communes WHERE name = 'Lingwala');
UPDATE quartiers SET population = 20000, chef_quartier = 'Chef Lokondo Samuel', reference_adresse = 'Près du stade Tata Raphaël' WHERE name = 'Lingwala' AND commune_id = (SELECT id FROM communes WHERE name = 'Lingwala');
UPDATE quartiers SET population = 16000, chef_quartier = 'Chef Bonganga Suzanne', reference_adresse = 'Avenue des Sciences' WHERE name = 'Lisala' AND commune_id = (SELECT id FROM communes WHERE name = 'Lingwala');
UPDATE quartiers SET population = 19000, chef_quartier = 'Chef Ekofo Pierre', reference_adresse = 'Quartier résidentiel' WHERE name = 'Mfumu' AND commune_id = (SELECT id FROM communes WHERE name = 'Lingwala');
UPDATE quartiers SET population = 17000, chef_quartier = 'Chef Lileko Marie', reference_adresse = 'Coin dispensaire' WHERE name = 'Mongala' AND commune_id = (SELECT id FROM communes WHERE name = 'Lingwala');

-- MAKALA (6 quartiers)
UPDATE quartiers SET population = 58000, chef_quartier = 'Chef Kabongo Marcel', reference_adresse = 'Avenue Luambo Makiadi' WHERE name = 'Makala' AND commune_id = (SELECT id FROM communes WHERE name = 'Makala');
UPDATE quartiers SET population = 52000, chef_quartier = 'Chef Ngwala Berthe', reference_adresse = 'Marché de Makala' WHERE name = 'Bongolo' AND commune_id = (SELECT id FROM communes WHERE name = 'Makala');
UPDATE quartiers SET population = 55000, chef_quartier = 'Chef Mulamba Jean', reference_adresse = 'Coin école Saint-André' WHERE name = 'Luyi' AND commune_id = (SELECT id FROM communes WHERE name = 'Makala');
UPDATE quartiers SET population = 49000, chef_quartier = 'Chef Kabila Thérèse', reference_adresse = 'Route de Selembao' WHERE name = 'Nsimba' AND commune_id = (SELECT id FROM communes WHERE name = 'Makala');
UPDATE quartiers SET population = 54000, chef_quartier = 'Chef Tshilumba Pierre', reference_adresse = 'Avenue principale' WHERE name = 'Ngafani' AND commune_id = (SELECT id FROM communes WHERE name = 'Makala');
UPDATE quartiers SET population = 50000, chef_quartier = 'Chef Kasole Florence', reference_adresse = 'Quartier commercial' WHERE name = 'Yolo' AND commune_id = (SELECT id FROM communes WHERE name = 'Makala');

-- MALUKU (6 quartiers)
UPDATE quartiers SET population = 15000, chef_quartier = 'Chef Kikwanga Auguste', reference_adresse = 'Centre de Maluku' WHERE name = 'Maluku Centre' AND commune_id = (SELECT id FROM communes WHERE name = 'Maluku');
UPDATE quartiers SET population = 8000, chef_quartier = 'Chef Nzuzi Marie', reference_adresse = 'Route nationale Maluku' WHERE name = 'Kinkole' AND commune_id = (SELECT id FROM communes WHERE name = 'Maluku');
UPDATE quartiers SET population = 6000, chef_quartier = 'Chef Mbemba Dieudonné', reference_adresse = 'Bord du fleuve' WHERE name = 'Mongata' AND commune_id = (SELECT id FROM communes WHERE name = 'Maluku');
UPDATE quartiers SET population = 12000, chef_quartier = 'Chef Lukusa Martine', reference_adresse = 'Carrefour Maluku' WHERE name = 'Nsanda' AND commune_id = (SELECT id FROM communes WHERE name = 'Maluku');
UPDATE quartiers SET population = 5000, chef_quartier = 'Chef Nkumba Victor', reference_adresse = 'Zone agricole' WHERE name = 'Dingi Dingi' AND commune_id = (SELECT id FROM communes WHERE name = 'Maluku');
UPDATE quartiers SET population = 7000, chef_quartier = 'Chef Kiyangala Émilie', reference_adresse = 'Village Mpasa' WHERE name = 'Mpasa' AND commune_id = (SELECT id FROM communes WHERE name = 'Maluku');

-- MASINA (6 quartiers)
UPDATE quartiers SET population = 75000, chef_quartier = 'Chef Banza Papy', reference_adresse = 'Avenue Luambo principale' WHERE name = 'Masina' AND commune_id = (SELECT id FROM communes WHERE name = 'Masina');
UPDATE quartiers SET population = 68000, chef_quartier = 'Chef Ngalula Sonia', reference_adresse = 'Pont Matete-Masina' WHERE name = 'Mapela' AND commune_id = (SELECT id FROM communes WHERE name = 'Masina');
UPDATE quartiers SET population = 72000, chef_quartier = 'Chef Kalombo Augustin', reference_adresse = 'Marché de Masina' WHERE name = 'Peti-Peti' AND commune_id = (SELECT id FROM communes WHERE name = 'Masina');
UPDATE quartiers SET population = 65000, chef_quartier = 'Chef Mbuyi Véronique', reference_adresse = 'Route de Ndjili' WHERE name = 'Sans-Fil' AND commune_id = (SELECT id FROM communes WHERE name = 'Masina');
UPDATE quartiers SET population = 60000, chef_quartier = 'Chef Tshipa Richard', reference_adresse = 'Quartier nord' WHERE name = 'Siforco' AND commune_id = (SELECT id FROM communes WHERE name = 'Masina');
UPDATE quartiers SET population = 70000, chef_quartier = 'Chef Kapinga Charlotte', reference_adresse = 'Coin avenue de la Liberté' WHERE name = 'Tshangu' AND commune_id = (SELECT id FROM communes WHERE name = 'Masina');

-- MATETE (6 quartiers)
UPDATE quartiers SET population = 45000, chef_quartier = 'Chef Mukendi Henri', reference_adresse = 'Avenue Pierre Mulele' WHERE name = 'Matete' AND commune_id = (SELECT id FROM communes WHERE name = 'Matete');
UPDATE quartiers SET population = 40000, chef_quartier = 'Chef Kabwika Solange', reference_adresse = 'Marché de Matete' WHERE name = 'Anuarite' AND commune_id = (SELECT id FROM communes WHERE name = 'Matete');
UPDATE quartiers SET population = 42000, chef_quartier = 'Chef Ngandu Emmanuel', reference_adresse = 'Coin école ITAV' WHERE name = 'Herady' AND commune_id = (SELECT id FROM communes WHERE name = 'Matete');
UPDATE quartiers SET population = 38000, chef_quartier = 'Chef Mwamba Espérance', reference_adresse = 'Avenue du Progrès' WHERE name = 'Ngufu' AND commune_id = (SELECT id FROM communes WHERE name = 'Matete');
UPDATE quartiers SET population = 43000, chef_quartier = 'Chef Lumumba Patrick', reference_adresse = 'Quartier sud' WHERE name = 'Sango' AND commune_id = (SELECT id FROM communes WHERE name = 'Matete');
UPDATE quartiers SET population = 36000, chef_quartier = 'Chef Bampika Rosalie', reference_adresse = 'Coin stade de Matete' WHERE name = 'Tshiala' AND commune_id = (SELECT id FROM communes WHERE name = 'Matete');

-- MONT-NGAFULA (6 quartiers)
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Nkulu Paul', reference_adresse = 'Avenue principale Mont-Ngafula' WHERE name = 'Mont-Ngafula' AND commune_id = (SELECT id FROM communes WHERE name = 'Mont-Ngafula');
UPDATE quartiers SET population = 28000, chef_quartier = 'Chef Mukonga Angélique', reference_adresse = 'Route de Kimwenza' WHERE name = 'Kimwenza' AND commune_id = (SELECT id FROM communes WHERE name = 'Mont-Ngafula');
UPDATE quartiers SET population = 22000, chef_quartier = 'Chef Tshimanga Daniel', reference_adresse = 'Quartier universitaire' WHERE name = 'Kindele' AND commune_id = (SELECT id FROM communes WHERE name = 'Mont-Ngafula');
UPDATE quartiers SET population = 25000, chef_quartier = 'Chef Kabila Patricia', reference_adresse = 'Zone résidentielle Lutendele' WHERE name = 'Lutendele' AND commune_id = (SELECT id FROM communes WHERE name = 'Mont-Ngafula');
UPDATE quartiers SET population = 30000, chef_quartier = 'Chef Mafuta Bernard', reference_adresse = 'Avenue du marché' WHERE name = 'Mama Yemo' AND commune_id = (SELECT id FROM communes WHERE name = 'Mont-Ngafula');
UPDATE quartiers SET population = 20000, chef_quartier = 'Chef Lukusa Vérité', reference_adresse = 'Zone forestière ouest' WHERE name = 'Ngansele' AND commune_id = (SELECT id FROM communes WHERE name = 'Mont-Ngafula');

-- NDJILI (6 quartiers)
UPDATE quartiers SET population = 62000, chef_quartier = 'Chef Mulako Martin', reference_adresse = 'Avenue Ndjili principale' WHERE name = 'Ndjili' AND commune_id = (SELECT id FROM communes WHERE name = 'Ndjili');
UPDATE quartiers SET population = 55000, chef_quartier = 'Chef Kanyinda Béatrice', reference_adresse = 'Près de l''aéroport' WHERE name = 'Cecomaf' AND commune_id = (SELECT id FROM communes WHERE name = 'Ndjili');
UPDATE quartiers SET population = 58000, chef_quartier = 'Chef Tshisekedi Roland', reference_adresse = 'Marché de Ndjili' WHERE name = 'Kikwit' AND commune_id = (SELECT id FROM communes WHERE name = 'Ndjili');
UPDATE quartiers SET population = 52000, chef_quartier = 'Chef Ngalula Florence', reference_adresse = 'Avenue de l''Indépendance' WHERE name = 'Mpasa' AND commune_id = (SELECT id FROM communes WHERE name = 'Ndjili');
UPDATE quartiers SET population = 48000, chef_quartier = 'Chef Mbuyi Serge', reference_adresse = 'Coin avenue aéroport' WHERE name = 'Saio' AND commune_id = (SELECT id FROM communes WHERE name = 'Ndjili');
UPDATE quartiers SET population = 56000, chef_quartier = 'Chef Kabwika Jeanne', reference_adresse = 'Quartier résidentiel est' WHERE name = 'Tshangu' AND commune_id = (SELECT id FROM communes WHERE name = 'Ndjili');

-- NGABA (6 quartiers)
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Mukendi Dieudonné', reference_adresse = 'Avenue du Commerce principale' WHERE name = 'Ngaba' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaba');
UPDATE quartiers SET population = 30000, chef_quartier = 'Chef Kasongo Christine', reference_adresse = 'Coin marché Ngaba' WHERE name = 'Bantantu' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaba');
UPDATE quartiers SET population = 32000, chef_quartier = 'Chef Tshilumba Marie', reference_adresse = 'Avenue Kasa-Vubu sud' WHERE name = 'Kalunga' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaba');
UPDATE quartiers SET population = 28000, chef_quartier = 'Chef Kabamba Fabien', reference_adresse = 'Quartier sud' WHERE name = 'Matadi Mayo' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaba');
UPDATE quartiers SET population = 33000, chef_quartier = 'Chef Luvualu Solange', reference_adresse = 'Route de Lemba' WHERE name = 'Mbuku' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaba');
UPDATE quartiers SET population = 29000, chef_quartier = 'Chef Nkongolo Richard', reference_adresse = 'Coin école publique' WHERE name = 'Ngiri-Ngiri' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaba');

-- NGALIEMA (6 quartiers)
UPDATE quartiers SET population = 30000, chef_quartier = 'Chef Lumumba Roger', reference_adresse = 'Avenue du Mont Amba' WHERE name = 'Ngaliema' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaliema');
UPDATE quartiers SET population = 25000, chef_quartier = 'Chef Malonga Monique', reference_adresse = 'Quartier Ma Campagne' WHERE name = 'Binza' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaliema');
UPDATE quartiers SET population = 22000, chef_quartier = 'Chef Mfumu Patrick', reference_adresse = 'Avenue Meteo' WHERE name = 'Joli Parc' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaliema');
UPDATE quartiers SET population = 28000, chef_quartier = 'Chef Kinkela Joséphine', reference_adresse = 'Route de Matadi' WHERE name = 'Kinsuka' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaliema');
UPDATE quartiers SET population = 20000, chef_quartier = 'Chef Ngoma Albert', reference_adresse = 'Coin paroisse Saint-Laurent' WHERE name = 'Lonzo' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaliema');
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Mbuta Claire', reference_adresse = 'Quartier résidentiel nord' WHERE name = 'Ma Campagne' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngaliema');

-- NGIRI-NGIRI (6 quartiers)
UPDATE quartiers SET population = 42000, chef_quartier = 'Chef Kamwanya Pierre', reference_adresse = 'Avenue Assossa' WHERE name = 'Ngiri-Ngiri' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri');
UPDATE quartiers SET population = 38000, chef_quartier = 'Chef Mbuyi Rose', reference_adresse = 'Coin avenue du Progrès' WHERE name = 'Balaka' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri');
UPDATE quartiers SET population = 40000, chef_quartier = 'Chef Tshisekedi David', reference_adresse = 'Près du dispensaire' WHERE name = 'Bumba' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri');
UPDATE quartiers SET population = 36000, chef_quartier = 'Chef Kabamba Cécile', reference_adresse = 'Avenue de la Victoire' WHERE name = 'Gambela' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri');
UPDATE quartiers SET population = 35000, chef_quartier = 'Chef Ngandu Marc', reference_adresse = 'Coin école primaire' WHERE name = 'Lufungula' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri');
UPDATE quartiers SET population = 37000, chef_quartier = 'Chef Kabeya Florence', reference_adresse = 'Quartier central' WHERE name = 'Mukongo' AND commune_id = (SELECT id FROM communes WHERE name = 'Ngiri-Ngiri');

-- NSELE (6 quartiers)
UPDATE quartiers SET population = 25000, chef_quartier = 'Chef Nzambi Daniel', reference_adresse = 'Avenue de la Nsele' WHERE name = 'Nsele' AND commune_id = (SELECT id FROM communes WHERE name = 'Nsele');
UPDATE quartiers SET population = 18000, chef_quartier = 'Chef Mikosa Béatrice', reference_adresse = 'Zone industrielle' WHERE name = 'Bibwa' AND commune_id = (SELECT id FROM communes WHERE name = 'Nsele');
UPDATE quartiers SET population = 15000, chef_quartier = 'Chef Kambamba Paul', reference_adresse = 'Route de Kinkole' WHERE name = 'Kinkole' AND commune_id = (SELECT id FROM communes WHERE name = 'Nsele');
UPDATE quartiers SET population = 20000, chef_quartier = 'Chef Makila Sophie', reference_adresse = 'Centre Nsele' WHERE name = 'Mikonga' AND commune_id = (SELECT id FROM communes WHERE name = 'Nsele');
UPDATE quartiers SET population = 12000, chef_quartier = 'Chef Tumba Michel', reference_adresse = 'Zone rurale est' WHERE name = 'Mpasa' AND commune_id = (SELECT id FROM communes WHERE name = 'Nsele');
UPDATE quartiers SET population = 22000, chef_quartier = 'Chef Ngoma Clarisse', reference_adresse = 'Quartier résidentiel Nsele' WHERE name = 'Tshangu' AND commune_id = (SELECT id FROM communes WHERE name = 'Nsele');

-- SELEMBAO (6 quartiers)
UPDATE quartiers SET population = 48000, chef_quartier = 'Chef Kabeya Martin', reference_adresse = 'Avenue de Selembao' WHERE name = 'Selembao' AND commune_id = (SELECT id FROM communes WHERE name = 'Selembao');
UPDATE quartiers SET population = 42000, chef_quartier = 'Chef Mwamba Christine', reference_adresse = 'Coin marché central' WHERE name = 'Amba' AND commune_id = (SELECT id FROM communes WHERE name = 'Selembao');
UPDATE quartiers SET population = 44000, chef_quartier = 'Chef Tshilumba Francis', reference_adresse = 'Route de Mont-Ngafula' WHERE name = 'Kimbondo' AND commune_id = (SELECT id FROM communes WHERE name = 'Selembao');
UPDATE quartiers SET population = 38000, chef_quartier = 'Chef Ngalula Mireille', reference_adresse = 'Quartier mission' WHERE name = 'Lubudi' AND commune_id = (SELECT id FROM communes WHERE name = 'Selembao');
UPDATE quartiers SET population = 46000, chef_quartier = 'Chef Mutombo Prosper', reference_adresse = 'Avenue principale' WHERE name = 'Molende' AND commune_id = (SELECT id FROM communes WHERE name = 'Selembao');
UPDATE quartiers SET population = 40000, chef_quartier = 'Chef Kabila Francine', reference_adresse = 'Zone collinaire sud' WHERE name = 'Ngafani' AND commune_id = (SELECT id FROM communes WHERE name = 'Selembao');
