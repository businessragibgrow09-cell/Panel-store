import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  CheckCircle2,
  Download,
  MousePointerClick
} from 'lucide-react';

interface TutorialVideoPlayerProps {
  panelTitle: string;
  installUrl: string;
}

interface StepTimeline {
  start: number;
  end: number;
  title: string;
  hindiTranscript: string;
  screenType: 'installing' | 'terabox_share' | 'playstore' | 'google_login' | 'permission' | 'view_link' | 'download_apk' | 'downloading';
  buttonLabel?: string;
  arrowPos?: { x: number; y: number }; // Percentage from left, top
}

const TIMELINE: StepTimeline[] = [
  {
    start: 0,
    end: 3,
    title: 'App Installation Status',
    hindiTranscript: 'Guys is panel ko download karne ke liye simply niche mein Install Now pe tap karo...',
    screenType: 'installing',
    buttonLabel: 'Install Now',
    arrowPos: { x: 50, y: 70 }
  },
  {
    start: 3,
    end: 6,
    title: 'Open in TeraBox',
    hindiTranscript: 'Aur fir niche mein "View in TeraBox" pe tap karke...',
    screenType: 'terabox_share',
    buttonLabel: 'View in TeraBox',
    arrowPos: { x: 70, y: 88 }
  },
  {
    start: 6,
    end: 10,
    title: 'Get TeraBox App',
    hindiTranscript: 'Yahan "See in Play Store app" pe tap karke ise install kar lo...',
    screenType: 'playstore',
    buttonLabel: 'See in Play Store app',
    arrowPos: { x: 50, y: 65 }
  },
  {
    start: 10,
    end: 14,
    title: 'Quick Google Login',
    hindiTranscript: 'Aur ise open karke yahan continue with Google se kisi naye Gmail se login kar lo...',
    screenType: 'google_login',
    buttonLabel: 'Continue with Google',
    arrowPos: { x: 50, y: 55 }
  },
  {
    start: 14,
    end: 18,
    title: 'Storage Permission',
    hindiTranscript: 'Aur download karne ke liye permission ko allow kar dena aur ise on karke back aao...',
    screenType: 'permission',
    buttonLabel: 'Allow management of all files',
    arrowPos: { x: 80, y: 35 }
  },
  {
    start: 18,
    end: 21,
    title: 'View Copied Links',
    hindiTranscript: 'To yahan pe "View Now" pe jaise hi tap karoge...',
    screenType: 'view_link',
    buttonLabel: 'View Now',
    arrowPos: { x: 50, y: 62 }
  },
  {
    start: 21,
    end: 24,
    title: 'Download Panel APK',
    hindiTranscript: 'To tumhe is panel ko download karne ka option aa jayega...',
    screenType: 'download_apk',
    buttonLabel: 'Download',
    arrowPos: { x: 25, y: 72 }
  },
  {
    start: 24,
    end: 26,
    title: 'Download Finished',
    hindiTranscript: 'To bas yahan pe niche tap karke direct download kar lena!',
    screenType: 'downloading',
    buttonLabel: 'Downloading...',
    arrowPos: { x: 25, y: 78 }
  }
];

export const TutorialVideoPlayer: React.FC<TutorialVideoPlayerProps> = ({
  panelTitle,
  installUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(26); // Exactly 26 seconds as in video
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<any>(null);

  // Current active step
  const activeStep =
    TIMELINE.find((step) => currentTime >= step.start && currentTime < step.end) ||
    TIMELINE[TIMELINE.length - 1];

  // Timer loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return Math.min(duration, prev + 1);
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleScrub = (newTime: number) => {
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full mt-6 rounded-2xl bg-black border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/50 flex flex-col group">
      {/* Visual Video Screen Area */}
      <div className="relative aspect-[16/9] w-full bg-[#0a0f1d] flex items-center justify-center overflow-hidden select-none">
        {/* Dynamic Screen Mockup based on video timeline step */}
        {activeStep.screenType === 'installing' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-950/60 via-slate-950 to-black">
            <div className="w-full max-w-xs bg-slate-900/95 border border-purple-500/40 rounded-2xl p-4 shadow-2xl shadow-purple-950/50 space-y-3">
              <div className="text-[10px] text-purple-300 font-mono tracking-wide text-center uppercase">
                Forwarded from
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-black text-xs">
                  SPX
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">MACRO SPACE</h4>
                  <p className="text-[11px] text-cyan-400">Installing...</p>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-700"
                  style={{ width: `${((currentTime + 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {activeStep.screenType === 'terabox_share' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-950/40 to-black">
            <div className="w-full max-w-sm bg-white rounded-2xl p-4 text-slate-800 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                    T
                  </div>
                  <span className="font-bold text-xs">TeraBox Cloud Share</span>
                </div>
                <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-semibold">
                  Valid Link
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Latest_Proxy_Server.apk</p>
                  <p className="text-[10px] text-slate-500">6.7 MB · Verified Safe</p>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">Free</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button className="py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl">
                  Download
                </button>
                <button className="py-2 text-xs font-bold text-white bg-blue-600 rounded-xl shadow-md flex items-center justify-center gap-1">
                  <span>View in TeraBox</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep.screenType === 'playstore' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-slate-900">
            <div className="w-full max-w-sm bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white shadow-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                  T
                </div>
                <div>
                  <h4 className="text-sm font-bold">TeraBox: 1TB Cloud & AI Space</h4>
                  <p className="text-[11px] text-slate-400">Flextech Inc. · 100M+ Downloads</p>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 mt-0.5">
                    ★ 4.3 (3M reviews)
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Install from Play Store</span>
              </button>
            </div>
          </div>
        )}

        {activeStep.screenType === 'google_login' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-black/90">
            <div className="w-full max-w-xs bg-slate-900 border border-white/10 rounded-2xl p-4 text-center space-y-3 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500 mx-auto flex items-center justify-center text-white font-bold">
                T
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Log in to your TeraBox</h4>
                <p className="text-[10px] text-slate-400">Get your 1024GB Free Cloud Storage</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800 border border-red-500/50 flex items-center justify-center gap-2 text-xs font-semibold text-white">
                <span className="font-bold text-red-400">G</span>
                <span>Continue with Google</span>
              </div>
            </div>
          </div>
        )}

        {activeStep.screenType === 'permission' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-slate-950">
            <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-slate-300">All files access</div>
              <div className="p-3 rounded-xl bg-slate-800/80 flex items-center justify-between border border-white/5">
                <div>
                  <h5 className="text-xs font-semibold text-white">Allow management of all files</h5>
                  <p className="text-[10px] text-slate-400">Required for APK package download</p>
                </div>
                <div className="w-11 h-6 rounded-full bg-blue-500 p-0.5 flex items-center justify-end">
                  <div className="w-5 h-5 rounded-full bg-white shadow" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep.screenType === 'view_link' && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-black">
            <div className="w-full max-w-xs bg-slate-900 border border-cyan-500/30 rounded-2xl p-5 text-center space-y-3 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">View Copied Links</h4>
                <p className="text-[10px] text-slate-400">Cloud file ready for immediate access</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg">
                View Now
              </button>
            </div>
          </div>
        )}

        {(activeStep.screenType === 'download_apk' || activeStep.screenType === 'downloading') && (
          <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-slate-950">
            <div className="w-full max-w-sm bg-white rounded-2xl p-4 text-slate-800 space-y-3 shadow-2xl">
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                  APK
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">MACRO SPACE.apk</p>
                  <p className="text-[10px] text-slate-500">6.7 MB · Ready to install</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
              {activeStep.screenType === 'downloading' && (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Downloading package...</span>
                    <span>6.7MB / 6.7MB (100%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Animated Red Pointer Arrow matching the user's video */}
        {activeStep.arrowPos && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
            style={{
              left: `${activeStep.arrowPos.x}%`,
              top: `${activeStep.arrowPos.y}%`
            }}
          >
            <div className="flex items-center gap-1">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_8px_rgba(239,68,68,0.8)] filter"
              >
                <path
                  d="M4 12L14 4V9H20V15H14V20L4 12Z"
                  fill="#EF4444"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Top Overlay Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <span>STEP-BY-STEP TUTORIAL (0:26s)</span>
        </div>

        {/* Big Center Play Button (When Paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 hover:bg-white text-black shadow-2xl shadow-cyan-500/50 flex items-center justify-center active:scale-95 transition-all cursor-pointer group-hover:scale-110"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black translate-x-0.5 text-black" />
          </button>
        )}

        {/* Click to Pause hotspot */}
        {isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 cursor-pointer flex items-center justify-center"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-4 backdrop-blur-sm">
              <Pause className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}

        {/* Bottom Live Hindi Subtitle Bar from the Video Audio */}
        <div className="absolute bottom-2 inset-x-3 z-20 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-center">
          <p className="text-xs sm:text-sm font-semibold text-amber-300 drop-shadow-sm leading-snug">
            "{activeStep.hindiTranscript}"
          </p>
        </div>
      </div>

      {/* Video Player Controls Bar */}
      <div className="px-4 py-3 bg-[#0d1424] border-t border-white/10 flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-1.5 text-slate-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white translate-x-0.5" />
          )}
        </button>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          title="Restart video"
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Time display */}
        <span className="text-xs font-mono text-slate-300 whitespace-nowrap tabular-nums">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Interactive Scrub Timeline */}
        <div className="flex-1 relative flex items-center">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => handleScrub(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Audio Mute / Unmute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Direct Link Quick Launcher */}
        <a
          href={installUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800/40 hover:bg-cyan-900/50 transition-colors"
        >
          <span>Open Link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Step Markers Navigation Bar */}
      <div className="px-3 py-2 bg-[#090d18] border-t border-white/5 flex items-center justify-between overflow-x-auto text-[10px] text-slate-400 gap-2">
        <span className="font-semibold text-slate-300 shrink-0">Step {TIMELINE.indexOf(activeStep) + 1} of 8:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {TIMELINE.map((step, idx) => (
            <button
              key={idx}
              onClick={() => handleScrub(step.start)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeStep === step
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
            >
              {idx + 1}. {step.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
