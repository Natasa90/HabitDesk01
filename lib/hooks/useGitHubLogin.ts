import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import supabase from "@/lib/supabase";

export const useGithubLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGithub = async () => {
    setLoading(true);
    setError(null);

    try {
      const redirectTo = AuthSession.makeRedirectUri({
        scheme: "habitdesk",
        path: "auth/callback",
      });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
        },
      });

      if (error) throw error;

      // DO NOTHING HERE
      // Supabase will redirect back
      // onAuthStateChange will fire
      // RootStack will switch automatically
    } catch (err) {
      console.error("GitHub login error:", err);
      setError("Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGithub, loading, error };
};
