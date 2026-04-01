import { Github } from "lucide-react";

const team = ["Asif", "Vinay Paul", "Sri Ram", "Bhanu Prakash", "Krishna Bajaj"];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-bold mb-2 font-heading">
              <span className="gradient-text">LLM</span> PROP
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-body">
              Predicting crystalline material properties using large language models.
              Based on T5 transformer architecture.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Team G1143
            </h4>
            <ul className="space-y-1.5">
              {team.map((name) => (
                <li key={name} className="text-sm text-muted-foreground">{name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              References
            </h4>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-xs text-muted-foreground">
          © 2025 LLM-Prop · Crystal Property Prediction
        </div>
      </div>
    </footer>
  );
}
