import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 340, suffix: "%", label: "Avg Client Growth" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }

    const duration = 2000; // ms
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="text-center group"
            >
              <div className="relative inline-block mb-3">
                <span className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </span>
                {/* Glow effect behind number */}
                <div className="absolute inset-0 bg-accent/[0.06] blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">{stat.label}</p>
              {/* Decorative line */}
              <motion.div
                className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
                initial={{ width: 0 }}
                animate={inView ? { width: 64 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 + 0.5, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
