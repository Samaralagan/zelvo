import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Message = { from: "bot" | "user"; text: string };

const GREET: Message = {
  from: "bot",
  text: "👋 Hi! I'm Claro Tech's assistant. Ask me about our services, process, or how to get started.",
};

const RESPONSES: { match: RegExp; reply: string }[] = [
  { match: /service|offer|build|develop/i, reply: "We build custom web apps, enterprise ERP systems, POS solutions, cloud infrastructure, and corporate websites. Which interests you most?" },
  { match: /erp|enterprise/i, reply: "Our ERP solutions unify finance, HR, inventory and operations into one platform. We handle everything from design to deployment." },
  { match: /price|cost|budget|quote/i, reply: "Pricing depends on scope. We offer a free consultation to give you an accurate estimate — just head to the Contact section!" },
  { match: /process|how.*work|step/i, reply: "We follow 4 phases: Discovery → Development → Deployment → Support. Each phase has clear deliverables and demos." },
  { match: /cloud|aws|infra/i, reply: "We design auto-scaling cloud infrastructure with 99.99% uptime SLAs using AWS, Cloudflare, and Docker." },
  { match: /contact|reach|talk|consult/i, reply: "You can reach us via the contact form on this page. We respond within one business day." },
  { match: /time|long|duration|deadline/i, reply: "Timelines vary by project. A typical web app takes 6–12 weeks. ERP systems can take 3–6 months. We'll give you a clear timeline after discovery." },
  { match: /tech|stack|language|react|java/i, reply: "Our stack includes React, Next.js, TypeScript, Java, Spring Boot, Node.js, PostgreSQL, Docker, AWS and more." },
  { match: /hello|hi|hey|good/i, reply: "Hello! 👋 How can I help you today? Feel free to ask about our services, pricing, or process." },
  { match: /thank/i, reply: "You're welcome! Is there anything else I can help you with?" },
];

function getBotReply(input: string): string {
  for (const r of RESPONSES) {
    if (r.match.test(input)) return r.reply;
  }
  return "Great question! For detailed answers, please use the contact form below. We'd love to chat!";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREET]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: getBotReply(text) }]);
    }, 900);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-80 sm:w-96 rounded-2xl glass-strong border border-border shadow-[0_20px_60px_-10px_oklch(0_0_0/0.5)] overflow-hidden flex flex-col"
            style={{ height: "440px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-highlight/20 border border-highlight/30 grid place-items-center">
                  <Bot className="h-4 w-4 text-highlight" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Claro Tech Assistant</div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="h-7 w-7 rounded-lg hover:bg-muted grid place-items-center transition">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "bg-highlight text-highlight-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex items-center gap-2 rounded-xl bg-background/60 border border-border px-3 py-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="h-7 w-7 rounded-lg bg-highlight grid place-items-center disabled:opacity-40 transition"
                >
                  <Send className="h-3.5 w-3.5 text-highlight-foreground" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-highlight shadow-[0_0_32px_-4px_oklch(0.88_0.18_185/0.6)] grid place-items-center transition-all"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6 text-highlight-foreground" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="h-6 w-6 text-highlight-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
