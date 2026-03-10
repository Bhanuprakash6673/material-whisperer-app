export default function CrystalSVG() {
  return (
    <div className="w-full max-w-[480px] relative">
      <svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_24px_48px_rgba(26,95,122,0.18)]">
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(87,196,229,0.13)" />
            <stop offset="100%" stopColor="rgba(87,196,229,0)" />
          </radialGradient>
          <radialGradient id="atomGrad1" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#4ecdc4" />
            <stop offset="100%" stopColor="#1a5f7a" />
          </radialGradient>
          <radialGradient id="atomGrad2" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ff9f7f" />
            <stop offset="100%" stopColor="#ff7a59" />
          </radialGradient>
          <radialGradient id="atomGrad3" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#74c9e8" />
            <stop offset="100%" stopColor="#2e7d9b" />
          </radialGradient>
          <radialGradient id="atomGradSm" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#a8e6cf" />
            <stop offset="100%" stopColor="#3d9970" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(26,95,122,0.25)" />
          </filter>
        </defs>

        <ellipse cx="250" cy="210" rx="220" ry="180" fill="url(#bgGlow)" />

        {/* Perspective grid */}
        <g opacity="0.22">
          <line x1="60" y1="350" x2="440" y2="350" stroke="#1a5f7a" strokeWidth="1" />
          <line x1="80" y1="320" x2="460" y2="320" stroke="#1a5f7a" strokeWidth=".7" />
          <line x1="40" y1="380" x2="420" y2="380" stroke="#1a5f7a" strokeWidth=".6" strokeDasharray="4,3" />
          <line x1="120" y1="310" x2="100" y2="390" stroke="#1a5f7a" strokeWidth=".7" />
          <line x1="200" y1="310" x2="180" y2="390" stroke="#1a5f7a" strokeWidth=".7" />
          <line x1="280" y1="310" x2="260" y2="390" stroke="#1a5f7a" strokeWidth=".7" />
          <line x1="360" y1="310" x2="340" y2="390" stroke="#1a5f7a" strokeWidth=".7" />
        </g>

        {/* Main crystal group */}
        <g className="animate-float-y" filter="url(#softShadow)">
          {/* Back edges */}
          <g stroke="#1a5f7a" strokeWidth="1.8" strokeDasharray="5,3" fill="none" opacity="0.45">
            <line x1="148" y1="100" x2="280" y2="100" />
            <line x1="148" y1="100" x2="148" y2="230" />
            <line x1="280" y1="100" x2="352" y2="150" />
            <line x1="148" y1="100" x2="220" y2="150" />
          </g>

          {/* Front edges */}
          <g stroke="#1a5f7a" strokeWidth="2.2" fill="none" className="animate-bond-glow">
            <line x1="148" y1="230" x2="280" y2="230" />
            <line x1="280" y1="230" x2="352" y2="280" />
            <line x1="352" y1="280" x2="220" y2="280" />
            <line x1="220" y1="280" x2="148" y2="230" />
            <line x1="148" y1="230" x2="148" y2="100" />
            <line x1="280" y1="230" x2="280" y2="100" />
            <line x1="352" y1="280" x2="352" y2="150" />
            <line x1="220" y1="280" x2="220" y2="150" />
            <line x1="148" y1="100" x2="280" y2="100" />
            <line x1="280" y1="100" x2="352" y2="150" />
            <line x1="352" y1="150" x2="220" y2="150" />
            <line x1="220" y1="150" x2="148" y2="100" />
          </g>

          {/* Face diagonals */}
          <g stroke="#57c4e5" strokeWidth="1" strokeDasharray="3,4" opacity="0.35">
            <line x1="148" y1="230" x2="280" y2="100" />
            <line x1="148" y1="100" x2="280" y2="230" />
            <line x1="280" y1="230" x2="352" y2="150" />
            <line x1="280" y1="100" x2="352" y2="280" />
          </g>

          {/* Corner atoms */}
          <circle cx="148" cy="230" r="10" fill="url(#atomGrad1)" filter="url(#glow)" className="animate-atom-pulse" />
          <circle cx="280" cy="230" r="10" fill="url(#atomGrad1)" filter="url(#glow)" className="animate-atom-pulse2" />
          <circle cx="352" cy="280" r="10" fill="url(#atomGrad1)" filter="url(#glow)" />
          <circle cx="220" cy="280" r="10" fill="url(#atomGrad1)" filter="url(#glow)" className="animate-atom-pulse3" />
          <circle cx="148" cy="100" r="10" fill="url(#atomGrad1)" filter="url(#glow)" className="animate-atom-pulse2" />
          <circle cx="280" cy="100" r="10" fill="url(#atomGrad1)" filter="url(#glow)" />
          <circle cx="352" cy="150" r="10" fill="url(#atomGrad1)" filter="url(#glow)" className="animate-atom-pulse" />
          <circle cx="220" cy="150" r="10" fill="url(#atomGrad1)" filter="url(#glow)" className="animate-atom-pulse3" />

          {/* Face-center atoms */}
          <circle cx="250" cy="255" r="8" fill="url(#atomGrad2)" filter="url(#glow)" />
          <circle cx="250" cy="125" r="8" fill="url(#atomGrad2)" filter="url(#glow)" className="animate-atom-pulse" />
          <circle cx="184" cy="165" r="8" fill="url(#atomGrad2)" filter="url(#glow)" className="animate-atom-pulse2" />
          <circle cx="316" cy="215" r="8" fill="url(#atomGrad2)" filter="url(#glow)" className="animate-atom-pulse3" />
          <circle cx="286" cy="215" r="8" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="214" cy="165" r="8" fill="url(#atomGrad3)" filter="url(#glow)" className="animate-atom-pulse" />

          {/* Body-center atom */}
          <circle cx="250" cy="190" r="14" fill="url(#atomGrad2)" filter="url(#glow)" className="animate-atom-pulse" />
          <circle cx="250" cy="190" r="20" fill="none" stroke="rgba(255,122,89,0.25)" strokeWidth="2" className="animate-atom-pulse2" />

          {/* Bonds to body center */}
          <g stroke="rgba(255,122,89,0.4)" strokeWidth="1.5" fill="none">
            <line x1="148" y1="230" x2="250" y2="190" />
            <line x1="280" y1="230" x2="250" y2="190" />
            <line x1="352" y1="280" x2="250" y2="190" />
            <line x1="220" y1="280" x2="250" y2="190" />
            <line x1="148" y1="100" x2="250" y2="190" />
            <line x1="280" y1="100" x2="250" y2="190" />
            <line x1="352" y1="150" x2="250" y2="190" />
            <line x1="220" y1="150" x2="250" y2="190" />
          </g>

          {/* Electron orbital shells */}
          <g fill="none" strokeWidth="1" opacity="0.3">
            <ellipse cx="250" cy="190" rx="90" ry="28" stroke="#57c4e5" transform="rotate(-20,250,190)" strokeDasharray="4,3" />
            <ellipse cx="250" cy="190" rx="90" ry="28" stroke="#57c4e5" transform="rotate(60,250,190)" strokeDasharray="4,3" />
            <ellipse cx="250" cy="190" rx="90" ry="28" stroke="#1a5f7a" transform="rotate(-80,250,190)" strokeDasharray="4,3" />
          </g>

          {/* Electrons */}
          <circle cx="250" cy="162" r="4.5" fill="#57c4e5" opacity="0.75" filter="url(#glow)" />
          <circle cx="320" cy="198" r="4.5" fill="#57c4e5" opacity="0.75" filter="url(#glow)" />
          <circle cx="182" cy="210" r="4.5" fill="#ff7a59" opacity="0.75" filter="url(#glow)" />
        </g>

        {/* Secondary small crystal */}
        <g opacity="0.45" transform="translate(360,240) scale(0.42)" className="animate-atom-pulse2">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="80" y1="0" x2="80" y2="80" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="0" y1="80" x2="80" y2="80" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="0" y1="0" x2="40" y2="30" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="80" y1="0" x2="120" y2="30" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="40" y1="30" x2="120" y2="30" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="40" y1="30" x2="40" y2="110" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="120" y1="30" x2="120" y2="110" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="80" y1="80" x2="120" y2="110" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="0" y1="80" x2="40" y2="110" stroke="#1a5f7a" strokeWidth="2.5" />
          <line x1="40" y1="110" x2="120" y2="110" stroke="#1a5f7a" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="80" cy="0" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="0" cy="80" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="80" cy="80" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="40" cy="30" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="120" cy="30" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="40" cy="110" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="120" cy="110" r="10" fill="url(#atomGrad3)" filter="url(#glow)" />
          <circle cx="60" cy="55" r="8" fill="url(#atomGradSm)" />
        </g>

        {/* Caption */}
        <g fontFamily="'Inter',sans-serif">
          <text x="250" y="405" textAnchor="middle" fontWeight="600" fill="#1a5f7a" fontSize="12">
            FCC Crystal Lattice — T5 Property Prediction
          </text>
          <text x="250" y="418" textAnchor="middle" fontSize="10" fill="#a0aec0">
            Band Gap · Volume · Formation Energy · Classification
          </text>
        </g>
      </svg>
    </div>
  );
}
