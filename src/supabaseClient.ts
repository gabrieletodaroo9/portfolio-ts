import { createClient } from '@supabase/supabase-js';
import {type Database } from './types/supabase'; 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type Project = Database['public']['Tables']['projects']['Row'];
export type Technology = Database['public']['Tables']['technologies']['Row'];
