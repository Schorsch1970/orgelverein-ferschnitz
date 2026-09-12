function Pipe({ x, width, topY, bottomY, mouthY }) {
  const r = width / 2
  return (
    <g>
      <path
        d={`M ${x} ${topY + r}
            A ${r} ${r} 0 0 1 ${x + width} ${topY + r}
            L ${x + width} ${bottomY - 10}
            L ${x + width - 6} ${bottomY}
            L ${x + 6} ${bottomY}
            L ${x} ${bottomY - 10}
            Z`}
        fill="url(#pipeMetal)"
        stroke="rgba(40,40,50,0.35)"
        strokeWidth="1"
      />
      {/* Mundloch / mouth */}
      <path
        d={`M ${x + width * 0.18} ${mouthY} Q ${x + width / 2} ${mouthY + width * 0.32} ${x + width * 0.82} ${mouthY}`}
        fill="none"
        stroke="rgba(30,30,40,0.4)"
        strokeWidth="1.5"
      />
      {/* Goldkragen */}
      <rect x={x - 1.5} y={topY + r * 0.7} width={width + 3} height={7} rx="2" fill="url(#pipeGold)" />
      {/* Glanzlicht */}
      <rect x={x + width * 0.16} y={topY + r} width={width * 0.14} height={bottomY - topY - r - 10} fill="rgba(255,255,255,0.35)" rx="3" />
    </g>
  )
}

export default function PipesBanner() {
  return (
    <div className="pipes-banner" aria-hidden="true">
      <svg viewBox="0 0 220 1000" preserveAspectRatio="xMaxYMax meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pipeMetal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7d838f" />
            <stop offset="18%" stopColor="#aeb4bd" />
            <stop offset="38%" stopColor="#eef1f4" />
            <stop offset="55%" stopColor="#c7ccd3" />
            <stop offset="80%" stopColor="#8b919c" />
            <stop offset="100%" stopColor="#5f6570" />
          </linearGradient>
          <linearGradient id="pipeGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ecd8a3" />
            <stop offset="50%" stopColor="#b8933f" />
            <stop offset="100%" stopColor="#8a6a26" />
          </linearGradient>
        </defs>

        <Pipe x={40} width={64} topY={40} bottomY={900} mouthY={640} />
      </svg>
    </div>
  )
}
