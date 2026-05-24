import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Activity, Database, Cloud } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* background layers */}
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--grad-hero)" }}
        aria-hidden
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--grad-glow)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-highlight" />
            Enterprise software studio · Trusted by modern businesses
          </div>

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
              className="group inline-flex items-center gap-2 rounded-xl bg-highlight px-6 py-3 text-sm font-semibold text-highlight-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_-6px_oklch(0.92_0.16_185/0.7)]"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#cases"
              className="group inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold hover:glow-ring transition-all"
            >
              View Our Work
              <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition" />
            </a>
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl glass-strong p-3 shadow-[0_30px_80px_-30px_oklch(0_0_0/0.7)]">
            <div className="rounded-xl bg-surface/80 border border-white/5 overflow-hidden">
              {/* fake window chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <div className="text-[10px] tracking-widest text-muted-foreground">
                  ZELVO · OPS DASHBOARD
                </div>
                <div className="h-2.5 w-12 rounded-full bg-highlight/30" />
              </div>
              <div className="grid grid-cols-12 gap-3 p-4">
                <DashCard className="col-span-12 sm:col-span-4" label="Throughput" value="2.4M/s" icon={<Activity className="h-4 w-4" />} />
                <DashCard className="col-span-6 sm:col-span-4" label="Uptime" value="99.99%" icon={<Cloud className="h-4 w-4" />} />
                <DashCard className="col-span-6 sm:col-span-4" label="Records" value="184M" icon={<Database className="h-4 w-4" />} />
                <div className="col-span-12 rounded-lg bg-background/60 border border-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">Real-time pipeline</span>
                    <span className="text-[10px] text-highlight">LIVE</span>
                  </div>
                  <ChartLine />
                </div>
              </div>
            </div>
          </div>

          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute -left-8 top-24 items-center gap-3 glass-strong rounded-xl p-3 pr-4"
          >
            <span className="h-9 w-9 rounded-lg bg-primary/30 grid place-items-center">
              <Database className="h-4 w-4 text-highlight" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">ERP Sync</div>
              <div className="text-sm font-semibold">12,481 ops/min</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute -right-6 bottom-16 items-center gap-3 glass-strong rounded-xl p-3 pr-4"
          >
            <span className="h-9 w-9 rounded-lg bg-highlight/20 grid place-items-center">
              <Cloud className="h-4 w-4 text-highlight" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Auto-scaling</div>
              <div className="text-sm font-semibold">+38 nodes</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DashCard({
  className = "",
  label,
  value,
  icon,
}: { className?: string; label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className={`rounded-lg bg-background/60 border border-white/5 p-4 ${className}`}>
      <div className="flex items-center justify-between text-muted-foreground text-xs">
        <span>{label}</span>
        <span className="text-highlight">{icon}</span>
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-primary to-highlight" />
      </div>
    </div>
  );
}

function ChartLine() {
  return (
    <svg viewBox="0 0 600 120" className="w-full h-24">
      <defs>
        <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.16 185)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.92 0.16 185)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,90 C60,70 100,40 160,55 C220,70 260,30 320,40 C380,50 420,15 480,25 C540,33 580,18 600,20 L600,120 L0,120 Z"
        fill="url(#hg)"
      />
      <path
        d="M0,90 C60,70 100,40 160,55 C220,70 260,30 320,40 C380,50 420,15 480,25 C540,33 580,18 600,20"
        fill="none"
        stroke="oklch(0.92 0.16 185)"
        strokeWidth="2"
      />
    </svg>
  );
}
