import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar_url: string | null;
}

const fallbackTestimonials: Testimonial[] = [
  { name: "Sarah Mitchell", role: "CEO", company: "GreenLeaf Organics", content: "Brandex transformed our online presence completely. Our sales increased by 180% within the first three months.", rating: 5, avatar_url: null },
  { name: "James Rodriguez", role: "Founder", company: "TechVault", content: "The automation systems they built saved us 20+ hours per week. Their team truly understands what growing businesses need.", rating: 5, avatar_url: null },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("published", true).order("sort_order")
      .then(({ data }) => {
        setTestimonials(data && data.length > 0 ? data : fallbackTestimonials);
        setLoading(false);
      });
  }, []);

  const goTo = (idx: number) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); };
  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current, testimonials.length]);

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0, filter: "blur(4px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0, filter: "blur(4px)" }),
  };

  if (loading) {
    return (
      <section className="py-28 lg:py-36 bg-secondary/40">
        <div className="container mx-auto px-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-72 mb-16" />
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!t) return null;

  const initials = t.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <section className="py-28 lg:py-36 bg-secondary/40">
      <div className="container mx-auto px-6">
        <motion.div className="max-w-2xl mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">Testimonials</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">What our clients say</h2>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="relative bg-card border border-border/60 rounded-2xl p-8 lg:p-12 shadow-lg shadow-accent/[0.02] overflow-hidden">
            <Quote size={56} className="text-accent/[0.08] absolute top-6 right-8" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent" />

            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-accent fill-accent" />
                ))}
              </div>

              <div className="min-h-[100px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.p key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeOut" }} className="text-lg lg:text-xl text-foreground leading-relaxed">
                    "{t.content}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }} className="flex items-center gap-4 mt-8">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent">{initials}</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-400 ${i === current ? "bg-accent w-8" : "bg-border w-2.5 hover:bg-muted-foreground/30"}`} aria-label={`Go to testimonial ${i + 1}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prev} className="h-9 w-9 border-border/60 hover:border-accent/30 hover:bg-accent/5"><ChevronLeft size={16} /></Button>
                  <Button variant="outline" size="icon" onClick={next} className="h-9 w-9 border-border/60 hover:border-accent/30 hover:bg-accent/5"><ChevronRight size={16} /></Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
