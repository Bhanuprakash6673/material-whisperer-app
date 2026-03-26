import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PredictBackground from "@/components/PredictBackground";
import { Upload, FileText, MessageCircle, X, Send, FlaskConical, Copy, Check } from "lucide-react";

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
  const [mode, setMode] = useState<"text" | "cif">("text");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-20">
        <PredictBackground />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Predict Properties</h1>
          <p className="text-gray-500 mb-8">Enter a crystal description or upload a CIF file.</p>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("text")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "text" ? "bg-blue-600 text-white" : "bg-white/70 text-gray-600 hover:text-gray-900 border border-gray-200"
              }`}
            >
              <FileText className="w-4 h-4" /> Text Description
            </button>
            <button
              onClick={() => setMode("cif")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "cif" ? "bg-blue-600 text-white" : "bg-white/70 text-gray-600 hover:text-gray-900 border border-gray-200"
              }`}
            >
              <Upload className="w-4 h-4" /> Upload CIF
            </button>
          </div>

          {/* Input area */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-blue-100 shadow-sm">
            {mode === "text" ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the crystalline material…"
                className="w-full h-40 bg-blue-50/50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none font-mono"
              />
            ) : (
              <div className="border-2 border-dashed border-blue-200 rounded-lg p-10 text-center bg-blue-50/30">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500 mb-3">Drop a CIF file or click to browse</p>
                <input type="file" accept=".cif" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="cif-upload" />
                <label htmlFor="cif-upload" className="inline-flex px-4 py-2 bg-white text-gray-700 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors text-sm border border-gray-200">
                  Choose File
                </label>
                {file && <p className="mt-3 text-sm text-blue-600">{file.name}</p>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handlePredict}
              disabled={loading || (mode === "text" ? !input.trim() : !file)}
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              className="px-4 py-3 bg-white/80 text-gray-700 rounded-lg hover:bg-white transition-colors flex items-center gap-2 text-sm border border-gray-200"
            >
              <MessageCircle className="w-4 h-4" /> Don't know description?
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 animate-fade-in-up border border-blue-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Predicted Properties</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-500 font-medium">Property</th>
                    <th className="text-left py-2 text-gray-500 font-medium">Value</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.property} className="border-b border-gray-100">
                      <td className="py-3 text-gray-800">{r.property}</td>
                      <td className="py-3 text-blue-600 font-mono">{r.value}</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.confidence * 100}%` }} />
                          </div>
                          <span className="text-gray-400 text-xs">{(r.confidence * 100).toFixed(0)}%</span>
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
        <div className="fixed top-0 right-0 w-full md:w-96 h-full z-50 bg-white border-l border-gray-200 flex flex-col shadow-xl animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-sm">Crystal Description Helper</h3>
            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
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

          <div className="p-4 border-t border-gray-200 flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Enter formula (e.g. NaCl)"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handleChat} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
