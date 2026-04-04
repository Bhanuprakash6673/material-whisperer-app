import { useState } from "react";
import { FlaskConical } from "lucide-react";

const dummyResults = [
  { property: "Band Gap", value: "2.1 eV", confidence: 0.92 },
  { property: "Volume", value: "40 ų", confidence: 0.88 },
  { property: "Formation Energy", value: "-1.34 eV/atom", confidence: 0.85 },
];

export default function DemoSection() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<typeof dummyResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(dummyResults);
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Try It</p>
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-heading tracking-tight">Quick Demo</h2>
        </div>

        <div className="glass-card rounded-xl p-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a crystal description… e.g. SiO2 cubic structure with lattice constant 5.43 Å"
            className="w-full h-32 bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono"
          />

          <button
            onClick={handlePredict}
            disabled={loading || !input.trim()}
            className="mt-4 w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <FlaskConical className="w-4 h-4" />
                Predict
              </>
            )}
          </button>

          {results && (
            <div className="mt-6 animate-fade-in-up">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Property</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Predicted Value</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.property} className="border-b border-border/50">
                      <td className="py-3 text-foreground font-medium">{r.property}</td>
                      <td className="py-3 text-primary font-mono">{r.value}</td>
                      <td className="py-3 text-right">
                        <span className="text-muted-foreground">{(r.confidence * 100).toFixed(0)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
