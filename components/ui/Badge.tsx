import { type HTMLAttributes } from "react";

type Variant = "default" | "seasonal" | "stone";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  default:  "bg-crema text-espresso",
  seasonal: "bg-herb text-milk",
  stone:    "bg-stone text-milk",
};

export default function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`text-label inline-block px-2 py-1 rounded-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
