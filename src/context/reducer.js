export const initialState = {
  page: 'home',
  search: '',
  stats: null,
  statsLoading: false,
  categories: [],
  catLoading: false,
  selectedCategory: null,
  selectedSubcat: 'all',
  selectedSpeciesFilter: null,
  selectedSpecies: null,
  team: [],
  teamLoading: false,
  selectedMember: null,
  sightings: [],
  sightingsLoading: false,
  mapFilter: { state: 'All States', country: 'All Countries' },
  taxonExpanded: {},
  sidebarOpen: false,
};

export function reducer(state, action) {
  if (action.type === 'SEL_SPECIES_FILTER' || action.type === 'SEL_SUBCAT' || action.type === 'SET_PAGE') {
    console.log('[Reducer]', action.type, {
      speciesFilterValue: action.v?.name || action.v,
      subcatValue: action.v,
      pageValue: action.p
    });
  }
  
  switch (action.type) {
    case 'SET_PAGE':      return { ...state, page: action.p, sidebarOpen: false, selectedSpecies: null, selectedMember: null };
    case 'SET_SEARCH':    return { ...state, search: action.v };
    case 'STATS_LOAD':    return { ...state, statsLoading: true };
    case 'STATS_OK':      return { ...state, stats: action.v, statsLoading: false };
    case 'CAT_LOAD':      return { ...state, catLoading: true };
    case 'CAT_OK':        return { ...state, categories: action.v, catLoading: false };
    case 'SEL_CAT':       return { ...state, selectedCategory: action.v, selectedSubcat: 'all', selectedSpeciesFilter: null };
    case 'SEL_SUBCAT':    return { ...state, selectedSubcat: action.v };
    case 'SEL_SPECIES_FILTER': return { ...state, selectedSpeciesFilter: action.v };
    case 'SEL_SPECIES':   return { ...state, selectedSpecies: action.v };
    case 'TEAM_LOAD':     return { ...state, teamLoading: true };
    case 'TEAM_OK':       return { ...state, team: action.v, teamLoading: false };
    case 'SEL_MEMBER':    return { ...state, selectedMember: action.v };
    case 'SIGHT_LOAD':    return { ...state, sightingsLoading: true };
    case 'SIGHT_OK':      return { ...state, sightings: action.v, sightingsLoading: false };
    case 'MAP_FILTER':    return { ...state, mapFilter: { ...state.mapFilter, ...action.v } };
    case 'TAXON_TOGGLE':  return { ...state, taxonExpanded: { ...state.taxonExpanded, [action.id]: !state.taxonExpanded[action.id] } };
    case 'TOGGLE_SIDEBAR': return { ...state, sidebarOpen: !state.sidebarOpen };
    default: return state;
  }
}
