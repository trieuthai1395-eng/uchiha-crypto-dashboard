"use client";

interface Props { size?: number; spinning?: boolean; }

export default function SharinganEye({ size = 48, spinning = false }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "inline-block", flexShrink: 0 }}>
      <defs>
        <radialGradient id={`sg-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1a0000" />
          <stop offset="55%"  stopColor="#8b0000" />
          <stop offset="100%" stopColor="#cc0000" />
        </radialGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" fill="#060000" stroke="#cc0000" strokeWidth="1.5" filter={`url(#glow-${size})`} />
      {/* Iris */}
      <circle cx="50" cy="50" r="38" fill={`url(#sg-${size})`} />
      {/* 3 tomoe spinning */}
      <g style={spinning ? { transformOrigin:"50px 50px", animation:"spin 8s linear infinite" } : {}}>
        <path d="M50 14 Q63 33 63 50 Q63 67 50 86 Q37 67 37 50 Q37 33 50 14Z" fill="#cc0000" opacity="0.92" />
        <path d="M14 50 Q33 37 50 37 Q67 37 86 50 Q67 63 50 63 Q33 63 14 50Z" fill="#cc0000" opacity="0.92" />
        <path d="M21 21 Q40 37 37 50 Q34 63 21 79 Q27 57 21 50 Q15 43 21 21Z" fill="#cc0000" opacity="0.92" />
      </g>
      {/* Pupil */}
      <circle cx="50" cy="50" r="13" fill="#060000" />
      <circle cx="50" cy="50" r="7"  fill="#0f0000" />
      {/* Highlight */}
      <circle cx="44" cy="44" r="2.2" fill="#cc0000" opacity="0.65" />
    </svg>
  );
}
