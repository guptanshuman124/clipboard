import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa";

const Receive = () => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const code = digits.join("");

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-move to next
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter" && code.length === 4) {
      handleRetrieve();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pasted.length > 0) {
      const newDigits = pasted.split("").concat(["", "", "", ""]).slice(0, 4);
      setDigits(newDigits as ["", "" | "", "" | "", ""]);
      pasted.split("").forEach((char, i) => {
        if (inputRefs.current[i]) inputRefs.current[i]!.value = char;
      });
      const nextFocus = Math.min(pasted.length, 3);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleRetrieve = async () => {
    if (code.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/receive`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const { message, success } = await response.json();

      if (success) {
        setReceivedMessage(message);
        toast.success("Message received successfully!");
      } else {
        toast.error(message || "Invalid or expired code");
      }
    } catch {
      toast.error("Failed to retrieve message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(receivedMessage);
    toast.success("Message copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {createPortal(
        <ToastContainer
          position="top-right"
          theme="dark"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          style={{ zIndex: 99999 }}
          toastStyle={{
            background: "linear-gradient(145deg, #0f0f14, #181826)",
            border: "1px solid rgba(139, 92, 246, 0.25)",
            borderRadius: "14px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.6), 0 0 18px rgba(139,92,246,0.25)",
            color: "#ede9fe",
          }}
        />,
        document.getElementById("toast-root")!
      )}

      {!receivedMessage ? (
        <>
          <h2 className="text-3xl font-bold text-white text-center">
            Receive Message
          </h2>

          {/* 4-Digit PIN Style Input */}
          <div className="flex justify-center gap-4 my-8">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[i]}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                title={`Digit ${i + 1} of 4`}
                className="w-16 h-20 text-4xl font-bold text-center
                 bg-[#1a1a1a]/80 backdrop-blur
                 border border-white/10 rounded-2xl
                 text-white outline-none
                 focus:border-purple-500/70 focus:scale-105
                 transition-all duration-200"
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            <kbd className="px-2 py-1 rounded bg-white/10 text-gray-300">
              Enter
            </kbd>{" "}
            to retrieve
          </p>

          <button
            onClick={handleRetrieve}
            disabled={isLoading || code.length !== 4}
            className="mt-6 py-5 rounded-2xl text-xl font-bold
                       bg-gradient-to-r from-purple-600 to-purple-700
                       text-white shadow-lg hover:shadow-purple-500/30
                       disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Retrieving..." : "Retrieve Message"}
          </button>
        </>
      ) : (
        <>
          {/* Message View - Same as Send */}
          <div className="relative flex-1">
            <button
              onClick={handleCopy}
              title="Copy message"
              className="absolute top-4 right-4 z-10 opacity-70 hover:opacity-100 transition p-2"
            >
              <FaCopy className="w-6 h-6 text-white" />
            </button>

            <textarea
              value={receivedMessage}
              readOnly
              placeholder="Received message will appear here"
              className="
                w-full h-full min-h-[260px]
                resize-none rounded-2xl
                bg-[#1a1a1a]/80 backdrop-blur
                border border-green-500/40
                p-6 pr-14 pt-16 text-white text-lg
                outline-none
                overflow-auto
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            />
          </div>

          <div className="flex justify-end text-sm text-gray-400">
            <span>{receivedMessage.length} / 1000</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Receive;
