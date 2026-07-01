/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  Waves,
  Car,
  Compass,
  Trees,
  Award,
  Wind,
  Shield,
  Sparkles,
  Layers,
} from "lucide-react";

interface AmenityDesign {
  icon: React.ReactNode;
  name: string;
  description: string;
}

export default function DescriptionAmenities() {
  const revealContainerRef = useIntersectionObserver();

  const AMENITIES: AmenityDesign[] = [
    {
      icon: <Waves className="w-5 h-5" />,
      name: "Piscina Privada",
      description: "Magnífica zona de agua para el disfrute y relax en la intimidad del hogar.",
    },
    {
      icon: <Trees className="w-5 h-5" />,
      name: "Patio y Jardín",
      description: "Espacios exteriores ideales para barbacoas, ocio y descanso al aire libre.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      name: "Puerta Blindada",
      description: "Máxima seguridad y tranquilidad para toda la familia.",
    },
    {
      icon: <Car className="w-5 h-5" />,
      name: "Plaza de Garaje",
      description: "Estacionamiento privado incluido en la propia vivienda.",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      name: "Orientación Sur",
      description: "Excelente iluminación natural y calidez durante todas las estaciones del año.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      name: "Armarios Empotrados",
      description: "Distribución optimizada con amplio almacenamiento integrado de alta calidad.",
    },
    {
      icon: <Wind className="w-5 h-5" />,
      name: "Climatización Frío/Calor",
      description: "Sistema completo de aire acondicionado para un confort térmico constante.",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      name: "Vivienda Reformada",
      description: "Acabados modernos y materiales actualizados recientemente en perfecto estado.",
    },
  ];

  return (
    <section
      ref={revealContainerRef}
      className="py-24 px-6 md:px-12 bg-luxury-beige text-charcoal outline-none relative select-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Description (takes 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between reveal">
            <div>
              {/* Little label */}
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-gold tracking-[0.25em] text-xs font-semibold uppercase">
                  HACIENDA LA CARTUJA · TOMARES
                </span>
              </div>

              {/* Serif Title with elegant left-border of the Luxury theme */}
              <div className="border-l-2 border-gold pl-4 sm:pl-6 mb-8">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight text-charcoal">
                  Chalet Adosado en <br />
                  <span className="italic font-normal text-gold">Hacienda la Cartuja</span>
                </h2>
              </div>

              {/* Line divider */}
              <div className="w-16 h-[1px] bg-gold mb-8" />

              {/* Description Body */}
              <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed mb-6 font-light">
                Ubicado en la distinguida urbanización de Hacienda la Cartuja en Tomares, este chalet adosado destaca por su excelente estado de conservación tras haber sido reformado recientemente de manera integral. Su orientación inmejorable asegura una abundante luminosidad natural en cada uno de sus rincones durante todo el día.
              </p>
              
              <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed mb-6 font-light">
                La vivienda ofrece un estilo de vida excepcional y confortable gracias a sus magníficas zonas al aire libre, que incluyen una piscina privada perfecta para relajarse, un agradable jardín y un encantador patio privado donde disfrutar de agradables veladas exteriores.
              </p>

              <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed font-light mb-8 lg:mb-0">
                La propiedad cuenta además con una amplia terraza con vistas despejadas y una cómoda plaza de garaje, consolidándose como una opción idónea para quienes buscan la combinación perfecta entre tranquilidad residencial y proximidad a todos los servicios del Aljarafe sevillano.
              </p>
            </div>
          </div>

          {/* Right Column: Amenities Grid (takes 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center reveal">
            {/* Header label in Right column */}
            <h3 className="font-serif text-lg tracking-widest text-neutral-800 font-medium mb-10 pb-2 border-b border-neutral-200 uppercase">
              CARACTERÍSTICAS DESTACADAS
            </h3>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {AMENITIES.map((amenity, index) => (
                <div key={index} className="flex gap-4 group cursor-default">
                  {/* Icon wrap with golden accents */}
                  <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-luxury-warm border border-neutral-200 text-gold-dark group-hover:bg-gold group-hover:text-charcoal group-hover:border-gold transition-all duration-500">
                    {amenity.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal tracking-wide mb-1.5">
                      {amenity.name}
                    </h4>
                    <p className="font-sans text-xs text-neutral-500 leading-normal font-light">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
