"use client"
import React , { ReactNode} from "react";

const Button = ({
  children,
  onClick,
  variant,
  className,
}: {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`${
      variant === "outline"
        ? "bg-transparent border border-gray-500 hover:bg-gray-700"
        : "bg-blue-600 hover:bg-blue-500"
    } text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${className}`}
  >
    {children}
  </button>
);

export default Button