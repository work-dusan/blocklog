import { useState, useEffect } from "react";
import { validate } from "../api";

export function useValidation() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const runValidation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await validate();
      setResult(res.data);
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validate()
      .then((res) => setResult(res.data))
      .catch(() => setError("Failed to connect to the server."))
      .finally(() => setLoading(false));
  }, []);

  return { result, loading, error, runValidation };
}
