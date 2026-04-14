import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface GalleryItem {
  title: string;
  category: string;
  gradient: string;
  result: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "FreshBite Ordering Platform",
    category: "Restaurant Tech",
    gradient: "from-accent/30 via-[hsl(var(--gradient-end)/0.2)] to-accent/10",
    result: "+340% online orders",
  },
  {
    title: "HealthSync Booking System",
    category: "Healthcare",
    gradient: "from-[hsl(var(--gradient-end)/0.3)] to-accent/15",
    result: "60% fewer no-shows",
  },
  {
    title: "TradeView Dashboard",
    category: "Finance",
    gradient: "from-accent/25 to-[hsl(var(--gradient-end)/0.15)]",
    result: "10M+ daily data points",
  },
  {
    title: "AutoFlow CRM Integration",
    category: "Automation",
    gradient: "from-accent/20 via-accent/10 to-[hsl(var(--gradient-end)/0.2)]",
    result: "40 hrs/week saved",
  },
  {
    title: "ShopLocal Mobile App",
    category: "Mobile",
    gradient: "from-[hsl(var(--gradient-end)/0.25)] via-accent/15 to-accent/5",
    result: "15K+ downloads",
  },
  {
    title: "EduTrack Learning Platform",
    category: "EdTech",
    gradient: "from-accent/15 to-[hsl(var(--gradient-end)/0.25)]",
    result: "3x completion rate",
  },
];

export default function LightboxGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const open = (i: number) => setSelected(i);
  const close = () => setSelected(null);
  const next = () => setSelected((s) => (s !== null ? (s + 1) % galleryItems.length : 0));
  const prev = () => setSelected((s) => (s !== null ? (s - 1 + galleryItems.length) % galleryItems.length : 0));

  return (
    <section className="py-28 lg:py-36">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-2xl mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">Portfolio</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            See what we've built
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Click on any project to explore it in detail.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onClick={() => open(i)}
              className={`group cursor-pointer rounded-2xl overflow-hidden relative ${
                i === 0 || i === 3 ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
              <div className="absolute inset-0 bg-grid opacity-15" />

              {/* Mock UI inside */}
              <div className="absolute inset-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 bg-foreground/10 rounded-full w-2/3" />
                    <div className="h-2 bg-foreground/8 rounded-full w-1/2" />
                  </div>
                </div>
                <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-display font-semibold text-foreground text-sm mt-1">{item.title}</h3>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-center">
                  <p className="text-primary-foreground font-display font-bold text-2xl mb-1">{item.result}</p>
                  <p className="text-primary-foreground/60 text-sm flex items-center justify-center gap-1">
                    View project <ExternalLink size={12} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card border border-border/60 flex items-center justify-center text-foreground hover:bg-accent/10 hover:border-accent/30 transition-all z-10"
            >
              <X size={18} />
            </button>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border/60 flex items-center justify-center text-foreground hover:bg-accent/10 hover:border-accent/30 transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border/60 flex items-center justify-center text-foreground hover:bg-accent/10 hover:border-accent/30 transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Content */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl mx-6"
            >
              <div className={`aspect-video rounded-2xl bg-gradient-to-br ${galleryItems[selected].gradient} relative overflow-hidden shadow-2xl`}>
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-8 lg:inset-12 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-foreground/20" />
                      <div className="w-3 h-3 rounded-full bg-foreground/10" />
                      <div className="w-3 h-3 rounded-full bg-foreground/10" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-foreground/10 rounded-full w-1/2" />
                      <div className="h-2.5 bg-foreground/8 rounded-full w-1/3" />
                      <div className="h-20 bg-card/40 backdrop-blur-sm rounded-xl mt-4 border border-border/20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="text-xs font-medium text-accent uppercase tracking-[0.15em]">
                  {galleryItems[selected].category}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-1">
                  {galleryItems[selected].title}
                </h3>
                <p className="text-accent font-semibold text-lg mt-2">{galleryItems[selected].result}</p>
                <p className="text-sm text-muted-foreground mt-3">
                  {selected + 1} / {galleryItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
