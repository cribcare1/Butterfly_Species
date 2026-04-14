

export const API_ENDPOINTS = {
  // Mock Data Endpoints
  CATEGORIES: {
    path: '/categories',
    method: 'GET',
    type: 'mock',
    description: 'Fetch all butterfly species categories'
  },

  TEAM: {
    path: '/team',
    method: 'GET',
    type: 'mock',
    description: 'Fetch team members'
  },

  STATS: {
    path: '/stats',
    method: 'GET',
    type: 'mock',
    description: 'Fetch conservation statistics'
  },

  SIGHTINGS: {
    path: '/sightings',
    method: 'GET',
    type: 'mock',
    description: 'Fetch butterfly sightings with optional filters'
  },

  // WLB (Wiki Loves Butterfly) API Endpoints
  // Uses relative path /api/wlb
  // Development: proxied via package.json proxy to https://wlbapi.toolforge.org
  // Production: proxied via public/_redirects
  WLB_BASE: 'https://wlbapi.toolforge.org/api/wlb',

  WLB_IMAGES_BY_SPECIES: {
    path: '/images-by-species',
    method: 'GET',
    type: 'external',
    baseUrl: '/api/wlb',
    description: 'Fetch Wikimedia Commons images for a specific species'
  },

  WLB_IMAGES_BY_TYPE: {
    path: '/images-by-type',
    method: 'GET',
    type: 'external',
    baseUrl: 'https://wlbapi.toolforge.org/api/wlb',
    description: 'Fetch Wikimedia Commons images by type (e.g. feature)'
  },

  WLB_TAXONOMY_TREE: {
    path: '/taxonomy/tree-search',
    method: 'GET',
    type: 'external',
    baseUrl: 'https://wlbapi.toolforge.org/api/wlb',
    description: 'Fetch taxonomy tree for a category'
  },

  WLB_TAXONOMY_SUBTREE: {
    path: '/taxonomy/subtree',
    method: 'GET',
    type: 'external',
    baseUrl: 'https://wlbapi.toolforge.org/api/wlb',
    description: 'Fetch taxonomy subtree for a category'
  }
};

/**
 * URL Builder utility
 * Constructs full URLs with query parameters
 */
export class URLBuilder {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  buildUrl(path, params = {}) {
    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

    const url = `${this.baseUrl}${path}${query ? `?${query}` : ''}`;
    return url;
  }

  buildEndpointUrl(endpoint, params = {}) {
    const baseUrl = endpoint.baseUrl || this.baseUrl;
    const builder = new URLBuilder(baseUrl);
    return builder.buildUrl(endpoint.path, params);
  }
}

/**
 * Endpoint resolver
 * Determines endpoint type and route
 */
export function resolveEndpoint(url) {
  for (const [key, endpoint] of Object.entries(API_ENDPOINTS)) {
    if (key === 'WLB_BASE') continue;

    if (typeof endpoint === 'object' && endpoint.path && url.includes(endpoint.path)) {
      return { key, endpoint, type: endpoint.type };
    }
  }

  return { key: null, endpoint: null, type: 'unknown' };
}

/**
 * Get endpoints by type filter
 */
export function getEndpointsByType(type) {
  return Object.entries(API_ENDPOINTS)
    .filter(([key, endpoint]) =>
      key !== 'WLB_BASE' &&
      typeof endpoint === 'object' &&
      endpoint.type === type
    )
    .reduce((acc, [key, endpoint]) => {
      acc[key] = endpoint;
      return acc;
    }, {});
}

export default API_ENDPOINTS;