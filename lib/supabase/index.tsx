import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { CONFIG } from "../config";

const SUPABASE_CONFIG = CONFIG.supabase;

if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.key) {
  throw new Error("Supabase URL or Key is missing from the configuration.");
}

const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // We handle the OAuth flow manually, so we don't want Supabase to try to detect sessions in the URL
  },
  global: {
    headers: {
      apikey: SUPABASE_CONFIG.key,
    },
  },
});

export default supabase;
