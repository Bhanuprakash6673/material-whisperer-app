import { useEffect, useRef, useState } from "react";
import CrystalSVG from "./CrystalSVG";
import Particles from "./Particles";
import { Flask, FileText } from "lucide-react";

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !ref.current) return;
    let current = 0;
    const step = target / 55;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        ref.current!.textContent = target + suffix;
        clearInterval(timer);
      } else {
        ref.current!.textContent = Math.floor(current) + suffix;
      }
    }, 22);
    return () => clearInterval(timer);
  }, [visible, target, suffix]);

  return (
    <div className="px-7 py-4 text-center border-r border-gray last:border-r-0">
      <div ref={ref} className="text-[1.65rem] font-extrabold text-primary leading-none">0</div>
      <div className="text-[0.73rem] text-[#718096] mt-[3px] font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-36 pb-24" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f4f8fb 100%)" }}>
      {/* Blob */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] animate-blob-float z-[1]"
        style={{ background: "linear-gradient(45deg, rgba(87,196,229,0.1) 0%, rgba(26,95,122,0.06) 100%)", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
      />
      <Particles />

      <div className="w-[90%] max-w-[1200px] mx-auto relative">
        <div className="flex items-center justify-between gap-16 flex-col-reverse lg:flex-row">
          {/* Text */}
          <div className="flex-1 z-[2] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/[0.08] border border-primary/20 rounded-full px-3.5 py-[5px] text-[11.5px] font-semibold text-primary tracking-wider mb-5">
              <div className="w-[7px] h-[7px] bg-accent rounded-full animate-pulse-dot" />
              npj Computational Materials · Princeton 2025
            </div>

            <h1 className="text-[2rem] md:text-[3.3rem] font-extrabold leading-[1.15] mb-5 text-foreground">
              Predicting <span className="text-primary highlight-underline">Crystal Properties</span> with Transformer AI
            </h1>

            <p className="text-[1.1rem] mb-8 text-muted-foreground font-normal leading-[1.75]">
              Discover how our fine-tuned <span className="gradient-text">T5 language model</span> predicts band gap, volume, formation energy and more from crystal text descriptions — faster and smarter than graph-based GNNs.
            </p>

            <div className="flex gap-4 mt-7 flex-wrap justify-center lg:justify-start">
              <a href="#predictor" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[6px] font-semibold text-base bg-accent text-white shadow-[0_4px_18px_rgba(255,122,89,0.28)] hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,122,89,0.38)] transition-all">
                <Flask className="w-4 h-4" /> Try the Predictor
              </a>
              <a href="https://arxiv.org/abs/2310.14029" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[6px] font-semibold text-base bg-white text-primary border-2 border-primary hover:bg-gray-light hover:-translate-y-[2px] transition-all">
                <FileText className="w-4 h-4" /> Read the Paper
              </a>
            </div>

            <div className="flex mt-11 bg-white border border-gray rounded-[10px] shadow-card overflow-hidden w-fit mx-auto lg:mx-0 flex-wrap">
              <StatItem target={125} suffix="K+" label="Crystals" />
              <StatItem target={37} suffix="M" label="Parameters" />
              <div className="px-7 py-4 text-center border-r border-gray">
                <div className="text-[1.65rem] font-extrabold text-primary leading-none">&lt;1s</div>
                <div className="text-[0.73rem] text-[#718096] mt-[3px] font-medium uppercase tracking-wider">Prediction Speed</div>
              </div>
              <StatItem target={65} suffix="%" label="Better vs GNNs" />
            </div>
          </div>

          {/* Visual */}
          <div className="flex-1 z-[2] flex justify-center items-center">
            <CrystalSVG />
          </div>
        </div>
      </div>
    </section>
  );
}
