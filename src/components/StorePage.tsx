import React, { useState } from 'react';
import {
  Download,
  Search,
  Sparkles,
  Shield,
  Zap,
  Cpu,
  Flame,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { PanelItem } from '../types/panel';

interface StorePageProps {
  panels: PanelItem[];
  onSelectPanel: (panel: PanelItem) => void;
  onQuickInstall: (panel: PanelItem) => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  panels,
  onSelectPanel,
  onQuickInstall,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPanels = panels.filter((panel) => {
    const matchesSearch =
      panel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      panel.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      panel.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      panel.category === selectedCategory ||
      (selectedCategory === 'macro' && panel.category === 'macro') ||
      (selectedCategory === 'aim' && panel.category === 'aim');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section matching the mobile recording with premium elevated styling */}
      <section className="w-full pt-8 pb-6 px-4 sm:px-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle radial background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-12 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Brand Header */}
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            <span>Panel Stores</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/90 font-bold">
            YOUR APPS, ONE PLACE
          </p>
        </div>

        {/* Collection Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>APP COLLECTION</span>
        </div>

        {/* Big Catchy Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight max-w-xl text-balance">
          Discover your next app
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md font-medium">
          Choose an app below and tap Install to continue.
        </p>

        {/* Search & Filter Controls (Premium upgrade over the basic original) */}
        <div className="w-full max-w-md mt-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search panel, macro, sensitivity..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50 backdrop-blur-md transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-white/5 overflow-x-auto text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Panels
            </button>
            <button
              onClick={() => setSelectedCategory('aim')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'aim'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aim & Sensitivity
            </button>
            <button
              onClick={() => setSelectedCategory('macro')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'macro'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Gloo Wall & Macros
            </button>
            <button
              onClick={() => setSelectedCategory('fps')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'fps'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              120 FPS Boost
            </button>
          </div>
        </div>
      </section>

      {/* Featured Apps Section - Matches recording's 2-column mobile layout */}
      <section className="w-full max-w-5xl px-3 sm:px-6 py-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Featured apps</h3>
            <span className="text-[10px] text-cyan-400 font-mono px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/40">
              OB47 Verified
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredPanels.length} apps
          </span>
        </div>

        {/* 2-Column Responsive Grid (exactly 2 cols on mobile like video, 3 on large screens) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {filteredPanels.map((panel) => (
            <div
              key={panel.id}
              onClick={() => onSelectPanel(panel)}
              className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#111726]/90 to-[#0b101c]/90 border border-white/10 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-950/40 transition-all duration-300 cursor-pointer backdrop-blur-md overflow-hidden active:scale-[0.98]"
            >
              {/* Subtle card top glow highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row: Logo & Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                  {/* High Quality Themed App Icon */}
                  <div className="relative shrink-0">
                    <img
                      src={panel.iconUrl}
                      alt={panel.title}
                      className="w-16 h-16 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/10 shadow-md group-hover:scale-105 group-hover:border-cyan-400/40 transition-transform duration-300 bg-slate-900"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback container if image fails
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback SVG box if image missing */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-sm hidden group-has-[img:hidden]:flex">
                      {panel.shortTitle.slice(0, 2)}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="min-w-0 flex-1 w-full sm:w-auto">
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors truncate">
                      {panel.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5 font-medium">
                      {panel.tagline}
                    </p>
                    
                    {/* Status badge matching recording */}
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-slate-300 font-medium">
                        {panel.statusText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating & Downloads Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-white/5">
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    ★ {panel.rating.toFixed(1)}
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">
                    {panel.downloadsCount}
                  </span>
                </div>
              </div>

              {/* Install Button matching the recording action */}
              <div className="mt-3.5 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Opens page 2 / detail center as seen in screen recording
                    onSelectPanel(panel);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#172136] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-500 text-slate-200 hover:text-black font-semibold text-xs border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 group/btn cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-y-0.5" />
                  <span>Install</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPanels.length === 0 && (
          <div className="w-full py-12 text-center rounded-2xl bg-slate-900/40 border border-white/5 space-y-2">
            <p className="text-sm font-semibold text-slate-300">No panels found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-500">Try searching for "CLT", "SpaceX", or "Headshot"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs text-cyan-400 underline font-medium"
            >
              Reset search
            </button>
          </div>
        )}
      </section>

      {/* Trust & Features Strip (Anti-Slop, High-End Polish) */}
      <section className="w-full max-w-5xl px-4 sm:px-6 py-8 mt-4">
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0e1628]/90 to-slate-900/90 border border-white/10 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Anti-Ban 4.0</span>
                <span className="text-[11px] text-slate-400">Memory-level protection</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">0.04ms Input Delay</span>
                <span className="text-[11px] text-slate-400">Direct polling engine</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">No Root Required</span>
                <span className="text-[11px] text-slate-400">Works on all stock OS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">OB47 Patch Ready</span>
                <span className="text-[11px] text-slate-400">Auto server sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer matching the recording */}
      <footer className="w-full py-6 mt-4 text-center border-t border-white/5 text-xs text-slate-400 space-y-1">
        <p className="font-medium text-slate-300">
          © 2026 Panel Stores · Browse. Choose. Install.
        </p>
        <p className="text-[11px] text-slate-400">
          All gaming utilities are sandboxed and verified for player safety.
        </p>
      </footer>
    </div>
  );
};
