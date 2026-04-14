import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  period: string;
  features: string[];
  popular: boolean;
  sort_order: number;
}

export default function AdminPricing() {
  const [items, setItems] = useState<PricingPlan[]>([]);
  const [editing, setEditing] = useState<Partial<PricingPlan> | null>(null);
  const [featuresText, setFeaturesText] = useState("");
  const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("pricing_plans").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleEdit = (item: PricingPlan) => {
    setEditing(item);
    setFeaturesText(item.features.join("\n"));
    setOpen(true);
  };

  const handleNew = () => {
    setEditing({ name: "", description: "", price_monthly: "0", price_yearly: "0", period: "project", features: [], popular: false, sort_order: 0 });
    setFeaturesText("");
    setOpen(true);
  };

  const handleSave = async () => {
    if (!editing?.name) { toast.error("Name is required"); return; }
    const features = featuresText.split("\n").map(f => f.trim()).filter(Boolean);
    const payload = {
      name: editing.name, description: editing.description || "",
      price_monthly: editing.price_monthly || "0", price_yearly: editing.price_yearly || "0",
      period: editing.period || "project", features, popular: editing.popular ?? false,
      sort_order: editing.sort_order ?? 0, updated_at: new Date().toISOString(),
    };
    if (editing.id) {
      const { error } = await supabase.from("pricing_plans").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("pricing_plans").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Created");
    }
    setOpen(false); setEditing(null); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("pricing_plans").delete().eq("id", id);
    toast.success("Deleted"); fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Pricing Plans</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" /> New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} Plan</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Name</Label><Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Period</Label><Input value={editing.period || ""} onChange={(e) => setEditing({ ...editing, period: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>Description</Label><Input value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Monthly Price</Label><Input value={editing.price_monthly || ""} onChange={(e) => setEditing({ ...editing, price_monthly: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Yearly Price</Label><Input value={editing.price_yearly || ""} onChange={(e) => setEditing({ ...editing, price_yearly: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>Features (one per line)</Label><Textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={6} /></div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2"><Switch checked={editing.popular ?? false} onCheckedChange={(v) => setEditing({ ...editing, popular: v })} /><Label className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Popular</Label></div>
                  <div className="space-y-2 flex-1"><Label>Sort Order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => { setOpen(false); setEditing(null); }}>Cancel</Button>
                  <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">Save</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Monthly</TableHead><TableHead>Yearly</TableHead><TableHead>Popular</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No plans yet</TableCell></TableRow>
            ) : items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>${item.price_monthly}</TableCell>
                <TableCell>${item.price_yearly}</TableCell>
                <TableCell>{item.popular && <Sparkles className="w-4 h-4 text-accent" />}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
