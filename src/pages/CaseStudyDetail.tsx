import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/projects";

export default function CaseStudyDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <Link to="/case-studies" className="text-accent hover:underline">Return to Case Studies</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative py-24 lg:py-32 overflow-hidden bg-primary/5">
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/case-studies" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm font-medium group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>
          
          <div className="max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">
              {project.category}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {project.description}
            </p>

            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all"
              >
                Visit Live Site <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Overview Grid */}
      <section className="py-16 border-y border-border/50 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry</p>
              <p className="font-semibold text-foreground">{project.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Timeline</p>
              <p className="font-semibold text-foreground">{project.duration || "Ongoing"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground mb-1">Services</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.services?.map(s => <span key={s} className="text-xs font-medium px-2.5 py-1 rounded bg-secondary text-foreground">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Content */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8 space-y-16">
              {/* Problem/Challenge */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">The Challenge</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.challenge} Before our intervention, the existing systems or lack thereof were creating bottlenecks and preventing scalable growth.
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">The Solution</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We architected a bespoke {project.category.toLowerCase()} solution prioritizing speed, scale, and user experience. 
                  Leveraging a modern tech stack, we built out a robust foundation that solved the immediate pain points while laying the groundwork for future expansion.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {project.features?.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-secondary/50 p-4 rounded-xl border border-border/50">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Deep Dive: Approach */}
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">Our Approach: Wireframes to Production</h3>
                <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-border">
                  <div className="relative">
                    <div className="absolute -left-[30px] w-5 h-5 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Discovery & Wireframing</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">We mapped out the user journeys and core functionality requirements, rapid-prototyping the interfaces to validate the UX assumptions early.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[30px] w-5 h-5 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Development & Integration</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Iterative build cycles using {project.tech.slice(0, 2).join(" and ")} allowed us to move fast while maintaining strict performance constraints.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[30px] w-5 h-5 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Launch & Scale</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Post-launch, we monitored analytics deeply to ensure 99.9% uptime and zero-friction transitions for users.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-card border border-border/60 rounded-2xl p-6 shadow-xl shadow-accent/5">
                <h4 className="font-display font-bold text-lg mb-4 text-foreground/90 border-b border-border/50 pb-4">Technology Stack</h4>
                <div className="flex flex-col gap-3">
                  {project.tech.map((t) => (
                    <div key={t} className="flex justify-between items-center bg-secondary/70 rounded-lg px-4 py-3 border border-border/40">
                      <span className="text-sm font-semibold">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 text-center">
                  <h4 className="font-display font-bold text-2xl text-accent mb-2">{project.result}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Primary Outcome</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-20 bg-accent text-accent-foreground text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-display text-3xl font-bold mb-6">Ready for similar results?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Start Your Project <ArrowLeft className="rotate-180" size={18} />
          </Link>
        </div>
      </section>
    </article>
  );
}
