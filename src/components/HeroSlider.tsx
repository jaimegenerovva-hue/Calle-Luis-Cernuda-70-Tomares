/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SlideItem } from "../types";

const SLIDES: SlideItem[] = [
  {
    id: 1,
    image: "https://i.ibb.co/pBGgKXSQ/piscina.png",
    label: "LAS ALMENAS · TOMARES",
    title: "Amplitud, Privacidad y Calidad de Vida",
    subtitle: "",
  },
  {
    id: 2,
    image: "https://i.ibb.co/zD7V9mZ/Entrada-patio.png",
    label: "LAS ALMENAS · TOMARES",
    title: "Amplitud, Privacidad y Calidad de Vida",
    subtitle: "",
  },
  {
    id: 3,
    image: "https://i.ibb.co/Cp81TbVH/Piscina-3.png",
    label: "LAS ALMENAS · TOMARES",
    title: "Amplitud, Privacidad y Calidad de Vida",
    subtitle: "",
  },
  {
    id: 4,
    image: "https://i.ibb.co/1YvFzwWw/Terraza-2.png",
    label: "LAS ALMENAS · TOMARES",
    title: "Amplitud, Privacidad y Calidad de Vida",
    subtitle: "",
  },
  {
    id: 5,
    image: "https://i.ibb.co/F4mhHM4j/Escaleras-2.png",
    label: "LAS ALMENAS · TOMARES",
    title: "Amplitud, Privacidad y Calidad de Vida",
    subtitle: "",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = SLIDES.length;

  useEffect(() => {
    // 1. Preload the first slide image immediately in document head
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = SLIDES[0].image;
    document.head.appendChild(link);

    // 2. Progressive preloading of other images in the background after a small delay
    const preloadTimer = setTimeout(() => {
      SLIDES.slice(1).forEach((slide) => {
        const img = new Image();
        img.src = slide.image;
      });
    }, 100);

    return () => {
      document.head.removeChild(link);
      clearTimeout(preloadTimer);
    };
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, current]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <section
      id="agencia"
      className="relative h-[calc(100vh-45px)] w-full overflow-hidden bg-neutral-900 select-none group/hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides with AnimatePresence */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The Image */}
            <img
              src={SLIDES[current].image}
              alt={SLIDES[current].title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              loading={SLIDES[current].id === 1 ? "eager" : "lazy"}
              decoding="async"
            />
            {/* Dark Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-pitch via-charcoal/40 to-dark-pitch/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Center Branding Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20 pointer-events-none">
        <div className="max-w-4xl flex flex-col items-center">
          {/* Tagline label */}
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold tracking-[0.3em] text-xs font-sans md:text-sm font-semibold mb-4 uppercase drop-shadow"
          >
            {SLIDES[current].label}
          </motion.p>

          {/* Majestic Heading */}
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-luxury-white font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-wide leading-[1.1] mb-6 drop-shadow-xl"
          >
            {SLIDES[current].title}
          </motion.h1>

          {/* Underline Separator */}
          <motion.div
            key={`line-${current}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`w-24 h-[1px] bg-gold origin-center ${SLIDES[current].subtitle ? "mb-6" : "mb-10"}`}
          />

          {/* Subtitle */}
          {SLIDES[current].subtitle && (
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-neutral-200 font-sans text-sm sm:text-base md:text-lg font-light tracking-widest max-w-xl mx-auto mb-10 leading-relaxed drop-shadow"
            >
              {SLIDES[current].subtitle}
            </motion.p>
          )}

          {/* Call to action with pointer-events enabled */}
          <motion.div
            key={`btn-${current}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pointer-events-auto"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-gold/80 bg-charcoal/60 backdrop-blur-md px-8 py-4 text-xs font-sans font-semibold tracking-[0.25em] text-luxury-white hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-500 ease-in-out uppercase shadow-lg hover:shadow-gold/20"
              id="cta-visita-privada"
            >
              <Calendar className="w-4 h-4 text-gold dark:text-neutral-300 pointer-events-none group-hover:text-charcoal" />
              Solicitar visita privada
            </a>
          </motion.div>
        </div>
      </div>

      {/* Navigation Left / Right Arrows (Show elegantly on hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-luxury-white/20 rounded-none bg-charcoal/20 backdrop-blur-sm text-luxury-white hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300 opacity-0 group-hover/hero:opacity-100 z-30 cursor-pointer"
        aria-label="Anterior"
        id="slide-prev"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-luxury-white/20 rounded-none bg-charcoal/20 backdrop-blur-sm text-luxury-white hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300 opacity-0 group-hover/hero:opacity-100 z-30 cursor-pointer"
        aria-label="Siguiente"
        id="slide-next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(idx)}
            className={`w-2 h-2 transition-all duration-500 rounded-none cursor-pointer ${
              idx === current ? "bg-gold w-6" : "bg-luxury-white/40 hover:bg-luxury-white/80"
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
            id={`slide-dot-${idx}`}
          />
        ))}
      </div>
    </section>
  );
}
