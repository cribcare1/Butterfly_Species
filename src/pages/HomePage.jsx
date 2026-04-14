

import { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import IndiaMap from '../components/map/IndiaMap';

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  // Append clone of first slide at end → [0, 1, 2, 3, 4, 0*]
  const extended = [...images, images[0]];

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setCurrent(c => c + 1);
    }, 3000);
  }, [stopAuto]);

  const goTo = (n) => {
    setIsTransitioning(true);
    setCurrent(n);
    startAuto();
  };

  // When we land on the cloned last slide, silently snap back to index 0
  useEffect(() => {
    if (current === images.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [current, images.length]);

  // Re-enable transition after silent snap
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  if (!images?.length) return null;

  // Dots: cloned last slide lights up dot 0
  const activeDot = current === images.length ? 0 : current;

  return (
    <div
      style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* Track */}
      <div style={{
        display: 'flex',
        transition: isTransitioning ? 'transform .6s cubic-bezier(.4,0,.2,1)' : 'none',
        transform: `translateX(-${current * 100}%)`,
      }}>
        {extended.map((img, i) => {
          const baseUrl = img.imageUrl || null;
          return (
            <div key={i} style={{ minWidth: '100%', position: 'relative', height: 420, flexShrink: 0 }}>
              {baseUrl ? (
                <img
                  src={baseUrl}
                  alt={img.display_name}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => {
                    console.error('[Carousel] img failed:', baseUrl);
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                  onLoad={() => console.log('[Carousel] img loaded:', baseUrl)}
                />
              ) : null}

              {/* Fallback */}
              <div style={{
                display: baseUrl ? 'none' : 'flex',
                position: 'absolute', inset: 0,
                alignItems: 'center', justifyContent: 'center',
                fontSize: '4rem', background: 'var(--bg3)',
              }}>🦋</div>

              {/* Gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />

              {/* Caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.75rem' }}>
                <div style={{
                  fontFamily: 'var(--ff)', fontSize: '1.15rem', fontWeight: 600,
                  color: '#fff', marginBottom: 4,
                }}>
                  {img.display_name}
                </div>
                {img.latitude && img.longitude && (img.latitude !== 0 || img.longitude !== 0) && (
                  <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)' }}>
                    📍 {parseFloat(img.latitude).toFixed(3)}°N · {parseFloat(img.longitude).toFixed(3)}°E
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next */}
      {[{ dir: -1, side: 'left', label: '←' }, { dir: 1, side: 'right', label: '→' }].map(({ dir, side, label }) => (
        <button
          key={side}
          onClick={() => {
            if (dir === -1 && current === 0) {
              // Going prev from first → jump to last real slide
              setIsTransitioning(false);
              setCurrent(images.length);
              setTimeout(() => {
                setIsTransitioning(true);
                setCurrent(images.length - 1);
                startAuto();
              }, 50);
              return;
            }
            goTo(current + dir);
          }}
          style={{
            position: 'absolute', top: '50%', [side]: 12, transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)',
            borderRadius: '50%', width: 40, height: 40, cursor: 'pointer',
            color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 2, transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.12)'}
        >
          {label}
        </button>
      ))}

      {/* Dots — only for real slides */}
      <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.5rem', display: 'flex', gap: 6 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: activeDot === i ? 20 : 6, height: 6,
              borderRadius: 3, border: 'none', cursor: 'pointer',
              background: activeDot === i ? '#fff' : 'rgba(255,255,255,.4)',
              transition: 'all .3s', padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,.15)' }}>
        <div
          key={current}
          style={{
            height: '100%',
            background: 'rgba(255,255,255,.7)',
            animation: 'carouselProgress 3s linear forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes carouselProgress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { state, dispatch, reload, visibleSightings } = useApp();
  const { stats } = state;

  const particles = Array.from({ length: 12 }, () => ({
    top: `${8 + Math.random() * 84}%`,
    left: `${3 + Math.random() * 94}%`,
    dur: 5 + Math.random() * 5,
    dl: Math.random() * 4,
    op: .04 + Math.random() * 0.09,
    sz: `${.8 + Math.random() * 1.2}rem`,
  }));

  useEffect(() => {
    if (state.featuredImages?.length) {
      console.log('[HomePage] featuredImages loaded:', state.featuredImages.length);
      console.log('[HomePage] first image fields:', Object.keys(state.featuredImages[0]));
      console.log('[HomePage] first image data:', state.featuredImages[0]);
    }
  }, [state.featuredImages]);

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '7rem 1.5rem 4rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%,rgba(34,197,94,.07) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {particles.map((p, i) => (
          <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, fontSize: p.sz, opacity: p.op, animation: `floatBf ${p.dur}s ease-in-out ${p.dl}s infinite`, pointerEvents: 'none' }}>🦋</div>
        ))}
        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto' }} className="fu">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', background: 'rgba(82,201,123,.07)', border: '1px solid rgba(82,201,123,.2)', borderRadius: 50, padding: '.38rem 1.1rem', marginBottom: '2rem', fontSize: '.75rem', color: 'var(--green)', letterSpacing: '.15em' }}>
            ✦ India's Butterfly Conservation Platform ✦
          </div>
          <h1 style={{ fontFamily: 'var(--ff)', fontSize: 'clamp(3rem,8vw,5.5rem)', lineHeight: 1.02, marginBottom: '1.5rem', letterSpacing: '-.01em' }}>
            <span className="shimmer">Wings of Wonder</span>
          </h1>
          <p style={{ fontFamily: 'var(--ff)', fontSize: 'clamp(1rem,2.5vw,1.22rem)', color: 'var(--text2)', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.8, fontStyle: 'italic' }}>
            Carrying the untold stories of nature's hidden wonders from the wild heart of Northeast India.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-p" onClick={() => dispatch({ type: 'SET_PAGE', p: 'species' })}>🦋 Explore Species →</button>
          </div>
        </div>
      </section>

      {/* ── Featured Image Carousel ───────────────────────────────────────── */}
      {state.featuredImagesLoading ? (
        <section style={{ padding: '0 1.5rem 5rem', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div className="sec-eye">From the Wild</div>
            <h2 className="sec-h">Featured <em>Captures</em></h2>
          </div>
          <div style={{
            height: 420, borderRadius: 16, border: '1px solid var(--border)',
            background: 'var(--bg3)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column', gap: '1rem',
          }}>
            <div style={{ fontSize: '2.5rem' }}>🦋</div>
            <p style={{ fontSize: '.85rem', color: 'var(--text3)' }}>Loading featured images…</p>
          </div>
        </section>
      ) : state.featuredImages?.length > 0 ? (
        <section style={{ padding: '0 1.5rem 5rem', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div className="sec-eye">From the Wild</div>
            <h2 className="sec-h">Featured <em>Captures</em></h2>
            <p className="sec-sub" style={{ marginTop: '.5rem' }}>
              Stunning photography from our contributor network across India.
            </p>
          </div>
          <FeaturedCarousel images={state.featuredImages.slice(0, 5)} />
        </section>
      ) : null}

      {/* ── Marquee ───────────────────────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg3)', padding: '.85rem 0' }}>
        <div style={{ display: 'flex', animation: 'marquee 30s linear infinite', gap: '2.5rem', width: 'max-content' }}>
          {[...Array(3)].flatMap(() => ['Monarch Swallowtail', 'Blue Morpho', 'Apollo', 'Glasswing', 'Crimson Rose', 'Malabar Banded Peacock', 'Painted Lady', 'Blue Tiger', 'Common Jezebel', 'Yellow Orange Tip']).map((t, i) => (
            <span key={i} style={{ color: 'var(--text3)', fontSize: '.8rem', letterSpacing: '.12em', whiteSpace: 'nowrap', fontFamily: 'var(--fb)' }}>🦋 {t}</span>
          ))}
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      {stats && (
        <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="sec-h">Project <em>At a Glance</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1rem' }}>
            {[
              { v: stats.imagesUploaded != null ? `${stats.imagesUploaded.toLocaleString()}+` : '—', l: 'Images Uploaded',     i: '🖼️', c: '#52c97b' },
              { v: stats.speciesTotal   != null ? `${stats.speciesTotal.toLocaleString()}+`   : '—', l: 'Number of Species',   i: '🦋', c: '#60a5fa' },
              { v: stats.pageViews      != null ? `${(stats.pageViews / 1000).toFixed(0)}K+`  : '—', l: 'Page Views',          i: '👁️', c: '#f472b6' },
              { v: stats.contributors   != null ? `${stats.contributors.toLocaleString()}+`   : '—', l: 'Contributors',        i: '🤝', c: '#f59e0b' },
              { v: stats.districts      ?? '—',                                                       l: 'Number of Districts', i: '📍', c: '#fb923c' },
              { v: stats.statesActive   ?? '—',                                                       l: 'Number of States',    i: '🗺️', c: '#34d399' },
              { v: stats.papers         ?? '—',                                                       l: 'No. of Publications', i: '📄', c: '#a78bfa' },
              { v: stats.qualityImages  != null ? `${stats.qualityImages.toLocaleString()}+`  : '—', l: 'Quality Images',      i: '⭐', c: '#f87171' },
            ].map(({ v, l, i, c }) => (
              <div
                key={l}
                style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.4rem', textAlign: 'center', transition: 'all .28s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '.5rem' }}>{i}</div>
                <div style={{ fontFamily: 'var(--ff)', fontSize: '2rem', color: c, fontWeight: 700, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text3)', marginTop: '.4rem', letterSpacing: '.04em' }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Sightings Map ─────────────────────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem 5rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div className="sec-eye">Live Sightings Across India</div>
          <h2 className="sec-h">Butterfly <em>Sighting Map</em></h2>
          <p className="sec-sub" style={{ marginTop: '.5rem' }}>
            Confirmed observations plotted across the subcontinent — click any marker to explore.
          </p>
        </div>

        {state.sightingsError ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', padding: '3rem 2rem', borderRadius: 16,
            border: '1px solid var(--border)', background: 'var(--bg3)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem' }}>⚠️</div>
            <div style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem', color: 'var(--text)' }}>Failed to fetch data</div>
            <div style={{ fontSize: '.85rem', color: 'var(--text3)', maxWidth: 400 }}>{state.sightingsError}</div>
            <button className="btn btn-p" style={{ marginTop: '.5rem' }} onClick={reload}>Retry</button>
          </div>
        ) : (
          <IndiaMap sightings={visibleSightings} loading={state.sightingsLoading} />
        )}
      </section>

      {/* ── Taxon category cards ──────────────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem 5rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="sec-eye">6 Butterfly Families</div>
          <h2 className="sec-h">Taxon <em>Categories</em></h2>
        </div>
        <div className="g2">
          {state.categories.map((cat, ci) => (
            <div
              key={cat.id}
              className="card"
              style={{ padding: '1.5rem', cursor: 'pointer', animationDelay: `${ci * .08}s` }}
              onClick={() => { dispatch({ type: 'SEL_CAT', v: cat }); dispatch({ type: 'SET_PAGE', p: 'species' }); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${cat.color}12`, border: `1px solid ${cat.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>🦋</div>
                <div>
                  <div style={{ fontFamily: 'var(--ff)', fontSize: '1.15rem', color: 'var(--text)' }}>{cat.name}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text3)' }}>{cat.count} species · {cat.common}</div>
                </div>
              </div>
              <p style={{ fontSize: '.85rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1rem' }}>{cat.description}</p>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {cat.subcategories.map(s => <span key={s} className="tag t-blue" style={{ fontSize: '.68rem' }}>{s}</span>)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '.75rem', borderTop: '1px solid var(--border)' }}>
                <button className="btn-sm">Explore →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}