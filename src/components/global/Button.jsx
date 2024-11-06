import React from "react";

const Button = ({title}) => {
  return (
    <button class="w-[80px] h-[40px] text-[14px] font-main text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer">
      {title}
    </button>
  );
};

export default Button;
