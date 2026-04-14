

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

export function wikiImageUrl(imgName, width = 400) {
  console.log('[wikiImageUrl] Input:', imgName, 'width:', width);
  if (!imgName) { console.log('[wikiImageUrl] NULL INPUT - returning null'); return null; }

  if (imgName.startsWith('http')) {
    if (imgName.includes('commons.wikimedia.org')) {
      if (imgName.includes('/wiki/File:')) {
        const filename = imgName.split('/wiki/File:')[1].split('?')[0];
        const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
        console.log('[wikiImageUrl] Result (wiki/File: → FilePath):', url);
        return url;
      }
      const result = imgName.includes('?')
        ? imgName.replace(/width=\d+/, `width=${width}`)
        : `${imgName}?width=${width}`;
      console.log('[wikiImageUrl] Result (Wiki URL):', result);
      return result;
    }
    console.log('[wikiImageUrl] Result (direct URL):', imgName);
    return imgName;
  }

  const encoded = encodeURIComponent(imgName);
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=${width}`;
  console.log('[wikiImageUrl] Result (constructed):', url);
  return url;
}

export async function fetchSpeciesImages(scientificName) {
  const param = scientificName.trim().replace(/ /g, '_');
  try {
    console.log(`[fetchSpeciesImages] Fetching for:`, param);
    // Use relative URL just like fetchFeaturedImages does
    const response = await fetch(`/api/wlb/images-by-species?species=${encodeURIComponent(param)}`);
    
    if (!response.ok) {
      console.warn(`[fetchSpeciesImages] HTTP ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    console.log(`[fetchSpeciesImages] Response:`, data);
    
    const images = data?.data || [];
    console.log(`[fetchSpeciesImages] Returning ${images.length} images`);
    return images;
  } catch (error) {
    console.error('Error fetching species images:', error);
    return [];
  }
}

export async function fetchFeaturedImages() {
  const response = await fetch('/api/wlb/images-by-type?type=feature');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const files = data?.files || [];

  return files.map(f => ({
    file_url:         f.image_url  || null,
    img_name:         f.file_name  || null,
    imageUrl:         wikiImageUrl(f.image_url || f.file_name, 800), // ✅ FIXED
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

const FAMILY_SPECIES = {
  Papilionidae: [
    { scientific: 'Papilio_polytes',      name: 'Common Mormon',           subcategory: 'Papilioninae', status: 'Least Concern', wingspan: '90–100mm', habitat: 'Gardens, forests',    region: 'Pan-India',   diet: 'Citrus family',        flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Papilio_buddha',       name: 'Malabar Banded Peacock',  subcategory: 'Papilioninae', status: 'Endangered',    wingspan: '95–115mm', habitat: 'Shola forests',      region: 'Kerala',      diet: 'Rutaceae',             flightSeason: 'Apr–Aug',    discovered: 1891 },
    { scientific: 'Papilio_demoleus',     name: 'Lime Butterfly',          subcategory: 'Papilioninae', status: 'Least Concern', wingspan: '80–100mm', habitat: 'Gardens, orchards',  region: 'Pan-India',   diet: 'Citrus family',        flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Papilio_helenus',      name: 'Red Helen',               subcategory: 'Papilioninae', status: 'Least Concern', wingspan: '100–130mm',habitat: 'Dense forests',      region: 'Western Ghats', diet: 'Rutaceae',           flightSeason: 'Jun–Oct',    discovered: 1758 },
    { scientific: 'Graphium_sarpedon',    name: 'Common Bluebottle',       subcategory: 'Graphiini',    status: 'Least Concern', wingspan: '60–80mm',  habitat: 'Forests, streams',   region: 'Pan-India',   diet: 'Cinnamomum',           flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Graphium_agamemnon',   name: 'Tailed Jay',              subcategory: 'Graphiini',    status: 'Least Concern', wingspan: '60–80mm',  habitat: 'Gardens, forests',   region: 'Pan-India',   diet: 'Polyalthia',           flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Parnassius_apollo',    name: 'Apollo',                  subcategory: 'Parnassiinae', status: 'Vulnerable',    wingspan: '62–86mm',  habitat: 'Alpine meadows',     region: 'Himalayas',   diet: 'Stonecrop plants',     flightSeason: 'Jun–Aug',    discovered: 1758 },
    { scientific: 'Troides_minos',        name: 'Southern Birdwing',       subcategory: 'Papilioninae', status: 'Vulnerable',    wingspan: '140–190mm',habitat: 'Tropical forests',   region: 'Western Ghats', diet: 'Aristolochia',       flightSeason: 'Aug–Jan',    discovered: 1829 },
  ],
  Nymphalidae: [
    { scientific: 'Vanessa_cardui',       name: 'Painted Lady',            subcategory: 'Nymphalinae',  status: 'Least Concern', wingspan: '51–73mm',  habitat: 'Open fields',        region: 'Pan-India',   diet: 'Thistles, nettles',    flightSeason: 'Feb–Nov',    discovered: 1758 },
    { scientific: 'Tirumala_limniace',    name: 'Blue Tiger',              subcategory: 'Danainae',     status: 'Least Concern', wingspan: '70–95mm',  habitat: 'Forests, coasts',    region: 'Pan-India',   diet: 'Crotalaria',           flightSeason: 'Aug–Dec',    discovered: 1758 },
    { scientific: 'Danaus_chrysippus',    name: 'Plain Tiger',             subcategory: 'Danainae',     status: 'Least Concern', wingspan: '65–80mm',  habitat: 'Open areas',         region: 'Pan-India',   diet: 'Calotropis',           flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Danaus_genutia',       name: 'Striped Tiger',           subcategory: 'Danainae',     status: 'Least Concern', wingspan: '70–90mm',  habitat: 'Forests, gardens',   region: 'Pan-India',   diet: 'Asclepiadaceae',       flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Euploea_core',         name: 'Common Crow',             subcategory: 'Danainae',     status: 'Least Concern', wingspan: '70–90mm',  habitat: 'Forests, parks',     region: 'Pan-India',   diet: 'Ficus, Nerium',        flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Junonia_lemonias',     name: 'Lemon Pansy',             subcategory: 'Nymphalinae',  status: 'Least Concern', wingspan: '44–58mm',  habitat: 'Gardens, fields',    region: 'Pan-India',   diet: 'Hygrophila',           flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Junonia_orithya',      name: 'Blue Pansy',              subcategory: 'Nymphalinae',  status: 'Least Concern', wingspan: '44–62mm',  habitat: 'Open fields',        region: 'Pan-India',   diet: 'Plantago, Barleria',   flightSeason: 'Year-round', discovered: 1764 },
    { scientific: 'Neptis_hylas',         name: 'Common Sailer',           subcategory: 'Limenitidinae',status: 'Least Concern', wingspan: '50–64mm',  habitat: 'Forest edges',       region: 'Pan-India',   diet: 'Millettia',            flightSeason: 'Year-round', discovered: 1758 },
  ],
  Pieridae: [
    { scientific: 'Delias_eucharis',      name: 'Common Jezebel',          subcategory: 'Pierinae',     status: 'Least Concern', wingspan: '65–75mm',  habitat: 'Forests, gardens',   region: 'Pan-India',   diet: 'Loranthus',            flightSeason: 'Oct–Mar',    discovered: 1793 },
    { scientific: 'Catopsilia_pomona',    name: 'Common Emigrant',         subcategory: 'Coliadinae',   status: 'Least Concern', wingspan: '58–72mm',  habitat: 'Gardens, scrub',     region: 'Pan-India',   diet: 'Cassia',               flightSeason: 'Year-round', discovered: 1775 },
    { scientific: 'Catopsilia_pyranthe',  name: 'Mottled Emigrant',        subcategory: 'Coliadinae',   status: 'Least Concern', wingspan: '58–72mm',  habitat: 'Gardens, forests',   region: 'Pan-India',   diet: 'Cassia',               flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Eurema_hecabe',        name: 'Common Grass Yellow',     subcategory: 'Coliadinae',   status: 'Least Concern', wingspan: '35–48mm',  habitat: 'Grasslands',         region: 'Pan-India',   diet: 'Cassia, Mimosa',       flightSeason: 'Year-round', discovered: 1758 },
    { scientific: 'Appias_libythea',      name: 'Striped Albatross',       subcategory: 'Pierinae',     status: 'Least Concern', wingspan: '55–65mm',  habitat: 'Forests, clearings', region: 'Pan-India',   diet: 'Capparis',             flightSeason: 'Year-round', discovered: 1775 },
    { scientific: 'Cepora_nerissa',       name: 'Common Gull',             subcategory: 'Pierinae',     status: 'Least Concern', wingspan: '50–62mm',  habitat: 'Forests, gardens',   region: 'Pan-India',   diet: 'Capparis',             flightSeason: 'Year-round', discovered: 1775 },
  ],
  Lycaenidae: [
    { scientific: 'Zizula_hylax',         name: 'Tiny Grass Blue',         subcategory: 'Polyommatinae',status: 'Least Concern', wingspan: '16–22mm',  habitat: 'Grasslands',         region: 'Pan-India',   diet: 'Indigofera',           flightSeason: 'Year-round', discovered: 1775 },
    { scientific: 'Chilades_pandava',     name: 'Plains Cupid',            subcategory: 'Polyommatinae',status: 'Least Concern', wingspan: '22–28mm',  habitat: 'Gardens, parks',     region: 'Pan-India',   diet: 'Cycas',                flightSeason: 'Year-round', discovered: 1820 },
    { scientific: 'Lampides_boeticus',    name: 'Pea Blue',                subcategory: 'Polyommatinae',status: 'Least Concern', wingspan: '28–38mm',  habitat: 'Gardens, fields',    region: 'Pan-India',   diet: 'Leguminosae',          flightSeason: 'Year-round', discovered: 1767 },
    { scientific: 'Jamides_celeno',       name: 'Common Cerulean',         subcategory: 'Polyommatinae',status: 'Least Concern', wingspan: '28–35mm',  habitat: 'Forests',            region: 'Pan-India',   diet: 'Derris, Millettia',    flightSeason: 'Year-round', discovered: 1794 },
    { scientific: 'Tajuria_cippus',       name: 'Peacock Royal',           subcategory: 'Theclinae',    status: 'Least Concern', wingspan: '38–46mm',  habitat: 'Dense forests',      region: 'Western Ghats', diet: 'Loranthus',          flightSeason: 'Feb–Apr',    discovered: 1830 },
    { scientific: 'Spindasis_vulcanus',   name: 'Common Silverline',       subcategory: 'Theclinae',    status: 'Least Concern', wingspan: '28–36mm',  habitat: 'Scrub, forest edges',region: 'Pan-India',   diet: 'Acacia',               flightSeason: 'Year-round', discovered: 1793 },
  ],
  Hesperiidae: [
    { scientific: 'Borbo_cinnara',        name: 'Rice Swift',              subcategory: 'Hesperiinae',  status: 'Least Concern', wingspan: '28–34mm',  habitat: 'Paddy fields, grass',region: 'Pan-India',   diet: 'Grasses',              flightSeason: 'Year-round', discovered: 1865 },
    { scientific: 'Pelopidas_mathias',    name: 'Small Branded Swift',     subcategory: 'Hesperiinae',  status: 'Least Concern', wingspan: '30–38mm',  habitat: 'Grasslands',         region: 'Pan-India',   diet: 'Grasses',              flightSeason: 'Year-round', discovered: 1798 },
    { scientific: 'Udaspes_folus',        name: 'Grass Demon',             subcategory: 'Hesperiinae',  status: 'Least Concern', wingspan: '30–40mm',  habitat: 'Gardens, forests',   region: 'Pan-India',   diet: 'Zingiber, Curcuma',    flightSeason: 'Jun–Oct',    discovered: 1775 },
    { scientific: 'Taractrocera_maevius', name: 'Paintbrush Swift',        subcategory: 'Hesperiinae',  status: 'Least Concern', wingspan: '26–32mm',  habitat: 'Grasslands',         region: 'Pan-India',   diet: 'Grasses',              flightSeason: 'Year-round', discovered: 1811 },
    { scientific: 'Potanthus_pseudomaesa',name: 'Common Dart',             subcategory: 'Hesperiinae',  status: 'Least Concern', wingspan: '28–36mm',  habitat: 'Forest edges',       region: 'Pan-India',   diet: 'Grasses',              flightSeason: 'Year-round', discovered: 1868 },
  ],
  Riodinidae: [
    { scientific: 'Abisara_echerius',     name: 'Plum Judy',               subcategory: 'Riodininae',   status: 'Least Concern', wingspan: '32–42mm',  habitat: 'Forests',            region: 'Pan-India',   diet: 'Maesa',                flightSeason: 'Year-round', discovered: 1775 },
    { scientific: 'Abisara_fylla',        name: 'Dark Judy',               subcategory: 'Riodininae',   status: 'Near Threatened',wingspan: '34–44mm', habitat: 'Evergreen forests',  region: 'Northeast India', diet: 'Maesa japonica',   flightSeason: 'Apr–Sep',    discovered: 1843 },
    { scientific: 'Abisara_saturata',     name: 'Tailed Judy',             subcategory: 'Riodininae',   status: 'Least Concern', wingspan: '32–40mm',  habitat: 'Moist forests',      region: 'Northeast India', diet: 'Maesa',            flightSeason: 'Mar–Oct',    discovered: 1869 },
  ],
};

const FAMILY_META = [
  { name: 'Papilionidae', common: 'Swallowtails',     color: '#f59e0b', description: 'The largest and most spectacular butterflies, known for tail-like hindwing extensions and brilliant coloration.' },
  { name: 'Nymphalidae',  common: 'Brush-footed',     color: '#8b5cf6', description: "The largest butterfly family. Front legs are reduced and brush-like. Includes India's most recognizable species." },
  { name: 'Pieridae',     common: 'Whites & Yellows', color: '#eab308', description: 'Medium-sized butterflies typically white or yellow. Include many garden species and long-distance migrants.' },
  { name: 'Lycaenidae',   common: 'Blues & Coppers',  color: '#60a5fa', description: 'Small, often iridescent butterflies. Many have fascinating relationships with ants during larval stages.' },
  { name: 'Hesperiidae',  common: 'Skippers',         color: '#f97316', description: 'Fast-flying butterflies with distinctive hooked antennae tips. Often hold wings at different angles.' },
  { name: 'Riodinidae',   common: 'Metalmarks',       color: '#34d399', description: 'Small to medium butterflies with metallic spots. Many have complex ecological relationships.' },
];

function extractFilesFromTaxonomy(data) {
  const files = [];
  function walkTaxonomy(node) {
    if (!node) return;
    if (node.files && Array.isArray(node.files)) files.push(...node.files);
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) walkTaxonomy(child);
    }
  }
  if (data?.result) walkTaxonomy(data.result);
  return files;
}

function convertFilesToImages(files) {
  return files.map(f => ({
    img_name: f.file_name,
    file_url: f.file_url,
    upload_timestamp: f.upload_timestamp,
    name: f.file_name,
    url: f.file_url,
  }));
}

async function fetchAllCategories() {
  const { getService } = await import('../services/commonService');
  return Promise.all(
    FAMILY_META.map(async (fam, fi) => {
      const speciesDefs = FAMILY_SPECIES[fam.name] || [];
      const settled = await Promise.allSettled(
        speciesDefs.map(async (sp) => {
          try {
            const d = await getService('/images-by-species', { species: sp.scientific });
            let images = d?.data || [];
            if (!images.length && d?.result) {
              const files = extractFilesFromTaxonomy(d);
              images = convertFilesToImages(files);
            }
            return { sp, images };
          } catch (err) {
            console.error(`Failed to fetch images for ${sp.scientific}:`, err.message);
            return { sp, images: [] };
          }
        })
      );

      const species = settled.map((r, si) => {
        const def = speciesDefs[si];
        const sciName = def.scientific.replace(/_/g, ' ');
        const images  = r.status === 'fulfilled' ? r.value.images : [];
        const firstImg = images[0];

        let imageUrl = null;
        if (firstImg?.file_url) {
          imageUrl = wikiImageUrl(firstImg.file_url, 400);
        } else {
          const imgName = firstImg?.img_name || firstImg?.name || firstImg?.filename || null;
          imageUrl = imgName ? wikiImageUrl(imgName, 400) : null;
        }

        return {
          id:           `sp-${fi}-${si}`,
          name:         def.name,
          scientific:   sciName,
          status:       def.status,
          wingspan:     def.wingspan,
          habitat:      def.habitat,
          region:       def.region,
          diet:         def.diet,
          flightSeason: def.flightSeason,
          discovered:   def.discovered,
          subcategory:  def.subcategory,
          color:        fam.color,
          lat:          8  + ((fi * 37 + si * 13) % 28),
          lng:          68 + ((fi * 17 + si * 11) % 29),
          description:  `${def.name} (${sciName}) — a member of ${fam.name}. ${def.habitat ? `Found in ${def.habitat}.` : ''} Flight season: ${def.flightSeason || 'seasonal'}.`,
          imageUrl,
          _images: images,
        };
      });

      const endangered = species.filter(s =>
        ['Endangered', 'Critically Endangered', 'Vulnerable', 'Near Threatened'].includes(s.status)
      ).length;

      return {
        id:            `cat-${fi + 1}`,
        name:          fam.name,
        common:        fam.common,
        color:         fam.color,
        description:   fam.description,
        count:         species.length,
        conserved:     Math.round(species.length * 0.4),
        endangered,
        subcategories: [...new Set(species.map(s => s.subcategory).filter(Boolean))],
        species,
      };
    })
  );
}

const FALLBACK_STATS = {
  imagesUploaded: 24300,
  speciesTotal:   1547,
  pageViews:      187000,
  contributors:   4200,
  districts:      312,
  statesActive:   28,
  papers:         165,
  qualityImages:  8750,
};

async function fetchStats() {
  const { getService } = await import('../services/commonService');
  try {
    const json = await getService('/images-by-species', { species: 'Lepidoptera' });
    return {
      ...FALLBACK_STATS,
      imagesUploaded: json?.total_images    ?? FALLBACK_STATS.imagesUploaded,
      speciesTotal:   json?.species_count   ?? FALLBACK_STATS.speciesTotal,
      pageViews:      json?.page_views      ?? FALLBACK_STATS.pageViews,
      contributors:   json?.contributors    ?? FALLBACK_STATS.contributors,
      districts:      json?.districts       ?? FALLBACK_STATS.districts,
      statesActive:   json?.states          ?? FALLBACK_STATS.statesActive,
      papers:         json?.publications    ?? FALLBACK_STATS.papers,
      qualityImages:  json?.quality_images  ?? FALLBACK_STATS.qualityImages,
    };
  } catch (e) {
    console.warn('[API] stats fallback:', e.message);
    return FALLBACK_STATS;
  }
}

const STATE_BOUNDS = [
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

function detectStateFromCoords(lat, lng) {
  for (const b of STATE_BOUNDS) {
    if (lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng) {
      return b.state;
    }
  }
  return '';
}

function buildSightingsFromFeatured(featuredImages) {
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
                      ? `${f.upload_timestamp.slice(0, 4)}-${f.upload_timestamp.slice(4, 6)}-${f.upload_timestamp.slice(6, 8)}`
                      : '',
        confidence: 'Confirmed',
        imageUrl:   f.file_url ? wikiImageUrl(f.file_url, 400) : wikiImageUrl(f.img_name, 400),
        family:     '',
      };
    });
}

const initialState = {
  page: 'home',
  mobileMenu: false,
  sidebarOpen: false,
  categories: [],
  selectedCategory: null,
  selectedSubcat: 'all',
  selectedSpeciesFilter: null,
  selectedSpecies: null,
  search: '',
  catLoading: false,
  team: [],
  teamLoading: false,
  selectedMember: null,
  stats: null,
  statsLoading: false,
  sightings: [],
  sightingsLoading: false,
  sightingsError: null,
  mapFilter: { state: 'All States', country: 'All Countries' },
  taxonExpanded: {},
  speciesImages: [],
  speciesImagesLoading: false,
  speciesImagesError: null,
  taxonomyData: null,
  taxonomyLoading: false,
  taxonomyError: null,
  featuredImages: [],
  featuredImagesLoading: false,
  featuredImagesError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.p, mobileMenu: false, selectedSpecies: null, selectedMember: null };
    case 'TOGGLE_MOBILE':  return { ...state, mobileMenu: !state.mobileMenu };
    case 'TOGGLE_SIDEBAR': return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SEARCH':     return { ...state, search: action.v };
    case 'STATS_LOAD': return { ...state, statsLoading: true };
    case 'STATS_OK':   return { ...state, statsLoading: false, stats: action.v };
    case 'CAT_LOAD': return { ...state, catLoading: true };
    case 'CAT_OK':   return { ...state, catLoading: false, categories: action.v };
    case 'SEL_CAT':
      return { ...state, selectedCategory: action.v, selectedSubcat: 'all', selectedSpecies: null, speciesImages: [], speciesImagesError: null, taxonomyData: null, taxonomyError: null };
    case 'SEL_SUBCAT':   return { ...state, selectedSubcat: action.v };
    case 'SEL_SPECIES_FILTER': return { ...state, selectedSpeciesFilter: action.v };
    case 'SEL_SPECIES':
      return { ...state, selectedSpecies: action.v, speciesImages: action.v?._images || [], speciesImagesLoading: action.v && !action.v._images ? true : false, speciesImagesError: null };
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
    default:
      return state;
  }
}

const STATIC_TEAM = [
  { id:'t1', name:'Dr. Meera Nair',      role:'Founder & Chief Lepidopterist', dept:'Research',     initials:'MN', color:'#4ade80', experience:20, publications:47, fieldTrips:180, species_described:3, bio:'Pioneer in butterfly migration research across South Asia.',     education:'PhD Entomology, IISc Bangalore',        specialization:'Migration Ecology, Population Genetics',  awards:['BNHS Gold Medal 2019'],          social:{ email:'meera@butterfly.in' } },
  { id:'t2', name:'Arjun Krishnamurthy', role:'Senior Field Researcher',       dept:'Research',     initials:'AK', color:'#60a5fa', experience:12, publications:18, fieldTrips:210, species_described:1, bio:'Wildlife photographer turned field researcher.',                  education:'MSc Wildlife Biology, WII Dehradun',   specialization:'Behavioral Ecology, Photography',         awards:['BNHS Young Naturalist 2018'],    social:{ email:'arjun@butterfly.in' } },
  { id:'t3', name:'Priya Sharma',        role:'Data Science Lead',             dept:'Technology',   initials:'PS', color:'#f472b6', experience:8,  publications:12, fieldTrips:45,  species_described:0, bio:'Builds AI/ML models to predict butterfly habitat suitability.',  education:'BTech CS IIT Bombay',                  specialization:'Machine Learning, Climate Modelling',     awards:['DST Women in Science 2022'],     social:{ email:'priya@butterfly.in' } },
  { id:'t4', name:'Ravi Sundar',         role:'Community Science Lead',        dept:'Outreach',     initials:'RS', color:'#fb923c', experience:9,  publications:6,  fieldTrips:80,  species_described:0, bio:'Manages a network of 4,200+ citizen scientists.',                education:'MA Environmental Studies, JNU Delhi',  specialization:'Citizen Science, Conservation Education', awards:['UN Young Champion of Earth 2021'],social:{ email:'ravi@butterfly.in' } },
  { id:'t5', name:'Lakshmi Iyer',        role:'Conservation Policy Lead',      dept:'Conservation', initials:'LI', color:'#a78bfa', experience:14, publications:9,  fieldTrips:60,  species_described:0, bio:'Lobbied for three butterfly corridor notifications.',             education:'LLB Environmental Law, NLS Bangalore', specialization:'Environmental Law, Protected Areas',      awards:['IUCN Outstanding Service 2020'],social:{ email:'lakshmi@butterfly.in' } },
  { id:'t6', name:'Dr. Vikram Pillai',   role:'Taxonomist & Systematist',      dept:'Research',     initials:'VP', color:'#34d399', experience:18, publications:63, fieldTrips:120, species_described:7, bio:'Specialist in Papilionidae systematics.',                         education:'PhD Zoology, University of Kerala',    specialization:'Molecular Systematics, Phylogenetics',    awards:['BNHS Gold Medal 2017'],          social:{ email:'vikram@butterfly.in' } },
];

const Ctx = createContext(null);

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within a Provider');
  return ctx;
};

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadAll = useCallback(async () => {
    dispatch({ type: 'CAT_LOAD' });
    dispatch({ type: 'TEAM_LOAD' });
    dispatch({ type: 'SIGHT_LOAD' });
    dispatch({ type: 'FEATURED_IMG_LOAD' });

    dispatch({ type: 'TEAM_OK', v: STATIC_TEAM });
    dispatch({ type: 'STATS_OK', v: FALLBACK_STATS });

    fetchStats()
      .then(v => dispatch({ type: 'STATS_OK', v }))
      .catch(() => {});

    fetchAllCategories()
      .then(v  => dispatch({ type: 'CAT_OK', v }))
      .catch(() => dispatch({ type: 'CAT_OK', v: [] }));

    fetchFeaturedImages()
      .then(featured => {
        dispatch({ type: 'FEATURED_IMG_OK', v: featured });
        const sightings = buildSightingsFromFeatured(featured);
        if (sightings.length) {
          dispatch({ type: 'SIGHT_OK', v: sightings });
        } else {
          dispatch({ type: 'SIGHT_ERR', v: 'No sightings with GPS coordinates found.' });
        }
      })
      .catch(err => {
        const errMsg = err?.message || 'Failed to fetch data';
        dispatch({ type: 'FEATURED_IMG_ERR', v: errMsg });
        dispatch({ type: 'SIGHT_ERR',        v: errMsg });
      });

  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   if (!state.selectedSpecies) return;
  //   if (state.selectedSpecies._images?.length) return;
  //   if (!state.selectedSpecies.scientific) return;
  //   let cancelled = false;
  //   dispatch({ type: 'SPECIES_IMG_LOAD' });
  //   fetchSpeciesImages(state.selectedSpecies.scientific)
  //     .then(data => { if (!cancelled) dispatch({ type: 'SPECIES_IMG_OK', v: data }); })
  //     .catch(err  => { if (!cancelled) dispatch({ type: 'SPECIES_IMG_ERR', v: err.message }); });
  //   return () => { cancelled = true; };
  // }, [state.selectedSpecies?.scientific]);


  const scientific = state.selectedSpecies?.scientific;
const images = state.selectedSpecies?._images;

useEffect(() => {
  if (!scientific) return;
  if (images?.length) return;

  let cancelled = false;

  dispatch({ type: 'SPECIES_IMG_LOAD' });

  fetchSpeciesImages(scientific)
    .then(data => {
      if (!cancelled) {
        dispatch({ type: 'SPECIES_IMG_OK', v: data });
      }
    })
    .catch(err => {
      if (!cancelled) {
        dispatch({ type: 'SPECIES_IMG_ERR', v: err.message });
      }
    });

  return () => {
    cancelled = true;
  };
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