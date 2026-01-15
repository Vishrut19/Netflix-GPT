import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

const Button = forwardRef(({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-black",
        
        // Variants
        variant === "default" && "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20",
        variant === "outline" && "border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300",
        variant === "ghost" && "hover:bg-gray-800 text-gray-300",
        variant === "link" && "text-red-500 underline-offset-4 hover:underline",

        // Sizes
        size === "default" && "h-11 px-4 py-2",
        size === "sm" && "h-9 rounded-md px-3",
        size === "lg" && "h-12 rounded-md px-8 text-base",
        size === "icon" && "h-10 w-10",
        
        className
      )}
      disabled={isLoading}
      ref={ref}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
