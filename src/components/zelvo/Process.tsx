import { motion } from "framer-motion";
import { SectionHeader } from "./Services";
import { Compass, Code, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  { icon: Compass, title: "Discovery & Blueprinting", desc: "Workshops, architecture diagrams, success metrics." },
  { icon: Code, title: "Iterative Development", desc: "Two-week sprints with live demos and stakeholder reviews." },
  { icon: Rocket, title: "Deployment & Scaling", desc: "CI/CD pipelines, observability, gradual rollout." },
  { icon: LifeBuoy, title: "Support & Maintenance", desc: "24/7 monitoring, SLA-backed response, continuous improvement." },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Process"
          title="A predictable path from idea to production."
        />
        <div className="relative mt-14 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="hidden md:block absolute left-0 right-0 top-9 h-px bg-gradient-to-r from-transparent via-highlight/50 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="relative z-10 mx-auto mb-4 h-12 w-12 rounded-full glass-strong grid place-items-center group-hover:glow-ring transition">
                <s.icon className="h-5 w-5 text-highlight" />
              </div>
              <div className="rounded-2xl glass p-5 hover:-translate-y-0.5 transition">
                <div className="text-xs text-highlight tracking-widest">STEP 0{i + 1}</div>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
