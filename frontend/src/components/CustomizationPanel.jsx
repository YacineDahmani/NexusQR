import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  Palette,
  LayoutTemplate,
  SlidersHorizontal,
} from "lucide-react";
import FrameSelector from "./FrameSelector";

const CustomizationPanel = ({
  formData,
  handleInputChange,
  logoFile,
  setLogoFile,
  csvFile,
  setCsvFile,
  frameConfig,
  onFrameChange,
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
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-primary-50 dark:bg-primary-500/10 rounded-lg">
          <SlidersHorizontal className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Design & Customization
        </h2>
      </div>

      <div className="space-y-8">
        {/* Design Block */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Appearance Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="input-label">Pattern Style</label>
                <select
                  name="shape"
                  value={formData.shape || "square"}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="square">Square Blocks (Classic)</option>
                  <option value="rounded">Rounded Dots</option>
                  <option value="circle">Perfect Circles</option>
                  <option value="gapped">Gapped Blocks</option>
                  <option value="vertical">Vertical Lines</option>
                  <option value="horizontal">Horizontal Lines</option>
                </select>
              </div>

              <div>
                <label className="input-label">Gradient Type</label>
                <select
                  name="gradient_type"
                  value={formData.gradient_type || "none"}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="none">Solid Color</option>
                  <option value="radial">Radial Gradient</option>
                  <option value="square">Square Gradient</option>
                  <option value="horizontal">Horizontal Sweep</option>
                  <option value="vertical">Vertical Sweep</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">Color Palette</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                      Background
                    </span>
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1.5 bg-white dark:bg-slate-800 shadow-sm">
                      <input
                        type="color"
                        name="bg_color"
                        value={formData.bg_color || "#FFFFFF"}
                        onChange={handleInputChange}
                        className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
                      />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase truncate">
                        {formData.bg_color || "#FFF"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                      Foreground
                    </span>
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1.5 bg-white dark:bg-slate-800 shadow-sm">
                      <input
                        type="color"
                        name="fg_color"
                        value={formData.fg_color || "#000000"}
                        onChange={handleInputChange}
                        className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0"
                      />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase truncate">
                        {formData.fg_color || "#000"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                      Gradient
                    </span>
                    <div
                      className={`flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg p-1.5 bg-white dark:bg-slate-800 shadow-sm ${formData.gradient_type === "none" ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="color"
                        name="gradient_color"
                        value={
                          formData.gradient_color ||
                          formData.fg_color ||
                          "#000000"
                        }
                        onChange={handleInputChange}
                        disabled={formData.gradient_type === "none"}
                        className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0 flex-shrink-0 disabled:cursor-not-allowed"
                      />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase truncate">
                        {formData.gradient_color || formData.fg_color || "#000"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="input-label mb-0">Code Size</label>
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 rounded">
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
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500 hover:accent-primary-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Frame Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Center Logo
              </h3>
            </div>
            <div
              {...getLogoProps()}
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer h-40
                ${isLogoDrag ? "border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-500/10" : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/80"}`}
            >
              <input {...getLogoInputProps()} />
              {logoFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {logoFile.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Click to replace
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                    <UploadCloud className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Upload custom logo
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <LayoutTemplate className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Scanner Frame
              </h3>
            </div>
            {/* Wrapping FrameSelector to ensure it matches the new card style */}
            <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 p-4 rounded-xl min-h-[160px]">
              <FrameSelector
                frame={frameConfig}
                onFrameChange={onFrameChange}
              />
            </div>
          </div>
        </div>

        {/* Bulk Generation Block */}
        <div className="border-t border-slate-100 dark:border-slate-700/50 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-0">
              Bulk Generate from CSV
            </h3>
          </div>
          <div
            {...getCsvProps()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col md:flex-row items-center justify-center gap-6 transition-all cursor-pointer
              ${isCsvDrag ? "border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-500/10" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80"}`}
          >
            <input {...getCsvInputProps()} />
            {csvFile ? (
              <div className="flex items-center gap-4 w-full justify-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-bold text-slate-700 dark:text-slate-200">
                    {csvFile.name}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Ready for batch processing
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex-shrink-0">
                  <UploadCloud className="w-8 h-8 text-primary-500 dark:text-primary-400" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-base font-bold text-slate-800 dark:text-white">
                    Upload CSV File
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                    Drag and drop your spreadsheet here or click to browse.
                    Generate hundreds of QR codes at once.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
