import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  results: string;
  category: string;
  image_url: string | null;
  published: boolean;
  sort_order: number;
}

export default function AdminCaseStudies() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<Partial<CaseStudy> | null>(null);
  const [open, setOpen] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from("case_studies").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!editing?.title) { toast.error("Title is required"); return; }
    const payload = {
      title: editing.title, client: editing.client || "", description: editing.description || "",
      results: editing.results || "", category: editing.category || "Web Development",
      image_url: editing.image_url || null, published: editing.published ?? false,
      sort_order: editing.sort_order ?? 0, updated_at: new Date().toISOString(),
    };
    if (editing.id) {
      const { error } = await supabase.from("case_studies").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("case_studies").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Created");
    }
    setOpen(false); setEditing(null); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("case_studies").delete().eq("id", id);
    toast.success("Deleted"); fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Case Studies</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({ title: "", client: "", description: "", results: "", category: "Web Development", published: false, sort_order: 0 })} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" /> New Case Study
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} Case Study</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Title</Label><Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Client</Label><Input value={editing.client || ""} onChange={(e) => setEditing({ ...editing, client: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Category</Label><Input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Image URL</Label><Input value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} /></div>
                <div className="space-y-2"><Label>Results</Label><Textarea value={editing.results || ""} onChange={(e) => setEditing({ ...editing, results: e.target.value })} rows={3} /></div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2"><Switch checked={editing.published ?? false} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
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
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Client</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No case studies yet</TableCell></TableRow>
            ) : items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-muted-foreground">{item.client}</TableCell>
                <TableCell><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${item.published ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{item.published ? "Published" : "Draft"}</span></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
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
