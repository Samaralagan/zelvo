import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, GitBranch, CheckCircle2, Loader2, Zap } from "lucide-react";

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const CODE = [
  { t: "import { ERP } from '@clarotech/core'", h: false },
  { t: "import { CloudScale } from '@clarotech/infra'", h: false },
  { t: "", h: false },
  { t: "const app = new ERP({", h: true },
  { t: "  modules: ['finance', 'hr', 'pos'],", h: false },
  { t: "  scale: CloudScale.AUTO,", h: true },
  { t: "  sla: '99.99%',", h: false },
  { t: "})", h: true },
];

function CodePanel({ active }: { active: boolean }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return;
    const target = CODE[lineIdx % CODE.length].t;
    setTyped("");
    if (!target) { const t = setTimeout(() => setLineIdx((l) => l + 1), 200); return () => clearTimeout(t); }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) { clearInterval(iv); setTimeout(() => setLineIdx((l) => l + 1), 500); }
    }, 36);
    return () => clearInterval(iv);
  }, [lineIdx, active]);

  const shown = CODE.slice(Math.max(0, (lineIdx % CODE.length) - 5), lineIdx % CODE.length);

  return (
    <div className="h-full rounded-xl bg-background/60 border border-border p-4 font-mono text-[11px] leading-6 overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        {["bg-red-400/60", "bg-yellow-400/60", "bg-green-400/60"].map((c, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
        ))}
        <span className="ml-2 text-muted-foreground text-[10px]">app.config.ts</span>
      </div>
      <div className="flex-1 overflow-hidden">
        {shown.map((l, i) => (
          <div key={i} className={l.h ? "text-highlight" : "text-muted-foreground/70"}>{l.t || "\u00a0"}</div>
        ))}
        <div className={CODE[lineIdx % CODE.length].h ? "text-highlight" : "text-muted-foreground/70"}>
          {typed}<span className="animate-pulse opacity-80">▌</span>
        </div>
      </div>
    </div>
  );
}

const PIPELINE = [
  { label: "Commit", icon: GitBranch },
  { label: "Build", icon: Loader2 },
  { label: "Test", icon: CheckCircle2 },
  { label: "Deploy", icon: Zap },
];

function PipelinePanel({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => {
      setStep((a) => {
        const next = (a + 1) % PIPELINE.length;
        if (next === 0) setDone([]);
        else setDone((d) => [...d, a]);
        return next;
      });
    }, 1100);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div className="h-full rounded-xl bg-background/60 border border-border p-4 flex flex-col justify-between">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">CI / CD Pipeline</div>
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {PIPELINE.map((s, i) => {
          const isDone = done.includes(i);
          const isActive = step === i;
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-3">
              <div
                className="h-7 w-7 rounded-lg border grid place-items-center shrink-0 transition-colors duration-300"
                style={{
                  backgroundColor: isDone ? "oklch(0.88 0.18 185 / 0.25)" : isActive ? "oklch(0.88 0.18 185 / 0.15)" : "oklch(0.5 0 0 / 0.08)",
                  borderColor: isDone ? "oklch(0.88 0.18 185 / 0.8)" : isActive ? "oklch(0.88 0.18 185 / 0.5)" : "oklch(0.5 0 0 / 0.2)",
                }}
              >
                <Icon className={`h-3.5 w-3.5 ${isDone || isActive ? "text-highlight" : "text-muted-foreground/40"} ${isActive && s.label === "Build" ? "animate-spin" : ""}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono ${isDone || isActive ? "text-foreground" : "text-muted-foreground/40"}`}>{s.label}</span>
                  {isDone && <span className="text-[9px] text-highlight">✓ done</span>}
                  {isActive && <span className="text-[9px] text-highlight animate-pulse">running…</span>}
                </div>
                <div className="mt-1 h-1 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-highlight transition-all duration-500"
                    style={{ width: isDone ? "100%" : isActive ? "60%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const NODES = [
  { x: "50%", y: "18%", label: "LB" },
  { x: "20%", y: "50%", label: "API" },
  { x: "50%", y: "50%", label: "SVC" },
  { x: "80%", y: "50%", label: "DB" },
  { x: "35%", y: "82%", label: "CDN" },
  { x: "65%", y: "82%", label: "Cache" },
];
const EDGES = [[0,1],[0,2],[0,3],[1,4],[2,5],[3,4]];

function ClusterPanel({ active }: { active: boolean }) {
  const [pulse, setPulse] = useState(0);
  const [flow, setFlow] = useState<number[]>([]);

  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => {
      setPulse((v) => (v + 1) % NODES.length);
      setFlow(EDGES[Math.floor(Math.random() * EDGES.length)]);
    }, 700);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div className="h-full rounded-xl bg-background/60 border border-border p-3 flex flex-col">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Live Infrastructure</div>
      <div className="flex-1 relative">
        <svg className="absolute inset-0 w-full h-full">
          {EDGES.map(([a, b], i) => {
            const isActive = (flow[0] === a && flow[1] === b) || (flow[0] === b && flow[1] === a);
            return (
              <line
                key={i}
                x1={NODES[a].x} y1={NODES[a].y}
                x2={NODES[b].x} y2={NODES[b].y}
                stroke="oklch(0.88 0.18 185)"
                strokeWidth={isActive ? "1.5" : "0.8"}
                opacity={isActive ? 0.9 : 0.2}
              />
            );
          })}
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={pulse === i ? 16 : 14} fill="oklch(0.88 0.18 185)" opacity={pulse === i ? 0.18 : 0.06} />
              <circle cx={n.x} cy={n.y} r="6" fill="oklch(0.88 0.18 185)" opacity={pulse === i ? 1 : 0.4} />
              <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle"
                className="fill-background font-mono"
                style={{ fontSize: "5px", fontWeight: 700 }}
              >{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  const { ref, visible } = useVisible();

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-7 sm:pt-36 sm:pb-10">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--grad-hero)" }} aria-hidden />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-40 blur-3xl" style={{ background: "var(--grad-glow)" }} aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Engineering{" "}
            <span className="text-gradient">Scalable Digital Ecosystems</span>{" "}
            for Modern Enterprises.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            From high-performance web applications to complex ERP systems, we build
            robust software foundations that drive business growth.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group inline-flex items-center gap-2 rounded-xl bg-highlight px-6 py-3 text-sm font-semibold text-highlight-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_-6px_oklch(0.92_0.16_185/0.7)]"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </motion.div>

       
      </div>
    </section>
  );
}
