import { FlaskConical } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 md:ml-16">
    <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <FlaskConical className="w-4 h-4 text-primary" />
        <span className="font-heading text-sm">Crystalline Property Predictor</span>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        Predicting crystalline material properties using large language models.
      </p>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          GitHub
        </a>
        <a href="mailto:contact@crystalline.dev" className="hover:text-foreground transition-colors">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
