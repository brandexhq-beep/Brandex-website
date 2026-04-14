import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  UtensilsCrossed, CalendarCheck, BarChart3, Zap, ArrowRight, Search,
  ShoppingCart, GraduationCap, Building2, Truck, Stethoscope, Palette,
  HeadphonesIcon, Shield, Megaphone, CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const categories = ["All", "Operations", "Customer-Facing", "Analytics", "Industry-Specific"];

const solutions = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant Ordering Systems",
    category: "Industry-Specific",
    description: "Digital menus, online ordering, kitchen display systems, and delivery management — all integrated into one platform your staff and customers will love.",
    workflow: [
      { step: "Browse Menu", detail: "Customers view your digital menu with photos and descriptions" },
      { step: "Place Order", detail: "Orders placed online or in-store go directly to your kitchen" },
      { step: "Track & Deliver", detail: "Real-time tracking with automatic inventory updates" },
    ],
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking Platforms",
    category: "Customer-Facing",
    description: "Let customers book, reschedule, and manage appointments 24/7. Automated confirmations, reminders, and follow-ups keep your schedule full and no-shows low.",
    workflow: [
      { step: "Pick a Time", detail: "Customers choose from your real-time availability" },
      { step: "Auto-Confirm", detail: "Instant confirmation via email and SMS" },
      { step: "Remind & Follow Up", detail: "Automated reminders reduce no-shows by up to 60%" },
    ],
  },
  {
    icon: BarChart3,
    title: "Business Dashboards",
    category: "Analytics",
    description: "See your entire business at a glance. Real-time metrics, visual reports, and actionable insights — all customized to the KPIs that matter to you.",
    workflow: [
      { step: "Connect Data", detail: "Pull data from all your tools and systems" },
      { step: "Visualize", detail: "Auto-generated charts, tables, and real-time metrics" },
      { step: "Decide", detail: "Actionable insights that drive better business decisions" },
    ],
  },
  {
    icon: Zap,
    title: "Automation Tools",
    category: "Operations",
    description: "Connect your apps, eliminate repetitive tasks, and build workflows that run on autopilot. From invoicing to customer onboarding — automate it all.",
    workflow: [
      { step: "Define Triggers", detail: "Set conditions that start your automated workflows" },
      { step: "Execute Actions", detail: "Tasks run automatically across all connected tools" },
      { step: "Monitor & Report", detail: "Track performance and get alerts when attention is needed" },
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    category: "Customer-Facing",
    description: "Custom online stores with inventory management, payment processing, and seamless checkout experiences that convert browsers into buyers.",
    workflow: [
      { step: "Browse & Search", detail: "Customers explore products with filters and smart search" },
      { step: "Cart & Checkout", detail: "Frictionless checkout with multiple payment options" },
      { step: "Fulfill & Track", detail: "Automated order fulfillment with real-time shipping updates" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Learning Management Systems",
    category: "Industry-Specific",
    description: "Custom LMS platforms with course creation, progress tracking, certifications, and interactive content for training companies and educational institutions.",
    workflow: [
      { step: "Create Courses", detail: "Build interactive lessons with video, quizzes, and assignments" },
      { step: "Track Progress", detail: "Monitor learner engagement and completion rates" },
      { step: "Certify", detail: "Automated certificates and compliance reporting" },
    ],
  },
  {
    icon: Building2,
    title: "Real Estate Portals",
    category: "Industry-Specific",
    description: "Property listing platforms with virtual tours, lead management, and automated matching — connecting buyers, sellers, and agents seamlessly.",
    workflow: [
      { step: "List Properties", detail: "Upload listings with photos, floor plans, and virtual tours" },
      { step: "Match & Alert", detail: "AI-powered matching notifies buyers of relevant properties" },
      { step: "Close Deals", detail: "Document management and e-signing for faster closings" },
    ],
  },
  {
    icon: Truck,
    title: "Logistics & Fleet Management",
    category: "Operations",
    description: "Track shipments, optimize routes, manage drivers, and automate dispatch — all from a single dashboard built for logistics companies.",
    workflow: [
      { step: "Plan Routes", detail: "AI-optimized routing to reduce fuel costs and delivery times" },
      { step: "Track Live", detail: "Real-time GPS tracking with automated status updates" },
      { step: "Report & Optimize", detail: "Performance analytics and cost optimization insights" },
    ],
  },
  {
    icon: Stethoscope,
    title: "Healthcare Portals",
    category: "Industry-Specific",
    description: "Patient portals, telemedicine integrations, and health record management systems that are HIPAA-aware and built for modern healthcare providers.",
    workflow: [
      { step: "Patient Onboarding", detail: "Digital intake forms and insurance verification" },
      { step: "Virtual Visits", detail: "Integrated telemedicine with secure video calls" },
      { step: "Records & Billing", detail: "Centralized records with automated billing workflows" },
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support Systems",
    category: "Customer-Facing",
    description: "Helpdesk and ticketing systems with live chat, knowledge bases, and AI-powered responses that keep your customers happy and your team efficient.",
    workflow: [
      { step: "Submit Ticket", detail: "Multi-channel intake via chat, email, or form" },
      { step: "Route & Prioritize", detail: "Smart routing to the right agent with SLA tracking" },
      { step: "Resolve & Learn", detail: "Resolution tracking with feedback and knowledge base updates" },
    ],
  },
  {
    icon: CreditCard,
    title: "Invoicing & Payments",
    category: "Operations",
    description: "Automated invoicing, payment collection, and financial reporting — eliminate manual billing and get paid faster with custom payment workflows.",
    workflow: [
      { step: "Generate Invoice", detail: "Auto-create invoices from project data or time tracking" },
      { step: "Collect Payment", detail: "Multiple payment methods with automated reminders" },
      { step: "Reconcile", detail: "Automatic reconciliation with accounting software" },
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing Automation",
    category: "Analytics",
    description: "Email campaigns, lead scoring, funnel tracking, and multi-channel marketing — all automated and tied to real conversion data.",
    workflow: [
      { step: "Capture Leads", detail: "Landing pages and forms that feed your CRM automatically" },
      { step: "Nurture", detail: "Automated email sequences personalized to each lead" },
      { step: "Convert & Measure", detail: "Attribution tracking across every marketing channel" },
    ],
  },
];

export default function SolutionsPage() {
  useScrollReveal();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = solutions.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl scroll-reveal">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Solutions</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Products tailored to your industry
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Proven digital products that solve real business problems out of the box.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search solutions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-6">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((sol, i) => (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group bg-card border border-border rounded-2xl p-7 hover:border-accent/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 ease-out"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <sol.icon size={24} className="text-accent" />
                  </div>
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-[0.15em]">{sol.category}</span>
                  <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-3 group-hover:text-accent transition-colors">{sol.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{sol.description}</p>

                  <div className="space-y-2 mb-6">
                    {sol.workflow.map((w, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-accent">{j + 1}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{w.step}</span>
                          <p className="text-xs text-muted-foreground">{w.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
                    <Link to="/contact">
                      Build This <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No solutions found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
