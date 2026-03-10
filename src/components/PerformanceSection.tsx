import SectionHeader from "./SectionHeader";

const metrics = [
  { delta: "+8%", label: "Band Gap Accuracy", vs: "vs ALIGNN (MAE)", highlight: false },
  { delta: "+65%", label: "Volume Accuracy", vs: "vs ALIGNN (MAE)", highlight: true },
  { delta: "+3%", label: "Classification AUC", vs: "vs CGCNN", highlight: false },
  { delta: "3×", label: "Smaller than MatBERT", vs: "37M vs 110M params", highlight: false },
];

const rows = [
  { model: "🏆 CrystalPS (LLM-Prop)", type: "Text + T5", bg: "0.230 eV", vol: "5.20 ų", auc: "0.94", ours: true },
  { model: "ALIGNN", type: "GNN (3D)", bg: "0.250 eV", vol: "15.0 ų", auc: "0.92", ours: false },
  { model: "CGCNN", type: "GNN (Graph)", bg: "0.292 eV", vol: "19.8 ų", auc: "0.91", ours: false },
  { model: "MatBERT", type: "Text + BERT", bg: "0.241 eV", vol: "—", auc: "0.90", ours: false },
  { model: "DimeNet++", type: "GNN (3D)", bg: "0.263 eV", vol: "18.2 ų", auc: "0.89", ours: false },
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="py-28 bg-white">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <SectionHeader
          tag="Model Results"
          title="Results That"
          titleHighlight="Speak for Themselves"
          subtitle="LLM-Prop consistently outperforms graph neural networks on JARVIS crystal property benchmarks."
        />

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {metrics.map((m) => (
            <div key={m.label} className={`rounded-lg p-8 text-center border transition-all hover:-translate-y-1 hover:shadow-card ${m.highlight ? "bg-white border-secondary shadow-[0_0_0_2px_rgba(87,196,229,0.3)]" : "bg-muted border-gray"}`}>
              <span className={`text-[2.6rem] font-extrabold block leading-none mb-2 ${m.highlight ? "text-accent" : "text-primary"}`}>{m.delta}</span>
              <div className="text-[0.88rem] font-semibold text-foreground mb-1">{m.label}</div>
              <div className="text-[0.78rem] text-[#718096]">{m.vs}</div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="max-w-[860px] mx-auto">
          <h3 className="text-[1.2rem] font-bold text-foreground mb-5 text-center">Benchmark Comparison — JARVIS Dataset</h3>
          <div className="overflow-x-auto rounded-[10px] shadow-card">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Model", "Type", "Band Gap MAE ↓", "Volume MAE ↓", "BG AUC ↑"].map((h) => (
                    <th key={h} className="bg-primary text-white text-[0.8rem] font-bold tracking-wider uppercase px-4 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.model} className={r.ours ? "bg-secondary/[0.06]" : ""}>
                    <td className={`px-4 py-3 border-b border-gray text-[0.92rem] ${r.ours ? "text-primary font-semibold" : "text-muted-foreground"}`}>{r.model}</td>
                    <td className="px-4 py-3 border-b border-gray text-[0.92rem] text-muted-foreground">{r.type}</td>
                    <td className={`px-4 py-3 border-b border-gray text-[0.92rem] font-bold ${r.ours ? "text-primary" : "text-[#9ca3af]"}`}>{r.bg}</td>
                    <td className={`px-4 py-3 border-b border-gray text-[0.92rem] font-bold ${r.ours ? "text-primary" : "text-[#9ca3af]"}`}>{r.vol}</td>
                    <td className={`px-4 py-3 border-b border-gray text-[0.92rem] font-bold ${r.ours ? "text-primary" : "text-[#9ca3af]"}`}>{r.auc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
