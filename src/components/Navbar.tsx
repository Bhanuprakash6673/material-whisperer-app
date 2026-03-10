import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FlaskConical, Home, Info, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Predict", auth: true },
  { to: "/about", icon: Info, label: "About" },
];

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: vertical left rail */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-16 hover:w-48 transition-all duration-200 bg-card border-r border-border z-50 flex-col items-start py-8 group overflow-hidden">
        <div className="flex items-center gap-3 px-4 mb-12">
          <FlaskConical className="w-6 h-6 text-primary shrink-0" />
          <span className="font-heading text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Crystalline
          </span>
        </div>

        <div className="flex flex-col gap-2 w-full flex-1">
          {navItems.map((item) => {
            if (item.auth && !isLoggedIn) return null;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  active ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-heading text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="w-full mt-auto">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="font-heading text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Logout
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                location.pathname === "/login" ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <LogIn className="w-5 h-5 shrink-0" />
              <span className="font-heading text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Login
              </span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile: top bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          <span className="font-heading text-sm">Crystalline</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground p-2">
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-px bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block h-px bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 bg-card border-b border-border z-40 py-2">
          {navItems.map((item) => {
            if (item.auth && !isLoggedIn) return null;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-heading text-sm">{item.label}</span>
              </Link>
            );
          })}
          {isLoggedIn ? (
            <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground w-full">
              <LogOut className="w-5 h-5" />
              <span className="font-heading text-sm">Logout</span>
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground">
              <LogIn className="w-5 h-5" />
              <span className="font-heading text-sm">Login</span>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
