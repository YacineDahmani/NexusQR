import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Generator from "./pages/Generator";
import Help from "./pages/Help";
import MyQrCodes from "./pages/MyQrCodes";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Sticky top navigation */}
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Generator />} />
            <Route path="/help" element={<Help />} />
            <Route path="/my-codes" element={<MyQrCodes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
