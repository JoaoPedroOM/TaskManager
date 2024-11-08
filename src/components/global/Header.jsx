import React from "react";
import Logo from "../../assets/img/logo.png";
import Button from "./Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-[#212428] flex justify-between items-center lg:px-48 md:px-20 sm:px-10 px-2 py-[6px] shadow-lg">

      <Link to="/" className="flex items-center">
        <img className="w-16 h-auto" src={Logo} alt="Logo" />
        <p className="font-main lg:text-[24px] text-[16px] text-[#d4d5d6] font-bold">
          Task Manager
        </p>
      </Link>

      <Button title="Entrar"/>
    </nav>
  );
};

export default Header;
