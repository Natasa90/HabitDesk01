import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl ?? '';
const SUPABASE_KEY = Constants.expoConfig?.extra?.supabaseKey ?? '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase URL or Key is missing from the configuration.");
}

export const CONFIG = {
  supabase: {
    url: SUPABASE_URL,
    key: SUPABASE_KEY,
  },
};
