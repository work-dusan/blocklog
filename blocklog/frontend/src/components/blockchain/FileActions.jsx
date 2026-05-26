import { useState } from "react";
import { FolderOpen, Trash2, Ban } from "lucide-react";
import { FILES, FILE_CONTENTS } from "../../constants/simulation";
import FilePreviewModal from "./FilePreviewModal";

export default function FileActions({ currentUser, log }) {
  const [deletedFiles, setDeletedFiles] = useState(new Set());
  const [previewFile, setPreviewFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleOpen = async (file) => {
    setBusy(true);
    try {
      await log("FILE_ACCESS", currentUser, file);
      setPreviewFile(file);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (file) => {
    setBusy(true);
    try {
      await log("FILE_DELETED", currentUser, file);
      setDeletedFiles((prev) => new Set(prev).add(file));
    } finally {
      setBusy(false);
    }
  };

  const visibleFiles = FILES.filter((f) => !deletedFiles.has(f));

  return (
    <>
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-3">
        <p className="text-sm text-gray-400 font-medium">
          Actions — <span className="text-indigo-400">{currentUser}</span>
        </p>

        {visibleFiles.length === 0 && (
          <p className="text-xs text-gray-600 italic">No files remaining.</p>
        )}

        {visibleFiles.map((file) => (
          <div key={file} className="flex gap-2">
            <button
              onClick={() => handleOpen(file)}
              disabled={busy}
              className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-lg py-1.5 text-xs transition text-left px-3"
            >
              <FolderOpen className="inline-block w-3.5 h-3.5 mr-1 align-text-bottom" />
              {file}
            </button>
            <button
              onClick={() => handleDelete(file)}
              disabled={busy}
              className="bg-red-900 hover:bg-red-800 disabled:opacity-50 rounded-lg px-3 py-1.5 text-xs transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <button
          onClick={() => log("PERMISSION_DENIED", currentUser, "/root/secret")}
          disabled={busy}
          className="w-full bg-yellow-900 hover:bg-yellow-800 disabled:opacity-50 text-yellow-300 rounded-lg py-2 text-sm transition"
        >
          <Ban className="inline-block w-4 h-4 mr-1.5 align-text-bottom" />
          Attempt access /root/secret
        </button>
      </div>

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          content={FILE_CONTENTS[previewFile]}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </>
  );
}
