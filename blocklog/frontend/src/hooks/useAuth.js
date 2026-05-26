import { useState } from "react";
import { USERS, PASSWORDS } from "../constants/simulation";

export function useAuth(log) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(USERS[0]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isHacker = currentUser === "hacker";

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (password === PASSWORDS[currentUser]) {
        await log("LOGIN", currentUser);
        setLoggedIn(true);
        setError("");
      } else {
        await log("LOGIN_FAILED", currentUser, "Wrong password");
        setError("Wrong password! Attempt logged to blockchain.");
      }
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await log("LOGOUT", currentUser);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loggedIn,
    currentUser,
    setCurrentUser,
    password,
    setPassword,
    error,
    setError,
    loading,
    isHacker,
    handleLogin,
    handleLogout,
  };
}
