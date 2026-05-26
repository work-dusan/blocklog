import { X } from "lucide-react";

export default function FilePreviewModal({ file, content, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
          <span className="font-mono text-sm text-indigo-400">{file}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <pre className="px-5 py-4 text-xs text-gray-300 font-mono whitespace-pre-wrap overflow-auto max-h-80">
          {content}
        </pre>
      </div>
    </div>
  );
}
