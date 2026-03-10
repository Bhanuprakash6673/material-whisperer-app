const properties = [
  { name: "Band Gap", desc: "Electronic band gap energy, critical for semiconductor classification", unit: "eV" },
  { name: "Thermal Conductivity", desc: "Rate of heat transfer through the material lattice", unit: "W/mK" },
  { name: "Density", desc: "Mass per unit volume of the crystalline structure", unit: "g/cm³" },
  { name: "Stability Score", desc: "Thermodynamic stability metric derived from formation energy analysis", unit: "0-1" },
];

const About = () => (
  <div className="md:ml-16 px-6 py-20">
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-3xl font-semibold mb-8">About</h1>

      <section className="mb-12">
        <h2 className="font-heading text-lg font-medium text-primary mb-4">What This System Does</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          The Crystalline Property Predictor uses large language models fine-tuned on materials science datasets to predict
          physical and electronic properties of crystalline materials. Given a textual description or structured CSV input,
          the system produces quantitative regression predictions alongside confidence scores.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-lg font-medium text-primary mb-4">How LLMs Are Used</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          The pipeline encodes crystal structure descriptions into embeddings that capture lattice symmetry, elemental composition,
          and thermodynamic context. These embeddings are processed by a transformer-based regression head that outputs property
          predictions with calibrated uncertainty estimates.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-lg font-medium text-primary mb-4">Input Formats</h2>
        <div className="flex gap-4">
          <div className="border border-border px-4 py-3 text-sm font-heading">Text Description</div>
          <div className="border border-border px-4 py-3 text-sm font-heading">CSV Dataset</div>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-medium text-primary mb-4">Predicted Properties</h2>
        <div className="border border-border">
          <div className="grid grid-cols-3 border-b border-border px-4 py-2 text-xs text-muted-foreground font-heading">
            <span>Property</span>
            <span>Description</span>
            <span>Unit</span>
          </div>
          {properties.map((p) => (
            <div key={p.name} className="grid grid-cols-3 border-b border-border last:border-b-0 px-4 py-3 text-sm">
              <span className="font-heading">{p.name}</span>
              <span className="text-muted-foreground">{p.desc}</span>
              <span className="text-muted-foreground font-heading">{p.unit}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default About;
