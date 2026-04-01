import { useState } from "react";
import Crystal3D from "./Crystal3D";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D Crystal as full background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Crystal3D className="w-full h-full" interactive={false} forceHover={hovered} />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-white/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pointer-events-none">
        <div className="flex flex-col items-start justify-center min-h-screen pt-20">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-7xl md:text-9xl font-extrabold leading-[1.05] tracking-tight font-heading">
              <span className="gradient-text">LLM</span>
              <br />
              <span className="text-foreground">PROP</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed font-body">
              Predicting Crystal Properties using Large Language Models.
              A T5-based transformer approach to materials science.
            </p>

            <div className="flex gap-4 pt-2 pointer-events-auto">
              <Link
                to="/predict"
                className="inline-flex items-center gap-2 px-6 py-3 glass-btn-primary font-semibold rounded-lg transition-all animate-pulse-glow"
              >
                Let's Predict
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
