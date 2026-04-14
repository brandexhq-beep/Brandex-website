import { useEffect, useRef, useState } from "react";
import { AlertCircle, Cog, Rocket } from "lucide-react";

const steps = [
  {
    icon: AlertCircle,
    title: "The Problem",
    subtitle: "Manual processes hold you back",
    description: "Spreadsheets, manual orders, disconnected tools — your business wastes time on tasks that should be automated.",
    visual: "struggling",
  },
  {
    icon: Cog,
    title: "The Build",
    subtitle: "Brandex creates your digital system",
    description: "We design and build custom software, websites, and automation systems tailored to your exact workflows.",
    visual: "building",
  },
  {
    icon: Rocket,
    title: "The Result",
    subtitle: "Automated, scalable, unstoppable",
    description: "Your business runs smoother, serves more customers, and scales without adding complexity.",
    visual: "automated",
  },
];

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollProgress = Math.max(0, -rect.top) / (sectionHeight - window.innerHeight);
      const step = Math.min(2, Math.floor(scrollProgress * 3));
      setActiveStep(step);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "150vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">How it works</p>
              {/* Step indicators */}
              <div className="flex gap-2 mb-8">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i <= activeStep ? "bg-accent w-10" : "bg-border w-6"
                    }`}
                  />
                ))}
              </div>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 absolute ${
                    i === activeStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <step.icon size={20} className="text-accent" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">{step.title}</h2>
                  <p className="text-lg text-accent font-medium mb-4">{step.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed max-w-md">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Right: animated visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-[420px] h-[380px]">
                {/* Step 1: Chaotic manual processes */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    activeStep === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xl h-full">
                    {/* Header bar */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                      <div className="ml-auto h-2.5 bg-secondary rounded-full w-28" />
                    </div>
                    {/* Spreadsheet mockup */}
                    <div className="border border-border/60 rounded-lg overflow-hidden mb-4">
                      <div className="bg-secondary/60 px-3 py-2 flex gap-8">
                        {["Name", "Status", "Due", "Owner"].map((h) => (
                          <span key={h} className="text-[10px] font-semibold text-muted-foreground">{h}</span>
                        ))}
                      </div>
                      {[
                        { status: "bg-destructive/20 text-destructive", label: "Overdue" },
                        { status: "bg-yellow-400/20 text-yellow-600", label: "Delayed" },
                        { status: "bg-destructive/20 text-destructive", label: "Missing" },
                        { status: "bg-yellow-400/20 text-yellow-600", label: "Stuck" },
                        { status: "bg-destructive/20 text-destructive", label: "Error" },
                      ].map((row, i) => (
                        <div key={i} className="px-3 py-2.5 flex gap-8 items-center border-t border-border/40">
                          <div className="h-2 bg-secondary rounded w-16" />
                          <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${row.status}`}>{row.label}</span>
                          <div className="h-2 bg-secondary rounded w-12" />
                          <div className="w-5 h-5 rounded-full bg-secondary" />
                        </div>
                      ))}
                    </div>
                    {/* Error notifications */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-destructive/5 border border-destructive/15 rounded-lg px-3 py-2">
                        <AlertCircle size={14} className="text-destructive flex-shrink-0" />
                        <span className="text-[11px] text-destructive/80">3 tasks overdue · Manual follow-up needed</span>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-400/5 border border-yellow-200 dark:border-yellow-400/15 rounded-lg px-3 py-2">
                        <AlertCircle size={14} className="text-yellow-600 flex-shrink-0" />
                        <span className="text-[11px] text-yellow-700 dark:text-yellow-400/80">Data sync failed · 12 records unmatched</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Building the system */}
                <div
                  className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${
                    activeStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xl w-full h-full">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                      <span className="ml-2 text-[10px] font-medium text-accent">Building...</span>
                    </div>
                    {/* Code editor mockup */}
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 font-mono text-[11px] leading-relaxed mb-4 border border-border/40">
                      <div className="text-muted-foreground/50">{"// Automating your workflow"}</div>
                      <div><span className="text-accent">const</span> <span className="text-foreground">pipeline</span> = <span className="text-accent">{"{"}</span></div>
                      <div className="pl-4"><span className="text-muted-foreground">intake:</span> <span className="text-green-600 dark:text-green-400">'automated'</span>,</div>
                      <div className="pl-4"><span className="text-muted-foreground">process:</span> <span className="text-green-600 dark:text-green-400">'real-time'</span>,</div>
                      <div className="pl-4"><span className="text-muted-foreground">notify:</span> <span className="text-green-600 dark:text-green-400">'instant'</span>,</div>
                      <div><span className="text-accent">{"}"}</span>;</div>
                    </div>
                    {/* Build progress */}
                    <div className="space-y-3">
                      {[
                        { label: "Database schema", pct: 100 },
                        { label: "API endpoints", pct: 85 },
                        { label: "Frontend UI", pct: 60 },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="text-accent font-medium">{item.pct}%</span>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Spinning gear */}
                    <div className="flex items-center justify-center mt-4">
                      <Cog size={28} className="text-accent/40 animate-[spin_8s_linear_infinite]" />
                    </div>
                  </div>
                </div>

                {/* Step 3: Automated dashboard */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xl h-full">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[11px] font-medium text-green-600 dark:text-green-400">All systems operational</span>
                      <div className="ml-auto text-[10px] text-muted-foreground">Live Dashboard</div>
                    </div>
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { value: "+340%", label: "Revenue", color: "text-green-600 dark:text-green-400" },
                        { value: "98.7%", label: "Uptime", color: "text-accent" },
                        { value: "2.1s", label: "Avg Response", color: "text-accent" },
                      ].map((s) => (
                        <div key={s.label} className="bg-accent/5 border border-accent/10 rounded-xl p-3 text-center">
                          <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Chart bars */}
                    <div className="mb-4">
                      <div className="text-[11px] text-muted-foreground mb-2">Weekly Performance</div>
                      <div className="flex items-end gap-2 h-24">
                        {[45, 62, 55, 78, 65, 92, 85].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-accent/20 rounded-t-sm transition-all duration-1000"
                              style={{ height: `${h}%` }}
                            >
                              <div className="w-full h-full bg-accent/40 rounded-t-sm" style={{ height: `${h * 0.6}%` }} />
                            </div>
                            <span className="text-[8px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Activity feed */}
                    <div className="space-y-2">
                      {[
                        { text: "Order #1847 processed automatically", time: "2s ago" },
                        { text: "Invoice sent to client", time: "1m ago" },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[11px] text-foreground">{a.text}</span>
                          </div>
                          <span className="text-[9px] text-muted-foreground">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
