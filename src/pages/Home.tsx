import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Cpu, BarChart3 } from "lucide-react";

const steps = [
  { num: "01", icon: FileText, title: "Input", desc: "Describe a crystal structure or upload a CSV dataset" },
  { num: "02", icon: Cpu, title: "Predict", desc: "Run inference through the LLM prediction pipeline" },
  { num: "03", icon: BarChart3, title: "Analyze", desc: "View predicted properties with confidence scores" },
];

const features = [
  "Band gap prediction",
  "Thermal conductivity estimation",
  "Density calculation",
  "Stability scoring",
  "Multi-material batch processing",
  "CSV & text input support",
];

const Home = () => {
  return (
    <div className="md:ml-16">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <p className="font-heading text-sm text-primary mb-4 tracking-widest uppercase">
            Material Science × Machine Learning
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            Crystalline Property<br />Predictor
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Predict physical and electronic properties of crystalline materials using large language models. Input a structure description or dataset and receive quantitative predictions with confidence intervals.
          </p>
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button variant="hero">
                Start Prediction <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold mb-12">Workflow</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="border border-border p-6 group hover:border-primary/40 transition-colors">
                <span className="font-heading text-xs text-muted-foreground">{s.num}</span>
                <s.icon className="w-6 h-6 text-primary mt-4 mb-3" />
                <h3 className="font-heading text-lg font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold mb-12">Supported Predictions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f} className="border border-border px-4 py-3 text-sm font-heading text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
