import { Link } from "react-router-dom";
import { UtensilsCrossed, CalendarCheck, BarChart3, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant Ordering Systems",
    description: "Digital menus, online ordering, and kitchen management — all in one system.",
    steps: ["Customer orders online", "Kitchen receives instantly", "Auto-updates inventory"],
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking Platforms",
    description: "Let customers book, reschedule, and manage appointments with zero friction.",
    steps: ["Customer picks a slot", "Auto-confirmation sent", "Reminders & follow-ups"],
  },
  {
    icon: BarChart3,
    title: "Business Dashboards",
    description: "Real-time visibility into your operations, revenue, and customer data.",
    steps: ["Data flows in live", "Visual reports generated", "Insights drive decisions"],
  },
  {
    icon: Zap,
    title: "Automation Tools",
    description: "Connect your apps, automate repetitive work, and focus on growth.",
    steps: ["Trigger event occurs", "Workflow executes", "Results logged & reported"],
  },
];

export default function SolutionsPreview() {
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
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">Solutions</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
            Products we build for you
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Proven solutions tailored to common business challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative bg-card border border-border/60 rounded-2xl p-8 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/[0.06] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-110 transition-all duration-300">
                    <sol.icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-1.5">{sol.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{sol.description}</p>
                  </div>
                </div>
                {/* Workflow steps */}
                <div className="flex items-center gap-2">
                  {sol.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent group-hover:bg-accent/20 transition-colors">
                          {j + 1}
                        </div>
                        <span className="text-[11px] text-muted-foreground text-center leading-tight">{step}</span>
                      </div>
                      {j < sol.steps.length - 1 && (
                        <ArrowRight size={12} className="text-border mt-[-16px] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
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
          <Link to="/solutions" className="inline-flex items-center text-accent font-medium hover:underline underline-offset-4 group">
            View all solutions <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
