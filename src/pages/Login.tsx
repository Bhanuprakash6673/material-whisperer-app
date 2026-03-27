import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Crystal3D from "@/components/Crystal3D";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — no backend
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background crystal */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Crystal3D className="w-full h-full" interactive={false} />
      </div>

      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="glass-card rounded-xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-bold">
              <span className="gradient-text">LLM</span> <span className="text-foreground">PROP</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent-hover transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
