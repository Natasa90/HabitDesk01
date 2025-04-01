import { useState, useEffect } from "react";
import supabase from "../supabase";

export const useFetchSources = () => {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const { data, error } = await supabase
          .from("sources")
          .select("*")
          .order("like", { ascending: false });

        if (error) throw new Error("There was a problem getting data");

        setSources(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  return { sources, loading, error };
};

