const API_BASE_URL = "/api";

export interface Prediction {
  property: string;
  value: number;
  confidence: number;
}

export interface PredictionResponse {
  material: string;
  predictions: Prediction[];
}

export const predictFromText = async (text: string): Promise<PredictionResponse> => {
  // Mock response for frontend-only mode
  await new Promise((r) => setTimeout(r, 3000));
  return {
    material: text.split(" ")[0] || "Unknown",
    predictions: [
      { property: "Band Gap", value: 1.82, confidence: 0.91 },
      { property: "Thermal Conductivity", value: 135, confidence: 0.88 },
      { property: "Density", value: 2.65, confidence: 0.94 },
      { property: "Stability Score", value: 0.87, confidence: 0.79 },
      { property: "Elastic Modulus", value: 73.1, confidence: 0.85 },
    ],
  };
};

export const predictFromCSV = async (file: File): Promise<PredictionResponse> => {
  await new Promise((r) => setTimeout(r, 4000));
  return {
    material: file.name.replace(".csv", ""),
    predictions: [
      { property: "Band Gap", value: 2.14, confidence: 0.87 },
      { property: "Thermal Conductivity", value: 98, confidence: 0.82 },
      { property: "Density", value: 3.12, confidence: 0.91 },
      { property: "Stability Score", value: 0.76, confidence: 0.73 },
      { property: "Elastic Modulus", value: 112.4, confidence: 0.88 },
    ],
  };
};
