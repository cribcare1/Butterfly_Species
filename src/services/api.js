import { TAXON_CATEGORIES } from '../data/categories';
import { DUMMY_TEAM } from '../data/team';
import { SIGHTINGS } from '../data/sightings';
import { STATS } from '../data/stats';

const delay = ms => new Promise(r => setTimeout(r, ms));

export const Api = {
  async getCategories() { await delay(400); return TAXON_CATEGORIES; },
  async getTeam()       { await delay(300); return DUMMY_TEAM; },
  async getStats()      { await delay(200); return STATS; },
  async getSightings(filters = {}) {
    await delay(300);
    let d = [...SIGHTINGS];
    if (filters.state   && filters.state   !== 'All States')   d = d.filter(s => s.state   === filters.state);
    if (filters.country && filters.country !== 'All Countries') d = d.filter(s => s.country === filters.country);
    return d;
  },
};
