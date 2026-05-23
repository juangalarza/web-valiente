"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-400 ease-out",
        isScrolled
          ? "h-[70px] bg-white/85 shadow-lg backdrop-blur-lg"
          : "h-[80px] bg-white/70 backdrop-blur-2xl border-b border-white/30"
      )}
    >
      <div className="section-container h-full flex items-center justify-between">
        <Link href="/" className="flex items-center no-underline">
          <Image
            src="/logo-valiente.png"
            alt="Valiente Logo"
            width={230}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {["Marcas", "Modelos", "Nosotros"].map((item) => (
            <li key={item}>
              <Link
                href={`/#${item.toLowerCase()}`}
                className="font-barlow-condensed text-[0.78rem] tracking-[0.18em] uppercase text-gray-600 hover:text-dark transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-right group-hover:origin-left" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contacto"
              className="bg-primary text-white px-7 py-3 font-barlow-condensed text-[0.78rem] font-bold tracking-[0.18em] uppercase rounded-[4px] shadow-[0_4px_15px_rgba(200,16,46,0.2)] hover:shadow-[0_8px_25px_rgba(200,16,46,0.3)] hover:-translate-y-0.5 transition-all"
            >
              Cotizar ahora
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
