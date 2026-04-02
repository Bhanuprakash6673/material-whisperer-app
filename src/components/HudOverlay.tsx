export default function HudOverlay() {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
      {/* Warm amber vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(15, 10, 5, 0.6) 100%)",
      }} />

      {/* Subtle volumetric haze */}
      <div className="absolute inset-0 opacity-20" style={{
        background: "linear-gradient(180deg, rgba(180, 120, 40, 0.08) 0%, transparent 40%, rgba(180, 120, 40, 0.05) 100%)",
      }} />

      {/* Top-left stacked title */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-[0.35em] uppercase font-heading" style={{ color: "rgba(200, 160, 80, 0.5)" }}>
            LLMPROP // SYSTEM
          </p>
          <h2 className="text-xs md:text-sm tracking-[0.25em] uppercase font-heading" style={{ color: "rgba(220, 180, 100, 0.4)" }}>
            CRYSTAL PREDICT
          </h2>
          <p className="text-[8px] tracking-[0.2em] uppercase" style={{ color: "rgba(160, 140, 100, 0.35)" }}>
            T5 TRANSFORMER · MATERIALS SCIENCE
          </p>
        </div>
      </div>

      {/* Right-side vertical stat list */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 md:right-10 space-y-4">
        {[
          { label: "ACCURACY", value: "94.2%" },
          { label: "LATENCY", value: "12ms" },
          { label: "MODELS", value: "T5-XL" },
          { label: "STATUS", value: "ONLINE" },
        ].map((stat) => (
          <div key={stat.label} className="text-right">
            <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(160, 140, 100, 0.35)" }}>
              {stat.label}
            </p>
            <p className="text-[11px] tracking-[0.15em] font-heading" style={{ color: "rgba(220, 220, 230, 0.3)" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom-left small UI label */}
      <div className="absolute bottom-16 left-6 md:bottom-20 md:left-10">
        <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(160, 140, 100, 0.3)" }}>
          SYS.MODULE.v2.4
        </p>
        <p className="text-[7px] tracking-[0.2em]" style={{ color: "rgba(140, 120, 90, 0.25)" }}>
          NEURAL LATTICE INFERENCE
        </p>
      </div>

      {/* Bottom center pill status bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border" style={{
          borderColor: "rgba(160, 140, 100, 0.15)",
          background: "rgba(20, 15, 10, 0.3)",
          backdropFilter: "blur(8px)",
        }}>
          {["INIT", "ENCODE", "PREDICT", "OUTPUT"].map((chip, i) => (
            <span
              key={chip}
              className="px-2 py-0.5 rounded-full text-[7px] tracking-[0.2em] uppercase font-heading"
              style={{
                background: i === 2 ? "rgba(200, 160, 60, 0.2)" : "transparent",
                color: i === 2 ? "rgba(220, 180, 100, 0.5)" : "rgba(140, 130, 110, 0.3)",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Thin geometric dividers */}
      <div className="absolute top-0 left-[15%] w-px h-full" style={{ background: "linear-gradient(180deg, transparent, rgba(160, 140, 100, 0.08), transparent)" }} />
      <div className="absolute top-0 right-[15%] w-px h-full" style={{ background: "linear-gradient(180deg, transparent, rgba(160, 140, 100, 0.08), transparent)" }} />

      {/* Subtle lens bloom top-left */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-[0.04]" style={{
        background: "radial-gradient(circle, rgba(220, 170, 60, 0.6), transparent 70%)",
      }} />
    </div>
  );
}
