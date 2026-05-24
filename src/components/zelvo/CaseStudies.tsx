import { motion } from "framer-motion";
import { SectionHeader } from "./Services";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    tag: "ERP",
    title: "ERP automation for a national distributor",
    problem: "Fragmented spreadsheets across 12 warehouses.",
    solution: "Unified ERP with real-time stock sync and forecasting.",
    metrics: [
      { v: "−63%", l: "Manual entry" },
      { v: "4.2x", l: "Order throughput" },
      { v: "$1.8M", l: "Annual savings" },
    ],
  },
  {
    tag: "Retail",
    title: "Cloud POS platform for a retail chain",
    problem: "Legacy on-prem POS with frequent outages.",
    solution: "Offline-first cloud POS with sync and centralized analytics.",
    metrics: [
      { v: "99.99%", l: "Uptime" },
      { v: "−74%", l: "Checkout time" },
      { v: "210", l: "Stores live" },
    ],
  },
  {
    tag: "Workflow",
    title: "Enterprise workflow digitization",
    problem: "Paper-based approvals delaying operations.",
    solution: "Role-based digital workflows with audit trails.",
    metrics: [
      { v: "8x", l: "Faster approvals" },
      { v: "0", l: "Lost documents" },
      { v: "92%", l: "Adoption" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="cases" className="relative py-24 sm:py-32 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Case Studies"
          title="Outcomes, not just deliverables."
        />
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 hover:-translate-y-1 hover:glow-ring transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-highlight/10 text-highlight border border-highlight/20">
                  {c.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-highlight group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Problem</dt>
                  <dd>{c.problem}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Solution</dt>
                  <dd>{c.solution}</dd>
                </div>
              </dl>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {c.metrics.map((m) => (
                  <div key={m.l} className="rounded-lg bg-background/60 border border-white/5 p-3">
                    <div className="text-base font-bold text-highlight">{m.v}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
