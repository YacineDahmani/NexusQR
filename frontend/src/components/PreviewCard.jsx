import React from "react";
import { Download, Copy, Mail, Bookmark, Loader2, QrCode } from "lucide-react";

const PreviewCard = ({ isLoading, qrData, activeContact }) => {
  const handleDownload = () => {
    if (!qrData?.image_base64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrData.image_base64}`;
    link.download = qrData.filename || "nexus_qr.png";
    link.click();
  };

  const hasData = !!qrData?.image_base64;

  const handleSave = () => {
    if (!hasData) return;

    const newCode = {
      id: qrData.id || Date.now().toString(),
      name: activeContact.full_name || "Unnamed Contact",
      image_base64: qrData.image_base64,
      date: new Date().toISOString(),
    };

    const stored = localStorage.getItem("nexusqr_saved_codes");
    const currentCodes = stored ? JSON.parse(stored) : [];

    // Prevent strict exact duplicates
    if (!currentCodes.some((c) => c.image_base64 === newCode.image_base64)) {
      localStorage.setItem(
        "nexusqr_saved_codes",
        JSON.stringify([newCode, ...currentCodes]),
      );
      alert("QR Code saved to My QR Codes!");
    } else {
      alert("This exact QR code is already saved.");
    }
  };

  return (
    <div className="panel-card p-6 md:p-8 flex flex-col items-center sticky top-24">
      <h3 className="font-bold text-slate-800 text-lg mb-6 self-start md:self-center">
        Live QR Code Preview
      </h3>

      <div className="relative w-full aspect-square max-w-[320px] bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 mb-6 group">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        )}

        {hasData ? (
          <img
            src={`data:image/png;base64,${qrData.image_base64}`}
            alt="Generated vCard QR Code"
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <QrCode className="w-16 h-16 opacity-50" strokeWidth={1} />
            <span className="text-sm font-medium">
              Enter details to generate
            </span>
          </div>
        )}
      </div>

      <div className="text-center w-full mb-8">
        <h2 className="text-xl font-bold text-slate-800 truncate">
          {activeContact.full_name || "Contact Name"}
        </h2>
        <p className="text-slate-500 font-medium truncate mt-1">
          {activeContact.phone || "+1 234 567 890"}
        </p>
        <div className="inline-flex mt-3 bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          vCard 3.0 Ready
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[320px]">
        <button
          onClick={handleDownload}
          disabled={!hasData || isLoading}
          className="btn-primary w-full py-3 shadow-lg shadow-primary-500/25"
        >
          <Download className="w-4 h-4" />
          Download QR (PNG)
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={!hasData || isLoading}
            className="btn-secondary py-2.5 text-sm"
          >
            <Copy className="w-4 h-4 text-slate-400" />
            Copy Link
          </button>
          <button
            disabled={!hasData || isLoading}
            className="btn-secondary py-2.5 text-sm"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            Email vCard
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasData || isLoading}
          className="btn-secondary w-full py-2.5 text-sm mt-1 border-slate-200/60 bg-slate-50 hover:bg-slate-100"
        >
          <Bookmark className="w-4 h-4 text-slate-400" />
          Save to Account
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;
