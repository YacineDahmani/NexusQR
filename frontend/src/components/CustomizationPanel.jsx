import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
} from "lucide-react";

const CustomizationPanel = ({
  formData,
  handleInputChange,
  logoFile,
  setLogoFile,
  csvFile,
  setCsvFile,
}) => {
  const onLogoDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        setLogoFile(acceptedFiles[0]);
      }
    },
    [setLogoFile],
  );

  const onCsvDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        setCsvFile(acceptedFiles[0]);
      }
    },
    [setCsvFile],
  );

  const {
    getRootProps: getLogoProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDrag,
  } = useDropzone({
    onDrop: onLogoDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  const {
    getRootProps: getCsvProps,
    getInputProps: getCsvInputProps,
    isDragActive: isCsvDrag,
  } = useDropzone({
    onDrop: onCsvDrop,
    accept: { "text/csv": [".csv"] },
    maxFiles: 1,
  });

  return (
    <div className="panel-card p-6 mt-6">
      <h2 className="section-title mb-5">Customization</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="input-label mb-2">Logo/Avatar</label>
          <div
            {...getLogoProps()}
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all cursor-pointer h-32
              ${isLogoDrag ? "border-primary-500 bg-primary-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
          >
            <input {...getLogoInputProps()} />
            {logoFile ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">
                  {logoFile.name}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <ImageIcon className="w-5 h-5 text-primary-500" />
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Upload zone
                </div>
                <button
                  type="button"
                  className="mt-1 bg-primary-600 text-white text-xs px-3 py-1.5 rounded-md font-medium"
                >
                  Add Logo (PNG/JPG)
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center w-full mb-3">
            <label className="input-label mb-0">QR Shape</label>
            <select
              name="shape"
              value={formData.shape || "square"}
              onChange={handleInputChange}
              className="input-field h-10 w-48 text-sm"
            >
              <option value="square">Square (Default)</option>
              <option value="rounded">Rounded</option>
              <option value="circle">Circles</option>
              <option value="gapped">Gapped</option>
              <option value="vertical">Vertical Bars</option>
              <option value="horizontal">Horizontal Bars</option>
            </select>
          </div>

          <div>
            <label className="input-label flex gap-2">Colors & Gradients</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1 block">
                  Background
                </span>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    name="bg_color"
                    value={formData.bg_color || "#FFFFFF"}
                    onChange={handleInputChange}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
                  />
                  <span className="text-xs font-medium text-slate-700 uppercase truncate">
                    {formData.bg_color || "#FFF"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1 block">
                  Foreground
                </span>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    name="fg_color"
                    value={formData.fg_color || "#000000"}
                    onChange={handleInputChange}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
                  />
                  <span className="text-xs font-medium text-slate-700 uppercase truncate">
                    {formData.fg_color || "#000"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1 block">
                  Gradient To
                </span>
                <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    name="gradient_color"
                    value={
                      formData.gradient_color || formData.fg_color || "#000000"
                    }
                    onChange={handleInputChange}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
                  />
                  <span className="text-xs font-medium text-slate-700 uppercase truncate">
                    {formData.gradient_color || formData.fg_color || "#000"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <select
                name="gradient_type"
                value={formData.gradient_type || "none"}
                onChange={handleInputChange}
                className="input-field h-10 w-full"
              >
                <option value="none">Solid Color (No Gradient)</option>
                <option value="radial">Radial Gradient</option>
                <option value="square">Square Gradient</option>
                <option value="horizontal">Horizontal Gradient</option>
                <option value="vertical">Vertical Gradient</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="input-label mb-0">Size Slider</label>
              <span className="text-xs font-bold text-slate-500">
                {formData.resolution * 50}x{formData.resolution * 50}px
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              name="resolution"
              value={formData.resolution || 10}
              onChange={handleInputChange}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <label className="input-label mb-2">Bulk Generation (CSV)</label>
        <div
          {...getCsvProps()}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer
            ${isCsvDrag ? "border-primary-500 bg-primary-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
        >
          <input {...getCsvInputProps()} />
          {csvFile ? (
            <div className="flex flex-col items-center gap-3">
              <FileText className="w-10 h-10 text-primary-500" />
              <span className="text-sm font-bold text-slate-700">
                {csvFile.name}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <UploadCloud className="w-8 h-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">
                Drag & Drop zone
              </span>
              <button
                type="button"
                className="mt-1 bg-primary-600 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-sm"
              >
                Upload CSV File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
