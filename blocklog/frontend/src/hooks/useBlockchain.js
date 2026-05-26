import { useState, useEffect } from "react";
import { getChain, addLog, tamper as tamperApi } from "../api";

export function useBlockchain() {
  const [chain, setChain] = useState([]);
  const [apiError, setApiError] = useState(null);

  const fetchChain = () => {
    getChain()
      .then((res) => {
        setChain(res.data);
        setApiError(null);
      })
      .catch(() => setApiError("Failed to connect to the server."));
  };

  useEffect(() => {
    fetchChain();
  }, []);

  const log = async (event_type, user, details = "") => {
    try {
      await addLog({
        event_type,
        user,
        ip: "192.168.1." + Math.floor(Math.random() * 255),
        details,
      });
      fetchChain();
    } catch {
      setApiError("Failed to connect to the server.");
    }
  };

  const tamperBlock = async (index, fields, user) => {
    try {
      await log("LOGIN_FAILED", user, `Attempted block tampering #${index}`);
      await tamperApi({ index, updates: fields });
      fetchChain();
    } catch {
      setApiError("Failed to connect to the server.");
    }
  };

  return { chain, log, tamperBlock, apiError };
}
