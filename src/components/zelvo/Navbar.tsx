import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Technologies", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(true);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
          <a href="#home" className="flex items-center group">
            <img
              src={light ? "/logo_dark.png" : "/logo_light.png"}
              alt="Zelvo Tech Solutions"
              className="h-10 w-auto object-contain transition-opacity group-hover:opacity-85"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative px-3 py-2 text-sm transition-colors group ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px origin-left transition-transform bg-gradient-to-r from-highlight to-primary ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLight((v) => !v)}
              aria-label="Toggle theme"
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-muted px-1 py-1 transition-all hover:glow-ring"
            >
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                light ? "bg-highlight text-highlight-foreground shadow-sm" : "text-muted-foreground"
              }`}>
                <Sun className="h-3.5 w-3.5" />
              </span>
              <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                !light ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              }`}>
                <Moon className="h-3.5 w-3.5" />
              </span>
            </button>
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
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-highlight/10 text-highlight font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
            <div className="mt-2 pt-2 border-t border-border">
              <button
                onClick={() => setLight((v) => !v)}
                aria-label="Toggle theme"
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <span className="text-muted-foreground">{light ? "Light Mode" : "Dark Mode"}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-1 py-1">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                    light ? "bg-highlight text-highlight-foreground" : "text-muted-foreground"
                  }`}>
                    <Sun className="h-3 w-3" />
                  </span>
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                    !light ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}>
                    <Moon className="h-3 w-3" />
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
