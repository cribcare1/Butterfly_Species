

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  FAMILY_META,
  FALLBACK_STATS,
  STATIC_TEAM,
  fetchStats,
  fetchFeaturedImages,
  fetchWLBIndiaSightings,
  buildSightingsFromFeatured,
  fetchSpeciesImages,
  buildBaseCategories,
  loadFamilyTaxonomy,
} from '../utils/appUtils';

// Re-export utilities so existing import paths keep working
export { wikiImageUrl, fetchSpeciesImages, fetchFeaturedImages } from '../utils/appUtils';

// ─── Initial state ────────────────────────────────────────────────────────────

const TOTAL_FAMILIES = FAMILY_META.length;

const initialState = {
  page:                  'home',
  theme:                 (() => { try { return localStorage.getItem('bf-theme') || 'dark'; } catch { return 'dark'; } })(),
  mobileMenu:            false,
  sidebarOpen:           false,
  categories:            [],
  selectedCategory:      null,
  selectedSubcat:        'all',
  selectedSpeciesFilter: null,
  selectedSpecies:       null,
  search:                '',
  catLoading:            false,
  familiesLoadingCount:  TOTAL_FAMILIES,
  team:                  [],
  teamLoading:           false,
  selectedMember:        null,
  stats:                 null,
  statsLoading:          false,
  sightings:             [],
  sightingsLoading:      false,
  sightingsError:        null,
  mapFilter:             { state: 'All States', country: 'All Countries' },
  taxonExpanded:         {},
  speciesImages:         [],
  speciesImagesLoading:  false,
  speciesImagesError:    null,
  taxonomyData:          null,
  taxonomyLoading:       false,
  taxonomyError:         null,
  featuredImages:        [],
  featuredImagesLoading: false,
  featuredImagesError:   null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.p, mobileMenu: false, selectedSpecies: null, selectedMember: null };
    case 'TOGGLE_MOBILE':  return { ...state, mobileMenu: !state.mobileMenu };
    case 'TOGGLE_SIDEBAR': return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'TOGGLE_THEME': {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('bf-theme', next); } catch {}
      return { ...state, theme: next };
    }
    case 'SET_SEARCH':  return { ...state, search: action.v };
    case 'STATS_LOAD':  return { ...state, statsLoading: true };
    case 'STATS_OK':    return { ...state, statsLoading: false, stats: action.v };
    case 'CAT_LOAD':    return { ...state, catLoading: true };
    case 'CAT_OK':      return { ...state, catLoading: false, categories: action.v };

    case 'RESET_FAMILIES_COUNT':
      return { ...state, familiesLoadingCount: action.count };

    case 'SEL_CAT':
      return {
        ...state,
        selectedCategory:   action.v,
        selectedSubcat:     'all',
        selectedSpecies:    null,
        speciesImages:      [],
        speciesImagesError: null,
        taxonomyData:       null,
        taxonomyError:      null,
      };
    case 'SEL_SUBCAT':         return { ...state, selectedSubcat: action.v };
    case 'SEL_SPECIES_FILTER': return { ...state, selectedSpeciesFilter: action.v };
    case 'SEL_SPECIES':
      return {
        ...state,
        selectedSpecies:      action.v,
        speciesImages:        action.v?._images || [],
        speciesImagesLoading: !!(action.v && !action.v._images),
        speciesImagesError:   null,
      };
    case 'TEAM_LOAD':  return { ...state, teamLoading: true };
    case 'TEAM_OK':    return { ...state, teamLoading: false, team: action.v };
    case 'SEL_MEMBER': return { ...state, selectedMember: action.v };
    case 'SIGHT_LOAD': return { ...state, sightingsLoading: true, sightingsError: null };
    case 'SIGHT_OK':   return { ...state, sightingsLoading: false, sightings: action.v, sightingsError: null };
    case 'SIGHT_ERR':  return { ...state, sightingsLoading: false, sightings: [], sightingsError: action.v };
    case 'MAP_FILTER': return { ...state, mapFilter: { ...state.mapFilter, ...action.v } };
    case 'TAXON_TOGGLE':
      return { ...state, taxonExpanded: { ...state.taxonExpanded, [action.id]: !state.taxonExpanded[action.id] } };
    case 'SPECIES_IMG_LOAD':
      return { ...state, speciesImagesLoading: true, speciesImagesError: null };
    case 'SPECIES_IMG_OK':
      return { ...state, speciesImagesLoading: false, speciesImages: action.v };
    case 'SPECIES_IMG_ERR':
      return { ...state, speciesImagesLoading: false, speciesImagesError: action.v };
    case 'TAXONOMY_LOAD':
      return { ...state, taxonomyLoading: true, taxonomyError: null, taxonomyData: null };
    case 'TAXONOMY_OK':
      return { ...state, taxonomyLoading: false, taxonomyData: action.v };
    case 'TAXONOMY_ERR':
      return { ...state, taxonomyLoading: false, taxonomyError: action.v };
    case 'FEATURED_IMG_LOAD':
      return { ...state, featuredImagesLoading: true, featuredImagesError: null };
    case 'FEATURED_IMG_OK':
      return { ...state, featuredImagesLoading: false, featuredImages: action.v };
    case 'FEATURED_IMG_ERR':
      return { ...state, featuredImagesLoading: false, featuredImagesError: action.v };

    case 'FAMILY_TREE_LOAD': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, taxonomyLoading: true } : c
      );
      return {
        ...state,
        categories: updatedCats,
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, taxonomyLoading: true }
          : state.selectedCategory,
      };
    }
    case 'FAMILY_TREE_OK': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, ...action.v, taxonomyLoading: false } : c
      );
      return {
        ...state,
        categories:           updatedCats,
        familiesLoadingCount: Math.max(0, state.familiesLoadingCount - 1),
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, ...action.v, taxonomyLoading: false }
          : state.selectedCategory,
      };
    }
    case 'FAMILY_TREE_ERR': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, taxonomyLoading: false } : c
      );
      return {
        ...state,
        categories:           updatedCats,
        familiesLoadingCount: Math.max(0, state.familiesLoadingCount - 1),
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, taxonomyLoading: false }
          : state.selectedCategory,
      };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const Ctx = createContext(null);

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within a Provider');
  return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // const loadAll = useCallback(async () => {
  //   dispatch({ type: 'CAT_LOAD' });
  //   dispatch({ type: 'TEAM_LOAD' });
  //   dispatch({ type: 'SIGHT_LOAD' });
  //   dispatch({ type: 'FEATURED_IMG_LOAD' });
  //   dispatch({ type: 'TEAM_OK',  v: STATIC_TEAM });
  //   dispatch({ type: 'STATS_OK', v: FALLBACK_STATS });

  //   // Stats (best-effort upgrade)
  //   fetchStats()
  //     .then(v => dispatch({ type: 'STATS_OK', v }))
  //     .catch(() => {});

  //   // Featured images — gallery page only, independent of map
  //   fetchFeaturedImages()
  //     .then(featured => dispatch({ type: 'FEATURED_IMG_OK', v: featured }))
  //     .catch(err => dispatch({ type: 'FEATURED_IMG_ERR', v: err?.message || 'Failed to fetch featured images' }));

  //   // Map sightings — WLB_India tree (real GPS coords), fallback to featured
  //   fetchWLBIndiaSightings()
  //     .then(sightings => {
  //       if (sightings.length) {
  //         dispatch({ type: 'SIGHT_OK', v: sightings });
  //       } else {
  //         fetchFeaturedImages()
  //           .then(featured => {
  //             const fallback = buildSightingsFromFeatured(featured);
  //             if (fallback.length) dispatch({ type: 'SIGHT_OK', v: fallback });
  //             else dispatch({ type: 'SIGHT_ERR', v: 'No sightings with GPS coordinates found.' });
  //           })
  //           .catch(err => dispatch({ type: 'SIGHT_ERR', v: err?.message || 'Failed to load sightings' }));
  //       }
  //     })
  //     .catch(err => {
  //       console.warn('[loadAll] WLB_India failed, falling back to featured images:', err.message);
  //       fetchFeaturedImages()
  //         .then(featured => {
  //           const fallback = buildSightingsFromFeatured(featured);
  //           if (fallback.length) dispatch({ type: 'SIGHT_OK', v: fallback });
  //           else dispatch({ type: 'SIGHT_ERR', v: err?.message || 'Failed to load sightings' });
  //         })
  //         .catch(() => dispatch({ type: 'SIGHT_ERR', v: err?.message || 'Failed to load sightings' }));
  //     });

  //   // Family taxonomy — all 6 fired in parallel
  //   const baseCategories = buildBaseCategories();
  //   dispatch({ type: 'RESET_FAMILIES_COUNT', count: baseCategories.length });
  //   dispatch({ type: 'CAT_OK', v: baseCategories });

  //   baseCategories.forEach((cat, fi) => {
  //     dispatch({ type: 'FAMILY_TREE_LOAD', family: cat.name });
  //     loadFamilyTaxonomy(cat.name, fi)
  //       .then(update => dispatch({ type: 'FAMILY_TREE_OK', family: cat.name, v: update }))
  //       .catch(err => {
  //         console.error(`[loadAll] Failed to load ${cat.name}:`, err);
  //         dispatch({ type: 'FAMILY_TREE_ERR', family: cat.name });
  //       });
  //   });
  // }, []);


  const loadAll = useCallback(async () => {
  // ── Phase 1: Home page APIs (fire immediately) ──────────────────────────
  dispatch({ type: 'TEAM_OK',  v: STATIC_TEAM });
  dispatch({ type: 'STATS_OK', v: FALLBACK_STATS });
  dispatch({ type: 'FEATURED_IMG_LOAD' });
  dispatch({ type: 'SIGHT_LOAD' });

  // Stats — best-effort upgrade, non-blocking
  fetchStats()
    .then(v => dispatch({ type: 'STATS_OK', v }))
    .catch(() => {});

  // Featured images — needed by carousel on home page
  const featuredPromise = fetchFeaturedImages()
    .then(featured => {
      dispatch({ type: 'FEATURED_IMG_OK', v: featured });
      return featured;
    })
    .catch(err => {
      dispatch({ type: 'FEATURED_IMG_ERR', v: err?.message || 'Failed to fetch featured images' });
      return [];
    });

  // Map sightings — uses WLB_India, falls back to featured
  fetchWLBIndiaSightings()
    .then(sightings => {
      if (sightings.length) {
        dispatch({ type: 'SIGHT_OK', v: sightings });
      } else {
        // fallback: reuse featuredPromise result (already in-flight)
        featuredPromise.then(featured => {
          const fallback = buildSightingsFromFeatured(featured);
          if (fallback.length) dispatch({ type: 'SIGHT_OK', v: fallback });
          else dispatch({ type: 'SIGHT_ERR', v: 'No sightings with GPS coordinates found.' });
        });
      }
    })
    .catch(err => {
      console.warn('[loadAll] WLB_India failed, falling back to featured images:', err.message);
      featuredPromise.then(featured => {
        const fallback = buildSightingsFromFeatured(featured);
        if (fallback.length) dispatch({ type: 'SIGHT_OK', v: fallback });
        else dispatch({ type: 'SIGHT_ERR', v: err?.message || 'Failed to load sightings' });
      });
    });

  // ── Phase 2: Family taxonomies — deferred until home page APIs are done ──
  // Wait for both featured + sightings to settle before hammering taxonomy
  await featuredPromise;

  dispatch({ type: 'CAT_LOAD' });
  const baseCategories = buildBaseCategories();
  dispatch({ type: 'RESET_FAMILIES_COUNT', count: baseCategories.length });
  dispatch({ type: 'CAT_OK', v: baseCategories });

  baseCategories.forEach((cat, fi) => {
    dispatch({ type: 'FAMILY_TREE_LOAD', family: cat.name });
    loadFamilyTaxonomy(cat.name, fi)
      .then(update => dispatch({ type: 'FAMILY_TREE_OK', family: cat.name, v: update }))
      .catch(err => {
        console.error(`[loadAll] Failed to load ${cat.name}:`, err);
        dispatch({ type: 'FAMILY_TREE_ERR', family: cat.name });
      });
  });

}, []);
  useEffect(() => { loadAll(); }, [loadAll]);

  // Fetch species images on-demand when a species without cached images is selected
  const scientific = state.selectedSpecies?.scientific;
  const images     = state.selectedSpecies?._images;

  useEffect(() => {
    if (!scientific || images?.length) return;
    let cancelled = false;
    dispatch({ type: 'SPECIES_IMG_LOAD' });
    fetchSpeciesImages(scientific)
      .then(data => { if (!cancelled) dispatch({ type: 'SPECIES_IMG_OK', v: data }); })
      .catch(err  => { if (!cancelled) dispatch({ type: 'SPECIES_IMG_ERR', v: err.message }); });
    return () => { cancelled = true; };
  }, [scientific, images]);

  const visibleSightings = state.sightings.filter(s => {
    const f = state.mapFilter;
    if (f.state   && f.state   !== 'All States'    && s.state   !== f.state)   return false;
    if (f.country && f.country !== 'All Countries' && s.country !== f.country) return false;
    return true;
  });

  const allSpecies      = state.categories.flatMap(c => c.species);
  const filteredSpecies = allSpecies.filter(s => {
    if (!state.search || state.search.length < 2) return true;
    const q = state.search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.scientific.toLowerCase().includes(q) ||
      (s.region || '').toLowerCase().includes(q)
    );
  });

  return (
    <Ctx.Provider value={{ state, dispatch, filteredSpecies, visibleSightings, reload: loadAll }}>
      {children}
    </Ctx.Provider>
  );
}