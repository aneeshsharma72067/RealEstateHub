import React, { MouseEventHandler } from "react";

type Props = {
  onclick: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<Props> = ({ onclick }) => {
  return (
    <button onClick={onclick} className="w-full bg-orange-500 text-white py-3 rounded-lg duration-300 hover:bg-orange-600">
      <span>Click</span>
    </button>
  );
};
