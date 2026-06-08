import { useEffect } from "react";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col items-center gap-4 text-center">
        <a href="#home">
          <img
            src="/logo.png"
            alt="Claro Tech Solutions"
            className="h-12 w-auto object-contain"
          />
        </a>
        <p className="text-sm text-muted-foreground max-w-sm">
          We build powerful digital ecosystems for modern businesses.
        </p>
        <span className="h-px w-16 bg-highlight/40" />
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Claro Tech. All rights reserved.</p>
      </div>
    </footer>
  );
}
