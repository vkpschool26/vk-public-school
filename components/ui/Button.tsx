"use client";

import { forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "accent" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue-800 text-white hover:bg-blue-900 focus:ring-blue-800 border border-blue-800",
  secondary:
    "bg-transparent text-blue-800 border border-blue-800 hover:bg-blue-50 focus:ring-blue-800",
  accent:
    "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 border border-amber-500",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400 border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      className = "",
      ...rest
    } = props;

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(" ");

    if ("href" in rest && rest.href !== undefined) {
      const { href, children } = rest as ButtonAsLinkProps;
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    const { children, ...buttonProps } = rest as ButtonAsButtonProps;
    return (
      <button ref={ref} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }
);
