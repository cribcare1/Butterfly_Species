
export function wikiImageUrl(imgName, width = 400, height = null) {
  if (!imgName) return null;

  const sizeParam = height ? `width=${width}&height=${height}` : `width=${width}`;

  if (imgName.startsWith('http')) {
    if (imgName.includes('commons.wikimedia.org')) {
      if (imgName.includes('/wiki/File:')) {
        const filename = imgName.split('/wiki/File:')[1].split('?')[0];
        return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?${sizeParam}`;
      }
      if (imgName.includes('?')) {
        let url = imgName.replace(/width=\d+/, `width=${width}`);
        if (height) {
          url = url.includes('height=')
            ? url.replace(/height=\d+/, `height=${height}`)
            : `${url}&height=${height}`;
        }
        return url;
      }
      return `${imgName}?${sizeParam}`;
    }
    return imgName;
  }

  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imgName)}?${sizeParam}`;
}

// ─── Known Indian state/UT names ─────────────────────────────────────────────
const INDIA_STATE_NAMES = new Set([
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Ladakh', 'Jammu and Kashmir', 'Puducherry',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep',
]);

// ─── Known Bhutan district names ─────────────────────────────────────────────
const BHUTAN_DISTRICT_MAP = {
  'Zhemgang_District':         'Zhemgang District',
  'Trashigang_District':       'Trashigang District',
  'Samdrup_Jongkhar_District': 'Samdrup Jongkhar District',
  'Chukha_district':           'Chukha District',
  'Punakha_district':          'Punakha District',
  'Thimphu_district':          'Thimphu District',
  'Paro_district':             'Paro District',
  'Chelela_Pass':              'Chelela Pass',
  'Dochula_Pass':              'Dochula Pass',
};
const BHUTAN_DISTRICT_KEYS = new Set(
  Object.keys(BHUTAN_DISTRICT_MAP).map(k => k.toLowerCase())
);

// ─── State bounding boxes ─────────────────────────────────────────────────────
const STATE_BOUNDS = {
  'Andhra Pradesh':              { minLat: 12.62080, maxLat: 19.90820, minLng: 76.76230, maxLng: 84.81820 },
  'Arunachal Pradesh':           { minLat: 26.63420, maxLat: 29.46730, minLng: 91.51580, maxLng: 97.41220 },
  'Assam':                       { minLat: 24.11770, maxLat: 27.96080, minLng: 89.69550, maxLng: 96.01850 },
  'Bihar':                       { minLat: 24.29200, maxLat: 27.52170, minLng: 83.32550, maxLng: 88.29820 },
  'Chhattisgarh':                { minLat: 17.78090, maxLat: 24.13220, minLng: 80.24580, maxLng: 84.39500 },
  'Goa':                         { minLat: 14.89730, maxLat: 15.80180, minLng: 73.66690, maxLng: 74.32580 },
  'Gujarat':                     { minLat: 20.07280, maxLat: 24.72450, minLng: 68.16280, maxLng: 74.47820 },
  'Haryana':                     { minLat: 27.65230, maxLat: 30.90380, minLng: 74.46230, maxLng: 77.60450 },
  'Himachal Pradesh':            { minLat: 30.38650, maxLat: 33.19220, minLng: 75.58880, maxLng: 79.00480 },
  'Jharkhand':                   { minLat: 21.97220, maxLat: 25.31820, minLng: 83.33080, maxLng: 87.95580 },
  'Karnataka':                   { minLat: 11.59330, maxLat: 18.45230, minLng: 74.05280, maxLng: 78.58820 },
  'Kerala':                      { minLat:  8.07680, maxLat: 12.79180, minLng: 74.85880, maxLng: 77.41920 },
  'Madhya Pradesh':              { minLat: 21.07780, maxLat: 26.87230, minLng: 74.02780, maxLng: 82.80820 },
  'Maharashtra':                 { minLat: 15.60550, maxLat: 22.01720, minLng: 72.65880, maxLng: 80.89580 },
  'Manipur':                     { minLat: 23.83780, maxLat: 25.68580, minLng: 92.95280, maxLng: 94.78280 },
  'Meghalaya':                   { minLat: 24.99730, maxLat: 26.11480, minLng: 89.81580, maxLng: 92.80280 },
  'Mizoram':                     { minLat: 21.94280, maxLat: 24.53020, minLng: 92.25880, maxLng: 93.43580 },
  'Nagaland':                    { minLat: 25.16730, maxLat: 27.03780, minLng: 93.33080, maxLng: 95.25280 },
  'Odisha':                      { minLat: 17.78080, maxLat: 22.56480, minLng: 81.37880, maxLng: 87.47880 },
  'Punjab':                      { minLat: 29.55180, maxLat: 32.50580, minLng: 73.87880, maxLng: 76.92580 },
  'Rajasthan':                   { minLat: 23.06280, maxLat: 30.19480, minLng: 69.47780, maxLng: 78.26280 },
  'Sikkim':                      { minLat: 27.07280, maxLat: 28.13180, minLng: 87.99280, maxLng: 88.91580 },
  'Tamil Nadu':                  { minLat:  8.07680, maxLat: 13.57830, minLng: 76.22880, maxLng: 80.35180 },
  'Telangana':                   { minLat: 15.80080, maxLat: 19.92880, minLng: 77.21280, maxLng: 81.33880 },
  'Tripura':                     { minLat: 22.94780, maxLat: 24.53480, minLng: 91.15480, maxLng: 92.33580 },
  'Uttar Pradesh':               { minLat: 23.87280, maxLat: 30.40880, minLng: 77.08880, maxLng: 84.63580 },
  'Uttarakhand':                 { minLat: 28.71580, maxLat: 31.45280, minLng: 77.57780, maxLng: 81.06080 },
  'West Bengal':                 { minLat: 21.52780, maxLat: 27.22480, minLng: 85.84280, maxLng: 89.89280 },
  'Delhi':                       { minLat: 28.40430, maxLat: 28.88330, minLng: 76.83880, maxLng: 77.34830 },
  'Ladakh':                      { minLat: 31.98780, maxLat: 35.67380, minLng: 75.02580, maxLng: 80.01280 },
  'Jammu and Kashmir':           { minLat: 32.27580, maxLat: 36.58580, minLng: 73.74580, maxLng: 80.35580 },
  'Puducherry':                  { minLat: 11.61930, maxLat: 12.07580, minLng: 79.60580, maxLng: 80.01280 },
  'Andaman and Nicobar Islands': { minLat:  6.74580, maxLat: 13.68580, minLng: 92.19580, maxLng: 93.94580 },
  'Chandigarh':                  { minLat: 30.62080, maxLat: 30.82580, minLng: 76.70780, maxLng: 76.90580 },
  'Dadra and Nagar Haveli':      { minLat: 20.05580, maxLat: 20.62580, minLng: 72.90580, maxLng: 73.28580 },
  'Daman and Diu':               { minLat: 20.34580, maxLat: 20.71580, minLng: 70.82580, maxLng: 73.02580 },
  'Lakshadweep':                 { minLat:  8.00580, maxLat: 12.01580, minLng: 71.74580, maxLng: 74.12580 },
};

// ─── Bhutan district bounding boxes ──────────────────────────────────────────
const BHUTAN_DISTRICT_BOUNDS = {
  'Zhemgang District':         { minLat: 27.01280, maxLat: 27.79580, minLng: 90.51280, maxLng: 91.28580 },
  'Trashigang District':       { minLat: 27.07580, maxLat: 27.68580, minLng: 91.48580, maxLng: 92.12580 },
  'Samdrup Jongkhar District': { minLat: 26.71580, maxLat: 27.19580, minLng: 91.47580, maxLng: 91.98580 },
  'Chukha District':           { minLat: 26.72580, maxLat: 27.31580, minLng: 89.31580, maxLng: 90.01580 },
  'Punakha District':          { minLat: 27.51580, maxLat: 27.98580, minLng: 89.68580, maxLng: 90.23580 },
  'Thimphu District':          { minLat: 27.28580, maxLat: 28.02580, minLng: 89.27580, maxLng: 90.01580 },
  'Paro District':             { minLat: 27.18580, maxLat: 27.68580, minLng: 89.18580, maxLng: 89.72580 },
  'Chelela Pass':              { minLat: 27.31580, maxLat: 27.61580, minLng: 89.20580, maxLng: 89.58580 },
  'Dochula Pass':              { minLat: 27.41580, maxLat: 27.68580, minLng: 89.72580, maxLng: 90.08580 },
};

// ─── Coordinate validator ─────────────────────────────────────────────────────
function isValidRegionCoord(lat, lng) {
  const la = Number(lat);
  const lo = Number(lng);
  return (
    lat != null && lng != null &&
    lat !== '' && lng !== '' &&
    Number.isFinite(la) && Number.isFinite(lo) &&
    la !== 0 && lo !== 0 &&
    la >= 6.0  && la <= 37.5 &&
    lo >= 68.0 && lo <= 97.5
  );
}

// ─── State / district bounds validator ───────────────────────────────────────
function isCoordInState(lat, lng, state, district) {
  if (state && STATE_BOUNDS[state]) {
    const b = STATE_BOUNDS[state];
    if (lat < b.minLat || lat > b.maxLat || lng < b.minLng || lng > b.maxLng) {
      return false;
    }
  }
  if (district && BHUTAN_DISTRICT_BOUNDS[district]) {
    const b = BHUTAN_DISTRICT_BOUNDS[district];
    if (lat < b.minLat || lat > b.maxLat || lng < b.minLng || lng > b.maxLng) {
      return false;
    }
  }
  return true;
}

// ─── Sighting data validator ──────────────────────────────────────────────────
function isValidSightingData(f, country, state) {
  const fileName = (f.file_name || f.img_name || '').trim();
  if (!fileName) return false;
  if (!country || country === 'Unknown') return false;
  if (country === 'India' && !state) return false;
  return true;
}

// ─── resolveLocationFromPath ──────────────────────────────────────────────────
function resolveLocationFromPath(categoryPath) {
  let country  = '';
  let state    = '';
  let district = '';

  for (const cat of categoryPath) {
    if (!cat) continue;

    const raw = cat.startsWith('WLB_') ? cat.replace(/^WLB_/, '') : cat;

    if (raw === 'India')  { country = 'India';  continue; }
    if (raw === 'Bhutan') { country = 'Bhutan'; continue; }

    const asState = raw.replace(/_/g, ' ');
    if (INDIA_STATE_NAMES.has(asState)) {
      if (!country) country = 'India';
      state = asState;
      continue;
    }

    const rawLower = raw.toLowerCase();
    if (BHUTAN_DISTRICT_KEYS.has(rawLower)) {
      const key = Object.keys(BHUTAN_DISTRICT_MAP)
        .find(k => k.toLowerCase() === rawLower);
      if (key) {
        district = BHUTAN_DISTRICT_MAP[key];
        if (!country) country = 'Bhutan';
      }
      continue;
    }
  }

  return { country, state, district };
}

// ─── _buildSighting ───────────────────────────────────────────────────────────
function _buildSighting(f, lat, lng, category, fullPath = []) {
  const { country, state, district } = resolveLocationFromPath(fullPath);

  const fileName    = f.file_name || f.img_name || '';
  const displayName = fileName.replace(/_/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '');

  return {
    id:         `wlb-${fileName || Math.random()}`,
    species:    displayName || category.replace(/_/g, ' '),
    scientific: category.replace(/_/g, ' '),
    region:     state || district || country || 'Unknown',
    country:    country || 'Unknown',
    state,
    district,
    lat,
    lng,
    date:       f.upload_timestamp
                  ? `${f.upload_timestamp.slice(0,4)}-${f.upload_timestamp.slice(4,6)}-${f.upload_timestamp.slice(6,8)}`
                  : '',
    confidence: 'Confirmed',
    imageUrl:   f.file_url ? wikiImageUrl(f.file_url, 400) : wikiImageUrl(fileName, 400),
    family:     category,
  };
}

// ─── _traverseTree ────────────────────────────────────────────────────────────
function _traverseTree(rootNode, rootCategory, sightings, onProgress) {
  let rejectedCount = 0;

  const stack = [{
    node:         rootNode,
    category:     rootNode?.category || rootCategory,
    ancestorPath: [],
  }];

  while (stack.length) {
    const { node, category, ancestorPath } = stack.pop();
    if (!node || typeof node !== 'object') continue;

    const currentCategory = node.category || category;
    const currentPath     = [...ancestorPath, currentCategory];

    for (const f of (node.files || [])) {
      const rawLat = f.latitude  ?? f.lat  ?? null;
      const rawLng = f.longitude ?? f.lng  ?? null;
      const lat    = rawLat === null || rawLat === '' ? NaN : parseFloat(rawLat);
      const lng    = rawLng === null || rawLng === '' ? NaN : parseFloat(rawLng);

      if (!isValidRegionCoord(lat, lng)) continue;

      const { country, state, district } = resolveLocationFromPath(currentPath);

      if (!isValidSightingData(f, country, state)) continue;

      if (!isCoordInState(lat, lng, state, district)) {
        rejectedCount++;
        console.warn(
          `[bounds-reject] "${f.file_name}" tagged as "${state || district}" ` +
          `but coords (${lat}, ${lng}) are outside bounds`
        );
        continue;
      }

      sightings.push(_buildSighting(f, lat, lng, currentCategory, currentPath));

      if (onProgress && sightings.length % 50 === 0) {
        onProgress(sightings.length);
      }
    }

    for (const child of (node.children || [])) {
      stack.push({
        node:         child,
        category:     child.category || currentCategory,
        ancestorPath: currentPath,
      });
    }
  }

  return rejectedCount;
}

// ─── fetchWLBIndiaSightings ───────────────────────────────────────────────────
export async function fetchWLBIndiaSightings(onProgress) {
  const [indiaRes, bhutanRes] = await Promise.allSettled([
    fetch('https://wlbapi.toolforge.org/api/wlb/taxonomy/tree-search?category=WLB_India'),
    fetch('https://wlbapi.toolforge.org/api/wlb/taxonomy/tree-search?category=WLB_Bhutan'),
  ]);

  const sightings     = [];
  let   rejectedCount = 0;

  if (indiaRes.status === 'fulfilled' && indiaRes.value.ok) {
    const indiaData = await indiaRes.value.json();
    const indiaRoot = indiaData?.result || indiaData;
    rejectedCount += _traverseTree(indiaRoot, 'WLB_India', sightings, onProgress);
    console.log(`[WLB] India sightings: ${sightings.length}`);
  } else {
    console.error('[WLB] India fetch failed:', indiaRes.reason ?? indiaRes.value?.status);
  }

  const afterIndia = sightings.length;

  if (bhutanRes.status === 'fulfilled' && bhutanRes.value.ok) {
    const bhutanData = await bhutanRes.value.json();
    const bhutanRoot = bhutanData?.result || bhutanData;
    rejectedCount += _traverseTree(bhutanRoot, 'WLB_Bhutan', sightings, onProgress);
    console.log(`[WLB] Bhutan sightings added: ${sightings.length - afterIndia}`);
  } else {
    console.error('[WLB] Bhutan fetch failed:', bhutanRes.reason ?? bhutanRes.value?.status);
  }

  if (onProgress && sightings.length % 50 !== 0) {
    onProgress(sightings.length);
  }

  console.log(`[WLB] total: ${sightings.length} valid | ${rejectedCount} bounds-rejected`);
  return sightings;
}

// ─── buildSightingsFromFeatured ───────────────────────────────────────────────
export function buildSightingsFromFeatured(featuredImages) {
  return featuredImages
    .filter(f => f.display_name && f.display_name.trim())
    .map((f, i) => ({
      id:         `f${i}`,
      species:    f.display_name,
      scientific: '',
      region:     'India',
      country:    'India',
      state:      '',
      district:   '',
      date:       f.upload_timestamp
                    ? `${f.upload_timestamp.slice(0,4)}-${f.upload_timestamp.slice(4,6)}-${f.upload_timestamp.slice(6,8)}`
                    : '',
      confidence: 'Confirmed',
      imageUrl:   f.file_url ? wikiImageUrl(f.file_url, 400) : wikiImageUrl(f.img_name, 400),
      family:     '',
    }));
}

// ─── Family metadata ──────────────────────────────────────────────────────────

export const FAMILY_META = [
  { name: 'Papilionidae', common: 'Swallowtails',     color: '#f59e0b', description: 'The largest and most spectacular butterflies, known for tail-like hindwing extensions and brilliant coloration.' },
  { name: 'Nymphalidae',  common: 'Brush-footed',     color: '#8b5cf6', description: "The largest butterfly family. Front legs are reduced and brush-like. Includes India's most recognizable species." },
  { name: 'Pieridae',     common: 'Whites & Yellows', color: '#eab308', description: 'Medium-sized butterflies typically white or yellow. Include many garden species and long-distance migrants.' },
  { name: 'Lycaenidae',   common: 'Blues & Coppers',  color: '#60a5fa', description: 'Small, often iridescent butterflies. Many have fascinating relationships with ants during larval stages.' },
  { name: 'Hesperiidae',  common: 'Skippers',         color: '#f97316', description: 'Fast-flying butterflies with distinctive hooked antennae tips. Often hold wings at different angles.' },
  { name: 'Riodinidae',   common: 'Metalmarks',       color: '#34d399', description: 'Small to medium butterflies with metallic spots. Many have complex ecological relationships.' },
];

export const FALLBACK_STATS = null;

export const STATIC_TEAM = [
  { id:'t1', name:'Dr. Meera Nair',      role:'Founder & Chief Lepidopterist', dept:'Research',     initials:'MN', color:'#4ade80', experience:20, publications:47, fieldTrips:180, species_described:3, bio:'Pioneer in butterfly migration research across South Asia.',     education:'PhD Entomology, IISc Bangalore',        specialization:'Migration Ecology, Population Genetics',  awards:['BNHS Gold Medal 2019'],          social:{ email:'meera@butterfly.in' } },
  { id:'t2', name:'Arjun Krishnamurthy', role:'Senior Field Researcher',       dept:'Research',     initials:'AK', color:'#60a5fa', experience:12, publications:18, fieldTrips:210, species_described:1, bio:'Wildlife photographer turned field researcher.',                  education:'MSc Wildlife Biology, WII Dehradun',   specialization:'Behavioral Ecology, Photography',         awards:['BNHS Young Naturalist 2018'],    social:{ email:'arjun@butterfly.in' } },
  { id:'t3', name:'Priya Sharma',        role:'Data Science Lead',             dept:'Technology',   initials:'PS', color:'#f472b6', experience:8,  publications:12, fieldTrips:45,  species_described:0, bio:'Builds AI/ML models to predict butterfly habitat suitability.',  education:'BTech CS IIT Bombay',                  specialization:'Machine Learning, Climate Modelling',     awards:['DST Women in Science 2022'],     social:{ email:'priya@butterfly.in' } },
  { id:'t4', name:'Ravi Sundar',         role:'Community Science Lead',        dept:'Outreach',     initials:'RS', color:'#fb923c', experience:9,  publications:6,  fieldTrips:80,  species_described:0, bio:'Manages a network of 4,200+ citizen scientists.',                education:'MA Environmental Studies, JNU Delhi',  specialization:'Citizen Science, Conservation Education', awards:['UN Young Champion of Earth 2021'],social:{ email:'ravi@butterfly.in' } },
  { id:'t5', name:'Lakshmi Iyer',        role:'Conservation Policy Lead',      dept:'Conservation', initials:'LI', color:'#a78bfa', experience:14, publications:9,  fieldTrips:60,  species_described:0, bio:'Lobbied for three butterfly corridor notifications.',             education:'LLB Environmental Law, NLS Bangalore', specialization:'Environmental Law, Protected Areas',      awards:['IUCN Outstanding Service 2020'],social:{ email:'lakshmi@butterfly.in' } },
  { id:'t6', name:'Dr. Vikram Pillai',   role:'Taxonomist & Systematist',      dept:'Research',     initials:'VP', color:'#34d399', experience:18, publications:63, fieldTrips:120, species_described:7, bio:'Specialist in Papilionidae systematics.',                         education:'PhD Zoology, University of Kerala',    specialization:'Molecular Systematics, Phylogenetics',    awards:['BNHS Gold Medal 2017'],          social:{ email:'vikram@butterfly.in' } },
];

// ─── API fetch functions ──────────────────────────────────────────────────────

export async function fetchSpeciesImages(scientificName) {
  const param = scientificName.trim().replace(/ /g, '_');
  try {
    const response = await fetch(
      `https://wlbapi.toolforge.org/api/wlb/images-by-species?species=${encodeURIComponent(param)}`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching species images:', error);
    return [];
  }
}

export async function fetchFeaturedImages() {
  const response = await fetch('https://wlbapi.toolforge.org/api/wlb/images-by-type?type=feature');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return (data?.files || []).map(f => ({
    file_url:         f.image_url  || null,
    img_name:         f.file_name  || null,
    // Only width passed — no height — so Wikimedia returns full proportional image.
    imageUrl:         wikiImageUrl(f.image_url || f.file_name, 1200),
    id:               f.file_name,
    file_name:        f.file_name,
    image_url:        f.image_url,
    upload_timestamp: f.upload_timestamp,
    display_name:     f.file_name
                        .replace(/_/g, ' ')
                        .replace(/\.(jpg|jpeg|png|webp)$/i, ''),
  }));
}

// ─── Taxonomy helpers ─────────────────────────────────────────────────────────

export async function fetchTaxonomyTree(familyName) {
  const response = await fetch(
    `https://wlbapi.toolforge.org/api/wlb/taxonomy/tree-search?category=${encodeURIComponent(familyName)}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function isFileLeaf(node) {
  return node.type === 'files' || (Array.isArray(node.files) && node.files.length > 0);
}

function allChildrenAreFileLeaves(node) {
  return Array.isArray(node.children) &&
    node.children.length > 0 &&
    node.children.every(isFileLeaf);
}

export function extractSpeciesFromTree(treeResult) {
  const species = [];

  const stack = [{ node: treeResult, path: [] }];
  while (stack.length) {
    const { node, path } = stack.pop();
    if (!node) continue;

    if (isFileLeaf(node) && !Array.isArray(node.children)) {
      species.push({
        scientific:  node.category,
        name:        node.category.replace(/_/g, ' '),
        subcategory: path[0] || null,
        genus:       path[1] || null,
        path:        [...path, node.category],
        images:      (node.files || []).map(f => ({
          img_name:         f.file_name,
          file_url:         f.file_url,
          upload_timestamp: f.upload_timestamp,
        })),
      });
      continue;
    }

    if (allChildrenAreFileLeaves(node)) {
      const images = (node.children || []).flatMap(c =>
        (c.files || []).map(f => ({
          img_name:         f.file_name,
          file_url:         f.file_url,
          upload_timestamp: f.upload_timestamp,
        }))
      );
      species.push({
        scientific:  node.category,
        name:        node.category.replace(/_/g, ' '),
        subcategory: path[0] || null,
        genus:       path[1] || null,
        path:        [...path, node.category],
        images,
      });
      continue;
    }

    if (Array.isArray(node.children)) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], path: [...path, node.category] });
      }
    }
  }

  return species;
}

export function buildBaseCategories() {
  return FAMILY_META.map((fam, fi) => ({
    id:              `cat-${fi + 1}`,
    name:            fam.name,
    common:          fam.common,
    color:           fam.color,
    description:     fam.description,
    count:           0,
    conserved:       0,
    endangered:      0,
    subcategories:   [],
    species:         [],
    taxonomyTree:    null,
    taxonomyLoading: false,
  }));
}

export async function loadFamilyTaxonomy(familyName, fi) {
  const fam        = FAMILY_META[fi];
  const treeData   = await fetchTaxonomyTree(familyName);
  const treeResult = treeData?.result || null;
  const speciesDefs = extractSpeciesFromTree(treeResult);

  const species = speciesDefs.map((sp, si) => {
    const firstImg = sp.images[0];
    let imageUrl   = null;
    if (firstImg?.file_url)      imageUrl = wikiImageUrl(firstImg.file_url, 400);
    else if (firstImg?.img_name) imageUrl = wikiImageUrl(firstImg.img_name, 400);

    return {
      id:          `sp-${fi}-${si}`,
      name:        sp.name,
      scientific:  sp.name,
      subcategory: sp.subcategory,
      genus:       sp.genus,
      path:        sp.path,
      color:       fam.color,
      lat:         8  + ((fi * 37 + si * 13) % 28),
      lng:         68 + ((fi * 17 + si * 11) % 29),
      description: `${sp.name} — a member of ${familyName}.${sp.subcategory ? ` Subfamily: ${sp.subcategory}.` : ''}`,
      imageUrl,
      _images:     sp.images,
    };
  });

  return {
    count:         species.length,
    conserved:     Math.round(species.length * 0.4),
    endangered:    0,
    subcategories: [...new Set(species.map(s => s.subcategory).filter(Boolean))],
    species,
    taxonomyTree:  treeResult,
  };
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export async function fetchStats() {
  const response = await fetch('https://wlbapi.toolforge.org/api/wlb/project-info');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const json = await response.json();

  const d = json?.data ?? {};

  return {
    imagesUploaded:   d.images_uploaded_so_far   ?? d.total_files              ?? null,
    speciesTotal:     null,
    pageViews:        d.total_views_since_2023_11 ?? null,
    contributors:     d.total_unique_contributors ?? null,
    districts:        d.total_districts           ?? null,
    statesActive:     d.total_states              ?? null,
    papers:           d.number_of_publish         ?? null,
    qualityImages:    d.quality_images            ?? null,
    featuredPictures: d.featured_pictures         ?? null,
    valuedImages:     d.valued_images             ?? null,
    districtsIndia:   d.districts_india           ?? null,
    districtsBhutan:  d.districts_bhutan          ?? null,
  };
}