interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignClasses} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
