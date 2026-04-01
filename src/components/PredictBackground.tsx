import { useMemo } from "react";

export default function PredictBackground() {
  const dots = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 3,
      opacity: Math.random() * 0.5 + 0.15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-background/80" />

      {/* Sparkle black dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-foreground/60"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animation: `sparkle ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
