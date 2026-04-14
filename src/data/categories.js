export const TAXON_CATEGORIES = [
  {
    id: 'cat-1', name: 'Papilionidae', common: 'Swallowtails', color: '#f59e0b',
    description: 'The largest and most spectacular butterflies. Known for tail-like extensions on hindwings and brilliant coloration.',
    count: 107, conserved: 34, endangered: 12,
    subcategories: ['Papilioninae', 'Parnassiinae', 'Baroniinae'],
    species: [
      { id: 'sp-p1', name: 'Monarch Swallowtail', scientific: 'Papilio monarcus', status: 'Vulnerable', wingspan: '90-110mm', habitat: 'Forest edges', region: 'Western Ghats', discovered: 1758, color: '#f59e0b', lat: 10.5, lng: 76.2, description: 'One of the most majestic swallowtails with brilliant yellow-black banding. Males patrol hilltops while females seek host plants for oviposition.', diet: 'Citrus family', flightSeason: 'Mar-Jun, Sep-Nov', subcategory: 'Papilioninae' },
      { id: 'sp-p2', name: 'Malabar Banded Peacock', scientific: 'Papilio buddha', status: 'Endangered', wingspan: '95-115mm', habitat: 'Shola forests', region: 'Kerala', discovered: 1891, color: '#10b981', lat: 9.5, lng: 76.9, description: "Endemic to India's Western Ghats. Emerald-green bands shimmer on velvety dark wings. A flagship species for Western Ghats conservation.", diet: 'Rutaceae', flightSeason: 'Apr-Aug', subcategory: 'Papilioninae' },
      { id: 'sp-p3', name: 'Apollo', scientific: 'Parnassius apollo', status: 'Vulnerable', wingspan: '62-86mm', habitat: 'Alpine meadows', region: 'Himalayas', discovered: 1758, color: '#ef4444', lat: 32.0, lng: 77.5, description: 'White wings with vivid red ocelli, this alpine beauty is highly sensitive to climate change. Protected under CITES Appendix II.', diet: 'Stonecrop plants', flightSeason: 'Jun-Aug', subcategory: 'Parnassiinae' },
    ]
  },
  {
    id: 'cat-2', name: 'Nymphalidae', common: 'Brush-footed', color: '#8b5cf6',
    description: 'The largest family of butterflies. Front legs are reduced, brush-like. Includes many of India\'s most recognizable species.',
    count: 432, conserved: 178, endangered: 23,
    subcategories: ['Danainae', 'Nymphalinae', 'Satyrinae', 'Heliconiinae'],
    species: [
      { id: 'sp-n1', name: 'Blue Morpho', scientific: 'Morpho peleides', status: 'Least Concern', wingspan: '75-100mm', habitat: 'Tropical rainforest', region: 'Western Ghats', discovered: 1832, color: '#3b82f6', lat: 11.5, lng: 75.8, description: "Iridescent blue wings created by microscopic light-refracting scales, not pigment. One of the world's most stunning optical phenomena.", diet: 'Rotting fruit', flightSeason: 'Year-round', subcategory: 'Nymphalinae' },
      { id: 'sp-n2', name: 'Painted Lady', scientific: 'Vanessa cardui', status: 'Least Concern', wingspan: '51-73mm', habitat: 'Open fields, gardens', region: 'Pan-India', discovered: 1758, color: '#f97316', lat: 20.5, lng: 78.9, description: 'The world\'s most widespread butterfly found on every continent except Antarctica. Capable of 4,000km migration.', diet: 'Thistles, nettles', flightSeason: 'Feb-Nov', subcategory: 'Nymphalinae' },
      { id: 'sp-n3', name: 'Blue Tiger', scientific: 'Tirumala limniace', status: 'Least Concern', wingspan: '70-95mm', habitat: 'Forests, coast', region: 'Pan-India', discovered: 1758, color: '#818cf8', lat: 13.0, lng: 80.2, description: 'Famous for spectacular mass coastal migrations. Blue-white spots on dark brown wings create the tiger-stripe pattern.', diet: 'Crotalaria', flightSeason: 'Aug-Dec', subcategory: 'Danainae' },
      { id: 'sp-n4', name: 'Glasswing', scientific: 'Greta oto', status: 'Least Concern', wingspan: '28-30mm', habitat: 'Cloud forests', region: 'Western Ghats', discovered: 1865, color: '#06b6d4', lat: 12.4, lng: 75.7, description: 'Transparent wings like stained glass — transparency achieved by the absence of light-scattering scales between wing veins.', diet: 'Cecropieae plants', flightSeason: 'Year-round', subcategory: 'Heliconiinae' },
    ]
  },
  {
    id: 'cat-3', name: 'Pieridae', common: 'Whites & Yellows', color: '#eab308',
    description: 'Medium-sized butterflies typically white or yellow. Include many garden species and long-distance migrants.',
    count: 89, conserved: 45, endangered: 5,
    subcategories: ['Pierinae', 'Coliadinae', 'Dismorphiinae'],
    species: [
      { id: 'sp-pi1', name: 'Common Jezebel', scientific: 'Delias eucharis', status: 'Least Concern', wingspan: '65-75mm', habitat: 'Forests, gardens', region: 'Pan-India', discovered: 1793, color: '#a3e635', lat: 17.3, lng: 78.4, description: 'Striking undersides of brilliant yellow, red, and white. Often glides above forest canopy. Larvae parasitize loranthus plants.', diet: 'Loranthus (parasitic)', flightSeason: 'Oct-Mar', subcategory: 'Pierinae' },
      { id: 'sp-pi2', name: 'Yellow Orange Tip', scientific: 'Ixias pyrene', status: 'Least Concern', wingspan: '45-55mm', habitat: 'Dry forests, gardens', region: 'Pan-India', discovered: 1764, color: '#fbbf24', lat: 23.0, lng: 72.5, description: 'Males dazzle with vivid orange forewing tips set against white wings. Common garden visitor with a rapid, bouncing flight.', diet: 'Capparis species', flightSeason: 'Year-round', subcategory: 'Coliadinae' },
    ]
  },
  {
    id: 'cat-4', name: 'Lycaenidae', common: 'Blues & Coppers', color: '#60a5fa',
    description: 'Small, often iridescent butterflies. Many have fascinating relationships with ants during larval stages.',
    count: 197, conserved: 89, endangered: 18,
    subcategories: ['Lycaeninae', 'Polyommatinae', 'Theclinae'],
    species: [
      { id: 'sp-l1', name: 'Common Blue', scientific: 'Polyommatus icarus', status: 'Least Concern', wingspan: '28-36mm', habitat: 'Grasslands, meadows', region: 'Himalayan range', discovered: 1775, color: '#60a5fa', lat: 30.0, lng: 78.0, description: 'Males shimmer with brilliant blue upperside, females are brown. Larvae tended by ants in a remarkable mutualistic relationship.', diet: 'Legumes (clover, vetch)', flightSeason: 'May-Sep', subcategory: 'Polyommatinae' },
      { id: 'sp-l2', name: 'Purple Hairstreak', scientific: 'Favonius quercus', status: 'Least Concern', wingspan: '35-38mm', habitat: 'Oak woodland', region: 'Himalayan foothills', discovered: 1758, color: '#a78bfa', lat: 28.5, lng: 77.1, description: 'Stunning purple-blue sheen on upperside. Spends most time in tree canopy feeding on honeydew and aphid secretions.', diet: 'Oak leaves (larva)', flightSeason: 'Jul-Aug', subcategory: 'Theclinae' },
    ]
  },
  {
    id: 'cat-5', name: 'Hesperiidae', common: 'Skippers', color: '#f97316',
    description: 'Fast-flying, often dull-colored butterflies with distinctive hooked antennae tips.',
    count: 143, conserved: 67, endangered: 7,
    subcategories: ['Pyrginae', 'Hesperiinae', 'Heteropterinae'],
    species: [
      { id: 'sp-h1', name: 'Large Skipper', scientific: 'Ochlodes sylvanus', status: 'Least Concern', wingspan: '29-34mm', habitat: 'Grasslands, woodland rides', region: 'Northwest India', discovered: 1793, color: '#fb923c', lat: 28.0, lng: 73.0, description: 'Rapid, darting flight makes it challenging to observe. Males defend territories from grass stems in a characteristic perching posture.', diet: 'Various grasses', flightSeason: 'Jun-Aug', subcategory: 'Hesperiinae' },
    ]
  },
  {
    id: 'cat-6', name: 'Riodinidae', common: 'Metalmarks', color: '#34d399',
    description: 'Small to medium butterflies often with metallic spots or markings. Many species have complex ecological relationships.',
    count: 42, conserved: 22, endangered: 4,
    subcategories: ['Riodininae', 'Euselasiinae'],
    species: [
      { id: 'sp-r1', name: 'Duke of Burgundy', scientific: 'Hamearis lucina', status: 'Vulnerable', wingspan: '29-32mm', habitat: 'Chalk grassland, woodland', region: 'Northeast India', discovered: 1758, color: '#34d399', lat: 25.5, lng: 91.8, description: "India's only metalmark. Declining rapidly due to habitat loss and scrub encroachment. Males have characteristic resting posture.", diet: 'Cowslip, primrose', flightSeason: 'May-Jun', subcategory: 'Riodininae' },
    ]
  },
];
