import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/#features", label: "Features" },
  { to: "/#demo", label: "Demo" },
  { to: "/predict", label: "Predict" },
  { to: "/login", label: "Login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (to: string) => {
    setOpen(false);
    if (to.includes("#")) {
      const hash = to.split("#")[1];
      if (location.pathname === "/") {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-wider">
            <span className="gradient-text">LLM</span>
            <span className="text-foreground ml-1">PROP</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => handleNav(l.to)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  l.to === "/login"
                    ? "glass-btn-primary ml-2"
                    : "text-muted-foreground hover:text-foreground glass-btn"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setOpen(true)} className="md:hidden text-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-card border-l border-border p-6 animate-fade-in">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-foreground">
              <X className="w-6 h-6" />
            </button>
            <div className="mt-12 flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => handleNav(l.to)}
                  className="px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
