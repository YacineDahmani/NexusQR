import React from "react";
import {
  BookOpen,
  CheckCircle2,
  QrCode,
  Sliders,
  Settings,
} from "lucide-react";

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-4">
          How to use NexusQR
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Create, customize, and manage beautiful QR codes for Links, Social
          Media, vCards, WiFi, and more in seconds. Follow these simple steps to
          get started.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
        {/* Step 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border border-slate-100 rounded-2xl bg-white p-6 shadow-sm hover:shadow-card transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary-100 text-primary-600 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-2 md:left-1/2 shadow-sm z-10">
            1
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] pl-16 md:pl-0 md:pr-12 md:group-odd:pl-12 md:group-odd:pr-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Choose Type & Enter Details
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Start by picking a QR type from the top selector—URL, Text, WiFi,
              Social Media, or vCard. Type your information into the form, and
              the data will instantly be encoded into your QR code.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border border-slate-100 rounded-2xl bg-white p-6 shadow-sm hover:shadow-card transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary-100 text-primary-600 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-2 md:left-1/2 shadow-sm z-10">
            2
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] pl-16 md:pl-0 md:pr-12 md:group-odd:pl-12 md:group-odd:pr-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Customize the Design
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Upload your company logo to center it on the QR code. You can also
              match your brand identity by selecting custom foreground and
              background colors.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border border-slate-100 rounded-2xl bg-white p-6 shadow-sm hover:shadow-card transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary-100 text-primary-600 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-2 md:left-1/2 shadow-sm z-10">
            3
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] pl-16 md:pl-0 md:pr-12 md:group-odd:pl-12 md:group-odd:pr-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Preview & Download
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Watch your QR code update live as you type. Once you are
              satisfied, hit the Download button to get a high-resolution PNG,
              or save it to your account for later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
