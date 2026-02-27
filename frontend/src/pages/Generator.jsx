import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import CustomizationPanel from "../components/CustomizationPanel";
import PreviewCard from "../components/PreviewCard";
import { qrService } from "../api/apiClient";

const Generator = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    organization: "",
    address: "",
    website: "",
    fg_color: "#007BFF",
    bg_color: "#FFFFFF",
    resolution: 10,
  });

  const [logoFile, setLogoFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle text and color inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Debounced QR Generation
  useEffect(() => {
    if (!formData.full_name) {
      setQrData(null);
      return;
    }

    const generate = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const payload = new FormData();
        // Append all text fields
        Object.keys(formData).forEach((key) => {
          if (formData[key]) {
            payload.append(key, formData[key]);
          }
        });

        // Append logo if it exists
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
  }, [formData, logoFile]); // Re-run when form or logo changes

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Generate vCard QR Code
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Forms & Settings */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ContactForm
            formData={formData}
            handleInputChange={handleInputChange}
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

        {/* Right Column: Live Preview Sticky */}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Generator;
