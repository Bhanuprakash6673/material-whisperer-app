import { Zap, Brain, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Predictions",
    desc: "Get crystal property predictions in seconds using optimized transformer inference.",
  },
  {
    icon: Brain,
    title: "AI-driven Insights",
    desc: "Leverage T5 language model fine-tuned on materials data for accurate predictions.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "Process single inputs or batch datasets — built for research-scale workloads.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Capabilities</p>
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-heading tracking-tight">Features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-xl p-8 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{f.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
