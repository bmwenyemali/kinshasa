import React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[rgb(26,43,60)] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(84,110,122)]">
              {icon}
            </div>
          )}
          <input
            className={cn(
              "flex h-10 w-full rounded-lg border border-[rgb(224,231,239)] bg-white px-3 py-2 text-sm text-[rgb(26,43,60)] placeholder:text-[rgb(84,110,122)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,119,190)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error &&
                "border-[rgb(211,47,47)] focus-visible:ring-[rgb(211,47,47)]",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-[rgb(211,47,47)]">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
