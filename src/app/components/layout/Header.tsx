"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeaderComp() {
  const [showNav, setShowNav] = useState(false);

  const openNav = () => {
    setShowNav(!showNav);
  };
  return (
    <header>
      <div className="lg:hidden relative flex items-center bg-[#DEDFD8] h-22 px-4">
        {/* Burger */}
        <button onClick={openNav} className="z-10">
          <Image
            src="/logo/burger-bar.png"
            alt="burger"
            width={35}
            height={35}
            priority
            unoptimized
          />
        </button>

        {/* Logo centrado real */}
        <div className="absolute left-1/2 -translate-x-1/2 pt-2">
          <Image
            src="/logo/logo-mobile.png"
            alt="Logo"
            width={243}
            height={71}
            priority
            unoptimized
          />
        </div>
      </div>

      <div
        className={` ${
          showNav ? "flex" : "hidden"
        } flex-col items-center fixed  top-0 left-0 w-screen h-125  bg-[rgba(53,47,47,0.96)]
 z-50 rounded-b-4xl`}
      >
        <div className="flex w-full justify-between px-4 py-4">
          <div onClick={openNav}>
            <Image
              src="/logo/close.png"
              alt="Logo"
              width={23}
              height={23}
            ></Image>
          </div>
        </div>

        <a
          className="py-5 text-[25px] font-serif font-semibold text-[#A6A6A6]"
          href="#planes"
          onClick={openNav}
        >
          PLANES
        </a>
        <a
          className="py-5 text-[25px] font-serif font-semibold text-[#A6A6A6]"
          href="#sobre-mi"
          onClick={openNav}
        >
          SOBRE MÍ
        </a>
        <a
          className="py-5 text-[25px] font-serif font-semibold text-[#A6A6A6]"
          href="#contacto"
          onClick={openNav}
        >
          CONTACTO
        </a>
      </div>

      <div className="hidden lg:flex justify-between bg-[#DEDFD8] h-21.5">
        <div className="cursor-pointer">
          <Image
            src="/logo/logo.png"
            alt="Logo-NutricionxSofia"
            width={361}
            height={80}
            priority
            unoptimized
          />
        </div>

        <nav className="flex px-10">
          <ul className="flex justify-center items-center gap-12">
            <li>
              <a
                className="font-sans font-normal text-[#A6A6A6] text-base cursor-pointer hover:text-white transition-colors duration-500 ease-in-out"
                href="#planes"
              >
                Planes
              </a>
            </li>
            <li>
              <a
                className="font-sans font-normal text-[#A6A6A6] text-base cursor-pointer hover:text-white transition-colors duration-500 ease-in-out"
                href="#sobre-mi"
              >
                Sobre mí
              </a>
            </li>
            <li>
              <a
                className="
                    inline-flex items-center justify-center
                    px-5 py-2
                    border border-[#A6A6A6]
                    rounded-lg
                    font-sans font-medium text-[#A6A6A6] text-base cursor-pointer
                    transition-colors duration-300 ease-in-out 
                    hover:text-white hover:border-white
                     "
                href="#contacto"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
