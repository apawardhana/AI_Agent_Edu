// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Pastikan environment variables tersedia
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Did you set VITE_SUPABASE_URL/ANON_KEY?");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);