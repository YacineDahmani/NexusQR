import React, { useState, useEffect } from "react";
import TypeSelector from "../components/TypeSelector";
import DataForms from "../components/DataForms";
import CustomizationPanel from "../components/CustomizationPanel";
import PreviewCard from "../components/PreviewCard";
import { qrService } from "../api/apiClient";

const REQUIRED_FIELDS = {
  vcard: "full_name",
  url: "url",
  text: "text",
  email: "email_to",
  sms: "phone",
  wifi: "ssid",
  social: "username",
  event: "event_start",
  crypto: "crypto_address",
  pdf: "pdf_file",
};

const TYPE_LABELS = {
  vcard: "vCard",
  url: "URL",
  text: "Text",
  email: "Email",
  sms: "SMS",
  wifi: "WiFi",
  social: "Social Media",
  event: "Event",
  crypto: "Crypto",
  pdf: "PDF",
};

const Generator = () => {
  const [qrType, setQrType] = useState("vcard");
  const [socialPlatform, setSocialPlatform] = useState("facebook");
  const [formData, setFormData] = useState({
    fg_color: "#000000",
    bg_color: "#FFFFFF",
    resolution: 10,
  });

  const [logoFile, setLogoFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [frameConfig, setFrameConfig] = useState({
    style: "none",
    ctaText: "Scan Me",
    color: "#1e293b",
  });

  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTypeChange = (newType) => {
    setQrType(newType);
    setQrData(null);
    setError(null);
    setFormData({
      fg_color: formData.fg_color,
      bg_color: formData.bg_color,
      resolution: formData.resolution,
    });
  };

  const handlePlatformChange = (platform) => {
    setSocialPlatform(platform);
    setQrData(null);
    setFormData((prev) => ({ ...prev, username: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const requiredField = REQUIRED_FIELDS[qrType];
    if (!formData[requiredField]) {
      setQrData(null);
      return;
    }

    const generate = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const payload = new FormData();

        // For social media, send the actual platform as qr_type
        const actualType = qrType === "social" ? socialPlatform : qrType;
        payload.append("qr_type", actualType);

        Object.keys(formData).forEach((key) => {
          if (formData[key]) {
            payload.append(key, formData[key]);
          }
        });

        if (logoFile) {
          payload.append("logo", logoFile);
        }

        const result = await qrService.generateQR(payload);
        setQrData(result);
      } catch (err) {
        setError(err.error || "Failed to generate QR code");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(generate, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData, logoFile, qrType, socialPlatform]);

  return (
    <div className="min-h-screen pb-20">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 mb-8 md:mb-12 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:opacity-20" />
        <div className="absolute top-0 left-0 -ml-40 -mt-40 w-96 h-96 rounded-full bg-primary-100/50 dark:bg-primary-900/20 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 font-semibold text-sm mb-4 border border-primary-100 dark:border-primary-500/20 shadow-sm dark:shadow-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 dark:bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Live Editor
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4 transition-colors">
                Generate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                  {TYPE_LABELS[qrType]}
                </span>{" "}
                QR
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl transition-colors">
                Enter your details, customize the design, and watch your QR code
                update instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TypeSelector activeType={qrType} onTypeChange={handleTypeChange} />
            <DataForms
              qrType={qrType}
              formData={formData}
              handleInputChange={handleInputChange}
              socialPlatform={socialPlatform}
              onPlatformChange={handlePlatformChange}
            />
            <CustomizationPanel
              formData={formData}
              handleInputChange={handleInputChange}
              logoFile={logoFile}
              setLogoFile={setLogoFile}
              csvFile={csvFile}
              setCsvFile={setCsvFile}
              frameConfig={frameConfig}
              onFrameChange={setFrameConfig}
            />
          </div>

          <div className="lg:col-span-5 relative">
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium border border-red-100 dark:border-red-500/20">
                {error}
              </div>
            )}
            <PreviewCard
              isLoading={isLoading}
              qrData={qrData}
              activeContact={formData}
              qrType={qrType}
              socialPlatform={socialPlatform}
              frameConfig={frameConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
