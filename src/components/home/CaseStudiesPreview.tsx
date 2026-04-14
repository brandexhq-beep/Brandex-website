import { Link } from "react-router-dom";
import { ArrowRight, Link2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";
import { projects } from "@/data/projects";
import { mockupComponents } from "@/pages/CaseStudies";

export default function CaseStudiesPreview() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // 0% at start, scrolls all cards through the viewport.
  // 4 items: we scroll by ~ -60% to show the last one depending on width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-secondary/40">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-20 left-6 lg:left-12 z-10 pointers-events-none">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-2">Case Studies</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Results that speak for themselves
          </h2>
          <Link to="/case-studies" className="inline-flex items-center text-accent font-medium hover:underline underline-offset-4 group">
            View all case studies <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-12 pt-32 w-max">
          {projects.map((cs, i) => {
            const Mockup = mockupComponents[cs.mockup];
            return (
              <div
                key={cs.title}
                className="w-[75vw] md:w-[50vw] lg:w-[35vw] flex-shrink-0"
              >
                <TiltCard className="h-full rounded-2xl">
                  <div className="group bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/[0.06] hover:border-accent/20 transition-all duration-300 h-full flex flex-col">
                    {/* Mockup thumbnail */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-secondary">
                      <div className="absolute inset-0 bg-accent/[0.03] group-hover:bg-accent/[0.08] transition-colors duration-500" />
                      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1">
                        {Mockup && <Mockup />}
                      </div>
                      {/* Result overlay on hover */}
                      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-2 flex-col">
                        <span className="text-primary-foreground font-display font-bold text-2xl px-4 text-center">{cs.result}</span>
                        <Link to={`/case-studies/${cs.id}`} className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-accent/90 transition-colors">
                          Deep Dive <Link2 size={16} />
                        </Link>
                      </div>
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <span className="text-xs font-semibold text-accent uppercase tracking-[0.15em]">{cs.category}</span>
                      <h3 className="font-display font-semibold text-xl text-foreground mt-1.5 mb-2.5 group-hover:text-accent transition-colors duration-300">{cs.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{cs.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cs.tech.map((t) => (
                          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary/80 text-muted-foreground font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
