import { useEffect, useState } from "react";

function useIsLight() {
  const [light, setLight] = useState(() => document.documentElement.classList.contains("light"));
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setLight(document.documentElement.classList.contains("light"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return light;
}

export function Footer() {
  const light = useIsLight();
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 flex flex-col items-center gap-4 text-center">
        <a href="#home">
          <img
            src={light ? "/logo_dark.png" : "/logo_light.png"}
            alt="Zelvo Tech Solutions"
            className="h-12 w-auto object-contain"
          />
        </a>
        <p className="text-sm text-muted-foreground max-w-sm">
          We build powerful digital ecosystems for modern businesses.
        </p>
        <span className="h-px w-16 bg-highlight/40" />
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Zelvo. All rights reserved.</p>
      </div>
    </footer>
  );
}
