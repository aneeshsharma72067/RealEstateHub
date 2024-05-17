import React, { MouseEventHandler } from "react";

type Props = {
  onclick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  className?: string;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  onclick,
  title,
  className,
  loading,
}) => {
  return (
    <button
      onClick={onclick}
      className={`w-full bg-orange-500 text-white py-3 rounded-lg duration-300 flex items-center justify-center gap-3 hover:bg-orange-600 ${className}`}
    >
      <span>{title}</span>
      {loading && <span className="w-5 h-5 rounded-full border-2 border-white border-b-transparent animate-spin"></span>}
    </button>
  );
};
