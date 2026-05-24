import { motion } from "framer-motion";
import { ShieldCheck, Zap, GitBranch, Server, Cloud, Database } from "lucide-react";
import { SectionHeader } from "./Services";

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "120+", label: "Systems shipped" },
  { value: "40ms", label: "Median API latency" },
  { value: "24/7", label: "Monitoring" },
];

const features = [
  { icon: Server, title: "Industry-standard architecture", desc: "Battle-tested patterns: clean architecture, DDD, event-driven systems." },
  { icon: ShieldCheck, title: "Secure & compliant", desc: "Encryption at rest and in transit, audit trails, role-based access." },
  { icon: GitBranch, title: "Agile delivery", desc: "Two-week sprints, transparent roadmap, demo-driven progress." },
  { icon: Zap, title: "High availability", desc: "Active-active clusters, automated failover, zero-downtime deploys." },
  { icon: Cloud, title: "Cloud-native", desc: "Containerised workloads, IaC, autoscaling across regions." },
  { icon: Database, title: "Data-first", desc: "Analytics-ready schemas, lineage tracking, observable pipelines." },
];

export function Why() {
  return (
    <section className="relative py-24 sm:py-32 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why Zelvo"
          title="Built for serious, large-scale systems."
          sub="We pair senior engineering with disciplined process — so the platforms we ship don't just launch, they last."
        />

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl glass p-6 hover:glow-ring transition"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-2xl glass p-6 hover:-translate-y-0.5 transition"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-highlight/20 group-hover:ring-highlight/60 transition">
                <f.icon className="h-5 w-5 text-highlight" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
