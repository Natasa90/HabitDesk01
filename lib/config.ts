import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl ?? '';
const SUPABASE_KEY = Constants.expoConfig?.extra?.supabaseKey ?? '';
const GITHUB_CLIENT_ID = Constants.expoConfig?.extra?.githubClientId ?? '';
const GITHUB_CLIENT_SECRET = Constants.expoConfig?.extra?.githubClientSecret ?? '';


if (!SUPABASE_URL || !SUPABASE_KEY || !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing configuration values from app.config.js or .env");
}

export const CONFIG = {
  supabase: {
    url: SUPABASE_URL,
    key: SUPABASE_KEY,
  },
  github: {
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
  },
};
