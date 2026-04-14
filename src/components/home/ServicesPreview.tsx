import { Link } from "react-router-dom";
import { Globe, Workflow, AppWindow, Share2, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites and web applications built with modern technologies.",
    details: "From marketing sites to complex platforms — responsive, fast, and SEO-optimized.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description: "Streamline operations with custom automation workflows and integrations.",
    details: "Eliminate manual tasks, connect your tools, and let systems work for you.",
  },
  {
    icon: AppWindow,
    title: "Custom Applications",
    description: "Tailored software solutions designed around your unique business processes.",
    details: "Dashboards, internal tools, customer portals — built exactly to your needs.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic social presence that drives engagement and brand awareness.",
    details: "Content strategy, scheduling, analytics, and growth campaigns.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section ref={ref} className="py-28 lg:py-36">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-2xl mb-20"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">Services</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Everything you need to go digital
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From concept to launch, we handle every aspect of your digital transformation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <TiltCard className="h-full rounded-2xl">
                <div className="group relative bg-card border border-border/60 rounded-2xl p-7 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/[0.06] transition-all duration-300 cursor-pointer overflow-hidden h-full">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                      <service.icon size={22} className="text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2.5">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{service.description}</p>
                    <p className="text-sm text-muted-foreground/60 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                      {service.details}
                    </p>
                    <div className="mt-5 flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Learn more <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to="/services" className="inline-flex items-center text-accent font-medium hover:underline underline-offset-4 group">
            Explore all services <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
