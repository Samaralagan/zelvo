import { motion, animate, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Code2, Building2, Globe, RefreshCw, ScanLine, CloudCog,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Web Applications",
    desc: "Bespoke web platforms engineered for scale, security and measurable business outcomes.",
    visual: "api",
    span: "lg:col-span-2",
  },
  {
    icon: Building2,
    title: "Enterprise ERP Systems",
    desc: "End-to-end ERP suites that unify finance, inventory, HR and operations.",
    visual: "chart",
  },
  {
    icon: Globe,
    title: "Corporate Websites",
    desc: "Brand-defining, SEO-first websites built with performance budgets in mind.",
    visual: "grid",
  },
  {
    icon: RefreshCw,
    title: "Legacy Modernization",
    desc: "Migrate legacy systems to cloud-native architectures without downtime.",
    visual: "refresh",
    span: "lg:col-span-2",
  },
  {
    icon: ScanLine,
    title: "POS & Business Automation",
    desc: "Reliable POS and workflow automation that scales across locations.",
    visual: "pos",
  },
  {
    icon: CloudCog,
    title: "Cloud Infrastructure",
    desc: "Auto-scaling cloud foundations engineered for 99.99% availability.",
    visual: "cloud",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-7 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Services"
          title="A complete digital engineering practice."
          sub="From first prototype to global rollout — Zelvo ships software that moves the business."
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <BentoCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ service: s, index: i }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(30);
  const [hovered, setHovered] = useState(false);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className={`group relative overflow-hidden rounded-2xl glass p-6 ${s.span ?? ""}`}
    >
      {/* spotlight glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(380px circle at ${x}% ${y}%, oklch(0.92 0.16 185 / 0.11), transparent 65%)`,
          ),
        }}
      />
      {/* animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "inset 0 0 0 1px oklch(0.92 0.16 185 / 0.45)" }}
      />
      <div className="relative flex items-start justify-between" style={{ transform: "translateZ(12px)" }}>
        <motion.span
          animate={hovered ? { scale: 1.15, boxShadow: "0 0 18px 4px oklch(0.92 0.16 185 / 0.35)" } : { scale: 1, boxShadow: "none" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-highlight/20"
        >
          <s.icon className="h-5 w-5 text-highlight" />
        </motion.span>
        <span className="text-xs text-muted-foreground">0{i + 1}</span>
      </div>
      <h3 className="relative mt-5 text-xl font-semibold tracking-tight" style={{ transform: "translateZ(8px)" }}>{s.title}</h3>
      <p className="relative mt-2 text-sm text-muted-foreground">{s.desc}</p>
      <motion.div
        className="relative mt-6"
        animate={hovered ? { scale: 1.03, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <ServiceVisual kind={s.visual} />
      </motion.div>
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow, title, sub,
}: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-highlight">
        <span className="h-px w-6 bg-highlight/60" /> {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ── API Visual ── */
const API_LINES = [
  { text: "GET /api/v1/orders", highlight: true },
  { text: "200 OK · 32ms", highlight: false },
  { text: "POST /api/v1/sync", highlight: true },
  { text: "200 OK · 18ms", highlight: false },
  { text: "GET /api/v1/users", highlight: true },
  { text: "200 OK · 11ms", highlight: false },
];

function ApiVisual() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [typed, setTyped] = useState("");
  const lineIndex = visibleCount % API_LINES.length;
  const target = API_LINES[lineIndex].text;

  useEffect(() => {
    setTyped("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(iv);
        setTimeout(() => setVisibleCount((c) => c + 1), 600);
      }
    }, 38);
    return () => clearInterval(iv);
  }, [visibleCount]);

  const shown = API_LINES.slice(Math.max(0, visibleCount - 3), visibleCount);

  return (
    <div className="h-24 rounded-lg bg-background/50 border border-border p-3 font-mono text-[10px] leading-relaxed text-muted-foreground overflow-hidden">
      {shown.map((l, i) => (
        <div key={i} className={l.highlight ? "text-highlight" : ""}>{l.text}</div>
      ))}
      <div className={API_LINES[lineIndex].highlight ? "text-highlight" : ""}>
        {typed}<span className="animate-pulse">▌</span>
      </div>
    </div>
  );
}

/* ── Chart Visual ── */
const BAR_HEIGHTS = [40, 60, 35, 80, 55, 90, 70, 95, 60, 100];
const BAR_HEIGHTS_ALT = [70, 45, 85, 50, 95, 40, 80, 55, 90, 65];

function ChartVisual() {
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setToggled((v) => !v), 1800);
    return () => clearInterval(iv);
  }, []);
  const heights = toggled ? BAR_HEIGHTS_ALT : BAR_HEIGHTS;
  return (
    <div className="h-24 rounded-lg bg-background/50 border border-border p-3 flex items-end gap-1.5">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: "easeInOut" }}
          className="flex-1 rounded-sm bg-gradient-to-t from-primary to-highlight origin-bottom"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* ── Grid / Corporate Visual ── */
function GridVisual() {
  const scanY = useMotionValue(0);
  const opacity = useTransform(scanY, [0, 40, 80, 100], [0, 1, 1, 0]);
  useEffect(() => {
    const ctrl = animate(scanY, [0, 100], {
      duration: 2.2,
      repeat: Infinity,
      repeatDelay: 0.6,
      ease: "linear",
    });
    return () => ctrl.stop();
  }, []);
  const dots = Array.from({ length: 24 });
  return (
    <div className="h-24 rounded-lg bg-background/50 border border-border relative overflow-hidden">
      <div className="absolute inset-2 grid grid-cols-6 grid-rows-4 gap-1.5">
        {dots.map((_, i) => (
          <div key={i} className="rounded-full bg-muted-foreground/25 w-1.5 h-1.5 mx-auto my-auto" />
        ))}
      </div>
      <motion.div
        className="absolute inset-x-0 h-6 pointer-events-none"
        style={{
          top: useTransform(scanY, (v) => `${v}%`),
          opacity,
          background: "linear-gradient(to bottom, transparent, oklch(0.92 0.16 185 / 0.18), transparent)",
        }}
      />
    </div>
  );
}

/* ── Refresh / Legacy Visual ── */
function RefreshVisual() {
  const [phase, setPhase] = useState<"old" | "migrating" | "new">("old");
  useEffect(() => {
    const cycle = () => {
      setPhase("migrating");
      setTimeout(() => setPhase("new"), 900);
      setTimeout(() => setPhase("old"), 2400);
    };
    const iv = setInterval(cycle, 3200);
    return () => clearInterval(iv);
  }, []);
  const rows = ["w-3/4", "w-1/2", "w-2/3"];
  return (
    <div className="h-24 rounded-lg bg-background/50 border border-border p-3 flex items-center gap-3">
      <div className="flex-1 space-y-1.5">
        {rows.map((w, i) => (
          <motion.div
            key={i}
            animate={{ opacity: phase === "new" ? 0 : 1, x: phase === "migrating" ? -4 : 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`h-2 rounded bg-muted ${w}`}
          />
        ))}
      </div>
      <motion.div
        animate={{ rotate: phase === "migrating" ? 360 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <RefreshCw className="h-5 w-5 text-highlight" />
      </motion.div>
      <div className="flex-1 space-y-1.5">
        {["w-full", "w-5/6", "w-3/4"].map((w, i) => (
          <motion.div
            key={i}
            animate={{ opacity: phase === "new" ? 1 : 0, x: phase === "new" ? 0 : 4 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`h-2 rounded bg-gradient-to-r from-primary to-highlight ${w}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── POS Visual ── */
function PosVisual() {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setActive(i % 9);
      i++;
    }, 220);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="h-24 rounded-lg bg-background/50 border border-border p-3 grid grid-cols-3 gap-1.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            backgroundColor: active === i
              ? "oklch(0.92 0.16 185 / 0.45)"
              : "oklch(0.5 0 0 / 0.12)",
            scale: active === i ? 1.06 : 1,
          }}
          transition={{ duration: 0.18 }}
          className="rounded"
        />
      ))}
    </div>
  );
}

/* ── Cloud Visual ── */
const NODES = [
  { cx: "15%", cy: "40%" },
  { cx: "50%", cy: "18%" },
  { cx: "85%", cy: "40%" },
  { cx: "30%", cy: "72%" },
  { cx: "70%", cy: "72%" },
];
const EDGES = [
  { x1: "15%", y1: "40%", x2: "50%", y2: "18%" },
  { x1: "50%", y1: "18%", x2: "85%", y2: "40%" },
  { x1: "15%", y1: "40%", x2: "30%", y2: "72%" },
  { x1: "85%", y1: "40%", x2: "70%", y2: "72%" },
  { x1: "30%", y1: "72%", x2: "70%", y2: "72%" },
];

function CloudVisual() {
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setPulseIdx((v) => (v + 1) % NODES.length), 700);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="h-24 rounded-lg bg-background/50 border border-border relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {EDGES.map((e, i) => (
          <motion.line
            key={i}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="oklch(0.92 0.16 185)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r="5"
            fill="oklch(0.92 0.16 185)"
            animate={{
              opacity: pulseIdx === i ? 1 : 0.35,
              r: pulseIdx === i ? 7 : 5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

function ServiceVisual({ kind }: { kind: string }) {
  if (kind === "chart") return <ChartVisual />;
  if (kind === "api") return <ApiVisual />;
  if (kind === "cloud") return <CloudVisual />;
  if (kind === "refresh") return <RefreshVisual />;
  if (kind === "pos") return <PosVisual />;
  return <GridVisual />;
}
