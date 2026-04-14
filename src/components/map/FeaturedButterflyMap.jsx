import { useState } from 'react';
import Loader from '../shared/Loader';

export default function FeaturedButterflyMap({ images, loading, error }) {
  const [hovered, setHovered] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Loader />
        <p style={{ fontSize: '.75rem', color: 'var(--text3)', marginTop: '.5rem' }}>
          Loading featured butterfly images…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          background: 'rgba(248,113,113,.08)',
          border: '1px solid rgba(248,113,113,.2)',
          borderRadius: 8,
          padding: '.75rem 1rem',
          fontSize: '.78rem',
          color: '#f87171',
        }}>
          ⚠ Could not load featured images: {error}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '.85rem', color: 'var(--text3)' }}>
          No featured butterfly images available yet.
        </p>
      </div>
    );
  }

  // Convert lat/lng to SVG coordinates (India bounds)
  // India roughly: lat 8-37, lng 68-97
  const dotPositions = images
    .filter(img => !isNaN(img.latitude) && !isNaN(img.longitude))
    .map(img => ({
      ...img,
      cx: ((img.longitude - 68) / (97 - 68)) * 390 + 25,
      cy: ((37 - img.latitude) / (37 - 8)) * 445 + 25,
    }));

  return (
    <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)', marginBottom: '.5rem' }}>
          📸 Featured Butterflies · {dotPositions.length} documented locations
        </div>
        <h3 style={{ fontFamily: 'var(--ff)', fontSize: '1.3rem', color: 'var(--text)', margin: '0 0 .5rem 0' }}>
          Wiki Loves <em>Butterfly</em> Sightings
        </h3>
        <p style={{ fontSize: '.82rem', color: 'var(--text2)', margin: '0', lineHeight: 1.6 }}>
          Real-world butterfly observations from India documented by the community on Wikimedia Commons. Click on map pins to see location details.
        </p>
      </div>

      {/* SVG Map */}
      <svg viewBox="0 0 440 495" style={{ width: '100%', maxHeight: 420, display: 'block', marginBottom: '1rem' }}>
        {/* India outline */}
        <path
          d="M180 25 L200 22 L225 28 L248 35 L268 45 L285 60 L298 78 L308 95 L315 115 L318 135 L316 155 L310 172 L308 190 L310 208 L315 225 L322 242 L330 258 L338 272 L345 285 L352 300 L356 318 L355 336 L348 352 L338 366 L325 378 L310 388 L295 396 L280 402 L265 406 L252 410 L240 414 L228 410 L215 403 L202 396 L190 388 L178 378 L167 366 L158 352 L152 336 L150 318 L152 300 L158 285 L164 272 L170 258 L176 242 L180 225 L183 208 L184 190 L182 172 L178 155 L175 135 L176 115 L180 95 L185 78 L188 60 L184 45 L180 30 Z"
          fill="rgba(82,201,123,.05)"
          stroke="rgba(82,201,123,.25)"
          strokeWidth="1.5"
        />
        {/* Sri Lanka */}
        <ellipse cx="340" cy="450" rx="22" ry="28" fill="rgba(82,201,123,.04)" stroke="rgba(82,201,123,.2)" strokeWidth="1" />

        {/* Featured butterfly pins */}
        {dotPositions.map((dot, idx) => (
          <g
            key={dot.id}
            onMouseEnter={() => setHovered(dot)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelectedImage(dot)}
            style={{ cursor: 'pointer' }}
          >
            {/* Halo */}
            <circle cx={dot.cx} cy={dot.cy} r="16" fill="rgba(34,197,94,.1)" opacity={hovered?.id === dot.id ? 1 : 0.5} />
            {/* Circle ring */}
            <circle cx={dot.cx} cy={dot.cy} r="10" fill="none" stroke="#52c97b" strokeWidth="2" />
            {/* Center dot */}
            <circle cx={dot.cx} cy={dot.cy} r="5" fill="#52c97b" />
            {/* Number badge */}
            <text
              x={dot.cx}
              y={dot.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="9"
              fontWeight="bold"
              pointerEvents="none"
            >
              {idx + 1}
            </text>
          </g>
        ))}

        {/* Tooltip */}
        {hovered && (
          <g>
            <rect
              x={Math.min(hovered.cx - 5, 340)}
              y={hovered.cy - 55}
              width="140"
              height="50"
              rx="8"
              fill="#0d1f12"
              stroke="var(--border2)"
              strokeWidth="1"
            />
            <text
              x={Math.min(hovered.cx - 5, 340) + 10}
              y={hovered.cy - 35}
              fill="var(--text)"
              fontSize="10"
              fontFamily="DM Sans,sans-serif"
              fontWeight="500"
            >
              {hovered.latitude.toFixed(2)}°N
            </text>
            <text
              x={Math.min(hovered.cx - 5, 340) + 10}
              y={hovered.cy - 20}
              fill="var(--text2)"
              fontSize="10"
              fontFamily="DM Sans,sans-serif"
            >
              {hovered.longitude.toFixed(2)}°E
            </text>
            <text
              x={Math.min(hovered.cx - 5, 340) + 10}
              y={hovered.cy - 6}
              fill="var(--text3)"
              fontSize="8"
              fontFamily="DM Sans,sans-serif"
              fontStyle="italic"
            >
              Click for details →
            </text>
          </g>
        )}

        {/* Legend */}
        <g transform="translate(18,415)" fontFamily="DM Sans,sans-serif">
          <circle cx="5" cy="5" r="4" fill="#52c97b" />
          <text x="13" y="9" fill="var(--text3)" fontSize="9">
            Featured sighting
          </text>
        </g>
      </svg>

      {/* Featured Images Grid */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)', marginBottom: '1rem' }}>
          🦋 {dotPositions.length} Featured Photos
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
        }}>
          {dotPositions.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              style={{
                cursor: 'pointer',
                borderRadius: 10,
                overflow: 'hidden',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                transition: 'all .2s',
                transform: selectedImage?.id === img.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedImage?.id === img.id ? '0 4px 16px rgba(82,201,123,.2)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#52c97b';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                if (selectedImage?.id !== img.id) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={{
                aspectRatio: '1',
                background: 'linear-gradient(135deg, rgba(82,201,123,.05), rgba(82,201,123,.02))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}>
                🦋
              </div>
              <div style={{ padding: '.6rem' }}>
                <div style={{
                  fontSize: '.65rem',
                  fontWeight: 600,
                  color: '#52c97b',
                  marginBottom: '.3rem',
                }}>
                  Sighting #{idx + 1}
                </div>
                <div style={{
                  fontSize: '.7rem',
                  color: 'var(--text3)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {img.latitude.toFixed(2)}°, {img.longitude.toFixed(2)}°
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Image Detail Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.8)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }} onClick={() => setSelectedImage(null)}>
          <div style={{
            background: 'var(--bg2)',
            borderRadius: 12,
            padding: '2rem',
            maxWidth: 500,
            animation: 'fadeIn .2s ease',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem', margin: '0', color: 'var(--text)' }}>
                📍 Location Details
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text2)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: 0,
                  width: 24,
                  height: 24,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              fontSize: '.85rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ background: 'var(--bg3)', padding: '.75rem', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text3)', fontSize: '.75rem', marginBottom: '.25rem' }}>Latitude</div>
                <div style={{ color: '#52c97b', fontWeight: 600, fontSize: '1rem' }}>
                  {selectedImage.latitude.toFixed(4)}°N
                </div>
              </div>
              <div style={{ background: 'var(--bg3)', padding: '.75rem', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text3)', fontSize: '.75rem', marginBottom: '.25rem' }}>Longitude</div>
                <div style={{ color: '#52c97b', fontWeight: 600, fontSize: '1rem' }}>
                  {selectedImage.longitude.toFixed(4)}°E
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: 'var(--text3)', fontSize: '.78rem', marginBottom: '.5rem', fontWeight: 600 }}>
                📸 Image Details
              </div>
              <div style={{
                fontSize: '.78rem',
                color: 'var(--text2)',
                background: 'var(--bg3)',
                padding: '.75rem',
                borderRadius: 8,
                border: '1px solid var(--border)',
                wordBreak: 'break-word',
              }}>
                <div style={{ marginBottom: '.4rem', color: 'var(--text)' }}>
                  <strong>Name:</strong> {selectedImage.display_name}
                </div>
                {selectedImage.upload_timestamp && (
                  <div style={{ color: 'var(--text3)' }}>
                    <strong>Uploaded:</strong> {selectedImage.upload_timestamp}
                  </div>
                )}
              </div>
            </div>

            <a
              href={selectedImage.image_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'rgba(82,201,123,.15)',
                color: '#52c97b',
                padding: '.75rem 1.2rem',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: '.85rem',
                border: '1px solid rgba(82,201,123,.3)',
                transition: 'all .2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(82,201,123,.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(82,201,123,.15)';
              }}
            >
              View on Wikimedia Commons →
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
