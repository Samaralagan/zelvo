import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Services";
import { Users, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, QrCode, BarChart3, Star } from "lucide-react";

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        let start = 0;
        const iv = setInterval(() => {
          start = Math.min(start + 1, to);
          setVal(start);
          if (start >= to) clearInterval(iv);
        }, 80);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>;
}

/* ── Happy Clients: stacked avatar stack + star rating that fades in ── */
const AVATARS = [
  { bg: "bg-primary/40",   initials: "AJ", delay: 0    },
  { bg: "bg-highlight/30", initials: "MK", delay: 0.12 },
  { bg: "bg-primary/25",   initials: "SR", delay: 0.24 },
  { bg: "bg-highlight/20", initials: "TP", delay: 0.36 },
];

function HappyClientsViz() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      {/* Stacked avatars */}
      <div className="flex items-center">
        {AVATARS.map((a, i) => (
          <motion.div
            key={i}
            className={`relative h-10 w-10 rounded-full ${a.bg} border-2 border-card flex items-center justify-center text-xs font-bold text-foreground`}
            style={{ marginLeft: i === 0 ? 0 : -10, zIndex: AVATARS.length - i }}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: a.delay, duration: 0.4 }}
          >
            {a.initials}
          </motion.div>
        ))}
        <motion.div
          className="relative h-10 w-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-semibold text-muted-foreground"
          style={{ marginLeft: -10 }}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.48, duration: 0.4 }}
        >
          +3
        </motion.div>
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300, damping: 16 }}
          >
            <Star className="h-4 w-4 fill-highlight text-highlight" />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-xs text-muted-foreground text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        5.0 avg. satisfaction
      </motion.p>
    </div>
  );
}

/* ── Projects Finished: 4-step pipeline that fills in sequence ── */
const STEPS = ["Scoped", "Built", "Tested", "Delivered"];

function ProjectsViz() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setActive((s) => (s + 1) % (STEPS.length + 2));
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const filled = active % (STEPS.length + 2);

  return (
    <div className="flex flex-col justify-center gap-3 h-full">
      {STEPS.map((step, i) => {
        const done = i < filled;
        return (
          <div key={step} className="flex items-center gap-3">
            {/* circle */}
            <motion.div
              className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 border"
              animate={{
                backgroundColor: done ? "oklch(0.88 0.18 185 / 0.2)" : "oklch(0.5 0 0 / 0.08)",
                borderColor: done ? "oklch(0.88 0.18 185 / 0.6)" : "oklch(0.5 0 0 / 0.2)",
              }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="h-2 w-2 rounded-full"
                animate={{ backgroundColor: done ? "oklch(0.88 0.18 185)" : "oklch(0.5 0 0 / 0.3)" }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>

            {/* label + bar */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">{step}</span>
                {done && (
                  <motion.span
                    className="text-[10px] text-highlight font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.span>
                )}
              </div>
              <div className="h-1 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-highlight"
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Project data ── */
const projects = [
  {
    id: 1,
    name: "Zuno",
    tagline: "Restaurant Ordering Demo",
    url: "https://zuno-liart.vercel.app",
    urlDisplay: "zuno-liart.vercel.app",
    image: "/demo1.png",
    desc: "QR-based restaurant ordering experience that lets diners browse menus, customize items, manage a cart, and place orders directly from their table. Designed for fast mobile-first interactions and reduced waitstaff friction.",
    tags: ["QR Ordering", "Mobile-First UX", "Cart & Checkout Flow", "Table-Aware Ordering"],
    icon: QrCode,
    accent: "from-primary to-highlight",
  },
  {
    id: 2,
    name: "DebtIQ",
    tagline: "Technical Debt Dashboard Demo",
    url: "https://debtiq-mocha.vercel.app",
    urlDisplay: "debtiq-mocha.vercel.app",
    image: "/demo2.png",
    desc: "AI-assisted technical debt dashboard focused on identifying, scoring, and prioritizing maintainability issues across a codebase. Built to surface actionable insights through clear visualizations and debt scoring workflows.",
    tags: ["Debt Scoring", "Prioritization Workflow", "Analytics Dashboard", "AI-Assisted Insights"],
    icon: BarChart3,
    accent: "from-highlight to-primary",
  },
];

const AUTO_INTERVAL = 4000;

function ProgressRing({ progress }: { progress: number }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="36" height="36" className="absolute inset-0 -rotate-90">
      <circle cx="18" cy="18" r={r} fill="none" stroke="oklch(1 0 0 / 10%)" strokeWidth="2" />
      <circle
        cx="18" cy="18" r={r} fill="none"
        stroke="oklch(0.88 0.18 185)" strokeWidth="2"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - progress)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.1s linear" }}
      />
    </svg>
  );
}

const statCards = [
  {
    icon: Users,
    count: 7,
    suffix: "+",
    label: "Happy Clients",
    sub: "Businesses trust us",
    ring: "ring-primary/30",
    accentBar: "from-primary to-highlight",
    Viz: HappyClientsViz,
  },
  {
    icon: CheckCircle2,
    count: 13,
    suffix: "+",
    label: "Projects Finished",
    sub: "Delivered on time",
    ring: "ring-highlight/30",
    accentBar: "from-highlight to-primary",
    Viz: ProjectsViz,
  },
];

export function Work() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsed = useRef(0);

  function go(next: number, d?: number) {
    setDir(d ?? (next > current ? 1 : -1));
    setCurrent(next);
    elapsed.current = 0;
    setProgress(0);
  }

  useEffect(() => {
    if (paused) { if (tickRef.current) clearInterval(tickRef.current); return; }
    const TICK = 50;
    tickRef.current = setInterval(() => {
      elapsed.current += TICK;
      setProgress(elapsed.current / AUTO_INTERVAL);
      if (elapsed.current >= AUTO_INTERVAL) {
        elapsed.current = 0;
        setProgress(0);
        setDir(1);
        setCurrent((c) => (c + 1) % projects.length);
      }
    }, TICK);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [paused, current]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const p = projects[current];

  return (
    <section id="work" className="relative py-7 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Work"
          title="Real demos, real results."
          sub="A glimpse into what we ship — live demos you can explore right now."
        />

        {/* ── Stat cards — each ~half viewport width ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-2xl glass ring-1 ${s.ring} p-6 flex flex-row gap-6`}
            >
              {/* Subtle glow */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-highlight/8 blur-3xl pointer-events-none" />

              {/* Left: number + label */}
              <div className="flex flex-col justify-between gap-4 min-w-[120px]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-highlight/20 text-highlight">
                  <s.icon className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-5xl font-black tracking-tight text-gradient leading-none">
                    <Counter to={s.count} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-sm font-semibold">{s.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                </div>

                {/* Accent bar */}
                <motion.div
                  className={`h-0.5 rounded-full bg-gradient-to-r ${s.accentBar} overflow-hidden`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.4, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </div>

              {/* Divider */}
              <div className="w-px bg-border flex-shrink-0" />

              {/* Right: viz */}
              <div className="flex-1 min-h-[160px]">
                <s.Viz />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Project carousel ── */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-muted-foreground">Demo Projects</h3>
            <div className="flex items-center gap-3">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-highlight" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={p.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
                className="grid grid-cols-1 lg:grid-cols-2 glass rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-video lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-muted/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/20" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${p.accent} text-background`}>
                    Live Demo
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-highlight/20">
                        <p.icon className="h-5 w-5 text-highlight" />
                      </span>
                      <div>
                        <h4 className="text-xl font-bold">{p.name}</h4>
                        <p className="text-xs text-muted-foreground">{p.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium glass ring-1 ring-border text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-highlight text-highlight-foreground text-sm font-semibold transition-all hover:opacity-90 hover:glow-ring"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Demo
                    </a>
                    <span className="text-xs text-muted-foreground font-mono">{p.urlDisplay}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => go((current - 1 + projects.length) % projects.length, -1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-full glass hover:glow-ring transition-all z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => go((current + 1) % projects.length, 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 inline-flex items-center justify-center rounded-full glass hover:glow-ring transition-all z-10"
              aria-label="Next project"
            >
              <ProgressRing progress={progress} />
              <ChevronRight className="h-4 w-4 relative z-10" />
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            {current + 1} / {projects.length} · {paused ? "Paused" : "Auto-advancing"}
          </p>
        </div>
      </div>
    </section>
  );
}
