
import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function GlobalSearch() {
  const { state, dispatch, filteredSpecies } = useApp();
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const inputRef          = useRef(null);
  const wrapRef           = useRef(null);

  // Sync local query → global search state (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH', v: query });
    }, 200);
    return () => clearTimeout(t);
  }, [query, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Open dropdown when typing starts
  const handleChange = (e) => {
    setQuery(e.target.value);
    setOpen(e.target.value.length >= 2);
  };

  const handleSelect = (species) => {
    dispatch({ type: 'SEL_SPECIES', v: species });
    dispatch({ type: 'SET_PAGE', p: 'species' });
    setQuery('');
    setOpen(false);
    dispatch({ type: 'SET_SEARCH', v: '' });
  };

  const handleClear = () => {
    setQuery('');
    setOpen(false);
    dispatch({ type: 'SET_SEARCH', v: '' });
    inputRef.current?.focus();
  };

  // Only show results when user has typed 2+ chars
  const results = query.length >= 2 ? filteredSpecies.slice(0, 8) : [];

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* ── Input ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '.4rem',
        background: 'var(--bg3)',
        border: `1px solid ${open ? 'var(--green)' : 'var(--border)'}`,
        borderRadius: 10,
        padding: '.38rem .75rem',
        transition: 'border-color .2s',
        width: 220,
      }}>
        <span style={{ fontSize: '.85rem', color: 'var(--text3)', flexShrink: 0 }}>🔍</span>
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Search species…"
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontSize: '.82rem',
            width: '100%',
            fontFamily: 'var(--fb)',
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text3)', fontSize: '.75rem', padding: 0, lineHeight: 1,
              flexShrink: 0,
            }}
          >✕</button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,.35)',
          zIndex: 999,
          minWidth: 280,
        }}>
          {results.length === 0 ? (
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              color: 'var(--text3)',
              fontSize: '.8rem',
            }}>
              No species found for "{query}"
            </div>
          ) : (
            <>
              <div style={{
                padding: '.4rem .75rem',
                fontSize: '.65rem',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--green)',
                borderBottom: '1px solid var(--border)',
              }}>
                {results.length} result{results.length !== 1 ? 's' : ''}
              </div>

              {results.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => handleSelect(sp)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.65rem',
                    padding: '.55rem .75rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 7,
                    overflow: 'hidden',
                    background: 'var(--bg3)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                  }}>
                    {sp.imageUrl ? (
                      <img
                        src={sp.imageUrl}
                        alt={sp.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : '🦋'}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '.82rem',
                      fontWeight: 600,
                      color: 'var(--text)',
                      fontFamily: 'var(--fb)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {sp.name}
                    </div>
                    <div style={{
                      fontSize: '.7rem',
                      color: 'var(--text3)',
                      fontStyle: 'italic',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {sp.scientific}
                    </div>
                  </div>

                  {/* Family color badge */}
                  {sp.color && (
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: sp.color,
                      flexShrink: 0,
                    }} />
                  )}
                </button>
              ))}

              {filteredSpecies.length > 8 && (
                <button
                  onClick={() => {
                    dispatch({ type: 'SET_PAGE', p: 'species' });
                    setOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '.75rem',
                    color: 'var(--green)',
                    letterSpacing: '.05em',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  View all {filteredSpecies.length} results →
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}