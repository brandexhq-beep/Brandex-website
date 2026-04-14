import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background accents with parallax */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-[hsl(var(--gradient-end)/0.04)] blur-[80px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          style={{ y, scale }}
        >
          <motion.h2
            className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-7 leading-[1.1]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to build something{" "}
            <span className="text-gradient">great?</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Let's turn your idea into a digital product that grows your business. 
            Start a conversation today.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="group bg-accent text-accent-foreground hover:bg-accent/90 h-13 px-9 text-base shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
              <Link to="/contact">
                Start a Project <ArrowRight size={18} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-13 px-9 text-base border-border/60 hover:border-accent/30 hover:bg-accent/5 hover:text-foreground transition-all duration-300">
              <Link to="/case-studies">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
