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
    fg_color: "#007BFF",
    bg_color: "#FFFFFF",
    resolution: 10,
  });

  const [logoFile, setLogoFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Generate {TYPE_LABELS[qrType]} QR Code
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
          />
        </div>

        <div className="lg:col-span-5 relative">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          <PreviewCard
            isLoading={isLoading}
            qrData={qrData}
            activeContact={formData}
            qrType={qrType}
            socialPlatform={socialPlatform}
          />
        </div>
      </div>
    </div>
  );
};

export default Generator;
