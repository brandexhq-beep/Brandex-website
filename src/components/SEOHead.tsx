import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Brandex – Next-Gen Digital Solutions for Ambitious Brands",
    description: "Brandex empowers businesses with high-performance websites, custom applications, and automated workflows designed to accelerate growth.",
  },
  "/services": {
    title: "Services – Brandex | Web Development, Automation & Custom Apps",
    description: "End-to-end digital services including web development, business automation, custom applications, and social media management.",
  },
  "/solutions": {
    title: "Solutions – Brandex | Industry-Specific Digital Solutions",
    description: "Tailored digital solutions for restaurants, healthcare, finance, logistics and more. Built to solve real business problems.",
  },
  "/case-studies": {
    title: "Case Studies – Brandex | Real Projects, Real Results",
    description: "See how Brandex helped businesses achieve 340% order growth, 60% fewer no-shows, and 40+ hours saved weekly through digital transformation.",
  },
  "/about": {
    title: "About – Brandex | The Team Behind Your Digital Growth",
    description: "Meet the founding team at Brandex. Four co-founders driving technology, delivery, growth, and finance for modern businesses.",
  },
  "/blog": {
    title: "Blog – Brandex | Insights on Engineering, Design & Growth",
    description: "Thoughts on engineering, design, and building products that matter — straight from the Brandex team.",
  },
  "/contact": {
    title: "Contact – Brandex | Start Your Digital Project Today",
    description: "Get in touch with Brandex to discuss your project. Based in Bangalore, open worldwide. Let's build something great together.",
  },
  "/contact-us": {
    title: "Contact Us – Brandex | Merchant Information",
    description: "Official contact information for Brandex. Merchant legal entity: BRANDEXLABS. Address, telephone, and email details.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions – Brandex",
    description: "Read the Terms and Conditions governing your use of Brandex's website and services, including refund policy, jurisdiction, and liability.",
  },
};

export default function SEOHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMeta[pathname] || pageMeta["/"];
    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", meta.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", meta.description);
  }, [pathname]);

  return null;
}
