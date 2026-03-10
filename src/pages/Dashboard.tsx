import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { predictFromText, predictFromCSV, type PredictionResponse } from "@/services/api";
import ResultTable from "@/components/ResultTable";
import PredictionCharts from "@/components/PredictionCharts";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Upload, FileText, RotateCcw, Sparkles } from "lucide-react";

const EXAMPLE_TEXT = "SiO2 cubic structure temperature 300K lattice constant 5.43 space group Fd-3m";

const Dashboard = () => {
  const [mode, setMode] = useState<"text" | "csv">("text");
  const [textInput, setTextInput] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      setError("Invalid file format. Please upload a CSV file.");
      return;
    }
    setCsvFile(file);
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = text.split("\n").filter(Boolean).map((r) => r.split(","));
      setCsvPreview(rows.slice(0, 6));
    };
    reader.readAsText(file);
  };

  const runPrediction = async () => {
    setError("");
    if (mode === "text" && !textInput.trim()) {
      setError("Please enter a material description.");
      return;
    }
    if (mode === "csv" && !csvFile) {
      setError("Please upload a CSV file.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = mode === "text" ? await predictFromText(textInput) : await predictFromCSV(csvFile!);
      setResult(res);
    } catch {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setTextInput("");
    setCsvFile(null);
    setCsvPreview([]);
    setResult(null);
    setError("");
  };

  const exportCSV = () => {
    if (!result) return;
    const header = "Property,Predicted Value,Confidence\n";
    const rows = result.predictions.map((p) => `${p.property},${p.value},${p.confidence}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.material}_predictions.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.material}_predictions.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="md:ml-16 px-6 py-20 mt-14 md:mt-0">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-2xl font-semibold mb-8">Prediction Dashboard</h1>

        {/* Mode selector */}
        <div className="flex gap-0 mb-8">
          <button
            onClick={() => setMode("text")}
            className={`font-heading text-sm px-4 py-2 border transition-colors ${
              mode === "text" ? "border-primary text-primary bg-secondary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Text Input
          </button>
          <button
            onClick={() => setMode("csv")}
            className={`font-heading text-sm px-4 py-2 border border-l-0 transition-colors ${
              mode === "csv" ? "border-primary text-primary bg-secondary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            CSV Upload
          </button>
        </div>

        {/* Text input */}
        {mode === "text" && (
          <div className="mb-6">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Describe the crystalline material structure..."
              className="w-full h-40 p-4 bg-card border border-border text-foreground text-sm font-body resize-none focus:outline-none focus:border-primary rounded-sm"
            />
            <div className="flex gap-2 mt-2">
              <Button variant="ghost" size="sm" onClick={() => setTextInput(EXAMPLE_TEXT)}>
                <Sparkles className="w-3 h-3 mr-1" /> Example
              </Button>
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>
          </div>
        )}

        {/* CSV upload */}
        {mode === "csv" && (
          <div className="mb-6">
            <div
              onClick={() => fileRef.current?.click()}
              className="border border-dashed border-border p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
            >
              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {csvFile ? csvFile.name : "Click to upload CSV dataset"}
              </p>
              {csvFile && (
                <p className="text-xs text-muted-foreground mt-1">
                  {csvPreview.length} rows × {csvPreview[0]?.length || 0} columns detected
                </p>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleCSV} className="hidden" />

            {csvPreview.length > 0 && (
              <div className="mt-4 border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {csvPreview.map((row, i) => (
                      <tr key={i} className={i === 0 ? "bg-secondary text-foreground font-heading" : ""}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 border-r border-border last:border-r-0 text-muted-foreground">
                            {cell.trim()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>
          </div>
        )}

        {error && <p className="text-destructive text-sm mb-4">{error}</p>}

        {/* Run button / loading */}
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Button onClick={runPrediction} className="mb-12">
            Run Prediction
          </Button>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8">
            <div>
              <p className="font-heading text-xs text-muted-foreground mb-1">Material</p>
              <p className="font-heading text-lg">{result.material}</p>
            </div>

            <ResultTable predictions={result.predictions} />
            <PredictionCharts predictions={result.predictions} />

            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={exportCSV}>
                Download CSV
              </Button>
              <Button variant="outline" size="sm" onClick={exportJSON}>
                Export JSON
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
