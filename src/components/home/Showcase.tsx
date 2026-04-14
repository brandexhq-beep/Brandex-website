import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, LayoutDashboard, Cog, Smartphone, TrendingUp, ShoppingCart, Users, BarChart3 } from "lucide-react";

const showcaseItems = [
  {
    title: "Website Design",
    subtitle: "Responsive marketing sites",
    icon: Globe,
    mockup: {
      type: "website" as const,
      nav: ["Home", "About", "Services", "Contact"],
      hero: "Launch Your Brand Online",
      subtitle: "Beautiful, fast websites that convert visitors into customers",
      stats: [{ label: "Visitors", value: "12.4K" }, { label: "Conversion", value: "4.8%" }, { label: "Bounce", value: "28%" }],
    },
  },
  {
    title: "Dashboard Interfaces",
    subtitle: "Data-driven admin panels",
    icon: LayoutDashboard,
    mockup: {
      type: "dashboard" as const,
      metrics: [
        { label: "Revenue", value: "$48.2K", change: "+12%", icon: TrendingUp },
        { label: "Orders", value: "1,284", change: "+8%", icon: ShoppingCart },
        { label: "Users", value: "3.2K", change: "+24%", icon: Users },
      ],
      chartBars: [35, 55, 45, 70, 60, 85, 75, 90, 65, 80, 70, 95],
    },
  },
  {
    title: "Automation Tools",
    subtitle: "Workflow management systems",
    icon: Cog,
    mockup: {
      type: "automation" as const,
      flows: [
        { from: "New Order", to: "Send Confirmation", status: "active" },
        { from: "Payment Received", to: "Update Inventory", status: "active" },
        { from: "Low Stock", to: "Notify Manager", status: "pending" },
        { from: "Review Submitted", to: "Publish to Site", status: "active" },
      ],
    },
  },
  {
    title: "Mobile UI",
    subtitle: "Cross-platform experiences",
    icon: Smartphone,
    mockup: {
      type: "mobile" as const,
      appName: "FreshBite",
      items: [
        { name: "Margherita Pizza", price: "$12.99", tag: "Popular" },
        { name: "Caesar Salad", price: "$8.99", tag: "" },
        { name: "Pasta Carbonara", price: "$14.99", tag: "New" },
      ],
    },
  },
];

function WebsiteMockup({ data }: { data: typeof showcaseItems[0]["mockup"] & { type: "website" } }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {data.nav.map((n) => (
            <span key={n} className="text-[10px] text-primary-foreground/40">{n}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h4 className="font-display font-bold text-lg text-primary-foreground mb-2">{data.hero}</h4>
        <p className="text-[11px] text-primary-foreground/40 mb-6 max-w-[200px]">{data.subtitle}</p>
        <div className="flex gap-2 mb-6">
          <div className="px-3 py-1.5 rounded-md bg-accent/20 text-[10px] font-medium text-accent">Get Started</div>
          <div className="px-3 py-1.5 rounded-md border border-primary-foreground/15 text-[10px] text-primary-foreground/50">Learn More</div>
        </div>
      </div>
      <div className="flex gap-3 mt-auto">
        {data.stats.map((s) => (
          <div key={s.label} className="flex-1 p-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-center">
            <p className="text-xs font-bold text-primary-foreground">{s.value}</p>
            <p className="text-[9px] text-primary-foreground/35">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMockup({ data }: { data: typeof showcaseItems[1]["mockup"] & { type: "dashboard" } }) {
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {data.metrics.map((m) => (
          <div key={m.label} className="p-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
            <div className="flex items-center gap-1 mb-1">
              <m.icon size={10} className="text-accent" />
              <span className="text-[9px] text-primary-foreground/35">{m.label}</span>
            </div>
            <p className="text-sm font-bold text-primary-foreground">{m.value}</p>
            <span className="text-[9px] text-accent">{m.change}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-medium text-primary-foreground/50">Revenue Overview</span>
          <span className="text-[9px] text-primary-foreground/30">Last 12 months</span>
        </div>
        <div className="flex items-end gap-1.5 h-[calc(100%-24px)]">
          {data.chartBars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-accent/25"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationMockup({ data }: { data: typeof showcaseItems[2]["mockup"] & { type: "automation" } }) {
  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium text-primary-foreground/50">Active Workflows</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">{data.flows.filter(f => f.status === "active").length} running</span>
      </div>
      {data.flows.map((flow, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={`w-2 h-2 rounded-full ${flow.status === "active" ? "bg-accent animate-pulse" : "bg-primary-foreground/20"}`} />
          <span className="text-[11px] text-primary-foreground/70 font-medium flex-1">{flow.from}</span>
          <svg width="16" height="8" viewBox="0 0 16 8" className="text-primary-foreground/20 shrink-0">
            <path d="M0 4h12M12 4l-3-3M12 4l-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="text-[11px] text-primary-foreground/50 flex-1 text-right">{flow.to}</span>
        </motion.div>
      ))}
    </div>
  );
}

function MobileMockup({ data }: { data: typeof showcaseItems[3]["mockup"] & { type: "mobile" } }) {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-44 bg-primary-foreground/5 border border-primary-foreground/15 rounded-2xl p-4 shadow-xl">
        <div className="text-center mb-4">
          <div className="w-8 h-8 rounded-xl bg-accent/20 mx-auto mb-2 flex items-center justify-center">
            <ShoppingCart size={14} className="text-accent" />
          </div>
          <h5 className="text-xs font-bold text-primary-foreground">{data.appName}</h5>
          <p className="text-[9px] text-primary-foreground/35">Order Online</p>
        </div>
        <div className="space-y-2">
          {data.items.map((item, i) => (
            <motion.div
              key={i}
              className="p-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-primary-foreground/70">{item.name}</span>
                {item.tag && (
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-accent/15 text-accent font-medium">{item.tag}</span>
                )}
              </div>
              <span className="text-[10px] font-bold text-accent">{item.price}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 p-2 rounded-lg bg-accent/20 text-center">
          <span className="text-[10px] font-medium text-accent">View Menu →</span>
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const sectionHeight = ref.current.offsetHeight;
      const p = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = Math.min(3, Math.floor(progress * 4));

  return (
    <section ref={ref} className="relative bg-primary" style={{ height: "150vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Showcase</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                See what we build
              </h2>
              <div className="space-y-4">
                {showcaseItems.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      i === activeIndex
                        ? "bg-primary-foreground/10 border border-primary-foreground/20"
                        : "opacity-40"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-accent" : "bg-primary-foreground/30"}`} />
                    <div>
                      <h3 className="font-display font-semibold text-primary-foreground">{item.title}</h3>
                      <p className="text-sm text-primary-foreground/60">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-primary-foreground/5 border border-primary-foreground/10">
                <AnimatePresence mode="wait">
                  {showcaseItems.map((item, i) =>
                    i === activeIndex ? (
                      <motion.div
                        key={item.title}
                        className="absolute inset-0 p-6"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <div className="h-full rounded-lg bg-primary-foreground/[0.03] border border-primary-foreground/10 p-5 flex flex-col">
                          {/* Browser chrome */}
                          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary-foreground/10">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground/15" />
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground/15" />
                            <div className="ml-3 h-2.5 bg-primary-foreground/8 rounded-full flex-1 max-w-40" />
                          </div>
                          {/* Dynamic content */}
                          <div className="flex-1 overflow-hidden">
                            {item.mockup.type === "website" && <WebsiteMockup data={item.mockup as any} />}
                            {item.mockup.type === "dashboard" && <DashboardMockup data={item.mockup as any} />}
                            {item.mockup.type === "automation" && <AutomationMockup data={item.mockup as any} />}
                            {item.mockup.type === "mobile" && <MobileMockup data={item.mockup as any} />}
                          </div>
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
