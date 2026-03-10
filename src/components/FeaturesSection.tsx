import { Brain, Zap, TrendingUp, FileText, Shield, Globe } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Particles from "./Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  { icon: Brain, title: "T5 Transformer Encoder", desc: "Fine-tuned T5-small model (37M parameters) trained on 125K+ crystal descriptions from JARVIS and Materials Project datasets for accurate property regression." },
  { icon: Zap, title: "Real-Time Predictions", desc: "Predict band gap, volume, formation energy and semiconductor classification in under 1 second — 1000× faster than DFT simulations." },
  { icon: TrendingUp, title: "Outperforms GNNs", desc: "Achieves +8% better band gap accuracy and +65% better volume accuracy compared to state-of-the-art graph neural networks like ALIGNN and CGCNN." },
  { icon: FileText, title: "Text-Based Input", desc: "Accepts natural language crystal descriptions (Robocrystallographer format) or CIF files. No graph construction needed — just paste and predict." },
  { icon: Shield, title: "Confidence Scoring", desc: "Every prediction includes a confidence score and classification into Metal, Semiconductor, or Insulator — giving researchers reliable, interpretable outputs." },
  { icon: Globe, title: "Live Web Interface", desc: "Full MERN stack web application with React frontend, Node.js + Python backend, publicly deployed for researchers, students, and materials scientists worldwide." },
];

export default function FeaturesSection() {
  const ref = useScrollAnimation();

  return (
    <section id="features" className="py-28 bg-muted relative overflow-hidden" ref={ref}>
      <Particles />
      <div className="w-[90%] max-w-[1200px] mx-auto relative z-[2]">
        <SectionHeader
          tag="Core Capabilities"
          title="Transformative"
          titleHighlight="Features"
          subtitle="Our platform combines a fine-tuned T5 transformer with materials science to deliver unprecedented crystal property prediction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {features.map((f) => (
            <div key={f.title} className="scroll-animate bg-white rounded-lg p-8 shadow-card hover:-translate-y-2 hover:shadow-card-hover transition-all group">
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-5 text-primary text-2xl relative overflow-hidden">
                <f.icon className="w-6 h-6" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full skew-x-[-25deg] group-hover:translate-x-full transition-transform duration-500" />
              </div>
              <h3 className="text-[1.15rem] font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative molecules */}
      <svg className="absolute top-[10%] left-[3%] z-0 pointer-events-none animate-float-mol" width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="9" fill="#1a5f7a" opacity=".35" />
        <circle cx="72" cy="30" r="7" fill="#1a5f7a" opacity=".3" />
        <circle cx="72" cy="62" r="7" fill="#ff7a59" opacity=".3" />
        <line x1="45" y1="45" x2="72" y2="30" stroke="#1a5f7a" strokeWidth="2.5" opacity=".3" />
        <line x1="45" y1="45" x2="72" y2="62" stroke="#1a5f7a" strokeWidth="2.5" opacity=".3" />
        <line x1="72" y1="30" x2="72" y2="62" stroke="#1a5f7a" strokeWidth="2.5" opacity=".3" />
      </svg>
      <svg className="absolute top-[50%] right-[2%] z-0 pointer-events-none animate-float-mol-reverse" width="80" height="80" viewBox="0 0 80 80">
        <polygon points="40,8 68,26 68,58 40,76 12,58 12,26" stroke="#1a5f7a" fill="none" strokeWidth="2.5" opacity=".28" />
        <circle cx="40" cy="8" r="5" fill="#ff7a59" opacity=".35" />
        <circle cx="68" cy="26" r="5" fill="#1a5f7a" opacity=".28" />
        <circle cx="68" cy="58" r="5" fill="#1a5f7a" opacity=".28" />
        <circle cx="40" cy="76" r="5" fill="#1a5f7a" opacity=".28" />
        <circle cx="12" cy="58" r="5" fill="#1a5f7a" opacity=".28" />
        <circle cx="12" cy="26" r="5" fill="#1a5f7a" opacity=".28" />
      </svg>
    </section>
  );
}
