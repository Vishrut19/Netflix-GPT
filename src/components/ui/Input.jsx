import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          Icon && "pl-10",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
