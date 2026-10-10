import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Star,
  CheckCircle,
  Zap,
  Target,
  Settings,
  Smartphone,
  Shield,
  Share2,
  Bookmark,
  Check,
  ExternalLink
} from 'lucide-react';
import { PanelItem } from '../types/panel';
import { TutorialVideoPlayer } from './TutorialVideoPlayer';

interface DetailPageProps {
  panel: PanelItem;
  allPanels: PanelItem[];
  onBack: () => void;
  onOpenInstall: (panel: PanelItem) => void;
  onSelectOtherPanel: (panel: PanelItem) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  panel,
  allPanels,
  onBack,
  onOpenInstall,
  onSelectOtherPanel,
}) => {
  const [isCopiedShare, setIsCopiedShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopiedShare(true);
    setTimeout(() => setIsCopiedShare(false), 2000);
  };

  const handleDirectInstall = () => {
    // Open the official TeraBox download link provided by the user
    window.open(panel.installUrl, '_blank', 'noopener,noreferrer');
    // Also trigger the in-app modal with instructions and VIP key
    onOpenInstall(panel);
  };

  const otherPanels = allPanels.filter((p) => p.id !== panel.id);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Page 2 Top Navigation: Back button matching the recording */}
      <div className="w-full max-w-4xl px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 py-1.5 px-3 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Panel Stores</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Save panel"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 p-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {isCopiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isCopiedShare ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl px-4 sm:px-6 py-2 flex flex-col items-center text-center">
        {/* Team Banner matching recording */}
        <div className="space-y-1 mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight">
            {panel.developerTeam}
          </h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
            PREMIUM GAMING EXPERIENCE
          </p>
        </div>

        {/* Center Tag matching recording */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OFFICIAL DOWNLOAD CENTER</span>
        </div>

        {/* Big Tool Title matching recording */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance">
          {panel.heroHeadline}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-lg font-medium leading-relaxed">
          {panel.heroSubtitle}
        </p>

        {/* 26-Second Step-by-Step TeraBox Tutorial Video Player */}
        <TutorialVideoPlayer panelTitle={panel.title} installUrl={panel.installUrl} />

        {/* Download Box Card (Exact structure matching the screen recording, with high-end craftsmanship) */}
        <div className="w-full mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#111827] to-[#090e1a] border border-white/10 shadow-2xl relative overflow-hidden text-left">
          {/* Card Top Row: App Logo, Title, Subtitle, Star Rating */}
          <div className="flex items-start gap-4">
            <img
              src={panel.iconUrl}
              alt={panel.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-cyan-500/30 shadow-lg shrink-0 bg-slate-900"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {panel.title}
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  {panel.version}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
                Download {panel.title}
              </p>

              {/* Star rating matching video: 5 stars + "Premium Experience" */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  Premium Experience
                </span>
              </div>
            </div>
          </div>

          {/* 4 Feature Tags Row matching video */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-200">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">Fast Experience</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-200">
              <Target className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">Gaming Ready</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-200">
              <Settings className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Easy Setup</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-200">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Mobile Friendly</span>
            </div>
          </div>

          {/* Primary CTA Button matching video: "⬇ Install Now" linked directly to TeraBox */}
          <div className="mt-5 space-y-2">
            <button
              onClick={handleDirectInstall}
              className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Install Now</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Tap the button above to continue to the TeraBox download page.
            </p>
          </div>
        </div>

        {/* Specifications & Anti-Ban Details Grid */}
        <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Package Size</span>
            <span className="text-xs font-bold text-white font-mono">{panel.fileSize}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Target Game</span>
            <span className="text-xs font-bold text-white truncate block">{panel.compatibility.targetGame}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Anti-Ban Protection</span>
            <span className="text-xs font-bold text-emerald-400 block">{panel.compatibility.antiBanStatus}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Root / Jailbreak</span>
            <span className="text-xs font-bold text-cyan-400 block">Not Required (0-Risk)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Downloads</span>
            <span className="text-xs font-bold text-white font-mono">{panel.downloadsCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Direct Mirror</span>
            <span className="text-xs font-bold text-cyan-400 truncate block">TeraBox High Speed</span>
          </div>
        </div>

        {/* Core Features & Highlights */}
        <div className="w-full mt-6 p-5 rounded-2xl bg-[#0e1424] border border-white/10 text-left space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Engine Features & Capabilities</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {panel.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Player Reviews */}
        <div className="w-full mt-6 p-5 rounded-2xl bg-[#0e1424] border border-white/10 text-left space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">Community Feedback</h4>
            <span className="text-xs text-slate-400">{panel.reviewCount} Reviews</span>
          </div>
          <div className="space-y-3">
            {panel.reviews.map((rev) => (
              <div key={rev.id} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{rev.author}</span>
                    <span className="text-[10px] text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800/40">
                      {rev.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>
                <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Other Panels Section */}
        <div className="w-full mt-8 text-left space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center justify-between">
            <span>More Featured Panels</span>
            <button
              onClick={onBack}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              View All 6 Panels
            </button>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {otherPanels.slice(0, 2).map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectOtherPanel(other)}
                className="p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 cursor-pointer transition-colors flex items-center gap-3"
              >
                <img
                  src={other.iconUrl}
                  alt={other.title}
                  className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{other.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{other.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer matching the recording */}
        <footer className="w-full py-8 mt-6 text-center border-t border-white/5 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">
            © 2026 {panel.developerTeam} · Gaming Community
          </p>
          <p className="text-[11px] text-slate-400">
            Safe sandbox distribution · TeraBox Cloud mirror enabled.
          </p>
        </footer>
      </div>
    </div>
  );
};
