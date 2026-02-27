import React from "react";
import { QrCode, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-primary-50 p-1.5 rounded-lg group-hover:bg-primary-100 transition-colors">
              <QrCode className="w-6 h-6 text-primary-600" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Nexus<span className="text-primary-600 font-extrabold">QR</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/my-codes"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              My QR Codes
            </Link>
            <Link
              to="/help"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              Help
            </Link>
          </nav>

          {/* Right Action Section (Empty for now) */}
          <div className="flex items-center gap-4"></div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
