import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ShoppingCart, TrendingUp, Calendar, Clock, CreditCard,
  BarChart3, Activity, Wifi, Zap, Smartphone, BookOpen,
  Settings, Link2, Bell, Award, Play, ExternalLink
} from "lucide-react";

const categories = ["All", "Web", "Automation", "Application", "Mobile"];

import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

/* ── Mockup Components ── */

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-red-400/70" />
      <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
      <div className="w-2 h-2 rounded-full bg-green-400/70" />
    </div>
  );
}

function OrderingMockup() {
  return (
    <div className="absolute inset-3 rounded-xl bg-card/70 backdrop-blur-sm border border-border/30 p-3 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <WindowDots />
        <div className="h-4 w-24 bg-secondary/80 rounded-full" />
        <ShoppingCart size={12} className="text-accent/60" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        {[
          { name: "Margherita", price: "$12.99", color: "bg-orange-400/15" },
          { name: "Caesar Salad", price: "$9.50", color: "bg-green-400/15" },
          { name: "Pasta Bowl", price: "$14.99", color: "bg-yellow-400/15" },
          { name: "Grilled Fish", price: "$18.50", color: "bg-blue-400/15" },
        ].map((item) => (
          <div key={item.name} className={`${item.color} rounded-lg p-2 flex flex-col justify-between`}>
            <div className="w-full aspect-[4/3] rounded bg-secondary/40 mb-1.5" />
            <p className="text-[9px] font-semibold text-foreground/80 truncate">{item.name}</p>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[8px] text-accent font-bold">{item.price}</span>
              <div className="w-4 h-4 rounded bg-accent/20 flex items-center justify-center">
                <span className="text-[8px] text-accent font-bold">+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 bg-accent/15 rounded-lg p-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <CreditCard size={10} className="text-accent" />
          <span className="text-[9px] font-medium text-foreground/70">3 items</span>
        </div>
        <div className="bg-accent rounded px-2 py-0.5">
          <span className="text-[8px] font-bold text-accent-foreground">Checkout $37.48</span>
        </div>
      </div>
    </div>
  );
}

function BookingMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="absolute inset-3 rounded-xl bg-card/70 backdrop-blur-sm border border-border/30 p-3 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <WindowDots />
        <span className="text-[9px] font-semibold text-foreground/60">March 2026</span>
        <Calendar size={12} className="text-accent/60" />
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d) => (
          <div key={d} className="text-center text-[7px] font-semibold text-muted-foreground/60">{d}</div>
        ))}
        {Array.from({ length: 14 }, (_, i) => i + 1).map((d) => (
          <div key={d} className={`text-center text-[8px] py-0.5 rounded ${d === 8 ? "bg-accent text-accent-foreground font-bold" : d === 5 || d === 12 ? "bg-accent/10 text-accent" : "text-foreground/50"}`}>
            {d}
          </div>
        ))}
      </div>
      <p className="text-[8px] font-semibold text-foreground/60 mb-1.5">Available Slots</p>
      <div className="space-y-1.5 flex-1">
        {["9:00 AM", "10:30 AM", "2:00 PM"].map((slot, i) => (
          <div key={slot} className={`flex items-center justify-between rounded-lg p-1.5 ${i === 0 ? "bg-accent/15 border border-accent/30" : "bg-secondary/50"}`}>
            <div className="flex items-center gap-1.5">
              <Clock size={9} className={i === 0 ? "text-accent" : "text-muted-foreground/50"} />
              <span className={`text-[9px] font-medium ${i === 0 ? "text-accent" : "text-foreground/60"}`}>{slot}</span>
            </div>
            <span className="text-[7px] text-muted-foreground/50">{i === 0 ? "Selected" : "Open"}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 bg-accent rounded-lg py-1.5 text-center">
        <span className="text-[9px] font-bold text-accent-foreground">Confirm Booking</span>
      </div>
    </div>
  );
}

function DashboardMockup() {
  const bars = [35, 55, 45, 70, 60, 80, 50];
  return (
    <div className="absolute inset-3 rounded-xl bg-card/70 backdrop-blur-sm border border-border/30 p-3 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <WindowDots />
        <div className="flex items-center gap-1">
          <Wifi size={9} className="text-green-400" />
          <span className="text-[8px] text-green-400 font-medium">Live</span>
        </div>
        <Activity size={12} className="text-accent/60" />
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[
          { label: "Volume", value: "$2.4M", change: "+12.5%", icon: TrendingUp },
          { label: "Trades", value: "1,247", change: "+8.3%", icon: BarChart3 },
          { label: "P&L", value: "+$48K", change: "+3.1%", icon: Activity },
        ].map((stat) => (
          <div key={stat.label} className="bg-secondary/50 rounded-lg p-1.5">
            <div className="flex items-center gap-1 mb-0.5">
              <stat.icon size={8} className="text-accent/60" />
              <span className="text-[7px] text-muted-foreground/60">{stat.label}</span>
            </div>
            <p className="text-[10px] font-bold text-foreground/80">{stat.value}</p>
            <span className="text-[7px] text-green-400 font-medium">{stat.change}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-secondary/30 rounded-lg p-2 flex flex-col justify-end">
        <div className="flex items-end gap-1 h-full">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div className={`rounded-t ${i === 5 ? "bg-accent" : "bg-accent/30"}`} style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 overflow-hidden">
        {["AAPL +1.2%", "TSLA -0.8%", "MSFT +2.1%", "GOOG +0.5%"].map((t) => (
          <span key={t} className={`text-[7px] font-mono whitespace-nowrap ${t.includes("-") ? "text-red-400/70" : "text-green-400/70"}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="absolute inset-3 rounded-xl bg-card/70 backdrop-blur-sm border border-border/30 p-3 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <WindowDots />
        <span className="text-[9px] font-semibold text-foreground/60">Workflow Builder</span>
        <Settings size={12} className="text-accent/60" />
      </div>
      {/* Flow nodes */}
      <div className="flex-1 flex flex-col items-center gap-1.5">
        {[
          { label: "New Lead", icon: Zap, color: "bg-yellow-400/15 border-yellow-400/30" },
          { label: "Enrich Data", icon: Link2, color: "bg-blue-400/15 border-blue-400/30" },
          { label: "Add to CRM", icon: Settings, color: "bg-purple-400/15 border-purple-400/30" },
          { label: "Send Welcome", icon: Bell, color: "bg-green-400/15 border-green-400/30" },
        ].map((node, i) => (
          <div key={node.label} className="w-full">
            <div className={`${node.color} border rounded-lg p-2 flex items-center gap-2`}>
              <div className="w-5 h-5 rounded bg-card/60 flex items-center justify-center">
                <node.icon size={10} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-semibold text-foreground/80">{node.label}</p>
                <p className="text-[7px] text-muted-foreground/60">Step {i + 1}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-400/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
            </div>
            {i < 3 && (
              <div className="flex justify-center">
                <div className="w-px h-1.5 bg-accent/20" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between bg-secondary/50 rounded-lg p-2">
        <span className="text-[8px] text-muted-foreground/60">12 tools connected</span>
        <span className="text-[8px] font-bold text-green-400">Active</span>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="absolute inset-3 flex items-center justify-center">
      {/* Phone frame */}
      <div className="w-[55%] h-full bg-card/70 backdrop-blur-sm border-2 border-border/40 rounded-[1.2rem] p-2 flex flex-col overflow-hidden relative">
        {/* Notch */}
        <div className="w-12 h-1.5 bg-border/40 rounded-full mx-auto mb-2" />
        {/* Header */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[8px] font-bold text-foreground/80">ShopLocal</span>
          <Smartphone size={10} className="text-accent/60" />
        </div>
        {/* Search bar */}
        <div className="bg-secondary/60 rounded-lg px-2 py-1 mb-2">
          <span className="text-[7px] text-muted-foreground/50">Search nearby shops...</span>
        </div>
        {/* Shop cards */}
        <div className="flex-1 space-y-1.5 overflow-hidden">
          {[
            { name: "Bloom Florist", dist: "0.3 mi", rating: "4.9" },
            { name: "Daily Bread", dist: "0.5 mi", rating: "4.7" },
            { name: "Craft & Co", dist: "0.8 mi", rating: "4.8" },
          ].map((shop) => (
            <div key={shop.name} className="bg-secondary/40 rounded-lg p-1.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <ShoppingCart size={10} className="text-accent/60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-semibold text-foreground/80 truncate">{shop.name}</p>
                <p className="text-[7px] text-muted-foreground/50">{shop.dist} · ★ {shop.rating}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div className="mt-2 flex items-center justify-around bg-secondary/30 rounded-lg py-1">
          {["Home", "Map", "Rewards", "Profile"].map((t, i) => (
            <span key={t} className={`text-[6px] font-medium ${i === 0 ? "text-accent" : "text-muted-foreground/50"}`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LearningMockup() {
  return (
    <div className="absolute inset-3 rounded-xl bg-card/70 backdrop-blur-sm border border-border/30 p-3 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <WindowDots />
        <span className="text-[9px] font-semibold text-foreground/60">My Courses</span>
        <BookOpen size={12} className="text-accent/60" />
      </div>
      {/* Course cards */}
      <div className="space-y-2 flex-1">
        {[
          { name: "React Mastery", progress: 85, lessons: "24/28", color: "bg-blue-400/15" },
          { name: "TypeScript Pro", progress: 60, lessons: "18/30", color: "bg-purple-400/15" },
          { name: "Node.js Advanced", progress: 30, lessons: "6/20", color: "bg-green-400/15" },
        ].map((course) => (
          <div key={course.name} className={`${course.color} rounded-lg p-2`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Play size={8} className="text-accent" />
                <span className="text-[9px] font-semibold text-foreground/80">{course.name}</span>
              </div>
              <span className="text-[7px] text-muted-foreground/60">{course.lessons}</span>
            </div>
            <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
            <span className="text-[7px] text-accent mt-0.5 inline-block">{course.progress}%</span>
          </div>
        ))}
      </div>
      {/* Achievement */}
      <div className="mt-2 bg-accent/10 border border-accent/20 rounded-lg p-2 flex items-center gap-2">
        <Award size={14} className="text-accent" />
        <div>
          <p className="text-[8px] font-bold text-foreground/80">Next: React Certificate</p>
          <p className="text-[7px] text-muted-foreground/60">Complete 4 more lessons</p>
        </div>
      </div>
    </div>
  );
}

export const mockupComponents: Record<string, React.FC> = {
  ordering: OrderingMockup,
  booking: BookingMockup,
  dashboard: DashboardMockup,
  automation: AutomationMockup,
  mobile: MobileMockup,
  learning: LearningMockup,
};

export default function CaseStudiesPage() {
  useScrollReveal();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12 scroll-reveal">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Case Studies</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our work, your results
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real projects, real outcomes. See how we've helped businesses transform digitally.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 scroll-reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const Mockup = mockupComponents[project.mockup];
            return (
              <div
                key={project.title}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300"
              >
                <div className="aspect-[16/10] bg-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500" />
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1">
                    {Mockup && <Mockup />}
                  </div>
                  <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 text-center">
                    <span className="text-primary-foreground font-display text-2xl font-bold mb-2">{project.result}</span>
                    <span className="text-primary-foreground/70 text-sm">{project.challenge}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">{project.category}</span>
                  <div className="flex justify-between items-start mt-1 mb-2">
                    <h3 className="font-display font-semibold text-lg text-foreground">{project.title}</h3>
                    <Link to={`/case-studies/${project.id}`} className="text-accent hover:text-accent-foreground hover:bg-accent transition-colors bg-accent/10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold" title="View Deep Dive">
                      Deep Dive <Link2 size={12} />
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
