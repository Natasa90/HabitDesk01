import { useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import supabase from "@/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export const useGithubLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGithub = async () => {
    setLoading(true);
    setError(null);

    try {
      const redirectTo = AuthSession.makeRedirectUri({
        scheme: "habitdesk",
        path: "auth",
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No OAuth URL returned");

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo,
      );

      if (result.type === "success" && result.url) {
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(result.url);

        if (exchangeError) throw exchangeError;
      }
    } catch (err) {
      console.error("GitHub login error:", err);
      setError("Something went wrong during GitHub login.");
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGithub, loading, error };
};
