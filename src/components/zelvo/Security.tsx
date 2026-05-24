import { motion } from "framer-motion";
import { Shield, Lock, ServerCog, Activity } from "lucide-react";
import { SectionHeader } from "./Services";

const items = [
  { icon: Lock, title: "End-to-end encryption", desc: "TLS in transit, AES-256 at rest." },
  { icon: ServerCog, title: "Resilient infrastructure", desc: "Multi-AZ deployments with auto-failover." },
  { icon: Activity, title: "24/7 monitoring", desc: "Proactive alerting and observable systems." },
];

export function Security() {
  return (
    <section className="relative py-24 sm:py-32 bg-surface/40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: "var(--grad-hero)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            eyebrow="Trust & Security"
            title="Built with Security, Stability, and Scale in Mind."
            sub="Security isn't a feature we add later — it's the foundation we build on."
          />
          <div className="mt-10 space-y-3">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-xl glass p-4"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-highlight/30">
                  <it.icon className="h-5 w-5 text-highlight" />
                </span>
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square max-w-md mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-highlight/10 blur-3xl animate-pulse-glow" />
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              className="absolute inset-0 rounded-full border border-highlight/20 animate-pulse-glow"
              style={{
                inset: `${r * 12}%`,
                animationDelay: `${r * 0.3}s`,
              }}
            />
          ))}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-32 w-32 rounded-2xl glass-strong grid place-items-center glow-ring">
              <Shield className="h-14 w-14 text-highlight" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
