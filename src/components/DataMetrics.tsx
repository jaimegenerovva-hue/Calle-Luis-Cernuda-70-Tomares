/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Maximize2, BedDouble, Bath, Coins } from "lucide-react";

export default function DataMetrics() {
  return (
    <section className="bg-charcoal text-luxury-white w-full border-t border-b border-gold/15 py-10 px-6 sm:px-12 z-30 relative shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gold/20">
        
        {/* Metric 1: Superficie */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]" id="metric-superficie">
          <div className="w-12 h-12 flex items-center justify-center bg-gold/10 border border-gold/20 mb-3 text-gold">
            <Maximize2 className="w-5 h-5" />
          </div>
          <span className="text-luxury-white font-serif text-lg md:text-xl font-medium tracking-wide">
            340 m²
          </span>
        </div>

        {/* Metric 2: Dormitorios */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]" id="metric-dormitorios">
          <div className="w-12 h-12 flex items-center justify-center bg-gold/10 border border-gold/20 mb-3 text-gold">
            <BedDouble className="w-5 h-5" />
          </div>
          <span className="text-luxury-white font-serif text-lg md:text-xl font-medium tracking-wide">
            6 Dormitorios
          </span>
        </div>

        {/* Metric 3: Baños */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]" id="metric-banos">
          <div className="w-12 h-12 flex items-center justify-center bg-gold/10 border border-gold/20 mb-3 text-gold">
            <Bath className="w-5 h-5" />
          </div>
          <span className="text-luxury-white font-serif text-lg md:text-xl font-medium tracking-wide">
            4 Baños
          </span>
        </div>

        {/* Metric 4: Parcela */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]" id="metric-precio">
          <div className="w-12 h-12 flex items-center justify-center bg-gold/10 border border-gold/20 mb-3 text-gold">
            <Coins className="w-5 h-5" />
          </div>
          <span className="text-gold font-serif text-lg md:text-xl font-semibold tracking-wider">
            510.000 €
          </span>
        </div>

      </div>
    </section>
  );
}
