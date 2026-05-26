import { useState } from "react";
import { Link, ArrowLeft } from "lucide-react";
import { eventBadgeColor } from "../../utils/eventBadge";

const TAMPER_FIELDS = [
  { key: "event_type", label: "Event Type" },
  { key: "user", label: "User" },
  { key: "ip", label: "IP" },
  { key: "details", label: "Details" },
];

export default function BlockCard({ block, loggedIn, isHacker, onTamper }) {
  const entry = block.log_entry;

  const [tamperFields, setTamperFields] = useState(() => ({
    event_type: entry.event_type || "",
    user: entry.user || "",
    ip: entry.ip || "",
    details: entry.details || "",
  }));
  const [loading, setLoading] = useState(false);

  const handleTamper = async () => {
    setLoading(true);
    try {
      await onTamper(tamperFields);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500">BLOCK #{block.index}</span>
        <span className="text-xs text-gray-500">{block.timestamp}</span>
      </div>

      <div className="mb-3">
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${eventBadgeColor(entry.event_type)}`}
        >
          {entry.event_type}
        </span>
      </div>

      <div className="text-sm text-gray-300 space-y-1 mb-4">
        {entry.user && (
          <p>
            <span className="text-gray-500">User:</span> {entry.user}
          </p>
        )}
        {entry.ip && (
          <p>
            <span className="text-gray-500">IP:</span> {entry.ip}
          </p>
        )}
        {entry.details && (
          <p>
            <span className="text-gray-500">Details:</span> {entry.details}
          </p>
        )}
        {entry.message && (
          <p>
            <span className="text-gray-500">Message:</span> {entry.message}
          </p>
        )}
      </div>

      <div className="font-mono text-xs text-gray-500 space-y-1">
        <p className="flex items-center gap-1">
          <Link className="w-3 h-3 shrink-0" />
          <span className="text-indigo-400">{block.hash}</span>
        </p>
        <p className="flex items-center gap-1">
          <ArrowLeft className="w-3 h-3 shrink-0" /> {block.previous_hash}
        </p>
      </div>

      {loggedIn && isHacker && block.index > 0 && (
        <div className="border-t border-red-900 mt-4 pt-4 space-y-1.5 w-44">
          {TAMPER_FIELDS.map(({ key, label }) => (
            <input
              key={key}
              type="text"
              placeholder={label}
              value={tamperFields[key]}
              onChange={(e) =>
                setTamperFields((prev) => ({ ...prev, [key]: e.target.value }))
              }
              disabled={loading}
              className="w-full bg-gray-950 border border-red-900 rounded-lg px-2 py-1 text-xs text-white placeholder-gray-600 disabled:opacity-50"
            />
          ))}
          <button
            onClick={handleTamper}
            disabled={loading}
            className="w-full bg-red-800 hover:bg-red-700 disabled:opacity-50 text-red-200 text-xs py-1.5 rounded-lg transition"
          >
            {loading ? "Tampering..." : "Tamper"}
          </button>
        </div>
      )}
    </div>
  );
}
