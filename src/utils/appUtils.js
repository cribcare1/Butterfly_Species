

// ─── Pure helpers ────────────────────────────────────────────────────────────

export function wikiImageUrl(imgName, width = 400) {
  if (!imgName) return null;

  if (imgName.startsWith('http')) {
    if (imgName.includes('commons.wikimedia.org')) {
      if (imgName.includes('/wiki/File:')) {
        const filename = imgName.split('/wiki/File:')[1].split('?')[0];
        return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
      }
      return imgName.includes('?')
        ? imgName.replace(/width=\d+/, `width=${width}`)
        : `${imgName}?width=${width}`;
    }
    return imgName;
  }

  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imgName)}?width=${width}`;
}

// ─── State bounds ─────────────────────────────────────────────────────────────

export const STATE_BOUNDS = [
  { state: 'Andhra Pradesh',      minLat: 12.6, maxLat: 19.9, minLng: 76.7, maxLng: 84.8 },
  { state: 'Arunachal Pradesh',   minLat: 26.7, maxLat: 29.5, minLng: 91.5, maxLng: 97.4 },
  { state: 'Assam',               minLat: 24.1, maxLat: 28.2, minLng: 89.7, maxLng: 96.0 },
  { state: 'Bihar',               minLat: 24.3, maxLat: 27.5, minLng: 83.3, maxLng: 88.3 },
  { state: 'Chhattisgarh',        minLat: 17.8, maxLat: 24.1, minLng: 80.2, maxLng: 84.4 },
  { state: 'Goa',                 minLat: 14.9, maxLat: 15.8, minLng: 73.7, maxLng: 74.4 },
  { state: 'Gujarat',             minLat: 20.1, maxLat: 24.7, minLng: 68.2, maxLng: 74.5 },
  { state: 'Haryana',             minLat: 27.7, maxLat: 30.9, minLng: 74.5, maxLng: 77.6 },
  { state: 'Himachal Pradesh',    minLat: 30.4, maxLat: 33.2, minLng: 75.6, maxLng: 79.0 },
  { state: 'Jharkhand',           minLat: 21.9, maxLat: 25.3, minLng: 83.3, maxLng: 87.9 },
  { state: 'Karnataka',           minLat: 11.6, maxLat: 18.4, minLng: 74.0, maxLng: 78.6 },
  { state: 'Kerala',              minLat:  8.1, maxLat: 12.8, minLng: 74.9, maxLng: 77.4 },
  { state: 'Madhya Pradesh',      minLat: 21.1, maxLat: 26.9, minLng: 74.0, maxLng: 82.8 },
  { state: 'Maharashtra',         minLat: 15.6, maxLat: 22.0, minLng: 72.6, maxLng: 80.9 },
  { state: 'Manipur',             minLat: 23.8, maxLat: 25.7, minLng: 93.0, maxLng: 94.8 },
  { state: 'Meghalaya',           minLat: 25.0, maxLat: 26.1, minLng: 89.8, maxLng: 92.8 },
  { state: 'Mizoram',             minLat: 21.9, maxLat: 24.5, minLng: 92.2, maxLng: 93.4 },
  { state: 'Nagaland',            minLat: 25.2, maxLat: 27.0, minLng: 93.3, maxLng: 95.3 },
  { state: 'Odisha',              minLat: 17.8, maxLat: 22.6, minLng: 81.4, maxLng: 87.5 },
  { state: 'Punjab',              minLat: 29.5, maxLat: 32.5, minLng: 73.9, maxLng: 76.9 },
  { state: 'Rajasthan',           minLat: 23.1, maxLat: 30.2, minLng: 69.5, maxLng: 78.3 },
  { state: 'Sikkim',              minLat: 27.1, maxLat: 28.1, minLng: 88.0, maxLng: 88.9 },
  { state: 'Tamil Nadu',          minLat:  8.1, maxLat: 13.6, minLng: 76.2, maxLng: 80.4 },
  { state: 'Telangana',           minLat: 15.8, maxLat: 19.9, minLng: 77.2, maxLng: 81.3 },
  { state: 'Tripura',             minLat: 22.9, maxLat: 24.5, minLng: 91.2, maxLng: 92.3 },
  { state: 'Uttar Pradesh',       minLat: 23.9, maxLat: 30.4, minLng: 77.1, maxLng: 84.6 },
  { state: 'Uttarakhand',         minLat: 28.7, maxLat: 31.5, minLng: 77.6, maxLng: 81.1 },
  { state: 'West Bengal',         minLat: 21.5, maxLat: 27.2, minLng: 85.8, maxLng: 89.9 },
];

export function detectStateFromCoords(lat, lng) {
  for (const b of STATE_BOUNDS) {
    if (lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng) {
      return b.state;
    }
  }
  return '';
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

// ─── No dummy stats — fetched live from API ───────────────────────────────────

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
    imageUrl:         wikiImageUrl(f.image_url || f.file_name, 800),
    id:               f.file_name,
    file_name:        f.file_name,
    latitude:         parseFloat(f.latitude  || '0'),
    longitude:        parseFloat(f.longitude || '0'),
    image_url:        f.image_url,
    upload_timestamp: f.upload_timestamp,
    display_name:     f.file_name
                        .replace(/_/g, ' ')
                        .replace(/\.(jpg|jpeg|png|webp)$/i, ''),
  }));
}

function _buildSighting(f, lat, lng, category) {
  const state = detectStateFromCoords(lat, lng);
  const fileName = f.file_name || f.img_name || '';
  const displayName = fileName.replace(/_/g, ' ').replace(/\.(jpg|jpeg|png|webp)$/i, '');
  return {
    id:         `wlb-${fileName || Math.random()}`,
    species:    displayName || category.replace(/_/g, ' '),
    scientific: category.replace(/_/g, ' '),
    region:     state || 'India',
    state,
    country:    'India',
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

export async function fetchWLBIndiaSightings() {
  const response = await fetch(
    'https://wlbapi.toolforge.org/api/wlb/taxonomy/tree-search?category=WLB_India'
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();

  const sightings = [];

  const stack = [{ node: data?.result || data, category: 'WLB_India' }];
  while (stack.length) {
    const { node, category } = stack.pop();
    if (!node || typeof node !== 'object') continue;

    const currentCategory = node.category || category;

    for (const f of (node.files || [])) {
      const lat = parseFloat(f.latitude  ?? f.lat ?? '');
      const lng = parseFloat(f.longitude ?? f.lng ?? '');
      if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
        sightings.push(_buildSighting(f, lat, lng, currentCategory));
      }
    }

    for (const child of (node.children || [])) {
      stack.push({ node: child, category: currentCategory });
    }
  }

  console.log(`[fetchWLBIndiaSightings] GPS sightings found: ${sightings.length}`);
  return sightings;
}

export function buildSightingsFromFeatured(featuredImages) {
  return featuredImages
    .filter(f => f.latitude !== 0 || f.longitude !== 0)
    .map((f, i) => {
      const state = detectStateFromCoords(f.latitude, f.longitude);
      return {
        id:         `f${i}`,
        species:    f.display_name,
        scientific: '',
        region:     state || 'India',
        state,
        country:    'India',
        lat:        f.latitude,
        lng:        f.longitude,
        date:       f.upload_timestamp
                      ? `${f.upload_timestamp.slice(0,4)}-${f.upload_timestamp.slice(4,6)}-${f.upload_timestamp.slice(6,8)}`
                      : '',
        confidence: 'Confirmed',
        imageUrl:   f.file_url ? wikiImageUrl(f.file_url, 400) : wikiImageUrl(f.img_name, 400),
        family:     '',
      };
    });
}

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
        scientific: node.category,
        name:       node.category.replace(/_/g, ' '),
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
  const fam = FAMILY_META[fi];
  const treeData = await fetchTaxonomyTree(familyName);
  const treeResult = treeData?.result || null;
  const speciesDefs = extractSpeciesFromTree(treeResult);

  const species = speciesDefs.map((sp, si) => {
    const firstImg = sp.images[0];
    let imageUrl = null;
    if (firstImg?.file_url)  imageUrl = wikiImageUrl(firstImg.file_url, 400);
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

// ─── Stats — fetched live from project-info API ───────────────────────────────

export async function fetchStats() {
  const response = await fetch('https://wlbapi.toolforge.org/api/wlb/project-info');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const json = await response.json();

// console.log("info"+json);

  // API response shape: { status, project, last_updated, data: { ... } }
  const d = json?.data ?? {};
//   console.log("info data"+d);

  return {
    imagesUploaded: d.images_uploaded_so_far  ?? d.total_files             ?? null,
    speciesTotal:   null,                      // not returned by this API
    pageViews:      d.total_views_since_2023_11 ?? null,
    contributors:   d.total_unique_contributors ?? null,
    districts:      d.total_districts          ?? null,
    statesActive:   d.total_states             ?? null,
    papers:         d.number_of_publish        ?? null,
    qualityImages:  d.quality_images           ?? null,
    // bonus fields available if you want to show them later
    featuredPictures: d.featured_pictures      ?? null,
    valuedImages:     d.valued_images          ?? null,
    districtsIndia:   d.districts_india        ?? null,
    districtsBhutan:  d.districts_bhutan       ?? null,
  };
}