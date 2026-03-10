import type { Prediction } from "@/services/api";

const ResultTable = ({ predictions }: { predictions: Prediction[] }) => (
  <div className="border border-border">
    <div className="grid grid-cols-3 border-b border-border px-4 py-2 text-xs text-muted-foreground font-heading">
      <span>Property</span>
      <span>Predicted Value</span>
      <span>Confidence</span>
    </div>
    {predictions.map((p) => (
      <div key={p.property} className="grid grid-cols-3 border-b border-border last:border-b-0 px-4 py-3 text-sm">
        <span className="font-heading">{p.property}</span>
        <span className="font-body">{p.value}</span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${p.confidence * 100}%` }}
            />
          </div>
          <span className="text-muted-foreground text-xs font-heading">{(p.confidence * 100).toFixed(0)}%</span>
        </div>
      </div>
    ))}
  </div>
);

export default ResultTable;
