import { Github } from "lucide-react";

const team = ["Asif", "Vinay Paul", "Sri Ram", "Bhanu Prakash", "Krishna Bajaj"];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div>
            <h3 className="text-3xl font-black mb-4 font-heading tracking-tight">
              <span className="gradient-text">LLM</span>{" "}
              <span className="text-foreground">PROP</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Predicting crystalline material properties using large language models.
              Based on T5 transformer architecture.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-foreground mb-5 uppercase tracking-widest font-heading">
              Team G1143
            </h4>
            <ul className="space-y-2">
              {team.map((name) => (
                <li key={name} className="text-base text-muted-foreground font-body font-medium">{name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-foreground mb-5 uppercase tracking-widest font-heading">
              References
            </h4>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors font-body font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-14 pt-8 text-center text-sm text-muted-foreground font-body">
          © 2025 LLM-Prop · Crystal Property Prediction
        </div>
      </div>
    </footer>
  );
}
