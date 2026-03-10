import { useState, useEffect } from "react";

const messages = [
  "Analyzing crystalline structure...",
  "Querying model...",
  "Calculating properties...",
];

const LoadingIndicator = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12">
      <div className="h-10 border border-primary/40 flex items-center justify-center overflow-hidden relative w-48">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="w-full h-[2px] bg-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 h-full w-1/3 bg-primary ekg-line" />
        </div>
      </div>
      <p className="font-heading text-xs text-muted-foreground mt-3">
        [{messages[msgIndex]}]
      </p>
    </div>
  );
};

export default LoadingIndicator;
