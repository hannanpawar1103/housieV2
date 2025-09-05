import React from "react";

type NumbersCalledProps = {
  children: React.ReactNode;
};

export default function NumbersCalled({ children }: NumbersCalledProps) {
  return (
    <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
      {children}
    </div>
  );
}