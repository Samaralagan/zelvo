import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeader } from "./Services";

const items = [
  {
    quote: "Claro Tech replatformed our ERP without missing a single shipment. Communication was world-class.",
    name: "Amelia Hart", role: "COO, Northwind Distribution",
  },
  {
    quote: "We went from weekly outages to 99.99% uptime in 90 days. Their engineering is exceptional.",
    name: "Daniel Okafor", role: "CTO, Vertex Retail",
  },
  {
    quote: "Senior team, disciplined process, real outcomes. The kind of partner you keep for years.",
    name: "Priya Raman", role: "VP Engineering, Kestrel SaaS",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Testimonials" title="Trusted by teams that ship." />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl glass p-6 hover:-translate-y-0.5 hover:glow-ring transition"
            >
              <div className="flex gap-0.5 text-highlight">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-highlight" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
