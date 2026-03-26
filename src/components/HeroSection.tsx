import Crystal3D from "./Crystal3D";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen pt-20">
          {/* Left: Text */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Research Paper — npj Computational Materials
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="gradient-text">LLM</span>
              <br />
              <span className="text-foreground">PROP</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Predicting Crystal Properties using Large Language Models.
              A T5-based transformer approach to materials science.
            </p>

            <div className="flex gap-4 pt-2">
              <Link
                to="/predict"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent-hover transition-all animate-pulse-glow"
              >
                Let's Predict
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: 3D Crystal */}
          <div className="relative h-[500px] lg:h-[600px]">
            <Crystal3D className="w-full h-full cursor-grab active:cursor-grabbing" />
          </div>
        </div>
      </div>
    </section>
  );
}
