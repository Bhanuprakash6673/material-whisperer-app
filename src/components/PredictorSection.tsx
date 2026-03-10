import { useState, useRef, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { FlaskConical } from "lucide-react";

const EX: Record<string, string> = {
  nacl: `NaCl crystallizes in the cubic Pm-3m space group (space group #221). Na is bonded to eight equivalent Cl atoms to form edge-sharing NaCl8 cuboctahedra. The Na-Cl bond length is 2.80 Å. Cl is bonded to eight equivalent Na atoms. The lattice parameter a = 5.60 Å. The structure exhibits full octahedral symmetry.`,
  tio2: `TiO2 crystallizes in the tetragonal P42/mnm space group (rutile, #136). Ti is bonded to six O atoms to form TiO6 octahedra. Ti-O bond lengths: 1.95 Å equatorial, 1.98 Å apical. O is bonded to three Ti atoms in trigonal planar arrangement. Lattice: a = 4.59 Å, c = 2.96 Å.`,
  si: `Si crystallizes in the cubic Fd-3m space group (diamond cubic, #227). Each Si is bonded to four equivalent Si atoms tetrahedrally. The Si-Si bond length is 2.35 Å. Two interpenetrating FCC lattices offset by (1/4, 1/4, 1/4). Lattice parameter a = 5.43 Å.`,
  caf2: `CaF2 crystallizes in the cubic Fm-3m space group (fluorite, #225). Ca is bonded to eight F atoms forming CaF8 cuboctahedra. The Ca-F bond length = 2.36 Å. F is bonded to four Ca atoms tetrahedrally. Lattice a = 5.46 Å. Strong ionic bonding with full cubic symmetry.`,
};

const PRED: Record<string, { bg: number; vol: number; fe: number; bt: string; conf: number[]; cls: string }> = {
  nacl: { bg: 8.97, vol: 175.2, fe: -3.14, bt: "Indirect", conf: [92, 88, 85, 91], cls: "i" },
  tio2: { bg: 3.02, vol: 62.4, fe: -9.68, bt: "Indirect", conf: [89, 90, 87, 88], cls: "s" },
  si: { bg: 1.11, vol: 40.9, fe: 0.00, bt: "Indirect", conf: [95, 92, 90, 94], cls: "s" },
  caf2: { bg: 11.8, vol: 163.4, fe: -7.38, bt: "Direct", conf: [90, 86, 88, 89], cls: "i" },
};

type PredData = typeof PRED.nacl;

function detectKey(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes("nacl") || t.includes("sodium chloride")) return "nacl";
  if (t.includes("tio2") || t.includes("rutile") || t.includes("titanium")) return "tio2";
  if (t.includes(" si ") || t.includes("silicon") || t.includes("fd-3m")) return "si";
  if (t.includes("caf2") || t.includes("fluorite") || t.includes("calcium")) return "caf2";
  return null;
}

function generateRandom(): PredData {
  const cls = ["m", "s", "i"][Math.floor(Math.random() * 3)];
  return {
    bg: parseFloat((Math.random() * 4 + 0.5).toFixed(2)),
    vol: parseFloat((Math.random() * 180 + 30).toFixed(1)),
    fe: parseFloat(-(Math.random() * 8).toFixed(2)),
    bt: Math.random() > 0.5 ? "Direct" : "Indirect",
    conf: [
      Math.floor(Math.random() * 15 + 70),
      Math.floor(Math.random() * 15 + 70),
      Math.floor(Math.random() * 15 + 65),
      Math.floor(Math.random() * 15 + 68),
    ],
    cls,
  };
}

function AnimatedValue({ target, id }: { target: number; id: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const t = parseFloat(String(target));
    let i = 0;
    const STEPS = 45;
    const timer = setInterval(() => {
      i++;
      const v = t * (i / STEPS);
      ref.current!.textContent = Math.abs(v) < 10 ? v.toFixed(2) : v.toFixed(1);
      if (i >= STEPS) {
        ref.current!.textContent = String(target);
        clearInterval(timer);
      }
    }, 28);
    return () => clearInterval(timer);
  }, [target]);
  return <span ref={ref} id={id}>—</span>;
}

export default function PredictorSection() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "results">("idle");
  const [data, setData] = useState<PredData | null>(null);
  const [confWidths, setConfWidths] = useState([0, 0, 0, 0]);

  const predict = () => {
    if (!input.trim()) {
      alert("Please enter a crystal description first.");
      return;
    }
    setState("loading");
    setTimeout(() => {
      const key = detectKey(input);
      const d = key ? PRED[key] : generateRandom();
      setData(d);
      setState("results");
      setTimeout(() => setConfWidths(d.conf), 200);
    }, 1800);
  };

  const fillEx = (key: string) => {
    setInput(EX[key]);
  };

  return (
    <section id="predictor" className="py-28 bg-muted">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <SectionHeader
          tag="Live Demo"
          title=""
          titleHighlight="Crystal Property Predictor"
          subtitle="Enter any crystal description and get instant AI-powered property predictions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {/* Input Panel */}
          <div className="bg-white rounded-[14px] p-8 shadow-card">
            <h3 className="text-[1.15rem] font-bold text-foreground mb-1">Crystal Description</h3>
            <p className="text-[0.88rem] text-[#718096] mb-5">Paste text or choose an example below</p>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full min-h-[190px] bg-muted border-[1.5px] border-gray rounded-[10px] px-3.5 py-3 font-mono text-xs leading-[1.7] text-foreground resize-y outline-none focus:border-primary transition-colors"
              placeholder={"Enter crystal description here...\n\ne.g. NaCl crystallizes in the cubic Pm-3m space group. Na is bonded to eight equivalent Cl atoms. The Na–Cl bond length is 2.80 Å..."}
            />

            <p className="text-[0.78rem] text-[#a0aec0] mt-2 mb-1.5">Quick examples:</p>
            <div className="flex gap-2 flex-wrap mb-5">
              {[
                { key: "nacl", label: "NaCl" },
                { key: "tio2", label: "TiO₂" },
                { key: "si", label: "Silicon" },
                { key: "caf2", label: "CaF₂" },
              ].map((e) => (
                <button
                  key={e.key}
                  onClick={() => fillEx(e.key)}
                  className="bg-primary/[0.07] border border-primary/20 text-primary rounded-full px-3 py-[3px] text-xs font-semibold cursor-pointer hover:bg-primary/[0.15] transition-colors"
                >
                  {e.label}
                </button>
              ))}
            </div>

            <button
              onClick={predict}
              disabled={state === "loading"}
              className="w-full py-3.5 bg-accent text-white border-none rounded-[10px] text-base font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-accent-hover hover:-translate-y-[1px] transition-all disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none"
            >
              <FlaskConical className="w-4 h-4" /> Predict Properties
            </button>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-[14px] p-8 shadow-card">
            <div className="flex items-center gap-2.5 mb-4">
              <div className={`w-[9px] h-[9px] rounded-full transition-colors ${state === "loading" ? "bg-[#f59e0b]" : state === "results" ? "bg-primary" : "bg-[#d1d5db]"}`} />
              <h3 className="text-[1.15rem] font-bold text-foreground">Prediction Results</h3>
            </div>
            <p className="text-[0.88rem] text-[#718096] mb-5">Properties will appear here after prediction</p>

            {/* Idle */}
            {state === "idle" && (
              <div className="flex flex-col items-center justify-center h-[250px] gap-3.5 text-[#a0aec0] text-center">
                <div className="text-[52px] animate-float-mol">⬡</div>
                <div className="text-[0.88rem]">Enter a crystal description and click Predict</div>
              </div>
            )}

            {/* Loading */}
            {state === "loading" && (
              <div className="flex flex-col items-center justify-center h-[250px] gap-3.5">
                <div className="w-[42px] h-[42px] border-[3.5px] border-primary/10 border-t-primary rounded-full animate-spin-loader" />
                <div className="text-[0.88rem] text-[#718096]">Running T5 encoder…</div>
              </div>
            )}

            {/* Results */}
            {state === "results" && data && (
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Band Gap", val: data.bg, unit: "eV", color: "text-primary", fill: "bg-primary", ci: 0 },
                    { label: "Volume", val: data.vol, unit: "ų", color: "text-primary-light", fill: "bg-secondary", ci: 1 },
                    { label: "Formation Energy", val: data.fe, unit: "eV/atom", color: "text-[#c05621]", fill: "bg-accent", ci: 2 },
                    { label: "Band Type", val: data.bt, unit: "", color: "text-foreground", fill: "bg-[#9f7aea]", ci: 3 },
                  ].map((item) => (
                    <div key={item.label} className="bg-muted border-[1.5px] border-gray rounded-[10px] p-3.5">
                      <div className="text-[0.72rem] font-bold text-[#718096] uppercase tracking-wider mb-1.5">{item.label}</div>
                      <div className="flex items-baseline gap-1">
                        <span className={`font-extrabold leading-none ${item.label === "Band Type" ? "text-[1.3rem]" : "text-[1.7rem]"} ${item.color}`}>
                          {typeof item.val === "number" ? <AnimatedValue target={item.val} id={`v-${item.ci}`} /> : item.val}
                        </span>
                        {item.unit && <span className="text-[0.85rem] text-[#718096]">{item.unit}</span>}
                      </div>
                      <div className="h-1 bg-gray rounded-sm mt-2.5 overflow-hidden">
                        <div className={`result-fill ${item.fill}`} style={{ width: `${confWidths[item.ci]}%` }} />
                      </div>
                      <div className="text-[0.72rem] text-[#a0aec0] mt-1">Confidence: {data.conf[item.ci]}%</div>
                    </div>
                  ))}
                </div>

                {/* Classification */}
                <div className="mt-3 bg-muted border-[1.5px] border-gray rounded-[10px] p-3.5">
                  <div className="text-[0.72rem] font-bold text-[#718096] uppercase tracking-wider mb-2">Material Classification</div>
                  <div className="flex gap-2.5 flex-col sm:flex-row">
                    {[
                      { id: "m", label: "⚙️ Metal" },
                      { id: "s", label: "💎 Semiconductor" },
                      { id: "i", label: "🧊 Insulator" },
                    ].map((c) => (
                      <div
                        key={c.id}
                        className={`flex-1 text-center py-2 px-1.5 rounded-lg border-[1.5px] text-[0.82rem] font-bold transition-all ${
                          data.cls === c.id
                            ? "bg-primary/10 border-primary text-primary"
                            : "border-gray text-[#9ca3af]"
                        }`}
                      >
                        {c.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[0.78rem] text-[#a0aec0] mt-5">
          ⚠️ Demo mode — predictions are simulated.
          Connect your Python backend at <code className="text-primary bg-primary/[0.08] px-1.5 py-0.5 rounded">localhost:8000/predict</code> for real model output.
        </p>
      </div>
    </section>
  );
}
