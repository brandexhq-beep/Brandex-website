import { useState, useEffect } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Plan {
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  period: string;
  popular: boolean;
  features: string[];
}

export default function PricingPreview() {
  const [yearly, setYearly] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("pricing_plans").select("*").order("sort_order")
      .then(({ data }) => {
        setPlans(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">Pricing</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Transparent packages, <span className="text-gradient">real value</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Choose the package that fits your stage. No hidden fees, ever.</p>
        </motion.div>

        <motion.div className="flex items-center justify-center gap-4 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <span className={`text-sm font-medium transition-colors ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <button onClick={() => setYearly(!yearly)} className="relative w-14 h-7 rounded-full bg-secondary border border-border/60 transition-colors hover:border-accent/30" aria-label="Toggle pricing period">
            <motion.div className="absolute top-0.5 w-6 h-6 rounded-full bg-accent shadow-md" animate={{ left: yearly ? "calc(100% - 1.625rem)" : "0.125rem" }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
          </button>
          <span className={`text-sm font-medium transition-colors ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly <span className="ml-1.5 text-xs text-accent font-semibold">Save 20%</span>
          </span>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            {plans.map((pkg, i) => {
              const price = yearly ? pkg.price_yearly : pkg.price_monthly;
              return (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }} whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`relative group rounded-2xl p-8 transition-all duration-300 overflow-hidden ${pkg.popular ? "bg-card border-2 border-accent/40 shadow-2xl shadow-accent/10" : "bg-card border border-border/60 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04]"}`}
                >
                  {pkg.popular && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-[hsl(var(--gradient-end)/0.04)]" />
                      <div className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-accent via-[hsl(var(--gradient-end))] to-accent rounded-t-2xl" />
                      <div className="absolute top-5 right-5 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-md shadow-accent/20">
                          <Sparkles size={12} /> Popular
                        </span>
                      </div>
                    </>
                  )}
                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1.5">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>
                    <div className="mb-8">
                      {price === "Custom" ? (
                        <span className="font-display text-4xl lg:text-5xl font-bold text-foreground">Custom</span>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm text-muted-foreground font-medium">$</span>
                          <motion.span key={price} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="font-display text-4xl lg:text-5xl font-bold text-foreground">{price}</motion.span>
                          <span className="text-sm text-muted-foreground font-medium ml-1">/ {pkg.period}</span>
                        </div>
                      )}
                    </div>
                    <ul className="space-y-3.5 mb-8">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.popular ? "bg-accent/15" : "bg-secondary"}`}>
                            <Check size={12} className={pkg.popular ? "text-accent" : "text-muted-foreground"} />
                          </div>
                          <span className="text-sm text-foreground leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={`w-full h-12 text-base font-medium transition-all duration-300 ${pkg.popular ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                      <Link to="/contact">{pkg.popular ? "Most Popular" : pkg.name === "Enterprise" ? "Contact Us" : "Get Started"}</Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div className="mt-14 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
          <Link to="/services" className="inline-flex items-center text-accent font-medium hover:underline underline-offset-4 group">
            View all services & packages <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
