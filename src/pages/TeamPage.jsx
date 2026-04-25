import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Loader from '../components/shared/Loader';
import MemberModal from '../components/modals/MemberModal';

// ─── Medal styles for top 3 ───────────────────────────────────────────────────
const RANK_STYLES = [
  { bg: 'linear-gradient(135deg,#f59e0b22,#f59e0b08)', border: '#f59e0b55', badge: '#f59e0b', label: '🥇' },
  { bg: 'linear-gradient(135deg,#9ca3af22,#9ca3af08)', border: '#9ca3af55', badge: '#9ca3af', label: '🥈' },
  { bg: 'linear-gradient(135deg,#b4530922,#b4530908)', border: '#b4530955', badge: '#cd7c2f', label: '🥉' },
];

const AVATAR_COLORS = ['#52c97b','#60a5fa','#f472b6','#f59e0b','#fb923c','#34d399','#a78bfa','#f87171'];

function userColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function userInitials(name) {
  const parts = name.trim().split(/[\s._]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ─── Contributor card (rank 4+) ───────────────────────────────────────────────
function ContributorCard({ user, rank, total }) {
  const rs    = rank < 3 ? RANK_STYLES[rank] : null;
  const color = userColor(user['USER ID']);
  const pct   = Math.round((user['Total Uploads By User'] / total) * 100 * 10) / 10;

  return (
    <div
      style={{
        background: 'var(--bg3)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '1.1rem 1.2rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
        transition: 'all .22s', position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none';             e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      <div style={{ position: 'absolute', top: 8, right: 10, fontSize: '.68rem', color: 'var(--text3)', fontWeight: 700 }}>
        #{rank + 1}
      </div>
      <div style={{
        width: 42, height: 42, borderRadius: '50%',
        background: `${color}22`, border: `2px solid ${color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '.82rem', color, flexShrink: 0,
      }}>
        {userInitials(user['USER ID'])}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '.3rem' }}>
          {user['USER ID']}
        </div>
        <div style={{ height: 5, borderRadius: 3, background: 'var(--bg)', overflow: 'hidden', marginBottom: '.3rem' }}>
          <div style={{ height: '100%', width: `${Math.min(pct * 5, 100)}%`, background: color, borderRadius: 3, transition: 'width .6s ease' }} />
        </div>
        <div style={{ fontSize: '.72rem', color: 'var(--text3)' }}>
          <span style={{ color, fontWeight: 700 }}>{user['Total Uploads By User'].toLocaleString()}</span>
          {' '}uploads · {pct}% of total
        </div>
      </div>
    </div>
  );
}

// ─── TeamPage ─────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const { state } = useApp();

  const [contributors, setContributors] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [showAll,      setShowAll]      = useState(false);

  const fetchContributors = () => {
    setLoading(true);
    setError(null);
    fetch('https://wlbapi.toolforge.org/api/wlb/uploads-by-user')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => {
        const sorted = (d?.data || []).sort((a, b) => b['Total Uploads By User'] - a['Total Uploads By User']);
        setContributors(sorted);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  };

  // Always fetch fresh on mount — no cache, no static fallback
  useEffect(() => { fetchContributors(); }, []);

  const totalUploads = contributors.reduce((s, u) => s + u['Total Uploads By User'], 0);
  const displayed    = showAll ? contributors.slice(3) : contributors.slice(3, 15);

  return (
    <div style={{ padding: '7rem 1.5rem 4rem', maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="sec-eye">Community</div>
        <h1 className="sec-h">Our <em>Contributors</em></h1>
        <p className="sec-sub" style={{ marginTop: '.5rem' }}>
          Citizen scientists powering India's butterfly documentation.
          {!loading && !error && contributors.length > 0 && (
            <span style={{ color: 'var(--green)', marginLeft: '.4rem' }}>
              {contributors.length} contributors · {totalUploads.toLocaleString()} total uploads
            </span>
          )}
        </p>
      </div>

      {/* ── States ──────────────────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem' }}><Loader /></div>

      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg3)', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>⚠️</div>
          <div style={{ color: 'var(--text)', fontFamily: 'var(--ff)', fontSize: '1.1rem', marginBottom: '.4rem' }}>Failed to load contributors</div>
          <div style={{ color: 'var(--text3)', fontSize: '.85rem', marginBottom: '1rem' }}>{error}</div>
          <button className="btn btn-p" onClick={fetchContributors}>Retry</button>
        </div>

      ) : (
        <>
          {/* ── Podium top 3 ──────────────────────────────────────────────── */}
          {contributors.length >= 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2.5rem' }} className="podium-grid">
              {[1, 0, 2].map(i => {
                const u     = contributors[i];
                const rs    = RANK_STYLES[i];
                const color = userColor(u['USER ID']);
                return (
                  <div key={u['USER ID']} style={{
                    background: rs.bg, border: `1px solid ${rs.border}`,
                    borderRadius: 18, padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    marginTop: i === 0 ? 0 : '1.5rem',
                    transition: 'transform .22s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ fontSize: '2.2rem', marginBottom: '.6rem' }}>{rs.label}</div>
                    <div style={{
                      width: 58, height: 58, borderRadius: '50%',
                      background: `${color}22`, border: `2.5px solid ${rs.badge}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1.1rem', color,
                      margin: '0 auto .85rem',
                    }}>
                      {userInitials(u['USER ID'])}
                    </div>
                    <div style={{ fontFamily: 'var(--ff)', fontSize: '.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.4rem', wordBreak: 'break-word' }}>
                      {u['USER ID']}
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, color: rs.badge, fontFamily: 'var(--ff)', lineHeight: 1 }}>
                      {u['Total Uploads By User'].toLocaleString()}
                    </div>
                    <div style={{ fontSize: '.7rem', color: 'var(--text3)', marginTop: '.2rem' }}>uploads</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Grid rank 4+ ──────────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '.85rem' }}>
            {displayed.map((u, i) => (
              <ContributorCard key={u['USER ID']} user={u} rank={i + 3} total={totalUploads} />
            ))}
          </div>

          {contributors.length > 15 && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button className="btn btn-o" onClick={() => setShowAll(v => !v)}>
                {showAll ? '↑ Show Less' : `Show All ${contributors.length} Contributors ↓`}
              </button>
            </div>
          )}
        </>
      )}


      {state.selectedMember && <MemberModal />}

      <style>{`
        @media(max-width:600px){
          .podium-grid { grid-template-columns: 1fr !important; }
          .podium-grid > div { margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}