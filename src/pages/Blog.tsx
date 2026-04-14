import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Search, Clock, ArrowRight, Tag, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const categories = ["All", "Engineering", "Design", "Business", "Case Study", "Tutorial"];

const gradients = [
  "from-accent/30 via-[hsl(var(--gradient-end)/0.2)] to-accent/10",
  "from-[hsl(var(--gradient-end)/0.25)] to-accent/10",
  "from-accent/20 to-[hsl(var(--gradient-end)/0.15)]",
  "from-accent/15 to-accent/5",
  "from-[hsl(var(--gradient-end)/0.2)] to-accent/15",
  "from-accent/25 to-accent/5",
];

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  read_time: string;
  slug: string;
  content: string;
}

export default function Blog() {
  useScrollReveal();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = posts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-4">Blog</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6">Insights & ideas</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thoughts on engineering, design, and building products that matter — straight from the Brandex team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <motion.div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? "bg-accent text-accent-foreground shadow-md shadow-accent/20" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"}`}
                >{cat}</button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-6">
            <Skeleton className="h-64 rounded-2xl mb-8" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          {featured && (
            <section className="pb-12">
              <div className="container mx-auto px-6">
                <Link to={`/blog/${featured.slug}`}>
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer">
                    <div className="grid lg:grid-cols-2">
                      <div className={`aspect-[16/10] lg:aspect-auto bg-gradient-to-br ${gradients[0]} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="absolute inset-8 flex items-center justify-center">
                          <div className="text-center">
                            <TrendingUp size={48} className="text-accent/40 mx-auto mb-3" />
                            <p className="text-accent/60 font-display font-semibold text-sm">Featured Article</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-0"><Tag size={12} className="mr-1" />{featured.category}</Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock size={14} /> {featured.read_time}</span>
                        </div>
                        <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">{featured.title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{formatDate(featured.created_at)}</span>
                          <span className="text-accent font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read article <ArrowRight size={14} /></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </section>
          )}

          {/* Posts Grid */}
          <section className="pb-20 lg:pb-28">
            <div className="container mx-auto px-6">
              {rest.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i }}
                        className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out group cursor-pointer h-full">
                        <div className={`aspect-[16/9] bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-grid opacity-15" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">Read Article</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs">{post.category}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {post.read_time}</span>
                          </div>
                          <h3 className="font-display font-semibold text-lg text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{formatDate(post.created_at)}</span>
                            <span className="text-accent text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight size={12} /></span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
