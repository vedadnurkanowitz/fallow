import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center font-body font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roast focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-roast text-milk hover:bg-espresso",
  secondary:
    "border border-espresso text-espresso hover:bg-espresso hover:text-milk",
  ghost:
    "text-roast hover:text-espresso underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded",
  md: "px-6 py-3 text-base rounded-sm",
  lg: "px-8 py-4 text-base rounded-sm",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, fullWidth, className = "", children, ...props },
    ref
  ) => {
    const classes = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
