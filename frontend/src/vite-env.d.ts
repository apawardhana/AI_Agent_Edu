// src/types/vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Variabel yang Anda gunakan harus didaftarkan di sini:
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_HEYGEN_API_KEY: string;
  readonly VITE_HEYGEN_BASE_API_URL: string;
  readonly VITE_OPENROUTER_API_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  
  // Jika Anda memiliki variabel lain, tambahkan di sini.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}