import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { Prediction } from "@/services/api";

const PredictionCharts = ({ predictions }: { predictions: Prediction[] }) => {
  const valueData = predictions.map((p) => ({ name: p.property, value: p.value }));
  const confData = predictions.map((p) => ({ name: p.property, confidence: p.confidence * 100 }));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <p className="font-heading text-xs text-muted-foreground mb-4">Predicted Values</p>
        <div className="h-64 border border-border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={valueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 14% 22%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 10% 58%)", fontFamily: "Source Code Pro" }} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 10% 58%)", fontFamily: "Source Code Pro" }} />
              <Tooltip
                contentStyle={{ background: "hsl(215 22% 11%)", border: "1px solid hsl(215 14% 22%)", fontFamily: "Source Code Pro", fontSize: 12 }}
                labelStyle={{ color: "hsl(210 29% 92%)" }}
              />
              <Bar dataKey="value" radius={0}>
                {valueData.map((_, i) => (
                  <Cell key={i} fill="hsl(212 100% 67%)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <p className="font-heading text-xs text-muted-foreground mb-4">Confidence Scores</p>
        <div className="h-64 border border-border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={confData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 14% 22%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 10% 58%)", fontFamily: "Source Code Pro" }} angle={-20} textAnchor="end" height={50} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215 10% 58%)", fontFamily: "Source Code Pro" }} />
              <Tooltip
                contentStyle={{ background: "hsl(215 22% 11%)", border: "1px solid hsl(215 14% 22%)", fontFamily: "Source Code Pro", fontSize: 12 }}
                labelStyle={{ color: "hsl(210 29% 92%)" }}
              />
              <Bar dataKey="confidence" radius={0}>
                {confData.map((d, i) => {
                  const opacity = 0.3 + (d.confidence / 100) * 0.7;
                  return <Cell key={i} fill={`hsl(212 100% 67% / ${opacity})`} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PredictionCharts;
