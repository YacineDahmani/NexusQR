import React from "react";
import { QrCode, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 w-full shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent bottom-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3">
              <QrCode className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-800 flex items-center">
              Nexus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                QR
              </span>
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50 shadow-inner">
            <Link
              to="/"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 focus-visible:bg-white focus-visible:text-primary-700 focus-visible:shadow-sm"
              activeclassname="bg-white text-primary-700 shadow-sm ring-1 ring-slate-200/50"
            >
              Generator
            </Link>
            <Link
              to="/my-codes"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
            >
              Library
            </Link>
            <Link
              to="/help"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
            >
              Help & Resources
            </Link>
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:flex btn-primary py-2.5 px-5 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 text-sm font-bold bg-gradient-to-r from-primary-600 to-indigo-600 border-none group"
            >
              Create New QR
              <User className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100" />
            </Link>
            <button className="sm:hidden p-2 text-slate-600 bg-slate-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
