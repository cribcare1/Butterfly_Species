import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { dispatch } = useApp();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 1.5rem 2rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2.5rem' }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.55rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🦋</span>
            <span style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem', color: 'var(--text)' }}>butterfly</span>
          </div>
          <p style={{ fontSize: '.83rem', color: 'var(--text3)', lineHeight: 1.7, marginBottom: '1rem' }}>
            India's premier butterfly documentation, citizen science, and conservation platform.
          </p>
          <p style={{ fontSize: '.78rem', color: 'var(--text3)' }}>6/7, Bijoygarh, Kolkata 700032</p>
          <p style={{ fontSize: '.78rem', color: 'var(--text3)' }}>naturemates@gmail.com</p>
        </div>

        {/* Navigate */}
        <div>
          <div style={{ fontSize: '.72rem', color: 'var(--text3)', letterSpacing: '.1em', marginBottom: '.75rem' }}>NAVIGATE</div>
          {[['home', 'Home'], ['species', 'Species'], ['team', 'Our Team'], ['about', 'About']].map(([id, l]) => (
            <button key={id} onClick={() => dispatch({ type: 'SET_PAGE', p: id })}
              style={{ display: 'block', background: 'none', border: 'none', color: 'var(--text3)', fontFamily: 'var(--fb)', fontSize: '.84rem', cursor: 'pointer', padding: '.28rem 0', transition: 'color .2s', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
            >{l}</button>
          ))}
        </div>

        {/* Resources */}
        <div>
          <div style={{ fontSize: '.72rem', color: 'var(--text3)', letterSpacing: '.1em', marginBottom: '.75rem' }}>RESOURCES</div>
          {['Species Checklist', 'Research Papers', 'Field Guides', 'Photo Library', 'Open Data', 'Submit Sighting'].map(r => (
            <div key={r}
              style={{ color: 'var(--text3)', fontSize: '.84rem', padding: '.28rem 0', cursor: 'pointer', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
            >{r}</div>
          ))}
        </div>

        {/* Social */}
        <div>
          <div style={{ fontSize: '.72rem', color: 'var(--text3)', letterSpacing: '.1em', marginBottom: '.75rem' }}>FOLLOW US</div>
          {[['📘', 'Facebook', 'https://facebook.com'], ['📸', 'Instagram', 'https://instagram.com'], ['🐦', 'Twitter', 'https://twitter.com'], ['🌐', 'Website', 'https://naturematessociety.org']].map(([ic, l, href]) => (
            <a key={l} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', gap: '.5rem', alignItems: 'center', color: 'var(--text3)', fontSize: '.84rem', padding: '.28rem 0', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
            >{ic} {l} →</a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.5rem' }}>
        <span style={{ fontSize: '.75rem', color: 'var(--text3)' }}>© 2025 Butterfly Conservation Society India. Data under CC BY 4.0.</span>
        <span style={{ fontSize: '.75rem', color: 'var(--text3)' }}>Protecting India's winged wonders 🦋</span>
      </div>
    </footer>
  );
}
