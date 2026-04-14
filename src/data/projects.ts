export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  result: string;
  challenge: string;
  mockup: "ordering" | "dashboard" | "learning" | "mobile" | "booking" | "automation";
  url?: string;
  duration?: string;
  services?: string[];
  features?: string[];
}

export const projects: ProjectData[] = [
  {
    id: "srushti-publications",
    title: "Srushti Publications",
    category: "Web",
    description: "Complete E-commerce platform for Kannada books featuring advanced searching, guest checkout, Razorpay payment processing, and an admin dashboard.",
    tech: ["Next.js 15", "PostgreSQL", "Prisma", "Razorpay"],
    result: "Complete E-Commerce",
    challenge: "Needed a modern, high-performance platform to sell regional books efficiently with instant transactions.",
    mockup: "ordering",
    url: "https://www.srushtipublications.com",
    duration: "6 Weeks",
    services: ["UI/UX Design", "Custom Web Development", "Payment Integration", "Admin Dashboard"],
    features: ["Guest Checkout", "Grid/List Catalog views", "Razorpay UPI/Cards", "Automated Invoicing"],
  },
  {
    id: "propquant-ai",
    title: "PropQuant.ai",
    category: "Automation",
    description: "Automated AI-driven trading platform integrated with MT5. Executing high-precision, emotion-free trading strategies focused on scaling funded accounts.",
    tech: ["Python", "MT5 APIs", "Next.js", "AI Architecture"],
    result: "Precision Trading",
    challenge: "Human emotion caused inconsistent trading results; needed a highly reliable, completely automated AI solution.",
    mockup: "dashboard",
    url: "https://www.propquant.ai/",
    duration: "10 Weeks",
    services: ["Algorithmic Trading System", "API Integration", "Web Dashboard"],
    features: ["Real-time execution", "Emotion-free scaling", "MT5 direct sync"],
  },
  {
    id: "geniusphere",
    title: "GeniuSphere",
    category: "Application",
    description: "Robust Learning Management System featuring real-time 3D lab simulations, an integrated CMS, and a granular student progress tracking module.",
    tech: ["Next.js", "React Three Fiber", "Node.js", "MongoDB"],
    result: "Interactive 3D Labs",
    challenge: "Standard LMS solutions lacked immersive engagement and interactive simulations necessary for modern learning.",
    mockup: "learning",
    url: "https://geniusphere.vercel.app/",
    duration: "12 Weeks",
    services: ["Custom LMS Development", "3D WebGL Experiences", "Backend CMS"],
    features: ["Interactive 3D WebGL", "Student Progress Tracking", "Course Management"],
  },
  {
    id: "macroly",
    title: "Macroly",
    category: "Mobile",
    description: "AI-powered comprehensive health application to track macros, build muscle, and personalize holistic health regimens through intelligent insights.",
    tech: ["Next.js 15", "Firebase", "Zustand", "Tailwind CSS"],
    result: "Holistic Health",
    challenge: "Users needed an adaptive, personalized lifestyle and fitness tracker instead of generic plan generators.",
    mockup: "mobile",
    url: "https://macroly-v1.vercel.app/",
    duration: "8 Weeks",
    services: ["Mobile-first PWA", "Firebase Auth & DB", "Health Algorithm Design"],
    features: ["Macro Tracking", "Intelligent Analytics", "Progress Synchronization"],
  },
];
