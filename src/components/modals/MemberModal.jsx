import { useApp } from '../../context/AppContext';
import Avatar from '../shared/Avatar';

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ position: 'absolute', top: '1.1rem', right: '1.1rem', background: 'rgba(255,255,255,.06)', border: '1px solid var(--border)', color: 'var(--text2)', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
    >✕</button>
  );
}

const Dot = ({ c }) => (
  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />
);

export default function MemberModal() {
  const { state, dispatch } = useApp();
  const m = state.selectedMember;
  if (!m) return null;

  const icons = { twitter: '🐦', instagram: '📸', github: '💻', linkedin: '💼', researchgate: '🔬', email: '✉️' };

  return (
    <div className="modal-bg" onClick={() => dispatch({ type: 'SEL_MEMBER', v: null })}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={() => dispatch({ type: 'SEL_MEMBER', v: null })} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <Avatar i={m.initials} c={m.color} size={68} />
          <div>
            <h2 style={{ fontFamily: 'var(--ff)', fontSize: '1.6rem', color: 'var(--text)', marginBottom: '.2rem' }}>{m.name}</h2>
            <div style={{ fontSize: '.85rem', color: 'var(--text2)', marginBottom: '.5rem' }}>{m.role}</div>
            <span className="tag t-green">{m.dept}</span>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--ff)', fontSize: '.97rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>{m.bio}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.6rem', marginBottom: '1.25rem' }}>
          {[['Papers', m.publications, '📄'], ['Years', m.experience, '🌿'], ['Trips', m.fieldTrips, '🗺'], ['Species', m.species_described, '🦋']].map(([l, v, ic]) => (
            <div key={l} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', marginBottom: '.25rem' }}>{ic}</div>
              <div style={{ fontFamily: 'var(--ff)', fontSize: '1.4rem', color: 'var(--green)' }}>{v}</div>
              <div style={{ fontSize: '.68rem', color: 'var(--text3)' }}>{l}</div>
            </div>
          ))}
        </div>

        {[['Education', m.education], ['Specialization', m.specialization]].map(([k, v]) => (
          <div key={k} style={{ marginBottom: '.75rem', padding: '.75rem', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12 }}>
            <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginBottom: '.25rem' }}>{k}</div>
            <div style={{ fontSize: '.88rem', color: 'var(--text)' }}>{v}</div>
          </div>
        ))}

        <div style={{ marginBottom: '1.25rem', padding: '.75rem', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginBottom: '.5rem' }}>🏆 Awards</div>
          {m.awards.map(a => (
            <div key={a} style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginBottom: '.3rem' }}>
              <Dot c="var(--green)" />
              <span style={{ fontSize: '.84rem', color: 'var(--text)' }}>{a}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginBottom: '.5rem' }}>Connect</div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {Object.entries(m.social).map(([p, url]) => (
              <a key={p} href={url} target="_blank" rel="noopener noreferrer"
                style={{ padding: '.35rem .8rem', borderRadius: 50, background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)', color: 'var(--text2)', textDecoration: 'none', fontFamily: 'var(--fb)', fontSize: '.76rem', display: 'flex', alignItems: 'center', gap: '.3rem', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
              >
                {icons[p] || '🔗'} {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
