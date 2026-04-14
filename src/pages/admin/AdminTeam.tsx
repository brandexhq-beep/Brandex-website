import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string | null;
  initials: string;
  linkedin: string;
  instagram: string;
  sort_order: number;
}

export default function AdminTeam() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async () => {
    if (!editing?.name) { toast.error("Name is required"); return; }
    const payload = {
      name: editing.name, role: editing.role || "", bio: editing.bio || "",
      avatar_url: editing.avatar_url || null, initials: editing.initials || editing.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
      linkedin: editing.linkedin || "", instagram: editing.instagram || "",
      sort_order: editing.sort_order ?? 0, updated_at: new Date().toISOString(),
    };
    if (editing.id) {
      const { error } = await supabase.from("team_members").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("team_members").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Created");
    }
    setOpen(false); setEditing(null); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    toast.success("Deleted"); fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Team Members</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({ name: "", role: "", bio: "", initials: "", linkedin: "", instagram: "", sort_order: 0 })} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" /> New Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} Team Member</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Name</Label><Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Role / Title</Label><Input value={editing.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Initials</Label><Input value={editing.initials || ""} onChange={(e) => setEditing({ ...editing, initials: e.target.value })} maxLength={3} /></div>
                  <div className="space-y-2"><Label>Avatar URL</Label><Input value={editing.avatar_url || ""} onChange={(e) => setEditing({ ...editing, avatar_url: e.target.value })} placeholder="https://..." /></div>
                </div>
                <div className="space-y-2"><Label>Bio</Label><Textarea value={editing.bio || ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} rows={3} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>LinkedIn URL</Label><Input value={editing.linkedin || ""} onChange={(e) => setEditing({ ...editing, linkedin: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Instagram URL</Label><Input value={editing.instagram || ""} onChange={(e) => setEditing({ ...editing, instagram: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} /></div>
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
          <TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">No team members yet</TableCell></TableRow>
            ) : items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {item.avatar_url ? (
                      <img src={item.avatar_url} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">{item.initials}</div>
                    )}
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.role}</TableCell>
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
