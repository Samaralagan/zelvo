import { useState } from "react";
import { SectionHeader } from "./Services";
import { Mail, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const INFO = [
  { icon: Mail, label: "Email us", value: "abiram.ketheeswaran@gmail.com", href: "mailto:abiram.ketheeswaran@gmail.com" },
  { icon: Phone, label: "Call us", value: "+94 773165797", href: "tel:+94773165797" },
];

const SERVICES = [
  "Custom Web Application",
  "Enterprise ERP",
  "Cloud Infrastructure",
  "POS & Automation",
  "Legacy Modernization",
  "Corporate Website",
  "Other",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section id="contact" className="relative py-7 sm:py-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, oklch(0.5 0.07 195 / 0.18), transparent 60%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left ── */}
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Let's build something great together."
              sub="Tell us about your project and we'll get back to you within one business day."
            />

            <div className="mt-6 space-y-4">
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

          {/* ── Right — Form ── */}
          <div className="rounded-2xl glass-strong p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <CheckCircle2 className="h-14 w-14 text-highlight" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold">Message received!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thanks for reaching out. We'll be in touch within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", service: "", message: "" }); }}
                  className="mt-2 text-xs text-highlight underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
                  <Field label="Work email" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required />
                </div>
                <Field label="Company" name="company" type="text" placeholder="Acme Corp" value={form.company} onChange={handleChange} />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Service interested in</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-background/60 border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-highlight/40 transition text-foreground"
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project, timeline, and goals…"
                    className="w-full rounded-xl bg-background/60 border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-highlight/40 transition resize-none placeholder:text-muted-foreground"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-highlight px-6 py-3 text-sm font-semibold text-highlight-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_-6px_oklch(0.92_0.16_185/0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="h-4 w-4 rounded-full border-2 border-highlight-foreground/30 border-t-highlight-foreground animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type, placeholder, value, onChange, required,
}: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement>; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl bg-background/60 border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-highlight/40 transition placeholder:text-muted-foreground"
      />
    </div>
  );
}
