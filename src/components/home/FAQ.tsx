import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on complexity. A marketing website typically takes 2–3 weeks, while a custom application can take 4–8 weeks. We'll give you a detailed timeline during our discovery call.",
  },
  {
    q: "What technologies do you use?",
    a: "We primarily work with React, TypeScript, Node.js, and PostgreSQL — modern, battle-tested tools that scale. We always choose the best technology for the job.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. All Growth and Enterprise packages include post-launch support. We also offer monthly maintenance retainers for updates, security patches, and feature improvements.",
  },
  {
    q: "Can you work with my existing systems?",
    a: "Absolutely. We regularly integrate with existing tools, APIs, and databases. During discovery, we'll audit your current stack and design a seamless solution.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "Every package includes revision rounds. Beyond that, we offer flexible hourly or retainer arrangements. We build lasting partnerships, not one-off projects.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 lg:py-36 bg-secondary/40">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">FAQ</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Got questions?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Everything you need to know before we start building together.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <div
                  className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-accent/30 shadow-lg shadow-accent/[0.04]"
                      : "border-border/60 hover:border-accent/15"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span
                      className={`font-display font-semibold text-base pr-4 transition-colors duration-200 ${
                        isOpen ? "text-accent" : "text-foreground group-hover:text-accent"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen ? "bg-accent/15" : "bg-secondary group-hover:bg-accent/10"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={16} className="text-accent" />
                      ) : (
                        <Plus size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="h-px bg-border/60 mb-4" />
                          <p className="text-muted-foreground leading-relaxed text-[15px]">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
