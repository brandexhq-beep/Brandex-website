import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string | null;
  rating: number;
  published: boolean;
  sort_order: number;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing?.name || !editing?.content) { toast.error("Name and content required"); return; }
    const payload = {
      name: editing.name, role: editing.role || "", company: editing.company || "",
      content: editing.content, avatar_url: editing.avatar_url || null,
      rating: editing.rating ?? 5, published: editing.published ?? false, sort_order: editing.sort_order ?? 0,
    };
    if (editing.id) {
      const { error } = await supabase.from("testimonials").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("testimonials").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Created");
    }
    setOpen(false); setEditing(null); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast.success("Deleted"); fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Testimonials</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({ name: "", role: "", company: "", content: "", rating: 5, published: false, sort_order: 0 })} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" /> New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} Testimonial</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Name</Label><Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Company</Label><Input value={editing.company || ""} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Role</Label><Input value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Avatar URL</Label><Input value={editing.avatar_url || ""} onChange={(e) => setEditing({ ...editing, avatar_url: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>Content</Label><Textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={4} /></div>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((n) => (
                        <button key={n} type="button" onClick={() => setEditing({ ...editing, rating: n })}>
                          <Star className={`w-5 h-5 ${n <= (editing.rating ?? 5) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2"><Switch checked={editing.published ?? false} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
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
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Company</TableHead><TableHead>Rating</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No testimonials yet</TableCell></TableRow>
            ) : items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.company}</TableCell>
                <TableCell><div className="flex">{Array.from({length: item.rating}).map((_,i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div></TableCell>
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
