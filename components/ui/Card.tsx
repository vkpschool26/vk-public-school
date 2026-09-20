import Image from "next/image";

interface CardProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  footer,
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden border border-slate-100 ${
        hover
          ? "shadow-sm hover:shadow-md transition-shadow duration-300"
          : "shadow-sm"
      } ${className}`}
    >
      {imageSrc && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title ?? "Card image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {(title || description || children) && (
        <div className="p-5">
          {title && (
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-slate-600 text-sm leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      )}
      {footer && (
        <div className="px-5 pb-5 pt-0 border-t border-slate-100 mt-0">
          {footer}
        </div>
      )}
    </div>
  );
}
