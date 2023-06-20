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
    ? "outline-purple-400 hover:bg-purple-800/50 group-hover-bg-purple-200 group-focus-visible:bg-purple-200 focus-visible:bg-purple-200"
    : "outline-zinc-400 hover:bg-zinc-800 group-hover-bg-zinc-200 group-focus-visible:bg-zinc-200 focus-visible:bg-zinc-200";

  return (
    <div
      className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}
    >
      {children}
    </div>
  );
}
