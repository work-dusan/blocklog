import { AlertTriangle } from "lucide-react";
import { USERS } from "../../constants/simulation";

export default function LoginForm({
  loggedIn,
  currentUser,
  setCurrentUser,
  password,
  setPassword,
  error,
  setError,
  isHacker,
  loading,
  handleLogin,
  handleLogout,
}) {
  return (
    <div
      className={`border rounded-xl p-5 space-y-3 ${
        isHacker ? "bg-red-950 border-red-800" : "bg-gray-900 border-gray-700"
      }`}
    >
      <p className="text-sm text-gray-400 font-medium">
        {isHacker ? (
          <>
            <AlertTriangle className="inline-block w-4 h-4 mr-1 align-text-bottom" />
            Hacker mode
          </>
        ) : (
          "User Login"
        )}
      </p>

      <select
        value={currentUser}
        onChange={(e) => {
          setCurrentUser(e.target.value);
          setError("");
        }}
        disabled={loggedIn || loading}
        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        {USERS.map((u) => (
          <option key={u}>{u}</option>
        ))}
      </select>

      <input
        type="password"
        placeholder={isHacker ? "Password (hack123)" : "Password (1234)"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loggedIn && !loading && handleLogin()}
        disabled={loggedIn || loading}
        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white disabled:opacity-50"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      {!loggedIn ? (
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full rounded-lg py-2 text-sm font-medium transition disabled:opacity-50 ${
            isHacker
              ? "bg-red-700 hover:bg-red-600"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      ) : (
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg py-2 text-sm font-medium transition"
        >
          {loading ? "Logging out..." : "Log Out"}
        </button>
      )}
    </div>
  );
}
