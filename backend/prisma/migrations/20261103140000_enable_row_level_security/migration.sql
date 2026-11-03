-- Supabase can expose the public schema through its Data API. With RLS on and no policies, those
-- roles see nothing, while the app's connection owns the tables and is unaffected.
DO $$
DECLARE
  table_record RECORD;
BEGIN
  FOR table_record IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_record.tablename);
  END LOOP;
END $$;
