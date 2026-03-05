import React from "react";
import {
  User,
  Link,
  Type,
  Mail,
  MessageSquare,
  Wifi,
  Share2,
  Calendar,
  Bitcoin,
  FileText,
} from "lucide-react";

const QR_TYPES = [
  {
    id: "vcard",
    label: "vCard",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    activeBg: "bg-blue-100",
  },
  {
    id: "url",
    label: "URL",
    icon: Link,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    activeBg: "bg-emerald-100",
  },
  {
    id: "text",
    label: "Text",
    icon: Type,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    activeBg: "bg-amber-100",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    activeBg: "bg-rose-100",
  },
  {
    id: "sms",
    label: "SMS",
    icon: MessageSquare,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    activeBg: "bg-violet-100",
  },
  {
    id: "wifi",
    label: "WiFi",
    icon: Wifi,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    activeBg: "bg-cyan-100",
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    activeBg: "bg-pink-100",
  },
  {
    id: "event",
    label: "Event",
    icon: Calendar,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    activeBg: "bg-orange-100",
  },
  {
    id: "crypto",
    label: "Crypto",
    icon: Bitcoin,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    activeBg: "bg-yellow-100",
  },
  {
    id: "pdf",
    label: "PDF",
    icon: FileText,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    activeBg: "bg-red-100",
  },
];

const TypeSelector = ({ activeType, onTypeChange }) => {
  return (
    <div className="panel-card p-4">
      <h2 className="section-title mb-3">Choose QR Type</h2>
      <div className="flex gap-2 overflow-x-auto pt-2 pb-2 px-1 -mx-1 scrollbar-thin items-center">
        {QR_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`group flex flex-col items-center gap-1.5 min-w-[72px] px-3 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer shrink-0
                ${
                  isActive
                    ? `${type.activeBg} dark:bg-opacity-20 ${type.border} dark:border-opacity-40 shadow-inner scale-[0.98]`
                    : `bg-white dark:bg-slate-800/80 border-slate-100 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 hover:shadow-sm`
                }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${isActive ? type.bg + " dark:bg-opacity-20" : "bg-slate-50 dark:bg-slate-800 dark:group-hover:bg-slate-600"}`}
              >
                <Icon
                  className={`w-4.5 h-4.5 transition-colors ${isActive ? type.color : "text-slate-400 dark:text-slate-400 dark:group-hover:text-white"}`}
                  strokeWidth={2}
                />
              </div>
              <span
                className={`text-[11px] font-semibold leading-tight transition-colors ${isActive ? "text-slate-800 dark:text-white" : "text-slate-500 dark:text-slate-400 dark:group-hover:text-white"}`}
              >
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { QR_TYPES };
export default TypeSelector;
