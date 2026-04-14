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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

const emptyPost: Omit<BlogPost, "id" | "created_at"> = {
  title: "", slug: "", excerpt: "", content: "", category: "Technology", author: "Brandex Team", read_time: "5 min read", published: false,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [open, setOpen] = useState(false);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) { toast.error("Title and slug are required"); return; }
    
    if (editing.id) {
      const { error } = await supabase.from("blog_posts").update({
        title: editing.title, slug: editing.slug, excerpt: editing.excerpt || "",
        content: editing.content || "", category: editing.category || "General",
        author: editing.author || "Brandex Team", read_time: editing.read_time || "5 min read",
        published: editing.published ?? false, updated_at: new Date().toISOString(),
      }).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Post updated");
    } else {
      const { error } = await supabase.from("blog_posts").insert({
        title: editing.title, slug: editing.slug, excerpt: editing.excerpt || "",
        content: editing.content || "", category: editing.category || "General",
        author: editing.author || "Brandex Team", read_time: editing.read_time || "5 min read",
        published: editing.published ?? false,
      });
      if (error) { toast.error(error.message); return; }
      toast.success("Post created");
    }
    setOpen(false);
    setEditing(null);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Blog Posts</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({ ...emptyPost })} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing?.id ? "Edit Post" : "New Post"}</DialogTitle>
            </DialogHeader>
            {editing && (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Author</Label>
                    <Input value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time</Label>
                    <Input value={editing.read_time || ""} onChange={(e) => setEditing({ ...editing, read_time: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Content (Markdown)</Label>
                  <Textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={10} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.published ?? false} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                  <Label>Published</Label>
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
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No posts yet</TableCell></TableRow>
            ) : posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="text-muted-foreground">{post.category}</TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${post.published ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(post); setOpen(true); }}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
