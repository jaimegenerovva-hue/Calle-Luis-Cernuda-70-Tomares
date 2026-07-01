/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-pitch text-luxury-white py-16 px-6 md:px-12 border-t border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Agency brand/description (takes 4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-gold" />
              <span className="font-serif text-base tracking-wider font-light text-luxury-white uppercase">
                COMPRARCASA <span className="text-gold italic font-normal">SUHOGAR SEVILLA</span>
              </span>
            </div>
            
            <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
              Especialistas en la compra, venta y comercialización de viviendas en Sevilla y Aljarafe.
            </p>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
              Trabajamos con herramientas avanzadas de marketing inmobiliario, valoración profesional, visitas virtuales y estrategias orientadas a obtener los mejores resultados para nuestros clientes.
            </p>
            
            <div className="flex flex-wrap gap-4 text-neutral-400">
              <a 
                href="https://www.instagram.com/comprarcasasuhogarsevilla/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors text-xs font-sans uppercase"
              >
                Instagram
              </a>
              <span className="text-neutral-700">|</span>
              <a 
                href="https://www.facebook.com/comprarcasasuhogarsevilla/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors text-xs font-sans uppercase"
              >
                Facebook
              </a>
              <span className="text-neutral-700">|</span>
              <a 
                href="https://www.linkedin.com/company/comprarcasa-suhogar-sevilla/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors text-xs font-sans uppercase"
              >
                LinkedIn
              </a>
              <span className="text-neutral-700">|</span>
              <a 
                href="https://www.youtube.com/user/Comprarcasa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors text-xs font-sans uppercase"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (takes 4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-gold font-sans text-xs tracking-widest font-semibold uppercase">
              Secciones
            </h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-sans text-xs text-neutral-400">
              <a href="#" className="hover:text-gold transition-colors font-light">Inicio</a>
              <a href="#galeria" className="hover:text-gold transition-colors font-light">Galería</a>
              <a href="#ubicacion" className="hover:text-gold transition-colors font-light">Ubicación</a>
              <a 
                href="https://suhogar.comprarcasa.com/landing/calculadora-hipoteca" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors font-light"
              >
                Calculadora Hipoteca
              </a>
              <a 
                href="https://suhogar.comprarcasa.com/landing/valorador" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors font-light"
              >
                Valora tu Vivienda
              </a>
              <a href="#contacto" className="hover:text-gold transition-colors font-light">Contacto</a>
            </div>
          </div>

          {/* Column 3: Services (takes 4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-gold font-sans text-xs tracking-widest font-semibold uppercase">
              Servicios
            </h3>
            
            <div className="space-y-3 font-sans text-xs text-neutral-400 font-light">
              <div className="hover:text-gold transition-colors cursor-default">Valoración Gratuita</div>
              <div className="hover:text-gold transition-colors cursor-default">Venta de Viviendas</div>
              <div className="hover:text-gold transition-colors cursor-default">Compra de Viviendas</div>
              <div className="hover:text-gold transition-colors cursor-default">Marketing Inmobiliario</div>
              <div className="hover:text-gold transition-colors cursor-default">Asesoramiento Hipotecario</div>
              <div className="hover:text-gold transition-colors cursor-default">Gestión Integral</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and compliance info */}
        <div className="border-t border-neutral-900/80 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-neutral-500 text-[11px] font-sans">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-gold/60" />
            <span>© 2026 Comprarcasa SuHogar Sevilla. Todos los derechos reservados.</span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-end items-center font-light">
            <a href="#" className="hover:text-gold transition-colors">Aviso Legal</a>
            <span className="text-neutral-800">·</span>
            <a href="#" className="hover:text-gold transition-colors">Política de Privacidad</a>
            <span className="text-neutral-800">·</span>
            <a href="#" className="hover:text-gold transition-colors">Política de Cookies</a>
            <span className="text-neutral-800">·</span>
            <a href="#" className="hover:text-gold transition-colors">Términos y Condiciones</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
