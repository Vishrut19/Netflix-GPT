import React from "react";
import { cn } from "../../utils/cn";

const Logo = ({ className, iconOnly = false, size = "md" }) => {
  const sizes = {
    sm: "h-6",
    md: "h-10",
    lg: "h-14",
    xl: "h-20",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div className={cn("flex items-center gap-3 select-none group", className)}>
      {/* The Iconic Symbol */}
      <div className={cn(
        "relative flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
        iconSizes[size]
      )}>
        {/* Abstract "M" + Play Button SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Stylized M-Play Shape */}
          <path
            d="M20 80V20L50 50L80 20V80"
            stroke="url(#logo-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45 45L55 55L45 65V45Z"
            fill="white"
            className="animate-pulse"
          />
        </svg>
        
        {/* AI Sparkle */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full blur-[2px] animate-pulse" />
      </div>

      {/* Typography */}
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            "font-black tracking-tighter text-white uppercase italic",
            size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"
          )}>
            MediaRecs
          </span>
          <span className={cn(
            "font-bold tracking-[0.2em] text-indigo-500 uppercase flex items-center gap-1",
            size === "sm" ? "text-[8px]" : "text-[10px]"
          )}>
            AI Platform
            <div className="h-[1px] flex-1 bg-indigo-500/30" />
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
