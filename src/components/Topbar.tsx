/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Phone, Globe } from "lucide-react";

export default function Topbar() {
  const [lang, setLang] = useState<"ES" | "EN">("ES");

  return (
    <div className="w-full bg-charcoal text-luxury-white border-b border-gold/20 py-2 sm:py-2.5 px-3 sm:px-6 md:px-12 text-[10px] sm:text-xs select-none tracking-widest uppercase z-50 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        {/* Left: Agency Links with elegant smooth scroll */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-6 md:gap-8 gap-y-1 text-neutral-300 font-sans font-medium text-[9px] sm:text-[11px] md:text-xs tracking-wider sm:tracking-widest">
          <a
            href="https://suhogar.comprarcasa.com/"
            className="hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
            id="nav-agencia"
          >
            Nuestra agencia
            <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="https://suhogar.comprarcasa.com/inmuebles"
            className="hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
            id="nav-propiedades"
          >
            Otras propiedades
          </a>
          <a
            href="https://suhogar.comprarcasa.com/noticias"
            className="hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
            id="nav-blog"
          >
            Blog
          </a>
          <a
            href="https://suhogar.comprarcasa.com/contacto"
            className="hover:text-gold transition-colors duration-300 relative group whitespace-nowrap"
            id="nav-contacto"
          >
            Contacto
          </a>
        </div>

        {/* Right: Phone Call & Luxury Language Selector */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-neutral-300 text-[10px] sm:text-xs mt-1 sm:mt-0">
          <a
            href="tel:+34635475213"
            className="flex items-center gap-1.5 hover:text-gold transition-colors duration-300 font-sans font-semibold tracking-wider text-luxury-white whitespace-nowrap"
            id="top-phone"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
            635 475 213
          </a>
          
          <div className="flex items-center gap-1.5 border-l border-neutral-700 pl-3 sm:pl-4">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
            <button
              onClick={() => setLang(lang === "ES" ? "EN" : "ES")}
              className="hover:text-gold font-sans font-bold tracking-widest cursor-pointer transition-colors"
              id="top-lang"
              title="Cambiar idioma / Change language"
            >
              {lang}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
