import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/shared/Avatar';
import Loader from '../components/shared/Loader';
import MemberModal from '../components/modals/MemberModal';

export default function TeamPage() {
  const { state, dispatch } = useApp();
  const [dept, setDept] = useState('all');
  const depts = [...new Set(state.team.map(m => m.dept))];
  const filtered = dept === 'all' ? state.team : state.team.filter(m => m.dept === dept);

  return (
    <div style={{ padding: '7rem 1.5rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="sec-eye">The People Behind the Wings</div>
        <h1 className="sec-h">Our <em>Team</em></h1>
        <p className="sec-sub" style={{ marginTop: '.5rem' }}>Scientists, researchers, and passionate naturalists. Click any card for full profile.</p>
      </div>

      {/* Department filter */}
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {['all', ...depts].map(d => (
          <button key={d} onClick={() => setDept(d)}
            style={{ background: dept === d ? 'rgba(82,201,123,.14)' : 'transparent', border: `1px solid ${dept === d ? 'rgba(82,201,123,.48)' : 'var(--border)'}`, color: dept === d ? 'var(--green)' : 'var(--text2)', padding: '.38rem 1.05rem', borderRadius: 50, fontFamily: 'var(--fb)', fontSize: '.8rem', cursor: 'pointer', transition: 'all .2s' }}>
            {d === 'all' ? 'All Departments' : d}
          </button>
        ))}
      </div>

      {state.teamLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}><Loader /></div>
      ) : (
        <div className="g2">
          {filtered.map(m => (
            <div key={m.id} className="card fu" style={{ padding: '1.5rem', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'SEL_MEMBER', v: m })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.1rem' }}>
                <Avatar i={m.initials} c={m.color} />
                <div>
                  <div style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem', color: 'var(--text)' }}>{m.name}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text2)', marginBottom: '.35rem' }}>{m.role}</div>
                  <span className="tag t-green" style={{ fontSize: '.66rem' }}>{m.dept}</span>
                </div>
              </div>
              <p style={{ fontSize: '.83rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '1rem' }}>
                {m.bio.substring(0, 128)}...
              </p>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '.85rem', borderTop: '1px solid var(--border)', marginBottom: '.75rem' }}>
                {[['📄', m.publications, 'Papers'], ['🗺️', m.fieldTrips, 'Trips'], ['🦋', m.species_described, 'Species']].map(([ic, v, l]) => (
                  <div key={l} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '.75rem', color: 'var(--text3)' }}>{ic}</div>
                    <div style={{ fontFamily: 'var(--ff)', fontSize: '1.15rem', color: 'var(--green)' }}>{v}</div>
                    <div style={{ fontSize: '.68rem', color: 'var(--text3)' }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
                  {Object.keys(m.social).map(p => (
                    <a key={p} href={m.social[p]} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ padding: '.26rem .6rem', borderRadius: 50, background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)', color: 'var(--text3)', textDecoration: 'none', fontFamily: 'var(--fb)', fontSize: '.68rem', transition: 'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                      {p}
                    </a>
                  ))}
                </div>
                <button className="btn-sm">Full Profile →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop: '3rem', textAlign: 'center', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 20, padding: '2.5rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>🦋</div>
        <h3 style={{ fontFamily: 'var(--ff)', fontSize: '1.6rem', marginBottom: '.5rem' }}>Join Our Mission</h3>
        <p style={{ color: 'var(--text2)', fontFamily: 'var(--ff)', fontSize: '.95rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
          Researchers, naturalists, photographers, and policy advocates — all welcome.
        </p>
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-p">Apply as Researcher</button>
          <button className="btn btn-o">Volunteer</button>
        </div>
      </div>

      {state.selectedMember && <MemberModal />}
    </div>
  );
}
