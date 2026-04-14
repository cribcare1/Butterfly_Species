// import { useState, useEffect } from 'react';
// import { useApp } from '../../context/AppContext';
// import GlobalSearch from '../shared/GlobalSearch';

// const TABS = [
//   { id: 'home', l: 'Home' },
//   { id: 'species', l: 'Species' },
//   { id: 'team', l: 'Team' },
//   { id: 'about', l: 'About' },
// ];

// export default function Navbar() {
//   const { state, dispatch } = useApp();
//   const [sy, setSy] = useState(0);

//   useEffect(() => {
//     const h = () => setSy(window.scrollY);
//     window.addEventListener('scroll', h, { passive: true });
//     return () => window.removeEventListener('scroll', h);
//   }, []);

//   return (
//     <nav style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
//       background: sy > 30 ? 'rgba(4,8,10,.94)' : 'transparent',
//       backdropFilter: sy > 30 ? 'blur(18px)' : 'none',
//       borderBottom: `1px solid ${sy > 30 ? 'var(--border)' : 'transparent'}`,
//       padding: '.75rem 1.5rem',
//       display: 'flex', alignItems: 'center', gap: '1rem',
//       transition: 'all .3s',
//     }}>
//       {/* Logo */}
//       <button
//         onClick={() => dispatch({ type: 'SET_PAGE', p: 'home' })}
//         style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.55rem', flexShrink: 0 }}
//       >
//         <span style={{ fontSize: '1.4rem', animation: 'flap 2.5s ease-in-out infinite' }}>🦋</span>
//         <span style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '.06em' }}>butterfly</span>
//         <span style={{ fontSize: '.65rem', color: 'var(--text3)', letterSpacing: '.08em' }}>Conservation Society</span>
//       </button>

//       {/* Nav Tabs */}
//       <div className="hide-m" style={{ display: 'flex', alignItems: 'center', gap: '.25rem', flex: 1, justifyContent: 'center' }}>
//         {TABS.map(({ id, l }) => (
//           <button
//             key={id}
//             className={`nav-btn${state.page === id ? ' active' : ''}`}
//             onClick={() => dispatch({ type: 'SET_PAGE', p: id })}
//           >
//             {l}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="hide-m" style={{ display: 'flex', alignItems: 'center' }}>
//         <GlobalSearch />
//       </div>

//       {/* Sidebar toggle button */}
//       <button
//         className="btn"
//         style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', color: 'var(--text2)', padding: '.4rem .7rem', borderRadius: 8, fontSize: '1.1rem' }}
//         onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
//       >
//         ☰
//       </button>
//     </nav>
//   );
// }
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import GlobalSearch from '../shared/GlobalSearch';

const TABS = [
  { id: 'home', l: 'Home' },
  { id: 'species', l: 'Species' },
  { id: 'team', l: 'Team' },
  { id: 'about', l: 'About' },
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
      background: sy > 30 ? 'rgba(4,8,10,.94)' : 'transparent',
      backdropFilter: sy > 30 ? 'blur(18px)' : 'none',
      borderBottom: `1px solid ${sy > 30 ? 'var(--border)' : 'transparent'}`,
      padding: '.75rem 1.5rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
      transition: 'all .3s',
    }}>
      {/* Logo */}
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
  Butterfly          </span>
        </div>
      </button>

      {/* Nav Tabs */}
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

      {/* Search */}
      <div className="hide-m" style={{ display: 'flex', alignItems: 'center' }}>
        <GlobalSearch />
      </div>

      {/* Sidebar toggle */}
      {/* <button
        className="btn"
        style={{
          marginLeft: 'auto', background: 'none',
          border: '1px solid var(--border)', color: 'var(--text2)',
          padding: '.4rem .7rem', borderRadius: 8, fontSize: '1.1rem',
        }}
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      >
        ☰
      </button> */}
    </nav>
  );
}