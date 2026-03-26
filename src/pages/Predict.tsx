import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Crystal3D from "@/components/Crystal3D";
import { Upload, FileText, MessageCircle, X, Send, FlaskConical } from "lucide-react";

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

export default function Predict() {
  const [mode, setMode] = useState<"text" | "cif">("text");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<typeof dummyResults | null>(null);
  const [loading, setLoading] = useState(false);

  // Chat
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-20">
        {/* Background crystal */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Crystal3D className="w-full h-full" interactive={false} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-2">Predict Properties</h1>
          <p className="text-muted-foreground mb-8">Enter a crystal description or upload a CIF file.</p>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "text" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4" /> Text Description
            </button>
            <button
              onClick={() => setMode("cif")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "cif" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="w-4 h-4" /> Upload CIF
            </button>
          </div>

          {/* Input area */}
          <div className="glass-card rounded-xl p-6 mb-6">
            {mode === "text" ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the crystalline material…"
                className="w-full h-40 bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono"
              />
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-10 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">Drop a CIF file or click to browse</p>
                <input
                  type="file"
                  accept=".cif"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="cif-upload"
                />
                <label
                  htmlFor="cif-upload"
                  className="inline-flex px-4 py-2 bg-muted text-foreground rounded-lg cursor-pointer hover:bg-border transition-colors text-sm"
                >
                  Choose File
                </label>
                {file && <p className="mt-3 text-sm text-primary">{file.name}</p>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handlePredict}
              disabled={loading || (mode === "text" ? !input.trim() : !file)}
              className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <FlaskConical className="w-4 h-4" /> Predict
                </>
              )}
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-border transition-colors flex items-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Don't know description?
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="glass-card rounded-xl p-6 animate-fade-in-up">
              <h2 className="text-lg font-semibold text-foreground mb-4">Predicted Properties</h2>
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

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full z-50 bg-card border-l border-border flex flex-col animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm">Crystal Description Helper</h3>
            <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Enter formula (e.g. NaCl)"
              className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={handleChat} className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent-hover">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
