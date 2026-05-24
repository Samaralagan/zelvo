import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/zelvo/Navbar";
import { Hero } from "@/components/zelvo/Hero";
import { Services } from "@/components/zelvo/Services";
import { Why } from "@/components/zelvo/Why";
import { Process } from "@/components/zelvo/Process";
import { Tech } from "@/components/zelvo/Tech";
import { Security } from "@/components/zelvo/Security";
import { Contact } from "@/components/zelvo/Contact";
import { Footer } from "@/components/zelvo/Footer";
import { CookieBanner } from "@/components/zelvo/CookieBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zelvo — Enterprise Software, ERP & Cloud Solutions" },
      {
        name: "description",
        content:
          "Zelvo builds scalable ERP systems, custom web applications, SaaS platforms, POS systems and cloud infrastructure for modern enterprises.",
      },
      { property: "og:title", content: "Zelvo — Engineering Scalable Digital Ecosystems" },
      { property: "og:description", content: "Enterprise ERP, custom software, cloud infrastructure and POS systems built for scale." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Zelvo",
          url: "/",
          description: "Enterprise software studio specialising in ERP, custom web applications, SaaS, POS and cloud infrastructure.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Why />
      <Process />
      <Tech />
      <Security />
      <Contact />
      <Footer />
      <CookieBanner />
    </main>
  );
}
