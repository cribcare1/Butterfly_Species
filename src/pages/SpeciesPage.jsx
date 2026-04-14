
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Loader from '../components/shared/Loader';
import IndiaMap from '../components/map/IndiaMap';

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE GALLERY
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// CLOSE BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: '1rem', right: '1rem',
        background: 'rgba(255,255,255,.08)', border: '1px solid var(--border)',
        color: 'var(--text2)', fontSize: '1.1rem',
        width: 32, height: 32, borderRadius: '50%',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        lineHeight: 1,
      }}
      aria-label="Close"
    >
      ✕
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIES DETAIL PANEL
// ─────────────────────────────────────────────────────────────────────────────

function SpeciesDetailPanel({ species, images, imagesLoading, imagesError, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: '480px',
      maxWidth: '95vw', background: 'var(--bg2, #111)',
      borderLeft: '1px solid var(--border)', zIndex: 200,
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
      boxShadow: '-8px 0 40px rgba(0,0,0,.45)',
      animation: 'slideInRight .28s cubic-bezier(.4,0,.2,1)',
    }}>
      {/* Header */}
      <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg2, #111)', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text)', marginBottom: '.2rem', fontFamily: 'var(--ff)' }}>{species.name}</h2>
            <p style={{ fontSize: '.8rem', color: 'var(--text3)', fontStyle: 'italic' }}>{species.scientific}</p>
          </div>
          <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', borderRadius: 8, padding: '.3rem .7rem', cursor: 'pointer', fontSize: '.8rem', flexShrink: 0 }}
            onClick={onClose}>Close</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Description */}
        <div style={{ margin: '0 1.5rem 1rem', background: 'var(--bg3, #1a1a1a)', borderRadius: 10, border: '1px solid var(--border)', padding: '1rem' }}>
          <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65 }}>{species.description}</p>
        </div>

        {/* Details grid */}
        {species.status && (
          <div style={{ margin: '0 1.5rem 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
            <div style={{ background: 'var(--bg3, #1a1a1a)', borderRadius: 8, border: '1px solid var(--border)', padding: '.75rem' }}>
              <span style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>Status</span>
              <span style={{ display: 'block', fontSize: '.85rem', color: '#52c97b', fontWeight: 600, marginTop: '.3rem' }}>{species.status}</span>
            </div>
            {species.region && (
              <div style={{ background: 'var(--bg3, #1a1a1a)', borderRadius: 8, border: '1px solid var(--border)', padding: '.75rem' }}>
                <span style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>Region</span>
                <span style={{ display: 'block', fontSize: '.85rem', color: 'var(--text)', fontWeight: 600, marginTop: '.3rem' }}>{species.region}</span>
              </div>
            )}
            {species.wingspan && (
              <div style={{ background: 'var(--bg3, #1a1a1a)', borderRadius: 8, border: '1px solid var(--border)', padding: '.75rem' }}>
                <span style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>Wingspan</span>
                <span style={{ display: 'block', fontSize: '.85rem', color: 'var(--text)', fontWeight: 600, marginTop: '.3rem' }}>{species.wingspan}</span>
              </div>
            )}
            {species.discovered && (
              <div style={{ background: 'var(--bg3, #1a1a1a)', borderRadius: 8, border: '1px solid var(--border)', padding: '.75rem' }}>
                <span style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>Discovered</span>
                <span style={{ display: 'block', fontSize: '.85rem', color: 'var(--text)', fontWeight: 600, marginTop: '.3rem' }}>{species.discovered}</span>
              </div>
            )}
          </div>
        )}

        {/* Image gallery */}
        {/* <ImageGallery images={images} loading={imagesLoading} error={imagesError} /> */}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIES CARD
// ─────────────────────────────────────────────────────────────────────────────

function SpeciesCard({ s, isSelected, onClick }) {
  return (
    <div
      className="card fu"
      style={{ padding: 0, cursor: 'pointer', overflow: 'hidden', outline: isSelected ? '2px solid #52c97b' : 'none' }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div style={{ width: '100%', height: 160, background: `${s.color}14`, position: 'relative', overflow: 'hidden' }}>
        {s.imageUrl && s.imageUrl.trim() !== '' ? (
          <img 
            src={s.imageUrl}
            alt={s.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              console.error('[SpeciesCard Image Error]', s.name);
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
            onLoad={() => console.log('[SpeciesCard Image Loaded]', s.name)}
          />
        ) : null}
        {/* Fallback emoji */}
        <div style={{
          display: (s.imageUrl && s.imageUrl.trim() !== '') ? 'none' : 'flex',
          position: 'absolute', inset: 0,
          alignItems: 'center', justifyContent: 'center',
          fontSize: '3rem', background: `${s.color}14`,
        }}>🦋</div>
        {/* Status badge */}
        {s.status && (
          <div style={{ position: 'absolute', top: 8, right: 8, display: 'inline-block', padding: '.2rem .6rem', borderRadius: 20, fontSize: '.67rem', fontWeight: 600, background: 'rgba(82,201,123,.15)', color: '#52c97b', border: '1px solid rgba(82,201,123,.4)' }}>
            {s.status}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '1rem' }}>
        <div style={{ fontFamily: 'var(--ff)', fontSize: '1.05rem', color: 'var(--text)', marginBottom: '.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {s.name}
        </div>
        <div style={{ fontSize: '.73rem', color: 'var(--text3)', fontStyle: 'italic', marginBottom: '.6rem' }}>
          {s.scientific}
        </div>
        <p style={{ fontSize: '.82rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '.75rem' }}>
          {s.description.substring(0, 100)}…
        </p>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
          {s.region && <span className="tag t-blue" style={{ fontSize: '.66rem' }}>{s.region}</span>}
          {s.subcategory && <span className="tag t-purple" style={{ fontSize: '.66rem' }}>{s.subcategory}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '.75rem', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>🪶 {s.wingspan}</span>
          <button className="btn-sm" onClick={e => { e.stopPropagation(); onClick(); }}>
            Photos & details →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE GALLERY GRID (shows all images from filtered species)
// ─────────────────────────────────────────────────────────────────────────────

// function ImageGalleryGrid({ images, onImageClick }) {
//   if (!images || images.length === 0) {
//     return (
//       <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text3)' }}>
//         <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📸</div>
//         <p style={{ fontFamily: 'var(--ff)', fontSize: '1rem' }}>No images available for selected filters.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
//         <span style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)' }}>
//           📸 Wikimedia Commons · {images.length} images from {new Set(images.map(i => i.speciesId)).size} species
//         </span>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px, 25vw, 300px), 1fr))', gap: '1rem', padding: '0 1.5rem 2rem' }}>
//         {images.map((img, idx) => {
//           const imageSource = img.file_url || img.img_name;
//           const thumbUrl = imageSource;
//           const fullUrl = imageSource;
//           const caption = (img.img_name || 'Image').replace(/_/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '');

//           return (
//             <div
//               key={`${img.speciesId}-${idx}`}
//               style={{
//                 borderRadius: '8px', overflow: 'hidden',
//                 background: `${img.speciesColor}14`,
//                 border: `1px solid ${img.speciesColor}30`,
//                 cursor: 'pointer',
//                 transition: 'transform .2s ease, box-shadow .2s ease',
//               }}
//               onClick={() => onImageClick({ url: fullUrl, caption, species: img.speciesName })}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.03)';
//                 e.currentTarget.style.boxShadow = '0 4px 16px rgba(82,201,123,.15)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//               title={`${img.speciesName} • ${caption}`}
//             >
//               {thumbUrl ? (
//                 <img
//                   src={thumbUrl}
//                   alt={caption}
//                   style={{ width: '100%', height: 'clamp(160px, 20vw, 220px)', objectFit: 'cover', display: 'block' }}
//                   loading="lazy"
//                   onError={() => console.warn('[Gallery Image Error]', imageSource, thumbUrl)}
//                   onLoad={() => console.log('[Gallery Image Loaded]', imageSource)}
//                 />
//               ) : (
//                 <div style={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${img.speciesColor}08` }}>
//                   <span style={{ fontSize: '2rem', opacity: 0.5 }}>🦋</span>
//                 </div>
//               )}
//               <div style={{ padding: '.6rem', fontSize: '.7rem', color: 'var(--text3)', lineHeight: 1.4 }}>
//                 <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.2rem', fontSize: '.75rem' }}>
//                   {img.speciesName.substring(0, 25)}
//                 </div>
//                 <div style={{ opacity: 0.8 }}>
//                   {caption.substring(0, 40)}{caption.length > 40 ? '...' : ''}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────────
// SPECIES PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SpeciesPage() {
  const { state, dispatch, filteredSpecies } = useApp();
  const [view, setView] = useState('grid');
  const [lightbox, setLightbox] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const cats    = state.categories;
  const selCat  = state.selectedCategory;
  const selSpec = state.selectedSpecies;

  const displaySpecies = state.selectedSpeciesFilter
    ? [state.selectedSpeciesFilter]
    : selCat
    ? selCat.species.filter(s => state.selectedSubcat === 'all' || s.subcategory === state.selectedSubcat)
    : (state.search && state.search.length >= 2
        ? filteredSpecies
        : cats.flatMap(c => c.species));

  console.log('[SpeciesPage Debug]', {
    selectedSpeciesFilter: state.selectedSpeciesFilter?.name || 'NULL',
    selectedCategory: state.selectedCategory?.name || 'NULL',
    selectedSubcat: state.selectedSubcat,
    displaySpeciesCount: displaySpecies.length,
    displaySpeciesNames: displaySpecies.map(s => s.name),
    breadcrumbLevel1: !selCat && !state.selectedSpeciesFilter ? 'ACTIVE' : 'inactive',
    breadcrumbLevel2: selCat ? 'shown' : 'hidden',
    breadcrumbLevel3: selCat && state.selectedSubcat !== 'all' ? 'shown' : 'hidden',
    breadcrumbLevel4: state.selectedSpeciesFilter ? 'shown' : 'hidden'
  });

  // Get all images from display species
  const allImages = displaySpecies.flatMap(sp => 
    (sp._images || []).map(img => ({
      ...img,
      speciesName: sp.name,
      speciesScientific: sp.scientific,
      speciesId: sp.id,
      speciesColor: sp.color,
    }))
  );

  console.log('[AllImages]', allImages.length, 'total images from', displaySpecies.length, 'species');

  return (
    <div style={{ padding: '7rem 0 4rem 0', maxWidth: '100%' }}>

      <div style={{ marginBottom: '2.5rem' }}>
        <div className="sec-eye">Living Winged Jewels</div>
        <h1 className="sec-h">Species <em>Database</em></h1>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--text2)' }}>
          <span style={{ cursor: selCat || state.selectedSpeciesFilter ? 'pointer' : 'default', color: !selCat && !state.selectedSpeciesFilter ? '#52c97b' : 'var(--text3)' }}
            onClick={() => {
              dispatch({ type: 'SEL_CAT', v: null });
              dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
            }}>
            All Families
          </span>
          {selCat && (
            <>
              <span style={{ color: 'var(--text3)' }}>›</span>
              <span style={{ color: state.selectedSubcat !== 'all' || state.selectedSpeciesFilter ? 'var(--text3)' : '#52c97b', cursor: (state.selectedSubcat !== 'all' || state.selectedSpeciesFilter) ? 'pointer' : 'default' }}
                onClick={() => {
                  dispatch({ type: 'SEL_SUBCAT', v: 'all' });
                  dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                }}>
                {selCat.name}
              </span>
            </>
          )}
          {selCat && state.selectedSubcat !== 'all' && (
            <>
              <span style={{ color: 'var(--text3)' }}>›</span>
              <span style={{ color: state.selectedSpeciesFilter ? 'var(--text3)' : '#52c97b', cursor: state.selectedSpeciesFilter ? 'pointer' : 'default' }}
                onClick={() => state.selectedSpeciesFilter && dispatch({ type: 'SEL_SPECIES_FILTER', v: null })}>
                {state.selectedSubcat}
              </span>
            </>
          )}
          {state.selectedSpeciesFilter && (
            <>
              <span style={{ color: 'var(--text3)' }}>›</span>
              <span style={{ color: '#52c97b' }}>
                {state.selectedSpeciesFilter.name}
              </span>
            </>
          )}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '.4rem' }}>
          {/* <button className="btn-sm" onClick={() => setFilterOpen(true)}>🔍 Filter</button> */}
          {[['grid','⊞ Grid'],['map','🗺 Map']].map(([v,l]) => (
            <button key={v} className="btn-sm"
              style={{ background: view === v ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)' }}
              onClick={() => setView(v)}>{l}</button>
          ))}
        </div>

        <span style={{ fontSize: '.78rem', color: 'var(--text3)' }}>
          {displaySpecies.length} species
        </span>
      </div>

      {/* Content */}
      {state.catLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <Loader />
          <p style={{ marginTop: '1rem', color: 'var(--text3)', fontSize: '.85rem' }}>
            Fetching species images from Wikimedia Commons…
          </p>
        </div>
      ) : view === 'map' ? (
        <IndiaMap sightings={state.sightings} loading={state.sightingsLoading} />
      ) : (
        <div className="g3">
          {displaySpecies.map((s, si) => {
            console.log(`[DisplayedSpecies ${si}] ${s.name}: imageUrl=${s.imageUrl ? 'SET' : 'NULL'}`);
            return (
              <SpeciesCard
                key={s.id}
                s={s}
                isSelected={selSpec?.id === s.id}
                onClick={() => dispatch({ type: 'SEL_SPECIES', v: s })}
              />
            );
          })}
        </div>
      )}

      {displaySpecies.length === 0 && !state.catLoading && (
        <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text3)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
          <p style={{ fontFamily: 'var(--ff)', fontSize: '1.1rem' }}>No species match your filters.</p>
        </div>
      )}

      {/* Detail panel */}
      {selSpec && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 199 }}
            onClick={() => dispatch({ type: 'SEL_SPECIES', v: null })} />
          <SpeciesDetailPanel
            species={selSpec}
            images={state.speciesImages}
            imagesLoading={state.speciesImagesLoading}
            imagesError={state.speciesImagesError}
            onClose={() => dispatch({ type: 'SEL_SPECIES', v: null })}
          />
        </>
      )}

      {/* Gallery lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.92)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,.12)',
              border: 'none',
              color: '#fff',
              fontSize: '1.4rem',
              width: 40,
              height: 40,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.caption}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              borderRadius: '12px',
              objectFit: 'contain',
              boxShadow: '0 8px 64px rgba(0,0,0,.8)',
              animation: 'fadeIn .2s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.caption && (
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,.7)',
                color: '#ccc',
                padding: '.5rem 1.2rem',
                borderRadius: '20px',
                fontSize: '.75rem',
                textAlign: 'center',
                maxWidth: '80vw',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '.2rem' }}>{lightbox.species}</div>
              {lightbox.caption}
            </div>
          )}
        </div>
      )}

      {/* Filter Modal */}
      {filterOpen && (
        <div className="modal-bg" onClick={() => setFilterOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <CloseBtn onClick={() => setFilterOpen(false)}/>
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
                  border: '1px solid var(--border)', color: 'var(--text)', padding: '.75rem 1rem',
                  borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--fb)',
                }}
              >
                All Families
              </button>
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
                      border: '1px solid var(--border)', color: 'var(--text)', padding: '.75rem 1rem',
                      borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--fb)', width: '100%',
                    }}
                  >
                    {cat.name} ({cat.count})
                  </button>
                  {state.selectedCategory?.id === cat.id && cat.subcategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        dispatch({ type: 'SEL_SUBCAT', v: sub });
                        dispatch({ type: 'SEL_SPECIES_FILTER', v: null });
                        setFilterOpen(false);
                      }}
                      style={{
                        background: state.selectedSubcat === sub ? 'rgba(82,201,123,.2)' : 'var(--greenGlow)',
                        border: '1px solid var(--border)', color: 'var(--text)', padding: '.5rem 2rem',
                        borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--fb)', width: '100%', marginTop: '.25rem',
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}