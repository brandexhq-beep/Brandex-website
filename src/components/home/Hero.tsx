import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import Scene3D from "@/components/home/Scene3D";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* 3D Scene Background */}
      <Scene3D />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid animate-grid-fade opacity-30 pointer-events-none" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] animate-pulse-subtle pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[80px] animate-pulse-subtle pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[hsl(var(--gradient-end)/0.03)] blur-[80px] animate-pulse-subtle pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="max-w-4xl" variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm text-muted-foreground text-sm font-medium mb-10 shadow-sm">
              <Sparkles size={14} className="text-accent" />
              Accelerating Growth with Next-Gen Solutions
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold leading-[1.03] tracking-tight text-foreground mb-7"
          >
            Building Digital Experiences{" "}
            <span className="text-gradient">That Propel</span> Ambitious Brands
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
          >
            Brandex empowers businesses with high-performance websites, custom applications, and automated workflows designed to outpace the competition.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <MagneticWrapper>
              <Button asChild size="lg" className="group bg-accent text-accent-foreground hover:bg-accent/90 h-13 px-9 text-base shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
                <Link to="/case-studies">
                  View Our Work <ArrowRight size={18} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticWrapper>
            
            <MagneticWrapper strength={0.1}>
              <Button asChild variant="outline" size="lg" className="h-13 px-9 text-base border-border/60 hover:border-accent/30 hover:bg-accent/5 hover:text-foreground transition-all duration-300">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>

        {/* Floating UI mockup */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[420px]">
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main browser card */}
            <div className="animate-float bg-card/80 backdrop-blur-md rounded-2xl border border-border/60 shadow-2xl shadow-accent/10 p-6 w-80 ml-auto">
              {/* Browser dots */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/25" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/25" />
                <div className="ml-auto h-2.5 bg-secondary rounded-full w-24" />
              </div>
              {/* Simulated dashboard content */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-accent" />
                  </div>
                  <div className="space-y-1.5 flex-1 pt-1">
                    <div className="h-2.5 bg-foreground/10 rounded-full w-3/4" />
                    <div className="h-2 bg-secondary rounded-full w-full" />
                  </div>
                </div>
                {/* Chart bars */}
                <div className="flex items-end gap-2 h-20 px-1 pt-2">
                  {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm bg-accent/20"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: 1.2 + i * 0.08, ease: "easeOut" }}
                    />
                  ))}
                </div>
                {/* Stats row */}
                <div className="flex gap-3">
                  <div className="flex-1 p-3 rounded-lg bg-accent/[0.06] border border-accent/10">
                    <div className="h-2 bg-accent/25 rounded-full w-1/2 mb-2" />
                    <div className="text-base font-bold text-foreground">+340%</div>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-secondary/60 border border-border/40">
                    <div className="h-2 bg-secondary rounded-full w-2/3 mb-2" />
                    <div className="text-base font-bold text-foreground">98.7%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
              className="animate-float-delayed bg-card/90 backdrop-blur-md rounded-xl border border-border/60 shadow-xl p-4 w-56 absolute -bottom-14 -left-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                  <ArrowRight size={14} className="text-accent" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 bg-foreground/10 rounded-full w-full" />
                  <div className="h-2 bg-accent/20 rounded-full w-3/5" />
                </div>
              </div>
            </motion.div>

            {/* Small floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7, ease: "easeOut" }}
              className="animate-float absolute -top-6 left-4 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 flex items-center gap-2"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-accent">Live</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
