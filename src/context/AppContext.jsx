

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  FAMILY_META,
  FALLBACK_STATS,
  STATIC_TEAM,
  fetchStats,
  fetchFeaturedImages,
  fetchWLBIndiaSightings,
  fetchSpeciesImages,
  buildBaseCategories,
  loadFamilyTaxonomy,
} from '../utils/appUtils';

export { wikiImageUrl, fetchSpeciesImages, fetchFeaturedImages } from '../utils/appUtils';

const TOTAL_FAMILIES = FAMILY_META.length;

const initialState = {
  page:                  'home',
  theme:                 (() => { try { return localStorage.getItem('bf-theme') || 'dark'; } catch { return 'dark'; } })(),
  mobileMenu:            false,
  sidebarOpen:           false,
  categories:            [],
  selectedCategory:      null,
  selectedSubcat:        'all',
  selectedSubcatPath:    [],
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
  mapFilter:             { country: 'India', region: 'All' },
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

function reducer(state, action) {
  // Debug logging for selection changes
  if (['SEL_CAT', 'SEL_SUBCAT', 'SEL_SUBCAT_PATH', 'SEL_SPECIES_FILTER', 'SET_PAGE'].includes(action.type)) {
    console.log(`\n📍 [${action.type}]`, {
      category: action.v?.name || action.category || '—',
      subcat: action.v === 'all' ? 'all' : action.v,
      path: action.path || '—',
      speciesFilter: action.v?.name || '—',
      page: action.p || '—',
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
    case 'CAT_LOAD':    newState = { ...state, catLoading: true }; break;
    case 'CAT_OK':      newState = { ...state, catLoading: false, categories: action.v }; break;

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
        speciesImages:         [],
        speciesImagesError:    null,
        taxonomyData:          null,
        taxonomyError:         null,
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

    case 'SEL_SPECIES_FILTER': newState = { ...state, selectedSpeciesFilter: action.v }; break;
    case 'SEL_SPECIES':
      newState = {
        ...state,
        selectedSpecies:      action.v,
        speciesImages:        action.v?._images || [],
        speciesImagesLoading: !!(action.v && !action.v._images),
        speciesImagesError:   null,
      };
      break;
    case 'TEAM_LOAD':  newState = { ...state, teamLoading: true }; break;
    case 'TEAM_OK':    newState = { ...state, teamLoading: false, team: action.v }; break;
    case 'SEL_MEMBER': newState = { ...state, selectedMember: action.v }; break;
    case 'SIGHT_LOAD': newState = { ...state, sightingsLoading: true, sightingsError: null }; break;
    case 'SIGHT_OK':   newState = { ...state, sightingsLoading: false, sightings: action.v, sightingsError: null }; break;
    case 'SIGHT_ERR':  newState = { ...state, sightingsLoading: false, sightings: [], sightingsError: action.v }; break;

    case 'MAP_FILTER': {
      const incoming   = action.v || {};
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
    case 'TAXONOMY_LOAD':
      newState = { ...state, taxonomyLoading: true, taxonomyError: null, taxonomyData: null };
      break;
    case 'TAXONOMY_OK':
      newState = { ...state, taxonomyLoading: false, taxonomyData: action.v };
      break;
    case 'TAXONOMY_ERR':
      newState = { ...state, taxonomyLoading: false, taxonomyError: action.v };
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

    case 'FAMILY_TREE_LOAD': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, taxonomyLoading: true } : c
      );
      newState = {
        ...state,
        categories: updatedCats,
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, taxonomyLoading: true }
          : state.selectedCategory,
      };
      break;
    }
    case 'FAMILY_TREE_OK': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, ...action.v, taxonomyLoading: false } : c
      );
      newState = {
        ...state,
        categories:           updatedCats,
        familiesLoadingCount: Math.max(0, state.familiesLoadingCount - 1),
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, ...action.v, taxonomyLoading: false }
          : state.selectedCategory,
      };
      break;
    }
    case 'FAMILY_TREE_ERR': {
      const updatedCats = state.categories.map(c =>
        c.name === action.family ? { ...c, taxonomyLoading: false } : c
      );
      newState = {
        ...state,
        categories:           updatedCats,
        familiesLoadingCount: Math.max(0, state.familiesLoadingCount - 1),
        selectedCategory: state.selectedCategory?.name === action.family
          ? { ...state.selectedCategory, taxonomyLoading: false }
          : state.selectedCategory,
      };
      break;
    }

    default:
      newState = state;
  }

  // Debug logging for selection state changes
  if (['SEL_CAT', 'SEL_SUBCAT', 'SEL_SUBCAT_PATH', 'SEL_SPECIES_FILTER'].includes(action.type)) {
    console.log(`✅ Result State:`, {
      category: newState.selectedCategory?.name || 'none',
      subcat: newState.selectedSubcat || 'all',
      speciesFilter: newState.selectedSpeciesFilter?.name || 'none',
      displayWillShow: newState.selectedSpeciesFilter ? '🔍 Single species' : newState.selectedSubcat !== 'all' ? '📋 Species from subcategory' : '📚 All species from category',
    });
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

  const allSpecies      = state.categories.flatMap(c => {
    if (typeof c.subcategories === 'object' && !Array.isArray(c.subcategories)) {
      return Object.values(c.subcategories).flat();
    }
    return c.species || [];
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
    <Ctx.Provider value={{ state, dispatch, filteredSpecies, visibleSightings, reload: loadAll }}>
      {children}
    </Ctx.Provider>
  );
}