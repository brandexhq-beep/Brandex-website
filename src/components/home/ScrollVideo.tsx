import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const rafRef = useRef<number>(0);
  const targetTimeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress to reduce jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  const opacity = useTransform(smoothProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.92, 1, 1, 0.96]);
  const borderRadius = useTransform(smoothProgress, [0, 0.1], [40, 16]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setVideoDuration(video.duration);
      setIsVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    if (video.readyState >= 1) handleLoaded();

    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  // Use RAF loop for smoother video seeking
  useEffect(() => {
    if (!isVideoReady || !videoDuration) return;

    let currentTime = 0;

    const unsubscribe = smoothProgress.on("change", (progress) => {
      targetTimeRef.current = progress * videoDuration;
    });

    const tick = () => {
      const video = videoRef.current;
      if (video) {
        const target = targetTimeRef.current;
        // Lerp for buttery smooth seeking
        currentTime += (target - currentTime) * 0.12;
        if (Math.abs(currentTime - target) > 0.01 && isFinite(currentTime)) {
          video.currentTime = currentTime;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress, videoDuration, isVideoReady]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [1, 0, 0, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section label */}
          <motion.div className="text-center mb-8" style={{ opacity }}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-3">Our Vision</p>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-[1.1]">
              Where digital meets <span className="text-gradient">reality</span>
            </h2>
          </motion.div>

          {/* Video container */}
          <motion.div
            className="relative max-w-5xl mx-auto overflow-hidden shadow-2xl shadow-accent/[0.08]"
            style={{ opacity, scale, borderRadius }}
          >
            {/* Gradient border glow */}
            <div className="absolute -inset-px rounded-[inherit] bg-gradient-to-br from-accent/20 via-transparent to-[hsl(var(--gradient-end)/0.2)] pointer-events-none z-10" />

            <video
              ref={videoRef}
              src="/hero-video.mp4"
              muted
              playsInline
              preload="auto"
              className="w-full aspect-video object-cover rounded-[inherit]"
              style={{ willChange: "contents" }}
            />

            {/* Overlay vignette */}
            <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-t from-background/30 via-transparent to-background/10 z-10" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center mt-8 gap-2"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
