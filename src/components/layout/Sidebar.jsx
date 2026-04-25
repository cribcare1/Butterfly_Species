

import { useState } from 'react';
import { useApp } from '../../context/AppContext';

function isFileLeaf(node) {
  return node.type === 'files' || (Array.isArray(node.files) && node.files.length > 0);
}

function TaxonNode({ node, depth, cat, ancestorPath }) {
  const { state, dispatch } = useApp();
  const [expanded, setExpanded] = useState(depth === 0);

  const displayName = node.category.replace(/_/g, ' ');

  const isLeaf = isFileLeaf(node) ||
    !Array.isArray(node.children) ||
    node.children.length === 0;

  const isSelected = state.selectedSubcat === node.category ||
    state.selectedSpeciesFilter?.path?.includes(node.category);

  // Full path from root down to this node
  const fullPath = [...ancestorPath, { category: node.category, label: displayName }];

  const handleClick = () => {
    // Only switch family if it's actually changing
    if (state.selectedCategory?.id !== cat.id) {
      dispatch({ type: 'SEL_CAT', v: cat });
    }
    dispatch({ type: 'SET_PAGE', p: 'species' });

    if (isLeaf) {
      const species = cat.species.find(s => s.path && s.path.includes(node.category));
      if (species) {
        dispatch({ type: 'SEL_SPECIES_FILTER', v: species });
      }
    } else {
      setExpanded(e => !e);
      dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
      dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="sidebar-sublink"
        style={{
          paddingLeft: `${0.6 + depth * 0.9}rem`,
          color: isSelected ? '#52c97b' : 'var(--text3)',
          background: isSelected ? 'rgba(82,201,123,.08)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '.35rem',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <span style={{ flexShrink: 0, fontSize: '.65rem', color: isSelected ? '#52c97b' : 'var(--border)' }}>
          {isLeaf ? '•' : expanded ? '▾' : '▸'}
        </span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayName}
        </span>
        {depth === 0 && node.count > 0 && (
          <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>{node.count}</span>
        )}
      </button>

      {expanded && !isLeaf && (
        <div style={{ borderLeft: '1px solid var(--border)', marginLeft: `${0.9 + depth * 0.9}rem` }}>
          {node.children.map(child => (
            <TaxonNode
              key={child.category}
              node={child}
              depth={depth + 1}
              cat={cat}
              ancestorPath={fullPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { state, dispatch } = useApp();

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
        <button
          onClick={() => {
            dispatch({ type: 'SEL_CAT', v: null });
            dispatch({ type: 'SEL_SUBCAT', v: 'all' });
            dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
            dispatch({ type: 'SET_PAGE', p: 'species' });
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

        {state.categories.map(cat => (
          <div key={cat.id} className="sidebar-family">
            <button
              onClick={() => {
                dispatch({ type: 'SEL_CAT', v: cat });
                dispatch({ type: 'SEL_SUBCAT', v: 'all' });
                dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                dispatch({ type: 'SET_PAGE', p: 'species' });
              }}
              className="sidebar-link"
              style={{
                background: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all' ? 'rgba(82,201,123,.12)' : 'transparent',
                borderLeft: state.selectedCategory?.id === cat.id ? '3px solid #52c97b' : '3px solid transparent',
                color: state.selectedCategory?.id === cat.id ? '#52c97b' : 'var(--text2)',
                fontWeight: state.selectedCategory?.id === cat.id ? 600 : 400,
              }}
            >
              <span>{cat.name}</span>
              <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
                {cat.count || 0}
              </span>
            </button>

            {state.selectedCategory?.id === cat.id && cat.taxonomyLoading && (
              <div style={{ padding: '0.5rem 1rem', color: 'var(--text3)', fontSize: '.75rem' }}>
                Loading...
              </div>
            )}

            {state.selectedCategory?.id === cat.id && cat.taxonomyTree && (
              <div className="sidebar-subcats">
                {(cat.taxonomyTree.children || []).map(child => (
                  <TaxonNode
                    key={child.category}
                    node={child}
                    depth={0}
                    cat={cat}
                    ancestorPath={[]}
                  />
                ))}
              </div>
            )}

            {state.selectedCategory?.id === cat.id && !cat.taxonomyTree && cat.subcategories?.length > 0 && (
              <div className="sidebar-subcats">
                {cat.subcategories.map(sub => (
                  <button
                    key={sub}
                    onClick={() => {
                      dispatch({ type: 'SEL_SUBCAT', v: sub });
                      dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                      dispatch({ type: 'SET_PAGE', p: 'species' });
                    }}
                    className="sidebar-sublink"
                    style={{
                      background: state.selectedSubcat === sub ? 'rgba(82,201,123,.08)' : 'transparent',
                      color: state.selectedSubcat === sub ? '#52c97b' : 'var(--text3)',
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: state.selectedSubcat === sub ? '#52c97b' : 'var(--border)', display: 'inline-block', flexShrink: 0 }} />
                    {sub}
                  </button>
                ))}
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