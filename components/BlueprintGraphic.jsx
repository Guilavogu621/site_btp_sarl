export default function BlueprintGraphic() {
  return (
    <div className="relative">
      <svg viewBox="0 0 360 300" className="w-full h-auto" fill="none">
        <rect x="4" y="4" width="352" height="292" stroke="#cccccc" strokeWidth="1"/>
        <line x1="40"  y1="4" x2="40"  y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="80"  y1="4" x2="80"  y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="120" y1="4" x2="120" y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="160" y1="4" x2="160" y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="200" y1="4" x2="200" y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="240" y1="4" x2="240" y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="280" y1="4" x2="280" y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <line x1="320" y1="4" x2="320" y2="296" stroke="#e0e0e0" strokeWidth="0.6"/>
        <path
          className="draw-path"
          d="M40 240 L40 120 L120 60 L200 120 L200 240 M40 240 L200 240 M80 240 L80 170 L110 170 L110 240 M140 240 L140 190 L170 190 L170 240 M220 240 L220 100 L320 100 L320 240 L220 240 M220 130 L320 130 M220 170 L320 170 M220 200 L320 200"
          stroke="#0A2540"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="120" cy="60" r="3" fill="#1E56A0"/>
      </svg>
      <p className="font-mono text-[10px] tracking-widest uppercase mt-2 text-right text-[#5B6B7A]">
        Élévation — Éch. 1:100
      </p>
    </div>
  );
}
