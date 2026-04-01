import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, MessageCircle, X, Send, FlaskConical, Copy, Check, Clipboard } from "lucide-react";

const dummyResults = [
  { property: "Band Gap", value: "1.82 eV", confidence: 0.91 },
  { property: "Volume", value: "42.3 ų", confidence: 0.87 },
  { property: "Formation Energy", value: "-1.12 eV/atom", confidence: 0.89 },
  { property: "Density", value: "3.21 g/cm³", confidence: 0.84 },
];

const chatResponses: Record<string, string> = {
  nacl: "Sodium chloride (NaCl) crystallizes in a rock salt structure (Fm-3m) with a face-centered cubic lattice. Lattice parameter a = 5.64 Å. Each Na+ is surrounded by 6 Cl- ions.",
  sio2: "Silicon dioxide (SiO2) forms a tetrahedral network. In its α-quartz polymorph, it has a trigonal crystal system (P3₂21) with a = 4.91 Å, c = 5.40 Å.",
  tio2: "Titanium dioxide (TiO2) in rutile structure has tetragonal symmetry (P4₂/mnm) with a = 4.59 Å, c = 2.96 Å. Each Ti is coordinated by 6 oxygen atoms.",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-blue-200/30 transition-colors inline-flex items-center"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600/60" />}
    </button>
  );
}

export default function Predict() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<typeof dummyResults | null>(null);
  const [loading, setLoading] = useState(false);
  

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Enter a chemical formula (e.g. NaCl) and I'll provide its crystal description." },
  ]);

  const handlePredict = () => {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(dummyResults);
      setLoading(false);
    }, 2000);
  };

  const handleChat = () => {
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: q }]);
    setChatInput("");
    setTimeout(() => {
      const key = q.toLowerCase().replace(/\s/g, "");
      const reply = chatResponses[key] || `Crystal description for "${q}": A crystalline material with formula ${q}, exhibiting periodic atomic arrangement. Detailed structural parameters would require database lookup.`;
      setChatMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 800);
  };

  const handleAddToClipboard = async () => {
    const lastBotMsg = [...chatMessages].reverse().find((m) => m.role === "bot");
    if (lastBotMsg) {
      setInput(lastBotMsg.text);
      await navigator.clipboard.writeText(lastBotMsg.text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-20">
        {/* Cream gradient background */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-background via-muted/40 to-background" />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.1),transparent_50%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">Predict Properties</h1>
          <p className="text-muted-foreground mb-8 font-body">Enter a crystal description to predict properties.</p>

          {/* Input area - text only */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the crystalline material…"
              className="w-full h-40 bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handlePredict}
              disabled={loading || !input.trim()}
              className="flex-1 py-3 glass-btn-primary font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FlaskConical className="w-4 h-4" /> Predict
                </>
              )}
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="px-4 py-3 glass-btn rounded-lg flex items-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Don't know description?
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="glass-card rounded-xl p-6 animate-fade-in-up">
              <h2 className="text-lg font-semibold text-foreground mb-4 font-heading">Predicted Properties</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Property</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Value</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.property} className="border-b border-border/50">
                      <td className="py-3 text-foreground">{r.property}</td>
                      <td className="py-3 text-primary font-mono">{r.value}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${r.confidence * 100}%` }} />
                          </div>
                          <span className="text-muted-foreground text-xs">{(r.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Chat panel - small rectangle top right */}
      {chatOpen && (
        <div className="fixed top-20 right-4 w-80 h-96 z-50 glass-card rounded-xl flex flex-col shadow-xl animate-fade-in overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <h3 className="font-semibold text-foreground text-xs">Crystal Helper</h3>
            <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-2.5 py-1.5 rounded-lg text-xs ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  {m.text}
                  {m.role === "bot" && i > 0 && (
                    <div className="flex justify-end mt-1">
                      <CopyButton text={m.text} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border space-y-2">
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChat()}
                placeholder="Enter formula (e.g. NaCl)"
                className="flex-1 bg-muted border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button onClick={handleChat} className="p-1.5 glass-btn-primary rounded-lg">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={handleAddToClipboard}
              className="w-full py-1.5 glass-btn rounded-lg flex items-center justify-center gap-1.5 text-xs"
            >
              <Clipboard className="w-3 h-3" /> Add to Clipboard
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
