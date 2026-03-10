import SectionHeader from "./SectionHeader";
import Particles from "./Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { emoji: "📄", num: 1, title: "Enter Description", desc: "Paste a natural language crystal description or upload a CIF file. The system accepts Robocrystallographer-format text or chemical formulas." },
  { emoji: "🔧", num: 2, title: "Text Preprocessing", desc: "Bond distances → [NUM] tokens, angles → [ANG]. Stopwords removed. [CLS] token prepended. Text normalised for T5 tokeniser input." },
  { emoji: "🤖", num: 3, title: "T5 Encoder", desc: "Fine-tuned T5-small encoder (6 layers, 37M params) extracts structural and chemical relationships from the crystal text representation." },
  { emoji: "📊", num: 4, title: "Property Prediction", desc: "Linear prediction head outputs band gap (eV), volume (ų), formation energy, stability, and Metal / Semiconductor / Insulator classification." },
  { emoji: "🌐", num: 5, title: "Results Delivered", desc: "Predictions rendered instantly in the web interface with confidence scores, classification labels, and downloadable results for research use." },
];

export default function HowItWorksSection() {
  const ref = useScrollAnimation();

  return (
    <section id="how-it-works" className="py-28 bg-white relative overflow-hidden" ref={ref}>
      <Particles />
      <div className="w-[90%] max-w-[1200px] mx-auto relative z-[2]">
        <SectionHeader
          tag="The Process"
          title="How"
          titleHighlight="CrystalPS Works"
          subtitle="Our streamlined pipeline converts crystal descriptions into property predictions in milliseconds."
        />

        <div className="flex flex-col lg:flex-row justify-between relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[30px] left-0 w-full h-[3px] bg-gradient-to-r from-secondary to-primary z-[1]" />

          {steps.map((s) => (
            <div key={s.num} className="scroll-animate flex-1 text-center px-5 relative mb-10 lg:mb-0">
              <div className="w-[58px] h-[58px] bg-primary text-white rounded-full flex flex-col items-center justify-center text-[1.2rem] font-bold mx-auto mb-5 relative z-[2] shadow-[0_5px_18px_rgba(26,95,122,0.3)] hover:scale-110 hover:-translate-y-1 transition-transform">
                <span className="text-[0.8rem] leading-none">{s.emoji}</span>
                {s.num}
              </div>
              <h3 className="text-[1.05rem] font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-[0.88rem] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
