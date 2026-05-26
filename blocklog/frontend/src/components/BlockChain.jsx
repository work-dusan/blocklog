import { AlertTriangle } from "lucide-react";
import { useBlockchain } from "../hooks/useBlockchain";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "./blockchain/LoginForm";
import FileActions from "./blockchain/FileActions";
import HackerPanel from "./blockchain/HackerPanel";
import BlockCard from "./blockchain/BlockCard";

export default function BlockChain() {
  const { chain, log, tamperBlock, apiError } = useBlockchain();
  const {
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
  } = useAuth(log);

  return (
    <div className="flex h-full">
      <div className="w-1/2 border-r border-gray-800 p-6 overflow-y-auto">
        <h2 className="text-lg font-medium mb-4">System Simulation</h2>

        <div className="max-w-lg mx-auto space-y-4">
          {apiError && (
            <div className="bg-gray-900 border border-red-800 text-red-400 rounded-xl px-4 py-3 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" /> {apiError}
            </div>
          )}

          <LoginForm
            loggedIn={loggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            password={password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            loading={loading}
            isHacker={isHacker}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />

          {loggedIn && !isHacker && (
            <FileActions currentUser={currentUser} log={log} />
          )}

          {loggedIn && isHacker && <HackerPanel />}
        </div>
      </div>

      <div className="w-1/2 p-6 overflow-y-auto">
        <h2 className="text-lg font-medium mb-4">Blockchain</h2>

        {chain.map((block) => (
          <BlockCard
            key={block.index}
            block={block}
            loggedIn={loggedIn}
            isHacker={isHacker}
            onTamper={(fields) => tamperBlock(block.index, fields, currentUser)}
          />
        ))}
      </div>
    </div>
  );
}
