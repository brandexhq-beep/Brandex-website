import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { sanitizeInput } from "@/lib/sanitize";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  company: z.string().trim().max(100, "Company name is too long").optional(),
  budget: z.string().optional(),
  description: z.string().trim().min(10, "Please describe your project (at least 10 characters)").max(5000, "Description is too long"),
});

export default function ContactPage() {
  useScrollReveal();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      // 1. Save to Supabase (Database) - This is our most reliable data store.
      const { error: dbError } = await supabase.from("contact_inquiries").insert({
        name: sanitizeInput(result.data.name),
        email: result.data.email.trim(),
        company: sanitizeInput(result.data.company || ""),
        budget: result.data.budget || "",
        description: sanitizeInput(result.data.description),
      });

      if (dbError) throw dbError;

      // Clear form and notify user
      toast({ title: "Inquiry sent!", description: "We've received your project details and will be in touch shortly." });
      setFormData({ name: "", email: "", company: "", budget: "", description: "" });
    } catch (err) {
      console.error("Submission error:", err);
      toast({ 
        title: "Database connection busy", 
        description: "Please try again or email us directly at brandexhq@gmail.com", 
        variant: "destructive" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (field: string) => errors[field] ? <p className="text-xs text-destructive mt-1">{errors[field]}</p> : null;

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 scroll-reveal">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Contact</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6">Let's build something great</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">Tell us about your project and we'll get back to you within 24 hours.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 scroll-reveal">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))} />
                  {fieldError("name")}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your company" value={formData.company} onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))} />
                  {fieldError("company")}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" required value={formData.email} onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))} />
                {fieldError("email")}
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(v) => setFormData((d) => ({ ...d, budget: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select a budget range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5k-10k">$5,000 – $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 – $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 – $50,000</SelectItem>
                    <SelectItem value="50k+">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" placeholder="Tell us about your project, goals, and timeline…" rows={6} required value={formData.description} onChange={(e) => setFormData((d) => ({ ...d, description: e.target.value }))} />
                {fieldError("description")}
              </div>
              <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8" disabled={submitting}>
                {submitting ? "Sending…" : "Send Inquiry"} <ArrowRight size={16} className="ml-1" />
              </Button>
            </form>
          </div>

          <div className="scroll-reveal scroll-reveal-delay-2 space-y-8">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">Get in touch</h3>
              <div className="space-y-4">
                <a href="mailto:brandexhq@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Mail size={18} /><span className="text-sm">brandexhq@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={18} /><span className="text-sm">Bangalore, India · Open worldwide</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">Follow us</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/brandexlabs/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">Instagram</a>
                <a href="https://x.com/brandexlabs" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">Twitter</a>
                <a href="https://www.linkedin.com/company/brandexlabs/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">LinkedIn</a>
              </div>
            </div>
            <div className="p-6 bg-secondary/50 rounded-xl">
              <h4 className="font-display font-semibold text-foreground mb-2">Not sure where to start?</h4>
              <p className="text-sm text-muted-foreground">No worries — just tell us your biggest challenge and we'll help you figure out the right solution.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
