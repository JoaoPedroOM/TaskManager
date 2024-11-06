import React from "react";
import Logo from "../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="rounded-lg">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://github.com/JoaoPedroOM/TaskManager"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img className="w-10 h-auto" src={Logo} alt="Logo" />
            <p className="font-main text-[14px] text-[#d4d5d6] font-bold">
              Task Manager
            </p>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
            <li>
              <a href="https://www.linkedin.com/in/joaopedroom/" className="hover:underline me-4 md:me-6">
                Sobre
              </a>
            </li>
            <li>
              <a href="https://github.com/JoaoPedroOM" className="hover:underline">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center">
          © 2024{" "}
          <a href="https://github.com/JoaoPedroOM" className="hover:underline">
            João Pedro™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
