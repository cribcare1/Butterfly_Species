
import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import L from 'leaflet';
 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});
 
// ─── Constants ────────────────────────────────────────────────────────────────
const INDIA_CENTER = [22.5, 82.5];
const INDIA_ZOOM   = 5;
 
const CONFIDENCE_COLORS = {
  Confirmed: '#52c97b',
  High:      '#60a5fa',
  Probable:  '#fbbf24',
};
 
// State centers for auto-fly when a state filter is selected
const STATE_CENTERS = {
  'Andhra Pradesh':    { lat: 15.9,  lng: 79.7,  zoom: 7 },
  'Arunachal Pradesh': { lat: 28.2,  lng: 94.7,  zoom: 7 },
  'Assam':             { lat: 26.2,  lng: 92.9,  zoom: 7 },
  'Bihar':             { lat: 25.1,  lng: 85.3,  zoom: 7 },
  'Chhattisgarh':      { lat: 21.3,  lng: 81.9,  zoom: 7 },
  'Goa':               { lat: 15.3,  lng: 74.1,  zoom: 9 },
  'Gujarat':           { lat: 22.3,  lng: 71.2,  zoom: 7 },
  'Haryana':           { lat: 29.1,  lng: 76.1,  zoom: 7 },
  'Himachal Pradesh':  { lat: 31.1,  lng: 77.2,  zoom: 7 },
  'Jharkhand':         { lat: 23.6,  lng: 85.3,  zoom: 7 },
  'Karnataka':         { lat: 15.3,  lng: 75.7,  zoom: 7 },
  'Kerala':            { lat: 10.9,  lng: 76.3,  zoom: 7 },
  'Madhya Pradesh':    { lat: 23.5,  lng: 77.7,  zoom: 7 },
  'Maharashtra':       { lat: 19.7,  lng: 75.7,  zoom: 7 },
  'Manipur':           { lat: 24.7,  lng: 93.9,  zoom: 8 },
  'Meghalaya':         { lat: 25.5,  lng: 91.4,  zoom: 8 },
  'Mizoram':           { lat: 23.2,  lng: 92.8,  zoom: 8 },
  'Nagaland':          { lat: 26.2,  lng: 94.6,  zoom: 8 },
  'Odisha':            { lat: 20.9,  lng: 84.2,  zoom: 7 },
  'Punjab':            { lat: 31.1,  lng: 75.3,  zoom: 7 },
  'Rajasthan':         { lat: 27.0,  lng: 74.2,  zoom: 7 },
  'Sikkim':            { lat: 27.5,  lng: 88.5,  zoom: 9 },
  'Tamil Nadu':        { lat: 11.1,  lng: 78.7,  zoom: 7 },
  'Telangana':         { lat: 18.1,  lng: 79.0,  zoom: 7 },
  'Tripura':           { lat: 23.7,  lng: 91.7,  zoom: 8 },
  'Uttar Pradesh':     { lat: 27.1,  lng: 80.9,  zoom: 7 },
  'Uttarakhand':       { lat: 30.1,  lng: 79.2,  zoom: 7 },
  'West Bengal':       { lat: 23.8,  lng: 87.9,  zoom: 7 },
};
 
// const QUICK_REGIONS = [
//   { label: 'Western Ghats', lat: 12.5, lng: 75.5, zoom: 7 },
//   { label: 'Himalayan',     lat: 30.5, lng: 78.5, zoom: 7 },
//   { label: 'Deccan',        lat: 17.0, lng: 78.0, zoom: 7 },
//   { label: 'Northeast',     lat: 26.0, lng: 93.0, zoom: 7 },
//   { label: 'Reset',         lat: 22.5, lng: 82.5, zoom: 5 },
// ];
 
const TILE_LAYERS = {
  Dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  Terrain: {
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="http://stamen.com">Stamen Design</a>',
  },
  Satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
};
 
// ─── FlyTo helper ─────────────────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], target.zoom ?? 7, { duration: 1.2 });
  }, [target, map]);
  return null;
}
 
// ─── Derive unique states from actual sightings data ─────────────────────────
function buildStateOptions(sightings) {
  const states = [...new Set(sightings.map(s => s.state).filter(Boolean))].sort();
  return ['All States', ...states];
}
 
// ─── Main component ───────────────────────────────────────────────────────────
export default function IndiaMap({ sightings, loading }) {
  const { state, dispatch } = useApp();
  const [selected,   setSelected]   = useState(null);
  const [flyTarget,  setFlyTarget]  = useState(null);
  const [tileKey,    setTileKey]    = useState('Dark');
  const listRef = useRef(null);
 
  // Build state dropdown options from actual sightings (not a hardcoded list)
  const stateOptions = buildStateOptions(sightings);
 
  // Auto-fly when state filter changes
  useEffect(() => {
    const s = state.mapFilter.state;
    if (!s || s === 'All States') {
      setFlyTarget({ lat: INDIA_CENTER[0], lng: INDIA_CENTER[1], zoom: INDIA_ZOOM });
    } else if (STATE_CENTERS[s]) {
      setFlyTarget(STATE_CENTERS[s]);
    }
    // Clear selected marker when filter changes
    setSelected(null);
  }, [state.mapFilter.state]);
 
  const color = (s) => CONFIDENCE_COLORS[s.confidence] ?? '#fbbf24';
 
  const handleRowClick = (s) => {
    setSelected(s);
    setFlyTarget({ lat: s.lat, lng: s.lng, zoom: 9 });
    document.getElementById(`row-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
 
  // Stats derived from currently visible sightings
  // const confirmedCount = sightings.filter(s => s.confidence === 'Confirmed').length;
  const grouped   = sightings.reduce((a, s) => { a[s.region] = (a[s.region] || 0) + 1; return a; }, {});
  const topRegion = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
 
  return (
    <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
 
      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', gap: '.65rem', padding: '.9rem 1.25rem',
        flexWrap: 'wrap', alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* State filter — built from real sightings data */}
        <select
          className="sel"
          value={state.mapFilter.state || 'All States'}
          onChange={e => dispatch({ type: 'MAP_FILTER', v: { state: e.target.value } })}
        >
          {stateOptions.map(s => <option key={s}>{s}</option>)}
        </select>
 
        {/* Quick-fly region buttons */}
        {/* <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
          {QUICK_REGIONS.map(r => (
            <button key={r.label} className="btn-sm"
              onClick={() => {
                setFlyTarget(r);
                if (r.label === 'Reset') dispatch({ type: 'MAP_FILTER', v: { state: 'All States' } });
              }}
              style={{ fontSize: '.72rem' }}>
              {r.label}
            </button>
          ))}
        </div> */}
 
        {/* Tile switcher */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '.35rem' }}>
          {Object.keys(TILE_LAYERS).map(k => (
            <button key={k} className="btn-sm"
              style={{ fontSize: '.72rem', background: tileKey === k ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
              onClick={() => setTileKey(k)}>
              {k}
            </button>
          ))}
        </div>
 
        <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
          {sightings.length} sighting{sightings.length !== 1 ? 's' : ''}
        </span>
      </div>
 
      {/* ── Map ── */}
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
 
            {sightings.map(s => {
              const c = color(s);
              const isSelected = selected?.id === s.id;
              return (
                <CircleMarker
                  key={s.id}
                  center={[s.lat, s.lng]}
                  radius={isSelected ? 11 : 8}
                  pathOptions={{
                    color: c, fillColor: c,
                    fillOpacity: isSelected ? 0.9 : 0.7,
                    weight: isSelected ? 2.5 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => { setSelected(s); setFlyTarget({ lat: s.lat, lng: s.lng, zoom: 9 }); },
                  }}
                >
                  <Popup closeButton={false} className="leaflet-popup-custom" offset={[0, -6]}>
                    <div style={{
                      background: '#0d1f12', borderRadius: 10,
                      padding: '.75rem .9rem', minWidth: 190,
                      border: `1px solid ${c}40`,
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#e8f5ec', marginBottom: 6 }}>
                        🦋 {s.species}
                      </div>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
                        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: `${c}20`, color: c, border: `1px solid ${c}35` }}>
                          {s.confidence}
                        </span>
                        {s.region && (
                          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: 'rgba(255,255,255,.06)', color: '#7aab82' }}>
                            {s.region}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: '#6b9b74', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {s.date && <span>📅 {s.date}</span>}
                        <span>📍 {s.lat.toFixed(4)}°N, {s.lng.toFixed(4)}°E</span>
                        {s.imageUrl && (
                          <a href={s.imageUrl} target="_blank" rel="noopener noreferrer"
                            style={{ color: '#52c97b', marginTop: 4 }}>
                            View image ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        )}
 
        {/* Legend */}
        {/* <div style={{
          position: 'absolute', bottom: 14, left: 14, zIndex: 1000,
          background: 'rgba(13,26,16,.88)',
          border: '1px solid rgba(82,201,123,.15)',
          borderRadius: 10, padding: '.5rem .85rem',
          display: 'flex', gap: '.85rem',
          backdropFilter: 'blur(6px)',
        }}>
          {Object.entries(CONFIDENCE_COLORS).map(([label, c]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              <span style={{ fontSize: 10, color: '#6b9b74' }}>{label}</span>
            </div>
          ))}
        </div> */}
      </div>
 
      {/* ── Stats row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--border)' }}>
        {[
          ['Total', sightings.length],
          // ['Confirmed', confirmedCount],
          ['Top Region', topRegion],
        ].map(([label, val], i) => (
          <div key={label} style={{
            padding: '.9rem', textAlign: 'center',
            borderRight: i < 2 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#52c97b', fontFamily: 'var(--ff)' }}>{val}</div>
            <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
 
      {/* ── Sightings list ── */}
      <div style={{ padding: '1rem 1.25rem' }}>
        <div style={{ fontSize: '.7rem', color: 'var(--text3)', letterSpacing: '.07em', marginBottom: '.6rem' }}>
          {state.mapFilter.state && state.mapFilter.state !== 'All States'
            ? `SIGHTINGS IN ${state.mapFilter.state.toUpperCase()}`
            : 'ALL SIGHTINGS'}
        </div>
        {sightings.length === 0 ? (
          <div style={{ fontSize: '.82rem', color: 'var(--text3)', padding: '.5rem 0' }}>
            No sightings found for this filter.
          </div>
        ) : (
          <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', maxHeight: 190, overflowY: 'auto' }}>
            {sightings.map(s => {
              const c = color(s);
              const isSelected = selected?.id === s.id;
              return (
                <div
                  id={`row-${s.id}`}
                  key={s.id}
                  onClick={() => handleRowClick(s)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.7rem',
                    padding: '.42rem .75rem', borderRadius: 9, cursor: 'pointer',
                    background: isSelected ? 'var(--greenGlow)' : 'transparent',
                    border: isSelected ? '1px solid rgba(82,201,123,.18)' : '1px solid transparent',
                    transition: 'background .15s, border .15s',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '.82rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.species}</span>
                  <span style={{ fontSize: '.72rem', color: 'var(--text3)', flexShrink: 0 }}>{s.region || s.state}</span>
                  <span style={{ fontSize: '.7rem', color: 'var(--text3)', flexShrink: 0 }}>{s.date}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
 
      <style>{`
        .leaflet-popup-custom .leaflet-popup-content-wrapper {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-custom .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-custom .leaflet-popup-tip-container { display: none; }
        .leaflet-container { font-family: 'DM Sans', sans-serif; }
      `}</style>
    </div>
  );
}