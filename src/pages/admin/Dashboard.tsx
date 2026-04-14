import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Briefcase, MessageSquare, Users, Inbox } from "lucide-react";

export default function Dashboard() {
  const [counts, setCounts] = useState({ posts: 0, cases: 0, testimonials: 0, team: 0, inquiries: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [posts, cases, testimonials, team, inquiries] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("case_studies").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        posts: posts.count ?? 0,
        cases: cases.count ?? 0,
        testimonials: testimonials.count ?? 0,
        team: team.count ?? 0,
        inquiries: inquiries.count ?? 0,
      });
    };
    fetchCounts();
  }, []);

  const cards = [
    { label: "Inquiries", count: counts.inquiries, icon: Inbox, color: "text-rose-500" },
    { label: "Blog Posts", count: counts.posts, icon: FileText, color: "text-blue-500" },
    { label: "Case Studies", count: counts.cases, icon: Briefcase, color: "text-emerald-500" },
    { label: "Testimonials", count: counts.testimonials, icon: MessageSquare, color: "text-amber-500" },
    { label: "Team Members", count: counts.team, icon: Users, color: "text-violet-500" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className="font-display text-3xl font-bold text-foreground">{c.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
