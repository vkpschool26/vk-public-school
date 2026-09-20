import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Server-side client factory for use in Server Components and Route Handlers.
// Returns a new client per call — appropriate for server contexts.
// Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.
// When authentication is added, replace with @supabase/ssr createServerClient
// and pass the Next.js cookies() store for session handling.
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
