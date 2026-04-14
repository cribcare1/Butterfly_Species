import { useApp } from '../../context/AppContext';
import StatusBadge from '../shared/StatusBadge';

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ position: 'absolute', top: '1.1rem', right: '1.1rem', background: 'rgba(255,255,255,.06)', border: '1px solid var(--border)', color: 'var(--text2)', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.12)'; e.currentTarget.style.color = '#f87171'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = 'var(--text2)'; }}
    >✕</button>
  );
}

export default function SpeciesModal() {
  const { state, dispatch } = useApp();
  const s = state.selectedSpecies;
  if (!s) return null;

  return (
    <div className="modal-bg" onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })} />

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3.5rem', animation: 'floatBf 4s ease-in-out infinite', marginBottom: '.75rem' }}>🦋</div>
          <h2 style={{ fontFamily: 'var(--ff)', fontSize: '1.8rem', color: 'var(--text)', marginBottom: '.3rem' }}>{s.name}</h2>
          <div style={{ fontFamily: 'var(--ff)', fontSize: '1rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '.75rem' }}>{s.scientific}</div>
          <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <StatusBadge s={s.status} />
            <span className="tag t-blue">{s.subcategory}</span>
            <span className="tag t-purple">{s.region}</span>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--ff)', fontSize: '.98rem', color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>
          {s.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '1rem' }}>
          {[['📏 Wingspan', s.wingspan], ['🗓️ Discovered', s.discovered], ['🌿 Diet', s.diet], ['📅 Flight Season', s.flightSeason]].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '.75rem' }}>
              <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginBottom: '.25rem' }}>{k}</div>
              <div style={{ fontSize: '.9rem', color: 'var(--text)' }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '.75rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '.72rem', color: 'var(--text3)', marginBottom: '.25rem' }}>🏠 Habitat</div>
          <div style={{ fontSize: '.9rem', color: 'var(--text)' }}>{s.habitat}</div>
        </div>

        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
          <button className="btn btn-p">📤 Submit Sighting</button>
          <button className="btn btn-o">📄 Full Profile</button>
        </div>
      </div>
    </div>
  );
}
