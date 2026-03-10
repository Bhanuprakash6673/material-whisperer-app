import SectionHeader from "./SectionHeader";
import Particles from "./Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle } from "lucide-react";

export default function UseCasesSection() {
  const ref = useScrollAnimation();

  return (
    <section id="use-cases" className="py-28 bg-muted relative overflow-hidden" ref={ref}>
      <Particles />
      <div className="w-[90%] max-w-[1200px] mx-auto relative z-[2]">
        <SectionHeader
          tag="Applications"
          title="Transforming"
          titleHighlight="Industries"
          subtitle="See how CrystalPS accelerates materials discovery across critical sectors."
        />

        {/* Battery */}
        <div className="scroll-animate from-left flex flex-col lg:flex-row gap-12 items-center mt-16">
          <div className="flex-1 rounded-lg overflow-hidden shadow-card">
            <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <linearGradient id="uc1grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a5f7a" stopOpacity=".08" />
                  <stop offset="100%" stopColor="#57c4e5" stopOpacity=".22" />
                </linearGradient>
              </defs>
              <rect width="420" height="300" fill="url(#uc1grad)" rx="12" />
              <rect x="120" y="60" width="180" height="180" rx="14" fill="white" stroke="#1a5f7a" strokeWidth="2.5" />
              <rect x="175" y="44" width="70" height="20" rx="5" fill="#1a5f7a" />
              <rect x="130" y="70" width="160" height="50" rx="6" fill="rgba(87,196,229,.15)" stroke="#57c4e5" strokeWidth="1.5" />
              <rect x="132" y="72" width="120" height="46" rx="5" fill="rgba(87,196,229,.3)" />
              <rect x="130" y="135" width="160" height="50" rx="6" fill="rgba(26,95,122,.1)" stroke="#1a5f7a" strokeWidth="1.5" />
              <rect x="132" y="137" width="80" height="46" rx="5" fill="rgba(26,95,122,.25)" />
              <rect x="130" y="200" width="160" height="30" rx="6" fill="rgba(255,122,89,.1)" stroke="#ff7a59" strokeWidth="1.5" />
              <rect x="132" y="202" width="140" height="26" rx="5" fill="rgba(255,122,89,.22)" />
              <text x="210" y="100" textAnchor="middle" fill="#1a5f7a" fontSize="11" fontWeight="700" fontFamily="Inter">Band Gap: 1.2 eV</text>
              <text x="210" y="165" textAnchor="middle" fill="#1a5f7a" fontSize="11" fontWeight="700" fontFamily="Inter">Volume: 62.4 ų</text>
              <text x="210" y="219" textAnchor="middle" fill="#ff7a59" fontSize="11" fontWeight="700" fontFamily="Inter">Semiconductor ✓</text>
              <circle cx="80" cy="150" r="8" fill="#ff7a59" opacity=".6" />
              <circle cx="340" cy="150" r="8" fill="#57c4e5" opacity=".6" />
              <line x1="80" y1="150" x2="120" y2="150" stroke="#ff7a59" strokeWidth="1.5" opacity=".4" />
              <line x1="340" y1="150" x2="300" y2="150" stroke="#57c4e5" strokeWidth="1.5" opacity=".4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[1.8rem] font-bold text-foreground mb-5 relative inline-block">
              Battery & Energy Materials
              <span className="absolute -bottom-1 left-0 w-12 h-[3px] bg-accent" />
            </h3>
            <ul className="mb-7 space-y-3">
              {[
                "Screen thousands of electrode materials for next-gen EV batteries in seconds instead of weeks",
                "Predict formation energy and stability of solid-state electrolyte candidates instantly",
                "Identify semiconductor band gaps critical for solar cell efficiency optimisation",
              ].map((t) => (
                <li key={t} className="flex items-start text-muted-foreground text-[0.95rem]">
                  <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <a href="#predictor" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[6px] font-semibold bg-accent text-white shadow-[0_4px_18px_rgba(255,122,89,0.28)] hover:bg-accent-hover hover:-translate-y-[2px] transition-all">
              Try for Battery Materials
            </a>
          </div>
        </div>

        {/* Semiconductor */}
        <div className="scroll-animate from-right flex flex-col lg:flex-row-reverse gap-12 items-center mt-20">
          <div className="flex-1 rounded-lg overflow-hidden shadow-card">
            <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <linearGradient id="uc2grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#57c4e5" stopOpacity=".12" />
                  <stop offset="100%" stopColor="#1a5f7a" stopOpacity=".08" />
                </linearGradient>
              </defs>
              <rect width="420" height="300" fill="url(#uc2grad)" rx="12" />
              <rect x="130" y="80" width="160" height="140" rx="8" fill="white" stroke="#1a5f7a" strokeWidth="2" />
              <g fill="#1a5f7a" opacity=".55">
                {[110,135,160,185].map(y => [160,190,220,250,270].map(x => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r={x === 220 && y === 160 ? 8 : 5} fill={x === 220 && y === 160 ? "#ff7a59" : "#1a5f7a"} opacity={x === 220 && y === 160 ? ".9" : ".55"} />
                )))}
              </g>
              <g stroke="#57c4e5" strokeWidth="1" opacity=".4">
                {[110,135,160,185].map(y => <line key={`h${y}`} x1="160" y1={y} x2="270" y2={y} />)}
                {[160,190,220,250,270].map(x => <line key={`v${x}`} x1={x} y1="110" x2={x} y2="185" />)}
              </g>
              <text x="210" y="240" textAnchor="middle" fill="#1a5f7a" fontSize="11" fontWeight="700" fontFamily="Inter">Silicon — 1.12 eV Band Gap</text>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[1.8rem] font-bold text-foreground mb-5 relative inline-block">
              Semiconductor Research
              <span className="absolute -bottom-1 left-0 w-12 h-[3px] bg-accent" />
            </h3>
            <ul className="mb-7 space-y-3">
              {[
                "Instantly classify materials as metals, semiconductors, or insulators for chip design",
                "Predict direct vs indirect band gap to evaluate optical emission properties",
                "Accelerate discovery of wide-bandgap semiconductors like GaN and SiC alternatives",
              ].map((t) => (
                <li key={t} className="flex items-start text-muted-foreground text-[0.95rem]">
                  <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <a href="#predictor" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[6px] font-semibold bg-accent text-white shadow-[0_4px_18px_rgba(255,122,89,0.28)] hover:bg-accent-hover hover:-translate-y-[2px] transition-all">
              Explore Semiconductor Use
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
