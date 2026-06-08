import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Zap, GitBranch, Server, Cloud, Database } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Services";

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* ── Bento layout ── */
const items = [
  { icon: Server,      title: "Industry-standard architecture", desc: "Clean architecture, DDD, event-driven systems.", visual: "arch",    span: "lg:col-span-2" },
  { icon: ShieldCheck, title: "Secure & compliant",             desc: "Encryption, audit trails, role-based access.",  visual: "shield"  },
  { icon: GitBranch,   title: "Agile delivery",                 desc: "Two-week sprints, demo-driven progress.",       visual: "sprint"  },
  { icon: Zap,         title: "High availability",              desc: "Active-active clusters, zero-downtime deploys.", visual: "ha",     span: "lg:col-span-2" },
  { icon: Cloud,       title: "Cloud-native",                   desc: "Containerised workloads, IaC, autoscaling.",    visual: "cloud"   },
  { icon: Database,    title: "Data-first",                     desc: "Analytics-ready schemas, observable pipelines.", visual: "data"   },
];

/* ══════════════════════════════════════════
   STAT VISUALS
══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   FEATURE VISUALS
══════════════════════════════════════════ */

function ArchVisual() {
  const layers = ["Presentation", "Application", "Domain", "Infrastructure"];
  return (
    <div className="mt-5 space-y-1.5">
      {layers.map((l, i) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div
            className="h-6 rounded flex items-center px-2 text-[10px] font-mono text-highlight"
            style={{
              width: `${100 - i * 10}%`,
              background: `oklch(0.92 0.16 185 / ${0.06 + i * 0.03})`,
              border: "1px solid oklch(0.92 0.16 185 / 0.15)",
            }}
          >
            {l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ShieldVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setLocked((v) => !v), 2000);
    return () => clearInterval(iv);
  }, [inView]);
  return (
    <div ref={ref} className="mt-5 flex flex-col items-center gap-2">
      <motion.div
        animate={{ scale: locked ? [1, 1.15, 1] : 1, opacity: locked ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
      >
        <ShieldCheck className="h-10 w-10 text-highlight" strokeWidth={1.5} />
      </motion.div>
      <div className="w-full space-y-1">
        {["AES-256", "RBAC", "Audit log"].map((t, i) => (
          <motion.div
            key={t}
            className="flex items-center gap-1.5"
            animate={{ opacity: locked ? 1 : 0.3 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-highlight"
              animate={{ scale: locked ? [1, 1.4, 1] : 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">{t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SprintVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const [sprint, setSprint] = useState(0);
  const tasks = [1, 1, 1, 0, 1, 0, 1, 1];
  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setSprint((s) => (s + 1) % (tasks.length + 1)), 500);
    return () => clearInterval(iv);
  }, [inView]);
  return (
    <div ref={ref} className="mt-5 space-y-2">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        <span>Sprint {Math.floor(sprint / 4) + 1}</span>
        <span className="text-highlight">{sprint}/{tasks.length} done</span>
      </div>
      <div className="flex gap-1">
        {tasks.map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-5 rounded-sm"
            animate={{
              backgroundColor: i < sprint
                ? "oklch(0.92 0.16 185 / 0.7)"
                : "oklch(0.5 0 0 / 0.2)",
              scale: i === sprint - 1 ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-highlight"
          animate={{ width: `${(sprint / tasks.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function HaVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const [active, setActive] = useState<"a" | "b" | "fail">("a");
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const seq = async () => {
      await new Promise((r) => setTimeout(r, 1800));
      if (cancelled) return;
      setActive("fail");
      await new Promise((r) => setTimeout(r, 700));
      if (cancelled) return;
      setActive("b");
      await new Promise((r) => setTimeout(r, 1800));
      if (cancelled) return;
      setActive("a");
    };
    const iv = setInterval(seq, 4400);
    seq();
    return () => { cancelled = true; clearInterval(iv); };
  }, [inView]);

  const nodeStyle = (id: "a" | "b") => ({
    backgroundColor:
      active === id ? "oklch(0.92 0.16 185 / 0.3)" :
      active === "fail" && id === "a" ? "oklch(0.6 0.2 25 / 0.3)" :
      "oklch(0.5 0 0 / 0.15)",
    borderColor:
      active === id ? "oklch(0.92 0.16 185 / 0.8)" :
      active === "fail" && id === "a" ? "oklch(0.6 0.2 25 / 0.6)" :
      "oklch(0.5 0 0 / 0.3)",
  });

  return (
    <div ref={ref} className="mt-5 flex items-center justify-center gap-4">
      {(["a", "b"] as const).map((id) => (
        <motion.div
          key={id}
          animate={nodeStyle(id)}
          transition={{ duration: 0.4 }}
          className="w-16 h-10 rounded-lg border flex items-center justify-center text-[10px] font-mono text-highlight"
        >
          Node {id.toUpperCase()}
        </motion.div>
      ))}
      <div className="absolute flex flex-col items-center gap-0.5 pointer-events-none">
        <motion.div
          animate={{ opacity: active === "fail" ? 1 : 0, y: active === "fail" ? 0 : 4 }}
          transition={{ duration: 0.3 }}
          className="text-[9px] font-mono text-red-400"
        >
          failover →
        </motion.div>
      </div>
    </div>
  );
}

function CloudNativeVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const nodes = [
    { cx: "20%", cy: "50%" }, { cx: "50%", cy: "20%" },
    { cx: "80%", cy: "50%" }, { cx: "35%", cy: "78%" }, { cx: "65%", cy: "78%" },
  ];
  const edges = [[0,1],[1,2],[0,3],[2,4],[3,4]];
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setPulse((v) => (v + 1) % nodes.length), 650);
    return () => clearInterval(iv);
  }, [inView]);
  return (
    <div ref={ref} className="mt-5 h-20 relative">
      <svg className="absolute inset-0 w-full h-full">
        {edges.map(([a, b], i) => (
          <line key={i}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="oklch(0.92 0.16 185 / 0.25)" strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i} cx={n.cx} cy={n.cy} r="5"
            fill="oklch(0.92 0.16 185)"
            animate={{ opacity: pulse === i ? 1 : 0.3, r: pulse === i ? 7 : 5 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

function DataVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const [step, setStep] = useState(0);
  const stages = ["Ingest", "Transform", "Enrich", "Serve"];
  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setStep((s) => (s + 1) % stages.length), 900);
    return () => clearInterval(iv);
  }, [inView]);
  return (
    <div ref={ref} className="mt-5 flex items-center gap-1">
      {stages.map((s, i) => (
        <div key={s} className="flex items-center gap-1 flex-1">
          <motion.div
            className="flex-1 h-6 rounded flex items-center justify-center text-[9px] font-mono"
            animate={{
              backgroundColor: i <= step ? "oklch(0.92 0.16 185 / 0.2)" : "oklch(0.5 0 0 / 0.12)",
              borderColor: i === step ? "oklch(0.92 0.16 185 / 0.7)" : "oklch(0.5 0 0 / 0.2)",
              color: i <= step ? "oklch(0.92 0.16 185)" : "oklch(0.6 0 0)",
            }}
            transition={{ duration: 0.3 }}
            style={{ border: "1px solid" }}
          >
            {s}
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              className="w-2 h-px"
              animate={{ backgroundColor: i < step ? "oklch(0.92 0.16 185)" : "oklch(0.5 0 0 / 0.3)" }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   TILT CARD (shared)
══════════════════════════════════════════ */
function TiltCard({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) {
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false); }}
      className={`relative overflow-hidden rounded-2xl glass p-6 ${className}`}
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

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export function Why() {
  return (
    <section className="relative py-7 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why Claro Tech"
          title="Built for serious, large-scale systems."
          sub="We pair senior engineering with disciplined process — so the platforms we ship don't just launch, they last."
        />

        {/* Features bento */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((f, i) => (
            <TiltCard key={f.title} index={i} className={f.span ?? ""}>
              <div className="flex items-start justify-between">
                <motion.span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-highlight/20"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 18px 4px oklch(0.92 0.16 185 / 0.35)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <f.icon className="h-5 w-5 text-highlight" />
                </motion.span>
                <span className="text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              {f.visual === "arch"   && <ArchVisual />}
              {f.visual === "shield" && <ShieldVisual />}
              {f.visual === "sprint" && <SprintVisual />}
              {f.visual === "ha"     && <HaVisual />}
              {f.visual === "cloud"  && <CloudNativeVisual />}
              {f.visual === "data"   && <DataVisual />}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
