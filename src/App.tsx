/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Topbar from "./components/Topbar";
import HeroSlider from "./components/HeroSlider";
import DataMetrics from "./components/DataMetrics";
import DescriptionAmenities from "./components/DescriptionAmenities";
import GalleryLightbox from "./components/GalleryLightbox";
import MapLocation from "./components/MapLocation";
import ContactInquiry from "./components/ContactInquiry";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-luxury-beige text-charcoal flex flex-col font-sans select-none antialiased">
      {/* 1. BARRA SUPERIOR (topbar) */}
      <Topbar />

      {/* Floating Sticky Sub-Navbar (Agency Brand Banner) */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3 px-6 md:px-12 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo Image with auto size adjustment */}
          <a href="https://suhogar.comprarcasa.com/" className="flex items-center" id="agency-logo">
            <img 
              src="https://www.comprarcasa.com/assets/img/logo/logo-cc.png" 
              alt="Comprarcasa Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
            />
          </a>

          {/* Quick Smooth Navigation links for the Luxury estate page */}
          <nav className="hidden md:flex items-center gap-8 text-neutral-500 text-xs font-sans font-bold tracking-widest uppercase">
            <a href="#galeria" className="hover:text-gold transition-colors">Galería</a>
            <a 
              href="https://suhogar.comprarcasa.com/landing/calculadora-hipoteca" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gold transition-colors"
            >
              Calculadora Hipoteca
            </a>
            <a 
              href="https://suhogar.comprarcasa.com/landing/valorador" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gold transition-colors"
            >
              Valora tu vivienda
            </a>
          </nav>

          {/* Small drawer trigger icon in mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden w-10 h-10 flex items-center justify-center text-charcoal hover:text-gold cursor-pointer transition-colors" 
            aria-label="Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu with transition for exceptional usability */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white border-t border-neutral-100 mt-2"
            >
              <div className="flex flex-col gap-4 py-4 px-2 text-charcoal text-xs font-sans font-bold tracking-widest uppercase">
                <a 
                  href="#galeria" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-gold transition-colors py-2 border-b border-neutral-50"
                >
                  Galería
                </a>
                <a 
                  href="https://suhogar.comprarcasa.com/landing/calculadora-hipoteca" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gold transition-colors py-2 border-b border-neutral-50"
                >
                  Calculadora Hipoteca
                </a>
                <a 
                  href="https://suhogar.comprarcasa.com/landing/valorador" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gold transition-colors py-2"
                >
                  Valora tu vivienda
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 2. HEADER HERO con SLIDER DE IMÁGENES */}
        <HeroSlider />

        {/* 3. BARRA DE DATOS CLAVE */}
        <DataMetrics />

        {/* 4. DESCRIPCIÓN Y CARACTERÍSTICAS */}
        <DescriptionAmenities />

        {/* 5. GALERÍA DE IMÁGENES */}
        <GalleryLightbox />

        {/* 7. UBICACIÓN Y MAPA */}
        <MapLocation />

        {/* 8. FORMULARIO DE CONTACTO / SOLICITUD DE VISITA */}
        <ContactInquiry />
      </main>

      {/* 9. FOOTER */}
      <Footer />

      {/* Scroll-To-Top Button (interactive) */}
      <ScrollToTop />
    </div>
  );
}
