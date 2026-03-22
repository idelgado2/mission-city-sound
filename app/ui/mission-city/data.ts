export type City = 'Austin' | 'San Antonio';
export type ChartPoint = { label: string; value: number };
export type VenueProfile = {
  slug: string;
  name: string;
  city: City;
  neighborhood: string;
  address: string;
  capacity: number;
  ticketRange: string;
  avgAttendance: number;
  selloutRate: number;
  localRank: string;
  rankingScore: number;
  blurb: string;
  topGenres: [string, string][];
  pastArtists: string[];
  upcomingShows: [string, string][];
  attendanceChart: ChartPoint[];
};

export const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/artist-profile', label: 'Artist Profile' },
  { href: '/venue-profile', label: 'Venue Profile' },
  { href: '/discovery', label: 'Discovery' },
  { href: '/events', label: 'Events' },
  { href: '/insights', label: 'Insights' },
];

export const searchTargets = [
  { name: 'Neon Bluff', type: 'Artist', href: '/artist-profile' },
  { name: 'Saint Loma', type: 'Artist', href: '/artist-profile' },
  { name: 'Velvet Motel', type: 'Artist', href: '/artist-profile' },
  { name: 'Rio Static', type: 'Artist', href: '/artist-profile' },
  { name: 'Southline Kids', type: 'Artist', href: '/artist-profile' },
  { name: 'Marfa Bloom', type: 'Artist', href: '/artist-profile' },
  { name: 'Night Arcade', type: 'Artist', href: '/artist-profile' },
  { name: 'Harborline', type: 'Artist', href: '/artist-profile' },
  { name: 'Mohawk Austin', type: 'Venue', href: '/venue-profile' },
  { name: 'Stable Hall', type: 'Venue', href: '/venue-profile' },
  { name: 'Paper Tiger', type: 'Venue', href: '/venue-profile' },
  { name: 'The Parish', type: 'Venue', href: '/venue-profile' },
  { name: 'Scoot Inn', type: 'Venue', href: '/venue-profile' },
  { name: "Antone's", type: 'Venue', href: '/venue-profile' },
];

export const trendingArtists = [
  { name: 'Neon Bluff', growth: 28.4, genre: 'Alt Country', city: 'Austin' as City },
  { name: 'Saint Loma', growth: 23.1, genre: 'Indie Rock', city: 'San Antonio' as City },
  { name: 'Velvet Motel', growth: 19.6, genre: 'Dream Pop', city: 'Austin' as City },
  { name: 'Rio Static', growth: 17.9, genre: 'Latin Electronic', city: 'San Antonio' as City },
  { name: 'Southline Kids', growth: 15.4, genre: 'Red Dirt', city: 'Austin' as City },
  { name: 'Marfa Bloom', growth: 14.8, genre: 'Neo Soul', city: 'Austin' as City },
  { name: 'Night Arcade', growth: 13.6, genre: 'Synth Pop', city: 'San Antonio' as City },
  { name: 'Harborline', growth: 12.9, genre: 'Indie Folk', city: 'Austin' as City },
  { name: 'Cinder Vale', growth: 11.7, genre: 'Garage Rock', city: 'San Antonio' as City },
  { name: 'Blue Mesa Choir', growth: 10.8, genre: 'Americana', city: 'Austin' as City },
];

export const upcomingShows = [
  { artist: 'Neon Bluff', venue: 'Mohawk Austin', date: 'Mar 28', city: 'Austin' as City },
  { artist: 'Saint Loma', venue: 'Paper Tiger', date: 'Mar 30', city: 'San Antonio' as City },
  { artist: 'Velvet Motel', venue: 'The Parish', date: 'Apr 02', city: 'Austin' as City },
  { artist: 'Rio Static', venue: 'Stable Hall', date: 'Apr 04', city: 'San Antonio' as City },
  { artist: 'Marfa Bloom', venue: "Antone's", date: 'Apr 06', city: 'Austin' as City },
  { artist: 'Night Arcade', venue: 'Paper Tiger', date: 'Apr 08', city: 'San Antonio' as City },
  { artist: 'Harborline', venue: 'Scoot Inn', date: 'Apr 10', city: 'Austin' as City },
  { artist: 'Cinder Vale', venue: 'Stable Hall', date: 'Apr 12', city: 'San Antonio' as City },
  { artist: 'Blue Mesa Choir', venue: '3TEN ACL Live', date: 'Apr 14', city: 'Austin' as City },
];

export const topVenues = [
  { name: 'Mohawk Austin', attendance: 91, sellout: 38, city: 'Austin' as City, capacity: 900, ticketRange: '$28-$54', rank: 2 },
  { name: 'Stable Hall', attendance: 88, sellout: 34, city: 'San Antonio' as City, capacity: 1000, ticketRange: '$26-$58', rank: 1 },
  { name: 'Paper Tiger', attendance: 84, sellout: 29, city: 'San Antonio' as City, capacity: 1000, ticketRange: '$20-$39', rank: 2 },
  { name: 'Scoot Inn', attendance: 82, sellout: 27, city: 'Austin' as City, capacity: 750, ticketRange: '$24-$46', rank: 3 },
  { name: 'The Parish', attendance: 80, sellout: 24, city: 'Austin' as City, capacity: 450, ticketRange: '$22-$42', rank: 4 },
  { name: "Antone's", attendance: 79, sellout: 22, city: 'Austin' as City, capacity: 500, ticketRange: '$24-$48', rank: 5 },
  { name: 'Aztec Theatre', attendance: 86, sellout: 31, city: 'San Antonio' as City, capacity: 1500, ticketRange: '$34-$89', rank: 3 },
  { name: 'Sam’s Burger Joint', attendance: 77, sellout: 18, city: 'San Antonio' as City, capacity: 850, ticketRange: '$18-$34', rank: 4 },
];

export const discoveryArtists = [
  { artist: 'Neon Bluff', city: 'Austin' as City, genre: 'Alt Country', followers: 142, growth: 28.4, engagement: 8.7, score: 91 },
  { artist: 'Saint Loma', city: 'San Antonio' as City, genre: 'Indie Rock', followers: 119, growth: 23.1, engagement: 7.9, score: 88 },
  { artist: 'Velvet Motel', city: 'Austin' as City, genre: 'Dream Pop', followers: 205, growth: 19.6, engagement: 9.1, score: 86 },
  { artist: 'Rio Static', city: 'San Antonio' as City, genre: 'Latin Electronic', followers: 97, growth: 17.9, engagement: 8.4, score: 84 },
  { artist: 'Southline Kids', city: 'Austin' as City, genre: 'Red Dirt', followers: 76, growth: 15.4, engagement: 6.8, score: 81 },
  { artist: 'Marfa Bloom', city: 'Austin' as City, genre: 'Neo Soul', followers: 63, growth: 14.8, engagement: 7.2, score: 79 },
  { artist: 'Night Arcade', city: 'San Antonio' as City, genre: 'Synth Pop', followers: 88, growth: 13.6, engagement: 8.1, score: 78 },
  { artist: 'Harborline', city: 'Austin' as City, genre: 'Indie Folk', followers: 71, growth: 12.9, engagement: 6.9, score: 76 },
  { artist: 'Cinder Vale', city: 'San Antonio' as City, genre: 'Garage Rock', followers: 54, growth: 11.7, engagement: 6.6, score: 74 },
  { artist: 'Blue Mesa Choir', city: 'Austin' as City, genre: 'Americana', followers: 68, growth: 10.8, engagement: 6.4, score: 73 },
  { artist: 'Loft Signal', city: 'San Antonio' as City, genre: 'Post Punk', followers: 49, growth: 10.4, engagement: 6.1, score: 71 },
  { artist: 'Motel Vista', city: 'Austin' as City, genre: 'Dream Pop', followers: 57, growth: 9.9, engagement: 6.7, score: 70 },
  { artist: 'Cobra Palms', city: 'San Antonio' as City, genre: 'Latin Electronic', followers: 61, growth: 9.6, engagement: 7.3, score: 69 },
  { artist: 'Passenger Bloom', city: 'Austin' as City, genre: 'Neo Soul', followers: 45, growth: 9.2, engagement: 5.9, score: 67 },
];

export const eventRows = [
  { artist: 'Neon Bluff', venue: 'Mohawk Austin', date: 'Mar 28', demand: 'High', city: 'Austin' as City, genre: 'Alt Country' },
  { artist: 'Saint Loma', venue: 'Paper Tiger', date: 'Mar 30', demand: 'Medium', city: 'San Antonio' as City, genre: 'Indie Rock' },
  { artist: 'Velvet Motel', venue: 'The Parish', date: 'Apr 02', demand: 'High', city: 'Austin' as City, genre: 'Dream Pop' },
  { artist: 'Rio Static', venue: 'Stable Hall', date: 'Apr 04', demand: 'Rising', city: 'San Antonio' as City, genre: 'Latin Electronic' },
  { artist: 'Marfa Bloom', venue: "Antone's", date: 'Apr 06', demand: 'Medium', city: 'Austin' as City, genre: 'Neo Soul' },
  { artist: 'Night Arcade', venue: 'Paper Tiger', date: 'Apr 08', demand: 'Rising', city: 'San Antonio' as City, genre: 'Synth Pop' },
  { artist: 'Harborline', venue: 'Scoot Inn', date: 'Apr 10', demand: 'Medium', city: 'Austin' as City, genre: 'Indie Folk' },
  { artist: 'Cinder Vale', venue: 'Stable Hall', date: 'Apr 12', demand: 'High', city: 'San Antonio' as City, genre: 'Garage Rock' },
  { artist: 'Blue Mesa Choir', venue: '3TEN ACL Live', date: 'Apr 14', demand: 'Medium', city: 'Austin' as City, genre: 'Americana' },
  { artist: 'Loft Signal', venue: 'Aztec Theatre', date: 'Apr 17', demand: 'Rising', city: 'San Antonio' as City, genre: 'Post Punk' },
  { artist: 'Motel Vista', venue: 'The Parish', date: 'Apr 19', demand: 'Medium', city: 'Austin' as City, genre: 'Dream Pop' },
  { artist: 'Cobra Palms', venue: 'Sam’s Burger Joint', date: 'Apr 21', demand: 'High', city: 'San Antonio' as City, genre: 'Latin Electronic' },
  { artist: 'Passenger Bloom', venue: "Antone's", date: 'Apr 23', demand: 'Rising', city: 'Austin' as City, genre: 'Neo Soul' },
];

export const insightCards = [
  { title: 'Trending Genres', value: 'Latin Electronic +31%', tone: 'orange', detail: 'Cross-city demand is accelerating in the 18-34 audience segment.' },
  { title: 'Fastest Growing Artist', value: 'Neon Bluff', tone: 'green', detail: 'Streaming growth is outpacing local ticket demand by 1.7x.' },
  { title: 'Venue Demand Trends', value: 'Austin Mid-Size Rooms', tone: 'orange', detail: 'Sellout velocity improved 12% week over week.' },
  { title: 'Emerging Promoter Signal', value: 'South Side Runs +18%', tone: 'green', detail: 'Independent promoter calendars in San Antonio are filling earlier than usual.' },
  { title: 'Ticket Price Pressure', value: 'Mid-tier +6%', tone: 'orange', detail: 'Austin rooms are successfully testing higher average ticket price bands.' },
  { title: 'Audience Retention', value: 'Repeat Buyers 42%', tone: 'green', detail: 'Repeat attendance is strongest around indie and Latin electronic lineups.' },
];

export const artistShowHistory = [
  ['Paper Tiger', '1,020 / 1,100'],
  ['Stable Hall', '2,406 / 3,000'],
  ['Scoot Inn', '618 / 750'],
  ['Aztec Theatre', '1,844 / 2,000'],
  ['The Parish', '432 / 450'],
];

export const similarArtists = ['Neon Bluff', 'Velvet Motel', 'Marfa Bloom', 'Rio Static', 'Night Arcade', 'Harborline'];

export const venueGenres = [
  ['Indie Rock', '34%'],
  ['Alt Country', '24%'],
  ['Electronic', '18%'],
  ['Post Punk', '11%'],
  ['Americana', '9%'],
  ['Neo Soul', '7%'],
];

export const venuePastArtists = ['Neon Bluff', 'Velvet Motel', 'Saint Loma', 'Night Arcade', 'Harborline', 'Marfa Bloom', 'Rio Static', 'Blue Mesa Choir'];

export const venueUpcomingShows = [
  ['Neon Bluff', 'Mar 28'],
  ['Marfa Bloom', 'Apr 06'],
  ['Night Arcade', 'Apr 14'],
  ['Harborline', 'Apr 18'],
  ['Passenger Bloom', 'Apr 23'],
];

export const venueRankings = [
  ['Mohawk Austin', '91'],
  ['Scoot Inn', '88'],
  ['The Parish', '82'],
  ['Empire Control Room', '80'],
  ["Antone's", '78'],
  ['3TEN ACL Live', '76'],
];

export const cityComparisonRows = [
  ['Artist growth', 'Austin', '+18.4%', '+14.2%'],
  ['Sellout trend', 'Austin', '+9.8%', '+7.1%'],
  ['Show demand', 'San Antonio', '+11.1%', '+13.7%'],
  ['Engagement rate', 'Austin', '8.6%', '7.9%'],
  ['New venue opens', 'San Antonio', '2', '4'],
  ['Promoter velocity', 'Austin', '+7.2%', '+6.8%'],
];

export const venueProfiles: VenueProfile[] = [
  {
    slug: 'mohawk-austin',
    name: 'Mohawk Austin',
    city: 'Austin',
    neighborhood: 'Red River Cultural District',
    address: '912 Red River St, Austin, TX 78701',
    capacity: 900,
    ticketRange: '$28-$54',
    avgAttendance: 91,
    selloutRate: 38,
    localRank: '#2 in Austin',
    rankingScore: 91,
    blurb: 'Multi-level Red River venue known for strong indie, rock, and crossover bookings with high conversion on emerging regional acts.',
    topGenres: [
      ['Indie Rock', '34%'],
      ['Alt Country', '24%'],
      ['Electronic', '18%'],
      ['Post Punk', '11%'],
      ['Americana', '9%'],
      ['Neo Soul', '7%'],
    ],
    pastArtists: ['Neon Bluff', 'Velvet Motel', 'Saint Loma', 'Night Arcade', 'Harborline', 'Marfa Bloom'],
    upcomingShows: [['Neon Bluff', 'Mar 28'], ['Harborline', 'Apr 10'], ['Passenger Bloom', 'Apr 23']],
    attendanceChart: [
      { label: 'Show 1', value: 68 },
      { label: 'Show 2', value: 72 },
      { label: 'Show 3', value: 76 },
      { label: 'Show 4', value: 74 },
      { label: 'Show 5', value: 79 },
      { label: 'Show 6', value: 83 },
      { label: 'Show 7', value: 81 },
      { label: 'Show 8', value: 86 },
      { label: 'Show 9', value: 89 },
      { label: 'Show 10', value: 91 },
    ],
  },
  {
    slug: 'antones',
    name: "Antone's",
    city: 'Austin',
    neighborhood: 'Downtown Austin',
    address: '305 E 5th St, Austin, TX 78701',
    capacity: 500,
    ticketRange: '$24-$48',
    avgAttendance: 79,
    selloutRate: 22,
    localRank: '#5 in Austin',
    rankingScore: 78,
    blurb: 'Historic blues club with reliable turnout on roots, blues, and heritage acts and stronger premium demand on anniversary programming.',
    topGenres: [
      ['Blues', '39%'],
      ['Americana', '20%'],
      ['Soul', '15%'],
      ['Country', '12%'],
      ['Rock', '9%'],
      ['Jazz', '5%'],
    ],
    pastArtists: ['Blue Mesa Choir', 'Passenger Bloom', 'Marfa Bloom', 'Southline Kids', 'Rio Static', 'Neon Bluff'],
    upcomingShows: [['Marfa Bloom', 'Apr 06'], ['Blue Mesa Choir', 'Apr 14'], ['Passenger Bloom', 'Apr 23']],
    attendanceChart: [
      { label: 'Show 1', value: 61 },
      { label: 'Show 2', value: 64 },
      { label: 'Show 3', value: 66 },
      { label: 'Show 4', value: 70 },
      { label: 'Show 5', value: 73 },
      { label: 'Show 6', value: 75 },
      { label: 'Show 7', value: 78 },
      { label: 'Show 8', value: 77 },
      { label: 'Show 9', value: 80 },
      { label: 'Show 10', value: 79 },
    ],
  },
  {
    slug: 'the-parish',
    name: 'The Parish',
    city: 'Austin',
    neighborhood: 'Downtown Austin',
    address: '214 E 6th St, Austin, TX 78701',
    capacity: 450,
    ticketRange: '$22-$42',
    avgAttendance: 80,
    selloutRate: 24,
    localRank: '#4 in Austin',
    rankingScore: 82,
    blurb: 'Intimate downtown room with strong sound reputation and steady performance across indie, electronic, and left-of-center touring acts.',
    topGenres: [
      ['Indie Rock', '28%'],
      ['Electronic', '24%'],
      ['Dream Pop', '18%'],
      ['Hip-Hop', '12%'],
      ['Alternative', '10%'],
      ['Comedy / Live Format', '8%'],
    ],
    pastArtists: ['Velvet Motel', 'Motel Vista', 'Night Arcade', 'Rio Static', 'Loft Signal', 'Cobra Palms'],
    upcomingShows: [['Velvet Motel', 'Apr 02'], ['Motel Vista', 'Apr 19'], ['Loft Signal', 'Apr 27']],
    attendanceChart: [
      { label: 'Show 1', value: 63 },
      { label: 'Show 2', value: 67 },
      { label: 'Show 3', value: 71 },
      { label: 'Show 4', value: 69 },
      { label: 'Show 5', value: 74 },
      { label: 'Show 6', value: 76 },
      { label: 'Show 7', value: 77 },
      { label: 'Show 8', value: 79 },
      { label: 'Show 9', value: 81 },
      { label: 'Show 10', value: 80 },
    ],
  },
  {
    slug: 'stable-hall',
    name: 'Stable Hall',
    city: 'San Antonio',
    neighborhood: 'Pearl District',
    address: '307 Pearl Pkwy, San Antonio, TX 78215',
    capacity: 1000,
    ticketRange: '$26-$58',
    avgAttendance: 88,
    selloutRate: 34,
    localRank: '#1 in San Antonio',
    rankingScore: 94,
    blurb: 'Pearl’s marquee music room with broad-format booking power and strong premium demand for breakout Texas and regional touring acts.',
    topGenres: [
      ['Latin Electronic', '22%'],
      ['Indie Rock', '21%'],
      ['Americana', '18%'],
      ['Country', '14%'],
      ['Alternative', '13%'],
      ['Soul', '12%'],
    ],
    pastArtists: ['Saint Loma', 'Rio Static', 'Cinder Vale', 'Night Arcade', 'Harborline', 'Marfa Bloom'],
    upcomingShows: [['Rio Static', 'Apr 04'], ['Cinder Vale', 'Apr 12'], ['Cobra Palms', 'Apr 24']],
    attendanceChart: [
      { label: 'Show 1', value: 72 },
      { label: 'Show 2', value: 76 },
      { label: 'Show 3', value: 79 },
      { label: 'Show 4', value: 82 },
      { label: 'Show 5', value: 84 },
      { label: 'Show 6', value: 86 },
      { label: 'Show 7', value: 85 },
      { label: 'Show 8', value: 88 },
      { label: 'Show 9', value: 90 },
      { label: 'Show 10', value: 88 },
    ],
  },
  {
    slug: 'paper-tiger',
    name: 'Paper Tiger',
    city: 'San Antonio',
    neighborhood: "North St. Mary's Strip",
    address: "2410 N St Mary's St, San Antonio, TX 78212",
    capacity: 1000,
    ticketRange: '$20-$39',
    avgAttendance: 84,
    selloutRate: 29,
    localRank: '#2 in San Antonio',
    rankingScore: 88,
    blurb: 'High-volume independent room on the Strip with strong alternative, punk, and indie traffic and dependable local scene conversion.',
    topGenres: [
      ['Indie Rock', '26%'],
      ['Punk / Hardcore', '19%'],
      ['Electronic', '17%'],
      ['Hip-Hop', '14%'],
      ['Alternative', '13%'],
      ['Country', '11%'],
    ],
    pastArtists: ['Saint Loma', 'Night Arcade', 'Loft Signal', 'Cinder Vale', 'Rio Static', 'Cobra Palms'],
    upcomingShows: [['Saint Loma', 'Mar 30'], ['Night Arcade', 'Apr 08'], ['Loft Signal', 'Apr 17']],
    attendanceChart: [
      { label: 'Show 1', value: 69 },
      { label: 'Show 2', value: 73 },
      { label: 'Show 3', value: 76 },
      { label: 'Show 4', value: 78 },
      { label: 'Show 5', value: 80 },
      { label: 'Show 6', value: 82 },
      { label: 'Show 7', value: 83 },
      { label: 'Show 8', value: 85 },
      { label: 'Show 9', value: 86 },
      { label: 'Show 10', value: 84 },
    ],
  },
  {
    slug: 'aztec-theatre',
    name: 'Aztec Theatre',
    city: 'San Antonio',
    neighborhood: 'Downtown / River Walk',
    address: "104 N St Mary's St, San Antonio, TX 78205",
    capacity: 1500,
    ticketRange: '$34-$89',
    avgAttendance: 86,
    selloutRate: 31,
    localRank: '#3 in San Antonio',
    rankingScore: 86,
    blurb: 'Historic downtown theater with large-capacity pull, strong event branding, and premium demand on national touring packages.',
    topGenres: [
      ['Alternative', '24%'],
      ['Latin', '19%'],
      ['Rock', '18%'],
      ['Hip-Hop', '14%'],
      ['Comedy / Special Event', '13%'],
      ['Electronic', '12%'],
    ],
    pastArtists: ['Loft Signal', 'Cobra Palms', 'Saint Loma', 'Rio Static', 'Neon Bluff', 'Night Arcade'],
    upcomingShows: [['Loft Signal', 'Apr 17'], ['Cobra Palms', 'Apr 21'], ['Saint Loma', 'May 02']],
    attendanceChart: [
      { label: 'Show 1', value: 70 },
      { label: 'Show 2', value: 74 },
      { label: 'Show 3', value: 77 },
      { label: 'Show 4', value: 79 },
      { label: 'Show 5', value: 81 },
      { label: 'Show 6', value: 83 },
      { label: 'Show 7', value: 84 },
      { label: 'Show 8', value: 86 },
      { label: 'Show 9', value: 87 },
      { label: 'Show 10', value: 86 },
    ],
  },
];

export const fastestGrowingChart: ChartPoint[] = [
  { label: 'Week 1', value: 102 },
  { label: 'Week 2', value: 108 },
  { label: 'Week 3', value: 111 },
  { label: 'Week 4', value: 118 },
  { label: 'Week 5', value: 126 },
  { label: 'Week 6', value: 131 },
  { label: 'Week 7', value: 137 },
  { label: 'Week 8', value: 145 },
  { label: 'Week 9', value: 152 },
  { label: 'Week 10', value: 161 },
  { label: 'Week 11', value: 169 },
  { label: 'Week 12', value: 178 },
];

export const artistAudienceChart: ChartPoint[] = [
  { label: 'Jan', value: 74 },
  { label: 'Feb', value: 79 },
  { label: 'Mar', value: 82 },
  { label: 'Apr', value: 88 },
  { label: 'May', value: 93 },
  { label: 'Jun', value: 96 },
  { label: 'Jul', value: 101 },
  { label: 'Aug', value: 109 },
  { label: 'Sep', value: 116 },
  { label: 'Oct', value: 121 },
  { label: 'Nov', value: 126 },
  { label: 'Dec', value: 132 },
];

export const venueAttendanceChart: ChartPoint[] = [
  { label: 'Show 1', value: 68 },
  { label: 'Show 2', value: 72 },
  { label: 'Show 3', value: 76 },
  { label: 'Show 4', value: 74 },
  { label: 'Show 5', value: 79 },
  { label: 'Show 6', value: 83 },
  { label: 'Show 7', value: 81 },
  { label: 'Show 8', value: 86 },
  { label: 'Show 9', value: 89 },
  { label: 'Show 10', value: 91 },
];

export const momentumComparisonChart: ChartPoint[] = [
  { label: 'W1', value: 94 },
  { label: 'W2', value: 99 },
  { label: 'W3', value: 103 },
  { label: 'W4', value: 109 },
  { label: 'W5', value: 115 },
  { label: 'W6', value: 118 },
  { label: 'W7', value: 124 },
];
