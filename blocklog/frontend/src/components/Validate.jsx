import { useState } from "react";
import { CheckCircle, AlertTriangle, RefreshCw, RotateCcw } from "lucide-react";
import { useValidation } from "../hooks/useValidation";
import { resetChain } from "../api";

export default function Validate() {
  const { result, loading, error, runValidation } = useValidation();
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    try {
      await resetChain();
      setConfirmReset(false);
      runValidation();
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Integrity Verification</h1>

        <div className="flex items-center gap-2">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="text-gray-500 hover:text-red-400 transition text-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Reset chain
            </button>
          ) : (
            <>
              <button
                onClick={handleReset}
                disabled={resetting}
                className="bg-red-700 hover:bg-red-600 disabled:opacity-50 px-3 py-1.5 rounded-lg text-sm font-medium transition"
              >
                {resetting ? "Resetting..." : "Confirm reset"}
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm transition"
              >
                Cancel
              </button>
            </>
          )}

          <button
            onClick={runValidation}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            {loading ? (
              "Checking..."
            ) : (
              <>
                <RefreshCw className="inline-block w-4 h-4 mr-1.5 align-text-bottom" />
                Check again
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-gray-900 border border-red-800 text-red-400 rounded-xl px-5 py-4 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {result && (
        <>
          {result.valid ? (
            <div className="bg-green-900 border border-green-700 text-green-300 rounded-xl px-5 py-4 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" /> Chain is valid. All
              hash values match.
            </div>
          ) : (
            <div className="bg-red-900 border border-red-700 text-red-300 rounded-xl px-5 py-4 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" /> Detected{" "}
              {result.errors.length} issue(s) in the chain!
            </div>
          )}

          {result.errors.map((err, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-red-800 rounded-xl px-5 py-4 mb-3"
            >
              <span className="text-sm font-medium text-red-400">
                Block #{err.block_index}
              </span>
              <p className="text-sm text-gray-300 mt-1">{err.reason}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
