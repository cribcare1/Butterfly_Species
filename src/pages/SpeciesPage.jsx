


// import { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import Loader from '../components/shared/Loader';
// import IndiaMap from '../components/map/IndiaMap';

// function CloseBtn({ onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         position: 'absolute', top: '1rem', right: '1rem',
//         background: 'rgba(255,255,255,.08)', border: '1px solid var(--border)',
//         color: 'var(--text2)', fontSize: '1.1rem',
//         width: 32, height: 32, borderRadius: '50%',
//         cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//         lineHeight: 1,
//       }}
//       aria-label="Close"
//     >
//       ✕
//     </button>
//   );
// }

// function SpeciesDetailPanel({ species, images, imagesLoading, imagesError, onClose }) {
//   return (
//     <div style={{
//       position: 'fixed', top: 0, right: 0, bottom: 0, width: '480px',
//       maxWidth: '95vw', background: 'var(--bg2, #111)',
//       borderLeft: '1px solid var(--border)', zIndex: 200,
//       display: 'flex', flexDirection: 'column', overflowY: 'auto',
//       boxShadow: '-8px 0 40px rgba(0,0,0,.45)',
//       animation: 'slideInRight .28s cubic-bezier(.4,0,.2,1)',
//     }}>
//       <div style={{
//         padding: '1.5rem 1.5rem 1rem',
//         borderBottom: '1px solid var(--border)',
//         position: 'sticky', top: 0,
//         background: 'var(--bg2, #111)', zIndex: 1,
//       }}>
//         <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem' }}>
//           <div>
//             <h2 style={{ fontSize: '1.35rem', color: 'var(--text)', marginBottom: '.2rem', fontFamily: 'var(--ff)' }}>
//               {species.name}
//             </h2>
//             <p style={{ fontSize: '.8rem', color: 'var(--text3)', fontStyle: 'italic' }}>{species.scientific}</p>
//           </div>
//           <button
//             style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', borderRadius: 8, padding: '.3rem .7rem', cursor: 'pointer', fontSize: '.8rem', flexShrink: 0 }}
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>

//       <div style={{ flex: 1, overflowY: 'auto' }}>
//         <div style={{ margin: '0 1.5rem 1rem', background: 'var(--bg3, #1a1a1a)', borderRadius: 10, border: '1px solid var(--border)', padding: '1rem' }}>
//           <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65 }}>{species.description}</p>
//         </div>

//         {species.status && (
//           <div style={{ margin: '0 1.5rem 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
//             <div style={{ background: 'var(--bg3, #1a1a1a)', borderRadius: 8, border: '1px solid var(--border)', padding: '.75rem' }}>
//               <span style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>Status</span>
//               <span style={{ display: 'block', fontSize: '.85rem', color: '#52c97b', fontWeight: 600, marginTop: '.3rem' }}>{species.status}</span>
//             </div>
//             {species.region && (
//               <div style={{ background: 'var(--bg3, #1a1a1a)', borderRadius: 8, border: '1px solid var(--border)', padding: '.75rem' }}>
//                 <span style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>Region</span>
//                 <span style={{ display: 'block', fontSize: '.85rem', color: 'var(--text)', fontWeight: 600, marginTop: '.3rem' }}>{species.region}</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function SpeciesCard({ s, isSelected, onClick }) {
//   return (
//     <div
//       className="card fu"
//       style={{ padding: 0, cursor: 'pointer', overflow: 'hidden', outline: isSelected ? '2px solid #52c97b' : 'none' }}
//       onClick={onClick}
//     >
//       <div style={{ width: '100%', height: 160, background: `${s.color}14`, position: 'relative', overflow: 'hidden' }}>
//         {s.imageUrl && s.imageUrl.trim() !== '' ? (
//           <img
//             src={s.imageUrl}
//             alt={s.name}
//             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//             onError={(e) => {
//               e.target.style.display = 'none';
//               if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
//             }}
//           />
//         ) : null}
//         <div style={{
//           display: (s.imageUrl && s.imageUrl.trim() !== '') ? 'none' : 'flex',
//           position: 'absolute', inset: 0,
//           alignItems: 'center', justifyContent: 'center',
//           fontSize: '3rem', background: `${s.color}14`,
//         }}>🦋</div>
//         {s.status && (
//           <div style={{ position: 'absolute', top: 8, right: 8, display: 'inline-block', padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600, background: 'rgba(82,201,123,.15)', color: '#52c97b', border: '1px solid rgba(82,201,123,.4)' }}>
//             {s.status}
//           </div>
//         )}
//       </div>

//       <div style={{ padding: '1rem' }}>
//         <div style={{ fontFamily: 'var(--ff)', fontSize: '1.05rem', color: 'var(--text)', marginBottom: '.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//           {s.name}
//         </div>
//         <div style={{ fontSize: '.73rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '.6rem' }}>
//           {s.scientific}
//         </div>
//         <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.75rem' }}>
//           {s.description.substring(0, 100)}…
//         </p>
//         <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
//           {s.region      && <span className="tag t-blue"   style={{ fontSize: '.66rem' }}>{s.region}</span>}
//           {s.subcategory && <span className="tag t-purple" style={{ fontSize: '.66rem' }}>{s.subcategory}</span>}
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '.75rem', borderTop: '1px solid var(--border)' }}>
//           <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>🪶 {s.wingspan}</span>
//           <button className="btn-sm" onClick={e => { e.stopPropagation(); onClick(); }}>
//             Photos & details →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FamiliesLoader({ loaded, total }) {
//   const families = [
//     { name: 'Papilionidae', color: '#f59e0b' },
//     { name: 'Nymphalidae',  color: '#8b5cf6' },
//     { name: 'Pieridae',     color: '#eab308' },
//     { name: 'Lycaenidae',   color: '#60a5fa' },
//     { name: 'Hesperiidae',  color: '#f97316' },
//     { name: 'Riodinidae',   color: '#34d399' },
//   ];

//   return (
//     <div style={{ padding: '2rem 0' }}>
//       <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
//         <Loader />
//         <p style={{ marginTop: '1rem', color: 'var(--text2)', fontFamily: 'var(--ff)', fontSize: '1.1rem', fontStyle: 'italic' }}>
//           Loading butterfly families…
//         </p>
//         <p style={{ marginTop: '.35rem', color: 'var(--text3)', fontSize: '.8rem' }}>
//           {loaded} of {total} families ready
//         </p>
//         <div style={{ margin: '1rem auto 0', width: '260px', height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
//           <div style={{ height: '100%', width: `${(loaded / total) * 100}%`, background: 'linear-gradient(90deg, #52c97b, #34d399)', borderRadius: '2px', transition: 'width .4s ease' }} />
//         </div>
//       </div>

//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
//         {families.map((fam, i) => {
//           const done = i < loaded;
//           return (
//             <div
//               key={fam.name}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: '.5rem',
//                 padding: '.45rem 1rem', borderRadius: '50px',
//                 background: done ? `${fam.color}18` : 'var(--bg3)',
//                 border: `1px solid ${done ? fam.color + '55' : 'var(--border)'}`,
//                 transition: 'all .4s ease',
//               }}
//             >
//               <span style={{ fontSize: '.8rem' }}>{done ? '✓' : '·'}</span>
//               <span style={{ fontSize: '.8rem', color: done ? fam.color : 'var(--text3)', fontFamily: 'var(--fb)', fontStyle: 'italic', transition: 'color .4s ease' }}>
//                 {fam.name}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <div className="g3">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', opacity: 0.45, animationDelay: `${i * 0.08}s` }}>
//             <div style={{ width: '100%', height: 160, background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
//               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.04) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <div style={{ height: 16, width: '65%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.5rem' }} />
//               <div style={{ height: 12, width: '45%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.75rem' }} />
//               <div style={{ height: 10, width: '90%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.4rem' }} />
//               <div style={{ height: 10, width: '75%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.4rem' }} />
//               <div style={{ height: 10, width: '55%', background: 'var(--bg3)', borderRadius: 6 }} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function SpeciesPage() {
//   const { state, dispatch, filteredSpecies } = useApp();
//   const [view, setView]             = useState('grid');
//   const [lightbox, setLightbox]     = useState(null);
//   const [filterOpen, setFilterOpen] = useState(false);

//   const cats    = state.categories;
//   const selCat  = state.selectedCategory;
//   const selSpec = state.selectedSpecies;

//   const isLoading   = state.familiesLoadingCount > 0;
//   const loadedCount = 6 - state.familiesLoadingCount;

//   // ── Resolve species pool ───────────────────────────────────────────────────
//   // Species can live in `cat.species` (flat array) OR
//   // `cat.subcategories` (object whose values are species arrays). Check both.
//   const resolveCatSpecies = (cat) => {
//     if (!cat) return [];
//     if (Array.isArray(cat.species) && cat.species.length > 0) return cat.species;
//     if (typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories)) {
//       return Object.values(cat.subcategories).flat();
//     }
//     return [];
//   };

//   const allCatSpecies = resolveCatSpecies(selCat);

//   const displaySpecies = state.selectedSpeciesFilter
//     ? [state.selectedSpeciesFilter]
//     : selCat
//     ? allCatSpecies.filter(s => {
//         if (state.selectedSubcat === 'all') return true;
//         if (Array.isArray(s.path)) return s.path.includes(state.selectedSubcat);
//         return s.subcategory === state.selectedSubcat;
//       })
//     : state.search && state.search.length >= 2
//     ? filteredSpecies
//     : cats.flatMap(c => resolveCatSpecies(c));

//   return (
//     <div style={{ padding: '7rem 0 4rem 0', maxWidth: '100%' }}>

//       <div style={{ marginBottom: '2.5rem' }}>
//         <div className="sec-eye">Living Winged Jewels</div>
//         <h1 className="sec-h">Species <em>Database</em></h1>
//       </div>

//       {/* Toolbar */}
//       <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>

//         {/* Breadcrumb */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--text2)', flexWrap: 'wrap' }}>

//           <span
//             style={{ cursor: selCat || state.selectedSpeciesFilter ? 'pointer' : 'default', color: !selCat && !state.selectedSpeciesFilter ? '#52c97b' : 'var(--text3)' }}
//             onClick={() => {
//               dispatch({ type: 'SEL_CAT', v: null });
//               dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             }}
//           >
//             All Families
//           </span>

//           {selCat && (
//             <>
//               <span style={{ color: 'var(--text3)' }}>›</span>
//               <span
//                 style={{
//                   color: (state.selectedSubcatPath && state.selectedSubcatPath.length > 0) || state.selectedSpeciesFilter
//                     ? 'var(--text3)' : '#52c97b',
//                   cursor: (state.selectedSubcatPath && state.selectedSubcatPath.length > 0) || state.selectedSpeciesFilter
//                     ? 'pointer' : 'default',
//                 }}
//                 onClick={() => {
//                   dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                   dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 }}
//               >
//                 {selCat.name}
//               </span>
//             </>
//           )}

//           {selCat && (state.selectedSubcatPath || []).map((crumb, i) => {
//             const isLast   = i === state.selectedSubcatPath.length - 1;
//             const isActive = isLast && !state.selectedSpeciesFilter;
//             return (
//               <span key={crumb.category} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
//                 <span style={{ color: 'var(--text3)' }}>›</span>
//                 <span
//                   style={{ color: isActive ? '#52c97b' : 'var(--text3)', cursor: !isActive ? 'pointer' : 'default' }}
//                   onClick={() => {
//                     if (!isActive) {
//                       const slicedPath = state.selectedSubcatPath.slice(0, i + 1);
//                       dispatch({ type: 'SEL_SUBCAT_PATH', category: crumb.category, path: slicedPath });
//                       dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                     }
//                   }}
//                 >
//                   {crumb.label}
//                 </span>
//               </span>
//             );
//           })}

//           {state.selectedSpeciesFilter && (
//             <>
//               <span style={{ color: 'var(--text3)' }}>›</span>
//               <span style={{ color: '#52c97b' }}>{state.selectedSpeciesFilter.name}</span>
//             </>
//           )}
//         </div>

//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.4rem' }}>
//           {[['grid', '⊞ Grid'], ['map', '🗺 Map']].map(([v, l]) => (
//             <button
//               key={v}
//               className="btn-sm"
//               style={{ background: view === v ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
//               onClick={() => setView(v)}
//             >
//               {l}
//             </button>
//           ))}
//         </div>

//         <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
//           {isLoading ? 'Loading…' : `${displaySpecies.length} species`}
//         </span>
//       </div>

//       {/* Main content */}
//       {isLoading ? (
//         <FamiliesLoader loaded={loadedCount} total={6} />
//       ) : view === 'map' ? (
//         <IndiaMap sightings={state.sightings} loading={state.sightingsLoading} />
//       ) : (
//         <>
//           <div className="g3">
//             {displaySpecies.map((s) => (
//               <SpeciesCard
//                 key={s.id}
//                 s={s}
//                 isSelected={selSpec?.id === s.id}
//                 onClick={() => dispatch({ type: 'SEL_SPECIES', v: s })}
//               />
//             ))}
//           </div>

//           {displaySpecies.length === 0 && (
//             <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text3)' }}>
//               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
//               <p style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem' }}>No species match your filters.</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Detail panel */}
//       {selSpec && (
//         <>
//           <div
//             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }}
//             onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })}
//           />
//           <SpeciesDetailPanel
//             species={selSpec}
//             images={state.speciesImages}
//             imagesLoading={state.speciesImagesLoading}
//             imagesError={state.speciesImagesError}
//             onClose={() => dispatch({ type: 'SEL_SPECIES', v: null })}
//           />
//         </>
//       )}

//       {/* Gallery lightbox */}
//       {lightbox && (
//         <div
//           style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
//           onClick={() => setLightbox(null)}
//         >
//           <button
//             style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', fontSize: '1.4rem', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//             onClick={() => setLightbox(null)}
//           >✕</button>
//           <img
//             src={lightbox.url}
//             alt={lightbox.caption}
//             style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 8px 64px rgba(0,0,0,.8)', animation: 'fadeIn .2s ease' }}
//             onClick={e => e.stopPropagation()}
//           />
//           {lightbox.caption && (
//             <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,.7)', color: '#ccc', padding: '.5rem 1.2rem', borderRadius: '20px', fontSize: '.75rem', textAlign: 'center', maxWidth: '80vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//               <div style={{ fontWeight: 600, marginBottom: '.2rem' }}>{lightbox.species}</div>
//               {lightbox.caption}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Filter modal */}
//       {filterOpen && (
//         <div className="modal-bg" onClick={() => setFilterOpen(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <CloseBtn onClick={() => setFilterOpen(false)} />
//             <h2 style={{ fontFamily: 'var(--ff)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1rem' }}>Filter Species</h2>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               <button
//                 onClick={() => {
//                   dispatch({ type: 'SEL_CAT', v: null });
//                   dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                   dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                   setFilterOpen(false);
//                 }}
//                 style={{ background: !state.selectedCategory ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)', border: '1px solid var(--border)', color: 'var(--text)', padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--fb)' }}
//               >
//                 All Families
//               </button>
//               {state.categories.map(cat => (
//                 <div key={cat.id}>
//                   <button
//                     onClick={() => {
//                       dispatch({ type: 'SEL_CAT', v: cat });
//                       dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                       dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                       setFilterOpen(false);
//                     }}
//                     style={{ background: state.selectedCategory?.id === cat.id ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)', border: '1px solid var(--border)', color: 'var(--text)', padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--fb)', width: '100%' }}
//                   >
//                     {cat.name} ({cat.count})
//                   </button>
//                   {state.selectedCategory?.id === cat.id &&
//                     cat.subcategories &&
//                     Array.isArray(cat.subcategories) &&
//                     cat.subcategories.map(sub => (
//                       <button
//                         key={sub}
//                         onClick={() => {
//                           dispatch({ type: 'SEL_SUBCAT', v: sub });
//                           dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                           setFilterOpen(false);
//                         }}
//                         style={{ background: state.selectedSubcat === sub ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)', border: '1px solid var(--border)', color: 'var(--text)', padding: '.5rem 2rem', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--fb)', width: '100%', marginTop: '.25rem' }}
//                       >
//                         {sub}
//                       </button>
//                     ))
//                   }
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import Loader from '../components/shared/Loader';
// import IndiaMap from '../components/map/IndiaMap';
// import { wikiImageUrl } from '../utils/appUtils'; // adjust path if needed

// // ─── Image helpers ─────────────────────────────────────────────────────────────

// /** Build a displayable URL from a raw image entry */
// function resolveImageUrl(img, width = 400) {
//   if (!img) return null;
//   if (img.file_url) return wikiImageUrl(img.file_url, width);
//   if (img.img_name)  return wikiImageUrl(img.img_name,  width);
//   if (img.file_name) return wikiImageUrl(img.file_name, width);
//   return null;
// }

// /** Human-readable caption from a raw image entry */
// function resolveCaption(img) {
//   const raw = img.file_name || img.img_name || '';
//   return raw.replace(/_/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '');
// }

// // ─── Lightbox ──────────────────────────────────────────────────────────────────

// function Lightbox({ images, startIndex, speciesName, onClose }) {
//   const [idx, setIdx] = useState(startIndex);
//   const img = images[idx];
//   const url = resolveImageUrl(img, 1200);

//   return (
//     <div
//       style={{
//         position: 'fixed', inset: 0,
//         background: 'rgba(0,0,0,.94)',
//         zIndex: 300,
//         display: 'flex', flexDirection: 'column',
//         alignItems: 'center', justifyContent: 'center',
//         padding: '1.5rem',
//         animation: 'fadeIn .18s ease',
//       }}
//       onClick={onClose}
//     >
//       {/* Close */}
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute', top: '1.2rem', right: '1.2rem',
//           background: 'rgba(255,255,255,.12)', border: 'none',
//           color: '#fff', fontSize: '1.3rem',
//           width: 38, height: 38, borderRadius: '50%',
//           cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}
//       >✕</button>

//       {/* Prev */}
//       {images.length > 1 && (
//         <button
//           onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
//           style={{
//             position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
//             background: 'rgba(255,255,255,.12)', border: 'none',
//             color: '#fff', fontSize: '1.4rem',
//             width: 40, height: 40, borderRadius: '50%',
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >‹</button>
//       )}

//       {/* Image */}
//       <img
//         src={url}
//         alt={speciesName}
//         style={{
//           maxWidth: '88vw', maxHeight: '82vh',
//           borderRadius: 12, objectFit: 'contain',
//           boxShadow: '0 8px 64px rgba(0,0,0,.8)',
//         }}
//         onClick={e => e.stopPropagation()}
//       />

//       {/* Caption */}
//       <div style={{
//         marginTop: '.85rem',
//         background: 'rgba(0,0,0,.6)',
//         color: '#ccc', padding: '.45rem 1.1rem',
//         borderRadius: 20, fontSize: '.73rem',
//         textAlign: 'center', maxWidth: '80vw',
//         overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//       }}>
//         <strong style={{ color: '#fff' }}>{speciesName}</strong>
//         {' · '}
//         {resolveCaption(img)}
//         {images.length > 1 && (
//           <span style={{ color: 'var(--text3)', marginLeft: '0.5rem' }}>
//             {idx + 1} / {images.length}
//           </span>
//         )}
//       </div>

//       {/* Next */}
//       {images.length > 1 && (
//         <button
//           onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
//           style={{
//             position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
//             background: 'rgba(255,255,255,.12)', border: 'none',
//             color: '#fff', fontSize: '1.4rem',
//             width: 40, height: 40, borderRadius: '50%',
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >›</button>
//       )}
//     </div>
//   );
// }

// // ─── Species detail panel ──────────────────────────────────────────────────────

// function SpeciesDetailPanel({ species, onClose }) {
//   const [lightboxIdx, setLightboxIdx] = useState(null);

//   // Images come from the taxonomy tree (_images) or fall back to single imageUrl
//   const rawImages = Array.isArray(species._images) && species._images.length > 0
//     ? species._images
//     : species.imageUrl
//       ? [{ file_url: species.imageUrl }]
//       : [];

//   return (
//     <>
//       <div style={{
//         position: 'fixed', top: 0, right: 0, bottom: 0, width: 500,
//         maxWidth: '95vw', background: 'var(--bg2, #111)',
//         borderLeft: '1px solid var(--border)', zIndex: 200,
//         display: 'flex', flexDirection: 'column',
//         boxShadow: '-8px 0 40px rgba(0,0,0,.45)',
//         animation: 'slideInRight .28s cubic-bezier(.4,0,.2,1)',
//         overflow: 'hidden',
//       }}>

//         {/* ── Header ── */}
//         <div style={{
//           padding: '1.5rem 1.5rem 1rem',
//           borderBottom: '1px solid var(--border)',
//           background: 'var(--bg2, #111)',
//           flexShrink: 0,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
//             <div>
//               <h2 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '.2rem', fontFamily: 'var(--ff)' }}>
//                 {species.name}
//               </h2>
//               <p style={{ fontSize: '.8rem', color: 'var(--text3)', fontStyle: 'italic' }}>
//                 {species.scientific}
//               </p>
//               {species.family && (
//                 <span style={{
//                   display: 'inline-block', marginTop: '.4rem',
//                   fontSize: '.66rem', padding: '.18rem .55rem',
//                   borderRadius: 20, background: 'rgba(82,201,123,.1)',
//                   color: '#52c97b', border: '1px solid rgba(82,201,123,.3)',
//                 }}>
//                   {species.family}
//                 </span>
//               )}
//             </div>
//             <button
//               style={{
//                 background: 'transparent', border: '1px solid var(--border)',
//                 color: 'var(--text2)', borderRadius: 8,
//                 padding: '.3rem .7rem', cursor: 'pointer', fontSize: '.8rem', flexShrink: 0,
//               }}
//               onClick={onClose}
//             >Close</button>
//           </div>
//         </div>

//         {/* ── Scrollable body ── */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>

//           {/* Description */}
//           {species.description && (
//             <div style={{
//               background: 'var(--bg3, #1a1a1a)', borderRadius: 10,
//               border: '1px solid var(--border)', padding: '1rem',
//               marginBottom: '1.25rem',
//             }}>
//               <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
//                 {species.description}
//               </p>
//             </div>
//           )}

//           {/* Meta chips */}
//           {(species.region || species.status || species.subcategory) && (
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1.25rem' }}>
//               {species.status && (
//                 <Chip label="Status" value={species.status} valueColor="#52c97b" />
//               )}
//               {species.region && (
//                 <Chip label="Region" value={species.region} />
//               )}
//               {species.subcategory && (
//                 <Chip label="Subfamily" value={species.subcategory} />
//               )}
//               {species.wingspan && (
//                 <Chip label="Wingspan" value={species.wingspan} />
//               )}
//             </div>
//           )}

//           {/* ── Image gallery ── */}
//           {rawImages.length > 0 && (
//             <div>
//               <div style={{
//                 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                 marginBottom: '.75rem',
//               }}>
//                 <h3 style={{
//                   fontSize: '.72rem', textTransform: 'uppercase',
//                   letterSpacing: '.1em', color: 'var(--text3)', margin: 0,
//                 }}>
//                   Photos
//                 </h3>
//                 <span style={{ fontSize: '.68rem', color: 'var(--text3)' }}>
//                   {rawImages.length} image{rawImages.length !== 1 ? 's' : ''}
//                 </span>
//               </div>

//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: rawImages.length === 1 ? '1fr' : 'repeat(2, 1fr)',
//                 gap: '.5rem',
//               }}>
//                 {rawImages.map((img, i) => {
//                   const url = resolveImageUrl(img, 400);
//                   if (!url) return null;
//                   return (
//                     <div
//                       key={i}
//                       onClick={() => setLightboxIdx(i)}
//                       style={{
//                         borderRadius: 8, overflow: 'hidden',
//                         cursor: 'pointer', position: 'relative',
//                         aspectRatio: rawImages.length === 1 ? '16/9' : '1/1',
//                         background: 'var(--bg3)',
//                         border: '1px solid var(--border)',
//                         transition: 'transform .15s, box-shadow .15s',
//                       }}
//                       onMouseEnter={e => {
//                         e.currentTarget.style.transform = 'scale(1.02)';
//                         e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.5)';
//                       }}
//                       onMouseLeave={e => {
//                         e.currentTarget.style.transform = 'scale(1)';
//                         e.currentTarget.style.boxShadow = 'none';
//                       }}
//                     >
//                       <img
//                         src={url}
//                         alt={resolveCaption(img)}
//                         style={{
//                           width: '100%', height: '100%',
//                           objectFit: 'cover', display: 'block',
//                         }}
//                         onError={e => {
//                           e.target.style.display = 'none';
//                           if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
//                         }}
//                       />
//                       {/* Fallback emoji */}
//                       <div style={{
//                         display: 'none', position: 'absolute', inset: 0,
//                         alignItems: 'center', justifyContent: 'center',
//                         fontSize: '2rem', background: 'var(--bg3)',
//                       }}>🦋</div>

//                       {/* Hover overlay */}
//                       <div style={{
//                         position: 'absolute', inset: 0,
//                         background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)',
//                         opacity: 0,
//                         transition: 'opacity .15s',
//                         display: 'flex', alignItems: 'flex-end', padding: '.4rem .5rem',
//                       }}
//                         onMouseEnter={e => e.currentTarget.style.opacity = '1'}
//                         onMouseLeave={e => e.currentTarget.style.opacity = '0'}
//                       >
//                         <span style={{
//                           fontSize: '.62rem', color: 'rgba(255,255,255,.85)',
//                           overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//                         }}>
//                           {resolveCaption(img)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {rawImages.length === 0 && (
//             <div style={{
//               textAlign: 'center', padding: '2.5rem 1rem',
//               color: 'var(--text3)', fontSize: '.82rem',
//             }}>
//               🦋 No images available yet
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Lightbox */}
//       {lightboxIdx !== null && (
//         <Lightbox
//           images={rawImages}
//           startIndex={lightboxIdx}
//           speciesName={species.name}
//           onClose={() => setLightboxIdx(null)}
//         />
//       )}
//     </>
//   );
// }

// function Chip({ label, value, valueColor }) {
//   return (
//     <div style={{
//       background: 'var(--bg3, #1a1a1a)', borderRadius: 8,
//       border: '1px solid var(--border)', padding: '.65rem .85rem',
//     }}>
//       <span style={{
//         fontSize: '.62rem', textTransform: 'uppercase',
//         letterSpacing: '.08em', color: 'var(--text3)', display: 'block',
//         marginBottom: '.25rem',
//       }}>
//         {label}
//       </span>
//       <span style={{
//         display: 'block', fontSize: '.83rem',
//         color: valueColor || 'var(--text)', fontWeight: 600,
//       }}>
//         {value}
//       </span>
//     </div>
//   );
// }

// // ─── Species card ──────────────────────────────────────────────────────────────

// function SpeciesCard({ s, isSelected, onClick }) {
//   return (
//     <div
//       className="card fu"
//       style={{
//         padding: 0, cursor: 'pointer', overflow: 'hidden',
//         outline: isSelected ? '2px solid #52c97b' : 'none',
//       }}
//       onClick={onClick}
//     >
//       <div style={{ width: '100%', height: 160, background: `${s.color}14`, position: 'relative', overflow: 'hidden' }}>
//         {s.imageUrl ? (
//           <img
//             src={s.imageUrl}
//             alt={s.name}
//             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//             onError={e => {
//               e.target.style.display = 'none';
//               if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
//             }}
//           />
//         ) : null}
//         <div style={{
//           display: s.imageUrl ? 'none' : 'flex',
//           position: 'absolute', inset: 0,
//           alignItems: 'center', justifyContent: 'center',
//           fontSize: '3rem', background: `${s.color}14`,
//         }}>🦋</div>
//         {s.status && (
//           <div style={{
//             position: 'absolute', top: 8, right: 8,
//             padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600,
//             background: 'rgba(82,201,123,.15)', color: '#52c97b',
//             border: '1px solid rgba(82,201,123,.4)',
//           }}>
//             {s.status}
//           </div>
//         )}
//         {/* Image count badge */}
//         {Array.isArray(s._images) && s._images.length > 1 && (
//           <div style={{
//             position: 'absolute', bottom: 8, right: 8,
//             padding: '.15rem .5rem', borderRadius: 12, fontSize: '.62rem',
//             background: 'rgba(0,0,0,.65)', color: '#fff',
//           }}>
//             📷 {s._images.length}
//           </div>
//         )}
//       </div>

//       <div style={{ padding: '1rem' }}>
//         <div style={{
//           fontFamily: 'var(--ff)', fontSize: '1.05rem', color: 'var(--text)',
//           marginBottom: '.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//         }}>
//           {s.name}
//         </div>
//         <div style={{ fontSize: '.73rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '.6rem' }}>
//           {s.scientific}
//         </div>
//         <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.75rem' }}>
//           {(s.description || '').substring(0, 100)}…
//         </p>
//         <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
//           {s.region      && <span className="tag t-blue"   style={{ fontSize: '.66rem' }}>{s.region}</span>}
//           {s.subcategory && <span className="tag t-purple" style={{ fontSize: '.66rem' }}>{s.subcategory}</span>}
//         </div>
//         <div style={{
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           paddingTop: '.75rem', borderTop: '1px solid var(--border)',
//         }}>
//           <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>🪶 {s.wingspan}</span>
//           <button className="btn-sm" onClick={e => { e.stopPropagation(); onClick(); }}>
//             Photos & details →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Families loading skeleton ─────────────────────────────────────────────────

// function FamiliesLoader({ loaded, total }) {
//   const families = [
//     { name: 'Papilionidae', color: '#f59e0b' },
//     { name: 'Nymphalidae',  color: '#8b5cf6' },
//     { name: 'Pieridae',     color: '#eab308' },
//     { name: 'Lycaenidae',   color: '#60a5fa' },
//     { name: 'Hesperiidae',  color: '#f97316' },
//     { name: 'Riodinidae',   color: '#34d399' },
//   ];
//   return (
//     <div style={{ padding: '2rem 0' }}>
//       <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
//         <Loader />
//         <p style={{ marginTop: '1rem', color: 'var(--text2)', fontFamily: 'var(--ff)', fontSize: '1.1rem', fontStyle: 'italic' }}>
//           Loading butterfly families…
//         </p>
//         <p style={{ marginTop: '.35rem', color: 'var(--text3)', fontSize: '.8rem' }}>
//           {loaded} of {total} families ready
//         </p>
//         <div style={{ margin: '1rem auto 0', width: 260, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
//           <div style={{
//             height: '100%', width: `${(loaded / total) * 100}%`,
//             background: 'linear-gradient(90deg, #52c97b, #34d399)',
//             borderRadius: 2, transition: 'width .4s ease',
//           }} />
//         </div>
//       </div>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
//         {families.map((fam, i) => {
//           const done = i < loaded;
//           return (
//             <div key={fam.name} style={{
//               display: 'flex', alignItems: 'center', gap: '.5rem',
//               padding: '.45rem 1rem', borderRadius: 50,
//               background: done ? `${fam.color}18` : 'var(--bg3)',
//               border: `1px solid ${done ? fam.color + '55' : 'var(--border)'}`,
//               transition: 'all .4s ease',
//             }}>
//               <span style={{ fontSize: '.8rem' }}>{done ? '✓' : '·'}</span>
//               <span style={{ fontSize: '.8rem', color: done ? fam.color : 'var(--text3)', fontFamily: 'var(--fb)', fontStyle: 'italic' }}>
//                 {fam.name}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//       <div className="g3">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', opacity: 0.45 }}>
//             <div style={{ width: '100%', height: 160, background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
//               <div style={{
//                 position: 'absolute', inset: 0,
//                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.04), transparent)',
//                 backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite',
//               }} />
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <div style={{ height: 16, width: '65%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.5rem' }} />
//               <div style={{ height: 12, width: '45%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.75rem' }} />
//               <div style={{ height: 10, width: '90%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.4rem' }} />
//               <div style={{ height: 10, width: '55%', background: 'var(--bg3)', borderRadius: 6 }} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Species page ──────────────────────────────────────────────────────────────

// export default function SpeciesPage() {
//   const { state, dispatch, filteredSpecies } = useApp();
//   const [view, setView]         = useState('grid');
//   const [filterOpen, setFilterOpen] = useState(false);

//   const cats    = state.categories;
//   const selCat  = state.selectedCategory;
//   const selSpec = state.selectedSpecies;

//   const isLoading   = state.familiesLoadingCount > 0;
//   const loadedCount = 6 - state.familiesLoadingCount;

//   const resolveCatSpecies = (cat) => {
//     if (!cat) return [];
//     if (Array.isArray(cat.species) && cat.species.length > 0) return cat.species;
//     if (typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories))
//       return Object.values(cat.subcategories).flat();
//     return [];
//   };

//   const allCatSpecies = resolveCatSpecies(selCat);

//   const displaySpecies = state.selectedSpeciesFilter
//     ? [state.selectedSpeciesFilter]
//     : selCat
//     ? allCatSpecies.filter(s => {
//         if (state.selectedSubcat === 'all') return true;
//         if (Array.isArray(s.path)) return s.path.includes(state.selectedSubcat);
//         return s.subcategory === state.selectedSubcat;
//       })
//     : state.search && state.search.length >= 2
//     ? filteredSpecies
//     : cats.flatMap(c => resolveCatSpecies(c));

//   return (
//     <div style={{ padding: '7rem 0 4rem 0', maxWidth: '100%' }}>

//       <div style={{ marginBottom: '2.5rem' }}>
//         <div className="sec-eye">Living Winged Jewels</div>
//         <h1 className="sec-h">Species <em>Database</em></h1>
//       </div>

//       {/* Toolbar */}
//       <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>

//         {/* Breadcrumb */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--text2)', flexWrap: 'wrap' }}>
//           <span
//             style={{
//               cursor: selCat || state.selectedSpeciesFilter ? 'pointer' : 'default',
//               color: !selCat && !state.selectedSpeciesFilter ? '#52c97b' : 'var(--text3)',
//             }}
//             onClick={() => {
//               dispatch({ type: 'SEL_CAT', v: null });
//               dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             }}
//           >
//             All Families
//           </span>

//           {selCat && (
//             <>
//               <span style={{ color: 'var(--text3)' }}>›</span>
//               <span
//                 style={{
//                   color: (state.selectedSubcatPath?.length > 0) || state.selectedSpeciesFilter
//                     ? 'var(--text3)' : '#52c97b',
//                   cursor: (state.selectedSubcatPath?.length > 0) || state.selectedSpeciesFilter
//                     ? 'pointer' : 'default',
//                 }}
//                 onClick={() => {
//                   dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                   dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 }}
//               >
//                 {selCat.name}
//               </span>
//             </>
//           )}

//           {selCat && (state.selectedSubcatPath || []).map((crumb, i) => {
//             const isLast   = i === state.selectedSubcatPath.length - 1;
//             const isActive = isLast && !state.selectedSpeciesFilter;
//             return (
//               <span key={crumb.category} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
//                 <span style={{ color: 'var(--text3)' }}>›</span>
//                 <span
//                   style={{ color: isActive ? '#52c97b' : 'var(--text3)', cursor: !isActive ? 'pointer' : 'default' }}
//                   onClick={() => {
//                     if (!isActive) {
//                       dispatch({ type: 'SEL_SUBCAT_PATH', category: crumb.category, path: state.selectedSubcatPath.slice(0, i + 1) });
//                       dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                     }
//                   }}
//                 >
//                   {crumb.label}
//                 </span>
//               </span>
//             );
//           })}

//           {state.selectedSpeciesFilter && (
//             <>
//               <span style={{ color: 'var(--text3)' }}>›</span>
//               <span style={{ color: '#52c97b' }}>{state.selectedSpeciesFilter.name}</span>
//             </>
//           )}
//         </div>

//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.4rem' }}>
//           {[['grid', '⊞ Grid'], ['map', '🗺 Map']].map(([v, l]) => (
//             <button
//               key={v}
//               className="btn-sm"
//               style={{ background: view === v ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
//               onClick={() => setView(v)}
//             >
//               {l}
//             </button>
//           ))}
//         </div>

//         <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
//           {isLoading ? 'Loading…' : `${displaySpecies.length} species`}
//         </span>
//       </div>

//       {/* Main content */}
//       {isLoading ? (
//         <FamiliesLoader loaded={loadedCount} total={6} />
//       ) : view === 'map' ? (
//         <IndiaMap sightings={state.sightings} loading={state.sightingsLoading} />
//       ) : (
//         <>
//           <div className="g3">
//             {displaySpecies.map(s => (
//               <SpeciesCard
//                 key={s.id}
//                 s={s}
//                 isSelected={selSpec?.id === s.id}
//                 onClick={() => dispatch({ type: 'SEL_SPECIES', v: s })}
//               />
//             ))}
//           </div>
//           {displaySpecies.length === 0 && (
//             <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text3)' }}>
//               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
//               <p style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem' }}>No species match your filters.</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Detail panel */}
//       {selSpec && (
//         <>
//           <div
//             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }}
//             onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })}
//           />
//           <SpeciesDetailPanel
//             species={selSpec}
//             onClose={() => dispatch({ type: 'SEL_SPECIES', v: null })}
//           />
//         </>
//       )}

//       {/* Filter modal */}
//       {filterOpen && (
//         <div className="modal-bg" onClick={() => setFilterOpen(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <button
//               onClick={() => setFilterOpen(false)}
//               style={{
//                 position: 'absolute', top: '1rem', right: '1rem',
//                 background: 'rgba(255,255,255,.08)', border: '1px solid var(--border)',
//                 color: 'var(--text2)', fontSize: '1.1rem',
//                 width: 32, height: 32, borderRadius: '50%',
//                 cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}
//             >✕</button>
//             <h2 style={{ fontFamily: 'var(--ff)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1rem' }}>Filter Species</h2>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               <button
//                 onClick={() => {
//                   dispatch({ type: 'SEL_CAT', v: null });
//                   dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                   dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                   setFilterOpen(false);
//                 }}
//                 style={{
//                   background: !state.selectedCategory ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
//                   border: '1px solid var(--border)', color: 'var(--text)',
//                   padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer',
//                   textAlign: 'left', fontFamily: 'var(--fb)',
//                 }}
//               >All Families</button>
//               {state.categories.map(cat => (
//                 <div key={cat.id}>
//                   <button
//                     onClick={() => {
//                       dispatch({ type: 'SEL_CAT', v: cat });
//                       dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                       dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                       setFilterOpen(false);
//                     }}
//                     style={{
//                       background: state.selectedCategory?.id === cat.id ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
//                       border: '1px solid var(--border)', color: 'var(--text)',
//                       padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer',
//                       textAlign: 'left', fontFamily: 'var(--fb)', width: '100%',
//                     }}
//                   >
//                     {cat.name} ({cat.count})
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import Loader from '../components/shared/Loader';
// import IndiaMap from '../components/map/IndiaMap';
// import { wikiImageUrl } from '../utils/appUtils'; // adjust path if needed

// // ─── Image helpers ─────────────────────────────────────────────────────────────

// /** Build a displayable URL from a raw image entry */
// function resolveImageUrl(img, width = 400) {
//   if (!img) return null;
//   if (img.file_url) return wikiImageUrl(img.file_url, width);
//   if (img.img_name)  return wikiImageUrl(img.img_name,  width);
//   if (img.file_name) return wikiImageUrl(img.file_name, width);
//   return null;
// }

// /** Human-readable caption from a raw image entry */
// function resolveCaption(img) {
//   const raw = img.file_name || img.img_name || '';
//   return raw.replace(/_/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '');
// }

// // ─── Lightbox ──────────────────────────────────────────────────────────────────

// function Lightbox({ images, startIndex, speciesName, onClose }) {
//   const [idx, setIdx] = useState(startIndex);
//   const img = images[idx];
//   const url = resolveImageUrl(img, 1200);

//   return (
//     <div
//       style={{
//         position: 'fixed', inset: 0,
//         background: 'rgba(0,0,0,.94)',
//         zIndex: 300,
//         display: 'flex', flexDirection: 'column',
//         alignItems: 'center', justifyContent: 'center',
//         padding: '1.5rem',
//         animation: 'fadeIn .18s ease',
//       }}
//       onClick={onClose}
//     >
//       {/* Close */}
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute', top: '1.2rem', right: '1.2rem',
//           background: 'rgba(255,255,255,.12)', border: 'none',
//           color: '#fff', fontSize: '1.3rem',
//           width: 38, height: 38, borderRadius: '50%',
//           cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}
//       >✕</button>

//       {/* Prev */}
//       {images.length > 1 && (
//         <button
//           onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
//           style={{
//             position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
//             background: 'rgba(255,255,255,.12)', border: 'none',
//             color: '#fff', fontSize: '1.4rem',
//             width: 40, height: 40, borderRadius: '50%',
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >‹</button>
//       )}

//       {/* Image */}
//       <img
//         src={url}
//         alt={speciesName}
//         style={{
//           maxWidth: '88vw', maxHeight: '82vh',
//           borderRadius: 12, objectFit: 'contain',
//           boxShadow: '0 8px 64px rgba(0,0,0,.8)',
//         }}
//         onClick={e => e.stopPropagation()}
//       />

//       {/* Caption */}
//       <div style={{
//         marginTop: '.85rem',
//         background: 'rgba(0,0,0,.6)',
//         color: '#ccc', padding: '.45rem 1.1rem',
//         borderRadius: 20, fontSize: '.73rem',
//         textAlign: 'center', maxWidth: '80vw',
//         overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//       }}>
//         <strong style={{ color: '#fff' }}>{speciesName}</strong>
//         {' · '}
//         {resolveCaption(img)}
//         {images.length > 1 && (
//           <span style={{ color: 'var(--text3)', marginLeft: '0.5rem' }}>
//             {idx + 1} / {images.length}
//           </span>
//         )}
//       </div>

//       {/* Next */}
//       {images.length > 1 && (
//         <button
//           onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
//           style={{
//             position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
//             background: 'rgba(255,255,255,.12)', border: 'none',
//             color: '#fff', fontSize: '1.4rem',
//             width: 40, height: 40, borderRadius: '50%',
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >›</button>
//       )}
//     </div>
//   );
// }

// // ─── Species detail panel ──────────────────────────────────────────────────────

// function SpeciesDetailPanel({ species, onClose }) {
//   const [lightboxIdx, setLightboxIdx] = useState(null);

//   // Images come from the taxonomy tree (_images) or fall back to single imageUrl
//   const rawImages = Array.isArray(species._images) && species._images.length > 0
//     ? species._images
//     : species.imageUrl
//       ? [{ file_url: species.imageUrl }]
//       : [];

//   return (
//     <>
//       <div style={{
//         position: 'fixed', top: 0, right: 0, bottom: 0, width: 500,
//         maxWidth: '95vw', background: 'var(--bg2, #111)',
//         borderLeft: '1px solid var(--border)', zIndex: 200,
//         display: 'flex', flexDirection: 'column',
//         boxShadow: '-8px 0 40px rgba(0,0,0,.45)',
//         animation: 'slideInRight .28s cubic-bezier(.4,0,.2,1)',
//         overflow: 'hidden',
//       }}>

//         {/* ── Header ── */}
//         <div style={{
//           padding: '1.5rem 1.5rem 1rem',
//           borderBottom: '1px solid var(--border)',
//           background: 'var(--bg2, #111)',
//           flexShrink: 0,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
//             <div>
//               <h2 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '.2rem', fontFamily: 'var(--ff)' }}>
//                 {species.name}
//               </h2>
//               <p style={{ fontSize: '.8rem', color: 'var(--text3)', fontStyle: 'italic' }}>
//                 {species.scientific}
//               </p>
//               {species.family && (
//                 <span style={{
//                   display: 'inline-block', marginTop: '.4rem',
//                   fontSize: '.66rem', padding: '.18rem .55rem',
//                   borderRadius: 20, background: 'rgba(82,201,123,.1)',
//                   color: '#52c97b', border: '1px solid rgba(82,201,123,.3)',
//                 }}>
//                   {species.family}
//                 </span>
//               )}
//             </div>
//             <button
//               style={{
//                 background: 'transparent', border: '1px solid var(--border)',
//                 color: 'var(--text2)', borderRadius: 8,
//                 padding: '.3rem .7rem', cursor: 'pointer', fontSize: '.8rem', flexShrink: 0,
//               }}
//               onClick={onClose}
//             >Close</button>
//           </div>
//         </div>

//         {/* ── Scrollable body ── */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>

//           {/* Description */}
//           {species.description && (
//             <div style={{
//               background: 'var(--bg3, #1a1a1a)', borderRadius: 10,
//               border: '1px solid var(--border)', padding: '1rem',
//               marginBottom: '1.25rem',
//             }}>
//               <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
//                 {species.description}
//               </p>
//             </div>
//           )}

//           {/* Meta chips */}
//           {(species.region || species.status || species.subcategory) && (
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1.25rem' }}>
//               {species.status && (
//                 <Chip label="Status" value={species.status} valueColor="#52c97b" />
//               )}
//               {species.region && (
//                 <Chip label="Region" value={species.region} />
//               )}
//               {species.subcategory && (
//                 <Chip label="Subfamily" value={species.subcategory} />
//               )}
//               {species.wingspan && (
//                 <Chip label="Wingspan" value={species.wingspan} />
//               )}
//             </div>
//           )}

//           {/* ── Image gallery ── */}
//           {rawImages.length > 0 && (
//             <div>
//               <div style={{
//                 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                 marginBottom: '.75rem',
//               }}>
//                 <h3 style={{
//                   fontSize: '.72rem', textTransform: 'uppercase',
//                   letterSpacing: '.1em', color: 'var(--text3)', margin: 0,
//                 }}>
//                   Photos
//                 </h3>
//                 <span style={{ fontSize: '.68rem', color: 'var(--text3)' }}>
//                   {rawImages.length} image{rawImages.length !== 1 ? 's' : ''}
//                 </span>
//               </div>

//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: rawImages.length === 1 ? '1fr' : 'repeat(2, 1fr)',
//                 gap: '.5rem',
//               }}>
//                 {rawImages.map((img, i) => {
//                   const url = resolveImageUrl(img, 400);
//                   if (!url) return null;
//                   return (
//                     <div
//                       key={i}
//                       onClick={() => setLightboxIdx(i)}
//                       style={{
//                         borderRadius: 8, overflow: 'hidden',
//                         cursor: 'pointer', position: 'relative',
//                         aspectRatio: rawImages.length === 1 ? '16/9' : '1/1',
//                         background: 'var(--bg3)',
//                         border: '1px solid var(--border)',
//                         transition: 'transform .15s, box-shadow .15s',
//                       }}
//                       onMouseEnter={e => {
//                         e.currentTarget.style.transform = 'scale(1.02)';
//                         e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.5)';
//                       }}
//                       onMouseLeave={e => {
//                         e.currentTarget.style.transform = 'scale(1)';
//                         e.currentTarget.style.boxShadow = 'none';
//                       }}
//                     >
//                       <img
//                         src={url}
//                         alt={resolveCaption(img)}
//                         style={{
//                           width: '100%', height: '100%',
//                           objectFit: 'cover', display: 'block',
//                         }}
//                         onError={e => {
//                           e.target.style.display = 'none';
//                           if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
//                         }}
//                       />
//                       {/* Fallback emoji */}
//                       <div style={{
//                         display: 'none', position: 'absolute', inset: 0,
//                         alignItems: 'center', justifyContent: 'center',
//                         fontSize: '2rem', background: 'var(--bg3)',
//                       }}>🦋</div>

//                       {/* Hover overlay */}
//                       <div style={{
//                         position: 'absolute', inset: 0,
//                         background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)',
//                         opacity: 0,
//                         transition: 'opacity .15s',
//                         display: 'flex', alignItems: 'flex-end', padding: '.4rem .5rem',
//                       }}
//                         onMouseEnter={e => e.currentTarget.style.opacity = '1'}
//                         onMouseLeave={e => e.currentTarget.style.opacity = '0'}
//                       >
//                         <span style={{
//                           fontSize: '.62rem', color: 'rgba(255,255,255,.85)',
//                           overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//                         }}>
//                           {resolveCaption(img)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {rawImages.length === 0 && (
//             <div style={{
//               textAlign: 'center', padding: '2.5rem 1rem',
//               color: 'var(--text3)', fontSize: '.82rem',
//             }}>
//               🦋 No images available yet
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Lightbox */}
//       {lightboxIdx !== null && (
//         <Lightbox
//           images={rawImages}
//           startIndex={lightboxIdx}
//           speciesName={species.name}
//           onClose={() => setLightboxIdx(null)}
//         />
//       )}
//     </>
//   );
// }

// function Chip({ label, value, valueColor }) {
//   return (
//     <div style={{
//       background: 'var(--bg3, #1a1a1a)', borderRadius: 8,
//       border: '1px solid var(--border)', padding: '.65rem .85rem',
//     }}>
//       <span style={{
//         fontSize: '.62rem', textTransform: 'uppercase',
//         letterSpacing: '.08em', color: 'var(--text3)', display: 'block',
//         marginBottom: '.25rem',
//       }}>
//         {label}
//       </span>
//       <span style={{
//         display: 'block', fontSize: '.83rem',
//         color: valueColor || 'var(--text)', fontWeight: 600,
//       }}>
//         {value}
//       </span>
//     </div>
//   );
// }

// // ─── Species card ──────────────────────────────────────────────────────────────

// function SpeciesCard({ s, isSelected, onClick }) {
//   // Collect all images: prefer _images array, fallback to single imageUrl
//   const allImages = Array.isArray(s._images) && s._images.length > 0
//     ? s._images
//     : s.imageUrl
//       ? [{ file_url: s.imageUrl }]
//       : [];

//   const hasMultiple = allImages.length > 1;

//   return (
//     <div
//       className="card fu"
//       style={{
//         padding: 0, cursor: 'pointer', overflow: 'hidden',
//         outline: isSelected ? '2px solid #52c97b' : 'none',
//       }}
//       onClick={onClick}
//     >
//       {/* ── Image area ── */}
//       {hasMultiple ? (
//         /* Multi-image grid strip */
//         <div style={{
//           width: '100%',
//           height: 160,
//           display: 'grid',
//           gridTemplateColumns: allImages.length === 2
//             ? '1fr 1fr'
//             : allImages.length === 3
//             ? '2fr 1fr'
//             : 'repeat(2, 1fr)',
//           gridTemplateRows: allImages.length >= 3 ? '1fr 1fr' : '1fr',
//           gap: 2,
//           background: 'var(--bg3)',
//           overflow: 'hidden',
//           position: 'relative',
//         }}>
//           {allImages.slice(0, 4).map((img, i) => {
//             const url = resolveImageUrl(img, 400);
//             const isFirst3 = allImages.length === 3 && i === 0;
//             return (
//               <div
//                 key={i}
//                 style={{
//                   position: 'relative',
//                   overflow: 'hidden',
//                   gridRow: isFirst3 ? 'span 2' : 'auto',
//                   background: `${s.color || '#333'}14`,
//                 }}
//               >
//                 {url ? (
//                   <img
//                     src={url}
//                     alt={resolveCaption(img)}
//                     style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//                     onError={e => {
//                       e.target.style.display = 'none';
//                       if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
//                     }}
//                   />
//                 ) : null}
//                 <div style={{
//                   display: 'none', position: 'absolute', inset: 0,
//                   alignItems: 'center', justifyContent: 'center',
//                   fontSize: '1.5rem', background: `${s.color || '#333'}14`,
//                 }}>🦋</div>

//                 {/* "+N more" overlay on last visible cell when there are >4 images */}
//                 {i === 3 && allImages.length > 4 && (
//                   <div style={{
//                     position: 'absolute', inset: 0,
//                     background: 'rgba(0,0,0,.55)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     color: '#fff', fontSize: '.85rem', fontWeight: 600,
//                   }}>
//                     +{allImages.length - 4}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {/* Status badge */}
//           {s.status && (
//             <div style={{
//               position: 'absolute', top: 8, right: 8,
//               padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600,
//               background: 'rgba(82,201,123,.15)', color: '#52c97b',
//               border: '1px solid rgba(82,201,123,.4)',
//               zIndex: 2,
//             }}>
//               {s.status}
//             </div>
//           )}
//         </div>
//       ) : (
//         /* Single image (original layout) */
//         <div style={{ width: '100%', height: 160, background: `${s.color}14`, position: 'relative', overflow: 'hidden' }}>
//           {allImages[0] ? (
//             <img
//               src={resolveImageUrl(allImages[0], 400) || s.imageUrl}
//               alt={s.name}
//               style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//               onError={e => {
//                 e.target.style.display = 'none';
//                 if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
//               }}
//             />
//           ) : null}
//           <div style={{
//             display: allImages[0] ? 'none' : 'flex',
//             position: 'absolute', inset: 0,
//             alignItems: 'center', justifyContent: 'center',
//             fontSize: '3rem', background: `${s.color}14`,
//           }}>🦋</div>
//           {s.status && (
//             <div style={{
//               position: 'absolute', top: 8, right: 8,
//               padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600,
//               background: 'rgba(82,201,123,.15)', color: '#52c97b',
//               border: '1px solid rgba(82,201,123,.4)',
//             }}>
//               {s.status}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ── Card body ── */}
//       <div style={{ padding: '1rem' }}>
//         <div style={{
//           fontFamily: 'var(--ff)', fontSize: '1.05rem', color: 'var(--text)',
//           marginBottom: '.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//         }}>
//           {s.name}
//         </div>
//         <div style={{ fontSize: '.73rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '.6rem' }}>
//           {s.scientific}
//         </div>
//         <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.75rem' }}>
//           {(s.description || '').substring(0, 100)}…
//         </p>
//         <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
//           {s.region      && <span className="tag t-blue"   style={{ fontSize: '.66rem' }}>{s.region}</span>}
//           {s.subcategory && <span className="tag t-purple" style={{ fontSize: '.66rem' }}>{s.subcategory}</span>}
//         </div>
//         <div style={{
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           paddingTop: '.75rem', borderTop: '1px solid var(--border)',
//         }}>
//           <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>🪶 {s.wingspan}</span>
//           <button className="btn-sm" onClick={e => { e.stopPropagation(); onClick(); }}>
//             Photos & details →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Families loading skeleton ─────────────────────────────────────────────────

// function FamiliesLoader({ loaded, total }) {
//   const families = [
//     { name: 'Papilionidae', color: '#f59e0b' },
//     { name: 'Nymphalidae',  color: '#8b5cf6' },
//     { name: 'Pieridae',     color: '#eab308' },
//     { name: 'Lycaenidae',   color: '#60a5fa' },
//     { name: 'Hesperiidae',  color: '#f97316' },
//     { name: 'Riodinidae',   color: '#34d399' },
//   ];
//   return (
//     <div style={{ padding: '2rem 0' }}>
//       <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
//         <Loader />
//         <p style={{ marginTop: '1rem', color: 'var(--text2)', fontFamily: 'var(--ff)', fontSize: '1.1rem', fontStyle: 'italic' }}>
//           Loading butterfly families…
//         </p>
//         <p style={{ marginTop: '.35rem', color: 'var(--text3)', fontSize: '.8rem' }}>
//           {loaded} of {total} families ready
//         </p>
//         <div style={{ margin: '1rem auto 0', width: 260, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
//           <div style={{
//             height: '100%', width: `${(loaded / total) * 100}%`,
//             background: 'linear-gradient(90deg, #52c97b, #34d399)',
//             borderRadius: 2, transition: 'width .4s ease',
//           }} />
//         </div>
//       </div>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
//         {families.map((fam, i) => {
//           const done = i < loaded;
//           return (
//             <div key={fam.name} style={{
//               display: 'flex', alignItems: 'center', gap: '.5rem',
//               padding: '.45rem 1rem', borderRadius: 50,
//               background: done ? `${fam.color}18` : 'var(--bg3)',
//               border: `1px solid ${done ? fam.color + '55' : 'var(--border)'}`,
//               transition: 'all .4s ease',
//             }}>
//               <span style={{ fontSize: '.8rem' }}>{done ? '✓' : '·'}</span>
//               <span style={{ fontSize: '.8rem', color: done ? fam.color : 'var(--text3)', fontFamily: 'var(--fb)', fontStyle: 'italic' }}>
//                 {fam.name}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//       <div className="g3">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', opacity: 0.45 }}>
//             <div style={{ width: '100%', height: 160, background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
//               <div style={{
//                 position: 'absolute', inset: 0,
//                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.04), transparent)',
//                 backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite',
//               }} />
//             </div>
//             <div style={{ padding: '1rem' }}>
//               <div style={{ height: 16, width: '65%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.5rem' }} />
//               <div style={{ height: 12, width: '45%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.75rem' }} />
//               <div style={{ height: 10, width: '90%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.4rem' }} />
//               <div style={{ height: 10, width: '55%', background: 'var(--bg3)', borderRadius: 6 }} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Species page ──────────────────────────────────────────────────────────────

// export default function SpeciesPage() {
//   const { state, dispatch, filteredSpecies } = useApp();
//   const [view, setView]         = useState('grid');
//   const [filterOpen, setFilterOpen] = useState(false);

//   const cats    = state.categories;
//   const selCat  = state.selectedCategory;
//   const selSpec = state.selectedSpecies;

//   const isLoading   = state.familiesLoadingCount > 0;
//   const loadedCount = 6 - state.familiesLoadingCount;

//   const resolveCatSpecies = (cat) => {
//     if (!cat) return [];
//     if (Array.isArray(cat.species) && cat.species.length > 0) return cat.species;
//     if (typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories))
//       return Object.values(cat.subcategories).flat();
//     return [];
//   };

//   const allCatSpecies = resolveCatSpecies(selCat);

//   const displaySpecies = state.selectedSpeciesFilter
//     ? [state.selectedSpeciesFilter]
//     : selCat
//     ? allCatSpecies.filter(s => {
//         if (state.selectedSubcat === 'all') return true;
//         if (Array.isArray(s.path)) return s.path.includes(state.selectedSubcat);
//         return s.subcategory === state.selectedSubcat;
//       })
//     : state.search && state.search.length >= 2
//     ? filteredSpecies
//     : cats.flatMap(c => resolveCatSpecies(c));

//   return (
//     <div style={{ padding: '7rem 0 4rem 0', maxWidth: '100%' }}>

//       <div style={{ marginBottom: '2.5rem' }}>
//         <div className="sec-eye">Living Winged Jewels</div>
//         <h1 className="sec-h">Species <em>Database</em></h1>
//       </div>

//       {/* Toolbar */}
//       <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>

//         {/* Breadcrumb */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--text2)', flexWrap: 'wrap' }}>
//           <span
//             style={{
//               cursor: selCat || state.selectedSpeciesFilter ? 'pointer' : 'default',
//               color: !selCat && !state.selectedSpeciesFilter ? '#52c97b' : 'var(--text3)',
//             }}
//             onClick={() => {
//               dispatch({ type: 'SEL_CAT', v: null });
//               dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//             }}
//           >
//             All Families
//           </span>

//           {selCat && (
//             <>
//               <span style={{ color: 'var(--text3)' }}>›</span>
//               <span
//                 style={{
//                   color: (state.selectedSubcatPath?.length > 0) || state.selectedSpeciesFilter
//                     ? 'var(--text3)' : '#52c97b',
//                   cursor: (state.selectedSubcatPath?.length > 0) || state.selectedSpeciesFilter
//                     ? 'pointer' : 'default',
//                 }}
//                 onClick={() => {
//                   dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                   dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                 }}
//               >
//                 {selCat.name}
//               </span>
//             </>
//           )}

//           {selCat && (state.selectedSubcatPath || []).map((crumb, i) => {
//             const isLast   = i === state.selectedSubcatPath.length - 1;
//             const isActive = isLast && !state.selectedSpeciesFilter;
//             return (
//               <span key={crumb.category} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
//                 <span style={{ color: 'var(--text3)' }}>›</span>
//                 <span
//                   style={{ color: isActive ? '#52c97b' : 'var(--text3)', cursor: !isActive ? 'pointer' : 'default' }}
//                   onClick={() => {
//                     if (!isActive) {
//                       dispatch({ type: 'SEL_SUBCAT_PATH', category: crumb.category, path: state.selectedSubcatPath.slice(0, i + 1) });
//                       dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                     }
//                   }}
//                 >
//                   {crumb.label}
//                 </span>
//               </span>
//             );
//           })}

//           {state.selectedSpeciesFilter && (
//             <>
//               <span style={{ color: 'var(--text3)' }}>›</span>
//               <span style={{ color: '#52c97b' }}>{state.selectedSpeciesFilter.name}</span>
//             </>
//           )}
//         </div>

//         <div style={{ marginLeft: 'auto', display: 'flex', gap: '.4rem' }}>
//           {[['grid', '⊞ Grid'], ['map', '🗺 Map']].map(([v, l]) => (
//             <button
//               key={v}
//               className="btn-sm"
//               style={{ background: view === v ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
//               onClick={() => setView(v)}
//             >
//               {l}
//             </button>
//           ))}
//         </div>

//         <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
//           {isLoading ? 'Loading…' : `${displaySpecies.length} species`}
//         </span>
//       </div>

//       {/* Main content */}
//       {isLoading ? (
//         <FamiliesLoader loaded={loadedCount} total={6} />
//       ) : view === 'map' ? (
//         <IndiaMap sightings={state.sightings} loading={state.sightingsLoading} />
//       ) : (
//         <>
//           <div className="g3">
//             {displaySpecies.map(s => (
//               <SpeciesCard
//                 key={s.id}
//                 s={s}
//                 isSelected={selSpec?.id === s.id}
//                 onClick={() => dispatch({ type: 'SEL_SPECIES', v: s })}
//               />
//             ))}
//           </div>
//           {displaySpecies.length === 0 && (
//             <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text3)' }}>
//               <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
//               <p style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem' }}>No species match your filters.</p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Detail panel */}
//       {selSpec && (
//         <>
//           <div
//             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }}
//             onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })}
//           />
//           <SpeciesDetailPanel
//             species={selSpec}
//             onClose={() => dispatch({ type: 'SEL_SPECIES', v: null })}
//           />
//         </>
//       )}

//       {/* Filter modal */}
//       {filterOpen && (
//         <div className="modal-bg" onClick={() => setFilterOpen(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <button
//               onClick={() => setFilterOpen(false)}
//               style={{
//                 position: 'absolute', top: '1rem', right: '1rem',
//                 background: 'rgba(255,255,255,.08)', border: '1px solid var(--border)',
//                 color: 'var(--text2)', fontSize: '1.1rem',
//                 width: 32, height: 32, borderRadius: '50%',
//                 cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}
//             >✕</button>
//             <h2 style={{ fontFamily: 'var(--ff)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1rem' }}>Filter Species</h2>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               <button
//                 onClick={() => {
//                   dispatch({ type: 'SEL_CAT', v: null });
//                   dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                   dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                   setFilterOpen(false);
//                 }}
//                 style={{
//                   background: !state.selectedCategory ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
//                   border: '1px solid var(--border)', color: 'var(--text)',
//                   padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer',
//                   textAlign: 'left', fontFamily: 'var(--fb)',
//                 }}
//               >All Families</button>
//               {state.categories.map(cat => (
//                 <div key={cat.id}>
//                   <button
//                     onClick={() => {
//                       dispatch({ type: 'SEL_CAT', v: cat });
//                       dispatch({ type: 'SEL_SUBCAT', v: 'all' });
//                       dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
//                       setFilterOpen(false);
//                     }}
//                     style={{
//                       background: state.selectedCategory?.id === cat.id ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
//                       border: '1px solid var(--border)', color: 'var(--text)',
//                       padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer',
//                       textAlign: 'left', fontFamily: 'var(--fb)', width: '100%',
//                     }}
//                   >
//                     {cat.name} ({cat.count})
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Loader from '../components/shared/Loader';
import IndiaMap from '../components/map/IndiaMap';
import { wikiImageUrl } from '../utils/appUtils'; // adjust path if needed

// ─── Image helpers ─────────────────────────────────────────────────────────────

/** Build a displayable URL from a raw image entry */
function resolveImageUrl(img, width = 400) {
  if (!img) return null;
  if (img.file_url) return wikiImageUrl(img.file_url, width);
  if (img.img_name)  return wikiImageUrl(img.img_name,  width);
  if (img.file_name) return wikiImageUrl(img.file_name, width);
  return null;
}

/** Human-readable caption from a raw image entry */
function resolveCaption(img) {
  const raw = img.file_name || img.img_name || '';
  return raw.replace(/_/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '');
}

// ─── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ images, startIndex, speciesName, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const img = images[idx];
  const url = resolveImageUrl(img, 1200);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.94)',
        zIndex: 300,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn .18s ease',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          background: 'rgba(255,255,255,.12)', border: 'none',
          color: '#fff', fontSize: '1.3rem',
          width: 38, height: 38, borderRadius: '50%',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
          style={{
            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.12)', border: 'none',
            color: '#fff', fontSize: '1.4rem',
            width: 40, height: 40, borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >‹</button>
      )}

      {/* Image */}
      <img
        src={url}
        alt={speciesName}
        style={{
          maxWidth: '88vw', maxHeight: '82vh',
          borderRadius: 12, objectFit: 'contain',
          boxShadow: '0 8px 64px rgba(0,0,0,.8)',
        }}
        onClick={e => e.stopPropagation()}
      />

      {/* Caption */}
      <div style={{
        marginTop: '.85rem',
        background: 'rgba(0,0,0,.6)',
        color: '#ccc', padding: '.45rem 1.1rem',
        borderRadius: 20, fontSize: '.73rem',
        textAlign: 'center', maxWidth: '80vw',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        <strong style={{ color: '#fff' }}>{speciesName}</strong>
        {' · '}
        {resolveCaption(img)}
        {images.length > 1 && (
          <span style={{ color: 'var(--text3)', marginLeft: '0.5rem' }}>
            {idx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
          style={{
            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.12)', border: 'none',
            color: '#fff', fontSize: '1.4rem',
            width: 40, height: 40, borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >›</button>
      )}
    </div>
  );
}

// ─── Species detail panel ──────────────────────────────────────────────────────

function SpeciesDetailPanel({ species, onClose }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Images come from the taxonomy tree (_images) or fall back to single imageUrl
  const rawImages = Array.isArray(species._images) && species._images.length > 0
    ? species._images
    : species.imageUrl
      ? [{ file_url: species.imageUrl }]
      : [];

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 500,
        maxWidth: '95vw', background: 'var(--bg2, #111)',
        borderLeft: '1px solid var(--border)', zIndex: 200,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,.45)',
        animation: 'slideInRight .28s cubic-bezier(.4,0,.2,1)',
        overflow: 'hidden',
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: '1.5rem 1.5rem 1rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2, #111)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text)', marginBottom: '.2rem', fontFamily: 'var(--ff)' }}>
                {species.name}
              </h2>
              <p style={{ fontSize: '.8rem', color: 'var(--text3)', fontStyle: 'italic' }}>
                {species.scientific}
              </p>
              {species.family && (
                <span style={{
                  display: 'inline-block', marginTop: '.4rem',
                  fontSize: '.66rem', padding: '.18rem .55rem',
                  borderRadius: 20, background: 'rgba(82,201,123,.1)',
                  color: '#52c97b', border: '1px solid rgba(82,201,123,.3)',
                }}>
                  {species.family}
                </span>
              )}
            </div>
            <button
              style={{
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text2)', borderRadius: 8,
                padding: '.3rem .7rem', cursor: 'pointer', fontSize: '.8rem', flexShrink: 0,
              }}
              onClick={onClose}
            >Close</button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>

          {/* Description */}
          {species.description && (
            <div style={{
              background: 'var(--bg3, #1a1a1a)', borderRadius: 10,
              border: '1px solid var(--border)', padding: '1rem',
              marginBottom: '1.25rem',
            }}>
              <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
                {species.description}
              </p>
            </div>
          )}

          {/* Meta chips */}
          {(species.region || species.status || species.subcategory) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1.25rem' }}>
              {species.status && (
                <Chip label="Status" value={species.status} valueColor="#52c97b" />
              )}
              {species.region && (
                <Chip label="Region" value={species.region} />
              )}
              {species.subcategory && (
                <Chip label="Subfamily" value={species.subcategory} />
              )}
              {species.wingspan && (
                <Chip label="Wingspan" value={species.wingspan} />
              )}
            </div>
          )}

          {/* ── Image gallery ── */}
          {rawImages.length > 0 && (
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '.75rem',
              }}>
                <h3 style={{
                  fontSize: '.72rem', textTransform: 'uppercase',
                  letterSpacing: '.1em', color: 'var(--text3)', margin: 0,
                }}>
                  Photos
                </h3>
                <span style={{ fontSize: '.68rem', color: 'var(--text3)' }}>
                  {rawImages.length} image{rawImages.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: rawImages.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                gap: '.5rem',
              }}>
                {rawImages.map((img, i) => {
                  const url = resolveImageUrl(img, 400);
                  if (!url) return null;
                  return (
                    <div
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      style={{
                        borderRadius: 8, overflow: 'hidden',
                        cursor: 'pointer', position: 'relative',
                        aspectRatio: rawImages.length === 1 ? '16/9' : '1/1',
                        background: 'var(--bg3)',
                        border: '1px solid var(--border)',
                        transition: 'transform .15s, box-shadow .15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.5)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <img
                        src={url}
                        alt={resolveCaption(img)}
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'cover', display: 'block',
                        }}
                        onError={e => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback emoji */}
                      <div style={{
                        display: 'none', position: 'absolute', inset: 0,
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', background: 'var(--bg3)',
                      }}>🦋</div>

                      {/* Hover overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)',
                        opacity: 0,
                        transition: 'opacity .15s',
                        display: 'flex', alignItems: 'flex-end', padding: '.4rem .5rem',
                      }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                      >
                        <span style={{
                          fontSize: '.62rem', color: 'rgba(255,255,255,.85)',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {resolveCaption(img)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {rawImages.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '2.5rem 1rem',
              color: 'var(--text3)', fontSize: '.82rem',
            }}>
              🦋 No images available yet
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={rawImages}
          startIndex={lightboxIdx}
          speciesName={species.name}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

function Chip({ label, value, valueColor }) {
  return (
    <div style={{
      background: 'var(--bg3, #1a1a1a)', borderRadius: 8,
      border: '1px solid var(--border)', padding: '.65rem .85rem',
    }}>
      <span style={{
        fontSize: '.62rem', textTransform: 'uppercase',
        letterSpacing: '.08em', color: 'var(--text3)', display: 'block',
        marginBottom: '.25rem',
      }}>
        {label}
      </span>
      <span style={{
        display: 'block', fontSize: '.83rem',
        color: valueColor || 'var(--text)', fontWeight: 600,
      }}>
        {value}
      </span>
    </div>
  );
}

// ─── Species card ──────────────────────────────────────────────────────────────

function SpeciesCard({ s, isSelected, onClick }) {
  // Each card now represents exactly one image (expanded upstream)
  const allImages = Array.isArray(s._images) && s._images.length > 0
    ? s._images
    : s.imageUrl
      ? [{ file_url: s.imageUrl }]
      : [];

  // Always single-image layout per card
  const hasMultiple = false;

  return (
    <div
      className="card fu"
      style={{
        padding: 0, cursor: 'pointer', overflow: 'hidden',
        outline: isSelected ? '2px solid #52c97b' : 'none',
      }}
      onClick={onClick}
    >
      {/* ── Image area ── */}
      {hasMultiple ? (
        /* Multi-image grid strip */
        <div style={{
          width: '100%',
          height: 160,
          display: 'grid',
          gridTemplateColumns: allImages.length === 2
            ? '1fr 1fr'
            : allImages.length === 3
            ? '2fr 1fr'
            : 'repeat(2, 1fr)',
          gridTemplateRows: allImages.length >= 3 ? '1fr 1fr' : '1fr',
          gap: 2,
          background: 'var(--bg3)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {allImages.slice(0, 4).map((img, i) => {
            const url = resolveImageUrl(img, 400);
            const isFirst3 = allImages.length === 3 && i === 0;
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  gridRow: isFirst3 ? 'span 2' : 'auto',
                  background: `${s.color || '#333'}14`,
                }}
              >
                {url ? (
                  <img
                    src={url}
                    alt={resolveCaption(img)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div style={{
                  display: 'none', position: 'absolute', inset: 0,
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', background: `${s.color || '#333'}14`,
                }}>🦋</div>

                {/* "+N more" overlay on last visible cell when there are >4 images */}
                {i === 3 && allImages.length > 4 && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '.85rem', fontWeight: 600,
                  }}>
                    +{allImages.length - 4}
                  </div>
                )}
              </div>
            );
          })}

          {/* Status badge */}
          {s.status && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600,
              background: 'rgba(82,201,123,.15)', color: '#52c97b',
              border: '1px solid rgba(82,201,123,.4)',
              zIndex: 2,
            }}>
              {s.status}
            </div>
          )}
        </div>
      ) : (
        /* Single image (original layout) */
        <div style={{ width: '100%', height: 160, background: `${s.color}14`, position: 'relative', overflow: 'hidden' }}>
          {allImages[0] ? (
            <img
              src={resolveImageUrl(allImages[0], 400) || s.imageUrl}
              alt={s.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div style={{
            display: allImages[0] ? 'none' : 'flex',
            position: 'absolute', inset: 0,
            alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', background: `${s.color}14`,
          }}>🦋</div>
          {s.status && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600,
              background: 'rgba(82,201,123,.15)', color: '#52c97b',
              border: '1px solid rgba(82,201,123,.4)',
            }}>
              {s.status}
            </div>
          )}
        </div>
      )}

      {/* ── Card body ── */}
      <div style={{ padding: '1rem' }}>
        <div style={{
          fontFamily: 'var(--ff)', fontSize: '1.05rem', color: 'var(--text)',
          marginBottom: '.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {s.name}
        </div>
        <div style={{ fontSize: '.73rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '.6rem' }}>
          {s.scientific}
        </div>
        <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.75rem' }}>
          {(s.description || '').substring(0, 100)}…
        </p>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
          {s.region      && <span className="tag t-blue"   style={{ fontSize: '.66rem' }}>{s.region}</span>}
          {s.subcategory && <span className="tag t-purple" style={{ fontSize: '.66rem' }}>{s.subcategory}</span>}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '.75rem', borderTop: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>🪶 {s.wingspan}</span>
          <button className="btn-sm" onClick={e => { e.stopPropagation(); onClick(); }}>
            Photos & details →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Families loading skeleton ─────────────────────────────────────────────────

function FamiliesLoader({ loaded, total }) {
  const families = [
    { name: 'Papilionidae', color: '#f59e0b' },
    { name: 'Nymphalidae',  color: '#8b5cf6' },
    { name: 'Pieridae',     color: '#eab308' },
    { name: 'Lycaenidae',   color: '#60a5fa' },
    { name: 'Hesperiidae',  color: '#f97316' },
    { name: 'Riodinidae',   color: '#34d399' },
  ];
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <Loader />
        <p style={{ marginTop: '1rem', color: 'var(--text2)', fontFamily: 'var(--ff)', fontSize: '1.1rem', fontStyle: 'italic' }}>
          Loading butterfly families…
        </p>
        <p style={{ marginTop: '.35rem', color: 'var(--text3)', fontSize: '.8rem' }}>
          {loaded} of {total} families ready
        </p>
        <div style={{ margin: '1rem auto 0', width: 260, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${(loaded / total) * 100}%`,
            background: 'linear-gradient(90deg, #52c97b, #34d399)',
            borderRadius: 2, transition: 'width .4s ease',
          }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
        {families.map((fam, i) => {
          const done = i < loaded;
          return (
            <div key={fam.name} style={{
              display: 'flex', alignItems: 'center', gap: '.5rem',
              padding: '.45rem 1rem', borderRadius: 50,
              background: done ? `${fam.color}18` : 'var(--bg3)',
              border: `1px solid ${done ? fam.color + '55' : 'var(--border)'}`,
              transition: 'all .4s ease',
            }}>
              <span style={{ fontSize: '.8rem' }}>{done ? '✓' : '·'}</span>
              <span style={{ fontSize: '.8rem', color: done ? fam.color : 'var(--text3)', fontFamily: 'var(--fb)', fontStyle: 'italic' }}>
                {fam.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="g3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', opacity: 0.45 }}>
            <div style={{ width: '100%', height: 160, background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.04), transparent)',
                backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite',
              }} />
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ height: 16, width: '65%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.5rem' }} />
              <div style={{ height: 12, width: '45%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.75rem' }} />
              <div style={{ height: 10, width: '90%', background: 'var(--bg3)', borderRadius: 6, marginBottom: '.4rem' }} />
              <div style={{ height: 10, width: '55%', background: 'var(--bg3)', borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Species page ──────────────────────────────────────────────────────────────

export default function SpeciesPage() {
  const { state, dispatch, filteredSpecies } = useApp();
  const [view, setView]         = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  const cats    = state.categories;
  const selCat  = state.selectedCategory;
  const selSpec = state.selectedSpecies;

  const isLoading   = state.familiesLoadingCount > 0;
  const loadedCount = 6 - state.familiesLoadingCount;

  const resolveCatSpecies = (cat) => {
    if (!cat) return [];
    if (Array.isArray(cat.species) && cat.species.length > 0) return cat.species;
    if (typeof cat.subcategories === 'object' && !Array.isArray(cat.subcategories))
      return Object.values(cat.subcategories).flat();
    return [];
  };

  const allCatSpecies = resolveCatSpecies(selCat);

  // When a leaf species is selected, expand each image into its own separate card
  const expandToImageCards = (sf) => {
    if (!sf) return null;
    const imgs = Array.isArray(sf._images) && sf._images.length > 0
      ? sf._images
      : sf.imageUrl ? [{ file_url: sf.imageUrl }] : [];
    if (imgs.length <= 1) return [sf];
    return imgs.map((img, i) => ({
      ...sf,
      id:        `${sf.id}-img-${i}`,
      imageUrl:  img.file_url || img.img_name || img.file_name || null,
      _images:   [img],
      _imgIndex: i,
      _imgTotal: imgs.length,
    }));
  };

  const displaySpecies = state.selectedSpeciesFilter
    ? expandToImageCards(state.selectedSpeciesFilter)
    : selCat
    ? allCatSpecies.filter(s => {
        if (state.selectedSubcat === 'all') return true;
        if (Array.isArray(s.path)) return s.path.includes(state.selectedSubcat);
        return s.subcategory === state.selectedSubcat;
      })
    : state.search && state.search.length >= 2
    ? filteredSpecies
    : cats.flatMap(c => resolveCatSpecies(c));

  return (
    <div style={{ padding: '7rem 0 4rem 0', maxWidth: '100%' }}>

      <div style={{ marginBottom: '2.5rem' }}>
        <div className="sec-eye">Living Winged Jewels</div>
        <h1 className="sec-h">Species <em>Database</em></h1>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--text2)', flexWrap: 'wrap' }}>
          <span
            style={{
              cursor: selCat || state.selectedSpeciesFilter ? 'pointer' : 'default',
              color: !selCat && !state.selectedSpeciesFilter ? '#52c97b' : 'var(--text3)',
            }}
            onClick={() => {
              dispatch({ type: 'SEL_CAT', v: null });
              dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
            }}
          >
            All Families
          </span>

          {selCat && (
            <>
              <span style={{ color: 'var(--text3)' }}>›</span>
              <span
                style={{
                  color: (state.selectedSubcatPath?.length > 0) || state.selectedSpeciesFilter
                    ? 'var(--text3)' : '#52c97b',
                  cursor: (state.selectedSubcatPath?.length > 0) || state.selectedSpeciesFilter
                    ? 'pointer' : 'default',
                }}
                onClick={() => {
                  dispatch({ type: 'SEL_SUBCAT', v: 'all' });
                  dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                }}
              >
                {selCat.name}
              </span>
            </>
          )}

          {selCat && (state.selectedSubcatPath || []).map((crumb, i) => {
            const isLast   = i === state.selectedSubcatPath.length - 1;
            const isActive = isLast && !state.selectedSpeciesFilter;
            return (
              <span key={crumb.category} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                <span style={{ color: 'var(--text3)' }}>›</span>
                <span
                  style={{ color: isActive ? '#52c97b' : 'var(--text3)', cursor: !isActive ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (!isActive) {
                      dispatch({ type: 'SEL_SUBCAT_PATH', category: crumb.category, path: state.selectedSubcatPath.slice(0, i + 1) });
                      dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                    }
                  }}
                >
                  {crumb.label}
                </span>
              </span>
            );
          })}

          {state.selectedSpeciesFilter && (
            <>
              <span style={{ color: 'var(--text3)' }}>›</span>
              <span style={{ color: '#52c97b' }}>{state.selectedSpeciesFilter.name}</span>
            </>
          )}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '.4rem' }}>
          {[['grid', '⊞ Grid'], ['map', '🗺 Map']].map(([v, l]) => (
            <button
              key={v}
              className="btn-sm"
              style={{ background: view === v ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
              onClick={() => setView(v)}
            >
              {l}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
          {isLoading ? 'Loading…' : `${displaySpecies.length} species`}
        </span>
      </div>

      {/* Main content */}
      {isLoading ? (
        <FamiliesLoader loaded={loadedCount} total={6} />
      ) : view === 'map' ? (
        <IndiaMap sightings={state.sightings} loading={state.sightingsLoading} />
      ) : (
        <>
          <div className="g3">
            {displaySpecies.map(s => (
              <SpeciesCard
                key={s.id}
                s={s}
                isSelected={selSpec?.id === s.id}
                onClick={() => dispatch({ type: 'SEL_SPECIES', v: s })}
              />
            ))}
          </div>
          {displaySpecies.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text3)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem' }}>No species match your filters.</p>
            </div>
          )}
        </>
      )}

      {/* Detail panel */}
      {selSpec && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }}
            onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })}
          />
          <SpeciesDetailPanel
            species={selSpec}
            onClose={() => dispatch({ type: 'SEL_SPECIES', v: null })}
          />
        </>
      )}

      {/* Filter modal */}
      {filterOpen && (
        <div className="modal-bg" onClick={() => setFilterOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setFilterOpen(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'rgba(255,255,255,.08)', border: '1px solid var(--border)',
                color: 'var(--text2)', fontSize: '1.1rem',
                width: 32, height: 32, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>
            <h2 style={{ fontFamily: 'var(--ff)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '1rem' }}>Filter Species</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => {
                  dispatch({ type: 'SEL_CAT', v: null });
                  dispatch({ type: 'SEL_SUBCAT', v: 'all' });
                  dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                  setFilterOpen(false);
                }}
                style={{
                  background: !state.selectedCategory ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
                  border: '1px solid var(--border)', color: 'var(--text)',
                  padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'var(--fb)',
                }}
              >All Families</button>
              {state.categories.map(cat => (
                <div key={cat.id}>
                  <button
                    onClick={() => {
                      dispatch({ type: 'SEL_CAT', v: cat });
                      dispatch({ type: 'SEL_SUBCAT', v: 'all' });
                      dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                      setFilterOpen(false);
                    }}
                    style={{
                      background: state.selectedCategory?.id === cat.id ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
                      border: '1px solid var(--border)', color: 'var(--text)',
                      padding: '.75rem 1rem', borderRadius: 8, cursor: 'pointer',
                      textAlign: 'left', fontFamily: 'var(--fb)', width: '100%',
                    }}
                  >
                    {cat.name} ({cat.count})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}