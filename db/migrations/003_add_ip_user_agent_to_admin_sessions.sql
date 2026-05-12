-- Migration: add ip and user_agent to admin_sessions
BEGIN;

ALTER TABLE IF EXISTS public.admin_sessions
  ADD COLUMN IF NOT EXISTS ip text,
  ADD COLUMN IF NOT EXISTS user_agent text;

COMMIT;
