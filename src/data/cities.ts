// Towns with a wholesale landing page at /wholesale-clothing/<slug>, for
// searches like "wholesale clothing in Indore". Copy stays to facts that
// hold for every shop there: geography, the usual wholesale markets of the
// region and its festival calendar. No delivery times, counts or prices.

export type Region = "north" | "central" | "west" | "south" | "east" | "northeast";

export interface City {
  slug: string;
  name: string;
  state: string;
  region: Region;
  /** Smaller towns around it, for "and nearby" copy and long-tail search. */
  nearby: string[];
}

export interface RegionInfo {
  label: string;
  /** Wholesale markets shop owners in this region usually travel to. */
  markets: string[];
  /** Main buying seasons, in calendar order. */
  seasons: { name: string; when: string; stock: string }[];
  /** Department slugs worth leading with for this region. */
  focus: string[];
}

export const regions: Record<Region, RegionInfo> = {
  north: {
    label: "North India",
    markets: ["Delhi's Gandhi Nagar", "Chandni Chowk", "Ludhiana", "Jaipur"],
    seasons: [
      { name: "Summer", when: "March to June", stock: "cotton kurtis, tees, shorts and light ethnic wear" },
      { name: "Festive and Diwali", when: "September to November", stock: "ethnic sets, kurta pyjamas, sarees and kidswear" },
      { name: "Winter", when: "November to February", stock: "jackets, sweatshirts, thermals and shawls" },
      { name: "Weddings", when: "November to February", stock: "lehengas, sherwanis, party wear and footwear" },
    ],
    focus: ["ethnic-wear", "menswear", "kidswear", "womenswear"],
  },
  central: {
    label: "Central India",
    markets: ["Indore", "Delhi", "Surat"],
    seasons: [
      { name: "Summer", when: "March to June", stock: "cotton kurtis, tees and light shirts" },
      { name: "Navratri and Diwali", when: "September to November", stock: "chaniya cholis, ethnic sets, sarees and kidswear" },
      { name: "Winter", when: "December to February", stock: "jackets, sweatshirts and shawls" },
      { name: "Weddings", when: "November to February", stock: "lehengas, sherwanis and party wear" },
    ],
    focus: ["ethnic-wear", "womenswear", "menswear", "kidswear"],
  },
  west: {
    label: "West India",
    markets: ["Surat", "Ahmedabad", "Mumbai"],
    seasons: [
      { name: "Summer", when: "March to June", stock: "cotton kurtis, tees and casual wear" },
      { name: "Monsoon", when: "June to September", stock: "quick-dry casuals and footwear" },
      { name: "Navratri and Diwali", when: "September to November", stock: "chaniya cholis, kurtas, sarees and kidswear" },
      { name: "Weddings", when: "November to February", stock: "lehengas, sherwanis and party wear" },
    ],
    focus: ["ethnic-wear", "womenswear", "menswear", "kidswear"],
  },
  south: {
    label: "South India",
    markets: ["Tiruppur", "Erode", "Bengaluru", "Chennai"],
    seasons: [
      { name: "Pongal, Sankranti and Ugadi", when: "January to April", stock: "sarees, dhotis, kidswear and men's shirts" },
      { name: "Summer and school reopening", when: "April to June", stock: "cotton tees, innerwear and kidswear" },
      { name: "Onam", when: "August to September", stock: "kasavu sarees, set mundus, kurtas and kidswear" },
      { name: "Deepavali", when: "October to November", stock: "sarees, ethnic sets, menswear and kidswear" },
    ],
    focus: ["ethnic-wear", "menswear", "innerwear-sleepwear", "kidswear"],
  },
  east: {
    label: "East India",
    markets: ["Kolkata's Burrabazar", "Howrah", "Surat"],
    seasons: [
      { name: "Poila Boishakh and summer", when: "April to June", stock: "cotton sarees, kurtis and tees" },
      { name: "Durga Puja", when: "September to October", stock: "sarees, kurta sets, menswear and kidswear" },
      { name: "Diwali and Chhath", when: "October to November", stock: "sarees, ethnic sets and kidswear" },
      { name: "Winter and weddings", when: "December to February", stock: "jackets, shawls and party wear" },
    ],
    focus: ["ethnic-wear", "menswear", "kidswear", "womenswear"],
  },
  northeast: {
    label: "Northeast India",
    markets: ["Guwahati's Fancy Bazaar", "Kolkata"],
    seasons: [
      { name: "Bohag Bihu", when: "April", stock: "mekhela chadors, kurtas and kidswear" },
      { name: "Durga Puja and Diwali", when: "September to November", stock: "sarees, kurta sets, menswear and kidswear" },
      { name: "Winter", when: "November to February", stock: "jackets, sweatshirts and woollens" },
      { name: "Magh Bihu", when: "January", stock: "ethnic sets and winter wear" },
    ],
    focus: ["menswear", "womenswear", "ethnic-wear", "kidswear"],
  },
};

export const cities: City[] = [
  // North
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", region: "north", nearby: ["Barabanki", "Sitapur", "Unnao", "Rae Bareli", "Hardoi"] },
  { slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh", region: "north", nearby: ["Unnao", "Etawah", "Fatehpur", "Kannauj", "Auraiya"] },
  { slug: "varanasi", name: "Varanasi", state: "Uttar Pradesh", region: "north", nearby: ["Mirzapur", "Jaunpur", "Ghazipur", "Chandauli", "Bhadohi"] },
  { slug: "prayagraj", name: "Prayagraj", state: "Uttar Pradesh", region: "north", nearby: ["Pratapgarh", "Kaushambi", "Fatehpur", "Mirzapur", "Bhadohi"] },
  { slug: "gorakhpur", name: "Gorakhpur", state: "Uttar Pradesh", region: "north", nearby: ["Deoria", "Basti", "Kushinagar", "Maharajganj", "Sant Kabir Nagar"] },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh", region: "north", nearby: ["Mathura", "Firozabad", "Etah", "Bharatpur", "Dholpur"] },
  { slug: "meerut", name: "Meerut", state: "Uttar Pradesh", region: "north", nearby: ["Muzaffarnagar", "Baghpat", "Hapur", "Modinagar", "Bulandshahr"] },
  { slug: "bareilly", name: "Bareilly", state: "Uttar Pradesh", region: "north", nearby: ["Shahjahanpur", "Budaun", "Pilibhit", "Rampur", "Moradabad"] },
  { slug: "dehradun", name: "Dehradun", state: "Uttarakhand", region: "north", nearby: ["Haridwar", "Rishikesh", "Roorkee", "Vikasnagar", "Mussoorie"] },
  { slug: "amritsar", name: "Amritsar", state: "Punjab", region: "north", nearby: ["Tarn Taran", "Batala", "Gurdaspur", "Ajnala", "Jandiala Guru"] },
  { slug: "jalandhar", name: "Jalandhar", state: "Punjab", region: "north", nearby: ["Kapurthala", "Phagwara", "Hoshiarpur", "Nakodar", "Nawanshahr"] },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", region: "north", nearby: ["Ajmer", "Tonk", "Sikar", "Dausa", "Alwar"] },
  { slug: "jodhpur", name: "Jodhpur", state: "Rajasthan", region: "north", nearby: ["Pali", "Barmer", "Nagaur", "Jaisalmer", "Phalodi"] },
  { slug: "udaipur", name: "Udaipur", state: "Rajasthan", region: "north", nearby: ["Rajsamand", "Chittorgarh", "Dungarpur", "Banswara", "Nathdwara"] },
  // Central
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", region: "central", nearby: ["Ujjain", "Dewas", "Dhar", "Khargone", "Mhow"] },
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", region: "central", nearby: ["Sehore", "Vidisha", "Raisen", "Narmadapuram", "Itarsi"] },
  { slug: "jabalpur", name: "Jabalpur", state: "Madhya Pradesh", region: "central", nearby: ["Katni", "Narsinghpur", "Mandla", "Seoni", "Damoh"] },
  { slug: "gwalior", name: "Gwalior", state: "Madhya Pradesh", region: "central", nearby: ["Morena", "Bhind", "Datia", "Shivpuri", "Dabra"] },
  { slug: "raipur", name: "Raipur", state: "Chhattisgarh", region: "central", nearby: ["Bhilai", "Durg", "Dhamtari", "Mahasamund", "Rajnandgaon"] },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", region: "central", nearby: ["Wardha", "Bhandara", "Chhindwara", "Amravati", "Gondia"] },
  // West
  { slug: "rajkot", name: "Rajkot", state: "Gujarat", region: "west", nearby: ["Morbi", "Gondal", "Jamnagar", "Jetpur", "Junagadh"] },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat", region: "west", nearby: ["Anand", "Bharuch", "Godhra", "Nadiad", "Dabhoi"] },
  { slug: "nashik", name: "Nashik", state: "Maharashtra", region: "west", nearby: ["Malegaon", "Sinnar", "Igatpuri", "Niphad", "Dhule"] },
  { slug: "aurangabad", name: "Aurangabad (Chhatrapati Sambhajinagar)", state: "Maharashtra", region: "west", nearby: ["Jalna", "Paithan", "Vaijapur", "Beed", "Kannad"] },
  { slug: "kolhapur", name: "Kolhapur", state: "Maharashtra", region: "west", nearby: ["Ichalkaranji", "Sangli", "Miraj", "Satara", "Belagavi"] },
  // South
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", region: "south", nearby: ["Pollachi", "Mettupalayam", "Palladam", "Udumalpet", "Ooty"] },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu", region: "south", nearby: ["Dindigul", "Theni", "Virudhunagar", "Sivaganga", "Usilampatti"] },
  { slug: "tirunelveli", name: "Tirunelveli", state: "Tamil Nadu", region: "south", nearby: ["Thoothukudi", "Tenkasi", "Nagercoil", "Kovilpatti", "Ambasamudram"] },
  { slug: "kochi", name: "Kochi", state: "Kerala", region: "south", nearby: ["Aluva", "Angamaly", "Perumbavoor", "Muvattupuzha", "Kothamangalam"] },
  { slug: "thrissur", name: "Thrissur", state: "Kerala", region: "south", nearby: ["Chalakudy", "Irinjalakuda", "Kunnamkulam", "Guruvayur", "Kodungallur"] },
  { slug: "kozhikode", name: "Kozhikode", state: "Kerala", region: "south", nearby: ["Vadakara", "Koyilandy", "Malappuram", "Manjeri", "Thamarassery"] },
  { slug: "mysuru", name: "Mysuru", state: "Karnataka", region: "south", nearby: ["Mandya", "Hunsur", "Nanjangud", "Chamarajanagar", "KR Nagar"] },
  { slug: "hubballi", name: "Hubballi-Dharwad", state: "Karnataka", region: "south", nearby: ["Gadag", "Haveri", "Belagavi", "Karwar", "Bagalkot"] },
  { slug: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", region: "south", nearby: ["Guntur", "Eluru", "Machilipatnam", "Tenali", "Gudivada"] },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", region: "south", nearby: ["Vizianagaram", "Anakapalli", "Srikakulam", "Bheemunipatnam", "Narsipatnam"] },
  // East
  { slug: "patna", name: "Patna", state: "Bihar", region: "east", nearby: ["Hajipur", "Ara", "Bihar Sharif", "Danapur", "Jehanabad"] },
  { slug: "ranchi", name: "Ranchi", state: "Jharkhand", region: "east", nearby: ["Ramgarh", "Hazaribagh", "Khunti", "Lohardaga", "Gumla"] },
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", region: "east", nearby: ["Cuttack", "Puri", "Khordha", "Jajpur", "Dhenkanal"] },
  { slug: "siliguri", name: "Siliguri", state: "West Bengal", region: "east", nearby: ["Jalpaiguri", "Darjeeling", "Cooch Behar", "Kishanganj", "Malbazar"] },
  // Northeast
  { slug: "guwahati", name: "Guwahati", state: "Assam", region: "northeast", nearby: ["Nalbari", "Barpeta", "Nagaon", "Tezpur", "Shillong"] },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);

/** Other towns in the same state first, then the same region. */
export function relatedCities(city: City, limit = 8): City[] {
  const others = cities.filter((c) => c.slug !== city.slug);
  const sameState = others.filter((c) => c.state === city.state);
  const sameRegion = others.filter((c) => c.region === city.region && c.state !== city.state);
  return [...sameState, ...sameRegion].slice(0, limit);
}

/** The region's usual wholesale markets, minus the town itself, as prose. */
export function marketsFor(city: City): string {
  const own = city.name.replace(/\s*\(.*\)$/, "").toLowerCase();
  const list = regions[city.region].markets.filter((m) => !m.toLowerCase().startsWith(own));
  return list.length > 1 ? `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}` : list[0];
}
