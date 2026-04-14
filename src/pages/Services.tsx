import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Globe, Workflow, AppWindow, Share2, CheckCircle, Check, Sparkles, Plus, Minus, BarChart3, ShoppingCart, Users, Bell, Zap, Database, Layout, Smartphone, TrendingUp, Heart, MessageSquare, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    tagline: "Websites that work as hard as you do",
    description: "We build high-performance websites and web applications using modern technologies. From marketing sites to complex platforms — every site is responsive, fast, and optimized for search engines.",
    features: ["Custom responsive design", "SEO optimization", "Performance tuning", "CMS integration", "E-commerce capabilities", "Analytics & tracking"],
    visual: "web",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    tagline: "Stop doing manually what software can do",
    description: "We analyze your workflows and build automation systems that eliminate repetitive tasks, connect your tools, and free your team to focus on what matters.",
    features: ["Workflow analysis", "Custom integrations", "API development", "Data synchronization", "Automated reporting", "Process optimization"],
    visual: "automation",
  },
  {
    icon: AppWindow,
    title: "Custom Applications",
    tagline: "Software built around your business",
    description: "Off-the-shelf tools don't fit every business. We design and develop custom applications — dashboards, portals, internal tools — tailored to your exact processes.",
    features: ["Requirements analysis", "UX/UI design", "Full-stack development", "Database architecture", "User management", "Ongoing support"],
    visual: "app",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    tagline: "Your brand, amplified",
    description: "Strategic social media management that builds your brand presence, drives engagement, and converts followers into customers.",
    features: ["Content strategy", "Visual design", "Scheduling & publishing", "Community management", "Analytics & reporting", "Ad campaign management"],
    visual: "social",
  },
];

const packages = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started online.",
    price: "2,499",
    period: "project",
    popular: false,
    features: [
      "Responsive website (up to 5 pages)",
      "Mobile-first design",
      "Basic SEO setup",
      "Contact form integration",
      "1 round of revisions",
      "2 weeks delivery",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    description: "For businesses ready to scale with custom solutions.",
    price: "6,999",
    period: "project",
    popular: true,
    features: [
      "Custom web application",
      "Up to 15 pages or views",
      "Advanced SEO & analytics",
      "CMS or admin dashboard",
      "API integrations (up to 3)",
      "3 rounds of revisions",
      "4 weeks delivery",
      "30 days post-launch support",
    ],
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "Full-scale digital transformation for ambitious teams.",
    price: "Custom",
    period: "",
    popular: false,
    features: [
      "Full-stack custom platform",
      "Unlimited pages & features",
      "Business automation workflows",
      "Dedicated project manager",
      "Priority support & SLA",
      "Ongoing maintenance plans",
      "Training & documentation",
      "White-label options",
    ],
    cta: "Contact Us",
  },
];

export default function ServicesPage() {
  useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl scroll-reveal">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Services</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6">
              End-to-end digital services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From strategy to execution, we handle every aspect of bringing your digital product to life.
            </p>
          </div>
        </div>
      </section>

      {/* Service details */}
      {services.map((service, i) => (
        <section
          key={service.title}
          className={`py-20 lg:py-28 ${i % 2 === 1 ? "bg-secondary/50" : ""}`}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={`scroll-reveal ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <service.icon size={28} className="text-accent" />
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">{service.title}</h2>
                <p className="text-lg text-accent font-medium mb-4">{service.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`scroll-reveal scroll-reveal-delay-2 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <ServiceVisual type={service.visual} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Section */}
      <section className="py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-5">Pricing</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-[1.1]">
              Transparent packages, <span className="text-gradient">real value</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Choose the package that fits your stage. Every project includes our full attention and commitment to quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative group rounded-2xl p-8 transition-all duration-300 overflow-hidden ${
                  pkg.popular
                    ? "bg-card border-2 border-accent/40 shadow-2xl shadow-accent/10"
                    : "bg-card border border-border/60 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/[0.04]"
                }`}
              >
                {/* Gradient background for popular */}
                {pkg.popular && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-[hsl(var(--gradient-end)/0.04)]" />
                    <div className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-accent via-[hsl(var(--gradient-end))] to-accent rounded-t-2xl" />
                  </>
                )}

                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute top-5 right-5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-md shadow-accent/20">
                      <Sparkles size={12} />
                      Popular
                    </span>
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1.5">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="mb-8">
                    {pkg.price === "Custom" ? (
                      <span className="font-display text-4xl lg:text-5xl font-bold text-foreground">Custom</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-muted-foreground font-medium">$</span>
                        <span className="font-display text-4xl lg:text-5xl font-bold text-foreground">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground font-medium ml-1">/ {pkg.period}</span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          pkg.popular ? "bg-accent/15" : "bg-secondary"
                        }`}>
                          <Check size={12} className={pkg.popular ? "text-accent" : "text-muted-foreground"} />
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full h-12 text-base font-medium transition-all duration-300 ${
                      pkg.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Link to="/contact">{pkg.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-sm text-muted-foreground mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            All packages include a discovery call, project timeline, and detailed proposal. No hidden fees.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}

function ServiceVisual({ type }: { type: string }) {
  if (type === "web") {
    return (
      <div className="aspect-[4/3] bg-card border border-border rounded-xl p-5 shadow-lg overflow-hidden group hover:border-accent/20 transition-all duration-300">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-destructive/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <div className="ml-3 h-2.5 bg-secondary rounded-full w-40 flex-1 max-w-[200px]" />
        </div>
        {/* Website mockup */}
        <div className="h-full rounded-lg bg-secondary/30 border border-border/40 overflow-hidden">
          {/* Nav */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
            <div className="w-16 h-2.5 bg-accent/20 rounded" />
            <div className="flex gap-4">
              <div className="w-10 h-2 bg-secondary rounded" />
              <div className="w-10 h-2 bg-secondary rounded" />
              <div className="w-10 h-2 bg-secondary rounded" />
            </div>
            <div className="w-14 h-6 bg-accent/15 rounded-md" />
          </div>
          {/* Hero section */}
          <div className="p-5">
            <div className="h-3.5 bg-foreground/10 rounded w-3/4 mb-2" />
            <div className="h-3.5 bg-foreground/10 rounded w-1/2 mb-4" />
            <div className="h-2.5 bg-secondary rounded w-full mb-1.5" />
            <div className="h-2.5 bg-secondary rounded w-2/3 mb-4" />
            <div className="flex gap-2 mb-5">
              <div className="h-7 w-20 bg-accent/20 rounded-md" />
              <div className="h-7 w-20 bg-secondary rounded-md" />
            </div>
            {/* Cards row */}
            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card/80 border border-border/30 rounded-lg p-3">
                  <div className="w-6 h-6 rounded bg-accent/10 mb-2" />
                  <div className="h-2 bg-secondary rounded w-full mb-1" />
                  <div className="h-2 bg-secondary rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div className="aspect-[4/3] bg-card border border-border rounded-xl p-5 shadow-lg overflow-hidden group hover:border-accent/20 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-accent" />
          <span className="text-xs font-semibold text-foreground">Automation Pipeline</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Active</span>
          </div>
        </div>
        {/* Workflow nodes */}
        <div className="space-y-3 h-full">
          {[
            { label: "New Order Received", icon: ShoppingCart, status: "Trigger", color: "bg-accent/15 border-accent/25" },
            { label: "Validate & Process", icon: Database, status: "Running", color: "bg-accent/10 border-accent/20" },
            { label: "Update Inventory", icon: BarChart3, status: "Running", color: "bg-accent/10 border-accent/20" },
            { label: "Notify Customer", icon: Bell, status: "Complete", color: "bg-green-500/10 border-green-500/20" },
            { label: "Generate Invoice", icon: Layout, status: "Complete", color: "bg-green-500/10 border-green-500/20" },
          ].map((node, idx) => (
            <div key={idx}>
              <div className={`flex items-center gap-3 ${node.color} border rounded-lg px-4 py-3`}>
                <node.icon size={16} className="text-accent flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{node.label}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  node.status === "Trigger" ? "bg-accent/20 text-accent" :
                  node.status === "Running" ? "bg-accent/15 text-accent" :
                  "bg-green-500/15 text-green-600 dark:text-green-400"
                }`}>{node.status}</span>
              </div>
              {idx < 4 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-px h-3 bg-accent/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "app") {
    return (
      <div className="aspect-[4/3] bg-card border border-border rounded-xl p-5 shadow-lg overflow-hidden group hover:border-accent/20 transition-all duration-300">
        {/* App header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Layout size={14} className="text-accent" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Dashboard</div>
              <div className="text-[10px] text-muted-foreground">Custom Application</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary" />
            <div className="w-6 h-6 rounded-full bg-secondary" />
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: "2,847", label: "Users", trend: "+12%" },
            { val: "$48.5K", label: "Revenue", trend: "+23%" },
            { val: "99.9%", label: "Uptime", trend: "Stable" },
          ].map((s) => (
            <div key={s.label} className="bg-secondary/50 border border-border/40 rounded-lg p-3">
              <div className="text-sm font-bold text-foreground">{s.val}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[9px] text-muted-foreground">{s.label}</span>
                <span className="text-[9px] text-green-600 dark:text-green-400 font-medium">{s.trend}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div className="bg-secondary/30 border border-border/40 rounded-lg p-3 mb-3">
          <div className="text-[10px] text-muted-foreground mb-2">Revenue Overview</div>
          <div className="flex items-end gap-1.5 h-16">
            {[35, 50, 42, 68, 55, 75, 62, 88, 72, 95, 82, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-accent/25 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        {/* Table preview */}
        <div className="bg-secondary/30 border border-border/40 rounded-lg overflow-hidden">
          <div className="flex gap-6 px-3 py-1.5 bg-secondary/50">
            {["User", "Action", "Status"].map((h) => (
              <span key={h} className="text-[9px] font-semibold text-muted-foreground">{h}</span>
            ))}
          </div>
          {[1, 2].map((r) => (
            <div key={r} className="flex gap-6 items-center px-3 py-2 border-t border-border/30">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-accent/10" />
                <div className="h-1.5 bg-secondary rounded w-12" />
              </div>
              <div className="h-1.5 bg-secondary rounded w-16" />
              <div className="h-4 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <span className="text-[7px] text-green-600 dark:text-green-400 font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Social media
  return (
    <div className="aspect-[4/3] bg-card border border-border rounded-xl p-5 shadow-lg overflow-hidden group hover:border-accent/20 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={16} className="text-accent" />
        <span className="text-xs font-semibold text-foreground">Social Dashboard</span>
      </div>
      {/* Engagement stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { icon: Heart, val: "12.4K", label: "Likes", color: "text-pink-500" },
          { icon: MessageSquare, val: "3.2K", label: "Comments", color: "text-accent" },
          { icon: Users, val: "8.7K", label: "Followers", color: "text-accent" },
          { icon: TrendingUp, val: "+47%", label: "Growth", color: "text-green-600 dark:text-green-400" },
        ].map((s) => (
          <div key={s.label} className="bg-secondary/50 border border-border/40 rounded-lg p-3 flex items-center gap-2.5">
            <s.icon size={16} className={s.color} />
            <div>
              <div className="text-sm font-bold text-foreground">{s.val}</div>
              <div className="text-[9px] text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Post previews */}
      <div className="space-y-2.5">
        {[
          { platform: "Instagram", time: "2h ago", engagement: "847 likes" },
          { platform: "LinkedIn", time: "5h ago", engagement: "234 reactions" },
          { platform: "Twitter/X", time: "8h ago", engagement: "1.2K impressions" },
        ].map((post) => (
          <div key={post.platform} className="flex items-center gap-3 bg-secondary/30 border border-border/30 rounded-lg px-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Calendar size={12} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{post.platform}</span>
                <span className="text-[9px] text-muted-foreground">{post.time}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded w-full mt-1.5 mb-1" />
              <span className="text-[9px] text-accent font-medium">{post.engagement}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Scheduled indicator */}
      <div className="mt-3 flex items-center gap-2 bg-accent/5 border border-accent/15 rounded-lg px-3 py-2">
        <Calendar size={12} className="text-accent" />
        <span className="text-[10px] text-accent font-medium">3 posts scheduled for today</span>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on complexity. A marketing website typically takes 2–3 weeks, while a custom application can take 4–8 weeks. We'll give you a detailed timeline during our discovery call before any work begins.",
  },
  {
    q: "What technologies do you use?",
    a: "We primarily work with React, TypeScript, Node.js, and PostgreSQL — modern, battle-tested tools that scale. For specific needs, we choose the best technology for the job and always prioritize long-term maintainability.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. All Growth and Enterprise packages include post-launch support. We also offer monthly maintenance retainers for hosting, updates, security patches, and feature improvements.",
  },
  {
    q: "Can you work with my existing systems?",
    a: "Absolutely. We regularly integrate with existing tools, APIs, and databases. During discovery, we'll audit your current stack and design a solution that works seamlessly alongside it.",
  },
  {
    q: "What if I need changes after the project is delivered?",
    a: "Every package includes revision rounds. Beyond that, we offer flexible hourly or retainer arrangements for ongoing updates. We build lasting partnerships, not one-off projects.",
  },
  {
    q: "How do payments work?",
    a: "We typically structure payments in milestones — a deposit to begin, a mid-project payment, and final payment on delivery. Enterprise projects have custom billing arrangements. No hidden fees, ever.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

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
            Common questions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Everything you need to know before getting started.
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
                    isOpen ? "border-accent/30 shadow-lg shadow-accent/[0.04]" : "border-border/60 hover:border-accent/15"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className={`font-display font-semibold text-base pr-4 transition-colors duration-200 ${
                      isOpen ? "text-accent" : "text-foreground group-hover:text-accent"
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-accent/15 rotate-0" : "bg-secondary group-hover:bg-accent/10"
                    }`}>
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
