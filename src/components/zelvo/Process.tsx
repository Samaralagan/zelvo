import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Code, Rocket, LifeBuoy } from "lucide-react";
import { SectionHeader } from "./Services";

/* ══════════════════════════════════════════
   STEP VISUALS
══════════════════════════════════════════ */

function RadarVisual() {
  const [angle, setAngle] = useState(0);
  const [dots, setDots] = useState<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const iv = setInterval(() => {
      setAngle((a) => {
        const next = (a + 3) % 360;
        if (next % 60 < 3) {
          const rad = (next * Math.PI) / 180;
          const r = 28 + Math.random() * 14;
          setDots((d) => [
            ...d.filter((p) => p.age < 18),
            { x: 50 + Math.cos(rad) * r, y: 50 + Math.sin(rad) * r, age: 0 },
          ]);
        }
        setDots((d) => d.map((p) => ({ ...p, age: p.age + 1 })));
        return next;
      });
    }, 30);
    return () => clearInterval(iv);
  }, []);

  const rad = (angle * Math.PI) / 180;

  return (
    <div className="h-full rounded-xl bg-background/50 border border-border relative overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[14, 28, 42].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="oklch(0.92 0.16 185 / 0.12)" strokeWidth="0.8" />
        ))}
        <line x1="50" y1="50" x2="50" y2="8" stroke="oklch(0.92 0.16 185 / 0.15)" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="92" y2="50" stroke="oklch(0.92 0.16 185 / 0.15)" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="50" y2="92" stroke="oklch(0.92 0.16 185 / 0.15)" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="8" y2="50" stroke="oklch(0.92 0.16 185 / 0.15)" strokeWidth="0.6" />
        {/* sweep */}
        <path
          d={`M50,50 L${50 + Math.cos(rad) * 42},${50 + Math.sin(rad) * 42}`}
          stroke="oklch(0.92 0.16 185)" strokeWidth="1" strokeLinecap="round"
        />
        <path
          d={`M50,50 L${50 + Math.cos(rad - 0.5) * 42},${50 + Math.sin(rad - 0.5) * 42}`}
          stroke="oklch(0.92 0.16 185 / 0.3)" strokeWidth="2" strokeLinecap="round"
        />
        {dots.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5"
            fill="oklch(0.92 0.16 185)"
            opacity={Math.max(0, 1 - p.age / 18)}
          />
        ))}
        <circle cx="50" cy="50" r="2" fill="oklch(0.92 0.16 185)" />
      </svg>
    </div>
  );
}

const CODE_LINES = [
  { t: "// architecture.ts", h: false },
  { t: "interface Blueprint {", h: true },
  { t: "  modules: Module[];", h: false },
  { t: "  sla: '99.99%';", h: true },
  { t: "}", h: false },
];

function CodeVisual() {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");
  const [commits, setCommits] = useState(0);

  useEffect(() => {
    const target = CODE_LINES[line % CODE_LINES.length].text ?? CODE_LINES[line % CODE_LINES.length].t;
    setTyped("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(CODE_LINES[line % CODE_LINES.length].t.slice(0, i));
      if (i >= CODE_LINES[line % CODE_LINES.length].t.length) {
        clearInterval(iv);
        setTimeout(() => {
          setLine((l) => l + 1);
          if ((line + 1) % CODE_LINES.length === 0) setCommits((c) => c + 1);
        }, 400);
      }
    }, 40);
    return () => clearInterval(iv);
  }, [line]);

  const shown = CODE_LINES.slice(Math.max(0, (line % CODE_LINES.length) - 2), line % CODE_LINES.length);

  return (
    <div className="h-full rounded-xl bg-background/50 border border-border p-3 font-mono text-[10px] leading-relaxed overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {["bg-red-400/60","bg-yellow-400/60","bg-green-400/60"].map((c,i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-highlight" />
          <span>{commits} commits</span>
        </div>
      </div>
      {shown.map((l, i) => (
        <div key={i} className={l.h ? "text-highlight" : "text-muted-foreground"}>{l.t}</div>
      ))}
      <div className={CODE_LINES[line % CODE_LINES.length].h ? "text-highlight" : "text-muted-foreground"}>
        {typed}<span className="animate-pulse">▌</span>
      </div>
    </div>
  );
}

const STAGES = ["Build", "Test", "Stage", "Prod"];

function RocketVisual() {
  const [stage, setStage] = useState(0);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setStage((s) => {
        if (s >= STAGES.length - 1) { setLaunched(true); setTimeout(() => { setLaunched(false); setStage(0); }, 1000); return s; }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="h-full rounded-xl bg-background/50 border border-border p-4 flex flex-col gap-3 justify-center">
      <div className="flex items-center gap-1.5">
        {STAGES.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5 flex-1">
            <motion.div
              className="flex-1 h-7 rounded text-[10px] font-mono flex items-center justify-center"
              animate={{
                backgroundColor: i < stage ? "oklch(0.92 0.16 185 / 0.25)" : i === stage ? "oklch(0.92 0.16 185 / 0.15)" : "oklch(0.5 0 0 / 0.1)",
                borderColor: i === stage ? "oklch(0.92 0.16 185 / 0.8)" : i < stage ? "oklch(0.92 0.16 185 / 0.3)" : "oklch(0.5 0 0 / 0.2)",
                color: i <= stage ? "oklch(0.92 0.16 185)" : "oklch(0.5 0 0)",
              }}
              transition={{ duration: 0.3 }}
              style={{ border: "1px solid" }}
            >
              {s}
            </motion.div>
            {i < STAGES.length - 1 && (
              <motion.div className="w-2 h-px" animate={{ backgroundColor: i < stage ? "oklch(0.92 0.16 185)" : "oklch(0.5 0 0 / 0.3)" }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-highlight"
            animate={{ width: `${(stage / (STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <motion.div animate={{ y: launched ? -20 : 0, opacity: launched ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <Rocket className="h-6 w-6 text-highlight" />
        </motion.div>
      </div>
    </div>
  );
}

function HeartbeatVisual() {
  const [points, setPoints] = useState<number[]>(Array(30).fill(50));
  const [status, setStatus] = useState<"ok" | "alert">("ok");

  useEffect(() => {
    const iv = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        const spike = Math.random() > 0.85;
        if (spike) {
          next.push(20); next.push(80); next.push(20);
          setStatus("ok");
        } else {
          next.push(48 + Math.random() * 4);
        }
        return next.slice(-30);
      });
    }, 80);
    return () => clearInterval(iv);
  }, []);

  const w = 100, h = 40;
  const pts = points.map((v, idx) => `${(idx / (points.length - 1)) * w},${(v / 100) * h}`).join(" ");

  return (
    <div className="h-full rounded-xl bg-background/50 border border-border p-3 flex flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] font-mono">
        <span className="text-muted-foreground">System health</span>
        <motion.span
          animate={{ color: status === "ok" ? "oklch(0.92 0.16 185)" : "oklch(0.6 0.2 25)" }}
          className="flex items-center gap-1"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            animate={{ backgroundColor: status === "ok" ? "oklch(0.92 0.16 185)" : "oklch(0.6 0.2 25)", scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          {status === "ok" ? "All systems nominal" : "Alert"}
        </motion.span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full flex-1" preserveAspectRatio="none">
        <polyline points={pts} fill="none" stroke="oklch(0.92 0.16 185)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={pts} fill="oklch(0.92 0.16 185 / 0.06)" stroke="none"
          points={`0,${h} ${pts} ${w},${h}`}
        />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════
   TILT CARD
══════════════════════════════════════════ */
function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
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
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false); }}
      className="relative overflow-hidden rounded-2xl glass p-6"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(340px circle at ${x}% ${y}%, oklch(0.92 0.16 185 / 0.1), transparent 65%)`,
          ),
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "inset 0 0 0 1px oklch(0.92 0.16 185 / 0.45)" }}
      />
      <div className="relative" style={{ transform: "translateZ(10px)" }}>{children}</div>
    </motion.div>
  );
}

const steps = [
  {
    icon: Compass,  title: "Discovery & Blueprinting",
    desc: "We run deep-dive workshops to map your business goals into a concrete technical blueprint.",
    bullets: ["Stakeholder workshops", "Architecture diagrams", "Success metrics & KPIs"],
    visual: "radar",
  },
  {
    icon: Code,     title: "Iterative Development",
    desc: "Two-week sprints with live demos keep you in control of every decision throughout the build.",
    bullets: ["Bi-weekly sprint demos", "Continuous stakeholder reviews", "Test-driven development"],
    visual: "code",
  },
  {
    icon: Rocket,   title: "Deployment & Scaling",
    desc: "Automated pipelines ship your product safely with zero-downtime rollouts and full observability.",
    bullets: ["CI/CD pipelines", "Gradual canary rollout", "Real-time observability"],
    visual: "rocket",
  },
  {
    icon: LifeBuoy, title: "Support & Maintenance",
    desc: "Round-the-clock monitoring and SLA-backed response keeps your platform healthy long after launch.",
    bullets: ["24/7 uptime monitoring", "SLA-backed incident response", "Continuous improvement cycles"],
    visual: "heartbeat",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-7 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Process"
          title="A predictable path from idea to production."
          sub="Four disciplined phases — each with clear deliverables, demos, and sign-off gates."
        />

        <div className="relative mt-10">

          {/* Vertical spine — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-highlight/20 to-transparent" />
            <motion.div
              className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-highlight to-transparent"
              initial={{ top: "-20%" }}
              animate={{ top: "120%" }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-center gap-4 md:gap-0"
                >
                  {/* Left slot */}
                  <div className={`hidden md:block ${isLeft ? "pr-8" : "pr-8"}` }>
                    {isLeft ? <ContentCard step={s} index={i} /> : <VisualCard step={s} index={i} />}
                  </div>

                  {/* Centre node — desktop */}
                  <div className="hidden md:flex justify-center">
                    <StepNode step={s} index={i} />
                  </div>

                  {/* Right slot */}
                  <div className="hidden md:block pl-8">
                    {isLeft ? <VisualCard step={s} index={i} /> : <ContentCard step={s} index={i} />}
                  </div>

                  {/* Mobile: full-width card with node + content + visual stacked */}
                  <div className="md:hidden flex gap-4">
                    {/* Left spine + node */}
                    <div className="flex flex-col items-center">
                      <StepNode step={s} index={i} />
                      {i < steps.length - 1 && (
                        <div className="flex-1 w-px bg-highlight/20 mt-2" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <ContentCard step={s} index={i} />
                      <VisualCard step={s} index={i} />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepNode({ step: s, index: i }: { step: typeof steps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.15, type: "spring", stiffness: 260, damping: 20 }}
      className="relative h-10 w-10 rounded-full glass-strong border border-highlight/30 grid place-items-center shrink-0"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-highlight/40"
        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
      />
      <s.icon className="h-4 w-4 text-highlight" />
      <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-highlight flex items-center justify-center text-[8px] font-bold text-background">
        {i + 1}
      </div>
    </motion.div>
  );
}

/* Content side — no background */
function ContentCard({ step: s, index: i }: { step: typeof steps[0]; index: number }) {
  return (
    <div className="py-3">
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-highlight/20">
          <s.icon className="h-5 w-5 text-highlight" />
        </span>
        <span className="text-[10px] text-highlight tracking-widest font-mono">STEP 0{i + 1}</span>
      </div>
      <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
      <ul className="mt-3 space-y-1.5">
        {s.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight shrink-0" />{b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Visual side — animation fills the card */
function VisualCard({ step: s, index: i }: { step: typeof steps[0]; index: number }) {
  return (
    <TiltCard index={i}>
      <div className="w-full h-64">
        {s.visual === "radar"     && <RadarVisual />}
        {s.visual === "code"      && <CodeVisual />}
        {s.visual === "rocket"    && <RocketVisual />}
        {s.visual === "heartbeat" && <HeartbeatVisual />}
      </div>
    </TiltCard>
  );
}
