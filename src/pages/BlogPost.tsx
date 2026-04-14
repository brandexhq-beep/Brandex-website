import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  read_time: string;
  slug: string;
  content: string;
}

const gradients = [
  "from-accent/30 via-[hsl(var(--gradient-end)/0.2)] to-accent/10",
  "from-[hsl(var(--gradient-end)/0.25)] to-accent/10",
  "from-accent/20 to-[hsl(var(--gradient-end)/0.15)]",
];

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [related, setRelated] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", id).eq("published", true).single();
      setPost(data);

      if (data) {
        const { data: rel } = await supabase.from("blog_posts").select("*").eq("published", true).neq("id", data.id).limit(2);
        setRelated(rel ?? []);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (loading) {
    return (
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-3xl space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-96 w-full mt-8" />
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent hover:underline">← Back to blog</Link>
        </div>
      </section>
    );
  }

  // Parse content: split by double newlines into blocks, handle ## headings
  const contentBlocks = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <section className="pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-8" />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[0]} opacity-30`} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
              <ArrowLeft size={14} /> Back to blog
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-0"><Tag size={12} className="mr-1" />{post.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock size={14} /> {post.read_time}</span>
              <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-3xl leading-[1.1]">{post.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-6">
          <motion.article className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {contentBlocks.map((block, i) => {
                if (block.startsWith("## ")) {
                  return <h2 key={i} className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-12 mb-4">{block.replace("## ", "")}</h2>;
                }
                return <p key={i} className="text-muted-foreground leading-[1.8] mb-5 text-[16px]">{block}</p>;
              })}
            </div>

            <div className="mt-16 pt-8 border-t border-border/60">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Enjoyed this article?</p>
                  <p className="text-foreground font-medium">Share it with someone who'd find it useful.</p>
                </div>
                <Button variant="outline" className="border-border/60 hover:border-accent/30 hover:bg-accent/5"
                  onClick={() => { navigator.share ? navigator.share({ title: post.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href); }}>
                  <Share2 size={14} className="mr-2" /> Share Article
                </Button>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">More from the blog</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link key={r.id} to={`/blog/${r.slug}`}
                      className="group bg-card border border-border/60 rounded-xl p-5 hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs mb-3">{r.category}</Badge>
                      <h4 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors leading-snug mb-2">{r.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </section>
    </>
  );
}
