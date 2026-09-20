type BadgeColor =
  | "blue"
  | "amber"
  | "emerald"
  | "red"
  | "purple"
  | "slate"
  | "indigo";

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  emerald: "bg-emerald-100 text-emerald-800",
  red: "bg-red-100 text-red-800",
  purple: "bg-purple-100 text-purple-800",
  slate: "bg-slate-100 text-slate-700",
  indigo: "bg-indigo-100 text-indigo-800",
};

const categoryColors: Record<string, BadgeColor> = {
  Academic: "blue",
  Cultural: "purple",
  Sports: "emerald",
  Holiday: "amber",
  General: "slate",
  Admissions: "indigo",
};

export function Badge({ label, color, className = "" }: BadgeProps) {
  const resolvedColor = color ?? categoryColors[label] ?? "slate";
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClasses[resolvedColor]} ${className}`}
    >
      {label}
    </span>
  );
}
