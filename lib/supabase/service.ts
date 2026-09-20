import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Server-only — never import this in client components.
// Uses the service_role key which bypasses RLS.
// Always verify the user is authenticated before calling mutations.
export function createServiceRoleClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
