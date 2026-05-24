import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#cases" },
  { label: "Technologies", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "glass"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-highlight/30">
              <span className="absolute inset-0 rounded-lg bg-highlight/20 blur-md group-hover:bg-highlight/40 transition" />
              <span className="relative font-bold text-highlight">Z</span>
            </span>
            <span className="font-semibold text-lg tracking-tight">Zelvo</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-gradient-to-r from-highlight to-primary" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLight((v) => !v)}
              aria-label="Toggle theme"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg glass hover:glow-ring transition"
            >
              {light ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-highlight-foreground hover:shadow-[0_0_24px_-4px_oklch(0.92_0.16_185/0.6)] transition-all hover:-translate-y-0.5"
            >
              Get Started
            </a>
            <button
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-2 rounded-2xl glass-strong p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex justify-center rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-highlight-foreground"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
