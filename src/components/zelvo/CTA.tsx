import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.5 0.07 195 / 0.35), transparent 60%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-bold tracking-tight"
        >
          Ready to <span className="text-gradient">automate and scale</span><br className="hidden sm:block" /> your business?
        </motion.h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          Let Zelvo engineer the digital foundation your company deserves.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl bg-highlight px-6 py-3 text-sm font-semibold text-highlight-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_-6px_oklch(0.92_0.16_185/0.7)]"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold hover:glow-ring transition"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
