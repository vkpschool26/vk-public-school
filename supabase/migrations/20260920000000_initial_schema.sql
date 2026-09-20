-- =============================================================
-- VK Public School — Initial Database Schema
-- Run this in the Supabase SQL Editor (supabase.com → SQL Editor)
-- =============================================================


-- ---------------------------------------------------------------
-- 0. Helper: auto-update updated_at on every row change
-- ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


-- ---------------------------------------------------------------
-- 1. events
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  date         DATE        NOT NULL,
  description  TEXT        NOT NULL,
  category     TEXT        NOT NULL
                           CHECK (category IN ('Academic', 'Cultural', 'Sports', 'Holiday')),
  image_url    TEXT,
  is_published BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_is_published_idx ON public.events (is_published);
CREATE INDEX IF NOT EXISTS events_date_idx         ON public.events (date DESC);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published events"
  ON public.events
  FOR SELECT
  USING (is_published = true);


-- ---------------------------------------------------------------
-- 2. gallery_images
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  category     TEXT        NOT NULL
                           CHECK (category IN ('Classrooms', 'Events', 'Sports', 'Activities', 'Facilities')),
  storage_path TEXT        NOT NULL,
  alt          TEXT        NOT NULL,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  is_published BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS gallery_images_is_published_idx ON public.gallery_images (is_published);
CREATE INDEX IF NOT EXISTS gallery_images_sort_order_idx   ON public.gallery_images (sort_order ASC);
CREATE INDEX IF NOT EXISTS gallery_images_category_idx     ON public.gallery_images (category);

CREATE TRIGGER gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published gallery images"
  ON public.gallery_images
  FOR SELECT
  USING (is_published = true);


-- ---------------------------------------------------------------
-- 3. notices
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  date         DATE        NOT NULL,
  category     TEXT        NOT NULL
                           CHECK (category IN ('Academic', 'General', 'Holiday', 'Admissions')),
  content      TEXT        NOT NULL,
  is_published BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notices_is_published_idx ON public.notices (is_published);
CREATE INDEX IF NOT EXISTS notices_date_idx         ON public.notices (date DESC);

CREATE TRIGGER notices_updated_at
  BEFORE UPDATE ON public.notices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published notices"
  ON public.notices
  FOR SELECT
  USING (is_published = true);


-- ---------------------------------------------------------------
-- 4. achievements
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  icon         TEXT        NOT NULL,
  year         TEXT        NOT NULL,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  is_published BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS achievements_is_published_idx ON public.achievements (is_published);
CREATE INDEX IF NOT EXISTS achievements_sort_order_idx   ON public.achievements (sort_order ASC);

CREATE TRIGGER achievements_updated_at
  BEFORE UPDATE ON public.achievements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published achievements"
  ON public.achievements
  FOR SELECT
  USING (is_published = true);


-- ---------------------------------------------------------------
-- 5. activities
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  description  TEXT        NOT NULL,
  icon         TEXT        NOT NULL,
  color        TEXT        NOT NULL,
  items        TEXT[]      NOT NULL DEFAULT '{}',
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  is_published BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS activities_is_published_idx ON public.activities (is_published);
CREATE INDEX IF NOT EXISTS activities_sort_order_idx   ON public.activities (sort_order ASC);

CREATE TRIGGER activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published activities"
  ON public.activities
  FOR SELECT
  USING (is_published = true);


-- ---------------------------------------------------------------
-- 6. Storage: gallery bucket
-- ---------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  52428800,   -- 50 MB per file
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Public can read (download) any object in the gallery bucket
CREATE POLICY "Public read gallery objects"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gallery');


-- ---------------------------------------------------------------
-- Verification queries (run these after applying the schema)
-- ---------------------------------------------------------------
-- SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public'
--   ORDER BY table_name;
--
-- SELECT tablename, rowsecurity FROM pg_tables
--   WHERE schemaname = 'public';
--
-- SELECT schemaname, tablename, policyname, cmd, qual
--   FROM pg_policies WHERE schemaname = 'public';
