import { Atom, Github, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#12121a] text-white pt-20 pb-8">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <a href="#hero" className="text-[1.4rem] font-bold text-[#ecf0f1] inline-flex items-center gap-2 mb-4">
              <span className="text-accent"><Atom className="w-5 h-5" /></span>
              CRYSTALPS
            </a>
            <p className="text-[#a0aec0] text-[0.9rem] leading-[1.7] mb-5">
              CrystalPS predicts crystal properties from text using a fine-tuned T5 transformer —
              making materials screening fast, accessible, and accurate for researchers worldwide.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/vertaix/LLM-Prop" target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] bg-white/[0.08] rounded-full flex items-center justify-center text-white hover:bg-accent hover:-translate-y-[3px] transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://arxiv.org/abs/2310.14029" target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] bg-white/[0.08] rounded-full flex items-center justify-center text-white hover:bg-accent hover:-translate-y-[3px] transition-all">
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-5">Product</h3>
            <ul className="space-y-3">
              {["Features", "How It Works", "Try Predictor", "Results"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors relative group">
                    {l}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-5">Research</h3>
            <ul className="space-y-3">
              <li><a href="https://arxiv.org/abs/2310.14029" target="_blank" rel="noopener noreferrer" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">LLM-Prop Paper</a></li>
              <li><a href="https://github.com/vertaix/LLM-Prop" target="_blank" rel="noopener noreferrer" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="https://materialsproject.org/" target="_blank" rel="noopener noreferrer" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">Materials Project</a></li>
              <li><a href="https://jarvis.nist.gov/" target="_blank" rel="noopener noreferrer" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">JARVIS Dataset</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-5">Team</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">About Us</a></li>
              <li><a href="#about" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">VNRVJIET 2025</a></li>
              <li><a href="https://huggingface.co/t5-small" target="_blank" rel="noopener noreferrer" className="text-[#a0aec0] text-[0.9rem] hover:text-white transition-colors">T5 on HuggingFace</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-7 text-center text-[#a0aec0] text-[0.85rem]">
          <p>
            © 2025 CrystalPS Team · VNRVJIET Internship Project ·
            Based on <a href="https://arxiv.org/abs/2310.14029" className="text-secondary hover:text-white transition-colors">LLM-Prop</a>
            — Princeton University · npj Computational Materials (2025)
          </p>
        </div>
      </div>
    </footer>
  );
}
