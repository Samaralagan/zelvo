import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <a href="#home" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-highlight/30">
              <span className="font-bold text-highlight">Z</span>
            </span>
            <span className="font-semibold text-lg">Zelvo</span>
          </a>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            We build powerful digital ecosystems for modern businesses.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex max-w-sm rounded-xl glass p-1"
          >
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email"
              className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="rounded-lg bg-highlight px-4 py-2 text-xs font-semibold text-highlight-foreground">
              Subscribe
            </button>
          </form>
        </div>

        <FCol title="Company" items={["About", "Process", "Careers", "Contact"]} />
        <FCol title="Services" items={["ERP", "Web Apps", "Cloud", "POS"]} />
        <FCol title="Contact" items={["hello@zelvo.io", "Dubai · Karachi · Remote"]} />
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Zelvo. All rights reserved.</p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-highlight transition"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-highlight transition"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-highlight transition"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-highlight">{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}><a href="#" className="text-muted-foreground hover:text-foreground transition">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
