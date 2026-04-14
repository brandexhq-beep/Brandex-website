import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Inbox, Clock, Mail, Building2, DollarSign, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  description: string;
  created_at: string;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInquiries = async () => {
    const { data } = await supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false });
    setInquiries(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Could not delete inquiry.", variant: "destructive" });
    } else {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      toast({ title: "Deleted", description: "Inquiry removed." });
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const budgetLabels: Record<string, string> = {
    "5k-10k": "$5K – $10K",
    "10k-25k": "$10K – $25K",
    "25k-50k": "$25K – $50K",
    "50k+": "$50K+",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Contact Inquiries</h1>
        <Badge variant="secondary" className="text-sm">{inquiries.length} total</Badge>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No inquiries yet. They'll show up here when someone submits the contact form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-card border border-border rounded-xl p-6 hover:border-accent/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-display font-semibold text-foreground">{inq.name}</h3>
                    {inq.budget && (
                      <Badge variant="outline" className="text-xs">
                        <DollarSign size={10} className="mr-1" />
                        {budgetLabels[inq.budget] || inq.budget}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
                    <span className="flex items-center gap-1"><Mail size={13} /> {inq.email}</span>
                    {inq.company && <span className="flex items-center gap-1"><Building2 size={13} /> {inq.company}</span>}
                    <span className="flex items-center gap-1"><Clock size={13} /> {formatDate(inq.created_at)}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{inq.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${inq.email}?subject=Re: Your inquiry to Brandex`}>Reply</a>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(inq.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
