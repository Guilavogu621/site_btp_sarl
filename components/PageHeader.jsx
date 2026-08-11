/**
 * Composant de bannière d'en-tête premium au fond bleu marine profond (#0A2540) avec motif blueprint et typographies haute lisibilité.
 */
export default function PageHeader({
  badge,
  title,
  description,
  id,
  className = "bg-[#0A2540] blueprint-grid-dark text-white py-16 md:py-20 px-6 border-b border-[#295EA8]/30 mb-12 shadow-lg relative overflow-hidden"
}) {
  return (
    <div id={id} className={className}>
      <div className="max-w-6xl mx-auto relative z-10">
        {badge && (
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase font-bold text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/30 px-3.5 py-1.5 inline-block rounded-xs shadow-xs">
            {badge}
          </span>
        )}
        <h1 className="font-display font-extrabold text-[34px] md:text-[50px] text-white mt-4 leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-[16px] md:text-[18px] text-slate-100 max-w-3xl leading-relaxed font-sans font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
