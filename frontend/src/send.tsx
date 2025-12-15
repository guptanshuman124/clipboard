import { useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiResetLeftFill } from "react-icons/ri";

const Send = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message before sending.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: message.trim() }),
        }
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      setMessage("");
      setIsLoading(false);

      toast.success("Message sent successfully!");
      navigator.clipboard.writeText(data.uniqueCode);
      toast.success(`Code copied: ${data.uniqueCode}`);
    } catch {
      toast.error("Failed to send message");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-5">
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
            border: "1px solid rgba(139, 92, 246, 0.25)", // violet-500
            borderRadius: "14px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.6), 0 0 18px rgba(139,92,246,0.25)",
            color: "#ede9fe",
          }}
        />,
        document.getElementById("toast-root")!
      )}

      {/* Textarea */}
      <div className="relative flex-1">
        <button
          onClick={() => setMessage("")}
          disabled={!message}
          title="Reset message"
          className="absolute top-4 right-4 z-10 opacity-70 hover:opacity-100 disabled:opacity-40 transition"
        >
          <RiResetLeftFill className="w-6 h-6 text-white" />
        </button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your message"
          className="
            w-full h-full min-h-[260px]
            resize-none rounded-2xl
            bg-[#1a1a1a]/80 backdrop-blur
            border border-white/10
            p-6 pr-14 text-white text-lg
            outline-none focus:border-purple-500/60
            overflow-auto
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-400 px-1">
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
            Enter
          </kbd>{" "}
          to send ·{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
            Shift + Enter
          </kbd>{" "}
          for new line
        </span>
        <span>{message.length} / 1000</span>
      </div>

      {/* Button */}
      <button
        onClick={handleSend}
        disabled={isLoading || !message.trim()}
        className="py-5 rounded-2xl text-xl font-bold
                   bg-gradient-to-r from-purple-600 to-purple-700
                   text-white shadow-lg hover:shadow-purple-500/30
                   disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </div>
  );
};

export default Send;
