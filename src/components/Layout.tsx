import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import PageLoader from "./PageLoader";
import ScrollToTop from "./ScrollToTop";
import SEOHead from "./SEOHead";
import WhatsAppWidget from "./WhatsAppWidget";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col has-custom-cursor">
      <SEOHead />
      <PageLoader />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-[4.25rem]">{children}</main>
      <WhatsAppWidget />
      <Footer />
    </div>
  );
}
