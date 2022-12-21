export const handleCss = (defaultCss: string, className?: string) => {
  if (className) return className;
  return defaultCss;
};

export const checkFunctionType = (f: any) => {
  return f && typeof f === "function";
};
