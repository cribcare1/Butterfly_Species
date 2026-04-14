const SOCIAL = [
  { icon: '📘', label: 'Facebook', handle: 'Nature Mates Society', note: 'Follow 8,200 supporters', href: 'https://facebook.com' },
  { icon: '📸', label: 'Instagram', handle: '@butterfly_india', note: '32K followers', href: 'https://instagram.com' },
  { icon: '🐦', label: 'Twitter / X', handle: '@butterfly_india', note: '12K followers', href: 'https://twitter.com' },
  { icon: '🌐', label: 'Website', handle: 'naturematessociety.org', note: 'Main portal', href: 'https://naturematessociety.org' },
];

export default function AboutPage() {
  return (
    <div style={{ padding: '7rem 1.5rem 4rem', maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: `${10 + i * 11}%`, left: `${i % 2 === 0 ? 5 : 88}%`, fontSize: '1.4rem', opacity: .04, animation: `floatBf ${6 + i}s ease-in-out ${i * .5}s infinite`, pointerEvents: 'none' }}>🦋</div>
      ))}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '.72rem', color: 'var(--text3)', letterSpacing: '.2em', marginBottom: '.5rem' }}>Est. 2018 · Kolkata, India</div>
        <h1 className="sec-h" style={{ marginBottom: '1.25rem' }}>About <em>butterfly</em></h1>
        <blockquote style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem', color: 'var(--text2)', fontStyle: 'italic', maxWidth: 640, margin: '0 auto', lineHeight: 1.8, borderLeft: '3px solid rgba(82,201,123,.3)', paddingLeft: '1.5rem', textAlign: 'left' }}>
          "In every butterfly, we see not just a species to be catalogued, but a world to be understood — a mirror of the health of our ecosystems."
          <footer style={{ fontSize: '.82rem', color: 'var(--text3)', marginTop: '.5rem', fontStyle: 'normal' }}>— Dr. Meera Nair, Founder</footer>
        </blockquote>
      </div>

      {/* Story & Mission */}
      <div className="g2" style={{ marginBottom: '3rem' }}>
        {[
          ['Our Story', "Butterfly was founded in 2018 by Dr. Meera Nair after a decade documenting declining populations across peninsular India. What began as a solo field project grew into a nationwide network of researchers, educators, and naturalists united by a single conviction: that butterflies are both measurable indicators of ecosystem health and worthy of our deepest wonder. Today, we are one of India's leading platforms for butterfly observation, conservation advocacy, and open scientific documentation — with active programs in 28 states."],
          ['Our Mission', "We exist to document India's extraordinary butterfly diversity, make that knowledge freely accessible, and translate it into measurable conservation outcomes. We build bridges between field researchers and citizen scientists, between policymakers and local communities, and between present generations and the children who will inherit this natural heritage. We believe rigorous science and a sense of awe are not opposites."],
        ].map(([t, b]) => (
          <div key={t} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--ff)', fontSize: '1.4rem', color: 'var(--green)', marginBottom: '1rem' }}>{t}</h3>
            <p style={{ fontFamily: 'var(--ff)', color: 'var(--text2)', lineHeight: 1.9, fontSize: '.97rem' }}>{b}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="sec-eye" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Values</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
          {[
            ['🔬', 'Scientific Rigor', 'Every observation verified. Every claim evidence-based.'],
            ['🌍', 'Radical Openness', 'All data, code, and findings published openly.'],
            ['🤝', 'Inclusive Community', 'Space for PhD and schoolchild alike. Every sighting matters.'],
            ['🌱', 'Long-term Thinking', 'Building infrastructure that outlasts any single project.'],
            ['✨', 'Wonder as Method', 'Curiosity is our most powerful conservation tool.'],
            ['⚖️', 'Justice & Equity', 'Conservation must benefit communities that live with nature.'],
          ].map(([i, t, d]) => (
            <div key={t}
              style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', transition: 'all .25s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.6rem' }}>{i}</div>
              <div style={{ fontFamily: 'var(--ff)', fontSize: '1rem', color: 'var(--text)', marginBottom: '.35rem' }}>{t}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text2)', lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: '3rem', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, padding: '2rem' }}>
        <div className="sec-eye" style={{ marginBottom: '1.5rem' }}>Our Journey</div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 60, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom,rgba(82,201,123,.3),rgba(82,201,123,.05))' }} />
          {[
            ['2018', 'Founded in Kolkata. First Western Ghats survey with 3 volunteers.'],
            ['2019', 'Citizen science mobile protocol launched. First 500 verified observations.'],
            ['2020', "'Checklist of Indian Butterflies' published — open access, 1,547 species."],
            ['2021', 'First butterfly corridor notified in Karnataka using our habitat data.'],
            ['2022', 'Annual Butterfly Week — 12,000 participants, 40,000 sightings.'],
            ['2023', 'MoEFCC partnership for national pollinator monitoring framework.'],
            ['2024', 'AI habitat model launched. 4,200+ volunteer network.'],
            ['2025', 'Active in 28 states. 92,000+ verified observations published.'],
          ].map(([yr, ev]) => (
            <div key={yr} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative' }}>
              <div style={{ width: 60, fontFamily: 'var(--ff)', fontSize: '1.05rem', color: 'var(--green)', flexShrink: 0, textAlign: 'right', lineHeight: 1.5 }}>{yr}</div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 5, zIndex: 1 }} />
              <div style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.6, paddingTop: '.1rem' }}>{ev}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact + Social */}
      <div className="g2">
        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, padding: '2rem' }}>
          <div className="sec-eye" style={{ marginBottom: '1rem' }}>Contact Info</div>
          {[['📍', '6/7, Bijoygarh\nKolkata 700032\nWest Bengal, India'], ['📞', '+91 947 727 5731\nShop: +91 990 312 4285'], ['✉️', 'naturemates@gmail.com']].map(([ic, val]) => (
            <div key={ic} style={{ display: 'flex', gap: '.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.1rem', marginTop: '.15rem' }}>{ic}</span>
              <span style={{ fontSize: '.88rem', color: 'var(--text2)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 18, padding: '2rem' }}>
          <div className="sec-eye" style={{ marginBottom: '1rem' }}>Follow Us</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {SOCIAL.map(({ icon, label, handle, note, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '.85rem', padding: '.85rem 1rem', borderRadius: 12, background: 'rgba(255,255,255,.02)', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--greenGlow)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,.02)'; }}>
                <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--ff)', fontSize: '.95rem', color: 'var(--text)' }}>{label}</div>
                  <div style={{ fontSize: '.76rem', color: 'var(--text3)' }}>{handle}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.2rem' }}>
                  <span style={{ fontSize: '.72rem', color: 'var(--green)' }}>{note}</span>
                  <span style={{ color: 'var(--text3)', fontSize: '.85rem' }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
