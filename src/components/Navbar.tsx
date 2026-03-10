import { useState, useEffect } from "react";
import { Atom, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#performance", label: "Results" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[1000] transition-all ${scrolled ? "bg-[rgb(51,49,49)] shadow-lg" : "bg-[rgb(51,49,49)]"}`}>
        <div className="w-[90%] max-w-[1200px] mx-auto flex justify-between items-center py-5">
          <a href="#hero" className="flex items-center font-bold text-[1.45rem] text-[#f5f5f5] hover:scale-[1.04] transition-transform">
            <span className="mr-2 text-accent text-[1.3rem]"><Atom className="w-6 h-6" /></span>
            CRYSTALPS
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center">
            {navLinks.map((l) => (
              <li key={l.href} className="ml-8">
                <a href={l.href} className="text-[#f0f0f0] font-medium text-[0.95rem] hover:text-accent transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="ml-8">
              <a href="#predictor" className="bg-accent text-white px-5 py-2 rounded-[5px] font-semibold hover:bg-accent-hover transition-colors">
                Try Predictor
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-[#f5f5f5] text-2xl bg-transparent border-none cursor-pointer">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed top-0 right-0 w-[78%] max-w-[300px] h-screen bg-white z-[1001] transition-transform shadow-[-5px_0_20px_rgba(0,0,0,0.1)] p-8 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-foreground text-2xl bg-transparent border-none cursor-pointer">
          <X className="w-6 h-6" />
        </button>
        <ul className="mt-12">
          {navLinks.map((l) => (
            <li key={l.href} className="mb-5">
              <a href={l.href} onClick={() => setMobileOpen(false)} className="text-foreground font-medium text-[1.1rem] block py-1 hover:text-accent transition-colors">
                {l.label}
              </a>
            </li>
          ))}
          <li className="mb-5">
            <a href="#predictor" onClick={() => setMobileOpen(false)} className="text-foreground font-medium text-[1.1rem] block py-1 hover:text-accent transition-colors">
              Try Predictor
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/45 z-[1000]" />
      )}
    </>
  );
}
