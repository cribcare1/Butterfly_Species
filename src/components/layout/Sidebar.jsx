import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const [expandedSubcat, setExpandedSubcat] = useState(null);

  return (
    <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-subtitle">Browse By</div>
        <div className="sidebar-title">Butterfly Families</div>
        <button
          className="sidebar-close"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        {/* All Families */}
        <button
          onClick={() => {
            dispatch({ type: 'SEL_CAT', v: null });
            dispatch({ type: 'SEL_SUBCAT', v: 'all' });
            dispatch({ type: 'SET_PAGE', p: 'species' });
            setExpandedSubcat(null);
          }}
          className="sidebar-link"
          style={{
            background: !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
            borderLeft: !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
            color: !state.selectedCategory ? '#52c97b' : 'var(--text2)',
            fontWeight: !state.selectedCategory ? 600 : 400,
          }}
        >
          All Families
        </button>

        {/* Families */}
        {state.categories.map(cat => (
          <div key={cat.id} className="sidebar-family">
            <button
              onClick={() => {
                dispatch({ type: 'SEL_CAT', v: cat });
                dispatch({ type: 'SEL_SUBCAT', v: 'all' });
                dispatch({ type: 'SET_PAGE', p: 'species' });
                setExpandedSubcat(null);
              }}
              className="sidebar-link"
              style={{
                background: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all' ? 'rgba(82,201,123,.12)' : 'transparent',
                borderLeft: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all' ? '3px solid #52c97b' : '3px solid transparent',
                color: state.selectedCategory?.id === cat.id ? '#52c97b' : 'var(--text2)',
                fontWeight: state.selectedCategory?.id === cat.id ? 600 : 400,
              }}
            >
              <span>{cat.name}</span>
              <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
                {cat.species?.length || 0}
              </span>
            </button>

            {/* Subcategories */}
            {state.selectedCategory?.id === cat.id && cat.species?.length > 0 && (
              <div className="sidebar-subcats">
                {/* Get unique subcategories from species data */}
                {[...new Set(cat.species.map(s => s.subcategory))].map(sub => {
                  const speciesInSubcat = cat.species.filter(s => s.subcategory === sub);
                  const isExpanded = expandedSubcat === `${cat.id}-${sub}`;

                  return (
                    <div key={sub}>
                      <button
                        onClick={() => {
                          dispatch({ type: 'SEL_CAT', v: cat });
                          dispatch({ type: 'SEL_SUBCAT', v: sub });
                          dispatch({ type: 'SET_PAGE', p: 'species' });
                          setExpandedSubcat(isExpanded ? null : `${cat.id}-${sub}`);
                        }}
                        className="sidebar-sublink"
                        style={{
                          background: state.selectedSubcat === sub ? 'rgba(82,201,123,.08)' : 'transparent',
                          color: state.selectedSubcat === sub ? '#52c97b' : 'var(--text3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '.4rem',
                        }}
                      >
                        <span style={{
                          display: 'inline-block',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: state.selectedSubcat === sub ? '#52c97b' : 'var(--border)',
                          flexShrink: 0,
                        }} />
                        <span style={{ flex: 1, textAlign: 'left' }}>{sub}</span>
                        <span style={{ fontSize: '.65rem', color: 'var(--text3)' }}>
                          {isExpanded ? '▼' : '▶'}
                        </span>
                      </button>

                      {/* Level 3: Species */}
                      {isExpanded && speciesInSubcat.length > 0 && (
                        <div style={{ paddingLeft: '0.8rem', borderLeft: '1px solid var(--border)' }}>
                          {speciesInSubcat.map(species => (
                            <button
                              key={species.id}
                              onClick={() => {
                                console.log('[Sidebar] Clicking species:', { name: species.name, id: species.id, subcategory: species.subcategory });
                                dispatch({ type: 'SEL_CAT', v: cat });
                                dispatch({ type: 'SEL_SUBCAT', v: sub });
                                dispatch({ type: 'SEL_SPECIES_FILTER', v: species });
                                dispatch({ type: 'SET_PAGE', p: 'species' });
                              }}
                              className="sidebar-species"
                              style={{
                                display: 'block',
                                width: '100%',
                                padding: '.4rem .5rem',
                                textAlign: 'left',
                                fontSize: '.75rem',
                                color: 'var(--text3)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = '#52c97b';
                                e.target.style.background = 'rgba(82,201,123,.04)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = 'var(--text3)';
                                e.target.style.background = 'transparent';
                              }}
                              title={species.name}
                            >
                              • {species.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-divider"></div>
        <button className="sidebar-link">Settings ⚙️</button>
        <button className="sidebar-link">Help ❓</button>
      </div>
    </aside>
  );
}
