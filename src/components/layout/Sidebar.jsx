

// import { useState } from 'react';
// import { useApp } from '../../context/AppContext';

// function isFileLeaf(node) {
//   return node.type === 'files' || (Array.isArray(node.files) && node.files.length > 0);
// }

// function TaxonNode({ node, depth, cat, ancestorPath }) {
//   const { state, dispatch } = useApp();
//   const [expanded, setExpanded] = useState(depth === 0);

//   const displayName = node.category.replace(/_/g, ' ');

//   const isLeaf = isFileLeaf(node) ||
//     !Array.isArray(node.children) ||
//     node.children.length === 0;

//   const isSelected = state.selectedSubcat === node.category ||
//     state.selectedSpeciesFilter?.path?.includes(node.category);

//   // Full path from root down to this node
//   const fullPath = [...ancestorPath, { category: node.category, label: displayName }];

//   // Log depth info for debugging
//   if (depth <= 2) {
//     console.log(`${'  '.repeat(depth)}└─ [depth=${depth}] ${displayName} (isLeaf: ${isLeaf})`);
//   }

//   const handleClick = () => {
//     // Only switch family if it's actually changing
//     if (state.selectedCategory?.id !== cat.id) {
//       dispatch({ type: 'SEL_CAT', v: cat });
//     }
//     dispatch({ type: 'SET_PAGE', p: 'species' });

//     // Check if this node matches one of the subcategories in the new object structure
//     const subcategoryKeys = typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//       ? Object.keys(cat.subcategories)
//       : [];
//     const matchesSubcategory = subcategoryKeys.includes(node.category);

//     if (isLeaf) {
//       // Get all species from the category's subcategories
//       const allSpecies = typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//         ? Object.values(cat.subcategories).flat()
//         : (cat.species || []);
//       const species = allSpecies.find(s => s.path && s.path.includes(node.category));
//       if (species) {
//         dispatch({ type: 'SEL_SPECIES_FILTER', v: species });
//       }
//     } else {
//       setExpanded(e => !e);
//       // Always dispatch SEL_SUBCAT_PATH which will clear selectedSpeciesFilter
//       dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
      
//       // If this node is a subcategory, also set selectedSubcat
//       if (matchesSubcategory) {
//         dispatch({ type: 'SEL_SUBCAT', v: node.category });
//       }
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className="sidebar-sublink"
//         style={{
//           paddingLeft: `${0.6 + depth * 1.2}rem`,
//           color: isSelected ? '#52c97b' : 'var(--text3)',
//           background: isSelected ? 'rgba(82,201,123,.08)' : 'transparent',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '.35rem',
//           width: '100%',
//           textAlign: 'left',
//           fontSize: depth > 0 ? '.85rem' : '0.9rem',
//           fontWeight: depth === 0 ? 500 : 400,
//         }}
//       >
//         <span style={{ flexShrink: 0, fontSize: '.65rem', color: isSelected ? '#52c97b' : 'var(--border)' }}>
//           {isLeaf ? '•' : expanded ? '▾' : '▸'}
//         </span>
//         <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {displayName}
//         </span>
//         {depth === 0 && node.count > 0 && (
//           <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>{node.count}</span>
//         )}
//       </button>

//       {expanded && !isLeaf && (
//         <div style={{ borderLeft: '1px solid var(--border)', marginLeft: `${0.9 + depth * 1.2}rem` }}>
//           {node.children.map(child => (
//             <TaxonNode
//               key={child.category}
//               node={child}
//               depth={depth + 1}
//               cat={cat}
//               ancestorPath={fullPath}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Sidebar() {
//   const { state, dispatch } = useApp();

//   return (
//     <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-header">
//         <div className="sidebar-subtitle">Browse By</div>
//         <div className="sidebar-title">Butterfly Families</div>
//         <button
//           className="sidebar-close"
//           onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
//         >
//           ✕
//         </button>
//       </div>

//       <nav className="sidebar-nav">
//         <button
//           onClick={() => {
//             dispatch({ type: 'SEL_CAT', v: null });
//             dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//             dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             dispatch({ type: 'SET_PAGE', p: 'species' });
//           }}
//           className="sidebar-link"
//           style={{
//             background: !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
//             borderLeft: !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
//             color: !state.selectedCategory ? '#52c97b' : 'var(--text2)',
//             fontWeight: !state.selectedCategory ? 600 : 400,
//           }}
//         >
//           All Families
//         </button>

//         {state.categories.map(cat => (
//           <div key={cat.id} className="sidebar-family">
//             <button
//               onClick={() => {
//                 dispatch({ type: 'SEL_CAT', v: cat });
//                 dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                 dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 dispatch({ type: 'SET_PAGE', p: 'species' });
//               }}
//               className="sidebar-link"
//               style={{
//                 background: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all' ? 'rgba(82,201,123,.12)' : 'transparent',
//                 borderLeft: state.selectedCategory?.id === cat.id ? '3px solid #52c97b' : '3px solid transparent',
//                 color: state.selectedCategory?.id === cat.id ? '#52c97b' : 'var(--text2)',
//                 fontWeight: state.selectedCategory?.id === cat.id ? 600 : 400,
//               }}
//             >
//               <span>{cat.name}</span>
//               <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
//                 {cat.count || 0}
//               </span>
//             </button>

//             {state.selectedCategory?.id === cat.id && cat.taxonomyLoading && (
//               <div style={{ padding: '0.5rem 1rem', color: 'var(--text3)', fontSize: '.75rem' }}>
//                 Loading...
//               </div>
//             )}

//             {state.selectedCategory?.id === cat.id && cat.taxonomyTree && (
//               <div className="sidebar-subcats">
//                 {(cat.taxonomyTree.children || []).map(child => (
//                   <TaxonNode
//                     key={child.category}
//                     node={child}
//                     depth={0}
//                     cat={cat}
//                     ancestorPath={[]}
//                   />
//                 ))}
//               </div>
//             )}

//             {state.selectedCategory?.id === cat.id && !cat.taxonomyTree && cat.subcategories && typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories) && (
//               <div className="sidebar-subcats">
//                 {Object.keys(cat.subcategories).map(sub => {
//                   const species = cat.subcategories[sub] || [];
//                   const isExpanded = state.selectedSubcat === sub;
                  
//                   return (
//                     <div key={sub}>
//                       <button
//                         onClick={() => {
//                           dispatch({ type: 'SEL_SUBCAT', v: sub });
//                           dispatch({ type: 'SET_PAGE', p: 'species' });
//                         }}
//                         className="sidebar-sublink"
//                         style={{
//                           background: isExpanded ? 'rgba(82,201,123,.08)' : 'transparent',
//                           color: isExpanded ? '#52c97b' : 'var(--text3)',
//                           fontWeight: isExpanded ? 600 : 400,
//                         }}
//                       >
//                         <span style={{ 
//                           width: 4, 
//                           height: 4, 
//                           borderRadius: '50%', 
//                           background: isExpanded ? '#52c97b' : 'var(--border)', 
//                           display: 'inline-block', 
//                           flexShrink: 0 
//                         }} />
//                         <span style={{ flex: 1 }}>{sub}</span>
//                         <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>
//                           {species.length}
//                         </span>
//                       </button>
                      
//                       {/* Show species under selected subcategory */}
//                       {isExpanded && species.length > 0 && (
//                         <div style={{ 
//                           borderLeft: '1px solid var(--border)', 
//                           marginLeft: '0.9rem',
//                           paddingLeft: '0.5rem'
//                         }}>
//                           {species.map(sp => (
//                             <button
//                               key={sp.id}
//                               onClick={() => {
//                                 dispatch({ type: 'SEL_SPECIES_FILTER', v: sp });
//                                 dispatch({ type: 'SET_PAGE', p: 'species' });
//                               }}
//                               className="sidebar-sublink"
//                               style={{
//                                 paddingLeft: '1.4rem',
//                                 background: state.selectedSpeciesFilter?.id === sp.id ? 'rgba(82,201,123,.08)' : 'transparent',
//                                 color: state.selectedSpeciesFilter?.id === sp.id ? '#52c97b' : 'var(--text3)',
//                                 fontSize: '.75rem',
//                               }}
//                             >
//                               <span style={{ fontSize: '.5rem' }}>🦋</span>
//                               <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                                 {sp.name}
//                               </span>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="sidebar-divider"></div>
//         <button className="sidebar-link">Settings ⚙️</button>
//         <button className="sidebar-link">Help ❓</button>
//       </div>
//     </aside>
//   );
// }
// import { useState } from 'react';
// import { useApp } from '../../context/AppContext';

// function isFileLeaf(node) {
//   return node.type === 'files' || (Array.isArray(node.files) && node.files.length > 0);
// }

// function TaxonNode({ node, depth, cat, ancestorPath }) {
//   const { state, dispatch } = useApp();
//   const [expanded, setExpanded] = useState(depth === 0);

//   const displayName = node.category.replace(/_/g, ' ');

//   const isLeaf =
//     isFileLeaf(node) ||
//     !Array.isArray(node.children) ||
//     node.children.length === 0;

//   const isSelected =
//     state.selectedSubcat === node.category ||
//     state.selectedSpeciesFilter?.path?.includes(node.category);

//   // Full path from root down to this node
//   const fullPath = [...ancestorPath, { category: node.category, label: displayName }];

//   const handleClick = () => {
//     // Only switch family if it's actually changing
//     if (state.selectedCategory?.id !== cat.id) {
//       dispatch({ type: 'SEL_CAT', v: cat });
//     }
//     dispatch({ type: 'SET_PAGE', p: 'species' });

//     const subcategoryKeys =
//       typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//         ? Object.keys(cat.subcategories)
//         : [];
//     const matchesSubcategory = subcategoryKeys.includes(node.category);

//     if (isLeaf) {
//       // Collect ALL species from this category
//       const allSpecies =
//         typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//           ? Object.values(cat.subcategories).flat()
//           : cat.species || [];

//       // Filter by path — was .find() before, which only ever returned 1 species
//       const matches = allSpecies.filter(s => s.path && s.path.includes(node.category));

//       if (matches.length === 1) {
//         // Genuine single-species leaf → show only that card
//         dispatch({ type: 'SEL_SPECIES_FILTER', v: matches[0] });
//       } else {
//         // Multiple species share this node, or no match at all →
//         // use path-based filtering so the grid shows all of them
//         dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//       }
//     } else {
//       setExpanded(e => !e);
//       // Always push the full path so breadcrumbs stay in sync
//       dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//       if (matchesSubcategory) {
//         dispatch({ type: 'SEL_SUBCAT', v: node.category });
//       }
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className="sidebar-sublink"
//         style={{
//           paddingLeft: `${0.6 + depth * 1.2}rem`,
//           color: isSelected ? '#52c97b' : 'var(--text3)',
//           background: isSelected ? 'rgba(82,201,123,.08)' : 'transparent',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '.35rem',
//           width: '100%',
//           textAlign: 'left',
//           fontSize: depth > 0 ? '.85rem' : '0.9rem',
//           fontWeight: depth === 0 ? 500 : 400,
//         }}
//       >
//         <span style={{ flexShrink: 0, fontSize: '.65rem', color: isSelected ? '#52c97b' : 'var(--border)' }}>
//           {isLeaf ? '•' : expanded ? '▾' : '▸'}
//         </span>
//         <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {displayName}
//         </span>
//         {depth === 0 && node.count > 0 && (
//           <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>{node.count}</span>
//         )}
//       </button>

//       {expanded && !isLeaf && (
//         <div style={{ borderLeft: '1px solid var(--border)', marginLeft: `${0.9 + depth * 1.2}rem` }}>
//           {node.children.map(child => (
//             <TaxonNode
//               key={child.category}
//               node={child}
//               depth={depth + 1}
//               cat={cat}
//               ancestorPath={fullPath}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Sidebar() {
//   const { state, dispatch } = useApp();

//   return (
//     <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-header">
//         <div className="sidebar-subtitle">Browse By</div>
//         <div className="sidebar-title">Butterfly Families</div>
//         <button
//           className="sidebar-close"
//           onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
//         >
//           ✕
//         </button>
//       </div>

//       <nav className="sidebar-nav">
//         <button
//           onClick={() => {
//             dispatch({ type: 'SEL_CAT', v: null });
//             dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//             dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             dispatch({ type: 'SET_PAGE', p: 'species' });
//           }}
//           className="sidebar-link"
//           style={{
//             background: !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
//             borderLeft: !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
//             color: !state.selectedCategory ? '#52c97b' : 'var(--text2)',
//             fontWeight: !state.selectedCategory ? 600 : 400,
//           }}
//         >
//           All Families
//         </button>

//         {state.categories.map(cat => (
//           <div key={cat.id} className="sidebar-family">
//             <button
//               onClick={() => {
//                 dispatch({ type: 'SEL_CAT', v: cat });
//                 dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                 dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 dispatch({ type: 'SET_PAGE', p: 'species' });
//               }}
//               className="sidebar-link"
//               style={{
//                 background: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all' ? 'rgba(82,201,123,.12)' : 'transparent',
//                 borderLeft: state.selectedCategory?.id === cat.id ? '3px solid #52c97b' : '3px solid transparent',
//                 color: state.selectedCategory?.id === cat.id ? '#52c97b' : 'var(--text2)',
//                 fontWeight: state.selectedCategory?.id === cat.id ? 600 : 400,
//               }}
//             >
//               <span>{cat.name}</span>
//               <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
//                 {cat.count || 0}
//               </span>
//             </button>

//             {/* Taxonomy tree (new structure) */}
//             {state.selectedCategory?.id === cat.id && cat.taxonomyLoading && (
//               <div style={{ padding: '0.5rem 1rem', color: 'var(--text3)', fontSize: '.75rem' }}>
//                 Loading...
//               </div>
//             )}

//             {state.selectedCategory?.id === cat.id && cat.taxonomyTree && (
//               <div className="sidebar-subcats">
//                 {(cat.taxonomyTree.children || []).map(child => (
//                   <TaxonNode
//                     key={child.category}
//                     node={child}
//                     depth={0}
//                     cat={cat}
//                     ancestorPath={[]}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Flat subcategories fallback (old object structure) */}
//             {state.selectedCategory?.id === cat.id &&
//               !cat.taxonomyTree &&
//               cat.subcategories &&
//               typeof cat.subcategories === 'object' &&
//               !Array.isArray(cat.subcategories) && (
//               <div className="sidebar-subcats">
//                 {Object.keys(cat.subcategories).map(sub => {
//                   const species    = cat.subcategories[sub] || [];
//                   const isExpanded = state.selectedSubcat === sub;

//                   return (
//                     <div key={sub}>
//                       <button
//                         onClick={() => {
//                           dispatch({ type: 'SEL_SUBCAT', v: sub });
//                           dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                           dispatch({ type: 'SET_PAGE', p: 'species' });
//                         }}
//                         className="sidebar-sublink"
//                         style={{
//                           background: isExpanded ? 'rgba(82,201,123,.08)' : 'transparent',
//                           color: isExpanded ? '#52c97b' : 'var(--text3)',
//                           fontWeight: isExpanded ? 600 : 400,
//                         }}
//                       >
//                         <span style={{
//                           width: 4, height: 4, borderRadius: '50%',
//                           background: isExpanded ? '#52c97b' : 'var(--border)',
//                           display: 'inline-block', flexShrink: 0,
//                         }} />
//                         <span style={{ flex: 1 }}>{sub}</span>
//                         <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>
//                           {species.length}
//                         </span>
//                       </button>

//                       {/* Species list under selected subcategory */}
//                       {isExpanded && species.length > 0 && (
//                         <div style={{
//                           borderLeft: '1px solid var(--border)',
//                           marginLeft: '0.9rem',
//                           paddingLeft: '0.5rem',
//                         }}>
//                           {species.map(sp => (
//                             <button
//                               key={sp.id}
//                               onClick={() => {
//                                 dispatch({ type: 'SEL_SPECIES_FILTER', v: sp });
//                                 dispatch({ type: 'SET_PAGE', p: 'species' });
//                               }}
//                               className="sidebar-sublink"
//                               style={{
//                                 paddingLeft: '1.4rem',
//                                 background: state.selectedSpeciesFilter?.id === sp.id ? 'rgba(82,201,123,.08)' : 'transparent',
//                                 color: state.selectedSpeciesFilter?.id === sp.id ? '#52c97b' : 'var(--text3)',
//                                 fontSize: '.75rem',
//                               }}
//                             >
//                               <span style={{ fontSize: '.5rem' }}>🦋</span>
//                               <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                                 {sp.name}
//                               </span>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="sidebar-divider"></div>
//         <button className="sidebar-link">Settings ⚙️</button>
//         <button className="sidebar-link">Help ❓</button>
//       </div>
//     </aside>
//   );
// }



// import { useState } from 'react';
// import { useApp } from '../../context/AppContext';

// function isFileLeaf(node) {
//   return node.type === 'files' || (Array.isArray(node.files) && node.files.length > 0);
// }

// function TaxonNode({ node, depth, cat, ancestorPath }) {
//   const { state, dispatch } = useApp();
//   const [expanded, setExpanded] = useState(depth === 0);

//   const displayName = node.category.replace(/_/g, ' ');

//   const isLeaf =
//     isFileLeaf(node) ||
//     !Array.isArray(node.children) ||
//     node.children.length === 0;

//   // ── Highlight this node if it appears ANYWHERE in the active path ──────────
//   // This gives the "select two" effect: both the genus node (Atrophaneura coon)
//   // and the leaf node (Atrophaneura nevilli) are highlighted simultaneously.
//   const activePath = state.selectedSubcatPath || [];

//   const isSelected =
//     // 1. This node is the currently selected subcat
//     state.selectedSubcat === node.category ||
//     // 2. This node is somewhere in the breadcrumb path (ancestor highlight)
//     activePath.some(crumb => crumb.category === node.category) ||
//     // 3. This node appears in the selected species' taxonomy path (leaf highlight)
//     state.selectedSpeciesFilter?.path?.includes(node.category);

//   // Full path from root down to this node
//   const fullPath = [...ancestorPath, { category: node.category, label: displayName }];

//   const handleClick = () => {
//     if (state.selectedCategory?.id !== cat.id) {
//       dispatch({ type: 'SEL_CAT', v: cat });
//     }
//     dispatch({ type: 'SET_PAGE', p: 'species' });

//     const subcategoryKeys =
//       typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//         ? Object.keys(cat.subcategories)
//         : [];
//     const matchesSubcategory = subcategoryKeys.includes(node.category);

//     if (isLeaf) {
//       const allSpecies =
//         typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//           ? Object.values(cat.subcategories).flat()
//           : cat.species || [];

//       const matches = allSpecies.filter(s => s.path && s.path.includes(node.category));

//       if (matches.length === 1) {
//         // Single species leaf — also keep the full path so ancestors stay lit
//         dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//         dispatch({ type: 'SEL_SPECIES_FILTER', v: matches[0] });
//       } else {
//         // Multiple species under this node — show all via path filter
//         dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//       }
//     } else {
//       setExpanded(e => !e);
//       dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//       if (matchesSubcategory) {
//         dispatch({ type: 'SEL_SUBCAT', v: node.category });
//       }
//     }
//   };

//   // ── Dim ancestors vs active node for visual depth ──────────────────────────
//   // Ancestors in path: muted green. Current leaf/selection: full green.
//   const isLeafActive =
//     state.selectedSubcat === node.category ||
//     state.selectedSpeciesFilter?.path?.includes(node.category);

//   const nodeColor = isLeafActive ? '#52c97b' : isSelected ? '#3a9960' : 'var(--text3)';
//   const nodeBg    = isLeafActive
//     ? 'rgba(82,201,123,.12)'
//     : isSelected
//     ? 'rgba(82,201,123,.05)'
//     : 'transparent';

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className="sidebar-sublink"
//         style={{
//           paddingLeft: `${0.6 + depth * 1.2}rem`,
//           color: nodeColor,
//           background: nodeBg,
//           display: 'flex',
//           alignItems: 'center',
//           gap: '.35rem',
//           width: '100%',
//           textAlign: 'left',
//           fontSize: depth > 0 ? '.85rem' : '0.9rem',
//           fontWeight: isLeafActive ? 600 : isSelected ? 500 : 400,
//         }}
//       >
//         <span style={{ flexShrink: 0, fontSize: '.65rem', color: isSelected ? nodeColor : 'var(--border)' }}>
//           {isLeaf ? '•' : expanded ? '▾' : '▸'}
//         </span>
//         <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {displayName}
//         </span>
//         {depth === 0 && node.count > 0 && (
//           <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>{node.count}</span>
//         )}
//       </button>

//       {expanded && !isLeaf && (
//         <div style={{
//           borderLeft: `1px solid ${isSelected ? 'rgba(82,201,123,.25)' : 'var(--border)'}`,
//           marginLeft: `${0.9 + depth * 1.2}rem`,
//         }}>
//           {node.children.map(child => (
//             <TaxonNode
//               key={child.category}
//               node={child}
//               depth={depth + 1}
//               cat={cat}
//               ancestorPath={fullPath}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Sidebar() {
//   const { state, dispatch } = useApp();

//   return (
//     <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-header">
//         <div className="sidebar-subtitle">Browse By</div>
//         <div className="sidebar-title">Butterfly Families</div>
//         <button
//           className="sidebar-close"
//           onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
//         >
//           ✕
//         </button>
//       </div>

//       <nav className="sidebar-nav">
//         <button
//           onClick={() => {
//             dispatch({ type: 'SEL_CAT', v: null });
//             dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//             dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             dispatch({ type: 'SET_PAGE', p: 'species' });
//           }}
//           className="sidebar-link"
//           style={{
//             background: !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
//             borderLeft: !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
//             color: !state.selectedCategory ? '#52c97b' : 'var(--text2)',
//             fontWeight: !state.selectedCategory ? 600 : 400,
//           }}
//         >
//           All Families
//         </button>

//         {state.categories.map(cat => (
//           <div key={cat.id} className="sidebar-family">
//             <button
//               onClick={() => {
//                 dispatch({ type: 'SEL_CAT', v: cat });
//                 dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                 dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 dispatch({ type: 'SET_PAGE', p: 'species' });
//               }}
//               className="sidebar-link"
//               style={{
//                 background: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all'
//                   ? 'rgba(82,201,123,.12)'
//                   : 'transparent',
//                 borderLeft: state.selectedCategory?.id === cat.id
//                   ? '3px solid #52c97b'
//                   : '3px solid transparent',
//                 color: state.selectedCategory?.id === cat.id ? '#52c97b' : 'var(--text2)',
//                 fontWeight: state.selectedCategory?.id === cat.id ? 600 : 400,
//               }}
//             >
//               <span>{cat.name}</span>
//               <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
//                 {cat.count || 0}
//               </span>
//             </button>

//             {/* Taxonomy tree loading state */}
//             {state.selectedCategory?.id === cat.id && cat.taxonomyLoading && (
//               <div style={{ padding: '0.5rem 1rem', color: 'var(--text3)', fontSize: '.75rem' }}>
//                 Loading...
//               </div>
//             )}

//             {/* Taxonomy tree (new nested structure) */}
//             {state.selectedCategory?.id === cat.id && cat.taxonomyTree && (
//               <div className="sidebar-subcats">
//                 {(cat.taxonomyTree.children || []).map(child => (
//                   <TaxonNode
//                     key={child.category}
//                     node={child}
//                     depth={0}
//                     cat={cat}
//                     ancestorPath={[]}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Flat subcategories fallback (old object structure) */}
//             {state.selectedCategory?.id === cat.id &&
//               !cat.taxonomyTree &&
//               cat.subcategories &&
//               typeof cat.subcategories === 'object' &&
//               !Array.isArray(cat.subcategories) && (
//               <div className="sidebar-subcats">
//                 {Object.keys(cat.subcategories).map(sub => {
//                   const species    = cat.subcategories[sub] || [];
//                   const isExpanded = state.selectedSubcat === sub;

//                   return (
//                     <div key={sub}>
//                       <button
//                         onClick={() => {
//                           dispatch({ type: 'SEL_SUBCAT', v: sub });
//                           dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                           dispatch({ type: 'SET_PAGE', p: 'species' });
//                         }}
//                         className="sidebar-sublink"
//                         style={{
//                           background: isExpanded ? 'rgba(82,201,123,.08)' : 'transparent',
//                           color: isExpanded ? '#52c97b' : 'var(--text3)',
//                           fontWeight: isExpanded ? 600 : 400,
//                         }}
//                       >
//                         <span style={{
//                           width: 4, height: 4, borderRadius: '50%',
//                           background: isExpanded ? '#52c97b' : 'var(--border)',
//                           display: 'inline-block', flexShrink: 0,
//                         }} />
//                         <span style={{ flex: 1 }}>{sub}</span>
//                         <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>
//                           {species.length}
//                         </span>
//                       </button>

//                       {/* Species list under selected subcategory */}
//                       {isExpanded && species.length > 0 && (
//                         <div style={{
//                           borderLeft: '1px solid var(--border)',
//                           marginLeft: '0.9rem',
//                           paddingLeft: '0.5rem',
//                         }}>
//                           {species.map(sp => (
//                             <button
//                               key={sp.id}
//                               onClick={() => {
//                                 dispatch({ type: 'SEL_SPECIES_FILTER', v: sp });
//                                 dispatch({ type: 'SET_PAGE', p: 'species' });
//                               }}
//                               className="sidebar-sublink"
//                               style={{
//                                 paddingLeft: '1.4rem',
//                                 background: state.selectedSpeciesFilter?.id === sp.id
//                                   ? 'rgba(82,201,123,.08)'
//                                   : 'transparent',
//                                 color: state.selectedSpeciesFilter?.id === sp.id
//                                   ? '#52c97b'
//                                   : 'var(--text3)',
//                                 fontSize: '.75rem',
//                               }}
//                             >
//                               <span style={{ fontSize: '.5rem' }}>🦋</span>
//                               <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                                 {sp.name}
//                               </span>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="sidebar-divider"></div>
//         <button className="sidebar-link">Settings ⚙️</button>
//         <button className="sidebar-link">Help ❓</button>
//       </div>
//     </aside>
//   );
// }



// import { useState } from 'react';
// import { useApp } from '../../context/AppContext';

// function isFileLeaf(node) {
//   return node.type === 'files' || (Array.isArray(node.files) && node.files.length > 0);
// }

// function TaxonNode({ node, depth, cat, ancestorPath }) {
//   const { state, dispatch } = useApp();
//   const [expanded, setExpanded] = useState(depth === 0);

//   const displayName = node.category.replace(/_/g, ' ');

//   const isLeaf =
//     isFileLeaf(node) ||
//     !Array.isArray(node.children) ||
//     node.children.length === 0;

//   // ── Highlight this node if it appears ANYWHERE in the active path ──────────
//   const activePath = state.selectedSubcatPath || [];

//   const isSelected =
//     state.selectedSubcat === node.category ||
//     activePath.some(crumb => crumb.category === node.category) ||
//     state.selectedSpeciesFilter?.path?.includes(node.category);

//   // Full path from root down to this node
//   const fullPath = [...ancestorPath, { category: node.category, label: displayName }];

//   const handleClick = () => {
//     if (state.selectedCategory?.id !== cat.id) {
//       dispatch({ type: 'SEL_CAT', v: cat });
//     }
//     dispatch({ type: 'SET_PAGE', p: 'species' });

//     const subcategoryKeys =
//       typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//         ? Object.keys(cat.subcategories)
//         : [];
//     const matchesSubcategory = subcategoryKeys.includes(node.category);

//     if (isLeaf) {
//       const allSpecies =
//         typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
//           ? Object.values(cat.subcategories).flat()
//           : cat.species || [];

//       // Use filter not find — a node can have multiple matching species
//       const matches = allSpecies.filter(s => s.path && s.path.includes(node.category));

//       if (matches.length === 1) {
//         // Single species leaf — push full path so ancestors stay highlighted
//         dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//         dispatch({ type: 'SEL_SPECIES_FILTER', v: matches[0] });
//       } else {
//         // Multiple species or no match — show all via path-based filter
//         dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//       }
//     } else {
//       setExpanded(e => !e);
//       dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
//       if (matchesSubcategory) {
//         dispatch({ type: 'SEL_SUBCAT', v: node.category });
//       }
//     }
//   };

//   // ── Visual depth: ancestors muted green, active node full green ────────────
//   const isLeafActive =
//     state.selectedSubcat === node.category ||
//     state.selectedSpeciesFilter?.path?.includes(node.category);

//   const nodeColor = isLeafActive ? '#52c97b' : isSelected ? '#3a9960' : 'var(--text3)';
//   const nodeBg    = isLeafActive
//     ? 'rgba(82,201,123,.12)'
//     : isSelected
//     ? 'rgba(82,201,123,.05)'
//     : 'transparent';

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className="sidebar-sublink"
//         style={{
//           paddingLeft: `${0.6 + depth * 1.2}rem`,
//           color: nodeColor,
//           background: nodeBg,
//           display: 'flex',
//           alignItems: 'center',
//           gap: '.35rem',
//           width: '100%',
//           textAlign: 'left',
//           fontSize: depth > 0 ? '.85rem' : '0.9rem',
//           fontWeight: isLeafActive ? 600 : isSelected ? 500 : 400,
//         }}
//       >
//         <span style={{ flexShrink: 0, fontSize: '.65rem', color: isSelected ? nodeColor : 'var(--border)' }}>
//           {isLeaf ? '•' : expanded ? '▾' : '▸'}
//         </span>
//         <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {displayName}
//         </span>
//         {depth === 0 && node.count > 0 && (
//           <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>{node.count}</span>
//         )}
//       </button>

//       {expanded && !isLeaf && (
//         <div style={{
//           borderLeft: `1px solid ${isSelected ? 'rgba(82,201,123,.25)' : 'var(--border)'}`,
//           marginLeft: `${0.9 + depth * 1.2}rem`,
//         }}>
//           {node.children.map(child => (
//             <TaxonNode
//               key={child.category}
//               node={child}
//               depth={depth + 1}
//               cat={cat}
//               ancestorPath={fullPath}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function Sidebar() {
//   const { state, dispatch } = useApp();

//   return (
//     <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
//       <div className="sidebar-header">
//         <div className="sidebar-subtitle">Browse By</div>
//         <div className="sidebar-title">Butterfly Families</div>
//         <button
//           className="sidebar-close"
//           onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
//         >
//           ✕
//         </button>
//       </div>

//       <nav className="sidebar-nav">
//         <button
//           onClick={() => {
//             dispatch({ type: 'SEL_CAT', v: null });
//             dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//             dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             dispatch({ type: 'SET_PAGE', p: 'species' });
//           }}
//           className="sidebar-link"
//           style={{
//             background: !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
//             borderLeft: !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
//             color: !state.selectedCategory ? '#52c97b' : 'var(--text2)',
//             fontWeight: !state.selectedCategory ? 600 : 400,
//           }}
//         >
//           All Families
//         </button>

//         {state.categories.map(cat => (
//           <div key={cat.id} className="sidebar-family">
//             <button
//               onClick={() => {
//                 dispatch({ type: 'SEL_CAT', v: cat });
//                 dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                 dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 dispatch({ type: 'SET_PAGE', p: 'species' });
//               }}
//               className="sidebar-link"
//               style={{
//                 background: state.selectedCategory?.id === cat.id && state.selectedSubcat === 'all'
//                   ? 'rgba(82,201,123,.12)'
//                   : 'transparent',
//                 borderLeft: state.selectedCategory?.id === cat.id
//                   ? '3px solid #52c97b'
//                   : '3px solid transparent',
//                 color: state.selectedCategory?.id === cat.id ? '#52c97b' : 'var(--text2)',
//                 fontWeight: state.selectedCategory?.id === cat.id ? 600 : 400,
//               }}
//             >
//               <span>{cat.name}</span>
//               <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
//                 {cat.count || 0}
//               </span>
//             </button>

//             {/* Loading state */}
//             {state.selectedCategory?.id === cat.id && cat.taxonomyLoading && (
//               <div style={{ padding: '0.5rem 1rem', color: 'var(--text3)', fontSize: '.75rem' }}>
//                 Loading...
//               </div>
//             )}

//             {/* Taxonomy tree — nested structure */}
//             {state.selectedCategory?.id === cat.id && cat.taxonomyTree && (
//               <div className="sidebar-subcats">
//                 {(cat.taxonomyTree.children || []).map(child => (
//                   <TaxonNode
//                     key={child.category}
//                     node={child}
//                     depth={0}
//                     cat={cat}
//                     ancestorPath={[]}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Flat subcategories — old object structure fallback */}
//             {state.selectedCategory?.id === cat.id &&
//               !cat.taxonomyTree &&
//               cat.subcategories &&
//               typeof cat.subcategories === 'object' &&
//               !Array.isArray(cat.subcategories) && (
//               <div className="sidebar-subcats">
//                 {Object.keys(cat.subcategories).map(sub => {
//                   const species    = cat.subcategories[sub] || [];
//                   const isExpanded = state.selectedSubcat === sub;

//                   return (
//                     <div key={sub}>
//                       <button
//                         onClick={() => {
//                           dispatch({ type: 'SEL_SUBCAT', v: sub });
//                           dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                           dispatch({ type: 'SET_PAGE', p: 'species' });
//                         }}
//                         className="sidebar-sublink"
//                         style={{
//                           background: isExpanded ? 'rgba(82,201,123,.08)' : 'transparent',
//                           color: isExpanded ? '#52c97b' : 'var(--text3)',
//                           fontWeight: isExpanded ? 600 : 400,
//                         }}
//                       >
//                         <span style={{
//                           width: 4, height: 4, borderRadius: '50%',
//                           background: isExpanded ? '#52c97b' : 'var(--border)',
//                           display: 'inline-block', flexShrink: 0,
//                         }} />
//                         <span style={{ flex: 1 }}>{sub}</span>
//                         <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>
//                           {species.length}
//                         </span>
//                       </button>

//                       {/* Species under selected subcategory */}
//                       {isExpanded && species.length > 0 && (
//                         <div style={{
//                           borderLeft: '1px solid var(--border)',
//                           marginLeft: '0.9rem',
//                           paddingLeft: '0.5rem',
//                         }}>
//                           {species.map(sp => (
//                             <button
//                               key={sp.id}
//                               onClick={() => {
//                                 dispatch({ type: 'SEL_SPECIES_FILTER', v: sp });
//                                 dispatch({ type: 'SET_PAGE', p: 'species' });
//                               }}
//                               className="sidebar-sublink"
//                               style={{
//                                 paddingLeft: '1.4rem',
//                                 background: state.selectedSpeciesFilter?.id === sp.id
//                                   ? 'rgba(82,201,123,.08)'
//                                   : 'transparent',
//                                 color: state.selectedSpeciesFilter?.id === sp.id
//                                   ? '#52c97b'
//                                   : 'var(--text3)',
//                                 fontSize: '.75rem',
//                               }}
//                             >
//                               <span style={{ fontSize: '.5rem' }}>🦋</span>
//                               <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                                 {sp.name}
//                               </span>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>

//       <div className="sidebar-footer">
//         <div className="sidebar-divider"></div>
//         <button className="sidebar-link">Settings ⚙️</button>
//         <button className="sidebar-link">Help ❓</button>
//       </div>
//     </aside>
//   );
// }


import { useState } from 'react';
import { useApp } from '../../context/AppContext';

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** A leaf is a species / subspecies: has no further expandable children */
function isLeafNode(node) {
  return (
    node.type === 'files' ||
    (Array.isArray(node.files) && node.files.length > 0) ||
    !Array.isArray(node.children) ||
    node.children.length === 0
  );
}

function formatLabel(category = '') {
  return category.replace(/_/g, ' ');
}

// Per-depth visual config: indent (rem), font-size
const DEPTH_CONFIG = [
  { indent: 0.75, fs: '0.88rem' },   // 0 – genus
  { indent: 1.80, fs: '0.84rem' },   // 1 – species
  { indent: 2.85, fs: '0.80rem' },   // 2 – subspecies
  { indent: 3.70, fs: '0.76rem' },   // 3+
];
const dc = (depth) => DEPTH_CONFIG[Math.min(depth, DEPTH_CONFIG.length - 1)];

// ─── Recursive tree node ───────────────────────────────────────────────────────

function TaxonNode({ node, depth, cat, ancestorPath }) {
  const { state, dispatch } = useApp();

  // Leaves start collapsed; top-level genus nodes start expanded
  const [expanded, setExpanded] = useState(depth === 0);

  const label  = formatLabel(node.category);
  const isLeaf = isLeafNode(node);

  // Build the full breadcrumb path up to this node
  const fullPath = [...ancestorPath, { category: node.category, label }];

  // ── Active-state logic ────────────────────────────────────────────────────
  const activePath   = state.selectedSubcatPath || [];
  const inActivePath = activePath.some(c => c.category === node.category);

  // A leaf is "fully active" when the species filter is set to it
  const isActiveLeaf = !!state.selectedSpeciesFilter?.path?.includes(node.category);

  // A non-leaf is "fully active" when it's the current subcat AND no species filter overrides it
  const isActiveNonLeaf = state.selectedSubcat === node.category && !state.selectedSpeciesFilter;

  const isFullyActive  = isActiveLeaf || isActiveNonLeaf;
  const isAncestorHit  = inActivePath && !isFullyActive;

  // ── Colours ───────────────────────────────────────────────────────────────
  const color  = isFullyActive ? '#52c97b' : isAncestorHit ? '#3a9960' : 'var(--text3)';
  const bgColor = isFullyActive
    ? 'rgba(82,201,123,.13)'
    : isAncestorHit
    ? 'rgba(82,201,123,.05)'
    : 'transparent';
  const leftBorder = isFullyActive
    ? '2px solid rgba(82,201,123,.6)'
    : '2px solid transparent';

  // ── Click handler ─────────────────────────────────────────────────────────
  const handleClick = () => {
    // Make sure the right top-level family is selected
    if (state.selectedCategory?.id !== cat.id) {
      dispatch({ type: 'SEL_CAT', v: cat });
    }
    dispatch({ type: 'SET_PAGE', p: 'species' });

    if (isLeaf) {
      // Try to resolve the matching species object so SpeciesPage can show it
      const allSpecies =
        typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)
          ? Object.values(cat.subcategories).flat()
          : cat.species || [];

      const matches = allSpecies.filter(s => Array.isArray(s.path) && s.path.includes(node.category));

      // Always push the full path so breadcrumbs stay correct
      dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });

      if (matches.length === 1) {
        // Exactly one species → select it directly
        dispatch({ type: 'SEL_SPECIES_FILTER', v: matches[0] });
      } else {
        // Zero or multiple matches → clear filter, let path-based grid show all
        dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
      }
    } else {
      // Non-leaf: toggle expand + navigate
      setExpanded(e => !e);
      dispatch({ type: 'SEL_SUBCAT_PATH', category: node.category, path: fullPath });
      // Clear any previous species filter so the grid shows all children
      dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
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
          /* mirror the app's sidebar-sublink reset so hover still works */
          fontFamily: 'inherit',
        }}
      >
        {/* Expand / leaf indicator */}
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

        {/* Label */}
        <span style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontStyle: isLeaf ? 'italic' : 'normal',
        }}>
          {label}
        </span>

        {/* Count badge (non-leaf, depth 0 only to avoid clutter) */}
        {!isLeaf && depth === 0 && node.count > 0 && (
          <span style={{
            flexShrink: 0,
            fontSize: '0.6rem',
            color: 'var(--text3)',
            background: 'var(--bg3)',
            padding: '0.1rem 0.35rem',
            borderRadius: 4,
          }}>
            {node.count}
          </span>
        )}
      </button>

      {/* Children */}
      {!isLeaf && expanded && Array.isArray(node.children) && node.children.length > 0 && (
        <div style={{
          borderLeft: `1px solid ${isFullyActive || isAncestorHit ? 'rgba(82,201,123,.22)' : 'var(--border)'}`,
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

// ─── Flat-subcategory species list (fallback when no taxonomyTree) ─────────────

function FlatSubcatList({ cat }) {
  const { state, dispatch } = useApp();

  return (
    <div className="sidebar-subcats">
      {Object.entries(cat.subcategories).map(([sub, species]) => {
        const isOpen = state.selectedSubcat === sub;

        return (
          <div key={sub}>
            {/* Subcategory row */}
            <button
              onClick={() => {
                dispatch({ type: 'SEL_SUBCAT', v: sub });
                dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                dispatch({ type: 'SET_PAGE', p: 'species' });
              }}
              className="sidebar-sublink"
              style={{
                background: isOpen ? 'rgba(82,201,123,.08)' : 'transparent',
                color:      isOpen ? '#52c97b' : 'var(--text3)',
                fontWeight: isOpen ? 600 : 400,
              }}
            >
              <span style={{
                width: 4, height: 4, borderRadius: '50%',
                background: isOpen ? '#52c97b' : 'var(--border)',
                display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{ flex: 1 }}>{sub}</span>
              <span style={{ fontSize: '.6rem', color: 'var(--text3)', flexShrink: 0 }}>
                {species.length}
              </span>
            </button>

            {/* Species under this subcategory */}
            {isOpen && species.length > 0 && (
              <div style={{
                borderLeft: '1px solid var(--border)',
                marginLeft: '0.9rem',
              }}>
                {species.map(sp => {
                  const isSel = state.selectedSpeciesFilter?.id === sp.id;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => {
                        dispatch({ type: 'SEL_SPECIES_FILTER', v: isSel ? null : sp });
                        dispatch({ type: 'SET_PAGE', p: 'species' });
                      }}
                      className="sidebar-sublink"
                      style={{
                        paddingLeft: '1.4rem',
                        background: isSel ? 'rgba(82,201,123,.08)' : 'transparent',
                        color:      isSel ? '#52c97b' : 'var(--text3)',
                        borderLeft: isSel ? '2px solid rgba(82,201,123,.5)' : '2px solid transparent',
                        fontSize: '.75rem',
                      }}
                    >
                      <span style={{ fontSize: '.5rem', flexShrink: 0 }}>◆</span>
                      <span style={{
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontStyle: 'italic',
                      }}>
                        {sp.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { state, dispatch } = useApp();

  return (
    <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
      {/* Header */}
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
        {/* ── All Families ── */}
        <button
          onClick={() => {
            dispatch({ type: 'SEL_CAT',            v: null });
            dispatch({ type: 'SEL_SUBCAT',          v: 'all' });
            dispatch({ type: 'SEL_SPECIES_FILTER',  v: null });
            dispatch({ type: 'SET_PAGE',            p: 'species' });
          }}
          className="sidebar-link"
          style={{
            background:  !state.selectedCategory ? 'rgba(82,201,123,.12)' : 'transparent',
            borderLeft:  !state.selectedCategory ? '3px solid #52c97b' : '3px solid transparent',
            color:       !state.selectedCategory ? '#52c97b' : 'var(--text2)',
            fontWeight:  !state.selectedCategory ? 600 : 400,
          }}
        >
          All Families
        </button>

        {/* ── One block per family ── */}
        {state.categories.map(cat => {
          const isActive = state.selectedCategory?.id === cat.id;

          return (
            <div key={cat.id} className="sidebar-family">
              {/* Family heading row */}
              <button
                onClick={() => {
                  dispatch({ type: 'SEL_CAT',           v: cat });
                  dispatch({ type: 'SEL_SUBCAT',         v: 'all' });
                  dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                  dispatch({ type: 'SET_PAGE',           p: 'species' });
                }}
                className="sidebar-link"
                style={{
                  background: isActive && state.selectedSubcat === 'all' && !state.selectedSpeciesFilter
                    ? 'rgba(82,201,123,.12)'
                    : 'transparent',
                  borderLeft: isActive ? '3px solid #52c97b' : '3px solid transparent',
                  color:      isActive ? '#52c97b' : 'var(--text2)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '.7rem', color: 'var(--text3)', marginLeft: 'auto' }}>
                  {cat.count || 0}
                </span>
              </button>

              {/* Loading spinner */}
              {isActive && cat.taxonomyLoading && (
                <div style={{
                  padding: '0.5rem 1.2rem',
                  color: 'var(--text3)',
                  fontSize: '.73rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                  Loading taxonomy…
                </div>
              )}

              {/* ── Taxonomy tree from API ── */}
              {isActive && cat.taxonomyTree && !cat.taxonomyLoading && (
                <div className="sidebar-subcats" style={{ paddingBottom: '0.5rem' }}>
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

              {/* ── Flat fallback (old object-based subcategories) ── */}
              {isActive && !cat.taxonomyTree && !cat.taxonomyLoading &&
                cat.subcategories &&
                typeof cat.subcategories === 'object' &&
                !Array.isArray(cat.subcategories) && (
                <FlatSubcatList cat={cat} />
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <button className="sidebar-link">Settings ⚙️</button>
        <button className="sidebar-link">Help ❓</button>
      </div>
    </aside>
  );
}