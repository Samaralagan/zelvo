import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const tech = [
  "Java", "Spring Boot", "React", "Next.js", "TypeScript", "Node.js",
  "NestJS", "PostgreSQL", "MySQL", "Docker", "AWS", "Cloudflare",
  "Firebase", "Tailwind",
];

export function Tech() {
  return (
    <section id="tech" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Technologies"
          title="A modern, opinionated stack."
          sub="We pick the right tool for the job — from JVM enterprise platforms to edge-rendered React."
        />
        <div className="mt-14 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {tech.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="group aspect-square rounded-xl glass grid place-items-center text-center px-2 hover:glow-ring hover:-translate-y-1 transition-all"
            >
              <span className="text-xs font-medium text-muted-foreground group-hover:text-highlight transition">
                {t}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
