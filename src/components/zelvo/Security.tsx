import { motion } from "framer-motion";
import { Lock, ServerCog, Activity } from "lucide-react";
import { SectionHeader } from "./Services";

const items = [
  { icon: Lock, title: "End-to-end encryption", desc: "TLS in transit, AES-256 at rest." },
  { icon: ServerCog, title: "Resilient infrastructure", desc: "Multi-AZ deployments with auto-failover." },
  { icon: Activity, title: "24/7 monitoring", desc: "Proactive alerting and observable systems." },
];

export function Security() {
  return (
    <section className="relative py-7 sm:py-10 overflow-hidden">
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
          <div className="mt-6 space-y-3">
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
          className="relative max-w-md mx-auto"
        >
          <img
            src="/trust_side_img.png"
            alt="Security illustration"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
