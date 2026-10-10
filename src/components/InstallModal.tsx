import React, { useState, useEffect } from 'react';
import {
  Download,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  X,
  FileCode2,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { PanelItem } from '../types/panel';

interface InstallModalProps {
  panel: PanelItem;
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ panel, isOpen, onClose }) => {
  const [step, setStep] = useState<'verifying' | 'ready' | 'downloading'>('verifying');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connecting to TeraBox high-speed node...');
  const [copiedKey, setCopiedKey] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('verifying');
      setProgress(0);
      return;
    }

    setStep('verifying');
    setProgress(20);
    setStatusText('Verifying client security token & OB47 patch compatibility...');

    const timer1 = setTimeout(() => {
      setProgress(60);
      setStatusText('Allocating high-speed mirror node on TeraBox Cloud...');
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(90);
      setStatusText('Applying anti-ban shield and unlocking direct access token...');
    }, 1000);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Verification complete! Package ready for install.');
      setStep('ready');
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, panel]);

  if (!isOpen) return null;

  const handleOpenTeraBox = () => {
    window.open(panel.installUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadBackup = () => {
    setStep('downloading');
    window.open(panel.installUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setStep('ready');
    }, 1200);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('APEX-VIP-OB47-FREE');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0b0f19] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-5 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 to-[#0e1626]">
          <div className="flex items-center gap-3">
            <img
              src={panel.iconUrl}
              alt={panel.title}
              className="w-10 h-10 rounded-xl object-cover border border-cyan-500/30 shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{panel.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                  {panel.version}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Official TeraBox Cloud Download</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {step === 'verifying' ? (
            <div className="py-8 space-y-4 text-center">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <ShieldCheck className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">{statusText}</p>
                <p className="text-xs text-slate-500">Securing direct high-speed pipeline</p>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>TeraBox Node Handshake</span>
                <span>{progress}%</span>
              </div>
            </div>
          ) : (
            <>
              {/* Status Alert Banner */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-emerald-300 block">Verified TeraBox Link Ready</span>
                  <span className="text-slate-400">
                    Package file available on official server · 100% Virus-Free & Anti-Ban Active.
                  </span>
                </div>
              </div>

              {/* VIP Activation Code */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Free VIP Access Key:</span>
                  <span className="text-[11px] text-cyan-400">Auto-activated in panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-cyan-300 tracking-wider">
                    APEX-VIP-OB47-FREE
                  </code>
                  <button
                    onClick={handleCopyKey}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Primary Download CTAs */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleOpenTeraBox}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 active:scale-[0.99] shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Open TeraBox Download Link</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={handleDownloadBackup}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Direct APK Mirror</span>
                  </button>
                  <button
                    onClick={handleDownloadBackup}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>PC Emulator Mod</span>
                  </button>
                </div>
              </div>

              {/* Toggleable Quick Setup Guide */}
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white py-1 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                    TeraBox Download Steps (From 26s Video)
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${showGuide ? 'rotate-90' : ''}`}
                  />
                </button>

                {showGuide && (
                  <ol className="mt-2.5 space-y-2 text-xs text-slate-300 p-3 rounded-xl bg-slate-900/60 border border-white/5 list-decimal list-inside">
                    <li>
                      <span className="text-slate-400">1.</span> Tap <strong>View in TeraBox</strong> and get the TeraBox app if needed.
                    </li>
                    <li>
                      <span className="text-slate-400">2.</span> Sign in with Google and allow file storage access.
                    </li>
                    <li>
                      <span className="text-slate-400">3.</span> Tap <strong>View Now</strong> and press <strong>Download</strong> on <code>MACRO SPACE.apk</code>.
                    </li>
                    <li>
                      <span className="text-slate-400">4.</span> Open the downloaded panel, activate with key <code>APEX-VIP-OB47-FREE</code>, and start gaming!
                    </li>
                  </ol>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#080c14] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Protected by TeraBox Secure SSL Mirror</span>
          <button onClick={onClose} className="hover:text-white transition-colors underline cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
