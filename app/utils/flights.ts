
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
  'CRJ2': 'Mitsubishi CRJ-200ER',
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
  'DY': 'Norwegian Air Shuttle',
  'EI': 'Aer Lingus',
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
  'TS': 'Air Transat',
  'U2': 'easyJet Europe',
  'UA': 'United Airlines',
  'UX': 'Air Europa',
  'VY': 'Vueling',
  'WT': 'Swiftair',
  'YU': 'EuroAtlantic Airways',
  'YW': 'Air Nostrum Iberia Regional',
}

export const getAirline = (flight: string) => airlines[flight.substring(0, 2)] || flight.substring(0, 2);

export interface Airport {
  name: string;
  flag: string;
}

const airports: { [id: string]: Airport } = {
  'AGP': { name: 'Málaga', flag: '🇪🇸' },
  'ALC': { name: 'Alicante', flag: '🇪🇸' },
  'AMS': { name: 'Amsterdam', flag: '🇳🇱' },
  'ARN': { name: 'Stockholm', flag: '🇸🇪' },
  'ATH': { name: 'Athens', flag: '🇬🇷' },
  'ATL': { name: 'Atlanta', flag: '🇺🇸' },
  'BCN': { name: 'Barcelona', flag: '🇪🇸' },
  'BEG': { name: 'Belgrade', flag: '🇷🇸' },
  'BER': { name: 'Berlin', flag: '🇩🇪' },
  'BFS': { name: 'Belfast', flag: '🇬🇧' },
  'BGY': { name: 'Milan Bergamo', flag: '🇮🇹' },
  'BHX': { name: 'Birmingham', flag: '🇬🇧' },
  'BIO': { name: 'Bilbao', flag: '🇪🇸' },
  'BLQ': { name: 'Bologna', flag: '🇮🇹' },
  'BOD': { name: 'Bordeaux', flag: '🇫🇷' },
  'BOS': { name: 'Boston', flag: '🇺🇸' },
  'BRU': { name: 'Brussels', flag: '🇧🇪' },
  'BRS': { name: 'Bristol', flag: '🇬🇧' },
  'BSL': { name: 'Basel', flag: '🇨🇭' },
  'BUD': { name: 'Budapest', flag: '🇭🇺' },
  'BVA': { name: 'Beauvais', flag: '🇫🇷' },
  'BVC': { name: 'Boa Vista', flag: '🇨🇻' },
  'CAI': { name: 'Cairo', flag: '🇪🇬' },
  'CDG': { name: 'Paris Charles de Gaulle', flag: '🇫🇷' },
  'CGN': { name: 'Cologne', flag: '🇩🇪' },
  'CIA': { name: 'Rome Ciampino', flag: '🇮🇹' },
  'CLT': { name: 'Charlotte', flag: '🇺🇸' },
  'CMN': { name: 'Casablanca', flag: '🇲🇦' },
  'CPH': { name: 'Copenhagen', flag: '🇩🇰' },
  'CRL': { name: 'Brussels Charleroi', flag: '🇧🇪' },
  'DJE': { name: 'Djerba', flag: '🇹🇳' },
  'DME': { name: 'Moscow Domodedovo', flag: '🇷🇺' },
  'DOH': { name: 'Doha', flag: '🇶🇦' },
  'DSS': { name: 'Dakar', flag: '🇸🇳' },
  'DUB': { name: 'Dublin', flag: '🇮🇪' },
  'DUS': { name: 'Düsseldorf', flag: '🇩🇪' },
  'DXB': { name: 'Dubai', flag: '🇦🇪' },
  'EDI': { name: 'Edinburgh', flag: '🇬🇧' },
  'EIN': { name: 'Eindhoven', flag: '🇳🇱' },
  'ESB': { name: 'Ankara', flag: '🇹🇷' },
  'EWR': { name: 'Newark', flag: '🇺🇸' },
  'EZE': { name: 'Buenos Aires', flag: '🇦🇷' },
  'FAO': { name: 'Faro', flag: '🇵🇹' },
  'FCO': { name: 'Rome Fiumicino', flag: '🇮🇹' },
  'FNC': { name: 'Funchal', flag: '🇵🇹' },
  'FOR': { name: 'Fortaleza', flag: '🇧🇷' },
  'FRA': { name: 'Frankfurt', flag: '🇩🇪' },
  'FLR': { name: 'Florence', flag: '🇮🇹' },
  'GRU': { name: 'São Paulo', flag: '🇧🇷' },
  'GIG': { name: 'Rio de Janeiro', flag: '🇧🇷' },
  'GOT': { name: 'Gothenburg', flag: '🇸🇪' },
  'GVA': { name: 'Geneva', flag: '🇨🇭' },
  'HAM': { name: 'Hamburg', flag: '🇩🇪' },
  'HEL': { name: 'Helsinki', flag: '🇫🇮' },
  'HOR': { name: 'Horta', flag: '🇵🇹' },
  'IAD': { name: 'Washington Dulles', flag: '🇺🇸' },
  'IBZ': { name: 'Ibiza', flag: '🇪🇸' },
  'IST': { name: 'Istanbul', flag: '🇹🇷' },
  'JFK': { name: 'New York JFK', flag: '🇺🇸' },
  'LAD': { name: 'Luanda', flag: '🇦🇴' },
  'LAX': { name: 'Los Angeles', flag: '🇺🇸' },
  'LGW': { name: 'London Gatwick', flag: '🇬🇧' },
  'LHR': { name: 'London Heathrow', flag: '🇬🇧' },
  'LIS': { name: 'Lisbon', flag: '🇵🇹' },
  'LPA': { name: 'Gran Canaria', flag: '🇪🇸' },
  'LTN': { name: 'London Luton', flag: '🇬🇧' },
  'LUX': { name: 'Luxembourg', flag: '🇱🇺' },
  'LYS': { name: 'Lyon', flag: '🇫🇷' },
  'MAD': { name: 'Madrid', flag: '🇪🇸' },
  'MAH': { name: 'Menorca', flag: '🇪🇸' },
  'MAN': { name: 'Manchester', flag: '🇬🇧' },
  'MIA': { name: 'Miami', flag: '🇺🇸' },
  'MLA': { name: 'Malta', flag: '🇲🇹' },
  'MRS': { name: 'Marseille', flag: '🇫🇷' },
  'MUC': { name: 'Munich', flag: '🇩🇪' },
  'MXP': { name: 'Milan Malpensa', flag: '🇮🇹' },
  'NAP': { name: 'Naples', flag: '🇮🇹' },
  'NCE': { name: 'Nice', flag: '🇫🇷' },
  'NTE': { name: 'Nantes', flag: '🇫🇷' },
  'OPO': { name: 'Porto', flag: '🇵🇹' },
  'ORD': { name: 'Chicago O\'Hare', flag: '🇺🇸' },
  'ORY': { name: 'Paris Orly', flag: '🇫🇷' },
  'OSL': { name: 'Oslo', flag: '🇳🇴' },
  'OXB': { name: 'Bissau', flag: '🇬🇼' },
  'PDL': { name: 'Ponta Delgada', flag: '🇵🇹' },
  'PHL': { name: 'Philadelphia', flag: '🇺🇸' },
  'PHX': { name: 'Phoenix', flag: '🇺🇸' },
  'PIX': { name: 'Pico', flag: '🇵🇹' },
  'PMI': { name: 'Palma de Mallorca', flag: '🇪🇸' },
  'POA': { name: 'Porto Alegre', flag: '🇧🇷' },
  'POZ': { name: 'Poznań', flag: '🇵🇱' },
  'PRG': { name: 'Prague', flag: '🇨🇿' },
  'RAI': { name: 'Praia', flag: '🇨🇻' },
  'RAK': { name: 'Marrakesh', flag: '🇲🇦' },
  'REC': { name: 'Recife', flag: '🇧🇷' },
  'RMO': { name: 'Chișinău', flag: '🇲🇩' },
  'RTM': { name: 'Rotterdam', flag: '🇳🇱' },
  'SFO': { name: 'San Francisco', flag: '🇺🇸' },
  'SID': { name: 'Sal', flag: '🇨🇻' },
  'STN': { name: 'London Stansted', flag: '🇬🇧' },
  'SVQ': { name: 'Seville', flag: '🇪🇸' },
  'TER': { name: 'Terceira', flag: '🇵🇹' },
  'TLV': { name: 'Tel Aviv', flag: '🇮🇱' },
  'TLS': { name: 'Toulouse', flag: '🇫🇷' },
  'TMS': { name: 'São Tomé', flag: '🇸🇹' },
  'VCE': { name: 'Venice', flag: '🇮🇹' },
  'VCP': { name: 'Campinas', flag: '🇧🇷' },
  'VIE': { name: 'Vienna', flag: '🇦🇹' },
  'VIT': { name: 'Vitoria', flag: '🇪🇸' },
  'VLC': { name: 'Valencia', flag: '🇪🇸' },
  'VXE': { name: 'São Vicente', flag: '🇨🇻' },
  'WAW': { name: 'Warsaw', flag: '🇵🇱' },
  'WMI': { name: 'Warsaw Modlin', flag: '🇵🇱' },
  'YUL': { name: 'Montreal', flag: '🇨🇦' },
  'YVR': { name: 'Vancouver', flag: '🇨🇦' },
  'YYZ': { name: 'Toronto', flag: '🇨🇦' },
  'ZRH': { name: 'Zurich', flag: '🇨🇭' },
};

export const getAirport = (airport: string) => airports[airport] || { name: airport, flag: '' };
