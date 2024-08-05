import * as React from "react";
import {
  NumericFormat,
  PatternFormat,
  NumericFormatProps,
  PatternFormatProps,
} from "react-number-format";

import { cn } from "@/lib/utils";

const NumericInput = React.forwardRef<HTMLInputElement, NumericFormatProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <NumericFormat
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
        getInputRef={ref}
      />
    );
  }
);

const PatternInput = React.forwardRef<HTMLInputElement, PatternFormatProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <PatternFormat
        getInputRef={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";
PatternInput.displayName = "PatternInput";

export { NumericInput, PatternInput };
