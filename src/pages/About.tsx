import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Eye, Heart, Users } from "lucide-react";
import TeamSection from "@/components/about/TeamSection";

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "Every line of code serves a business goal. We don't build for the sake of building — we build to create real impact.",
  },
  {
    icon: Eye,
    title: "Clarity Over Complexity",
    description: "Simple solutions to complex problems. We believe the best technology is invisible — it just works.",
  },
  {
    icon: Heart,
    title: "Craft & Care",
    description: "We treat every project like our own. Attention to detail, clean code, and thoughtful design are non-negotiable.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We're not just vendors — we're your digital team. We grow with you, iterate with you, and succeed with you.",
  },
];

export default function AboutPage() {
  useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl scroll-reveal">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">About Brandex</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Making powerful technology simple and accessible
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe every growing business deserves access to the same digital tools that power industry leaders — without the enterprise price tag or complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Brandex exists to bridge the gap between startups and scalable digital infrastructure. We build websites, custom applications, and automation systems that help small businesses compete with the big players.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team combines deep technical expertise with a genuine understanding of what growing businesses need — not bloated enterprise solutions, but lean, powerful tools that work from day one.
              </p>
            </div>
            <div className="scroll-reveal scroll-reveal-delay-2">
              <div className="aspect-square bg-card border border-border rounded-2xl p-10 flex items-center justify-center overflow-hidden">
                <img src="/main_logo.webp" alt="Brandex" className="max-w-[320px] lg:max-w-[400px] w-full h-auto scale-110 lg:scale-125 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16 scroll-reveal">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">What we stand for</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These principles guide every decision we make and every product we build.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className={`scroll-reveal scroll-reveal-delay-${i + 1} p-6 bg-card border border-border rounded-xl`}>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Vision */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-6 text-center max-w-3xl scroll-reveal">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">Our Vision</h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed">
            A world where every small business has access to powerful digital tools — where technology isn't a barrier to growth, but the engine that drives it. We're building that future, one project at a time.
          </p>
        </div>
      </section>
    </>
  );
}
