import { createClient } from '@supabase/supabase-js';
import {type Database } from './types/supabase'; 

function getRequiredEnv(envName: "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY"): string {
  const envValue = import.meta.env[envName];

  if (!envValue) {
    throw new Error(
      `Variabile ambiente ${envName} mancante. Controlla il file .env o le variabili di Cloudflare Pages.`,
    );
  }

  return envValue;
}

export const supabaseUrl = getRequiredEnv("VITE_SUPABASE_URL").replace(/\/$/, "");
const supabaseKey = getRequiredEnv("VITE_SUPABASE_ANON_KEY");

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const baseStorageUrl = `${supabaseUrl}/storage/v1/object/public/`;

export function getPublicStorageUrl(filePath: string): string {
  return `${baseStorageUrl}${filePath}`;
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type Technology = Database['public']['Tables']['technologies']['Row'];
