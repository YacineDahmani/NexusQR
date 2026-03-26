import React from "react";
import {
  BookOpen,
  CheckCircle2,
  QrCode,
  Sliders,
  Settings,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:opacity-20" />
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary-100/50 dark:bg-primary-900/20 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 font-semibold text-sm mb-6 border border-primary-100 dark:border-primary-500/20 shadow-sm dark:shadow-none">
            <Sparkles className="w-4 h-4" />
            Welcome to NexusQR
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-6 leading-tight transition-colors">
            Master the art of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              smart connections
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 transition-colors">
            Create, customize, and manage beautiful QR codes for Links, Social
            Media, vCards, WiFi, and more in seconds. Stand out with
            professional designs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="btn-primary py-3 px-8 text-base shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 bg-gradient-to-r from-primary-600 to-indigo-600 border-none"
            >
              Start Generating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-4 transition-colors">
            How it works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">
            Three simple steps to your perfect QR code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-slate-100 dark:from-slate-800 via-slate-200 dark:via-slate-700 to-slate-100 dark:to-slate-800 z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none p-1 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-primary-500/20">
              <div className="w-full h-full rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white dark:ring-slate-900">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">
              Input Details
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs transition-colors">
              Pick a QR type (URL, Text, WiFi, vCard). Type your info, and it's
              instantly encoded.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none p-1 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-indigo-500/20">
              <div className="w-full h-full rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Sliders className="w-8 h-8" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white dark:ring-slate-900">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">
              Customize Design
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs transition-colors">
              Upload your company logo, select frames, and match colors to your
              brand identity perfectly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none p-1 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
              <div className="w-full h-full rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white dark:ring-slate-900">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">
              Export & Share
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs transition-colors">
              Preview live updates. Download in high-res PNG or save your
              templates for later use.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-colors duration-500"></div>
            <ShieldCheck className="w-10 h-10 text-primary-400 mb-6" />
            <h3 className="text-3xl font-bold mb-3">Secure & Private</h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              All your generated QR codes are processed securely. Your sensitive
              vCard or Wallet data is kept safe and generated flawlessly without
              storing unnecessary PII.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 md:p-10 text-slate-800 dark:text-white shadow-card dark:shadow-none hover:shadow-card-hover dark:hover:shadow-none transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-amber-50 dark:bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-500/15 rounded-xl text-amber-600 dark:text-amber-400 shadow-sm dark:shadow-none border border-amber-200 dark:border-amber-500/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold">Lightning Fast</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg transition-colors">
                Our engine renders custom stylized QR codes, including dynamic
                scaling, in under 100ms. Instantly preview your changes without
                any loading screens.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
            Credit: {" "}
            <a
              href="https://github.com/YacineDahmani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              Yacine Dahmani
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
