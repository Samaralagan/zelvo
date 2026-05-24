import { SectionHeader } from "./Services";
import { Mail, Phone } from "lucide-react";

const INFO = [
  { icon: Mail, label: "Email us", value: "abiram.ketheeswaran@gmail.com", href: "mailto:abiram.ketheeswaran@gmail.com" },
  { icon: Phone, label: "Call us", value: "+94 773165797", href: "tel:+94773165797" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-7 sm:py-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, oklch(0.5 0.07 195 / 0.18), transparent 60%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something great together."
          sub="Tell us about your project and we'll get back to you within one business day."
        />

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {INFO.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl glass p-4 hover:-translate-y-0.5 hover:glow-ring transition-all"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 ring-1 ring-highlight/20 group-hover:ring-highlight/60 transition">
                <item.icon className="h-5 w-5 text-highlight" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</div>
                <div className="text-sm font-semibold mt-0.5">{item.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
