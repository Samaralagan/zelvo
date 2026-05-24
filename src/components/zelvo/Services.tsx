import { motion } from "framer-motion";
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
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Services"
          title="A complete digital engineering practice."
          sub="From first prototype to global rollout — Zelvo ships software that moves the business."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl glass p-6 hover:-translate-y-1 transition-all duration-300 hover:glow-ring ${s.span ?? ""}`}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,30%), oklch(0.92 0.16 185 / 0.08), transparent 60%)" }}
              />
              <div className="relative flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-highlight/20 group-hover:ring-highlight/60 transition">
                  <s.icon className="h-5 w-5 text-highlight" />
                </span>
                <span className="text-xs text-muted-foreground">0{services.indexOf(s) + 1}</span>
              </div>
              <h3 className="relative mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="relative mt-6">
                <ServiceVisual kind={s.visual} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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

function ServiceVisual({ kind }: { kind: string }) {
  if (kind === "chart") {
    return (
      <div className="h-24 rounded-lg bg-background/50 border border-white/5 p-3 flex items-end gap-1.5">
        {[40, 60, 35, 80, 55, 90, 70, 95, 60, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-primary to-highlight transition-all duration-500 group-hover:scale-y-110 origin-bottom"
            style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    );
  }
  if (kind === "api") {
    return (
      <div className="h-24 rounded-lg bg-background/50 border border-white/5 p-3 font-mono text-[10px] leading-relaxed text-muted-foreground overflow-hidden">
        <div className="text-highlight">GET /api/v1/orders</div>
        <div>200 OK · 32ms</div>
        <div className="text-highlight">POST /api/v1/sync</div>
        <div>200 OK · 18ms <span className="text-highlight animate-pulse">●</span></div>
      </div>
    );
  }
  if (kind === "cloud") {
    return (
      <div className="h-24 rounded-lg bg-background/50 border border-white/5 relative overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-highlight/70 group-hover:animate-pulse-glow"
            style={{
              left: `${15 + i * 14}%`,
              top: `${30 + (i % 2) * 30}%`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <line x1="15%" y1="40%" x2="85%" y2="60%" stroke="oklch(0.92 0.16 185)" strokeWidth="1" />
          <line x1="15%" y1="60%" x2="85%" y2="40%" stroke="oklch(0.92 0.16 185)" strokeWidth="1" />
        </svg>
      </div>
    );
  }
  if (kind === "refresh") {
    return (
      <div className="h-24 rounded-lg bg-background/50 border border-white/5 p-3 flex items-center gap-3">
        <div className="flex-1 space-y-1.5">
          <div className="h-2 rounded bg-white/10 w-3/4" />
          <div className="h-2 rounded bg-white/10 w-1/2" />
          <div className="h-2 rounded bg-white/10 w-2/3" />
        </div>
        <RefreshCw className="h-5 w-5 text-highlight group-hover:rotate-180 transition-transform duration-700" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 rounded bg-gradient-to-r from-primary to-highlight w-full" />
          <div className="h-2 rounded bg-gradient-to-r from-primary to-highlight w-5/6" />
          <div className="h-2 rounded bg-gradient-to-r from-primary to-highlight w-3/4" />
        </div>
      </div>
    );
  }
  if (kind === "pos") {
    return (
      <div className="h-24 rounded-lg bg-background/50 border border-white/5 p-3 grid grid-cols-3 gap-1.5">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="rounded bg-white/5 group-hover:bg-highlight/20 transition-colors"
            style={{ transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="h-24 rounded-lg bg-background/50 border border-white/5 grid-bg" />
  );
}
