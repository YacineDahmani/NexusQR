import React from "react";
import {
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Globe,
  Link,
  Type,
  AtSign,
  FileText,
  MessageSquare,
  Wifi,
  Lock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Ghost,
  Music,
  MessageCircle,
  Calendar,
  Bitcoin,
  Upload,
  Clock,
  MapPin as MapPinIcon,
  AlignLeft,
} from "lucide-react";

const InputField = ({
  label,
  id,
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label htmlFor={id} className="input-label">
      {label}
    </label>
    <div className="relative relative-group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
      </div>
      <input
        type={type}
        id={id}
        name={id}
        className="input-field pl-10 h-11"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const TextAreaField = ({
  label,
  id,
  icon: Icon,
  placeholder,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1.5 w-full md:col-span-2">
    <label htmlFor={id} className="input-label">
      {label}
    </label>
    <div className="relative relative-group">
      <div className="absolute top-3 left-0 pl-3 pointer-events-none">
        <Icon className="h-4 w-4 text-slate-400 transition-colors" />
      </div>
      <textarea
        id={id}
        name={id}
        rows={3}
        className="input-field pl-10 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

const SelectField = ({ label, id, icon: Icon, value, onChange, options }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label htmlFor={id} className="input-label">
      {label}
    </label>
    <div className="relative relative-group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-400 transition-colors" />
      </div>
      <select
        id={id}
        name={id}
        className="input-field pl-10 h-11 appearance-none cursor-pointer"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const FileInputField = ({ label, id, icon: Icon, onChange }) => (
  <div className="flex flex-col gap-1.5 w-full md:col-span-2">
    <label htmlFor={id} className="input-label">
      {label}
    </label>
    <div className="relative relative-group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-400 transition-colors" />
      </div>
      <input
        type="file"
        id={id}
        name={id}
        className="input-field pl-10 h-11 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        onChange={onChange}
      />
    </div>
  </div>
);

const CheckboxField = ({ label, id, checked, onChange }) => (
  <div className="flex items-center gap-3 w-full">
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
    />
    <label
      htmlFor={id}
      className="text-sm font-medium text-slate-700 cursor-pointer"
    >
      {label}
    </label>
  </div>
);

const SOCIAL_PLATFORMS = [
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    prefix: "facebook.com/",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "#E4405F",
    prefix: "instagram.com/",
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    icon: Twitter,
    color: "#1DA1F2",
    prefix: "x.com/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    color: "#0A66C2",
    prefix: "linkedin.com/in/",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: Youtube,
    color: "#FF0000",
    prefix: "youtube.com/@",
  },
  {
    id: "snapchat",
    label: "Snapchat",
    icon: Ghost,
    color: "#FFFC00",
    prefix: "snapchat.com/add/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: Music,
    color: "#000000",
    prefix: "tiktok.com/@",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "#25D366",
    prefix: "wa.me/",
  },
];

const FORM_CONFIG = {
  vcard: {
    title: "Contact Details (vCard 3.0)",
    fields: [
      {
        id: "full_name",
        label: "Full Name",
        icon: User,
        placeholder: "e.g. Full name",
      },
      {
        id: "phone",
        label: "Phone Number",
        icon: Phone,
        placeholder: "+1 234 567 890",
      },
      {
        id: "email",
        label: "Email Address",
        icon: Mail,
        placeholder: "email@example.com",
      },
      {
        id: "organization",
        label: "Organization",
        icon: Building,
        placeholder: "Company Name",
      },
      {
        id: "address",
        label: "Address",
        icon: MapPin,
        placeholder: "City, Country",
      },
      {
        id: "website",
        label: "Website",
        icon: Globe,
        placeholder: "https://example.com",
      },
    ],
  },
  url: {
    title: "URL / Website Link",
    fields: [
      {
        id: "url",
        label: "URL",
        icon: Link,
        placeholder: "https://example.com",
        colSpan: 2,
      },
    ],
  },
  text: {
    title: "Plain Text",
    fields: [
      {
        id: "text",
        label: "Text Content",
        icon: Type,
        placeholder: "Enter your message here...",
        textarea: true,
      },
    ],
  },
  email: {
    title: "Email Message",
    fields: [
      {
        id: "email_to",
        label: "Recipient Email",
        icon: Mail,
        placeholder: "recipient@example.com",
      },
      {
        id: "subject",
        label: "Subject",
        icon: FileText,
        placeholder: "Email subject",
      },
      {
        id: "body",
        label: "Body",
        icon: Type,
        placeholder: "Type the email body here...",
        textarea: true,
      },
    ],
  },
  sms: {
    title: "SMS Message",
    fields: [
      {
        id: "phone",
        label: "Phone Number",
        icon: Phone,
        placeholder: "+1 234 567 890",
      },
      {
        id: "message",
        label: "Message",
        icon: MessageSquare,
        placeholder: "Hey! Check this out...",
        textarea: true,
      },
    ],
  },
  wifi: {
    title: "WiFi Network",
    fields: [
      {
        id: "ssid",
        label: "Network Name (SSID)",
        icon: Wifi,
        placeholder: "MyWiFiNetwork",
      },
      {
        id: "password",
        label: "Password",
        icon: Lock,
        placeholder: "Enter password",
      },
      {
        id: "encryption",
        label: "Encryption",
        icon: Lock,
        select: true,
        options: [
          { value: "WPA", label: "WPA/WPA2" },
          { value: "WEP", label: "WEP" },
          { value: "nopass", label: "None (Open)" },
        ],
      },
      { id: "hidden", label: "Hidden Network", checkbox: true },
    ],
  },
  event: {
    title: "Calendar Event (.ics)",
    fields: [
      {
        id: "event_title",
        label: "Event Title",
        icon: Calendar,
        placeholder: "Meeting with Client",
      },
      {
        id: "event_location",
        label: "Location",
        icon: MapPinIcon,
        placeholder: "Office or Zoom Link",
      },
      {
        id: "event_start",
        label: "Start Time",
        icon: Clock,
        placeholder: "YYYY-MM-DDTHH:MM",
        type: "datetime-local",
      },
      {
        id: "event_end",
        label: "End Time",
        icon: Clock,
        placeholder: "YYYY-MM-DDTHH:MM",
        type: "datetime-local",
      },
      {
        id: "event_description",
        label: "Description",
        icon: AlignLeft,
        placeholder: "Agenda overview...",
        textarea: true,
      },
    ],
  },
  crypto: {
    title: "Crypto Wallet",
    fields: [
      {
        id: "crypto_currency",
        label: "Currency",
        icon: Bitcoin,
        select: true,
        options: [
          { value: "bitcoin", label: "Bitcoin (BTC)" },
          { value: "ethereum", label: "Ethereum (ETH)" },
          { value: "litecoin", label: "Litecoin (LTC)" },
        ],
      },
      {
        id: "crypto_address",
        label: "Wallet Address",
        icon: Link,
        placeholder: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      },
      {
        id: "crypto_amount",
        label: "Payment Amount (Optional)",
        icon: Type,
        placeholder: "0.01",
        type: "number",
      },
    ],
  },
  pdf: {
    title: "Upload PDF Menu / Document",
    fields: [
      {
        id: "pdf_file",
        label: "PDF File",
        icon: Upload,
        file: true,
      },
    ],
  },
};

const SocialMediaForm = ({
  formData,
  handleInputChange,
  socialPlatform,
  onPlatformChange,
}) => {
  const platform =
    SOCIAL_PLATFORMS.find((p) => p.id === socialPlatform) ||
    SOCIAL_PLATFORMS[0];

  return (
    <div className="panel-card p-6">
      <h2 className="section-title">Social Media Profile</h2>

      <div className="flex gap-2 flex-wrap mb-6">
        {SOCIAL_PLATFORMS.map((p) => {
          const Icon = p.icon;
          const isActive = socialPlatform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onPlatformChange(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-sm font-semibold
                ${
                  isActive
                    ? "border-slate-300 bg-white shadow-sm"
                    : "border-transparent bg-slate-50 hover:bg-slate-100 text-slate-500"
                }`}
            >
              <Icon
                className="w-4 h-4"
                style={{ color: isActive ? p.color : undefined }}
                strokeWidth={2}
              />
              <span className={isActive ? "text-slate-800" : ""}>
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
          <label htmlFor="username" className="input-label">
            {platform.label} Username
          </label>
          <div className="relative relative-group flex">
            <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-500 font-medium whitespace-nowrap">
              {platform.prefix}
            </span>
            <input
              type="text"
              id="username"
              name="username"
              className="input-field rounded-l-none h-11"
              placeholder="username"
              value={formData.username || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DataForms = ({
  qrType,
  formData,
  handleInputChange,
  socialPlatform,
  onPlatformChange,
}) => {
  if (qrType === "social") {
    return (
      <SocialMediaForm
        formData={formData}
        handleInputChange={handleInputChange}
        socialPlatform={socialPlatform}
        onPlatformChange={onPlatformChange}
      />
    );
  }

  const config = FORM_CONFIG[qrType];
  if (!config) return null;

  return (
    <div className="panel-card p-6">
      <h2 className="section-title">{config.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {config.fields.map((field) => {
          if (field.textarea) {
            return (
              <TextAreaField
                key={field.id}
                label={field.label}
                id={field.id}
                icon={field.icon}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={handleInputChange}
              />
            );
          }

          if (field.select) {
            return (
              <SelectField
                key={field.id}
                label={field.label}
                id={field.id}
                icon={field.icon}
                value={formData[field.id] || field.options[0].value}
                onChange={handleInputChange}
                options={field.options}
              />
            );
          }

          if (field.checkbox) {
            return (
              <CheckboxField
                key={field.id}
                label={field.label}
                id={field.id}
                checked={
                  formData[field.id] === "true" || formData[field.id] === true
                }
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: field.id,
                      value: e.target.checked ? "true" : "false",
                    },
                  })
                }
              />
            );
          }

          if (field.file) {
            return (
              <FileInputField
                key={field.id}
                label={field.label}
                id={field.id}
                icon={field.icon}
                onChange={handleInputChange}
              />
            );
          }

          return (
            <div
              key={field.id}
              className={field.colSpan === 2 ? "md:col-span-2" : ""}
            >
              <InputField
                label={field.label}
                id={field.id}
                icon={field.icon}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={handleInputChange}
                type={field.type || "text"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { SOCIAL_PLATFORMS };
export default DataForms;
