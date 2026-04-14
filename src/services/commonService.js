
import { Api } from './api';
import { API_ENDPOINTS, URLBuilder, resolveEndpoint } from './apiEndpoints';

/**
 * Generic service handler for all API calls
 * Routes requests to appropriate handlers (mock or external APIs)
 */
export const getService = async (url, params = {}) => {
  try {
    const { type, endpoint, key } = resolveEndpoint(url);

    console.log(`[getService] URL: ${url}, Type: ${type}, Endpoint: ${key}`);

    if (type === 'mock') {
      return await routeMockAPI(url, params);
    } else if (type === 'external') {
      return await routeWLBAPI(endpoint, params);
    } else {
      // Last-resort pattern match for images-by-species
      if (url.includes('images-by-species')) {
        return await routeWLBAPI(API_ENDPOINTS.WLB_IMAGES_BY_SPECIES, params);
      }
      console.warn(`[getService] No handler found for URL: ${url}`);
      return null;
    }
  } catch (error) {
    console.error(`[getService] Error fetching from ${url}:`, error);
    throw error;
  }
};

/**
 * Route mock API calls to the Api service
 */
async function routeMockAPI(url, params = {}) {
  console.log(`[routeMockAPI] Routing to mock API:`, { url, params });

  if (url.includes('categories'))  return await Api.getCategories();
  if (url.includes('team'))        return await Api.getTeam();
  if (url.includes('stats'))       return await Api.getStats();
  if (url.includes('sightings'))   return await Api.getSightings(params);

  throw new Error(`Unknown mock API route: ${url}`);
}

/**
 * Route WLB API calls using the endpoint's own baseUrl
 * so requests always hit the correct external host.
 */
async function routeWLBAPI(endpoint, params = {}) {
  // Use the endpoint's own baseUrl (full external URL) — never the local proxy
  const urlBuilder = new URLBuilder(endpoint.baseUrl);
  const fullUrl = urlBuilder.buildUrl(endpoint.path, params);

 
//  const end_url = `https://wlbapi.toolforge.org${fullUrl}`;
 const end_url = `${fullUrl}`;
  console.log(`[routeWLBAPI] Fetching:`, end_url);
  const res = await fetch(end_url, { headers: { Accept: 'application/json' } });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`WLB API non-JSON ${res.status}: ${text.substring(0, 80)}`);
  }

  if (!res.ok) {
    throw new Error(`WLB API error ${res.status}: ${endpoint.path}`);
  }

  const json = await res.json();
  console.log(`[routeWLBAPI] Response:`, json);
  return json;
}