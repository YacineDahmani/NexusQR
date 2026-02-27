import React from "react";
import { User, Phone, Mail, Building, MapPin, Globe } from "lucide-react";

const InputField = ({
  label,
  id,
  icon: Icon,
  placeholder,
  value,
  onChange,
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
        type="text"
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

const ContactForm = ({ formData, handleInputChange }) => {
  return (
    <div className="panel-card p-6">
      <h2 className="section-title">Contact Details (vCard 3.0)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          label="Full Name"
          id="full_name"
          icon={User}
          placeholder="e.g. Full name"
          value={formData.full_name || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Phone Number"
          id="phone"
          icon={Phone}
          placeholder="+1 234 567 890"
          value={formData.phone || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Email Address"
          id="email"
          icon={Mail}
          placeholder="email@example.com"
          value={formData.email || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Organization"
          id="organization"
          icon={Building}
          placeholder="Company Name"
          value={formData.organization || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Address"
          id="address"
          icon={MapPin}
          placeholder="City, Country"
          value={formData.address || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Website"
          id="website"
          icon={Globe}
          placeholder="https://example.com"
          value={formData.website || ""}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ContactForm;
