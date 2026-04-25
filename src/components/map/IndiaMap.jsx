


// plugin change 


// import { useState, useEffect, useRef, useMemo } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import { useApp } from '../../context/AppContext';

// // ── Map defaults per country ──────────────────────────────────────────────────
// const COUNTRY_VIEW = {
//   India:  { center: [82.5, 22.5], zoom: 4.5 },
//   Bhutan: { center: [90.5, 27.5], zoom: 7.5 },
//   All:    { center: [84.0, 24.0], zoom: 4.5 },
// };

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// // ── Free tile providers (₹0 cost) ────────────────────────────────────────────
// const TILE_LAYERS = {
//   Dark: {
//     style: {
//       version: 8,
//       sources: {
//         'carto-dark': {
//           type: 'raster',
//           tiles: [
//             'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
//             'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
//             'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
//           ],
//           tileSize: 256,
//           attribution: '© CARTO © OpenStreetMap contributors',
//           maxzoom: 19,
//         },
//       },
//       layers: [{ id: 'carto-dark-layer', type: 'raster', source: 'carto-dark' }],
//     },
//   },
//   Terrain: {
//     style: {
//       version: 8,
//       sources: {
//         'osm-terrain': {
//           type: 'raster',
//           tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
//           tileSize: 256,
//           attribution: '© OpenTopoMap contributors',
//           maxzoom: 17,
//         },
//       },
//       layers: [{ id: 'osm-terrain-layer', type: 'raster', source: 'osm-terrain' }],
//     },
//   },
//   Satellite: {
//     style: {
//       version: 8,
//       sources: {
//         'esri-satellite': {
//           type: 'raster',
//           tiles: [
//             'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//           ],
//           tileSize: 256,
//           attribution: '© Esri',
//           maxzoom: 19,
//         },
//       },
//       layers: [{ id: 'esri-satellite-layer', type: 'raster', source: 'esri-satellite' }],
//     },
//   },
// };

// // ── Known Bhutan districts ────────────────────────────────────────────────────
// const BHUTAN_DISTRICTS = [
//   'Zhemgang District', 'Trashigang District', 'Samdrup Jongkhar District',
//   'Chukha District', 'Punakha District', 'Thimphu District',
//   'Paro District', 'Chelela Pass', 'Dochula Pass',
// ];

// // ── Coordinate validity ───────────────────────────────────────────────────────
// function isRenderableCoord(lat, lng) {
//   return (
//     lat != null && lng != null &&
//     !isNaN(lat) && !isNaN(lng) &&
//     isFinite(lat) && isFinite(lng) &&
//     lat !== 0 && lng !== 0 &&
//     lat >= 6.0  && lat <= 37.5 &&
//     lng >= 68.0 && lng <= 97.5
//   );
// }

// // ── Pin color — never red ─────────────────────────────────────────────────────
// function pinColor(s) {
//   return CONFIDENCE_COLORS[s.confidence] ?? CONFIDENCE_COLORS.Confirmed;
// }

// // ── SVG pin HTML for MapLibre custom marker ───────────────────────────────────
// function makePinEl(color, selected = false) {
//   const size = selected ? 28 : 22;
//   const el = document.createElement('div');
//   el.style.cssText = 'display:flex;flex-direction:column;align-items:center;cursor:pointer;';
//   el.innerHTML = `
//     <div style="
//       width:${size}px;height:${size}px;
//       background:${color};border-radius:50%;
//       border:2px solid white;
//       box-shadow:0 2px 6px rgba(0,0,0,.45);
//       transition:transform .15s;
//     "></div>
//     <div style="width:2px;height:${size}px;background:${color};opacity:.85;"></div>
//   `;
//   return el;
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();

//   const mapContainer = useRef(null);
//   const mapRef       = useRef(null);
//   const markersRef   = useRef([]);   // array of { marker, popup, sighting }
//   const popupRef     = useRef(null); // currently open MapLibre Popup

//   const [tileKey,  setTileKey]  = useState('Dark');
//   const [selected, setSelected] = useState(null);

//   const selectedCountry = state.mapFilter?.country || 'India';
//   const selectedRegion  = state.mapFilter?.region  || 'All';

//   // ── Country options ───────────────────────────────────────────────────────
//   const countryOptions = useMemo(() => {
//     const names = new Set(state.sightings.map(s => s.country).filter(Boolean));
//     return ['All Countries', ...Array.from(names).sort()];
//   }, [state.sightings]);

//   // ── Region options ────────────────────────────────────────────────────────
//   const regionOptions = useMemo(() => {
//     if (!selectedCountry || selectedCountry === 'All Countries') return [];
//     if (selectedCountry === 'Bhutan') {
//       const fromData = new Set(
//         state.sightings.filter(s => s.country === 'Bhutan' && s.district).map(s => s.district)
//       );
//       BHUTAN_DISTRICTS.forEach(d => fromData.add(d));
//       return ['All Districts', ...Array.from(fromData).sort()];
//     }
//     const names = new Set(
//       state.sightings.filter(s => s.country === 'India' && s.state).map(s => s.state)
//     );
//     return ['All States', ...Array.from(names).sort()];
//   }, [selectedCountry, state.sightings]);

//   // ── Filtered sightings (GPS-only, exact state match) ─────────────────────
//   const visibleSightings = useMemo(() => {
//     return sightings.filter(s => {
//       const lat = Number(s.lat);
//       const lng = Number(s.lng);
//       if (!isRenderableCoord(lat, lng)) return false;
//       if (s.approximate) return false;

//       if (selectedCountry && selectedCountry !== 'All Countries') {
//         if (s.country !== selectedCountry) return false;
//       }

//       const isAllRegion =
//         !selectedRegion || selectedRegion === 'All' ||
//         selectedRegion === 'All States' || selectedRegion === 'All Districts';

//       if (!isAllRegion) {
//         const rv = selectedCountry === 'Bhutan'
//           ? (s.district || '').trim()
//           : (s.state    || '').trim();
//         if (rv !== selectedRegion.trim()) return false;
//       }
//       return true;
//     });
//   }, [sightings, selectedCountry, selectedRegion]);

//   // ── Init map ──────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (mapRef.current || !mapContainer.current) return;

//     const map = new maplibregl.Map({
//       container: mapContainer.current,
//       style:     TILE_LAYERS[tileKey].style,
//       center:    COUNTRY_VIEW.India.center,
//       zoom:      COUNTRY_VIEW.India.zoom,
//       minZoom:   3,
//       maxZoom:   16,
//       attributionControl: false,
//     });

//     map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
//     map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

//     mapRef.current = map;

//     // Cleanup
//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//   }, []); // eslint-disable-line

//   // ── Swap tile style when tileKey changes ──────────────────────────────────
//   useEffect(() => {
//     if (!mapRef.current) return;
//     mapRef.current.setStyle(TILE_LAYERS[tileKey].style);
//   }, [tileKey]);

//   // ── Re-render markers whenever visibleSightings changes ──────────────────
//   useEffect(() => {
//     const map = mapRef.current;
//     if (!map) return;

//     // Remove existing markers
//     markersRef.current.forEach(({ marker }) => marker.remove());
//     markersRef.current = [];
//     if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
//     setSelected(null);

//     const addMarkers = () => {
//       visibleSightings.forEach(s => {
//         const lat = Number(s.lat);
//         const lng = Number(s.lng);
//         if (!isRenderableCoord(lat, lng)) return;

//         const color = pinColor(s);
//         const el    = makePinEl(color, false);

//         const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
//           .setLngLat([lng, lat])
//           .addTo(map);

//         const popupHtml = `
//           <div style="font-family:inherit;font-size:13px;line-height:1.6;min-width:180px;">
//             <strong style="display:block;margin-bottom:2px;font-size:13.5px;">${s.species}</strong>
//             <span style="color:#888;font-size:11.5px;">${s.confidence}</span><br/>
//             ${s.country  ? `<span>${s.country}</span><br/>` : ''}
//             ${s.state    ? `<span>${s.state}</span><br/>`   : ''}
//             ${s.district ? `<span>${s.district}</span><br/>`: ''}
//             <span style="color:#aaa;font-size:11px;">${lat}, ${lng}</span>
//           </div>
//         `;

//         const popup = new maplibregl.Popup({
//           offset: [0, -(selected ? 28 : 22) * 1.5],
//           closeButton: true,
//           closeOnClick: false,
//           maxWidth: '280px',
//         }).setHTML(popupHtml);

//         el.addEventListener('click', () => {
//           // Close any open popup
//           if (popupRef.current) popupRef.current.remove();

//           // Resize selected marker
//           markersRef.current.forEach(({ marker: m, sighting: ms }) => {
//             const isThis = ms.id === s.id;
//             const newEl  = makePinEl(pinColor(ms), isThis);
//             // Re-attach click on rebuild
//             newEl.addEventListener('click', el._clickHandler);
//             m.getElement().replaceWith(newEl);
//             // Update marker's internal element reference
//             m._element = newEl;
//           });

//           marker.setPopup(popup);
//           popup.addTo(map);
//           popupRef.current = popup;
//           setSelected(s);

//           map.flyTo({ center: [lng, lat], zoom: Math.max(map.getZoom(), 9), duration: 800 });
//         });

//         // store click handler ref for re-use
//         el._clickHandler = el.onclick;

//         markersRef.current.push({ marker, popup, sighting: s });
//       });
//     };

//     // If map style is already loaded, add immediately; else wait
//     if (map.isStyleLoaded()) {
//       addMarkers();
//     } else {
//       map.once('styledata', addMarkers);
//     }
//   }, [visibleSightings]); // eslint-disable-line

//   // ── Fly when filter changes ───────────────────────────────────────────────
//   useEffect(() => {
//     const map = mapRef.current;
//     if (!map) return;

//     const isAllRegion =
//       !selectedRegion || selectedRegion === 'All' ||
//       selectedRegion === 'All States' || selectedRegion === 'All Districts';

//     if (isAllRegion) {
//       const view = COUNTRY_VIEW[selectedCountry] || COUNTRY_VIEW.All;
//       map.flyTo({ center: view.center, zoom: view.zoom, duration: 1200 });
//     } else if (visibleSightings.length > 0) {
//       // Fit bounds to visible markers
//       const lngs = visibleSightings.map(s => Number(s.lng));
//       const lats = visibleSightings.map(s => Number(s.lat));
//       const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
//       const minLat = Math.min(...lats), maxLat = Math.max(...lats);
//       const padLat = Math.max((maxLat - minLat) * 0.15, 0.5);
//       const padLng = Math.max((maxLng - minLng) * 0.15, 0.5);

//       map.fitBounds(
//         [[minLng - padLng, minLat - padLat], [maxLng + padLng, maxLat + padLat]],
//         { padding: 40, duration: 1200 }
//       );
//     } else {
//       // No GPS sightings in this region — fall back to country view
//       const view = COUNTRY_VIEW[selectedCountry] || COUNTRY_VIEW.All;
//       map.flyTo({ center: view.center, zoom: view.zoom, duration: 1200 });
//     }
//   }, [selectedCountry, selectedRegion]); // eslint-disable-line

//   const handleCountryChange = (country) => {
//     dispatch({ type: 'MAP_FILTER', v: { country, region: 'All' } });
//   };

//   const handleRegionChange = (region) => {
//     dispatch({ type: 'MAP_FILTER', v: { region } });
//   };

//   const showSecondDropdown =
//     selectedCountry && selectedCountry !== 'All Countries' && regionOptions.length > 0;

//   return (
//     <div style={{
//       background: 'var(--bg3)', border: '1px solid var(--border)',
//       borderRadius: 18, overflow: 'hidden',
//     }}>

//       {/* ── Top bar ──────────────────────────────────────────────────────── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>
//         <select
//           className="sel"
//           value={selectedCountry}
//           onChange={e => handleCountryChange(e.target.value)}
//           disabled={loading || countryOptions.length <= 1}
//         >
//           {countryOptions.map(name => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>

//         {showSecondDropdown && (
//           <select
//             className="sel"
//             value={selectedRegion}
//             onChange={e => handleRegionChange(e.target.value)}
//             disabled={loading}
//           >
//             {regionOptions.map(name => (
//               <option key={name} value={name}>{name}</option>
//             ))}
//           </select>
//         )}

//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
//           {Object.keys(TILE_LAYERS).map(k => (
//             <button
//               key={k}
//               className="btn-sm"
//               style={{
//                 fontSize: '.72rem',
//                 background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
//               }}
//               onClick={() => setTileKey(k)}
//             >
//               {k}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Map container ────────────────────────────────────────────────── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading && (
//           <div style={{
//             position: 'absolute', inset: 0, zIndex: 10,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             background: '#0d1a10', color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         )}
//         <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
//       </div>
//     </div>
//   );
// }





// import { useState, useEffect, useRef, useMemo } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import { useApp } from '../../context/AppContext';

// // ── Map defaults per country ──────────────────────────────────────────────────
// const COUNTRY_VIEW = {
//   India:  { center: [82.5, 22.5], zoom: 4.5 },
//   Bhutan: { center: [90.5, 27.5], zoom: 7.5 },
//   All:    { center: [84.0, 24.0], zoom: 4.5 },
// };

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// // ── Free tile providers ───────────────────────────────────────────────────────
// const TILE_LAYERS = {
//   Dark: {
//     style: {
//       version: 8,
//       sources: {
//         'carto-dark': {
//           type: 'raster',
//           tiles: [
//             'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
//             'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
//             'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
//           ],
//           tileSize: 256,
//           attribution: '© CARTO © OpenStreetMap contributors',
//           maxzoom: 19,
//         },
//       },
//       layers: [{ id: 'carto-dark-layer', type: 'raster', source: 'carto-dark' }],
//     },
//   },
//   Terrain: {
//     style: {
//       version: 8,
//       sources: {
//         'osm-terrain': {
//           type: 'raster',
//           tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
//           tileSize: 256,
//           attribution: '© OpenTopoMap contributors',
//           maxzoom: 17,
//         },
//       },
//       layers: [{ id: 'osm-terrain-layer', type: 'raster', source: 'osm-terrain' }],
//     },
//   },
//   Satellite: {
//     style: {
//       version: 8,
//       sources: {
//         'esri-satellite': {
//           type: 'raster',
//           tiles: [
//             'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//           ],
//           tileSize: 256,
//           attribution: '© Esri',
//           maxzoom: 19,
//         },
//       },
//       layers: [{ id: 'esri-satellite-layer', type: 'raster', source: 'esri-satellite' }],
//     },
//   },
// };

// // ── Known Bhutan districts ────────────────────────────────────────────────────
// const BHUTAN_DISTRICTS = [
//   'Zhemgang District', 'Trashigang District', 'Samdrup Jongkhar District',
//   'Chukha District', 'Punakha District', 'Thimphu District',
//   'Paro District', 'Chelela Pass', 'Dochula Pass',
// ];

// // ── Coordinate validity ───────────────────────────────────────────────────────
// function isRenderableCoord(lat, lng) {
//   return (
//     lat != null && lng != null &&
//     !isNaN(lat) && !isNaN(lng) &&
//     isFinite(lat) && isFinite(lng) &&
//     lat !== 0 && lng !== 0 &&
//     lat >= 6.0  && lat <= 37.5 &&
//     lng >= 68.0 && lng <= 97.5
//   );
// }

// // ── Pin color ─────────────────────────────────────────────────────────────────
// function pinColor(s) {
//   return CONFIDENCE_COLORS[s.confidence] ?? CONFIDENCE_COLORS.Confirmed;
// }

// // ── SVG pin element ───────────────────────────────────────────────────────────
// function makePinEl(color, selected = false) {
//   const size = selected ? 28 : 22;
//   const el = document.createElement('div');
//   el.style.cssText = 'display:flex;flex-direction:column;align-items:center;cursor:pointer;';
//   el.innerHTML = `
//     <div style="
//       width:${size}px;height:${size}px;
//       background:${color};border-radius:50%;
//       border:2px solid white;
//       box-shadow:0 2px 6px rgba(0,0,0,.45);
//       transition:transform .15s;
//     "></div>
//     <div style="width:2px;height:${size}px;background:${color};opacity:.85;"></div>
//   `;
//   return el;
// }

// // ── LoadingOverlay ────────────────────────────────────────────────────────────
// function LoadingOverlay({ allCount, fetchedCount, fetchedSoFar }) {
//   // fetchedSoFar  = raw count from onProgress callback (grows during fetch)
//   // allCount      = sightings.length (total parsed, passed as prop)
//   // fetchedCount  = visibleSightings.length (plotted in current view)

//   const displayRaw = fetchedSoFar > 0 ? fetchedSoFar : allCount;

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         inset: 0,
//         zIndex: 10,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: '#0a1410',
//         gap: '1.1rem',
//       }}
//     >
//       {/* Animated GPS icon */}
//       <div style={{ position: 'relative', width: 44, height: 44 }}>
//         {/* Ping rings */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           borderRadius: '50%',
//           border: '1.5px solid #52c97b',
//           animation: 'ping 1.6s ease-out infinite',
//           opacity: 0,
//         }} />
//         <div style={{
//           position: 'absolute', inset: 6,
//           borderRadius: '50%',
//           border: '1.5px solid #52c97b',
//           animation: 'ping 1.6s ease-out 0.4s infinite',
//           opacity: 0,
//         }} />
//         {/* Core dot */}
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <div style={{
//             width: 14,
//             height: 14,
//             borderRadius: '50%',
//             background: '#52c97b',
//             boxShadow: '0 0 8px rgba(82,201,123,0.6)',
//           }} />
//         </div>
//       </div>

//       {/* Counter */}
//       <div style={{ textAlign: 'center', lineHeight: 1.7 }}>
//         <div style={{
//           color: '#52c97b',
//           fontSize: 22,
//           fontVariantNumeric: 'tabular-nums',
//           fontWeight: 600,
//           letterSpacing: '-0.5px',
//         }}>
//           {displayRaw.toLocaleString()}
//         </div>
//         <div style={{ color: '#3a6645', fontSize: 12, marginTop: 2 }}>
//           coordinates fetched
//         </div>
//         {fetchedCount > 0 && (
//           <div style={{ color: '#2e5038', fontSize: 11, marginTop: 4 }}>
//             {fetchedCount.toLocaleString()} plotted in current view
//           </div>
//         )}
//       </div>

//       {/* Sliding progress bar */}
//       <div style={{
//         width: 160,
//         height: 2,
//         background: '#1a2e1e',
//         borderRadius: 999,
//         overflow: 'hidden',
//       }}>
//         <div style={{
//           height: '100%',
//           width: '35%',
//           background: 'linear-gradient(90deg, transparent, #52c97b, transparent)',
//           borderRadius: 999,
//           animation: 'slide 1.5s ease-in-out infinite',
//         }} />
//       </div>

//       {/* Status label */}
//       <div style={{
//         color: '#2e5038',
//         fontSize: 11,
//         letterSpacing: '0.06em',
//         textTransform: 'uppercase',
//       }}>
//         Resolving GPS sightings…
//       </div>

//       <style>{`
//         @keyframes ping {
//           0%   { transform: scale(0.8); opacity: 0.7; }
//           100% { transform: scale(2);   opacity: 0; }
//         }
//         @keyframes slide {
//           0%   { transform: translateX(-200%); }
//           100% { transform: translateX(600%); }
//         }
//       `}</style>
//     </div>
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────
// // Props:
// //   sightings      — full array of sightings (grows as data loads)
// //   loading        — boolean: fetch still in progress
// //   fetchedSoFar   — live count from onProgress callback in fetchWLBIndiaSightings
// export default function IndiaMap({ sightings, loading, fetchedSoFar = 0 }) {
//   const { state, dispatch } = useApp();

//   const mapContainer = useRef(null);
//   const mapRef       = useRef(null);
//   const markersRef   = useRef([]);
//   const popupRef     = useRef(null);

//   const [tileKey,  setTileKey]  = useState('Dark');
//   const [selected, setSelected] = useState(null);

//   const selectedCountry = state.mapFilter?.country || 'India';
//   const selectedRegion  = state.mapFilter?.region  || 'All';

//   // ── Country options ───────────────────────────────────────────────────────
//   const countryOptions = useMemo(() => {
//     const names = new Set(state.sightings.map(s => s.country).filter(Boolean));
//     return ['All Countries', ...Array.from(names).sort()];
//   }, [state.sightings]);

//   // ── Region options ────────────────────────────────────────────────────────
//   const regionOptions = useMemo(() => {
//     if (!selectedCountry || selectedCountry === 'All Countries') return [];
//     if (selectedCountry === 'Bhutan') {
//       const fromData = new Set(
//         state.sightings.filter(s => s.country === 'Bhutan' && s.district).map(s => s.district)
//       );
//       BHUTAN_DISTRICTS.forEach(d => fromData.add(d));
//       return ['All Districts', ...Array.from(fromData).sort()];
//     }
//     const names = new Set(
//       state.sightings.filter(s => s.country === 'India' && s.state).map(s => s.state)
//     );
//     return ['All States', ...Array.from(names).sort()];
//   }, [selectedCountry, state.sightings]);

//   // ── Filtered sightings (GPS-only) ─────────────────────────────────────────
//   const visibleSightings = useMemo(() => {
//     return sightings.filter(s => {
//       const lat = Number(s.lat);
//       const lng = Number(s.lng);
//       if (!isRenderableCoord(lat, lng)) return false;
//       if (s.approximate) return false;

//       if (selectedCountry && selectedCountry !== 'All Countries') {
//         if (s.country !== selectedCountry) return false;
//       }

//       const isAllRegion =
//         !selectedRegion || selectedRegion === 'All' ||
//         selectedRegion === 'All States' || selectedRegion === 'All Districts';

//       if (!isAllRegion) {
//         const rv = selectedCountry === 'Bhutan'
//           ? (s.district || '').trim()
//           : (s.state    || '').trim();
//         if (rv !== selectedRegion.trim()) return false;
//       }
//       return true;
//     });
//   }, [sightings, selectedCountry, selectedRegion]);

//   // ── Init map ──────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (mapRef.current || !mapContainer.current) return;

//     const map = new maplibregl.Map({
//       container: mapContainer.current,
//       style:     TILE_LAYERS[tileKey].style,
//       center:    COUNTRY_VIEW.India.center,
//       zoom:      COUNTRY_VIEW.India.zoom,
//       minZoom:   3,
//       maxZoom:   16,
//       attributionControl: false,
//     });

//     map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
//     map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

//     mapRef.current = map;

//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//   }, []); // eslint-disable-line

//   // ── Swap tile style ───────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!mapRef.current) return;
//     mapRef.current.setStyle(TILE_LAYERS[tileKey].style);
//   }, [tileKey]);

//   // ── Re-render markers ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const map = mapRef.current;
//     if (!map) return;

//     markersRef.current.forEach(({ marker }) => marker.remove());
//     markersRef.current = [];
//     if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
//     setSelected(null);

//     const addMarkers = () => {
//       visibleSightings.forEach(s => {
//         const lat = Number(s.lat);
//         const lng = Number(s.lng);
//         if (!isRenderableCoord(lat, lng)) return;

//         const color = pinColor(s);
//         const el    = makePinEl(color, false);

//         const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
//           .setLngLat([lng, lat])
//           .addTo(map);

//         const popupHtml = `
//           <div style="font-family:inherit;font-size:13px;line-height:1.6;min-width:180px;">
//             <strong style="display:block;margin-bottom:2px;font-size:13.5px;">${s.species}</strong>
//             <span style="color:#888;font-size:11.5px;">${s.confidence}</span><br/>
//             ${s.country  ? `<span>${s.country}</span><br/>`  : ''}
//             ${s.state    ? `<span>${s.state}</span><br/>`    : ''}
//             ${s.district ? `<span>${s.district}</span><br/>` : ''}
//             <span style="color:#aaa;font-size:11px;">${lat}, ${lng}</span>
//           </div>
//         `;

//         const popup = new maplibregl.Popup({
//           offset: [0, -(selected ? 28 : 22) * 1.5],
//           closeButton: true,
//           closeOnClick: false,
//           maxWidth: '280px',
//         }).setHTML(popupHtml);

//         el.addEventListener('click', () => {
//           if (popupRef.current) popupRef.current.remove();

//           markersRef.current.forEach(({ marker: m, sighting: ms }) => {
//             const isThis = ms.id === s.id;
//             const newEl  = makePinEl(pinColor(ms), isThis);
//             newEl.addEventListener('click', el._clickHandler);
//             m.getElement().replaceWith(newEl);
//             m._element = newEl;
//           });

//           marker.setPopup(popup);
//           popup.addTo(map);
//           popupRef.current = popup;
//           setSelected(s);

//           map.flyTo({ center: [lng, lat], zoom: Math.max(map.getZoom(), 9), duration: 800 });
//         });

//         el._clickHandler = el.onclick;
//         markersRef.current.push({ marker, popup, sighting: s });
//       });
//     };

//     if (map.isStyleLoaded()) {
//       addMarkers();
//     } else {
//       map.once('styledata', addMarkers);
//     }
//   }, [visibleSightings]); // eslint-disable-line

//   // ── Fly when filter changes ───────────────────────────────────────────────
//   useEffect(() => {
//     const map = mapRef.current;
//     if (!map) return;

//     const isAllRegion =
//       !selectedRegion || selectedRegion === 'All' ||
//       selectedRegion === 'All States' || selectedRegion === 'All Districts';

//     if (isAllRegion) {
//       const view = COUNTRY_VIEW[selectedCountry] || COUNTRY_VIEW.All;
//       map.flyTo({ center: view.center, zoom: view.zoom, duration: 1200 });
//     } else if (visibleSightings.length > 0) {
//       const lngs = visibleSightings.map(s => Number(s.lng));
//       const lats = visibleSightings.map(s => Number(s.lat));
//       const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
//       const minLat = Math.min(...lats), maxLat = Math.max(...lats);
//       const padLat = Math.max((maxLat - minLat) * 0.15, 0.5);
//       const padLng = Math.max((maxLng - minLng) * 0.15, 0.5);

//       map.fitBounds(
//         [[minLng - padLng, minLat - padLat], [maxLng + padLng, maxLat + padLat]],
//         { padding: 40, duration: 1200 }
//       );
//     } else {
//       const view = COUNTRY_VIEW[selectedCountry] || COUNTRY_VIEW.All;
//       map.flyTo({ center: view.center, zoom: view.zoom, duration: 1200 });
//     }
//   }, [selectedCountry, selectedRegion]); // eslint-disable-line

//   const handleCountryChange = (country) => {
//     dispatch({ type: 'MAP_FILTER', v: { country, region: 'All' } });
//   };

//   const handleRegionChange = (region) => {
//     dispatch({ type: 'MAP_FILTER', v: { region } });
//   };

//   const showSecondDropdown =
//     selectedCountry && selectedCountry !== 'All Countries' && regionOptions.length > 0;

//   return (
//     <div style={{
//       background: 'var(--bg3)', border: '1px solid var(--border)',
//       borderRadius: 18, overflow: 'hidden',
//     }}>

//       {/* ── Top bar ──────────────────────────────────────────────────────── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>
//         <select
//           className="sel"
//           value={selectedCountry}
//           onChange={e => handleCountryChange(e.target.value)}
//           disabled={loading || countryOptions.length <= 1}
//         >
//           {countryOptions.map(name => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>

//         {showSecondDropdown && (
//           <select
//             className="sel"
//             value={selectedRegion}
//             onChange={e => handleRegionChange(e.target.value)}
//             disabled={loading}
//           >
//             {regionOptions.map(name => (
//               <option key={name} value={name}>{name}</option>
//             ))}
//           </select>
//         )}

//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
//           {Object.keys(TILE_LAYERS).map(k => (
//             <button
//               key={k}
//               className="btn-sm"
//               style={{
//                 fontSize: '.72rem',
//                 background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
//               }}
//               onClick={() => setTileKey(k)}
//             >
//               {k}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Map container ────────────────────────────────────────────────── */}
//       <div style={{ position: 'relative', height: 480 }}>

//         {/* ── Live loading overlay ─────────────────────────────────────── */}
//         {loading && (
//           <LoadingOverlay
//             allCount={sightings.length}
//             fetchedCount={visibleSightings.length}
//             fetchedSoFar={fetchedSoFar}
//           />
//         )}

//         <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useApp } from '../../context/AppContext';

// ── Map defaults per country ──────────────────────────────────────────────────
const COUNTRY_VIEW = {
  India:  { center: [82.5, 22.5], zoom: 4.5 },
  Bhutan: { center: [90.5, 27.5], zoom: 7.5 },
  All:    { center: [84.0, 24.0], zoom: 4.5 },
};

const CONFIDENCE_COLORS = {
  Confirmed: '#52c97b',
  High:      '#60a5fa',
  Probable:  '#fbbf24',
};

// ── Free tile providers ───────────────────────────────────────────────────────
const TILE_LAYERS = {
  Dark: {
    style: {
      version: 8,
      sources: {
        'carto-dark': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
          ],
          tileSize: 256,
          attribution: '© CARTO © OpenStreetMap contributors',
          maxzoom: 19,
        },
      },
      layers: [{ id: 'carto-dark-layer', type: 'raster', source: 'carto-dark' }],
    },
  },
  Terrain: {
    style: {
      version: 8,
      sources: {
        'osm-terrain': {
          type: 'raster',
          tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenTopoMap contributors',
          maxzoom: 17,
        },
      },
      layers: [{ id: 'osm-terrain-layer', type: 'raster', source: 'osm-terrain' }],
    },
  },
  Satellite: {
    style: {
      version: 8,
      sources: {
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          attribution: '© Esri',
          maxzoom: 19,
        },
      },
      layers: [{ id: 'esri-satellite-layer', type: 'raster', source: 'esri-satellite' }],
    },
  },
};

// ── Known Bhutan districts ────────────────────────────────────────────────────
const BHUTAN_DISTRICTS = [
  'Zhemgang District', 'Trashigang District', 'Samdrup Jongkhar District',
  'Chukha District', 'Punakha District', 'Thimphu District',
  'Paro District', 'Chelela Pass', 'Dochula Pass',
];

// ── Coordinate validity ───────────────────────────────────────────────────────
function isRenderableCoord(lat, lng) {
  return (
    lat != null && lng != null &&
    !isNaN(lat) && !isNaN(lng) &&
    isFinite(lat) && isFinite(lng) &&
    lat !== 0 && lng !== 0 &&
    lat >= 6.0  && lat <= 37.5 &&
    lng >= 68.0 && lng <= 97.5
  );
}

// ── Pin color ─────────────────────────────────────────────────────────────────
function pinColor(s) {
  return CONFIDENCE_COLORS[s.confidence] ?? CONFIDENCE_COLORS.Confirmed;
}

// ── SVG pin element ───────────────────────────────────────────────────────────
function makePinEl(color, selected = false) {
  const size = selected ? 28 : 22;
  const el = document.createElement('div');
  el.style.cssText = 'display:flex;flex-direction:column;align-items:center;cursor:pointer;';
  el.innerHTML = `
    <div style="
      width:${size}px;height:${size}px;
      background:${color};border-radius:50%;
      border:2px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,.45);
      transition:transform .15s;
    "></div>
    <div style="width:2px;height:${size}px;background:${color};opacity:.85;"></div>
  `;
  return el;
}

// ── LoadingOverlay ────────────────────────────────────────────────────────────
// phase: 'fetching' | 'marking'
function LoadingOverlay({ allCount, fetchedCount, fetchedSoFar, markingCount, markingTotal, phase }) {
  const displayRaw = fetchedSoFar > 0 ? fetchedSoFar : allCount;

  const isFetching = phase === 'fetching';

  // Determinate progress for marking phase
  const markPct = markingTotal > 0
    ? Math.min(100, Math.round((markingCount / markingTotal) * 100))
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a1410',
        gap: '1.1rem',
        transition: 'background 0.3s',
      }}
    >
      {/* Animated GPS / pin icon */}
      <div style={{ position: 'relative', width: 44, height: 44 }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `1.5px solid ${isFetching ? '#52c97b' : '#60a5fa'}`,
          animation: 'ping 1.6s ease-out infinite',
          opacity: 0,
        }} />
        <div style={{
          position: 'absolute', inset: 6,
          borderRadius: '50%',
          border: `1.5px solid ${isFetching ? '#52c97b' : '#60a5fa'}`,
          animation: 'ping 1.6s ease-out 0.4s infinite',
          opacity: 0,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            background: isFetching ? '#52c97b' : '#60a5fa',
            boxShadow: `0 0 8px ${isFetching ? 'rgba(82,201,123,0.6)' : 'rgba(96,165,250,0.6)'}`,
            transition: 'background 0.4s, box-shadow 0.4s',
          }} />
        </div>
      </div>

      {/* Counter / progress text */}
      <div style={{ textAlign: 'center', lineHeight: 1.7 }}>
        {isFetching ? (
          <>
            <div style={{
              color: '#52c97b', fontSize: 22,
              fontVariantNumeric: 'tabular-nums', fontWeight: 600, letterSpacing: '-0.5px',
            }}>
              {displayRaw.toLocaleString()}
            </div>
            <div style={{ color: '#3a6645', fontSize: 12, marginTop: 2 }}>
              coordinates fetched
            </div>
          </>
        ) : (
          <>
            <div style={{
              color: '#60a5fa', fontSize: 22,
              fontVariantNumeric: 'tabular-nums', fontWeight: 600, letterSpacing: '-0.5px',
            }}>
              {markingCount.toLocaleString()}
              <span style={{ fontSize: 13, fontWeight: 400, color: '#2e4a6a', marginLeft: 4 }}>
                / {markingTotal.toLocaleString()}
              </span>
            </div>
            <div style={{ color: '#2e4a6a', fontSize: 12, marginTop: 2 }}>
              pins placed on map
            </div>
          </>
        )}

        {!isFetching && fetchedCount > 0 && (
          <div style={{ color: '#1e3550', fontSize: 11, marginTop: 4 }}>
            {fetchedCount.toLocaleString()} visible in current view
          </div>
        )}
      </div>

      {/* Progress bar — indeterminate while fetching, determinate while marking */}
      <div style={{
        width: 160, height: 2,
        background: '#1a2e1e', borderRadius: 999, overflow: 'hidden',
      }}>
        {isFetching ? (
          <div style={{
            height: '100%', width: '35%',
            background: 'linear-gradient(90deg, transparent, #52c97b, transparent)',
            borderRadius: 999,
            animation: 'slide 1.5s ease-in-out infinite',
          }} />
        ) : (
          <div style={{
            height: '100%',
            width: `${markPct}%`,
            background: '#60a5fa',
            borderRadius: 999,
            transition: 'width 0.15s ease-out',
          }} />
        )}
      </div>

      {/* Phase label */}
      <div style={{
        color: isFetching ? '#2e5038' : '#1e3550',
        fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
        transition: 'color 0.4s',
      }}>
        {isFetching ? 'Resolving GPS sightings…' : `Placing markers… ${markPct}%`}
      </div>

      <style>{`
        @keyframes ping {
          0%   { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(2);   opacity: 0; }
        }
        @keyframes slide {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(600%); }
        }
      `}</style>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
// Props:
//   sightings      — full array of sightings (grows as data loads)
//   loading        — boolean: fetch still in progress
//   fetchedSoFar   — live count from onProgress callback in fetchWLBIndiaSightings
export default function IndiaMap({ sightings, loading, fetchedSoFar = 0 }) {
  const { state, dispatch } = useApp();

  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const markersRef   = useRef([]);
  const popupRef     = useRef(null);

  const [tileKey,        setTileKey]        = useState('Dark');
  const [selected,       setSelected]       = useState(null);
  const [markingMarkers, setMarkingMarkers] = useState(false);
  const [markingCount,   setMarkingCount]   = useState(0);
  const [markingTotal,   setMarkingTotal]   = useState(0);

  const selectedCountry = state.mapFilter?.country || 'India';
  const selectedRegion  = state.mapFilter?.region  || 'All';

  // ── Country options ───────────────────────────────────────────────────────
  const countryOptions = useMemo(() => {
    const names = new Set(state.sightings.map(s => s.country).filter(Boolean));
    return ['All Countries', ...Array.from(names).sort()];
  }, [state.sightings]);

  // ── Region options ────────────────────────────────────────────────────────
  const regionOptions = useMemo(() => {
    if (!selectedCountry || selectedCountry === 'All Countries') return [];
    if (selectedCountry === 'Bhutan') {
      const fromData = new Set(
        state.sightings.filter(s => s.country === 'Bhutan' && s.district).map(s => s.district)
      );
      BHUTAN_DISTRICTS.forEach(d => fromData.add(d));
      return ['All Districts', ...Array.from(fromData).sort()];
    }
    const names = new Set(
      state.sightings.filter(s => s.country === 'India' && s.state).map(s => s.state)
    );
    return ['All States', ...Array.from(names).sort()];
  }, [selectedCountry, state.sightings]);

  // ── Filtered sightings (GPS-only) ─────────────────────────────────────────
  const visibleSightings = useMemo(() => {
    return sightings.filter(s => {
      const lat = Number(s.lat);
      const lng = Number(s.lng);
      if (!isRenderableCoord(lat, lng)) return false;
      if (s.approximate) return false;

      if (selectedCountry && selectedCountry !== 'All Countries') {
        if (s.country !== selectedCountry) return false;
      }

      const isAllRegion =
        !selectedRegion || selectedRegion === 'All' ||
        selectedRegion === 'All States' || selectedRegion === 'All Districts';

      if (!isAllRegion) {
        const rv = selectedCountry === 'Bhutan'
          ? (s.district || '').trim()
          : (s.state    || '').trim();
        if (rv !== selectedRegion.trim()) return false;
      }
      return true;
    });
  }, [sightings, selectedCountry, selectedRegion]);

  // ── Init map ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:     TILE_LAYERS[tileKey].style,
      center:    COUNTRY_VIEW.India.center,
      zoom:      COUNTRY_VIEW.India.zoom,
      minZoom:   3,
      maxZoom:   16,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line

  // ── Swap tile style ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(TILE_LAYERS[tileKey].style);
  }, [tileKey]);

  // ── Re-render markers ─────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(({ marker }) => marker.remove());
    markersRef.current = [];
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
    setSelected(null);

    const addMarkers = () => {
      const total = visibleSightings.length;

      // Show marking overlay only if there are pins to place
      if (total > 0) {
        setMarkingMarkers(true);
        setMarkingCount(0);
        setMarkingTotal(total);
      }

      let placed = 0;

      visibleSightings.forEach(s => {
        const lat = Number(s.lat);
        const lng = Number(s.lng);
        if (!isRenderableCoord(lat, lng)) return;

        const color = pinColor(s);
        const el    = makePinEl(color, false);

        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([lng, lat])
          .addTo(map);

        const popupHtml = `
          <div style="font-family:inherit;font-size:13px;line-height:1.6;min-width:180px;">
            <strong style="display:block;margin-bottom:2px;font-size:13.5px;">${s.species}</strong>
            <span style="color:#888;font-size:11.5px;">${s.confidence}</span><br/>
            ${s.country  ? `<span>${s.country}</span><br/>`  : ''}
            ${s.state    ? `<span>${s.state}</span><br/>`    : ''}
            ${s.district ? `<span>${s.district}</span><br/>` : ''}
            <span style="color:#aaa;font-size:11px;">${lat}, ${lng}</span>
          </div>
        `;

        const popup = new maplibregl.Popup({
          offset: [0, -(selected ? 28 : 22) * 1.5],
          closeButton: true,
          closeOnClick: false,
          maxWidth: '280px',
        }).setHTML(popupHtml);

        el.addEventListener('click', () => {
          if (popupRef.current) popupRef.current.remove();

          markersRef.current.forEach(({ marker: m, sighting: ms }) => {
            const isThis = ms.id === s.id;
            const newEl  = makePinEl(pinColor(ms), isThis);
            newEl.addEventListener('click', el._clickHandler);
            m.getElement().replaceWith(newEl);
            m._element = newEl;
          });

          marker.setPopup(popup);
          popup.addTo(map);
          popupRef.current = popup;
          setSelected(s);

          map.flyTo({ center: [lng, lat], zoom: Math.max(map.getZoom(), 9), duration: 800 });
        });

        el._clickHandler = el.onclick;
        markersRef.current.push({ marker, popup, sighting: s });

        // Update marking progress counter
        placed += 1;
        setMarkingCount(placed);
      });

      // All markers placed — hide overlay after one frame so final count renders
      requestAnimationFrame(() => {
        setMarkingMarkers(false);
        setMarkingCount(0);
        setMarkingTotal(0);
      });
    };

    if (map.isStyleLoaded()) {
      addMarkers();
    } else {
      map.once('styledata', addMarkers);
    }
  }, [visibleSightings]); // eslint-disable-line

  // ── Fly when filter changes ───────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const isAllRegion =
      !selectedRegion || selectedRegion === 'All' ||
      selectedRegion === 'All States' || selectedRegion === 'All Districts';

    if (isAllRegion) {
      const view = COUNTRY_VIEW[selectedCountry] || COUNTRY_VIEW.All;
      map.flyTo({ center: view.center, zoom: view.zoom, duration: 1200 });
    } else if (visibleSightings.length > 0) {
      const lngs = visibleSightings.map(s => Number(s.lng));
      const lats = visibleSightings.map(s => Number(s.lat));
      const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats), maxLat = Math.max(...lats);
      const padLat = Math.max((maxLat - minLat) * 0.15, 0.5);
      const padLng = Math.max((maxLng - minLng) * 0.15, 0.5);

      map.fitBounds(
        [[minLng - padLng, minLat - padLat], [maxLng + padLng, maxLat + padLat]],
        { padding: 40, duration: 1200 }
      );
    } else {
      const view = COUNTRY_VIEW[selectedCountry] || COUNTRY_VIEW.All;
      map.flyTo({ center: view.center, zoom: view.zoom, duration: 1200 });
    }
  }, [selectedCountry, selectedRegion]); // eslint-disable-line

  const handleCountryChange = (country) => {
    dispatch({ type: 'MAP_FILTER', v: { country, region: 'All' } });
  };

  const handleRegionChange = (region) => {
    dispatch({ type: 'MAP_FILTER', v: { region } });
  };

  const showSecondDropdown =
    selectedCountry && selectedCountry !== 'All Countries' && regionOptions.length > 0;

  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid var(--border)',
      borderRadius: 18, overflow: 'hidden',
    }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
        flexWrap: 'wrap', alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <select
          className="sel"
          value={selectedCountry}
          onChange={e => handleCountryChange(e.target.value)}
          disabled={loading || countryOptions.length <= 1}
        >
          {countryOptions.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {showSecondDropdown && (
          <select
            className="sel"
            value={selectedRegion}
            onChange={e => handleRegionChange(e.target.value)}
            disabled={loading}
          >
            {regionOptions.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
          {Object.keys(TILE_LAYERS).map(k => (
            <button
              key={k}
              className="btn-sm"
              style={{
                fontSize: '.72rem',
                background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
              }}
              onClick={() => setTileKey(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map container ────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: 480 }}>

        {/* ── Live loading overlay ─────────────────────────────────────── */}
        {(loading || markingMarkers) && (
          <LoadingOverlay
            allCount={sightings.length}
            fetchedCount={visibleSightings.length}
            fetchedSoFar={fetchedSoFar}
            markingCount={markingCount}
            markingTotal={markingTotal}
            phase={loading ? 'fetching' : 'marking'}
          />
        )}

        <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}