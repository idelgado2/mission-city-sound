'use client';

import Link from 'next/link';
import {
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  FireIcon,
  MapIcon,
  MusicalNoteIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { useMissionCity } from '@/app/ui/mission-city/app-shell';
import {
  artistAudienceChart,
  discoveryArtists,
  eventRows,
  fastestGrowingChart,
  insightCards,
  momentumComparisonChart,
  similarArtists,
  topVenues,
  trendingArtists,
  upcomingShows,
  artistShowHistory,
  cityComparisonRows,
  venueGenres,
  venueAttendanceChart,
  venuePastArtists,
  venueProfiles,
  venueRankings,
  venueUpcomingShows,
} from '@/app/ui/mission-city/data';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function formatGrowth(value: number) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-4xl text-base leading-7 text-zinc-400 md:text-lg">{description}</p>
      </div>
      {actions}
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  tone = 'green',
}: {
  label: string;
  value: string;
  change?: string;
  tone?: 'green' | 'red' | 'orange';
}) {
  const toneMap = {
    green: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    red: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    orange: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div className="panel-card">
      <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500 md:text-xs">{label}</div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="text-4xl font-semibold tracking-tight text-zinc-100 md:text-[2.75rem]">{value}</div>
        {change ? <span className={cn('rounded-full border px-3 py-1 text-xs font-medium', toneMap[tone])}>{change}</span> : null}
      </div>
    </div>
  );
}

function LineChartCard({
  title,
  subtitle,
  context,
  data,
  unit = '',
  valueLabel = 'Value',
  stroke = '#34d399',
  fill = 'rgba(52, 211, 153, 0.12)',
}: {
  title: string;
  subtitle: string;
  context?: string;
  data: { label: string; value: number }[];
  unit?: string;
  valueLabel?: string;
  stroke?: string;
  fill?: string;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const chartWidth = 520;
  const chartHeight = 210;
  const topPadding = 20;
  const bottomPadding = 26;
  const leftPadding = 10;
  const rightPadding = 10;
  const minValue = Math.min(...data.map((point) => point.value));
  const maxValue = Math.max(...data.map((point) => point.value));
  const valueRange = Math.max(maxValue - minValue, 1);
  const innerWidth = chartWidth - leftPadding - rightPadding;
  const innerHeight = chartHeight - topPadding - bottomPadding;
  const points = data.map((point, index) => {
    const x = leftPadding + (innerWidth * index) / Math.max(data.length - 1, 1);
    const normalized = (point.value - minValue) / valueRange;
    const y = topPadding + innerHeight - normalized * innerHeight;
    return { ...point, x, y };
  });
  const hoveredPoint = hoverIndex === null ? null : points[hoverIndex];
  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? chartWidth} ${chartHeight} L ${points[0]?.x ?? 0} ${chartHeight} Z`;
  const tooltipLeft = hoveredPoint ? Math.min(Math.max(hoveredPoint.x - 56, 12), chartWidth - 132) : 0;

  return (
    <div className="panel-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-zinc-200 md:text-lg">{title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
          {context ? <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500">{context}</p> : null}
        </div>
        <button className="chip-button chip-button-active">Last 12 weeks</button>
      </div>
      <div className="relative" onMouseLeave={() => setHoverIndex(null)}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-64 w-full md:h-72"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const ratio = bounds.width > 0 ? (event.clientX - bounds.left) / bounds.width : 0;
            const nextIndex = Math.min(data.length - 1, Math.max(0, Math.round(ratio * (data.length - 1))));
            setHoverIndex(nextIndex);
          }}
        >
          <defs>
            <linearGradient id={`fill-${title}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={fill.replace('0.12', '0.35')} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {[20, 65, 110, 155, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2={chartWidth} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
          ))}
          <path d={areaPath} fill={`url(#fill-${title})`} />
          <path d={linePath} fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {hoveredPoint ? (
            <line x1={hoveredPoint.x} y1={topPadding} x2={hoveredPoint.x} y2={chartHeight - bottomPadding / 2} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
          ) : null}
          {points.map((point, index) => (
            <circle
              key={`${point.label}-${point.value}`}
              cx={point.x}
              cy={point.y}
              r={index === hoverIndex ? '7' : '4.5'}
              fill={index === hoverIndex ? '#f4f4f5' : stroke}
              stroke="#081018"
              strokeWidth="4"
            />
          ))}
        </svg>
        {hoveredPoint ? (
          <div
            className="pointer-events-none absolute top-3 w-32 rounded-2xl border border-white/10 bg-[#0f151d]/95 px-3 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            style={{ left: `${(tooltipLeft / chartWidth) * 100}%` }}
          >
            <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">{hoveredPoint.label}</div>
            <div className="mt-1 text-xl font-semibold text-zinc-100">
              {hoveredPoint.value}
              {unit}
            </div>
            <div className="text-xs text-zinc-500">{valueLabel}</div>
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        <span>{data[0]?.label}</span>
        <span>Hover for exact values</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}

function DashboardHeatMap() {
  const [metric, setMetric] = useState<'activity' | 'demand'>('activity');
  const [hoveredHotspot, setHoveredHotspot] = useState<{ city: string; area: string; value: number } | null>(null);
  const cityMaps = [
    {
      city: 'Austin',
      path: 'M120 18 L164 32 L183 69 L178 115 L194 152 L164 198 L128 228 L90 236 L62 209 L48 168 L60 128 L44 85 L60 48 Z',
      hotspots:
        metric === 'activity'
          ? [
              { area: 'Downtown', x: 122, y: 124, size: 60, value: 92 },
              { area: 'East Austin', x: 148, y: 118, size: 44, value: 74 },
              { area: 'South Congress', x: 108, y: 162, size: 52, value: 81 },
            ]
          : [
              { area: 'Downtown', x: 122, y: 124, size: 54, value: 88 },
              { area: 'Red River', x: 136, y: 102, size: 40, value: 69 },
              { area: 'East Austin', x: 152, y: 132, size: 48, value: 77 },
            ],
    },
    {
      city: 'San Antonio',
      path: 'M116 20 L168 42 L187 84 L173 126 L186 166 L154 212 L110 234 L73 220 L52 184 L58 136 L42 96 L68 52 Z',
      hotspots:
        metric === 'activity'
          ? [
              { area: 'Downtown', x: 118, y: 126, size: 62, value: 89 },
              { area: 'Pearl District', x: 128, y: 94, size: 40, value: 68 },
              { area: 'Southtown', x: 104, y: 156, size: 48, value: 73 },
            ]
          : [
              { area: 'Downtown', x: 118, y: 126, size: 56, value: 84 },
              { area: 'Pearl District', x: 132, y: 96, size: 46, value: 79 },
              { area: 'St. Mary’s Strip', x: 108, y: 110, size: 42, value: 71 },
            ],
    },
  ];

  return (
    <div className="panel-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-zinc-200">City Heat Map</h3>
          <p className="mt-1 text-xs text-zinc-500">Fake hotspot map of district-level music activity and demand across Austin and San Antonio</p>
        </div>
        <div className="flex gap-2">
          <button className={cn('chip-button', metric === 'activity' ? 'chip-button-active' : '')} onClick={() => setMetric('activity')}>
            Activity
          </button>
          <button className={cn('chip-button', metric === 'demand' ? 'chip-button-active' : '')} onClick={() => setMetric('demand')}>
            Demand
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {cityMaps.map((map) => (
          <div key={map.city}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">{map.city}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-600">{metric === 'activity' ? 'Venue + artist activity' : 'Show demand intensity'}</div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%),linear-gradient(180deg,#0c131b_0%,#0a1016_100%)] p-5">
              <svg viewBox="0 0 240 260" className="h-[320px] w-full sm:h-[380px] md:h-[440px]">
                <defs>
                  <filter id={`blur-${map.city}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="18" />
                  </filter>
                </defs>
                <path d={map.path} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                <path d="M88 36 C108 90, 126 148, 134 214" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 7" />
                <path d="M66 118 C98 112, 142 114, 176 132" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 7" />
                {map.hotspots.map((spot) => (
                  <g key={spot.area}>
                    <circle cx={spot.x} cy={spot.y} r={spot.size / 2} fill={metric === 'activity' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'} filter={`url(#blur-${map.city})`} />
                    <circle cx={spot.x} cy={spot.y} r="6" fill={metric === 'activity' ? '#34d399' : '#f59e0b'} stroke="#081018" strokeWidth="3" />
                  </g>
                ))}
              </svg>
              <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/10 bg-[#0d141c]/90 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                {map.city} map
              </div>
              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                {map.hotspots.map((spot) => (
                  <button
                    key={spot.area}
                    onMouseEnter={() => setHoveredHotspot({ city: map.city, area: spot.area, value: spot.value })}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-[#0d141c]/88 px-4 py-3 text-left transition hover:border-emerald-500/20 hover:bg-[#111925]"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${metric === 'activity' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span className="text-sm font-medium text-zinc-100">{spot.area}</span>
                    </div>
                    <span className="text-sm text-zinc-400">{spot.value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-zinc-400 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${metric === 'activity' ? 'bg-emerald-400' : 'bg-amber-400'}`} /> Hotspot intensity</span>
          <span className="text-zinc-500">Values are fake market scores for presentation</span>
        </div>
        <div className="text-zinc-200">
          {hoveredHotspot ? `${hoveredHotspot.city} • ${hoveredHotspot.area} • ${hoveredHotspot.value}` : 'Hover a hotspot row to inspect a district'}
        </div>
      </div>
    </div>
  );
}

export function DashboardScreen() {
  const { city, notify } = useMissionCity();
  const artists = trendingArtists.filter((artist) => artist.city === city).slice(0, 6);
  const shows = upcomingShows.filter((show) => show.city === city).slice(0, 5);
  const venues = topVenues.filter((venue) => venue.city === city).slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Daily market pulse for Austin and San Antonio artist demand, venue health, and upcoming show pressure."
        actions={
          <div className="flex gap-3">
            <Link href="/insights" className="primary-button">View market brief</Link>
            <button className="secondary-button" onClick={() => notify('Executive dashboard snapshot shared.')}>Share snapshot</button>
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="panel-card xl:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-200">Trending Artists</h3>
            <span className="text-xs text-zinc-500">Updated 14 min ago</span>
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-left text-sm md:text-base">
            <thead className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="pb-3 font-medium">Artist</th>
                <th className="pb-3 font-medium">Growth</th>
                <th className="pb-3 font-medium">Genre</th>
                <th className="pb-3 font-medium">City</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.name} className="border-t border-white/6 text-zinc-300">
                  <td className="py-4 font-medium text-zinc-100">
                    <Link href="/artist-profile" className="transition hover:text-emerald-300">{artist.name}</Link>
                  </td>
                  <td className="py-4 text-emerald-400">{formatGrowth(artist.growth)}</td>
                  <td className="py-4">{artist.genre}</td>
                  <td className="py-4">{artist.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className="xl:col-span-5">
          <LineChartCard
            title="Fastest Growing Artists"
            subtitle="Composite audience growth index for the top breakout artist cohort"
            context="Shows the indexed weekly growth score for the strongest-performing local artist set. The curve combines follower gains, streaming lift, and local engagement, rebased to 100 at the start of the 12-week window."
            data={fastestGrowingChart}
            valueLabel="Growth index"
          />
        </div>
        <div className="panel-card xl:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-200">Upcoming Shows</h3>
            <CalendarDaysIcon className="h-5 w-5 text-zinc-500" />
          </div>
          <div className="space-y-3">
            {shows.map((show) => (
              <Link key={show.artist} href="/events" className="block rounded-2xl border border-white/6 bg-white/[0.02] p-4 transition hover:border-emerald-500/25 hover:bg-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-zinc-100">{show.artist}</div>
                  <div className="text-xs text-zinc-500">{show.date}</div>
                </div>
                <div className="mt-1 text-sm text-zinc-400">{show.venue}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="panel-card xl:col-span-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-200">Top Venues</h3>
            <span className="text-xs text-zinc-500">Leaderboard by room efficiency, pricing, and sellout strength</span>
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-[860px] w-full text-sm md:text-base">
            <thead className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="pb-3 text-left font-medium">Rank</th>
                <th className="pb-3 text-left font-medium">Venue</th>
                <th className="pb-3 text-left font-medium">Capacity</th>
                <th className="pb-3 text-left font-medium">Ticket range</th>
                <th className="pb-3 text-left font-medium">Avg attendance</th>
                <th className="pb-3 text-left font-medium">Sellout</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.name} className="border-t border-white/6 text-zinc-300">
                  <td className="py-4">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                      #{venue.rank}
                    </span>
                  </td>
                  <td className="py-4 font-medium text-zinc-100">
                    <Link href="/venue-profile" className="transition hover:text-emerald-300">{venue.name}</Link>
                  </td>
                  <td className="py-4">{venue.capacity}</td>
                  <td className="py-4 text-zinc-400">{venue.ticketRange}</td>
                  <td className="py-4">{venue.attendance}%</td>
                  <td className="py-4 text-amber-300">{venue.sellout}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className="xl:col-span-12">
          <DashboardHeatMap />
        </div>
      </div>
    </div>
  );
}

export function ArtistProfileScreen() {
  const { notify, toggleSavedArtist, savedArtists } = useMissionCity();
  const isSaved = savedArtists.includes('Saint Loma');

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
      <div className="space-y-5 xl:col-span-8">
        <PageHeader
          title="Artist Profile"
          description="Audience growth, venue conversion, and cross-city traction for artists moving in the Texas corridor."
          actions={
            <div className="flex gap-3">
              <button className="primary-button" onClick={() => toggleSavedArtist('Saint Loma')}>
                {isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
              </button>
              <Link href="/events" className="secondary-button">See upcoming shows</Link>
            </div>
          }
        />
        <div className="panel-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-semibold tracking-tight text-zinc-50">Saint Loma</h3>
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                  Local Heat Score 92
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Indie Rock • San Antonio</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {['Instagram', 'Spotify', 'TikTok'].map((network) => (
                  <button key={network} className="chip-button" onClick={() => notify(`${network} profile opened for Saint Loma.`)}>
                    {network}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-emerald-300">
              Breaking out
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
          <StatCard label="Followers" value="118.6K" change="+12.8%" tone="green" />
          <StatCard label="Monthly Streams" value="1.42M" change="+18.2%" tone="green" />
          <StatCard label="30 / 60 / 90" value="+11 / +18 / +26" change="Growth" tone="orange" />
          <StatCard label="Show Conversion" value="6.9%" change="-0.8%" tone="red" />
        </div>
        <LineChartCard
          title="Audience Growth Over Time"
          subtitle="Follower trajectory across major social and streaming platforms"
          context="Monthly audience totals for Saint Loma, showing how social reach and streaming audience expanded over the last year."
          data={artistAudienceChart}
          valueLabel="Audience total"
          unit="K"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="panel-card">
            <h3 className="text-sm font-medium text-zinc-200">Audience Breakdown</h3>
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#34d399_0_62%,#f59e0b_62%_100%)] p-4">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0f151d] text-center">
                  <div>
                    <div className="text-3xl font-semibold text-zinc-100">62%</div>
                    <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">Austin</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-zinc-100">Austin</div>
                  <div className="mt-1 h-2 w-40 rounded-full bg-white/5">
                    <div className="h-2 w-[62%] rounded-full bg-emerald-400" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-100">San Antonio</div>
                  <div className="mt-1 h-2 w-40 rounded-full bg-white/5">
                    <div className="h-2 w-[38%] rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-card">
            <h3 className="text-sm font-medium text-zinc-200">Engagement Metrics</h3>
            <div className="mt-5 space-y-4">
              {[
                ['Likes', '84.2K', 'green'],
                ['Shares', '12.4K', 'orange'],
                ['Saves', '19.8K', 'green'],
              ].map(([label, value, tone]) => (
                <button
                  key={label}
                  onClick={() => notify(`${label} breakdown opened.`)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-left"
                >
                  <div className="text-sm text-zinc-400">{label}</div>
                  <div className={cn('text-sm font-medium', tone === 'green' ? 'text-emerald-400' : 'text-amber-300')}>{value}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="panel-card">
            <h3 className="mb-4 text-sm font-medium text-zinc-200">Show History</h3>
            <div className="space-y-3 text-sm">
              {artistShowHistory.map(([venue, attendance]) => (
                <Link key={venue} href="/venue-profile" className="flex items-center justify-between border-b border-white/6 pb-3 text-zinc-300 transition hover:text-zinc-100 last:border-b-0 last:pb-0">
                  <span className="font-medium text-zinc-100">{venue}</span>
                  <span>{attendance}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="panel-card">
            <h3 className="mb-4 text-sm font-medium text-zinc-200">Similar Artists</h3>
            <div className="space-y-3">
              {similarArtists.map((artist) => (
                <button key={artist} onClick={() => notify(`${artist} comparison panel opened.`)} className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                  <span className="text-sm font-medium text-zinc-100">{artist}</span>
                  <FireIcon className="h-4 w-4 text-amber-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-5 xl:col-span-4">
        <StatCard label="Local Rank" value="#4" change="SA indie" tone="orange" />
        <StatCard label="Ticket Velocity" value="72%" change="+9.4%" tone="green" />
        <StatCard label="Fan Retention" value="64%" change="+4.1%" tone="green" />
        <div className="panel-card">
          <h3 className="text-sm font-medium text-zinc-200">Market Notes</h3>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Saint Loma is converting strongest in central San Antonio while showing fresh spillover into Austin&apos;s east-side indie circuit. Booking upside is highest in rooms sized 800 to 1,500 capacity.
          </p>
          <button className="secondary-button mt-5" onClick={() => notify('Market notes exported to weekly report.')}>
            Add note to report
          </button>
        </div>
      </div>
    </div>
  );
}

export function VenueProfileScreen() {
  const { city, notify } = useMissionCity();
  const cityVenues = useMemo(() => venueProfiles.filter((venue) => venue.city === city), [city]);
  const [selectedVenueSlug, setSelectedVenueSlug] = useState<string | null>(null);
  const selectedVenue =
    cityVenues.find((venue) => venue.slug === selectedVenueSlug) ??
    cityVenues[0] ??
    venueProfiles[0];

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
      <div className="space-y-5 xl:col-span-8">
        <PageHeader
          title="Venue Profile"
          description="Venue performance snapshots for operators and promoters evaluating fit, pricing power, and genre concentration. Choose a real Austin or San Antonio room to inspect."
          actions={
            <div className="flex gap-3">
              <Link href="/events" className="primary-button">See calendar</Link>
              <button className="secondary-button" onClick={() => notify('Promoter outreach draft created.')}>Contact promoter</button>
            </div>
          }
        />
        <div className="panel-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-zinc-200">Choose Venue</h3>
              <p className="mt-1 text-xs text-zinc-500">Showing real venues in {city}</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-500">
              {city}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {cityVenues.map((venue) => (
              <button
                key={venue.slug}
                onClick={() => setSelectedVenueSlug(venue.slug)}
                className={cn('chip-button', selectedVenue.slug === venue.slug ? 'chip-button-active' : '')}
              >
                {venue.name}
              </button>
            ))}
          </div>
        </div>
        <div className="panel-card">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-zinc-50">{selectedVenue.name}</h3>
              <p className="mt-2 text-sm text-zinc-400">
                {selectedVenue.address} • {selectedVenue.neighborhood} • Capacity {selectedVenue.capacity}
              </p>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              {selectedVenue.localRank}
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">{selectedVenue.blurb}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatCard label="Avg Attendance" value={`${selectedVenue.avgAttendance}%`} change="+6.2%" tone="green" />
          <StatCard label="Sellout Rate" value={`${selectedVenue.selloutRate}%`} change="+4.7%" tone="green" />
          <StatCard label="Ticket Range" value={selectedVenue.ticketRange} change="Healthy" tone="orange" />
        </div>
        <LineChartCard
          title="Attendance Over Time"
          subtitle="Room utilization across the last 10 hosted dates"
          context={`Attendance percent by recent show date at ${selectedVenue.name}. Hover to inspect exact room utilization for each event.`}
          data={selectedVenue.attendanceChart}
          valueLabel="Attendance rate"
          unit="%"
          stroke="#f59e0b"
          fill="rgba(245, 158, 11, 0.12)"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="panel-card">
            <h3 className="mb-4 text-sm font-medium text-zinc-200">Top Genres</h3>
            <div className="space-y-4">
              {selectedVenue.topGenres.map(([genre, share]) => (
                <button key={genre} onClick={() => notify(`${genre} genre report opened.`)} className="w-full text-left">
                  <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                    <span>{genre}</span>
                    <span>{share}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: share }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="panel-card">
            <h3 className="mb-4 text-sm font-medium text-zinc-200">Past Artists</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {selectedVenue.pastArtists.map((artist) => (
                <Link key={artist} href="/artist-profile" className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/25 hover:text-zinc-100">
                  {artist}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-5 xl:col-span-4">
        <div className="panel-card">
          <h3 className="mb-4 text-sm font-medium text-zinc-200">Upcoming Shows</h3>
          <div className="space-y-3">
            {selectedVenue.upcomingShows.map(([artist, date]) => (
              <Link key={artist} href="/events" className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 transition hover:border-emerald-500/25">
                <span className="text-sm font-medium text-zinc-100">{artist}</span>
                <span className="text-xs text-zinc-500">{date}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="panel-card">
          <h3 className="mb-4 text-sm font-medium text-zinc-200">Venue Ranking</h3>
          <div className="space-y-4 text-sm">
            {venueProfiles
              .filter((venue) => venue.city === city)
              .sort((a, b) => b.rankingScore - a.rankingScore)
              .map((venue, index) => (
              <button key={venue.slug} onClick={() => notify(`${venue.name} ranking details opened.`)} className="flex w-full items-center justify-between text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-400">
                    {index + 1}
                  </span>
                  <span className={venue.name === selectedVenue.name ? 'font-medium text-zinc-100' : ''}>{venue.name}</span>
                </div>
                <span className="text-emerald-400">{venue.rankingScore}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DiscoveryScreen() {
  const { city, savedArtists, toggleSavedArtist, notify } = useMissionCity();
  const [genreFilter, setGenreFilter] = useState('All');
  const [sortKey, setSortKey] = useState<'score' | 'growth' | 'followers'>('score');
  const availableGenres = useMemo(
    () => ['All', ...Array.from(new Set(discoveryArtists.filter((artist) => artist.city === city).map((artist) => artist.genre)))],
    [city],
  );

  const filteredArtists = useMemo(() => {
    return discoveryArtists
      .filter((artist) => artist.city === city)
      .filter((artist) => genreFilter === 'All' || artist.genre === genreFilter)
      .sort((a, b) => b[sortKey] - a[sortKey]);
  }, [city, genreFilter, sortKey]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Discovery Explorer"
        description="Scan, compare, and shortlist artists by demand signal, audience quality, and local heat score."
        actions={
          <button className="secondary-button" onClick={() => notify(`Saved ${savedArtists.length} artists to shortlist report.`)}>
            Export shortlist
          </button>
        }
      />
      <div className="panel-card">
        <div className="flex flex-wrap gap-3">
          {availableGenres.map((genre) => (
            <button key={genre} onClick={() => setGenreFilter(genre)} className={cn('chip-button', genreFilter === genre ? 'chip-button-active' : '')}>
              Genre: {genre}
            </button>
          ))}
          {[
            ['Sort: Score', 'score'],
            ['Sort: Growth', 'growth'],
            ['Sort: Followers', 'followers'],
          ].map(([label, value]) => (
            <button key={value} onClick={() => setSortKey(value as 'score' | 'growth' | 'followers')} className={cn('chip-button', sortKey === value ? 'chip-button-active' : '')}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard label="Visible Artists" value={String(filteredArtists.length)} change={city} tone="orange" />
        <StatCard label="Saved Artists" value={String(savedArtists.length)} change="Watchlist" tone="green" />
        <StatCard label="Top Score" value={String(filteredArtists[0]?.score ?? 0)} change={filteredArtists[0]?.artist ?? 'No results'} tone="green" />
      </div>
      <div className="panel-card overflow-hidden">
        <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full text-left text-sm md:text-base">
          <thead className="border-b border-white/8 bg-white/[0.02] text-xs uppercase tracking-[0.18em] text-zinc-500">
            <tr>
              <th className="px-4 py-4 font-medium">Save</th>
              <th className="px-4 py-4 font-medium">Artist</th>
              <th className="px-4 py-4 font-medium">City</th>
              <th className="px-4 py-4 font-medium">Genre</th>
              <th className="px-4 py-4 font-medium">Followers</th>
              <th className="px-4 py-4 font-medium">Growth %</th>
              <th className="px-4 py-4 font-medium">Engagement</th>
              <th className="px-4 py-4 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map((artist) => {
              const saved = savedArtists.includes(artist.artist);
              return (
                <tr key={artist.artist} className="border-b border-white/6 text-zinc-300 last:border-b-0">
                  <td className="px-4 py-4">
                    <button onClick={() => toggleSavedArtist(artist.artist)}>
                      <StarIcon className={cn('h-5 w-5', saved ? 'fill-amber-300 text-amber-300' : 'text-zinc-600')} />
                    </button>
                  </td>
                  <td className="px-4 py-4 font-medium text-zinc-100">
                    <Link href="/artist-profile" className="transition hover:text-emerald-300">{artist.artist}</Link>
                  </td>
                  <td className="px-4 py-4">{artist.city}</td>
                  <td className="px-4 py-4">{artist.genre}</td>
                  <td className="px-4 py-4">{artist.followers}K</td>
                  <td className="px-4 py-4 text-emerald-400">{formatGrowth(artist.growth)}</td>
                  <td className="px-4 py-4">{artist.engagement}%</td>
                  <td className="px-4 py-4">
                    <button onClick={() => notify(`${artist.artist} scorecard opened.`)} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      {artist.score}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export function EventsScreen() {
  const { city, notify } = useMissionCity();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [genreFilter, setGenreFilter] = useState('All');
  const availableGenres = useMemo(
    () => ['All', ...Array.from(new Set(eventRows.filter((event) => event.city === city).map((event) => event.genre)))],
    [city],
  );

  const rows = eventRows.filter((event) => event.city === city).filter((event) => genreFilter === 'All' || event.genre === genreFilter);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Events"
        description="Track upcoming shows, expected demand, and booking pressure across both markets."
        actions={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm text-zinc-400">
            <button className={cn('rounded-full px-4 py-2', viewMode === 'list' ? 'bg-white/[0.05] text-zinc-200' : '')} onClick={() => setViewMode('list')}>
              List
            </button>
            <button className={cn('rounded-full px-4 py-2', viewMode === 'map' ? 'bg-white/[0.05] text-zinc-200' : '')} onClick={() => setViewMode('map')}>
              Map
            </button>
          </div>
        }
      />
      <div className="panel-card">
        <div className="flex flex-wrap gap-3">
          {availableGenres.map((genre) => (
            <button key={genre} onClick={() => setGenreFilter(genre)} className={cn('chip-button', genreFilter === genre ? 'chip-button-active' : '')}>
              Genre: {genre}
            </button>
          ))}
          <button className="chip-button chip-button-active">Date: Next 30 days</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className={cn(viewMode === 'map' ? 'xl:col-span-6' : 'xl:col-span-8', 'panel-card overflow-hidden')}>
          <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm md:text-base">
            <thead className="border-b border-white/8 bg-white/[0.02] text-xs uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="px-4 py-4 text-left font-medium">Artist</th>
                <th className="px-4 py-4 text-left font-medium">Venue</th>
                <th className="px-4 py-4 text-left font-medium">Date</th>
                <th className="px-4 py-4 text-left font-medium">Demand</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((event) => (
                <tr key={`${event.artist}-${event.date}`} className="border-b border-white/6 text-zinc-300 last:border-b-0">
                  <td className="px-4 py-4 font-medium text-zinc-100">
                    <Link href="/artist-profile" className="transition hover:text-emerald-300">{event.artist}</Link>
                  </td>
                  <td className="px-4 py-4">
                    <Link href="/venue-profile" className="transition hover:text-zinc-100">{event.venue}</Link>
                  </td>
                  <td className="px-4 py-4">{event.date}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => notify(`${event.artist} demand memo opened.`)}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium',
                        event.demand === 'High'
                          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                          : event.demand === 'Rising'
                            ? 'border-amber-500/20 bg-amber-500/10 text-amber-300'
                            : 'border-white/10 bg-white/[0.03] text-zinc-300',
                      )}
                    >
                      {event.demand}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className={cn(viewMode === 'map' ? 'xl:col-span-6' : 'xl:col-span-4', 'panel-card')}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-200">{viewMode === 'map' ? 'Live map view' : 'Market map view'}</h3>
            <MapIcon className="h-5 w-5 text-zinc-500" />
          </div>
          <div className="rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,#0d141c_0%,#0a1016_100%)] p-4">
            {[
              {
                cityLabel: 'Austin',
                path: 'M120 18 L164 32 L183 69 L178 115 L194 152 L164 198 L128 228 L90 236 L62 209 L48 168 L60 128 L44 85 L60 48 Z',
                spots: [
                  { label: 'Downtown', left: '47%', top: '33%', tone: 'high' },
                  { label: 'East Austin', left: '61%', top: '38%', tone: 'rising' },
                  { label: 'South Congress', left: '40%', top: '54%', tone: 'high' },
                ],
              },
              {
                cityLabel: 'San Antonio',
                path: 'M116 20 L168 42 L187 84 L173 126 L186 166 L154 212 L110 234 L73 220 L52 184 L58 136 L42 96 L68 52 Z',
                spots: [
                  { label: 'Downtown', left: '45%', top: '37%', tone: 'high' },
                  { label: 'Pearl', left: '53%', top: '26%', tone: 'rising' },
                  { label: 'Southtown', left: '39%', top: '55%', tone: 'high' },
                ],
              },
            ]
              .filter((cityMap) => cityMap.cityLabel === city)
              .map((cityMap) => (
                <div key={cityMap.cityLabel} className="relative overflow-hidden rounded-[22px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_36%),linear-gradient(180deg,#101922_0%,#0d141b_100%)] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">{cityMap.cityLabel}</span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-600">Fake demand map</span>
                  </div>
                  <div className="relative h-[320px]">
                    <svg viewBox="0 0 240 260" className="h-full w-full">
                      <defs>
                        <filter id={`event-blur-${cityMap.cityLabel}`} x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="16" />
                        </filter>
                      </defs>
                      <path d={cityMap.path} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                      <path d="M88 36 C108 90, 126 148, 134 214" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 7" />
                      <path d="M66 118 C98 112, 142 114, 176 132" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 7" />
                    </svg>
                    {cityMap.spots.map((spot) => (
                      <button
                        key={spot.label}
                        onClick={() => notify(`${cityMap.cityLabel} ${spot.label} cluster selected.`)}
                        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ left: spot.left, top: spot.top }}
                      >
                        <span
                          className={`absolute inset-0 rounded-full ${spot.tone === 'high' ? 'bg-emerald-400 shadow-[0_0_0_10px_rgba(52,211,153,0.12)]' : 'bg-amber-400 shadow-[0_0_0_10px_rgba(245,158,11,0.12)]'}`}
                        />
                        <span
                          className={`absolute -inset-3 rounded-full blur-md ${spot.tone === 'high' ? 'bg-emerald-400/35' : 'bg-amber-400/30'}`}
                          style={{ filter: `url(#event-blur-${cityMap.cityLabel})` }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            <div className="mt-4 rounded-2xl border border-white/8 bg-[#0d141c]/90 p-4">
              <div className="text-sm font-medium text-zinc-100">Demand clusters</div>
              <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> High</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400" /> Rising</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard label="Upcoming Shows" value={String(rows.length)} change={city} tone="green" />
        <StatCard label="High Demand" value={String(rows.filter((event) => event.demand === 'High').length)} change="Priority" tone="orange" />
        <StatCard label="Rising Shows" value={String(rows.filter((event) => event.demand === 'Rising').length)} change="Watchlist" tone="green" />
      </div>
    </div>
  );
}

export function InsightsScreen() {
  const { notify } = useMissionCity();

  const downloadReport = () => {
    const content = `Mission City Sound Weekly Report\n\nTrending genre: Latin Electronic +31%\nFastest growing artist: Neon Bluff\nVenue demand: Austin mid-size rooms +12%`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mission-city-sound-report.txt';
    link.click();
    URL.revokeObjectURL(url);
    notify('Weekly report downloaded.');
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Insights & Reports"
        description="Weekly market intelligence tailored for label strategy, promoter planning, and venue performance reviews."
        actions={
          <button className="primary-button inline-flex items-center gap-2" onClick={downloadReport}>
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download report
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {insightCards.map((card) => (
          <button key={card.title} onClick={() => notify(`${card.title} detail card opened.`)} className="panel-card text-left">
            <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{card.title}</div>
            <div className={cn('mt-4 text-2xl font-semibold', card.tone === 'green' ? 'text-emerald-400' : 'text-amber-300')}>{card.value}</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{card.detail}</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <LineChartCard
            title="Austin vs San Antonio Momentum"
            subtitle="Seven-week comparison of artist growth velocity"
            context="Indexed market momentum reading based on aggregate artist growth, engagement acceleration, and show demand velocity."
            data={momentumComparisonChart}
            valueLabel="Momentum index"
            stroke="#34d399"
            fill="rgba(52, 211, 153, 0.12)"
          />
        </div>
        <div className="panel-card xl:col-span-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-zinc-200">City Comparison Snapshot</h3>
              <p className="mt-1 text-xs text-zinc-500">Relative performance across supply and demand metrics</p>
            </div>
            <MusicalNoteIcon className="h-5 w-5 text-zinc-500" />
          </div>
          <div className="space-y-4">
            {cityComparisonRows.map(([metric, winner, austin, sa]) => (
              <button key={metric} onClick={() => notify(`${metric} comparison expanded.`)} className="w-full rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-100">{metric}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{winner} leads</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white/[0.03] px-3 py-2 text-zinc-300">Austin {austin}</div>
                  <div className="rounded-xl bg-white/[0.03] px-3 py-2 text-zinc-300">San Antonio {sa}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
