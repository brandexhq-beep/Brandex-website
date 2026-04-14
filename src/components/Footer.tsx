import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "Business Automation", href: "/services" },
      { label: "Custom Applications", href: "/services" },
      { label: "Social Media", href: "/services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Restaurant Ordering", href: "/solutions" },
      { label: "Appointment Booking", href: "/solutions" },
      { label: "Business Dashboards", href: "/solutions" },
      { label: "Automation Tools", href: "/solutions" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary-foreground/[0.02]" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <img src="/logo_nobg.png" alt="Brandex" className="h-8 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-110" />
              <span className="font-display text-xl font-bold tracking-tight">Brandex</span>
            </Link>
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
              Building digital solutions that power modern businesses. From concept to scale.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-xs mb-5 uppercase tracking-[0.2em] text-primary-foreground/35">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-8 border-t border-primary-foreground/[0.08] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Brandex. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/brandexlabs/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-foreground/30 hover:text-primary-foreground transition-colors duration-200">
              Instagram
            </a>
            <a href="https://x.com/brandexlabs" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-foreground/30 hover:text-primary-foreground transition-colors duration-200">
              Twitter
            </a>
            <a href="https://www.linkedin.com/company/brandexlabs/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-foreground/30 hover:text-primary-foreground transition-colors duration-200">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
