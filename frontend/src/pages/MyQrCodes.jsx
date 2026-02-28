import React, { useState, useEffect } from "react";
import { QrCode, Download, Trash2, Calendar } from "lucide-react";

const MyQrCodes = () => {
  const [savedCodes, setSavedCodes] = useState([]);

  useEffect(() => {
    const loadCodes = () => {
      const stored = localStorage.getItem("nexusqr_saved_codes");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const sorted = parsed.sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
          setSavedCodes(sorted);
        } catch (e) {
          console.error("Failed to parse saved codes", e);
          setSavedCodes([]);
        }
      }
    };
    loadCodes();
  }, []);

  const handleDelete = (id) => {
    const fresh_codes = savedCodes.filter((c) => c.id !== id);
    setSavedCodes(fresh_codes);
    localStorage.setItem("nexusqr_saved_codes", JSON.stringify(fresh_codes));
  };

  const handleDownload = (code) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${code.image_base64}`;
    link.download = code.filename || "nexus_qr.png";
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          My Saved QR Codes
        </h1>
        <p className="text-slate-500 mt-2">
          Manage and download your previously generated QR codes.
        </p>
      </div>

      {savedCodes.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <QrCode className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            No QR codes saved yet
          </h3>
          <p className="text-slate-500 max-w-sm">
            When you generate a new QR code on the home page, click "Save to
            Account" to store it here for easy access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedCodes.map((code) => (
            <div key={code.id} className="panel-card p-5 group flex flex-col">
              <div className="relative aspect-square w-full bg-slate-50 rounded-xl mb-4 border border-slate-100 flex items-center justify-center p-2">
                <img
                  src={`data:image/png;base64,${code.image_base64}`}
                  alt={code.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-grow">
                <h3
                  className="font-bold text-slate-800 truncate"
                  title={code.name}
                >
                  {code.name || "Unnamed Contact"}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(code.date).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <button
                  onClick={() => handleDownload(code)}
                  className="flex-1 btn-secondary py-2 text-sm bg-slate-50 border-slate-200"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleDelete(code.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-colors tooltip-trigger"
                  title="Delete code"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQrCodes;
