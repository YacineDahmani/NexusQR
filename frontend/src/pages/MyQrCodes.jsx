import React, { useState, useEffect } from "react";
import { QrCode, Download, Trash2, Calendar, Sparkles } from "lucide-react";

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
    <div className="min-h-screen pb-20">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:opacity-20" />
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold text-sm mb-4 border border-indigo-100 dark:border-indigo-500/20 shadow-sm dark:shadow-none">
            <Sparkles className="w-4 h-4" />
            Your Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4 leading-tight transition-colors">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              Saved QR Codes
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed transition-colors">
            Manage, organize, and download all the beautiful QR codes you've
            crafted using NexusQR.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedCodes.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none transition-colors">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-full mb-6 border border-slate-100 dark:border-slate-700 shadow-inner dark:shadow-none">
              <QrCode className="w-16 h-16 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">
              Your library is empty
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md leading-relaxed transition-colors">
              When you generate a new QR code on the home page, click "Save to
              Account" to store it here for easy access.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedCodes.map((code) => (
              <div
                key={code.id}
                className="bg-white dark:bg-slate-800/50 rounded-3xl p-5 shadow-card dark:shadow-none hover:shadow-card-hover dark:hover:shadow-none border border-slate-100 dark:border-slate-700/50 transition-all duration-300 flex flex-col group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-50/50 dark:from-primary-500/0 dark:to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative aspect-square w-full bg-slate-50/50 dark:bg-slate-800/80 rounded-2xl mb-5 border border-slate-100/60 dark:border-slate-700/50 flex items-center justify-center p-4 overflow-hidden group-hover:border-primary-100 dark:group-hover:border-primary-500/20 transition-colors">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50 dark:opacity-20"></div>
                  <img
                    src={`data:image/png;base64,${code.image_base64}`}
                    alt={code.name}
                    className="relative z-10 w-full h-full object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                <div className="flex-grow z-10">
                  <h3
                    className="font-bold text-slate-800 dark:text-white text-lg truncate group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors"
                    title={code.name}
                  >
                    {code.name || "Unnamed Contact"}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 mt-1.5">
                    <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    {new Date(code.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6 z-10">
                  <button
                    onClick={() => handleDownload(code)}
                    className="flex-1 btn-primary py-2.5 text-sm shadow-sm hover:shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(code.id)}
                    className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-500/20 transition-all shadow-sm dark:shadow-none"
                    title="Delete code"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQrCodes;
