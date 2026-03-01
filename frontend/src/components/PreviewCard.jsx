import React, { useState, useEffect } from "react";
import {
  Download,
  Copy,
  Share2,
  Bookmark,
  Check,
  Loader2,
  QrCode,
} from "lucide-react";

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "X (Twitter)",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  snapchat: "Snapchat",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
};

const PreviewCard = ({
  isLoading,
  qrData,
  activeContact,
  qrType = "vcard",
  socialPlatform = "facebook",
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Check if current QR is saved when qrData changes
  useEffect(() => {
    if (!qrData?.image_base64) {
      setIsSaved(false);
      return;
    }
    const stored = localStorage.getItem("nexusqr_saved_codes");
    if (stored) {
      const currentCodes = JSON.parse(stored);
      setIsSaved(
        currentCodes.some((c) => c.image_base64 === qrData.image_base64),
      );
    } else {
      setIsSaved(false);
    }
  }, [qrData]);

  const handleDownload = () => {
    if (!qrData?.image_base64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrData.image_base64}`;
    link.download = qrData.filename || "nexus_qr.png";
    link.click();
  };

  const hasData = !!qrData?.image_base64;

  const handleCopy = async () => {
    if (!hasData || !qrData.qr_content) return;
    try {
      await navigator.clipboard.writeText(qrData.qr_content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleShare = async () => {
    if (!hasData) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "NexusQR Code",
          text: `Check out my ${qrType} QR Code!`,
          url:
            qrData.qr_content && qrData.qr_content.startsWith("http")
              ? qrData.qr_content
              : undefined,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleSave = () => {
    if (!hasData) return;

    const displayName =
      activeContact.full_name ||
      activeContact.url ||
      activeContact.ssid ||
      activeContact.username ||
      (activeContact.text || "").slice(0, 40) ||
      "QR Code";

    const newCode = {
      id: qrData.id || Date.now().toString(),
      name: displayName,
      qr_type: qrType === "social" ? socialPlatform : qrType,
      image_base64: qrData.image_base64,
      date: new Date().toISOString(),
    };

    const stored = localStorage.getItem("nexusqr_saved_codes");
    let currentCodes = stored ? JSON.parse(stored) : [];

    if (!isSaved) {
      // Save it
      currentCodes = [newCode, ...currentCodes];
      localStorage.setItem("nexusqr_saved_codes", JSON.stringify(currentCodes));
      setIsSaved(true);
    } else {
      // Unsave it
      currentCodes = currentCodes.filter(
        (c) => c.image_base64 !== qrData.image_base64,
      );
      localStorage.setItem("nexusqr_saved_codes", JSON.stringify(currentCodes));
      setIsSaved(false);
    }
  };

  const getDisplayTitle = () => {
    switch (qrType) {
      case "vcard":
        return activeContact.full_name || "Contact Name";
      case "url":
        return activeContact.url || "https://example.com";
      case "text":
        return (activeContact.text || "Plain Text").slice(0, 50);
      case "email":
        return activeContact.email_to || "recipient@example.com";
      case "sms":
        return activeContact.phone || "+1 234 567 890";
      case "wifi":
        return activeContact.ssid || "Network Name";
      case "social":
        return activeContact.username
          ? `@${activeContact.username}`
          : "@username";
      case "event":
        return activeContact.event_title || "Calendar Event";
      case "crypto":
        return activeContact.crypto_address || "Wallet Address";
      case "pdf":
        return "PDF Document";
      default:
        return "QR Code";
    }
  };

  const getDisplaySubtitle = () => {
    switch (qrType) {
      case "vcard":
        return activeContact.phone || "+1 234 567 890";
      case "url":
        return "Website Link";
      case "text":
        return "Plain Text Message";
      case "email":
        return activeContact.subject || "Email Message";
      case "sms":
        return activeContact.message
          ? activeContact.message.slice(0, 40)
          : "SMS Message";
      case "wifi":
        return activeContact.encryption || "WPA/WPA2";
      case "social":
        return SOCIAL_LABELS[socialPlatform] || "Social Media";
      case "event":
        return activeContact.event_start
          ? `Starts: ${activeContact.event_start.replace("T", " ")}`
          : "Scheduled Event";
      case "crypto":
        return `${(activeContact.crypto_currency || "Crypto").toUpperCase()} Payment`;
      case "pdf":
        return "Scan to View File";
      default:
        return "QR Code";
    }
  };

  return (
    <div className="panel-card p-6 md:p-8 flex flex-col items-center sticky top-24">
      <h3 className="font-bold text-slate-800 text-lg mb-6 self-start md:self-center">
        Live QR Code Preview
      </h3>

      <div className="relative w-full aspect-square max-w-[320px] bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm mb-6 group transition-all duration-500 hover:shadow-md">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        )}

        {hasData ? (
          <img
            src={`data:image/png;base64,${qrData.image_base64}`}
            alt={`Generated ${qrType} QR Code`}
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
          {getDisplayTitle()}
        </h2>
        <p className="text-slate-500 font-medium truncate mt-1">
          {getDisplaySubtitle()}
        </p>
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
            onClick={handleCopy}
            disabled={!hasData || isLoading}
            className="btn-secondary py-2.5 text-sm"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
            {isCopied ? "Copied!" : "Copy Data"}
          </button>
          <button
            onClick={handleShare}
            disabled={!hasData || isLoading}
            className="btn-secondary py-2.5 text-sm"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            Share
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasData || isLoading}
          className={`btn-secondary w-full py-2.5 text-sm mt-1 transition-colors ${
            isSaved
              ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300 shadow-inner"
              : "border-slate-200/60 bg-slate-50 hover:bg-slate-100"
          }`}
        >
          {isSaved ? (
            <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
          ) : (
            <Bookmark className="w-4 h-4 text-slate-400" />
          )}
          {isSaved ? "Saved to Account" : "Save QR Code"}
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;
