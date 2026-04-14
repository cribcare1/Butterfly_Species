import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function GlobalSearch() {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const results = state.categories
    .flatMap(c => c.species)
    .filter(s => {
      if (!state.search || state.search.length < 2) return false;
      const q = state.search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.scientific.toLowerCase().includes(q);
    })
    .slice(0, 6);

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 240, maxWidth: 320, flex: 1 }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, fontSize: '.9rem' }}>🔍</span>
        <input
          className="inp"
          placeholder="Search species…"
          value={state.search}
          style={{ paddingLeft: '2.1rem', borderRadius: 50 }}
          onChange={e => { dispatch({ type: 'SET_SEARCH', v: e.target.value }); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && state.search.length >= 2 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: '#0d1f12', border: '1px solid var(--border2)', borderRadius: 14,
          overflow: 'hidden', zIndex: 200, boxShadow: '0 20px 40px rgba(0,0,0,.5)',
          animation: 'slideDown .15s ease',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '1.2rem', textAlign: 'center', color: 'var(--text3)', fontSize: '.85rem' }}>No results</div>
          ) : (
            results.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  dispatch({ type: 'SEL_SPECIES', v: s });
                  setOpen(false);
                  dispatch({ type: 'SET_SEARCH', v: '' });
                }}
                style={{ padding: '.75rem 1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.75rem', borderBottom: '1px solid var(--border)', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--greenGlow)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                🦋
                <div>
                  <div style={{ fontSize: '.88rem', color: 'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--text3)' }}>{s.scientific} · {s.region}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
