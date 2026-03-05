import React, { useState, useEffect, useRef } from "react";
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

const getFrameStyles = (style, color) => {
  const isLight =
    color === "#ffffff" || color === "#FFFFFF" || color === "white";
  const textColor = isLight ? "#1e293b" : "#ffffff";
  const borderHighlight = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";

  const base = {
    wrapper: {},
    inner: {},
    ctaStyle: {
      color: textColor,
      fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
      fontWeight: 700,
      textAlign: "center",
    },
  };

  switch (style) {
    case "simple":
      return {
        wrapper: {
          border: `3px solid ${color}`,
          borderRadius: "16px",
          padding: "12px 12px 0 12px",
          background: "#ffffff",
        },
        inner: {},
        ctaStyle: {
          ...base.ctaStyle,
          backgroundColor: color,
          padding: "10px 16px",
          borderRadius: "0 0 12px 12px",
          marginTop: "12px",
          marginLeft: "-12px",
          marginRight: "-12px",
          fontSize: "14px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        },
      };
    case "rounded":
      return {
        wrapper: {
          border: `3px solid ${color}`,
          borderRadius: "24px",
          padding: "16px 16px 0 16px",
          background: "#ffffff",
          boxShadow: `0 8px 32px ${color}33`,
        },
        inner: {
          borderRadius: "12px",
          overflow: "hidden",
        },
        ctaStyle: {
          ...base.ctaStyle,
          backgroundColor: color,
          padding: "12px 20px",
          borderRadius: "0 0 20px 20px",
          marginTop: "16px",
          marginLeft: "-16px",
          marginRight: "-16px",
          fontSize: "15px",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
        },
      };
    case "shadow":
      return {
        wrapper: {
          borderRadius: "20px",
          padding: "14px 14px 0 14px",
          background: "#ffffff",
          boxShadow: `0 4px 24px ${color}44, 0 12px 48px ${color}22`,
          border: `1px solid ${borderHighlight}`,
        },
        inner: {},
        ctaStyle: {
          ...base.ctaStyle,
          backgroundColor: color,
          padding: "11px 18px",
          borderRadius: "0 0 18px 18px",
          marginTop: "14px",
          marginLeft: "-14px",
          marginRight: "-14px",
          fontSize: "14px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        },
      };
    case "badge":
      return {
        wrapper: {
          borderRadius: "16px",
          overflow: "hidden",
          background: "#ffffff",
          border: `2px solid ${color}`,
        },
        header: {
          backgroundColor: color,
          padding: "8px 16px",
          textAlign: "center",
        },
        headerText: {
          color: textColor,
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
        },
        inner: {
          padding: "12px",
        },
        ctaStyle: {
          ...base.ctaStyle,
          backgroundColor: color,
          padding: "10px 16px",
          fontSize: "15px",
          fontWeight: 800,
          letterSpacing: "0.5px",
        },
      };
    case "banner":
      return {
        wrapper: {
          borderRadius: "16px",
          padding: "14px 14px 0 14px",
          background: "#ffffff",
          border: `2px solid ${color}22`,
          boxShadow: `0 2px 12px ${color}15`,
        },
        inner: {},
        ctaStyle: {
          ...base.ctaStyle,
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          padding: "14px 20px",
          borderRadius: "0 0 14px 14px",
          marginTop: "14px",
          marginLeft: "-14px",
          marginRight: "-14px",
          fontSize: "16px",
          fontWeight: 800,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          boxShadow: `0 -4px 16px ${color}22`,
        },
      };
    default:
      return { wrapper: {}, inner: {}, ctaStyle: {} };
  }
};

const FramedQR = ({ children, frameConfig, style: extraStyle }) => {
  if (!frameConfig || frameConfig.style === "none") {
    return <div style={extraStyle}>{children}</div>;
  }

  const frameStyles = getFrameStyles(frameConfig.style, frameConfig.color);

  return (
    <div style={{ ...frameStyles.wrapper, ...extraStyle }}>
      {frameStyles.header && (
        <div style={frameStyles.header}>
          <span style={frameStyles.headerText}>NEXUSQR</span>
        </div>
      )}
      <div style={frameStyles.inner}>{children}</div>
      {frameConfig.ctaText && (
        <div style={frameStyles.ctaStyle}>{frameConfig.ctaText}</div>
      )}
    </div>
  );
};

const PreviewCard = ({
  isLoading,
  qrData,
  activeContact,
  qrType = "vcard",
  socialPlatform = "facebook",
  frameConfig = { style: "none", ctaText: "Scan Me", color: "#1e293b" },
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const framedRef = useRef(null);

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

  const handleDownload = async () => {
    if (!qrData?.image_base64) return;

    if (frameConfig.style !== "none" && framedRef.current) {
      try {
        const canvas = await renderFramedToCanvas();
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download =
          qrData.filename?.replace(".png", "_framed.png") ||
          "nexus_qr_framed.png";
        link.click();
        return;
      } catch (e) {
        console.error(
          "Canvas export failed, falling back to plain download",
          e,
        );
      }
    }

    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrData.image_base64}`;
    link.download = qrData.filename || "nexus_qr.png";
    link.click();
  };

  const renderFramedToCanvas = () => {
    return new Promise((resolve) => {
      const qrImg = new Image();
      qrImg.onload = () => {
        const qrSize = 500;
        const padding = 40;
        const ctaHeight = frameConfig.ctaText ? 60 : 0;
        const headerHeight = frameConfig.style === "badge" ? 36 : 0;
        const totalWidth = qrSize + padding * 2;
        const totalHeight = qrSize + padding * 2 + ctaHeight + headerHeight;

        const canvas = document.createElement("canvas");
        canvas.width = totalWidth;
        canvas.height = totalHeight;
        const ctx = canvas.getContext("2d");

        const color = frameConfig.color;
        const isLight = color === "#ffffff" || color === "#FFFFFF";
        const textColor = isLight ? "#1e293b" : "#ffffff";

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(0, 0, totalWidth, totalHeight, 16);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(2, 2, totalWidth - 4, totalHeight - 4, 14);
        ctx.stroke();

        if (frameConfig.style === "badge" && headerHeight > 0) {
          ctx.fillStyle = color;
          ctx.fillRect(2, 2, totalWidth - 4, headerHeight);
          ctx.fillStyle = textColor;
          ctx.font = "bold 11px 'Plus Jakarta Sans', Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.letterSpacing = "2px";
          ctx.fillText("NEXUSQR", totalWidth / 2, headerHeight - 10);
        }

        const qrY = padding + headerHeight;
        ctx.drawImage(qrImg, padding, qrY, qrSize, qrSize);

        if (frameConfig.ctaText && ctaHeight > 0) {
          const ctaY = totalHeight - ctaHeight;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.roundRect(2, ctaY, totalWidth - 4, ctaHeight - 2, [0, 0, 12, 12]);
          ctx.fill();

          ctx.fillStyle = textColor;
          ctx.font = "bold 18px 'Plus Jakarta Sans', Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            frameConfig.ctaText.toUpperCase(),
            totalWidth / 2,
            ctaY + ctaHeight / 2,
          );
        }

        resolve(canvas);
      };
      qrImg.src = `data:image/png;base64,${qrData.image_base64}`;
    });
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
      currentCodes = [newCode, ...currentCodes];
      localStorage.setItem("nexusqr_saved_codes", JSON.stringify(currentCodes));
      setIsSaved(true);
    } else {
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

  const hasFrame = frameConfig.style !== "none";

  return (
    <div className="panel-card p-6 md:p-8 flex flex-col items-center sticky top-24">
      <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 self-start md:self-center">
        Live QR Code Preview
      </h3>

      <div
        ref={framedRef}
        className={`relative w-full max-w-[320px] flex items-center justify-center mb-6 group transition-all duration-500 ${
          !hasFrame
            ? "aspect-square bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-md dark:shadow-none"
            : ""
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
          </div>
        )}

        {hasData ? (
          <FramedQR frameConfig={frameConfig} style={{ width: "100%" }}>
            <img
              src={`data:image/png;base64,${qrData.image_base64}`}
              alt={`Generated ${qrType} QR Code`}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              style={hasFrame ? { display: "block" } : { padding: "8px" }}
            />
          </FramedQR>
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500 py-20">
            <QrCode className="w-16 h-16 opacity-50" strokeWidth={1} />
            <span className="text-sm font-medium">
              Enter details to generate
            </span>
          </div>
        )}
      </div>

      <div className="text-center w-full mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white truncate">
          {getDisplayTitle()}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium truncate mt-1">
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
          {hasFrame ? "Download Framed QR" : "Download QR (PNG)"}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            disabled={!hasData || isLoading}
            className="btn-secondary py-2.5 text-sm"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            )}
            {isCopied ? "Copied!" : "Copy Data"}
          </button>
          <button
            onClick={handleShare}
            disabled={!hasData || isLoading}
            className="btn-secondary py-2.5 text-sm"
          >
            <Share2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            Share
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasData || isLoading}
          className={`btn-secondary w-full py-2.5 text-sm mt-1 transition-colors ${
            isSaved
              ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:border-amber-300 dark:hover:border-amber-500/50 shadow-inner"
              : "border-slate-200/60 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          }`}
        >
          {isSaved ? (
            <Bookmark className="w-4 h-4 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
          ) : (
            <Bookmark className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          )}
          {isSaved ? "Saved to Account" : "Save QR Code"}
        </button>
      </div>
    </div>
  );
};

export default PreviewCard;
