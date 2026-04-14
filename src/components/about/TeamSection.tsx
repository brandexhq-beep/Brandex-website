import { useEffect, useState } from "react";
import { Linkedin, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  linkedin: string | null;
  instagram: string | null;
}

export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("team_members").select("*").order("sort_order")
      .then(({ data }) => {
        let members: TeamMember[] = data ?? [];
        
        // Remove Shashank and former team members
        members = members.filter(m => {
          const n = m.name.toLowerCase().replace(/\s+/g, "");
          return !n.includes("shashank") && !n.includes("sriharsha");
        });
        
        // Ensure Sathvik Nagesh is Founder and CTO
        const sathvikIndex = members.findIndex(m => m.name.toLowerCase().includes("sathvik"));
        if (sathvikIndex !== -1) {
          members[sathvikIndex].role = "Founder & CTO";
        } else {
          // Fallback if not in database
          members.unshift({
            name: "Sathvik Nagesh",
            role: "Founder & CTO",
            bio: "Leading technology, engineering, and product vision at Brandex.",
            initials: "SN",
            linkedin: null,
            instagram: null,
          });
        }
        
        setTeam(members);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 scroll-reveal">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">Founding Team</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">The people behind Brandex</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">Three co-founders, each owning a critical pillar of the business — tech, delivery, and growth.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 space-y-4 w-full lg:w-[300px]">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))
            : team.map((member, i) => (
                <div
                  key={member.name}
                  className={`scroll-reveal scroll-reveal-delay-${i + 1} group bg-card border border-border rounded-xl p-6 hover:border-accent/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out w-full lg:w-[320px]`}
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <span className="text-lg font-bold text-accent">{member.initials}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-accent mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Instagram size={16} /></a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin size={16} /></a>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
