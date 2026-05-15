

import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import GlobalSearch from '../shared/GlobalSearch';

const TABS = [
  { id: 'home',    l: 'Home' },
  { id: 'species', l: 'Species' },
 
  { id: 'team',    l: 'Team' },
  { id: 'about',   l: 'About' },
   { id: 'media',   l: 'Media' },
];

const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Wiki_Loves_Butterfly_logo.svg';

export default function Navbar() {
  const { state, dispatch } = useApp();
  const [sy, setSy] = useState(0);

  useEffect(() => {
    const h = () => setSy(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      background: sy > 30 ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: sy > 30 ? 'blur(18px)' : 'none',
      borderBottom: `1px solid ${sy > 30 ? 'var(--border)' : 'transparent'}`,
      padding: '.75rem 1.5rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
      transition: 'all .3s',
    }}>

      {/* ── Logo ── */}
      <button
        onClick={() => dispatch({ type: 'SET_PAGE', p: 'home' })}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '.65rem', flexShrink: 0,
        }}
      >
        <img
          src={LOGO_URL}
          alt="Wiki Loves Butterfly"
          style={{ width: 32, height: 32, objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{
            fontFamily: 'var(--ff)', fontSize: '1rem',
            color: 'var(--text)', letterSpacing: '.06em', fontWeight: 500,
          }}>
            Wiki Loves
          </span>
          <span style={{
            fontSize: '.58rem', color: 'var(--text3)',
            letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            Butterfly
          </span>
        </div>
      </button>

      {/* ── Nav Tabs ── */}
      <div className="hide-m" style={{
        display: 'flex', alignItems: 'center', gap: '.25rem',
        flex: 1, justifyContent: 'center',
      }}>
        {TABS.map(({ id, l }) => (
          <button
            key={id}
            className={`nav-btn${state.page === id ? ' active' : ''}`}
            onClick={() => dispatch({ type: 'SET_PAGE', p: id })}
          >
            {l}
          </button>
        ))}
      </div>

      {/* ── Search ── */}
      <div className="hide-m" style={{ display: 'flex', alignItems: 'center' }}>
        <GlobalSearch />
      </div>

      {/* ── Theme toggle ── */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        title={state.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          background: 'none', border: '1px solid var(--border)',
          color: 'var(--text2)', width: 34, height: 34,
          borderRadius: 8, cursor: 'pointer', fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .2s', flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
      >
        {state.theme === 'dark' ? '☀' : '☽'}
      </button>

    </nav>
  );
}