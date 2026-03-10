import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CTASection() {
  const ref = useScrollAnimation();

  return (
    <section className="py-28 bg-[rgb(51,49,49)] text-white text-center relative overflow-hidden" ref={ref}>
      <div className="absolute w-[320px] h-[320px] rounded-full bg-white/[0.04] -top-40 -left-20 animate-float-slow" />
      <div className="absolute w-[220px] h-[220px] rounded-full bg-white/[0.04] -bottom-[110px] right-[8%] animate-float-slow-reverse" />

      <div className="w-[90%] max-w-[1200px] mx-auto relative z-[2]">
        <h2 className="scroll-animate text-[2.4rem] font-bold mb-5">Ready to Predict Crystal Properties?</h2>
        <p className="scroll-animate text-[1.1rem] mb-10 max-w-[560px] mx-auto">
          Join researchers using CrystalPS to screen thousands of materials instantly —
          powered by Princeton's LLM-Prop research.
        </p>
        <a
          href="#predictor"
          className="scroll-animate inline-block bg-white text-primary px-10 py-4 text-[1.05rem] font-bold rounded-[6px] shadow-[0_10px_28px_rgba(0,0,0,0.18)] hover:bg-accent hover:text-white hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition-all"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
}
