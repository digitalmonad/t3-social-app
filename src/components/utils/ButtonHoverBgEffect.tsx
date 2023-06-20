import type { ReactNode } from "react";

type TButtonHoverEffectProps = {
  children: ReactNode;
  color?: boolean;
};

export function ButtonHoverBgEffect({
  children,
  color = false,
}: TButtonHoverEffectProps) {
  const colorClasses = color
    ? "outline-purple-400 hover:bg-purple-200 group-hover-bg-purple-200 group-focus-visible:bg-purple-200 focus-visible:bg-purple-200"
    : "outline-gray-400 hover:bg-gray-200 group-hover-bg-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200";

  return (
    <div
      className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}
    >
      {children}
    </div>
  );
}
