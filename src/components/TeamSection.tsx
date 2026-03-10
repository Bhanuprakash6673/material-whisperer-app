import SectionHeader from "./SectionHeader";
import Particles from "./Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const team = [
  {
    quote: "Building CrystalPS taught us that natural language is a surprisingly powerful lens for materials science. T5 captures crystal symmetry better than any graph we built.",
    avatar: "💻",
    name: "24P81A66A2",
    role: "Frontend Developer — React, Tailwind, UI/UX",
  },
  {
    quote: "Connecting the fine-tuned T5 model to a live web interface was the most rewarding challenge. Seeing predictions in under 1 second felt like magic.",
    avatar: "⚙️",
    name: "24P81A66A9",
    role: "Backend Developer — Node.js, FastAPI, MongoDB",
  },
  {
    quote: "Fine-tuning T5 on JARVIS crystal descriptions showed how much symmetry information text naturally encodes — something GNNs simply cannot capture.",
    avatar: "🤖",
    name: "24P81A6673 · 24P81A66C2 · 24P81A66A0",
    role: "ML Engineering · Data & Evaluation · Deployment",
  },
];

export default function TeamSection() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-28 bg-muted relative overflow-hidden" ref={ref}>
      <Particles />
      <div className="w-[90%] max-w-[1200px] mx-auto relative z-[2]">
        <SectionHeader
          tag="Our Team"
          title="Meet the"
          titleHighlight="CrystalPS Team"
          subtitle="2nd year engineering students implementing LLM-Prop as an internship project — VNRVJIET 2025."
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-16">
          {team.map((t) => (
            <div key={t.name} className="scroll-animate scale-in flex-1 bg-white rounded-lg p-8 shadow-card relative">
              <span className="absolute top-4 left-5 text-[5rem] text-secondary/10 font-serif leading-none z-0">"</span>
              <p className="text-base leading-[1.7] mb-6 text-muted-foreground relative z-[1]">"{t.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-3.5 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[1.2rem] shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-[0.95rem] mb-0.5">{t.name}</h4>
                  <p className="text-[0.82rem] text-[#718096]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
