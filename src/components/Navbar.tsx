import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "T&C", href: "/terms-and-conditions" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30 supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex items-center justify-between h-[4.25rem] px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo_nobg.webp" alt="Brandex" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">Brandex</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`relative text-[13px] font-medium tracking-wide transition-colors hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent after:transition-transform after:duration-300 after:origin-left after:rounded-full ${
                pathname === l.href
                  ? "text-foreground after:w-full after:scale-x-100"
                  : "text-muted-foreground after:w-full after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-border/60 mx-1" />
          <ThemeToggle />
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/15 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 h-9 px-5">
            <Link to="/contact">Start a Project</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="text-foreground p-1" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30 px-6 overflow-hidden"
          >
            <div className="pb-6 pt-2 space-y-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={l.href}
                    className={`block text-base font-medium py-2.5 transition-colors ${pathname === l.href ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="pt-3"
              >
                <Button asChild className="w-full bg-accent text-accent-foreground shadow-md shadow-accent/15">
                  <Link to="/contact" onClick={() => setOpen(false)}>Start a Project</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
