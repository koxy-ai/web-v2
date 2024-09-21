import React from "react";
import { codeTheme, type CodeThemeProps } from "@tailus/themer";

export interface CodeProps
  extends React.HTMLAttributes<HTMLPreElement>,
    CodeThemeProps {}
export const Code = React.forwardRef<HTMLPreElement, CodeProps>(function Code(
  { intent = "gray", children, className, ...props },
  ref
) {
  return (
    <code ref={ref} className={codeTheme({ intent, className })} {...props}>
      {children}
    </code>
  );
});
