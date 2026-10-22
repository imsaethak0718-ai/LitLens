import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "purple" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
}: BadgeProps) {
  const base = "inline-flex items-center font-medium rounded-md transition-colors";
  
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] leading-tight",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    default: "bg-white/5 text-zinc-300 border border-white/10",
    primary: "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20",
    secondary: "bg-zinc-800 text-zinc-400 border border-zinc-700",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    purple: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    outline: "bg-transparent text-zinc-400 border border-white/10 hover:border-white/20",
  };

  return (
    <span
      onClick={onClick}
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${
        onClick ? "cursor-pointer hover:shadow-xs active:scale-98" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
