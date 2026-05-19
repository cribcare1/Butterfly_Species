

import { useState } from 'react';
import { useApp } from '../../context/AppContext';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatLabel(category = '') {
  return category.replace(/_/g, ' ');
}

function isLeafNode(node) {
  return !Array.isArray(node.children) || node.children.length === 0;
}

const DEPTH_CONFIG = [
  { indent: 0.75, fs: '0.86rem' },
  { indent: 1.70, fs: '0.82rem' },
  { indent: 2.65, fs: '0.78rem' },
  { indent: 3.50, fs: '0.74rem' },
];
const dc = (depth) => DEPTH_CONFIG[Math.min(depth, DEPTH_CONFIG.length - 1)];

// ─── Single recursive tree node ───────────────────────────────────────────────

function TaxonNode({ node, depth, cat, ancestorPath }) {
  const { state, dispatch } = useApp();
  const [expanded, setExpanded] = useState(depth === 0);

  const label  = formatLabel(node.category);
  const isLeaf = isLeafNode(node);

  const fullPath = [...ancestorPath, { category: node.category, label }];

  const activeFilter    = state.selectedSpeciesFilter;
  const activePath      = state.selectedSubcatPath || [];
  const inActivePath    = activePath.some(c => c.category === node.category);
  const isActiveLeaf    = activeFilter?.category === node.category;
  const isActiveNonLeaf = state.selectedSubcat === node.category && !activeFilter;
  const isFullyActive   = isActiveLeaf || isActiveNonLeaf;
  const isAncestorHit   = inActivePath && !isFullyActive;

  const color      = isFullyActive ? '#52c97b' : isAncestorHit ? '#3a9960' : 'var(--text3)';
  const bgColor    = isFullyActive
    ? 'rgba(82,201,123,.13)'
    : isAncestorHit
    ? 'rgba(82,201,123,.05)'
    : 'transparent';
  const leftBorder = isFullyActive
    ? '2px solid rgba(82,201,123,.6)'
    : '2px solid transparent';

  const handleClick = () => {
    if (state.selectedCategory?.id !== cat.id) {
      dispatch({ type: 'SEL_CAT', v: cat });
    }
    dispatch({ type: 'SET_PAGE', p: 'species' });

    dispatch({
      type: 'SEL_SUBCAT_PATH',
      category: node.category,
      path: fullPath,
    });

    if (isLeaf) {
      dispatch({
        type: 'SEL_SPECIES_FILTER',
        v: { category: node.category, label, path: fullPath.map(p => p.category) },
      });
    } else {
      setExpanded(e => !e);
      dispatch({
        type: 'SEL_SPECIES_FILTER',
        v: { category: node.category, label, path: fullPath.map(p => p.category) },
      });
    }
  };

  const { indent, fs } = dc(depth);

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: `0.28rem 0.75rem 0.28rem ${indent}rem`,
          background: bgColor,
          border: 'none',
          borderLeft: leftBorder,
          cursor: 'pointer',
          color,
          fontSize: fs,
          fontWeight: isFullyActive ? 600 : isAncestorHit ? 500 : 400,
          textAlign: 'left',
          lineHeight: 1.45,
          transition: 'background 0.12s, color 0.12s',
          fontFamily: 'inherit',
        }}
      >
        <span style={{
          flexShrink: 0,
          width: '0.7rem',
          textAlign: 'center',
          fontSize: '0.62rem',
          color: isFullyActive || isAncestorHit ? color : 'var(--border)',
          transition: 'color 0.12s',
        }}>
          {isLeaf ? '◆' : expanded ? '▾' : '▸'}
        </span>

        <span style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontStyle: isLeaf ? 'italic' : 'normal',
        }}>
          {label}
        </span>
      </button>

      {!isLeaf && expanded && (
        <div style={{
          borderLeft: `1px solid ${
            isFullyActive || isAncestorHit
              ? 'rgba(82,201,123,.22)'
              : 'var(--border)'
          }`,
          marginLeft: `${indent + 0.15}rem`,
        }}>
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

// ─── Sidebar root ──────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { state, dispatch, loadFamilySubtree } = useApp();

  const handleFamilyClick = (cat) => {
    const isAlreadySelected = state.selectedCategory?.id === cat.id;

    dispatch({ type: 'SEL_CAT', v: cat });
    dispatch({ type: 'SEL_SUBCAT', v: 'all' });
    dispatch({ type: 'SET_PAGE', p: 'species' });

    dispatch({
      type: 'SEL_SPECIES_FILTER',
      v: { category: cat.name, label: cat.name, path: [cat.name] },
    });

    if (!isAlreadySelected && !cat.subtreeNode && !cat.subtreeLoading) {
      loadFamilySubtree(cat.name);
    }
  };

  return (
    <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-subtitle">Browse By</div>
        <div className="sidebar-title">Butterfly Families</div>
        <button
          className="sidebar-close"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        >✕</button>
      </div>

      <nav className="sidebar-nav">
        {/* "All Families" shortcut */}
        <button
          onClick={() => {
            dispatch({ type: 'SEL_CAT',           v: null });
            dispatch({ type: 'SEL_SUBCAT',         v: 'all' });
            dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
            dispatch({ type: 'SET_PAGE',           p: 'species' });
          }}
          className="sidebar-link"
          style={{
            background: !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
            borderLeft: !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
            color:      !state.selectedCategory ? '#52c97b' : 'var(--text2)',
            fontWeight: !state.selectedCategory ? 600 : 400,
          }}
        >
          All Families
        </button>

        {state.categories.map(cat => {
          const isActive = state.selectedCategory?.id === cat.id;

          return (
            <div key={cat.id} className="sidebar-family">
              {/* Family header button */}
              <button
                onClick={() => handleFamilyClick(cat)}
                className="sidebar-link"
                style={{
                  background: isActive ? 'rgba(82,201,123,.12)' : 'transparent',
                  borderLeft: isActive ? '3px solid #52c97b' : '3px solid transparent',
                  color:      isActive ? '#52c97b' : 'var(--text2)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span>{cat.name}</span>
                {isActive && cat.subtreeNode && (
                  <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
                    {Array.isArray(cat.subtreeNode.children) ? cat.subtreeNode.children.length : ''}
                  </span>
                )}
              </button>

              {/* Loading spinner — only for active family */}
              {isActive && cat.subtreeLoading && (
                <div style={{
                  padding: '0.5rem 1.2rem', color: 'var(--text3)',
                  fontSize: '.73rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Loading taxonomy…
                </div>
              )}

              {/* Error state — only for active family */}
              {isActive && cat.subtreeError && (
                <div style={{
                  padding: '0.4rem 1.2rem', color: 'var(--danger, #f87171)',
                  fontSize: '.72rem',
                }}>
                  Failed to load.{' '}
                  <button
                    onClick={() => loadFamilySubtree(cat.name)}
                    style={{
                      background: 'none', border: 'none', color: 'inherit',
                      textDecoration: 'underline', cursor: 'pointer',
                      fontSize: 'inherit', padding: 0,
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Subtree — only for active family */}
              {isActive && cat.subtreeNode && !cat.subtreeLoading && (
                <div className="sidebar-subcats" style={{ paddingBottom: '0.5rem' }}>
                  {(Array.isArray(cat.subtreeNode.children) ? cat.subtreeNode.children : [])
                    .map(child => (
                      <TaxonNode
                        key={child.category}
                        node={child}
                        depth={0}
                        cat={cat}
                        ancestorPath={[]}
                      />
                    ))
                  }
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-divider" />
      </div>
    </aside>
  );
}