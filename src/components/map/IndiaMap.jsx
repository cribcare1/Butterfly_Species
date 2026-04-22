
// import { useState, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useApp } from '../../context/AppContext';
// import L from 'leaflet';
 
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl:        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl:      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });
 
// // ─── Constants ────────────────────────────────────────────────────────────────
// const INDIA_CENTER = [22.5, 82.5];
// const INDIA_ZOOM   = 5;
 
// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };
 
// // State centers for auto-fly when a state filter is selected
// const STATE_CENTERS = {
//   'Andhra Pradesh':    { lat: 15.9,  lng: 79.7,  zoom: 7 },
//   'Arunachal Pradesh': { lat: 28.2,  lng: 94.7,  zoom: 7 },
//   'Assam':             { lat: 26.2,  lng: 92.9,  zoom: 7 },
//   'Bihar':             { lat: 25.1,  lng: 85.3,  zoom: 7 },
//   'Chhattisgarh':      { lat: 21.3,  lng: 81.9,  zoom: 7 },
//   'Goa':               { lat: 15.3,  lng: 74.1,  zoom: 9 },
//   'Gujarat':           { lat: 22.3,  lng: 71.2,  zoom: 7 },
//   'Haryana':           { lat: 29.1,  lng: 76.1,  zoom: 7 },
//   'Himachal Pradesh':  { lat: 31.1,  lng: 77.2,  zoom: 7 },
//   'Jharkhand':         { lat: 23.6,  lng: 85.3,  zoom: 7 },
//   'Karnataka':         { lat: 15.3,  lng: 75.7,  zoom: 7 },
//   'Kerala':            { lat: 10.9,  lng: 76.3,  zoom: 7 },
//   'Madhya Pradesh':    { lat: 23.5,  lng: 77.7,  zoom: 7 },
//   'Maharashtra':       { lat: 19.7,  lng: 75.7,  zoom: 7 },
//   'Manipur':           { lat: 24.7,  lng: 93.9,  zoom: 8 },
//   'Meghalaya':         { lat: 25.5,  lng: 91.4,  zoom: 8 },
//   'Mizoram':           { lat: 23.2,  lng: 92.8,  zoom: 8 },
//   'Nagaland':          { lat: 26.2,  lng: 94.6,  zoom: 8 },
//   'Odisha':            { lat: 20.9,  lng: 84.2,  zoom: 7 },
//   'Punjab':            { lat: 31.1,  lng: 75.3,  zoom: 7 },
//   'Rajasthan':         { lat: 27.0,  lng: 74.2,  zoom: 7 },
//   'Sikkim':            { lat: 27.5,  lng: 88.5,  zoom: 9 },
//   'Tamil Nadu':        { lat: 11.1,  lng: 78.7,  zoom: 7 },
//   'Telangana':         { lat: 18.1,  lng: 79.0,  zoom: 7 },
//   'Tripura':           { lat: 23.7,  lng: 91.7,  zoom: 8 },
//   'Uttar Pradesh':     { lat: 27.1,  lng: 80.9,  zoom: 7 },
//   'Uttarakhand':       { lat: 30.1,  lng: 79.2,  zoom: 7 },
//   'West Bengal':       { lat: 23.8,  lng: 87.9,  zoom: 7 },
// };
 
// // const QUICK_REGIONS = [
// //   { label: 'Western Ghats', lat: 12.5, lng: 75.5, zoom: 7 },
// //   { label: 'Himalayan',     lat: 30.5, lng: 78.5, zoom: 7 },
// //   { label: 'Deccan',        lat: 17.0, lng: 78.0, zoom: 7 },
// //   { label: 'Northeast',     lat: 26.0, lng: 93.0, zoom: 7 },
// //   { label: 'Reset',         lat: 22.5, lng: 82.5, zoom: 5 },
// // ];
 
// const TILE_LAYERS = {
//   Dark: {
//     url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//     attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
//   },
//  Terrain: {
//   url: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=YOUR_TOKEN',
//   attribution: '&copy; Mapbox &copy; OpenStreetMap',
// },
//   Satellite: {
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//     attribution: '&copy; Esri',
//   },
// };
 
// // ─── FlyTo helper ─────────────────────────────────────────────────────────────
// function FlyTo({ target }) {
//   const map = useMap();
//   useEffect(() => {
//     if (target) map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
//   }, [target, map]);
//   return null;
// }
 
// // ─── Derive unique states from actual sightings data ─────────────────────────
// function buildStateOptions(sightings) {
//   const states = [...new Set(sightings.map(s => s.state).filter(Boolean))].sort();
//   return ['All States', ...states];
// }
 
// // ─── Main component ───────────────────────────────────────────────────────────
// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();
//   const [selected,   setSelected]   = useState(null);
//   const [flyTarget,  setFlyTarget]  = useState(null);
//   const [tileKey,    setTileKey]    = useState('Dark');
//   const listRef = useRef(null);
 
//   // Build state dropdown options from actual sightings (not a hardcoded list)
//   const stateOptions = buildStateOptions(sightings);
 
//   // Auto-fly when state filter changes
//   useEffect(() => {
//     const s = state.mapFilter.state;
//     if (!s || s === 'All States') {
//       setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
//     } else if (STATE_CENTERS[s]) {
//       setFlyTarget(STATE_CENTERS[s]);
//     }
//     // Clear selected marker when filter changes
//     setSelected(null);
//   }, [state.mapFilter.state]);
 
//   const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';
 
//   const handleRowClick = (s) => {
//     setSelected(s);
//     setFlyTarget({ lat: s.lat, lng: s.lng, zoom: 9 });
//     document.getElementById(`row-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//   };
 
//   // Stats derived from currently visible sightings
//   // const confirmedCount = sightings.filter(s => s.confidence === 'Confirmed').length;
//   const grouped   = sightings.reduce((a, s) => { a[s.region] = (a[s.region] || 0) + 1; return a; }, {});
//   const topRegion = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
 
//   return (
//     <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
 
//       {/* ── Top bar ── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>
//         {/* State filter — built from real sightings data */}
//         <select
//           className="sel"
//           value={state.mapFilter.state || 'All States'}
//           onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
//         >
//           {stateOptions.map(s => <option key={s}>{s}</option>)}
//         </select>
 
//         {/* Quick-fly region buttons */}
//         {/* <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
//           {QUICK_REGIONS.map(r => (
//             <button key={r.label} className="btn-sm"
//               onClick={() => {
//                 setFlyTarget(r);
//                 if (r.label === 'Reset') dispatch({ type: 'MAP_FILTER', v: { state: 'All States' } });
//               }}
//               style={{ fontSize: '.72rem' }}>
//               {r.label}
//             </button>
//           ))}
//         </div> */}
 
//         {/* Tile switcher */}
//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
//           {Object.keys(TILE_LAYERS).map(k => (
//             <button key={k} className="btn-sm"
//               style={{ fontSize: '.72rem', background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
//               onClick={() => setTileKey(k)}>
//               {k}
//             </button>
//           ))}
//         </div>
 
//         {/* <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
//           {sightings.length} sighting{sightings.length !== 1 ? 's' : ''}
//         </span> */}
//       </div>
 
//       {/* ── Map ── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading ? (
//           <div style={{
//             height: '100%', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', background: '#0d1a10',
//             color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         ) : (
//           <MapContainer
//             center={INDIA_CENTER}
//             zoom={INDIA_ZOOM}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={false}
//             maxBounds={[[5, 60], [40, 100]]}
//             maxBoundsViscosity={0.8}
//             minZoom={4}
//             maxZoom={14}
//           >
//             <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
//             <ZoomControl position="bottomright" />
//             <FlyTo target={flyTarget} />
 
//             {sightings.map(s => {
//               const c = color(s);
//               const isSelected = selected?.id === s.id;
//               return (
//                 <CircleMarker
//                   key={s.id}
//                   center={[s.lat, s.lng]}
//                   radius={isSelected ? 11 : 8}
//                   pathOptions={{
//                     color: c, fillColor: c,
//                     fillOpacity: isSelected ? 0.9 : 0.7,
//                     weight: isSelected ? 2.5 : 1.5,
//                   }}
//                   eventHandlers={{
//                     click: () => { setSelected(s); setFlyTarget({ lat: s.lat, lng: s.lng, zoom: 9 }); },
//                   }}
//                 >
//                   <Popup closeButton={false} className="leaflet-popup-custom" offset={[0, -6]}>
//                     <div style={{
//                       background: '#0d1f12', borderRadius: 10,
//                       padding: '.75rem .9rem', minWidth: 190,
//                       border: `1px solid ${c}40`,
//                     }}>
//                       <div style={{ fontSize: 13, fontWeight: 600, color: '#e8f5ec', marginBottom: 6 }}>
//                         🦋 {s.species}
//                       </div>
//                       <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
//                         <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: `${c}20`, color: c, border: `1px solid ${c}35` }}>
//                           {s.confidence}
//                         </span>
//                         {s.region && (
//                           <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: 'rgba(255,255,255,.06)', color: '#7aab82' }}>
//                             {s.region}
//                           </span>
//                         )}
//                       </div>
//                       <div style={{ fontSize: 11, color: '#6b9b74', display: 'flex', flexDirection: 'column', gap: 3 }}>
//                         {s.date && <span>📅 {s.date}</span>}
//                         <span>📍 {s.lat.toFixed(4)}°N, {s.lng.toFixed(4)}°E</span>
//                         {s.imageUrl && (
//                           <a href={s.imageUrl} target="_blank" rel="noopener noreferrer"
//                             style={{ color: '#52c97b', marginTop: 4 }}>
//                             View image ↗
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   </Popup>
//                 </CircleMarker>
//               );
//             })}
//           </MapContainer>
//         )}
 
//         {/* Legend */}
//         {/* <div style={{
//           position: 'absolute', bottom: 14, left: 14, zIndex: 1000,
//           background: 'rgba(13,26,16,.88)',
//           border: '1px solid rgba(82,201,123,.15)',
//           borderRadius: 10, padding: '.5rem .85rem',
//           display: 'flex', gap: '.85rem',
//           backdropFilter: 'blur(6px)',
//         }}>
//           {Object.entries(CONFIDENCE_COLORS).map(([label, c]) => (
//             <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
//               <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
//               <span style={{ fontSize: 10, color: '#6b9b74' }}>{label}</span>
//             </div>
//           ))}
//         </div> */}
//       </div>
 
//       {/* ── Stats row ── */}
//       {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--border)' }}>
//         {[
//           ['Total', sightings.length],
//           // ['Confirmed', confirmedCount],
//           ['Top Region', topRegion],
//         ].map(([label, val], i) => (
//           <div key={label} style={{
//             padding: '.9rem', textAlign: 'center',
//             borderRight: i < 2 ? '1px solid var(--border)' : 'none',
//           }}>
//             <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#52c97b', fontFamily: 'var(--ff)' }}>{val}</div>
//             <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginTop: 2 }}>{label}</div>
//           </div>
//         ))}
//       </div> */}
 
//       {/* ── Sightings list ── */}
//       {/* <div style={{ padding: '1rem 1.25rem' }}>
//         <div style={{ fontSize: '.7rem', color: 'var(--text3)', letterSpacing: '.07em', marginBottom: '.6rem' }}>
//           {state.mapFilter.state && state.mapFilter.state !== 'All States'
//             ? `SIGHTINGS IN ${state.mapFilter.state.toUpperCase()}`
//             : 'ALL SIGHTINGS'}
//         </div>
//         {sightings.length === 0 ? (
//           <div style={{ fontSize: '.82rem', color: 'var(--text3)', padding: '.5rem 0' }}>
//             No sightings found for this filter.
//           </div>
//         ) : (
//           <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', maxHeight: 190, overflowY: 'auto' }}>
//             {sightings.map(s => {
//               const c = color(s);
//               const isSelected = selected?.id === s.id;
//               return (
//                 <div
//                   id={`row-${s.id}`}
//                   key={s.id}
//                   onClick={() => handleRowClick(s)}
//                   style={{
//                     display: 'flex', alignItems: 'center', gap: '.7rem',
//                     padding: '.42rem .75rem', borderRadius: 9, cursor: 'pointer',
//                     background: isSelected ? 'var(--greenGlow)' : 'transparent',
//                     border: isSelected ? '1px solid rgba(82,201,123,.18)' : '1px solid transparent',
//                     transition: 'background .15s, border .15s',
//                   }}
//                   onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }}
//                   onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
//                 >
//                   <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />
//                   <span style={{ flex: 1, fontSize: '.82rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.species}</span>
//                   <span style={{ fontSize: '.72rem', color: 'var(--text3)', flexShrink: 0 }}>{s.region || s.state}</span>
//                   <span style={{ fontSize: '.7rem', color: 'var(--text3)', flexShrink: 0 }}>{s.date}</span>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div> */}
 
//       <style>{`
//         .leaflet-popup-custom .leaflet-popup-content-wrapper {
//           background: transparent !important;
//           border: none !important;
//           box-shadow: none !important;
//           padding: 0 !important;
//         }
//         .leaflet-popup-custom .leaflet-popup-content { margin: 0 !important; }
//         .leaflet-popup-custom .leaflet-popup-tip-container { display: none; }
//         .leaflet-container { font-family: 'DM Sans', sans-serif; }
//       `}</style>
//     </div>
//   );
// }



// import { useState, useRef, useEffect } from 'react';
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useApp } from '../../context/AppContext';
// import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl:        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl:      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });

// // ─── Constants ────────────────────────────────────────────────────────────────
// const INDIA_CENTER = [22.5, 82.5];
// const INDIA_ZOOM   = 5;

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// // ✅ ONLY CHANGE IS HERE (Terrain fixed)
// const TILE_LAYERS = {
//   Dark: {
//     url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//     attribution: '&copy; CARTO',
//   },
//   Terrain: {
//     url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', // ✅ FIXED
//     attribution: '&copy; OpenTopoMap contributors',
//     subdomains: ['a', 'b', 'c'],
//   },
//   Satellite: {
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//     attribution: '&copy; Esri',
//   },
// };

// // ─── FlyTo helper ─────────────────────────────────────────────────────────────
// function FlyTo({ target }) {
//   const map = useMap();
//   useEffect(() => {
//     if (target) map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
//   }, [target, map]);
//   return null;
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();
//   const [selected,   setSelected]   = useState(null);
//   const [flyTarget,  setFlyTarget]  = useState(null);
//   const [tileKey,    setTileKey]    = useState('Dark');
//   const listRef = useRef(null);

//   useEffect(() => {
//     const s = state.mapFilter.state;
//     if (!s || s === 'All States') {
//       setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
//     }
//     setSelected(null);
//   }, [state.mapFilter.state]);

//   const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';

//   const handleRowClick = (s) => {
//     setSelected(s);
//     setFlyTarget({ lat: s.lat, lng: s.lng, zoom: 9 });
//     document.getElementById(`row-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//   };

//   return (
//     <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>

//       {/* ── Top bar ── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>
//         <select
//           className="sel"
//           value={state.mapFilter.state || 'All States'}
//           onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
//         >
//           <option>All States</option>
//         </select>

//         {/* Tile switcher */}
//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
//           {Object.keys(TILE_LAYERS).map(k => (
//             <button key={k} className="btn-sm"
//               style={{ fontSize: '.72rem', background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
//               onClick={() => setTileKey(k)}>
//               {k}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Map ── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading ? (
//           <div style={{
//             height: '100%', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', background: '#0d1a10',
//             color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         ) : (
//           <MapContainer
//             center={INDIA_CENTER}
//             zoom={INDIA_ZOOM}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={false}
//             maxBounds={[[5, 60], [40, 100]]}
//             maxBoundsViscosity={0.8}
//             minZoom={4}
//             maxZoom={14}
//           >
//             <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
//             <ZoomControl position="bottomright" />
//             <FlyTo target={flyTarget} />

//             {sightings.map(s => {
//               const c = color(s);
//               const isSelected = selected?.id === s.id;

//               // ✅ SAFE LAT LNG CAST (important)
//               const lat = Number(s.lat);
//               const lng = Number(s.lng);

//               if (isNaN(lat) || isNaN(lng)) return null;

//               return (
//                 <CircleMarker
//                   key={s.id}
//                   center={[lat, lng]}
//                   radius={isSelected ? 11 : 8}
//                   pathOptions={{
//                     color: c,
//                     fillColor: c,
//                     fillOpacity: isSelected ? 0.9 : 0.7,
//                     weight: isSelected ? 2.5 : 1.5,
//                   }}
//                   eventHandlers={{
//                     click: () => {
//                       setSelected(s);
//                       setFlyTarget({ lat, lng, zoom: 9 });
//                     },
//                   }}
//                 >
//                   <Popup>
//                     <div>
//                       <strong>{s.species}</strong><br />
//                       {s.confidence}<br />
//                       {lat.toFixed(4)}, {lng.toFixed(4)}
//                     </div>
//                   </Popup>
//                 </CircleMarker>
//               );
//             })}
//           </MapContainer>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useRef, useEffect, useMemo } from 'react';
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useApp } from '../../context/AppContext';
// import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });

// const INDIA_CENTER = [22.5, 82.5];
// const INDIA_ZOOM   = 5;

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// const TILE_LAYERS = {
//   Dark: {
//     url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//     attribution: '&copy; CARTO',
//   },
//   Terrain: {
//     url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//     attribution: '&copy; OpenTopoMap contributors',
//   },
//   Satellite: {
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//     attribution: '&copy; Esri',
//   },
// };

// function FlyTo({ target }) {
//   const map = useMap();
//   useEffect(() => {
//     if (target) map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
//   }, [target, map]);
//   return null;
// }

// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();
//   const [selected,  setSelected]  = useState(null);
//   const [flyTarget, setFlyTarget] = useState(null);
//   const [tileKey,   setTileKey]   = useState('Dark');

//   // ── Derive state list from ALL sightings (not just visible ones) ──────────
//   // Uses state.sightings (full dataset) so the dropdown doesn't shrink
//   // when a state filter is already applied.
//   const stateOptions = useMemo(() => {
//     const names = new Set(
//       state.sightings
//         .map(s => s.state)
//         .filter(Boolean)
//     );
//     return ['All States', ...Array.from(names).sort()];
//   }, [state.sightings]);

//   // Reset fly-to + selection when state filter changes
//   useEffect(() => {
//     const s = state.mapFilter.state;
//     if (!s || s === 'All States') {
//       setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
//     }
//     setSelected(null);
//   }, [state.mapFilter.state]);

//   const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';

//   return (
//     <div style={{
//       background: 'var(--bg3)', border: '1px solid var(--border)',
//       borderRadius: 18, overflow: 'hidden',
//     }}>

//       {/* ── Top bar ── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>

//         <select
//           className="sel"
//           value={state.mapFilter.state || 'All States'}
//           onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
//           disabled={loading || stateOptions.length <= 1}
//         >
//           {stateOptions.map(name => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>

//         {/* Sighting count badge */}
//         {!loading && (
//           <span style={{
//             fontSize: '.72rem', color: 'var(--text3)',
//             background: 'rgba(82,201,123,.08)',
//             border: '1px solid rgba(82,201,123,.15)',
//             borderRadius: 50, padding: '.2rem .7rem',
//           }}>
//             {sightings.length} sighting{sightings.length !== 1 ? 's' : ''}
//           </span>
//         )}

//         {/* Tile switcher */}
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

//       {/* ── Map ── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading ? (
//           <div style={{
//             height: '100%', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', background: '#0d1a10',
//             color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         ) : (
//           <MapContainer
//             center={INDIA_CENTER}
//             zoom={INDIA_ZOOM}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={false}
//             maxBounds={[[5, 60], [40, 100]]}
//             maxBoundsViscosity={0.8}
//             minZoom={4}
//             maxZoom={14}
//           >
//             <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
//             <ZoomControl position="bottomright" />
//             <FlyTo target={flyTarget} />

//             {sightings.map(s => {
//               const lat = Number(s.lat);
//               const lng = Number(s.lng);
//               if (isNaN(lat) || isNaN(lng)) return null;

//               const c = color(s);
//               const isSelected = selected?.id === s.id;

//               return (
//                 <CircleMarker
//                   key={s.id}
//                   center={[lat, lng]}
//                   radius={isSelected ? 11 : 8}
//                   pathOptions={{
//                     color: c, fillColor: c,
//                     fillOpacity: isSelected ? 0.9 : 0.7,
//                     weight: isSelected ? 2.5 : 1.5,
//                   }}
//                   eventHandlers={{
//                     click: () => {
//                       setSelected(s);
//                       setFlyTarget({ lat, lng, zoom: 9 });
//                     },
//                   }}
//                 >
//                   <Popup>
//                     <div>
//                       <strong>{s.species}</strong><br />
//                       {s.confidence}<br />
//                       {s.state && <>{s.state}<br /></>}
//                       {lat.toFixed(4)}, {lng.toFixed(4)}
//                     </div>
//                   </Popup>
//                 </CircleMarker>
//               );
//             })}
//           </MapContainer>
//         )}
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect, useMemo } from 'react';
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useApp } from '../../context/AppContext';
// import { STATE_BOUNDS } from '../../utils/appUtils';
// import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });

// const INDIA_CENTER = [22.5, 82.5];
// const INDIA_ZOOM   = 5;

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// const TILE_LAYERS = {
//   Dark: {
//     url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//     attribution: '&copy; CARTO',
//   },
//   Terrain: {
//     url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//     attribution: '&copy; OpenTopoMap contributors',
//   },
//   Satellite: {
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//     attribution: '&copy; Esri',
//   },
// };

// // ── Fly-to helper (point or bounds) ──────────────────────────────────────────
// function FlyTo({ target }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!target) return;
//     if (target.bounds) {
//       // flyToBounds for state selection
//       map.flyToBounds(target.bounds, { padding: [30, 30], duration: 1.2 });
//     } else if (target.lat != null) {
//       map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
//     }
//   }, [target, map]);
//   return null;
// }

// // ── Build a Leaflet LatLngBounds from STATE_BOUNDS entry ──────────────────────
// function stateToBounds(stateName) {
//   const b = STATE_BOUNDS.find(s => s.state === stateName);
//   if (!b) return null;
//   return L.latLngBounds(
//     [b.minLat, b.minLng],
//     [b.maxLat, b.maxLng]
//   );
// }

// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();
//   const [selected,  setSelected]  = useState(null);
//   const [flyTarget, setFlyTarget] = useState(null);
//   const [tileKey,   setTileKey]   = useState('Dark');

//   // ── State options derived from the full dataset ───────────────────────────
//   const stateOptions = useMemo(() => {
//     const names = new Set(
//       state.sightings.map(s => s.state).filter(Boolean)
//     );
//     return ['All States', ...Array.from(names).sort()];
//   }, [state.sightings]);

//   // ── Filter markers to only the selected state ─────────────────────────────
//   const selectedState = state.mapFilter?.state;

//   const visibleSightings = useMemo(() => {
//     if (!selectedState || selectedState === 'All States') return sightings;
//     return sightings.filter(s => s.state === selectedState);
//   }, [sightings, selectedState]);

//   // ── When state filter changes: fly to state bounds or reset to India ───────
//   useEffect(() => {
//     setSelected(null);
//     if (!selectedState || selectedState === 'All States') {
//       setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
//     } else {
//       const bounds = stateToBounds(selectedState);
//       if (bounds) {
//         setFlyTarget({ bounds });
//       } else {
//         // State not in STATE_BOUNDS — fly to centroid of its sightings
//         const pts = sightings.filter(s => s.state === selectedState);
//         if (pts.length) {
//           const avgLat = pts.reduce((a, s) => a + Number(s.lat), 0) / pts.length;
//           const avgLng = pts.reduce((a, s) => a + Number(s.lng), 0) / pts.length;
//           setFlyTarget({ lat: avgLat, lng: avgLng, zoom: 7 });
//         }
//       }
//     }
//   }, [selectedState]); // eslint-disable-line react-hooks/exhaustive-deps

//   const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';

//   return (
//     <div style={{
//       background: 'var(--bg3)', border: '1px solid var(--border)',
//       borderRadius: 18, overflow: 'hidden',
//     }}>

//       {/* ── Top bar ── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>

//         <select
//           className="sel"
//           value={selectedState || 'All States'}
//           onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
//           disabled={loading || stateOptions.length <= 1}
//         >
//           {stateOptions.map(name => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>

//         {/* Visible sighting count badge */}
//         {!loading && (
//           <span style={{
//             fontSize: '.72rem', color: 'var(--text3)',
//             background: 'rgba(82,201,123,.08)',
//             border: '1px solid rgba(82,201,123,.15)',
//             borderRadius: 50, padding: '.2rem .7rem',
//           }}>
//             {visibleSightings.length} sighting{visibleSightings.length !== 1 ? 's' : ''}
//             {selectedState && selectedState !== 'All States' && (
//               <span style={{ color: 'var(--green)', marginLeft: '.35rem' }}>
//                 in {selectedState}
//               </span>
//             )}
//           </span>
//         )}

//         {/* Tile switcher */}
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

//       {/* ── Map ── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading ? (
//           <div style={{
//             height: '100%', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', background: '#0d1a10',
//             color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         ) : (
//           <MapContainer
//             center={INDIA_CENTER}
//             zoom={INDIA_ZOOM}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={false}
//             maxBounds={[[5, 60], [40, 100]]}
//             maxBoundsViscosity={0.8}
//             minZoom={4}
//             maxZoom={14}
//           >
//             <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
//             <ZoomControl position="bottomright" />
//             <FlyTo target={flyTarget} />

//             {visibleSightings.map(s => {
//               const lat = Number(s.lat);
//               const lng = Number(s.lng);
//               if (isNaN(lat) || isNaN(lng)) return null;

//               const c = color(s);
//               const isSelected = selected?.id === s.id;

//               return (
//                 <CircleMarker
//                   key={s.id}
//                   center={[lat, lng]}
//                   radius={isSelected ? 11 : 8}
//                   pathOptions={{
//                     color: c, fillColor: c,
//                     fillOpacity: isSelected ? 0.9 : 0.7,
//                     weight: isSelected ? 2.5 : 1.5,
//                   }}
//                   eventHandlers={{
//                     click: () => {
//                       setSelected(s);
//                       setFlyTarget({ lat, lng, zoom: 9 });
//                     },
//                   }}
//                 >
//                   <Popup>
//                     <div>
//                       <strong>{s.species}</strong><br />
//                       {s.confidence}<br />
//                       {s.state && <>{s.state}<br /></>}
//                       {lat.toFixed(4)}, {lng.toFixed(4)}
//                     </div>
//                   </Popup>
//                 </CircleMarker>
//               );
//             })}
//           </MapContainer>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from 'react';
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useApp } from '../../context/AppContext';
// import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });

// const INDIA_CENTER = [22.5, 82.5];
// const INDIA_ZOOM   = 5;

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// const TILE_LAYERS = {
//   Dark: {
//     url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//     attribution: '&copy; CARTO',
//   },
//   Terrain: {
//     url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//     attribution: '&copy; OpenTopoMap contributors',
//   },
//   Satellite: {
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//     attribution: '&copy; Esri',
//   },
// };

// // ── Fly-to helper (point or bounds) ──────────────────────────────────────────
// function FlyTo({ target }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!target) return;
//     if (target.bounds) {
//       map.flyToBounds(target.bounds, { padding: [30, 30], duration: 1.2 });
//     } else if (target.lat != null) {
//       map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
//     }
//   }, [target, map]);
//   return null;
// }

// // ── Compute Leaflet LatLngBounds from sightings for a given state ─────────────
// function stateToBounds(stateName, allSightings) {
//   const pts = allSightings.filter(s => s.state === stateName);
//   if (!pts.length) return null;

//   const lats = pts.map(s => Number(s.lat));
//   const lngs = pts.map(s => Number(s.lng));

//   const minLat = Math.min(...lats);
//   const maxLat = Math.max(...lats);
//   const minLng = Math.min(...lngs);
//   const maxLng = Math.max(...lngs);

//   // Padding so markers aren't clipped at the edge
//   const padLat = Math.max((maxLat - minLat) * 0.15, 0.5);
//   const padLng = Math.max((maxLng - minLng) * 0.15, 0.5);

//   return L.latLngBounds(
//     [minLat - padLat, minLng - padLng],
//     [maxLat + padLat, maxLng + padLng]
//   );
// }

// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();
//   const [selected,  setSelected]  = useState(null);
//   const [flyTarget, setFlyTarget] = useState(null);
//   const [tileKey,   setTileKey]   = useState('Dark');

//   // ── State options derived from the full dataset ───────────────────────────
//   const stateOptions = useMemo(() => {
//     const names = new Set(
//       state.sightings.map(s => s.state).filter(Boolean)
//     );
//     return ['All States', ...Array.from(names).sort()];
//   }, [state.sightings]);

//   // ── Filter markers to only the selected state ─────────────────────────────
//   const selectedState = state.mapFilter?.state;

//   const visibleSightings = useMemo(() => {
//     if (!selectedState || selectedState === 'All States') return sightings;
//     return sightings.filter(s => s.state === selectedState);
//   }, [sightings, selectedState]);

//   // ── When state filter changes: fly to computed bounds or reset to India ────
//   useEffect(() => {
//     setSelected(null);
//     if (!selectedState || selectedState === 'All States') {
//       setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
//     } else {
//       const bounds = stateToBounds(selectedState, sightings);
//       if (bounds) {
//         setFlyTarget({ bounds });
//       }
//     }
//   }, [selectedState]); // eslint-disable-line react-hooks/exhaustive-deps

//   const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';

//   return (
//     <div style={{
//       background: 'var(--bg3)', border: '1px solid var(--border)',
//       borderRadius: 18, overflow: 'hidden',
//     }}>

//       {/* ── Top bar ── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>

//         <select
//           className="sel"
//           value={selectedState || 'All States'}
//           onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
//           disabled={loading || stateOptions.length <= 1}
//         >
//           {stateOptions.map(name => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>

//         {/* Visible sighting count badge */}
//         {!loading && (
//           <span style={{
//             fontSize: '.72rem', color: 'var(--text3)',
//             background: 'rgba(82,201,123,.08)',
//             border: '1px solid rgba(82,201,123,.15)',
//             borderRadius: 50, padding: '.2rem .7rem',
//           }}>
//             {visibleSightings.length} sighting{visibleSightings.length !== 1 ? 's' : ''}
//             {selectedState && selectedState !== 'All States' && (
//               <span style={{ color: 'var(--green)', marginLeft: '.35rem' }}>
//                 in {selectedState}
//               </span>
//             )}
//           </span>
//         )}

//         {/* Tile switcher */}
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

//       {/* ── Map ── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading ? (
//           <div style={{
//             height: '100%', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', background: '#0d1a10',
//             color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         ) : (
//           <MapContainer
//             center={INDIA_CENTER}
//             zoom={INDIA_ZOOM}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={false}
//             maxBounds={[[5, 60], [40, 100]]}
//             maxBoundsViscosity={0.8}
//             minZoom={4}
//             maxZoom={14}
//           >
//             <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
//             <ZoomControl position="bottomright" />
//             <FlyTo target={flyTarget} />

//             {visibleSightings.map(s => {
//               const lat = Number(s.lat);
//               const lng = Number(s.lng);
//               if (isNaN(lat) || isNaN(lng)) return null;

//               const c = color(s);
//               const isSelected = selected?.id === s.id;

//               return (
//                 <CircleMarker
//                   key={s.id}
//                   center={[lat, lng]}
//                   radius={isSelected ? 11 : 8}
//                   pathOptions={{
//                     color: c, fillColor: c,
//                     fillOpacity: isSelected ? 0.9 : 0.7,
//                     weight: isSelected ? 2.5 : 1.5,
//                   }}
//                   eventHandlers={{
//                     click: () => {
//                       setSelected(s);
//                       setFlyTarget({ lat, lng, zoom: 9 });
//                     },
//                   }}
//                 >
//                   <Popup>
//                     <div>
//                       <strong>{s.species}</strong><br />
//                       {s.confidence}<br />
//                       {s.state && <>{s.state}<br /></>}
//                       {lat.toFixed(4)}, {lng.toFixed(4)}
//                     </div>
//                   </Popup>
//                 </CircleMarker>
//               );
//             })}
//           </MapContainer>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useApp } from '../../context/AppContext';
// import { STATE_BOUNDS } from '../../utils/appUtils';
// import L from 'leaflet';

// const INDIA_CENTER = [22.5, 82.5];
// const INDIA_ZOOM   = 5;

// const CONFIDENCE_COLORS = {
//   Confirmed: '#52c97b',
//   High:      '#60a5fa',
//   Probable:  '#fbbf24',
// };

// const TILE_LAYERS = {
//   Dark: {
//     url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
//     attribution: '&copy; CARTO',
//   },
//   Terrain: {
//     url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//     attribution: '&copy; OpenTopoMap contributors',
//   },
//   Satellite: {
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//     attribution: '&copy; Esri',
//   },
// };

// // ── Custom pin icon factory ───────────────────────────────────────────────────
// function makePinIcon(color, selected = false) {
//   const W = selected ? 40 : 30;
//   const H = W + 12;
//   const shadow = selected
//     ? `drop-shadow(0 0 7px ${color}bb)`
//     : `drop-shadow(0 3px 5px rgba(0,0,0,.6))`;

//   const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 30 42">
//     <defs>
//       <radialGradient id="g${color.replace('#','')}" cx="38%" cy="32%">
//         <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
//         <stop offset="100%" stop-color="${color}" stop-opacity="0.65"/>
//       </radialGradient>
//     </defs>
//     <path d="M15 1C7.82 1 2 6.82 2 14c0 9.2 13 27 13 27S28 23.2 28 14C28 6.82 22.18 1 15 1z"
//           fill="url(#g${color.replace('#','')})"
//           stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
//     <circle cx="15" cy="14" r="7.5" fill="rgba(0,0,0,0.22)"/>
//     <text x="15" y="18" text-anchor="middle" font-size="10" font-family="serif">🦋</text>
//   </svg>`;

//   return L.divIcon({
//     html: `<div style="filter:${shadow}">${svg}</div>`,
//     className: '',
//     iconSize:   [W, H],
//     iconAnchor: [W / 2, H],
//     popupAnchor:[0, -H],
//   });
// }

// // ── Popup styles injected once ────────────────────────────────────────────────
// const POPUP_CSS = `
//   .bf-popup .leaflet-popup-content-wrapper {
//     background: linear-gradient(160deg,#0a1a0e,#070f09);
//     border: 1px solid rgba(82,201,123,.32);
//     border-radius: 14px;
//     color: #e8f0e9;
//     box-shadow: 0 14px 36px rgba(0,0,0,.65);
//     padding: 0;
//     overflow: hidden;
//   }
//   .bf-popup .leaflet-popup-content { margin: 0; }
//   .bf-popup .leaflet-popup-tip-container { display: none; }
//   .bf-popup .leaflet-popup-close-button {
//     color: rgba(134,211,175,.45) !important;
//     top: 7px !important; right: 9px !important;
//     font-size: 15px !important;
//   }
//   .bf-popup .leaflet-popup-close-button:hover { color: #52c97b !important; }
// `;

// // ── Fly-to helper ─────────────────────────────────────────────────────────────
// function FlyTo({ target }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!target) return;
//     if (target.bounds) {
//       map.flyToBounds(target.bounds, { padding: [40, 40], duration: 1.2 });
//     } else if (target.lat != null) {
//       map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
//     }
//   }, [target, map]);
//   return null;
// }

// // ── State → Leaflet bounds ─────────────────────────────────────────────────────
// function stateToBounds(stateName) {
//   const b = STATE_BOUNDS.find(s => s.state === stateName);
//   if (!b) return null;
//   return L.latLngBounds([b.minLat, b.minLng], [b.maxLat, b.maxLng]);
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function IndiaMap({ sightings, loading }) {
//   const { state, dispatch } = useApp();
//   const [selected,  setSelected]  = useState(null);
//   const [flyTarget, setFlyTarget] = useState(null);
//   const [tileKey,   setTileKey]   = useState('Dark');

//   useEffect(() => {
//     const id = 'bf-popup-css';
//     if (!document.getElementById(id)) {
//       const el = document.createElement('style');
//       el.id = id; el.textContent = POPUP_CSS;
//       document.head.appendChild(el);
//     }
//   }, []);

//   const stateOptions = useMemo(() => {
//     const names = new Set(state.sightings.map(s => s.state).filter(Boolean));
//     return ['All States', ...Array.from(names).sort()];
//   }, [state.sightings]);

//   const selectedState = state.mapFilter?.state;

//   const visibleSightings = useMemo(() => {
//     if (!selectedState || selectedState === 'All States') return sightings;
//     return sightings.filter(s => s.state === selectedState);
//   }, [sightings, selectedState]);

//   useEffect(() => {
//     setSelected(null);
//     if (!selectedState || selectedState === 'All States') {
//       setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
//     } else {
//       const bounds = stateToBounds(selectedState);
//       if (bounds) {
//         setFlyTarget({ bounds });
//       } else {
//         const pts = sightings.filter(s => s.state === selectedState);
//         if (pts.length) {
//           const avgLat = pts.reduce((a, s) => a + Number(s.lat), 0) / pts.length;
//           const avgLng = pts.reduce((a, s) => a + Number(s.lng), 0) / pts.length;
//           setFlyTarget({ lat: avgLat, lng: avgLng, zoom: 7 });
//         }
//       }
//     }
//   }, [selectedState]); // eslint-disable-line react-hooks/exhaustive-deps

//   const colorOf = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';

//   return (
//     <div style={{
//       background: 'var(--bg3)', border: '1px solid var(--border)',
//       borderRadius: 18, overflow: 'hidden',
//     }}>

//       {/* ── Top bar ── */}
//       <div style={{
//         display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
//         flexWrap: 'wrap', alignItems: 'center',
//         borderBottom: '1px solid var(--border)',
//       }}>
//         <select
//           className="sel"
//           value={selectedState || 'All States'}
//           onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
//           disabled={loading || stateOptions.length <= 1}
//         >
//           {stateOptions.map(name => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>

//         {!loading && (
//           <span style={{
//             fontSize: '.72rem', color: 'var(--text3)',
//             background: 'rgba(82,201,123,.08)',
//             border: '1px solid rgba(82,201,123,.15)',
//             borderRadius: 50, padding: '.2rem .7rem',
//           }}>
//             {visibleSightings.length} sighting{visibleSightings.length !== 1 ? 's' : ''}
//             {selectedState && selectedState !== 'All States' && (
//               <span style={{ color: 'var(--green)', marginLeft: '.35rem' }}>in {selectedState}</span>
//             )}
//           </span>
//         )}

//         {/* Confidence legend */}
//         <div style={{ display: 'flex', gap: '.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
//           {Object.entries(CONFIDENCE_COLORS).map(([label, c]) => (
//             <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.7rem', color: 'var(--text3)' }}>
//               <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />
//               {label}
//             </span>
//           ))}
//         </div>

//         {/* Tile switcher */}
//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
//           {Object.keys(TILE_LAYERS).map(k => (
//             <button key={k} className="btn-sm"
//               style={{ fontSize: '.72rem', background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
//               onClick={() => setTileKey(k)}>{k}</button>
//           ))}
//         </div>
//       </div>

//       {/* ── Map ── */}
//       <div style={{ position: 'relative', height: 480 }}>
//         {loading ? (
//           <div style={{
//             height: '100%', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', background: '#0d1a10',
//             color: 'var(--text3)', fontSize: 14,
//           }}>
//             Loading sightings…
//           </div>
//         ) : (
//           <MapContainer
//             center={INDIA_CENTER} zoom={INDIA_ZOOM}
//             style={{ height: '100%', width: '100%' }}
//             zoomControl={false}
//             maxBounds={[[5, 60], [40, 100]]}
//             maxBoundsViscosity={0.8}
//             minZoom={4} maxZoom={14}
//           >
//             <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
//             <ZoomControl position="bottomright" />
//             <FlyTo target={flyTarget} />

//             {visibleSightings.map(s => {
//               const lat = Number(s.lat);
//               const lng = Number(s.lng);
//               if (isNaN(lat) || isNaN(lng)) return null;

//               const isSelected = selected?.id === s.id;

//               return (
//                 <Marker
//                   key={s.id}
//                   position={[lat, lng]}
//                   icon={makePinIcon(colorOf(s), isSelected)}
//                   zIndexOffset={isSelected ? 1000 : 0}
//                   eventHandlers={{
//                     click: () => {
//                       setSelected(s);
//                       setFlyTarget({ lat, lng, zoom: 9 });
//                     },
//                   }}
//                 >
//                   <Popup className="bf-popup" minWidth={210}>
//                     <div style={{ padding: '1rem 1.1rem' }}>

//                       {/* Confidence badge */}
//                       <span style={{
//                         display: 'inline-block', marginBottom: '.65rem',
//                         padding: '2px 10px', borderRadius: 20, fontSize: '.68rem',
//                         letterSpacing: '.05em',
//                         background: `${colorOf(s)}18`, color: colorOf(s),
//                         border: `1px solid ${colorOf(s)}44`,
//                       }}>
//                         {s.confidence}
//                       </span>

//                       {/* Species */}
//                       <div style={{
//                         fontFamily: 'Cormorant Garamond,Georgia,serif',
//                         fontSize: '1.05rem', color: '#e8f0e9',
//                         marginBottom: '.3rem', lineHeight: 1.3,
//                       }}>
//                         🦋 {s.species}
//                       </div>

//                       {/* State */}
//                       {s.state && (
//                         <div style={{ fontSize: '.78rem', color: '#8aaa92', marginBottom: '.2rem' }}>
//                           📍 {s.state}
//                         </div>
//                       )}

//                       {/* Date */}
//                       {s.date && (
//                         <div style={{ fontSize: '.75rem', color: '#4a6a52', marginBottom: '.2rem' }}>
//                           📅 {s.date}
//                         </div>
//                       )}

//                       {/* Coords */}
//                       <div style={{
//                         fontSize: '.66rem', color: '#4a6a52',
//                         marginTop: '.55rem', paddingTop: '.55rem',
//                         borderTop: '1px solid rgba(134,211,175,.1)',
//                         fontFamily: 'monospace',
//                       }}>
//                         {lat.toFixed(5)}, {lng.toFixed(5)}
//                       </div>
//                     </div>
//                   </Popup>
//                 </Marker>
//               );
//             })}
//           </MapContainer>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const INDIA_CENTER = [22.5, 82.5];
const INDIA_ZOOM   = 5;

const CONFIDENCE_COLORS = {
  Confirmed: '#52c97b',
  High:      '#60a5fa',
  Probable:  '#fbbf24',
};

const TILE_LAYERS = {
  Dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO',
  },
  Terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors',
  },
  Satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
};

// ── Minimal custom pin (circle head + thin stem) ─────────────────────────────
const createPinIcon = (selected = false) => {
  const size = selected ? 28 : 22;
  const color = '#ff0000'; // red

  return L.divIcon({
    className: '',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:${size}px;
          height:${size}px;
          background:${color};
          border-radius:50%;
          border:2px solid white;
        "></div>
        <div style="
          width:2px;
          height:${size}px;
          background:${color};
        "></div>
      </div>
    `,
    iconSize: [size, size * 2],
    iconAnchor: [size / 2, size * 2],
    popupAnchor: [0, -size * 1.5],
  });
};

// ── Fly-to helper ────────────────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    if (target.bounds) {
      map.flyToBounds(target.bounds, { padding: [30, 30], duration: 1.2 });
    } else if (target.lat != null) {
      map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}

// ── Compute bounds ───────────────────────────────────────────────────────────
function stateToBounds(stateName, allSightings) {
  const pts = allSightings.filter(s => s.state === stateName);
  if (!pts.length) return null;

  const lats = pts.map(s => Number(s.lat));
  const lngs = pts.map(s => Number(s.lng));

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const padLat = Math.max((maxLat - minLat) * 0.15, 0.5);
  const padLng = Math.max((maxLng - minLng) * 0.15, 0.5);

  return L.latLngBounds(
    [minLat - padLat, minLng - padLng],
    [maxLat + padLat, maxLng + padLng]
  );
}

export default function IndiaMap({ sightings, loading }) {
  const { state, dispatch } = useApp();
  const [selected,  setSelected]  = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);
  const [tileKey,   setTileKey]   = useState('Dark');

  const stateOptions = useMemo(() => {
    const names = new Set(
      state.sightings.map(s => s.state).filter(Boolean)
    );
    return ['All States', ...Array.from(names).sort()];
  }, [state.sightings]);

  const selectedState = state.mapFilter?.state;

  const visibleSightings = useMemo(() => {
    if (!selectedState || selectedState === 'All States') return sightings;
    return sightings.filter(s => s.state === selectedState);
  }, [sightings, selectedState]);

  useEffect(() => {
    setSelected(null);
    if (!selectedState || selectedState === 'All States') {
      setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
    } else {
      const bounds = stateToBounds(selectedState, sightings);
      if (bounds) setFlyTarget({ bounds });
    }
  }, [selectedState]); // eslint-disable-line

  const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#111';

  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid var(--border)',
      borderRadius: 18, overflow: 'hidden',
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
        flexWrap: 'wrap', alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}>

        <select
          className="sel"
          value={selectedState || 'All States'}
          onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
          disabled={loading || stateOptions.length <= 1}
        >
          {stateOptions.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {/* {!loading && (
          <span style={{
            fontSize: '.72rem', color: 'var(--text3)',
            background: 'rgba(82,201,123,.08)',
            border: '1px solid rgba(82,201,123,.15)',
            borderRadius: 50, padding: '.2rem .7rem',
          }}>
            {visibleSightings.length} sighting{visibleSightings.length !== 1 ? 's' : ''}
            {selectedState && selectedState !== 'All States' && (
              <span style={{ color: 'var(--green)', marginLeft: '.35rem' }}>
                in {selectedState}
              </span>
            )}
          </span>
        )} */}

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

      {/* Map */}
      <div style={{ position: 'relative', height: 480 }}>
        {loading ? (
          <div style={{
            height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: '#0d1a10',
            color: 'var(--text3)', fontSize: 14,
          }}>
            Loading sightings…
          </div>
        ) : (
          <MapContainer
            center={INDIA_CENTER}
            zoom={INDIA_ZOOM}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            maxBounds={[[5, 60], [40, 100]]}
            maxBoundsViscosity={0.8}
            minZoom={4}
            maxZoom={14}
          >
            <TileLayer key={tileKey} {...TILE_LAYERS[tileKey]} />
            <ZoomControl position="bottomright" />
            <FlyTo target={flyTarget} />

            {visibleSightings.map(s => {
              const lat = Number(s.lat);
              const lng = Number(s.lng);
              if (isNaN(lat) || isNaN(lng)) return null;

              const isSelected = selected?.id === s.id;
              const c = color(s);

              return (
                <Marker
                  key={s.id}
                  position={[lat, lng]}
                  icon={createPinIcon(c, isSelected)}
                  eventHandlers={{
                    click: () => {
                      setSelected(s);
                      setFlyTarget({ lat, lng, zoom: 9 });
                    },
                  }}
                >
                  <Popup>
                    <div>
                      <strong>{s.species}</strong><br />
                      {s.confidence}<br />
                      {s.state && <>{s.state}<br /></>}
                      {lat.toFixed(4)}, {lng.toFixed(4)}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
}