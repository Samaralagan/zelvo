import "@/components/zelvo/ContactFormWidget";
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

        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4 lg:pr-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Have a project in mind? Fill out the form and our team will reach out to discuss your requirements.
            </p>
            {INFO.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl p-4 border border-white/10 hover:-translate-y-0.5 transition-transform"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
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

          <contact-form-widget />
        </div>
      </div>
    </section>
  );
}
