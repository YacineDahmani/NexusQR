import React, { useState } from "react";
import { Frame, Type, Pencil } from "lucide-react";

const FRAME_PRESETS = [
  { id: "none", label: "No Frame" },
  { id: "simple", label: "Simple" },
  { id: "rounded", label: "Rounded" },
  { id: "shadow", label: "Shadow" },
  { id: "badge", label: "Badge" },
  { id: "banner", label: "Banner" },
];

const CTA_PRESETS = [
  "Scan Me",
  "Scan to Connect",
  "Download App",
  "View Menu",
  "Follow Us",
  "Visit Website",
  "Learn More",
  "Get Offer",
  "Join Us",
  "Book Now",
];

const FRAME_COLORS = [
  { id: "dark", label: "Dark", value: "#1e293b" },
  { id: "blue", label: "Blue", value: "#2563eb" },
  { id: "emerald", label: "Green", value: "#059669" },
  { id: "rose", label: "Rose", value: "#e11d48" },
  { id: "violet", label: "Violet", value: "#7c3aed" },
  { id: "amber", label: "Amber", value: "#d97706" },
  { id: "white", label: "White", value: "#ffffff" },
];

const FrameSelector = ({ frame, onFrameChange }) => {
  const [customCta, setCustomCta] = useState("");

  const handleFrameStyleChange = (styleId) => {
    onFrameChange({ ...frame, style: styleId });
  };

  const handleCtaSelect = (text) => {
    setCustomCta("");
    onFrameChange({ ...frame, ctaText: text });
  };

  const handleCustomCtaChange = (e) => {
    setCustomCta(e.target.value);
    onFrameChange({ ...frame, ctaText: e.target.value });
  };

  const handleColorChange = (colorValue) => {
    onFrameChange({ ...frame, color: colorValue });
  };

  const isActive = frame.style !== "none";

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {FRAME_PRESETS.map((preset) => {
          const isSelected = frame.style === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleFrameStyleChange(preset.id)}
              className={`px-3.5 py-2 rounded-xl border-2 text-xs font-semibold transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? "border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 shadow-sm"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
                }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {isActive && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 mt-auto">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block">
              CTA Text
            </span>
            <div className="flex gap-1.5 flex-wrap mb-2">
              {CTA_PRESETS.map((text) => (
                <button
                  key={text}
                  onClick={() => handleCtaSelect(text)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer
                    ${
                      frame.ctaText === text && !customCta
                        ? "bg-primary-600 dark:bg-primary-500 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                >
                  {text}
                </button>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Pencil className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Or type custom text..."
                value={customCta}
                onChange={handleCustomCtaChange}
                maxLength={30}
                className="input-field pl-9 h-9 text-xs dark:bg-slate-800 dark:border-slate-600"
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block">
              Frame Color
            </span>
            <div className="flex gap-2">
              {FRAME_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorChange(c.value)}
                  title={c.label}
                  className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110 ${
                    frame.color === c.value
                      ? "border-primary-500 dark:border-primary-400 ring-2 ring-primary-200 dark:ring-primary-900 scale-110"
                      : "border-slate-200 dark:border-slate-600"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { FRAME_PRESETS, CTA_PRESETS, FRAME_COLORS };
export default FrameSelector;
