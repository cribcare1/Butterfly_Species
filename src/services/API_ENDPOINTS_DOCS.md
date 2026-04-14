/**
 * API ENDPOINTS DOCUMENTATION
 * 
 * Overview:
 * This documentation explains the centralized API endpoint management system
 * for the Butterfly Conservation App.
 * 
 * All API URLs, endpoints, and configurations are maintained in a single
 * location (apiEndpoints.js) to ensure consistency and easy maintenance.
 */

// ═══════════════════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * EXAMPLE 1: Basic API Call Through getService
 * 
 * Source: AppContext.jsx or any component using the common service layer
 * 
 *   const { getService } = await import('../services/commonService');
 *   
 *   // Call with endpoint path
 *   const images = await getService('/images-by-species', { 
 *     species: 'Papilio polytes' 
 *   });
 */

/**
 * EXAMPLE 2: Adding a New Endpoint
 * 
 * File: /src/services/apiEndpoints.js
 * 
 *   export const API_ENDPOINTS = {
 *     // ... existing endpoints ...
 *     
 *     NEW_ENDPOINT: {
 *       path: '/new-path',
 *       method: 'GET',
 *       type: 'external',     // 'mock' or 'external'
 *       baseUrl: '/api/wlb',
 *       description: 'What this endpoint does'
 *     }
 *   };
 */

/**
 * EXAMPLE 3: Using URLBuilder Directly
 * 
 * File: Any component or service
 * 
 *   import { URLBuilder, API_ENDPOINTS } from '../services/apiEndpoints';
 *   
 *   const builder = new URLBuilder(API_ENDPOINTS.WLB_BASE);
 *   const url = builder.buildUrl('/images-by-species', {
 *     species: 'Papilio buddha',
 *     limit: 10
 *   });
 *   // Result: /api/wlb/images-by-species?species=Papilio%20buddha&limit=10
 */

/**
 * EXAMPLE 4: Resolving Endpoint Type
 * 
 * File: commonService.js (used internally)
 * 
 *   import { resolveEndpoint } from '../services/apiEndpoints';
 *   
 *   const { type, endpoint, key } = resolveEndpoint('/teams');
 *   console.log(type);      // 'mock'
 *   console.log(key);       // 'TEAM'
 *   console.log(endpoint);  // { path: '/team', method: 'GET', ... }
 */

// ═══════════════════════════════════════════════════════════════════════════
// ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * API CALL FLOW:
 * 
 * Component/Context
 *     ↓
 * getService(url, params)  [commonService.js]
 *     ↓
 * resolveEndpoint(url)     [apiEndpoints.js]
 *     ↓
 * routeMockAPI() OR routeWLBAPI()
 *     ↓
 * Api.getCategories()  OR  fetch(wlbUrl)
 *     ↓
 * Response (JSON)
 */

// ═══════════════════════════════════════════════════════════════════════════
// ENDPOINT TYPES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * MOCK ENDPOINTS
 * 
 * Type: 'mock'
 * Location: /src/services/api.js
 * Data Source: /src/data/* files
 * 
 * Endpoints:
 * - CATEGORIES: /categories       → Api.getCategories()
 * - TEAM:       /team             → Api.getTeam()
 * - STATS:      /stats            → Api.getStats()
 * - SIGHTINGS:  /sightings        → Api.getSightings(params)
 * 
 * Usage:
 *   const data = await getService('/categories');
 */

/**
 * EXTERNAL ENDPOINTS (WLB API)
 * 
 * Type: 'external'
 * Base URL: /api/wlb
 * Destination: Wikimedia Commons API (proxied)
 * 
 * Endpoints:
 * 
 * 1. WLB_IMAGES_BY_SPECIES
 *    Path: /images-by-species
 *    Params: { species: string }
 *    Returns: Images for a specific butterfly species
 * 
 * 2. WLB_TAXONOMY_TREE
 *    Path: /taxonomy/tree-search
 *    Params: { category: string }
 *    Returns: Taxonomy tree for a category
 * 
 * 3. WLB_TAXONOMY_SUBTREE  
 *    Path: /taxonomy/subtree
 *    Params: { category: string }
 *    Returns: Subtree data for a category
 * 
 * Usage:
 *   const images = await getService('/images-by-species', {
 *     species: 'Papilio_polytes'
 *   });
 */

// ═══════════════════════════════════════════════════════════════════════════
// ADDING NEW ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * STEP 1: Add to apiEndpoints.js
 * 
 * export const API_ENDPOINTS = {
 *   // ... existing endpoints ...
 *   
 *   MY_NEW_ENDPOINT: {
 *     path: '/my-new-path',
 *     method: 'GET',  // or POST, PUT, DELETE
 *     type: 'mock',   // or 'external'
 *     baseUrl: (optional, defaults to WLB_BASE for external)
 *     description: 'Brief description'
 *   }
 * };
 */

/**
 * STEP 2: Add Handler in commonService.js
 * 
 * For mock endpoints:
 *   if (url.includes('my-new-path')) {
 *     return await Api.getMyNewData(params);
 *   }
 * 
 * For external endpoints:
 *   (Handled automatically by routeWLBAPI if type='external')
 */

/**
 * STEP 3: Use in Components/Context
 * 
 * const data = await getService('/my-new-path', params);
 */

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * URLBuilder Class
 * 
 * Constructs full URLs with proper query string formatting
 * 
 * Methods:
 * - buildUrl(path, params)          → Full URL string
 * - buildEndpointUrl(endpoint, params) → URL from endpoint config
 * 
 * Features:
 * - Automatic URL encoding
 * - Filters null/undefined parameters
 * - Combines base URL with path
 * 
 * Example:
 *   const builder = new URLBuilder('/api/wlb');
 *   const url = builder.buildUrl('/images-by-species', {
 *     species: 'Apollo butterfly',
 *     limit: 10
 *   });
 */

/**
 * resolveEndpoint(url)
 * 
 * Matches a URL string to an endpoint configuration
 * 
 * Returns object:
 * {
 *   key: 'ENDPOINT_NAME',
 *   endpoint: { path, method, type, ... },
 *   type: 'mock' | 'external' | 'unknown'
 * }
 * 
 * Example:
 *   const result = resolveEndpoint('/team');
 *   // { key: 'TEAM', endpoint: {...}, type: 'mock' }
 */

/**
 * getEndpointsByType(type)
 * 
 * Filters all endpoints by type
 * 
 * Parameters:
 * - type: 'mock' | 'external'
 * 
 * Returns:
 * - Object with matching endpoints
 * 
 * Example:
 *   const mockEndpoints = getEndpointsByType('mock');
 *   const externalEndpoints = getEndpointsByType('external');
 */

// ═══════════════════════════════════════════════════════════════════════════
// FILE STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * /src/services/
 * ├── api.js                    ← Mock API implementation
 * ├── apiEndpoints.js           ← ALL ENDPOINT DEFINITIONS (THIS FILE)
 * ├── commonService.js          ← Request routing logic
 * ├── useApi.js                 ← React hook for API calls
 * └── useApiPresenter.js        ← Response formatting (presenter pattern)
 */

// ═══════════════════════════════════════════════════════════════════════════
// TROUBLESHOOTING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Issue: Image data not showing
 * Solution: Check if /images-by-species endpoint is properly configured
 *           Verify WLB_BASE URL matches proxy configuration
 *           Enable console logging in routeWLBAPI()
 * 
 * Issue: New endpoint not recognized
 * Solution: Verify endpoint is added to API_ENDPOINTS object
 *           Check spelling and path format
 *           Ensure handler exists in commonService.js
 * 
 * Issue: Old endpoint errors still showing
 * Solution: Clear node_modules cache: rm -rf node_modules
 *           Restart development server
 *           Check for duplicate endpoint definitions
 */

// ═══════════════════════════════════════════════════════════════════════════
// RELATED FILES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Key Files:
 * - /src/services/apiEndpoints.js     ← Endpoint definitions
 * - /src/services/commonService.js    ← Request routing
 * - /src/context/AppContext.jsx       ← Uses getService()
 * - /src/components/api_services/useApi.js ← Hook wrapper
 * - package.json                      ← Proxy configuration
 */

export default {
  title: "API Endpoints Documentation",
  version: "1.0",
  lastUpdated: "2026-04-11"
};
