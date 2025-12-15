import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Send from "./send";
import Receive from "./receive";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [isSend, setIsSend] = useState(true);

  return (
    <StrictMode>
      <Analytics />

      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden px-4">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6d28d920,transparent_70%)] pointer-events-none" />

        {/* Title */}
        <div className="text-center mb-8 z-10">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-600">
            ONCV
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            One-Time Code Vault
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-3xl bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Tabs */}
          <div className="relative flex bg-[#1a1a1a]/60 p-3">
            
            {/* Sliding indicator (FIXED) */}
            <div
              className={`
                absolute top-3 bottom-3 left-3
                w-[calc(50%-0.75rem)]
                rounded-2xl
                bg-gradient-to-r from-purple-500 to-purple-600
                shadow-lg
                transition-transform duration-500 ease-out
                ${isSend ? "translate-x-0" : "translate-x-full"}
              `}
            />

            {/* Send tab */}
            <button
              onClick={() => setIsSend(true)}
              className="relative z-10 flex-1 py-4 rounded-2xl
                         flex items-center justify-center gap-2
                         text-lg font-semibold transition"
            >
              <span className={isSend ? "text-white" : "text-gray-400"}>
                ✈ Send
              </span>
            </button>

            {/* Receive tab */}
            <button
              onClick={() => setIsSend(false)}
              className="relative z-10 flex-1 py-4 rounded-2xl
                         flex items-center justify-center gap-2
                         text-lg font-semibold transition"
            >
              <span className={!isSend ? "text-white" : "text-gray-400"}>
                ↓ Receive
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 pb-10">
            {isSend ? <Send /> : <Receive />}
          </div>
        </div>
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
