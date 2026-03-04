import { useState, useRef, useEffect } from "react";

const SUGGESTED = [
  "Best keyboard for a clean desk?",
  "MagSafe charger recommendation",
  "Headphones for deep focus?",
  "Monitor for design work?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#94a3b8",
            display: "inline-block",
            animation: `typingPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 16,
        animation: "fadeSlideIn 0.3s ease both",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            border: "1px solid #334155",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginRight: 10,
            marginTop: 2,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px" }}>A</span>
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          padding: isUser ? "10px 14px" : "12px 16px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
          background: isUser
            ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
            : "rgba(255,255,255,0.04)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
          color: isUser ? "#fff" : "#cbd5e1",
          fontSize: 13.5,
          lineHeight: 1.65,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.01em",
        }}
        dangerouslySetInnerHTML={{
          __html: msg.content
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
              '<a href="$2" target="_blank" rel="noopener noreferrer sponsored" style="color:#818cf8;text-decoration:underline;text-underline-offset:3px;font-weight:600;">$1</a>'
            )
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}

export default function ATYConcierge() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "ATY Digital Concierge, at your service.\n\nWhat are you building?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    setShowSuggested(false);
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Ahora llamamos a nuestra propia API interna
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      
      // Adaptamos la respuesta que viene de nuestra API
      const reply = data.content?.[0]?.text || "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0f1e; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        textarea { resize: none; }
        textarea:focus { outline: none; }
        button { cursor: pointer; border: none; }
        button:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 440,
          height: "90vh",
          maxHeight: 720,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #0f1629 0%, #090d1a 100%)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Logo mark */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 800, color: "#e2e8f0" }}>A</span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#f1f5f9",
                      letterSpacing: "0.02em",
                    }}
                  >
                    ATY Concierge
                  </span>
                  {/* Live indicator */}
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10b981",
                      display: "inline-block",
                      animation: "pulseGlow 2s ease-in-out infinite",
                    }}
                  />
                </div>
                <span style={{ fontSize: 10.5, color: "#475569", fontWeight: 400 }}>
                  Premium Workspace Curation
                </span>
              </div>
            </div>

            {/* Affiliate badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 20,
                padding: "3px 8px",
              }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L6.18 3.4L9 3.82L7 5.76L7.45 8.56L5 7.31L2.55 8.56L3 5.76L1 3.82L3.82 3.4L5 1Z" fill="#10b981" />
              </svg>
              <span style={{ fontSize: 9.5, color: "#10b981", fontWeight: 600, letterSpacing: "0.05em" }}>
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px 8px",
          }}
        >
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}

          {loading && (
            <div style={{ display: "flex", marginBottom: 16, animation: "fadeSlideIn 0.2s ease" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  border: "1px solid #334155",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginRight: 10,
                  marginTop: 2,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800, color: "#e2e8f0" }}>A</span>
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px 18px 18px 18px",
                }}
              >
                <TypingDots />
              </div>
            </div>
          )}

          {/* Suggested prompts */}
          {showSuggested && messages.length <= 1 && (
            <div style={{ marginTop: 8, marginBottom: 4, animation: "fadeSlideIn 0.5s 0.3s ease both" }}>
              <p style={{ fontSize: 10.5, color: "#475569", marginBottom: 8, letterSpacing: "0.06em", fontWeight: 500 }}>
                POPULAR SEARCHES
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10,
                      padding: "8px 12px",
                      color: "#94a3b8",
                      fontSize: 12.5,
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(99,102,241,0.08)";
                      e.target.style.borderColor = "rgba(99,102,241,0.25)";
                      e.target.style.color = "#c7d2fe";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.03)";
                      e.target.style.borderColor = "rgba(255,255,255,0.07)";
                      e.target.style.color = "#94a3b8";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div
          style={{
            padding: "12px 16px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "8px 8px 8px 14px",
              transition: "border-color 0.2s ease",
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about your setup…"
              rows={1}
              disabled={loading}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#e2e8f0",
                fontSize: 13.5,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.5,
                maxHeight: 80,
                overflowY: "auto",
                paddingTop: 3,
                caretColor: "#818cf8",
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                  : "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
                boxShadow: input.trim() && !loading ? "0 4px 12px rgba(99,102,241,0.35)" : "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke={input.trim() && !loading ? "#fff" : "#475569"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: 10, color: "#334155", marginTop: 8, letterSpacing: "0.03em" }}>
            Affiliate links support independent research ·{" "}
            <a href="https://atydigitalstore.com" target="_blank" rel="noopener noreferrer"
              style={{ color: "#475569", textDecoration: "none" }}>
              atydigitalstore.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
