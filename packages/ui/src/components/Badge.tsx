import React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "verified"
    | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[rgb(241,243,245)] text-[rgb(84,110,122)]",
    primary: "bg-[rgb(0,119,190)]/10 text-[rgb(0,119,190)]",
    success: "bg-[rgb(46,125,50)]/10 text-[rgb(46,125,50)]",
    warning: "bg-[rgb(237,108,2)]/10 text-[rgb(237,108,2)]",
    error: "bg-[rgb(211,47,47)]/10 text-[rgb(211,47,47)]",
    verified:
      "bg-[rgb(46,125,50)]/10 text-[rgb(46,125,50)] border border-[rgb(46,125,50)]/20",
    outline:
      "bg-transparent border border-[rgb(224,231,239)] text-[rgb(84,110,122)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {variant === "verified" && (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {children}
    </span>
  );
}
