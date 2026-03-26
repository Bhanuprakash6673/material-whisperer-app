import { useEffect, useRef, useState } from "react";

const steps = [
  { num: "01", title: "Crystal Input", desc: "Text description or CIF file" },
  { num: "02", title: "Text Generation", desc: "Structured description creation" },
  { num: "03", title: "Preprocessing", desc: "[NUM], [ANG], stopwords removal" },
  { num: "04", title: "T5 Encoder", desc: "Transformer-based encoding" },
  { num: "05", title: "Prediction", desc: "Property value output" },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, i]);
            }, i * 300);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Pipeline</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
        </div>

        {/* Desktop horizontal pipeline */}
        <div className="hidden md:flex items-start justify-between relative">
          <div className="absolute top-10 left-[10%] right-[10%] h-px bg-border" />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col items-center text-center w-1/5 relative transition-all duration-700 ${
                visibleSteps.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-20 h-20 rounded-full border-2 border-primary bg-card flex items-center justify-center mb-4 relative z-10">
                <span className="text-primary font-mono font-bold text-sm">{step.num}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[140px]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex items-start gap-4 transition-all duration-700 ${
                visibleSteps.includes(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="w-14 h-14 rounded-full border-2 border-primary bg-card flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-mono font-bold text-xs">{step.num}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
