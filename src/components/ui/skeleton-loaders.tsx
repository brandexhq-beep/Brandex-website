export function SkeletonCard() {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-7 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-secondary mb-6" />
      <div className="h-4 bg-secondary rounded-full w-2/3 mb-3" />
      <div className="h-3 bg-secondary/70 rounded-full w-full mb-2" />
      <div className="h-3 bg-secondary/70 rounded-full w-4/5" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="py-24 lg:py-32 animate-pulse">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="h-3 bg-secondary rounded-full w-32 mb-6" />
          <div className="h-10 bg-secondary rounded-xl w-full mb-4" />
          <div className="h-10 bg-secondary rounded-xl w-3/4 mb-8" />
          <div className="h-5 bg-secondary/70 rounded-full w-2/3 mb-3" />
          <div className="h-5 bg-secondary/70 rounded-full w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonImage() {
  return (
    <div className="aspect-video bg-secondary rounded-xl animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent shimmer-slide" />
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
