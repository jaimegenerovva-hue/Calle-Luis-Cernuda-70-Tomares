/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function MapLocation() {
  const revealContainerRef = useIntersectionObserver();
  const [iframeHeight, setIframeHeight] = React.useState(500);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "resize-iframe") {
        setIframeHeight(event.data.height);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const inmozoneHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      background: transparent;
      overflow: visible;
    }
    body {
      padding: 10px 10px 40px 10px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <!-- InmoZone Kit (recortado): Calle Luis Cernuda,70,Tomares — solo Mapa + Puntos de interés -->
  <div id="inmozone-root-1782919438013" class="inmozone-wrapper">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
      .inmozone-wrapper { font-family: 'Inter', sans-serif; max-width: 100vw; width: 100%; box-sizing: border-box; overflow: hidden; margin: 0; background: #050505; color: white; border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5); }
      .iz-grid, .iz-sidebar, #iz-map { box-sizing: border-box; }
      .iz-grid { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 0; align-items: stretch; width: 100%; max-width: 100%; box-sizing: border-box; }
      .iz-grid > * { min-width: 0; }
      #iz-map { height: 100%; min-height: 450px; width: 100%; min-width: 0; }
      .iz-sidebar { padding: 40px; background: rgba(255,255,255,0.02); border-left: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; min-width: 0; }
      .iz-tabs { display: flex; gap: 10px; margin-bottom: 30px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; position: relative; -webkit-overflow-scrolling: touch; -webkit-mask-image: linear-gradient(to right, white 85%, transparent 100%); mask-image: linear-gradient(to right, white 85%, transparent 100%); }
      .iz-tabs::-webkit-scrollbar { display: none; }
      .iz-tab { padding: 10px 20px; border-radius: 100px; font-size: 10px; font-weight: 800; cursor: pointer; white-space: nowrap; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); }
      .iz-tab.active { background: #F43434; color: white; border-color: #F43434; box-shadow: 0 0 20px #F434344D; }
      .iz-list { display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 450px; padding-right: 10px; }
      .iz-list::-webkit-scrollbar { width: 4px; }
      .iz-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      .iz-item { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-radius: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; }
      .iz-item:hover { border-color: #F434344D; background: rgba(255,255,255,0.05); }
      .iz-item-info { display: flex; flex-direction: column; }
      .iz-item-name { font-weight: 700; font-size: 14px; color: white; }
      .iz-item-meta { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.6); margin-top: 4px; font-weight: 800; }
      .iz-distance { font-size: 10px; font-weight: 800; color: #F43434; background: #F434341A; padding: 4px 12px; border-radius: 100px; text-transform: uppercase; }
      .leaflet-popup-content-wrapper { min-width: 120px !important; border-radius: 12px !important; }
      .leaflet-popup-content { min-width: 80px !important; white-space: normal !important; word-wrap: break-word !important; overflow-wrap: break-word !important; font-size: 14px !important; line-height: 1.4 !important; margin: 10px 14px !important; }
      @media (max-width: 1024px) {
        .iz-grid { display: grid; grid-template-columns: 1fr; }
        .iz-sidebar { padding: 24px 16px; width: 100%; box-sizing: border-box; border-left: none; border-top: 1px solid rgba(255,255,255,0.1); }
        .iz-tabs { width: 100%; flex-wrap: wrap; overflow-x: visible; gap: 8px; -webkit-mask-image: none; mask-image: none; }
        .iz-tab { font-size: 9px; padding: 8px 14px; }
        #iz-map { height: 350px; min-height: 350px; }
      }
    </style>

    <div class="iz-grid">
      <div id="iz-map"></div>
      <div class="iz-sidebar">
        <div class="iz-tabs" id="iz-tabs-container">
          <div class="iz-tab active" onclick="izFilter('all', this)">Todos</div>
          <div class="iz-tab" onclick="izFilter('school', this)">Educación</div>
          <div class="iz-tab" onclick="izFilter('hospital', this)">Salud</div>
          <div class="iz-tab" onclick="izFilter('supermarket', this)">Compras</div>
          <div class="iz-tab" onclick="izFilter('restaurant', this)">Gastronomía</div>
          <div class="iz-tab" onclick="izFilter('park', this)">Parques</div>
        </div>
        <div class="iz-list" id="iz-list-container"></div>
      </div>
    </div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      (function() {
        const pois = [{"name":"Mercadona","type":"supermarket","lat":37.371883,"lng":-6.035812,"distance":"4 min"},{"name":"Carrefour","type":"supermarket","lat":37.367249,"lng":-6.035727,"distance":"3 min"},{"name":"Restaurante Casa Esteban","type":"restaurant","lat":37.372295,"lng":-6.03553,"distance":"5 min"},{"name":"Restaurante Kaori","type":"restaurant","lat":37.372271,"lng":-6.037044,"distance":"4 min"},{"name":"Quirónsalud Medical Center Aljarafe","type":"hospital","lat":37.368445,"lng":-6.041097,"distance":"5 min"},{"name":"Parque El Carmen","type":"park","lat":37.371725,"lng":-6.040052,"distance":"5 min"},{"name":"Escuela Infantil El Carmen","type":"school","lat":37.372159,"lng":-6.040592,"distance":"6 min"},{"name":"Centris Inglés School","type":"school","lat":37.367549,"lng":-6.040871,"distance":"5 min"},{"name":"Restaurante Mocka Tomares","type":"restaurant","lat":37.372092,"lng":-6.035475,"distance":"5 min"},{"name":"Parque Olivar del Zaudin","type":"park","lat":37.367259,"lng":-6.052338,"distance":"15 min"},{"name":"Supercor Exprés","type":"supermarket","lat":37.372695,"lng":-6.046784,"distance":"11 min"},{"name":"Centro de Salud de Tomares","type":"hospital","lat":37.372235,"lng":-6.046136,"distance":"10 min"}];
        const typeMap = {"school":"Educación","hospital":"Salud","supermarket":"Compras","restaurant":"Gastronomía","park":"Parques","all":"Todos"};
        const center = [37.369253, -6.03688];
        const popupMaxWidth = Math.min(250, window.innerWidth - 60);
        let map, mainMarker;
        const poiMarkers = {};

        function sendHeight() {
          const height = document.documentElement.scrollHeight || document.body.scrollHeight;
          window.parent.postMessage({ type: 'resize-iframe', height: height }, '*');
        }
        window.addEventListener('load', sendHeight);
        window.addEventListener('resize', sendHeight);
        setTimeout(sendHeight, 300);
        setTimeout(sendHeight, 1000);

        function initInmoZoneMap() {
          map = L.map('iz-map', { scrollWheelZoom: false }).setView(center, 15);
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
          }).addTo(map);

          const mainIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          mainMarker = L.marker(center, { icon: mainIcon }).addTo(map).bindPopup('Propiedad', { minWidth: 100, maxWidth: popupMaxWidth, autoPanPadding: [20, 20] }).openPopup();

          pois.forEach(p => {
            const m = L.marker([p.lat, p.lng]).bindPopup(p.name, { minWidth: 100, maxWidth: popupMaxWidth, autoPanPadding: [20, 20] });
            poiMarkers[p.name] = m;
          });

          izFilter('all', document.querySelector('.iz-tab.active'));
        }

        window.izFilter = function(type, el) {
          if (el) {
            document.querySelectorAll('.iz-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
          }

          Object.values(poiMarkers).forEach(m => map.removeLayer(m));
          const filtered = type === 'all' ? pois : pois.filter(p => p.type === type);
          filtered.forEach(p => {
            poiMarkers[p.name].addTo(map);
          });

          map.setView(center, 15);
          renderList(type);
          setTimeout(sendHeight, 100);
        };

        window.izFocusPoi = function(name) {
          Object.values(poiMarkers).forEach(m => map.removeLayer(m));
          const marker = poiMarkers[name];
          if (marker) {
            marker.addTo(map);
            map.setView(marker.getLatLng(), 16);
            marker.openPopup();
          }
          setTimeout(sendHeight, 100);
        };

        function renderList(type) {
          const container = document.getElementById('iz-list-container');
          container.innerHTML = '';
          const filtered = type === 'all' ? pois : pois.filter(p => p.type === type);
          filtered.forEach(p => {
            const item = document.createElement('div');
            item.className = 'iz-item';
            item.onclick = () => window.izFocusPoi(p.name);
            item.innerHTML = 
              '<div class="iz-item-info">' +
              '  <span class="iz-item-name">' + p.name + '</span>' +
              '  <span class="iz-item-meta">' + (typeMap[p.type] || p.type) + '</span>' +
              '</div>' +
              '<span class="iz-distance">' + (p.distance || 'Cerca') + '</span>';
            container.appendChild(item);
          });
          setTimeout(sendHeight, 50);
        }

        if (document.readyState === 'complete') {
          initInmoZoneMap();
        } else {
          window.addEventListener('load', initInmoZoneMap);
        }
      })();
    </script>
  </div>
</body>
</html>`;

  return (
    <section
      id="ubicacion"
      ref={revealContainerRef}
      className="py-24 px-6 md:px-12 bg-luxury-beige text-charcoal relative select-none overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 reveal">
          <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase mb-3">
            Ubicación Exclusiva
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-charcoal">
            Ubicación <span className="italic font-normal text-gold">Privilegiada</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-6 mb-4" />
          <p className="text-neutral-500 font-sans text-xs sm:text-sm font-light max-w-xl tracking-wide uppercase leading-normal">
            En el corazón del Triángulo de Oro de la Costa del Sol, un refugio andaluz de privacidad absoluta.
          </p>
        </div>

        {/* Map Container - Full width seamless dark container matching brand */}
        <div className="reveal w-full max-w-full overflow-visible">
          <iframe
            srcDoc={inmozoneHtml}
            title="Mapa interactivo de puntos de interés de la zona"
            style={{ height: `${iframeHeight}px` }}
            className="w-full border-none block bg-transparent transition-all duration-300 overflow-visible"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </section>
  );
}
