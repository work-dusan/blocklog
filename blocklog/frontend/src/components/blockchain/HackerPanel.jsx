import { AlertTriangle } from "lucide-react";

export default function HackerPanel() {
  return (
    <div className="bg-red-950 border border-red-800 rounded-xl p-5">
      <p className="text-sm text-red-400 font-medium mb-2 flex items-center gap-1.5">
        <AlertTriangle className="w-4 h-4 shrink-0" /> Logged in as hacker
      </p>
      <p className="text-xs text-gray-400">
        You can modify the content of any block in the chain. After tampering,
        go to <span className="text-white">Verify</span> to see how the system
        detects the attack.
      </p>
    </div>
  );
}
