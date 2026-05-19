

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  FAMILY_META,
  FALLBACK_STATS,
  STATIC_TEAM,
  fetchStats,
  fetchFeaturedImages,
  fetchWLBIndiaSightings,
  fetchSpeciesImages,
  fetchFamilySubtree,
  fetchTaxonomyDetail,
  collectAllFilesFromTree,
  buildBaseCategories,
} from '../utils/appUtils';

export { wikiImageUrl, fetchSpeciesImages, fetchFeaturedImages } from '../utils/appUtils';

const TOTAL_FAMILIES = FAMILY_META.length;

const initialState = {
  page:                  'home',
  theme:                 (() => { try { return localStorage.getItem('bf-theme') || 'dark'; } catch { return 'dark'; } })(),
  mobileMenu:            false,
  sidebarOpen:           false,

  categories:            [],
  familiesLoadingCount:  TOTAL_FAMILIES,

  selectedCategory:      null,
  selectedSubcat:        'all',
  selectedSubcatPath:    [],
  selectedSpeciesFilter: null,
  selectedSpecies:       null,

  taxonomyDetail:        null,
  taxonomyDetailFiles:   [],
  taxonomyDetailLoading: false,
  taxonomyDetailError:   null,
  taxonomyDetailCategory: null,

  search:                '',
  team:                  [],
  teamLoading:           false,
  selectedMember:        null,
  stats:                 null,
  statsLoading:          false,
  sightings:             [],
  sightingsLoading:      false,
  sightingsError:        null,
  mapFilter:             { country: 'India', region: 'All' },
  taxonExpanded:         {},

  speciesImages:         [],
  speciesImagesLoading:  false,
  speciesImagesError:    null,

  featuredImages:        [],
  featuredImagesLoading: false,
  featuredImagesError:   null,
};

function reducer(state, action) {
  if (['SEL_CAT', 'SEL_SUBCAT', 'SEL_SUBCAT_PATH', 'SEL_SPECIES_FILTER', 'SET_PAGE'].includes(action.type)) {
    console.log(`\n📍 [${action.type}]`, {
      category:      action.v?.name || action.category || '—',
      subcat:        action.v === 'all' ? 'all' : action.v,
      path:          action.path || '—',
      speciesFilter: action.v?.category || '—',
      page:          action.p || '—',
    });
  }

  let newState;

  switch (action.type) {
    case 'SET_PAGE':
      newState = { ...state, page: action.p, mobileMenu: false, selectedSpecies: null, selectedMember: null };
      break;
    case 'TOGGLE_MOBILE':  newState = { ...state, mobileMenu: !state.mobileMenu }; break;
    case 'TOGGLE_SIDEBAR': newState = { ...state, sidebarOpen: !state.sidebarOpen }; break;
    case 'TOGGLE_THEME': {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('bf-theme', next); } catch {}
      newState = { ...state, theme: next };
      break;
    }
    case 'SET_SEARCH':  newState = { ...state, search: action.v }; break;
    case 'STATS_LOAD':  newState = { ...state, statsLoading: true }; break;
    case 'STATS_OK':    newState = { ...state, statsLoading: false, stats: action.v }; break;

    case 'CAT_OK':
      newState = { ...state, categories: action.v };
      break;

    case 'RESET_FAMILIES_COUNT':
      newState = { ...state, familiesLoadingCount: action.count };
      break;

    case 'SEL_CAT':
      newState = {
        ...state,
        selectedCategory:      action.v,
        selectedSubcat:        'all',
        selectedSubcatPath:    [],
        selectedSpecies:       null,
        selectedSpeciesFilter: null,
        speciesImages:         [],
        speciesImagesError:    null,
        // FIX: always clear detail when switching family so stale data is never shown
        taxonomyDetail:        null,
        taxonomyDetailFiles:   [],
        taxonomyDetailError:   null,
        taxonomyDetailCategory: null,
      };
      break;

    case 'SEL_SUBCAT':
      newState = {
        ...state,
        selectedSubcat:        action.v,
        selectedSubcatPath:    [],
        selectedSpeciesFilter: null,
        selectedSpecies:       null,
      };
      break;

    case 'SEL_SUBCAT_PATH':
      newState = {
        ...state,
        selectedSubcat:        action.category,
        selectedSubcatPath:    action.path,
        selectedSpeciesFilter: null,
        selectedSpecies:       null,
      };
      break;

    case 'SEL_SPECIES_FILTER':
      newState = {
        ...state,
        selectedSpeciesFilter: action.v,
        // FIX: always clear stale detail so the effect always re-fetches
        taxonomyDetail:        null,
        taxonomyDetailFiles:   [],
        taxonomyDetailError:   null,
        taxonomyDetailCategory: action.v?.category || null,
      };
      break;

    case 'SEL_SPECIES':
      newState = {
        ...state,
        selectedSpecies:      action.v,
        speciesImages:        action.v?._images || [],
        speciesImagesLoading: !!(action.v && !action.v._images?.length),
        speciesImagesError:   null,
      };
      break;

    case 'TAXON_DETAIL_LOAD':
      newState = {
        ...state,
        taxonomyDetailLoading:  true,
        taxonomyDetailError:    null,
        taxonomyDetail:         null,
        taxonomyDetailFiles:    [],
        taxonomyDetailCategory: action.category,
      };
      break;
    case 'TAXON_DETAIL_OK':
      newState = {
        ...state,
        taxonomyDetailLoading:  false,
        taxonomyDetail:         action.node,
        taxonomyDetailFiles:    action.files,
        taxonomyDetailCategory: action.category,
      };
      break;
    case 'TAXON_DETAIL_ERR':
      newState = {
        ...state,
        taxonomyDetailLoading: false,
        taxonomyDetailError:   action.v,
      };
      break;

    case 'FAMILY_SUBTREE_LOAD': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, subtreeLoading: true, subtreeError: null } : c
      );
      newState = { ...state, categories: updatedCats };
      break;
    }
    case 'FAMILY_SUBTREE_OK': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family
          ? { ...c, subtreeLoading: false, subtreeNode: action.node }
          : c
      );
      newState = {
        ...state,
        categories:           updatedCats,
        familiesLoadingCount: Math.max(0, state.familiesLoadingCount - 1),
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, subtreeLoading: false, subtreeNode: action.node }
          : state.selectedCategory,
      };
      break;
    }
    case 'FAMILY_SUBTREE_ERR': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family
          ? { ...c, subtreeLoading: false, subtreeError: action.v }
          : c
      );
      newState = {
        ...state,
        categories:           updatedCats,
        familiesLoadingCount: Math.max(0, state.familiesLoadingCount - 1),
      };
      break;
    }

    case 'TEAM_LOAD':  newState = { ...state, teamLoading: true }; break;
    case 'TEAM_OK':    newState = { ...state, teamLoading: false, team: action.v }; break;
    case 'SEL_MEMBER': newState = { ...state, selectedMember: action.v }; break;
    case 'SIGHT_LOAD': newState = { ...state, sightingsLoading: true, sightingsError: null }; break;
    case 'SIGHT_OK':   newState = { ...state, sightingsLoading: false, sightings: action.v, sightingsError: null }; break;
    case 'SIGHT_ERR':  newState = { ...state, sightingsLoading: false, sightings: [], sightingsError: action.v }; break;

    case 'MAP_FILTER': {
      const incoming    = action.v || {};
      const prevCountry = state.mapFilter?.country;
      const newCountry  = incoming.country ?? prevCountry;
      const newRegion   = incoming.country && incoming.country !== prevCountry
        ? (incoming.region ?? 'All')
        : (incoming.region ?? state.mapFilter?.region ?? 'All');
      newState = { ...state, mapFilter: { country: newCountry, region: newRegion } };
      break;
    }

    case 'TAXON_TOGGLE':
      newState = { ...state, taxonExpanded: { ...state.taxonExpanded, [action.id]: !state.taxonExpanded[action.id] } };
      break;

    case 'SPECIES_IMG_LOAD':
      newState = { ...state, speciesImagesLoading: true, speciesImagesError: null };
      break;
    case 'SPECIES_IMG_OK':
      newState = { ...state, speciesImagesLoading: false, speciesImages: action.v };
      break;
    case 'SPECIES_IMG_ERR':
      newState = { ...state, speciesImagesLoading: false, speciesImagesError: action.v };
      break;

    case 'FEATURED_IMG_LOAD':
      newState = { ...state, featuredImagesLoading: true, featuredImagesError: null };
      break;
    case 'FEATURED_IMG_OK':
      newState = { ...state, featuredImagesLoading: false, featuredImages: action.v };
      break;
    case 'FEATURED_IMG_ERR':
      newState = { ...state, featuredImagesLoading: false, featuredImagesError: action.v };
      break;

    default:
      newState = state;
  }

  return newState;
}

const Ctx = createContext(null);

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within a Provider');
  return ctx;
};

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // ── Initial load ──────────────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    dispatch({ type: 'TEAM_OK',  v: STATIC_TEAM });
    dispatch({ type: 'STATS_OK', v: FALLBACK_STATS });

    fetchStats()
      .then(v => dispatch({ type: 'STATS_OK', v }))
      .catch(() => {});

    dispatch({ type: 'FEATURED_IMG_LOAD' });
    fetchFeaturedImages()
      .then(featured => dispatch({ type: 'FEATURED_IMG_OK', v: featured }))
      .catch(err     => dispatch({ type: 'FEATURED_IMG_ERR', v: err?.message || 'Failed to fetch featured images' }));

    dispatch({ type: 'SIGHT_LOAD' });
    fetchWLBIndiaSightings()
      .then(sightings => {
        if (sightings.length) {
          dispatch({ type: 'SIGHT_OK', v: sightings });
        } else {
          dispatch({ type: 'SIGHT_ERR', v: 'No sightings with GPS coordinates found.' });
        }
      })
      .catch(err => {
        dispatch({ type: 'SIGHT_ERR', v: err?.message || 'Failed to load sightings' });
      });

    const baseCategories = buildBaseCategories();
    dispatch({ type: 'RESET_FAMILIES_COUNT', count: baseCategories.length });
    dispatch({ type: 'CAT_OK', v: baseCategories });
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // ── Lazy subtree fetch ────────────────────────────────────────────────────
  const loadFamilySubtree = useCallback(async (familyName) => {
    dispatch({ type: 'FAMILY_SUBTREE_LOAD', family: familyName });
    try {
      const node = await fetchFamilySubtree(familyName);
      dispatch({ type: 'FAMILY_SUBTREE_OK', family: familyName, node });
    } catch (err) {
      console.error(`[loadFamilySubtree] Failed for ${familyName}:`, err);
      dispatch({ type: 'FAMILY_SUBTREE_ERR', family: familyName, v: err?.message });
    }
  }, []);

  // ── Auto-fetch ALL family subtrees on load ────────────────────────────────
  useEffect(() => {
    if (state.categories.length === 0) return;
    state.categories.forEach(family => {
      if (!family.subtreeNode && !family.subtreeLoading) {
        loadFamilySubtree(family.name);
      }
    });
  }, [state.categories.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reactive tree-search fetch ────────────────────────────────────────────
  // FIX: removed the cache guard that was preventing re-fetches when the same
  // family header was clicked after a leaf was selected.
  // SEL_SPECIES_FILTER now always clears taxonomyDetail in the reducer, so
  // every new filter dispatch triggers a fresh fetch here.
  const filterCategory = state.selectedSpeciesFilter?.category;
  useEffect(() => {
    if (!filterCategory) return;

    let cancelled = false;
    dispatch({ type: 'TAXON_DETAIL_LOAD', category: filterCategory });

    fetchTaxonomyDetail(filterCategory)
      .then(node => {
        if (cancelled) return;
        const files = collectAllFilesFromTree(node);
        console.log(`[TAXON_DETAIL_OK] category=${filterCategory} files=${files.length}`);
        dispatch({ type: 'TAXON_DETAIL_OK', category: filterCategory, node, files });
      })
      .catch(err => {
        if (!cancelled) dispatch({ type: 'TAXON_DETAIL_ERR', v: err?.message || 'Failed to load detail' });
      });

    return () => { cancelled = true; };
  }, [filterCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Species image fetch (for detail modal) ────────────────────────────────
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

  // ── Derived: filtered sightings for map ───────────────────────────────────
  const visibleSightings = state.sightings.filter(s => {
    const { country, region } = state.mapFilter;
    if (country && country !== 'All Countries') {
      if (s.country !== country) return false;
    }
    const isAllRegion = !region || region === 'All' || region === 'All States' || region === 'All Districts';
    if (!isAllRegion) {
      const regionValue = country === 'Bhutan' ? s.district : s.state;
      if (regionValue !== region) return false;
    }
    return true;
  });

  // ── Derived: search-filtered species list ─────────────────────────────────
  const allSpecies = state.categories.flatMap(c => {
    if (!c.subtreeNode) return [];
    const flatten = (node) => {
      if (!node || typeof node !== 'object') return [];
      const category = node.category;
      if (!category) return [];
      const children = Array.isArray(node.children) ? node.children : [];
      if (children.length === 0) {
        const label = category.replace(/_/g, ' ');
        return [{
          id:         category,
          name:       label,
          scientific: label,
          region:     '',
          family:     c.name,
          color:      c.color,
        }];
      }
      return children.flatMap(flatten);
    };
    return flatten(c.subtreeNode);
  });

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
    <Ctx.Provider value={{
      state,
      dispatch,
      filteredSpecies,
      visibleSightings,
      reload: loadAll,
      loadFamilySubtree,
    }}>
      {children}
    </Ctx.Provider>
  );
}