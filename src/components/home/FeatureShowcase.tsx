import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Zap, Palette, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Code2,
    title: "Modern Tech Stack",
    desc: "React, TypeScript, Node.js — production-grade tools that scale with your business.",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Sub-second load times, optimized performance, and smooth user experiences.",
    stat: "<1s",
    statLabel: "Load Time",
  },
  {
    icon: Palette,
    title: "Pixel Perfect",
    desc: "Every detail matters. We craft interfaces that look stunning on every device.",
    stat: "100%",
    statLabel: "Responsive",
  },
  {
    icon: BarChart3,
    title: "Built to Convert",
    desc: "Data-driven design decisions that turn visitors into customers.",
    stat: "3.2x",
    statLabel: "Avg. Conversion Lift",
  },
];

export default function FeatureShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">Why Brandex</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Engineering excellence, <span className="text-gradient">delivered</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We don't just build — we engineer digital products that perform, convert, and scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-card border border-border/60 rounded-2xl p-7 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/[0.06] transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                  <cap.icon size={22} className="text-accent" />
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <span className="font-display text-3xl font-bold text-foreground">{cap.stat}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{cap.statLabel}</p>
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-6 bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl px-8 py-5 shadow-lg">
            <p className="text-foreground font-medium">Ready to build something exceptional?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
            >
              Let's Talk <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
