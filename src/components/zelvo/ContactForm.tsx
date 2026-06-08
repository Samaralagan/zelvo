import { useRef, useState } from "react";

const ENDPOINT = "https://formspree.io/f/mzdqrkpa";

export function ContactForm() {
  const nameRef   = useRef<HTMLInputElement>(null);
  const emailRef  = useRef<HTMLInputElement>(null);
  const phoneRef  = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name   = nameRef.current?.value.trim() ?? "";
    const email  = emailRef.current?.value.trim() ?? "";
    const phone  = phoneRef.current?.value.trim() ?? "";
    const reason = reasonRef.current?.value.trim() ?? "";

    if (!name || !email || !reason) {
      setErrMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, phone, reason }),
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else throw new Error();
    } catch {
      setErrMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full flex flex-col gap-5 p-8 rounded-2xl border border-white/10"
      style={{ background: "var(--card, #1c1c2e)", boxShadow: "0 20px 60px -12px oklch(0 0 0 / 0.45)" }}
    >
      <div>
        <p className="text-base font-bold text-foreground">Send us a message</p>
        <p className="text-xs text-muted-foreground mt-0.5">We'll get back to you within one business day.</p>
      </div>
      <div className="h-px bg-white/10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" required>
          <input ref={nameRef} className={inputCls} type="text" placeholder="Your name" autoComplete="name" />
        </Field>
        <Field label="Email" required>
          <input ref={emailRef} className={inputCls} type="email" placeholder="you@example.com" autoComplete="email" />
        </Field>
      </div>

      <Field label="Contact Number" optional>
        <input ref={phoneRef} className={inputCls} type="tel" placeholder="+1 234 567 8900" autoComplete="tel" />
      </Field>

      <Field label="Reason" required>
        <textarea ref={reasonRef} className={`${inputCls} resize-y min-h-[110px]`} placeholder="Tell us about your project…" />
      </Field>

      {status === "success" && (
        <p className="text-sm px-3 py-2 rounded-lg" style={{ background: "oklch(0.88 0.18 185 / 12%)", color: "var(--highlight, oklch(0.78 0.16 185))", border: "1px solid oklch(0.88 0.18 185 / 25%)" }}>
          ✓ Thanks! We'll get back to you within one business day.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm px-3 py-2 rounded-lg" style={{ background: "oklch(0.65 0.22 27 / 12%)", color: "oklch(0.65 0.22 27)", border: "1px solid oklch(0.65 0.22 27 / 25%)" }}>
          {errMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start px-7 py-2.5 rounded-xl text-sm font-bold disabled:opacity-45 hover:opacity-87 hover:-translate-y-px transition-all"
        style={{ background: "var(--highlight, oklch(0.88 0.18 185))", color: "var(--highlight-foreground, #0a0a0a)" }}
      >
        {status === "sending" ? "Sending…" : status === "success" ? "Sent!" : "Send Message"}
      </button>
    </form>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/5 border border-white/20 text-foreground placeholder:text-white/30 outline-none focus:border-[var(--highlight,oklch(0.88_0.18_185))] focus:bg-white/10 transition-colors";

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}{" "}
        {required && <span style={{ color: "var(--highlight, oklch(0.88 0.18 185))" }}>*</span>}
        {optional && <span className="normal-case text-[0.65rem] font-normal opacity-55 tracking-normal">(Optional)</span>}
      </label>
      {children}
    </div>
  );
}
