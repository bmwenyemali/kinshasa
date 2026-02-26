-- =============================================================
-- SQL pour promouvoir un utilisateur au rôle ADMINISTRATEUR
-- =============================================================
-- Remplacez 'email@example.com' par l'adresse email de l'utilisateur
-- à promouvoir.
--
-- Exécutez cette requête dans Supabase SQL Editor :
-- https://supabase.com/dashboard/project/jrscqqgwwvhflzpgfohj/sql
-- =============================================================

-- 1. Voir tous les utilisateurs actuels
SELECT id, email, prenom, nom, role, active, created_at
FROM users
ORDER BY created_at DESC;

-- 2. Promouvoir un utilisateur à ADMINISTRATEUR
-- ⚠️ MODIFIEZ L'EMAIL CI-DESSOUS ⚠️
UPDATE users
SET role = 'ADMINISTRATEUR'::user_role
WHERE email = 'votre-email@example.com';

-- 3. Vérifier le changement
SELECT id, email, prenom, nom, role
FROM users
WHERE email = 'votre-email@example.com';
