import React from 'react';
import { Shield, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  activeView: 'store' | 'detail';
  onNavigateHome: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigateHome,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090d16]/85 border-b border-white/5 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-[#090d16] rounded-[6px] flex items-center justify-center">
              <span className="font-extrabold text-sm tracking-tighter bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                AP
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Panel Stores
            </span>
            <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-semibold -mt-1 hidden sm:block">
              Your Apps, One Place
            </span>
          </div>
        </button>

        {/* Zone 2: Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={onNavigateHome}
            className={`transition-colors whitespace-nowrap ${
              activeView === 'store' ? 'text-cyan-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Panel Collection
          </button>
          <span className="text-slate-600">·</span>
          <a href="#features" className="hover:text-white transition-colors whitespace-nowrap">
            Anti-Ban Guard
          </a>
          <span className="text-slate-600">·</span>
          <a href="#compatibility" className="hover:text-white transition-colors whitespace-nowrap">
            Device Support
          </a>
          <span className="text-slate-600">·</span>
          <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap">
            Setup Guide
          </a>
        </nav>

        {/* Zone 3: 1 primary action & Phone preview toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile frame toggle button for desktop preview */}
          <button
            type="button"
            onClick={onToggleMobileFrame}
            title={isMobileFrame ? 'Switch to Full Screen View' : 'Preview as Mobile Screen (Like Recording)'}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg border border-white/10 transition-colors whitespace-nowrap"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Web</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-rose-400" />
                <span>Mobile Frame</span>
              </>
            )}
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-semibold text-black bg-gradient-to-r from-cyan-400 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 rounded-lg shadow-md shadow-cyan-500/20 active:scale-95 transition-all whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeView === 'store' ? '6 Panels Live' : 'Back to Store'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
