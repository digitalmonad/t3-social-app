import React from "react";

type TButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  small,
  gray,
  className = "",
  children,
  ...props
}: TButtonProps) => {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  const colorClasses = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-purple-500 hover:bg-purple-400 focus-visible:bg-purple-400";
  return (
    <button
      className={`transition-color self-end rounded-full text-white duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
