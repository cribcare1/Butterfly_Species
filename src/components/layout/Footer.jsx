import { useApp } from '../../context/AppContext';

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Website',
    href: 'https://naturematessociety.org',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

const STATS = [
  { value: '1,200+', label: 'Species Documented' },
  { value: '34', label: 'States Covered' },
  { value: '8,400+', label: 'Citizen Sightings' },
  { value: '18 yrs', label: 'Field Research' },
];

const navLinks = [
  ['home', 'Home'],
  ['species', 'Species'],
  ['team', 'Our Team'],
  ['about', 'About'],
];

export default function Footer() {
  const { dispatch } = useApp();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ position: 'relative', marginTop: '5rem', overflow: 'hidden' }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '40%', height: '80px',
        background: 'radial-gradient(ellipse at top, rgba(82,201,123,.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* stats strip */}
      {/* <div style={{
        background: 'linear-gradient(180deg, rgba(82,201,123,.04) 0%, transparent 100%)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '1.75rem 1.5rem',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
        }}
          className="footer-stats"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--ff)', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                color: 'var(--green)', lineHeight: 1,
              }}>{value}</div>
              <div style={{
                fontSize: '.7rem', color: 'var(--text3)',
                letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '.3rem',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* main footer grid */}
      <div style={{ padding: '3rem 1.5rem 2rem' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.4fr', gap: '3rem',
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', p: 'home' })}
              style={{
                display: 'flex', alignItems: 'center', gap: '.6rem',
                background: 'none', border: 'none', cursor: 'pointer',
                marginBottom: '1.1rem', padding: 0,
              }}
            >
              <span style={{
                fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px rgba(82,201,123,.5))',
                animation: 'flap 2.5s ease-in-out infinite',
                display: 'inline-block',
              }}>🦋</span>
              <span style={{
                fontFamily: 'var(--ff)', fontSize: '1.25rem',
                color: 'var(--text)', fontStyle: 'italic', letterSpacing: '.04em',
              }}>butterfly</span>
            </button>
            <p style={{
              fontSize: '.85rem', color: 'var(--text2)', lineHeight: 1.8,
              marginBottom: '1.25rem', maxWidth: 300,
            }}>
              India's premier butterfly documentation, citizen science,
              and conservation platform — protecting winged wonders since 2007.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
              {[
                ['📍', '6/7, Bijoygarh, Kolkata 700032'],
                ['✉️', 'naturemates@gmail.com'],
              ].map(([ic, txt]) => (
                <div key={txt} style={{
                  display: 'flex', gap: '.55rem', alignItems: 'center',
                  fontSize: '.78rem', color: 'var(--text3)',
                }}>
                  <span style={{ fontSize: '.85rem' }}>{ic}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigate */}
          {/* <div>
            <div style={{
              fontSize: '.65rem', color: 'var(--green)', letterSpacing: '.14em',
              textTransform: 'uppercase', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '.5rem',
            }}>
              <span style={{
                display: 'inline-block', width: 16, height: 1,
                background: 'var(--green)', opacity: .6,
              }} />
              Navigate
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.1rem' }}>
              {navLinks.map(([id, label]) => (
                <button key={id}
                  onClick={() => dispatch({ type: 'SET_PAGE', p: id })}
                  style={{
                    background: 'none', border: 'none', textAlign: 'left',
                    color: 'var(--text2)', fontFamily: 'var(--fb)',
                    fontSize: '.85rem', cursor: 'pointer',
                    padding: '.38rem 0', transition: 'color .18s, padding-left .18s',
                    display: 'flex', alignItems: 'center', gap: '.5rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--green)';
                    e.currentTarget.style.paddingLeft = '.35rem';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text2)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  <span style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'var(--green)', opacity: .45, flexShrink: 0,
                  }} />
                  {label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Social */}
          <div>
            <div style={{
              fontSize: '.65rem', color: 'var(--green)', letterSpacing: '.14em',
              textTransform: 'uppercase', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '.5rem',
            }}>
              <span style={{
                display: 'inline-block', width: 16, height: 1,
                background: 'var(--green)', opacity: .6,
              }} />
              Follow Us
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
              {SOCIAL.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.65rem',
                    padding: '.42rem .7rem',
                    borderRadius: 8,
                    border: '1px solid transparent',
                    color: 'var(--text2)',
                    textDecoration: 'none', fontSize: '.84rem',
                    transition: 'all .2s',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--green)';
                    e.currentTarget.style.background = 'var(--greenGlow)';
                    e.currentTarget.style.borderColor = 'var(--border2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text2)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '1.1rem 1.5rem',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '.75rem',
        }}>
          <span style={{ fontSize: '.73rem', color: 'var(--text3)' }}>
            © 2025 Butterfly Conservation Society India · Data under{' '}
            <span style={{ color: 'var(--green)', opacity: .8 }}>CC BY 4.0</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '.73rem', color: 'var(--text3)', fontFamily: 'var(--ff)', fontStyle: 'italic' }}>
              Protecting India's winged wonders
            </span>
            <button
              onClick={scrollTop}
              title="Back to top"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30,
                border: '1px solid var(--border2)',
                borderRadius: '50%',
                background: 'var(--greenGlow)',
                color: 'var(--green)',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
                transition: 'all .2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(82,201,123,.22)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--greenGlow)';
                e.currentTarget.style.transform = 'none';
              }}
            >↑</button>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:760px){
          .footer-stats { grid-template-columns: repeat(2,1fr) !important; }
          .footer-grid  { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media(max-width:480px){
          .footer-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
