'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  BellAlertIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { createContext, useContext, useMemo, useState } from 'react';
import { City, navItems, searchTargets } from '@/app/ui/mission-city/data';
import { MissionCityLogo } from '@/app/ui/mission-city/logo';

type MissionCityContextValue = {
  city: City;
  setCity: (city: City) => void;
  savedArtists: string[];
  toggleSavedArtist: (artist: string) => void;
  notify: (message: string) => void;
};

const MissionCityContext = createContext<MissionCityContextValue | null>(null);

export function useMissionCity() {
  const value = useContext(MissionCityContext);

  if (!value) {
    throw new Error('useMissionCity must be used within MissionCityShell');
  }

  return value;
}

export function MissionCityShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [city, setCity] = useState<City>('Austin');
  const [savedArtists, setSavedArtists] = useState<string[]>(['Neon Bluff', 'Saint Loma']);
  const [query, setQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toast, setToast] = useState('');

  const filteredTargets = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return searchTargets.filter((target) => target.name.toLowerCase().includes(normalized)).slice(0, 5);
  }, [query]);

  const toggleSavedArtist = (artist: string) => {
    setSavedArtists((current) =>
      current.includes(artist) ? current.filter((item) => item !== artist) : [...current, artist],
    );
    setToast(savedArtists.includes(artist) ? `${artist} removed from watchlist.` : `${artist} added to watchlist.`);
    window.clearTimeout((window as Window & { __missionCityToast?: number }).__missionCityToast);
    (window as Window & { __missionCityToast?: number }).__missionCityToast = window.setTimeout(() => setToast(''), 2400);
  };

  const notify = (message: string) => {
    setToast(message);
    window.clearTimeout((window as Window & { __missionCityToast?: number }).__missionCityToast);
    (window as Window & { __missionCityToast?: number }).__missionCityToast = window.setTimeout(() => setToast(''), 2400);
  };

  return (
    <MissionCityContext.Provider value={{ city, setCity, savedArtists, toggleSavedArtist, notify }}>
      <main className="min-h-screen bg-[#070b10] text-zinc-100">
        <div className="mx-auto flex min-h-screen max-w-[1720px] flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1117] shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:rounded-[30px]">
            <div className="border-b border-white/10 bg-[#0f151d]/95 px-4 py-4 backdrop-blur sm:px-5 sm:py-5 lg:px-7">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                <div className="flex items-center justify-between gap-3">
                  <Link href="/dashboard" className="flex items-center">
                    <MissionCityLogo />
                  </Link>
                  <button
                    className="icon-button xl:hidden"
                    onClick={() => setIsMobileNavOpen((current) => !current)}
                    aria-label="Toggle navigation menu"
                  >
                    {isMobileNavOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                  </button>
                </div>
                <div className="relative w-full xl:flex-1">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search artists or venues"
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-12 pr-4 text-base text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/40"
                  />
                  {filteredTargets.length > 0 ? (
                    <div className="absolute left-0 right-0 top-14 z-20 rounded-2xl border border-white/10 bg-[#0f151d] p-2 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                      {filteredTargets.map((target) => (
                        <Link
                          key={target.name}
                          href={target.href}
                          onClick={() => setQuery('')}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/[0.04] hover:text-zinc-100"
                        >
                          <span>{target.name}</span>
                          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{target.type}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-[22px] border border-emerald-500/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(255,255,255,0.03))] p-1.5">
                    <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
                      Market View
                    </div>
                    <div className="flex rounded-2xl bg-[#0d141c] p-1">
                    {(['Austin', 'San Antonio'] as City[]).map((cityOption) => (
                      <button
                        key={cityOption}
                        onClick={() => {
                          setCity(cityOption);
                          notify(`Viewing ${cityOption} market.`);
                        }}
                        className={`city-pill ${city === cityOption ? 'city-pill-active' : ''}`}
                      >
                        {cityOption}
                      </button>
                    ))}
                    </div>
                  </div>
                  <button className="icon-button" onClick={() => notify('Alerts panel refreshed.')}>
                    <BellAlertIcon className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <button className="icon-button" onClick={() => setIsProfileOpen((current) => !current)}>
                      <UserCircleIcon className="h-6 w-6" />
                    </button>
                    {isProfileOpen ? (
                      <div className="absolute right-0 top-14 z-20 w-56 rounded-2xl border border-white/10 bg-[#0f151d] p-2 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                        <div className="border-b border-white/6 px-4 py-3">
                          <div className="text-sm font-medium text-zinc-100">Morgan Price</div>
                          <div className="text-xs text-zinc-500">Head of Market Intelligence</div>
                        </div>
                        <button
                          onClick={() => {
                            notify('Profile preferences opened.');
                            setIsProfileOpen(false);
                          }}
                          className="w-full rounded-xl px-4 py-3 text-left text-sm text-zinc-300 transition hover:bg-white/[0.04] hover:text-zinc-100"
                        >
                          Preferences
                        </button>
                        <button
                          onClick={() => {
                            notify('Stakeholder summary shared.');
                            setIsProfileOpen(false);
                          }}
                          className="w-full rounded-xl px-4 py-3 text-left text-sm text-zinc-300 transition hover:bg-white/[0.04] hover:text-zinc-100"
                        >
                          Share Summary
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-5 hidden flex-col gap-3 xl:flex xl:flex-row xl:items-center xl:justify-between">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-tab ${active ? 'nav-tab-active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                  Viewing: {city}
                </div>
              </div>
              {isMobileNavOpen ? (
                <div className="mt-5 rounded-[26px] border border-white/10 bg-[#0d141c] p-3 xl:hidden">
                  <div className="mb-3 flex items-center justify-between px-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.26em] text-zinc-500">Navigate</div>
                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                      {city}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {navItems.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileNavOpen(false)}
                          className={`nav-tab flex justify-between px-4 py-3 text-base ${active ? 'nav-tab-active' : ''}`}
                        >
                          <span>{item.label}</span>
                          {active ? <span className="text-emerald-300">Current</span> : null}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="p-4 sm:p-5 lg:p-7">{children}</div>
          </div>
        </div>
        {toast ? (
          <div className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#10161e] px-4 py-3 text-sm text-zinc-200 shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md">
            <span>{toast}</span>
            <button onClick={() => setToast('')} className="rounded-full p-1 text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-200">
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </main>
    </MissionCityContext.Provider>
  );
}
