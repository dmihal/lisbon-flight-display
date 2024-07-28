
const planes: { [id: string]: string } = {
  'AT75': 'ATR 72-500',
  'A20N': 'Airbus A320neo',
  'A21N': 'Airbus A321neo',
  'A319': 'Airbus A319',
  'A320': 'Airbus A320',
  'A321': 'Airbus A321',
  'A332': 'Airbus A330-200',
  'A333': 'Airbus A330-300',
  'B38M': 'Boeing 737 MAX 8',
  'B738': 'Boeing 737-800',
  'B752': 'Boeing 757-200',
  'B762': 'Boeing 767-200',
  'B763': 'Boeing 767-300',
  'B77W': 'Boeing 777-300ER',
  'B788': 'Boeing 787-8',
  'BCS3': 'Bombardier CS300',
  'E190': 'Embraer E190',
  'E195': 'Embraer E195',
}

export const getPlane = (type: string) => planes[type] || type;

const airlines: { [id: string]: string } = {
  '3V': 'ASL Airlines Belgium',
  '5F': 'Fly One',
  'AA': 'American Airlines',
  'AC': 'Air Canada',
  'AF': 'Air France',
  'BA': 'British Airways',
  'BJ': 'Nouvelair',
  'DL': 'Delta Air Lines',
  'DT': 'TAAG Angola Airlines',
  'EW': 'Eurowings',
  'FR': 'Ryanair',
  'HV': 'Transavia',
  'IB': 'Iberia',
  'KL': 'KLM',
  'LH': 'Lufthansa',
  'LO': 'LOT Polish Airlines',
  'LX': 'Swiss International Air Lines',
  'MS': 'EgyptAir',
  'PC': 'Pegasus Airlines',
  'QR': 'Qatar Airways',
  'QY': 'European Air Transport Leipzig',
  'RK': 'Ryanair UK',
  'S4': 'SATA Air Açores',
  'SN': 'Brussels Airlines',
  'TK': 'Turkish Airlines',
  'TO': 'Transavia France',
  'TP': 'TAP Portugal',
  'U2': 'easyJet Europe',
  'UA': 'United Airlines',
  'UX': 'Air Europa',
  'VY': 'Vueling',
  'WT': 'Swiftair',
}

export const getAirline = (flight: string) => airlines[flight.substring(0, 2)] || flight.substring(0, 2);

const airports: { [id: string]: string } = {
  'AMS': 'Amsterdam',
  'ATL': 'Atlanta',
  'BCN': 'Barcelona',
  'BER': 'Berlin',
  'BFS': 'Belfast',
  'BGY': 'Milan Bergamo',
  'BIO': 'Bilbao',
  'BLQ': 'Bologna',
  'BOD': 'Bordeaux',
  'BOS': 'Boston',
  'BRU': 'Brussels',
  'BRS': 'Bristol',
  'BSL': 'Basel',
  'BUD': 'Budapest',
  'BVA': 'Beauvais',
  'CAI': 'Cairo',
  'CDG': 'Paris Charles de Gaulle',
  'CGN': 'Cologne',
  'CLT': 'Charlotte',
  'CPH': 'Copenhagen',
  'CRL': 'Brussels Charleroi',
  'DJE': 'Djerba',
  'DME': 'Moscow Domodedovo',
  'DOH': 'Doha',
  'DUB': 'Dublin',
  'DUS': 'Düsseldorf',
  'ESB': 'Ankara',
  'EWR': 'Newark',
  'EZE': 'Buenos Aires',
  'FAO': 'Faro',
  'FCO': 'Rome Fiumicino',
  'FNC': 'Funchal',
  'FOR': 'Fortaleza',
  'FRA': 'Frankfurt',
  'GRU': 'São Paulo',
  'GOT': 'Gothenburg',
  'GVA': 'Geneva',
  'HAM': 'Hamburg',
  'HEL': 'Helsinki',
  'HOR': 'Horta',
  'IAD': 'Washington Dulles',
  'IST': 'Istanbul',
  'JFK': 'New York JFK',
  'LAD': 'Luanda',
  'LAX': 'Los Angeles',
  'LGW': 'London Gatwick',
  'LHR': 'London Heathrow',
  'LIS': 'Lisbon',
  'LTN': 'London Luton',
  'LUX': 'Luxembourg',
  'LYS': 'Lyon',
  'MAD': 'Madrid',
  'MAN': 'Manchester',
  'MIA': 'Miami',
  'MLA': 'Malta',
  'MRS': 'Marseille',
  'MUC': 'Munich',
  'MXP': 'Milan Malpensa',
  'NAP': 'Naples',
  'NCE': 'Nice',
  'NTE': 'Nantes',
  'OPO': 'Porto',
  'ORD': 'Chicago O\'Hare',
  'ORY': 'Paris Orly',
  'PDL': 'Ponta Delgada',
  'PHL': 'Philadelphia',
  'PHX': 'Phoenix',
  'PIX': 'Pico',
  'PMI': 'Palma de Mallorca',
  'PRG': 'Prague',
  'RAI': 'Praia',
  'RAK': 'Marrakesh',
  'RMO': 'Chișinău',
  'SFO': 'San Francisco',
  'STN': 'London Stansted',
  'TMS': 'São Tomé',
  'VIE': 'Vienna',
  'VIT': 'Vitoria',
  'YUL': 'Montreal',
  'YVR': 'Vancouver',
  'YYZ': 'Toronto',
  'ZRH': 'Zurich',
};

export const getAirport = (airport: string) => airports[airport] || airport;
