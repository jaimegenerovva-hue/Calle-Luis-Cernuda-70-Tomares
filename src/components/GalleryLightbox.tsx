/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GalleryItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

const GALLERY_PHOTOS: GalleryItem[] = [
  // --- TOP 8 KEY IMAGES (MAIN GALLERY) ---
  {
    id: 1,
    url: "https://i.ibb.co/pBGgKXSQ/piscina.png",
    title: "Piscina Privada Principal",
    category: "Patio y Piscina",
  },
  {
    id: 2,
    url: "https://i.ibb.co/00Rj9gm/Chat-GPT-Image-30-jun-2026-10-52-06.png",
    title: "Salón Principal y Comedor Integrado",
    category: "Salón",
  },
  {
    id: 3,
    url: "https://i.ibb.co/GQqQXHZp/Dormitorio-2.png",
    title: "Dormitorio Principal de Diseño",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 4,
    url: "https://i.ibb.co/CKJmQDRB/Ba-o.png",
    title: "Cuarto de Baño Principal Premium",
    category: "Baños",
  },
  {
    id: 5,
    url: "https://i.ibb.co/zD7V9mZ/Entrada-patio.png",
    title: "Entrada Directa al Patio y Jardín",
    category: "Patio y Piscina",
  },
  {
    id: 6,
    url: "https://i.ibb.co/bjvNJcdT/Chat-GPT-Image-30-jun-2026-10-50-34.png",
    title: "Salón con Chimenea y Detalles de Diseño",
    category: "Salón",
  },
  {
    id: 7,
    url: "https://i.ibb.co/1YvFzwWw/Terraza-2.png",
    title: "Terraza Superior Privada",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 8,
    url: "https://i.ibb.co/cK94hJm7/Porche.png",
    title: "Porche Cubierto para Relax Exterior",
    category: "Patio y Piscina",
  },

  // --- ADDITIONAL GALLERY IMAGES (COLLAPSIBLE) ---
  // --- SALÓN ---
  {
    id: 9,
    url: "https://i.ibb.co/mCN1W1hH/Chat-GPT-Image-30-jun-2026-10-48-18.png",
    title: "Detalle de Mobiliario y Luz de Salón",
    category: "Salón",
  },
  {
    id: 10,
    url: "https://i.ibb.co/WN5Y2Sj6/Chat-GPT-Image-29-jun-2026-12-44-22.png",
    title: "Salón de Estilo Contemporáneo",
    category: "Salón",
  },
  {
    id: 11,
    url: "https://i.ibb.co/Z1L5hbHz/Chat-GPT-Image-29-jun-2026-12-43-05.png",
    title: "Segundo Ambiente de Estar",
    category: "Salón",
  },
  {
    id: 12,
    url: "https://i.ibb.co/FqsPNkNQ/Chat-GPT-Image-29-jun-2026-12-35-57.png",
    title: "Salón Distribuidor de la Propiedad",
    category: "Salón",
  },
  {
    id: 13,
    url: "https://i.ibb.co/xS4Z22c6/Chat-GPT-Image-29-jun-2026-12-24-05.png",
    title: "Distribuidor y Escalera desde Salón",
    category: "Salón",
  },
  {
    id: 14,
    url: "https://i.ibb.co/k2XVPB4v/Chat-GPT-Image-29-jun-2026-12-31-12.png",
    title: "Zona de Comedor y Conectividad",
    category: "Salón",
  },

  // --- BAÑOS ---
  {
    id: 15,
    url: "https://i.ibb.co/nq2n7Csg/Ba-o-2.png",
    title: "Baño Secundario con Acabados Finos",
    category: "Baños",
  },
  {
    id: 16,
    url: "https://i.ibb.co/gFZH7sLR/Chat-GPT-Image-30-jun-2026-10-46-12.png",
    title: "Aseo de Cortesía Elegante",
    category: "Baños",
  },

  // --- PATIO, PISCINA, EXTERIOR ---
  {
    id: 17,
    url: "https://i.ibb.co/Cp81TbVH/Piscina-3.png",
    title: "Piscina Integrada con Zona de Solárium",
    category: "Patio y Piscina",
  },
  {
    id: 18,
    url: "https://i.ibb.co/LhkgLczy/piscina-2.png",
    title: "Vista Lateral de la Piscina Privada",
    category: "Patio y Piscina",
  },
  {
    id: 19,
    url: "https://i.ibb.co/s9pWBSQn/Entrada-patio-2.png",
    title: "Patio con Acceso Lateral y Luces",
    category: "Patio y Piscina",
  },

  // --- HABITACIONES, TERRAZAS, ESCALERAS ---
  {
    id: 20,
    url: "https://i.ibb.co/fG2zZPGn/Habitacion-3.png",
    title: "Dormitorio de Invitados con Armario",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 21,
    url: "https://i.ibb.co/6RzCpk46/Habitacion-2.png",
    title: "Habitación Individual Luminosa",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 22,
    url: "https://i.ibb.co/23WH2xGr/Habitacion-2-0.png",
    title: "Dormitorio Infantil Reformado",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 23,
    url: "https://i.ibb.co/bgMcjhL9/Habitacio-3-1.png",
    title: "Habitación Auxiliar Versátil",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 24,
    url: "https://i.ibb.co/7NLzWGzv/Cuarto-3-1.png",
    title: "Dormitorio con Suelos Reformados",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 25,
    url: "https://i.ibb.co/HT24BKMF/Cuarto-3.png",
    title: "Espacio de Descanso Adicional",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 26,
    url: "https://i.ibb.co/x8mq9jN3/Cuarto-2.png",
    title: "Habitación de Estilo Minimalista",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 27,
    url: "https://i.ibb.co/67gydWP1/Cuarto-1.png",
    title: "Habitación Sencilla Acogedora",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 28,
    url: "https://i.ibb.co/CpTzZcgk/terraza.png",
    title: "Terraza Exterior con Vistas Despejadas",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 29,
    url: "https://i.ibb.co/gb762ZCM/Balcon.png",
    title: "Balcón con Carpintería Nueva",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 30,
    url: "https://i.ibb.co/Y7SppvHt/balcon-2.png",
    title: "Detalle de Balcón y Climatización",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 31,
    url: "https://i.ibb.co/CpK4xPJt/Chat-GPT-Image-29-jun-2026-12-56-55.png",
    title: "Escalera con Distribuidor y Luz Cenital",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 32,
    url: "https://i.ibb.co/dwSSD2K6/Escalera.png",
    title: "Escalera de Mármol con Pasamanos de Diseño",
    category: "Habitaciones y Terrazas",
  },
  {
    id: 33,
    url: "https://i.ibb.co/F4mhHM4j/Escaleras-2.png",
    title: "Detalle de Escaleras e Iluminación",
    category: "Habitaciones y Terrazas",
  },
];

export default function GalleryLightbox() {
  const revealContainerRef = useIntersectionObserver();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      );
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    const section = document.getElementById("galeria");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      id="galeria"
      ref={revealContainerRef}
      className="py-24 px-6 md:px-12 bg-neutral-900 text-luxury-white overflow-hidden relative select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 reveal">
          <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-3">
            Inmersión Visual
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">
            Galería de la <span className="italic font-normal text-gold">Residencia</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-6 mb-4" />
          <p className="text-neutral-400 font-sans text-xs sm:text-sm font-light max-w-xl tracking-wide uppercase leading-normal">
            Fotografías reales de los espacios interiores, exteriores y vistas panorámicas.
          </p>
        </div>

        {/* Gallery grid - 1 col on mobile, 2 sm, 3 md, 4 lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {/* Main 8 items */}
          {GALLERY_PHOTOS.slice(0, 8).map((photo, index) => {
            const isEighth = index === 7;
            const showOverlay = isEighth && !isExpanded;

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (showOverlay) {
                    setIsExpanded(true);
                  } else {
                    openLightbox(index);
                  }
                }}
                className={`relative group overflow-hidden bg-black aspect-4/3 cursor-zoom-in transition-all duration-500 border border-neutral-800 hover:border-gold/50 ${
                  showOverlay ? "ring-1 ring-gold/10" : ""
                }`}
                id={`gallery-item-${photo.id}`}
              >
                {/* Photo */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />

                {showOverlay ? (
                  /* Special Elegant VER MÁS Overlay */
                  <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-[2.5px] flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:bg-neutral-950/75 border border-gold/10">
                    <span className="text-gold font-serif text-2xl font-light tracking-[0.2em] mb-1 drop-shadow-md group-hover:scale-105 transition-transform duration-500 text-center">
                      VER MÁS +
                    </span>
                    <span className="text-neutral-450 font-sans text-[9px] tracking-[0.2em] uppercase mt-2 text-center text-neutral-400">
                      +{GALLERY_PHOTOS.length - 8} FOTOS DE LA VIVIENDA
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Hover Dark Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                    {/* Hover details */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-gold font-sans text-[10px] tracking-widest uppercase mb-1">
                        {photo.category}
                      </span>
                      <h3 className="text-luxury-white font-serif text-base font-light tracking-wide mb-3">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gold font-sans text-[10px] tracking-widest uppercase">
                        <Maximize2 className="w-3 h-3" />
                        Ver en pantalla completa
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* Collapsible remaining items */}
          <AnimatePresence>
            {isExpanded &&
              GALLERY_PHOTOS.slice(8).map((photo, index) => {
                const globalIndex = index + 8;
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.02, 0.5), // optimize delay cascading
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => openLightbox(globalIndex)}
                    className="relative group overflow-hidden bg-black aspect-4/3 cursor-zoom-in transition-all duration-500 border border-neutral-800 hover:border-gold/50"
                    id={`gallery-item-${photo.id}`}
                  >
                    {/* Photo */}
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover Dark Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                    {/* Hover details */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-gold font-sans text-[10px] tracking-widest uppercase mb-1">
                        {photo.category}
                      </span>
                      <h3 className="text-luxury-white font-serif text-base font-light tracking-wide mb-3">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gold font-sans text-[10px] tracking-widest uppercase">
                        <Maximize2 className="w-3 h-3" />
                        Ver en pantalla completa
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Collapsible control button */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={handleCollapse}
              className="px-8 py-3.5 border border-gold/30 text-gold hover:text-charcoal hover:bg-gold hover:border-gold font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300 bg-neutral-950/50 cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.18)] focus:outline-none"
              id="btn-ver-menos"
            >
              Ver Menos —
            </button>
          </motion.div>
        )}

      </div>

      {/* Lightbox full-screen custom component */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-dark-pitch/95 z-50 flex items-center justify-center p-4 md:p-12 lightbox-overlay transition-opacity duration-300"
          id="lightbox-container"
        >
          {/* Top Controls Bar */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-luxury-white z-50">
            {/* Index label */}
            <span className="font-sans text-xs tracking-widest text-neutral-400 select-none">
              {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
            </span>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="w-11 h-11 flex items-center justify-center border border-white/10 text-white bg-neutral-950/60 hover:bg-gold hover:text-charcoal hover:border-gold transition-colors duration-300 cursor-pointer"
              title="Cerrar (Esc)"
              id="lightbox-close"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>
          </div>

          {/* Main Visual Container */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_PHOTOS[lightboxIndex].url}
              alt={GALLERY_PHOTOS[lightboxIndex].title}
              className="max-w-full max-h-full object-contain shadow-2xl border border-white/5 bg-black"
              referrerPolicy="no-referrer"
            />
            
            {/* Title / Info Overlay at the bottom */}
            <div className="absolute bottom-[-50px] left-0 right-0 text-center select-none">
              <span className="text-gold font-sans text-[10px] tracking-widest uppercase mb-1 block">
                {GALLERY_PHOTOS[lightboxIndex].category}
              </span>
              <p className="text-luxury-white font-serif text-sm sm:text-base font-light tracking-wide">
                {GALLERY_PHOTOS[lightboxIndex].title}
              </p>
            </div>
          </div>

          {/* Arrow Left Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 w-12 h-12 flex items-center justify-center border border-white/10 bg-neutral-950/60 hover:bg-gold hover:text-charcoal hover:border-gold text-luxury-white transition-all cursor-pointer z-50"
            title="Anterior (←)"
            id="lightbox-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Arrow Right Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 w-12 h-12 flex items-center justify-center border border-white/10 bg-neutral-950/60 hover:bg-gold hover:text-charcoal hover:border-gold text-luxury-white transition-all cursor-pointer z-50"
            title="Siguiente (→)"
            id="lightbox-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
