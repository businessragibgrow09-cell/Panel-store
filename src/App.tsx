/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PANELS_DATA } from './data/panelsData';
import { PanelItem } from './types/panel';
import { Header } from './components/Header';
import { StorePage } from './components/StorePage';
import { DetailPage } from './components/DetailPage';
import { InstallModal } from './components/InstallModal';

export default function App() {
  const [activeView, setActiveView] = useState<'store' | 'detail'>('store');
  const [selectedPanel, setSelectedPanel] = useState<PanelItem>(PANELS_DATA[0]);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [modalPanel, setModalPanel] = useState<PanelItem>(PANELS_DATA[0]);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  const handleSelectPanel = (panel: PanelItem) => {
    setSelectedPanel(panel);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickInstall = (panel: PanelItem) => {
    setModalPanel(panel);
    setIsInstallModalOpen(true);
  };

  const handleOpenInstallFromDetail = (panel: PanelItem) => {
    setModalPanel(panel);
    setIsInstallModalOpen(true);
  };

  const handleNavigateHome = () => {
    setActiveView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <Header
        activeView={activeView}
        onNavigateHome={handleNavigateHome}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {isMobileFrame ? (
          /* Simulated Smartphone Preview Frame (Matching recording dimensions) */
          <div className="my-6 w-full max-w-[420px] px-2">
            <div className="relative rounded-[40px] border-4 border-slate-700/80 bg-[#090d16] shadow-2xl shadow-cyan-950/40 overflow-hidden ring-1 ring-white/10">
              {/* Phone Speaker Notch */}
              <div className="h-6 w-full bg-[#080c14] flex items-center justify-center pt-1 border-b border-white/5">
                <div className="w-20 h-3 rounded-full bg-slate-900 border border-white/10" />
              </div>

              {/* Viewport content */}
              <div className="max-h-[820px] overflow-y-auto overflow-x-hidden scrollbar-none">
                {activeView === 'store' ? (
                  <StorePage
                    panels={PANELS_DATA}
                    onSelectPanel={handleSelectPanel}
                    onQuickInstall={handleQuickInstall}
                  />
                ) : (
                  <DetailPage
                    panel={selectedPanel}
                    allPanels={PANELS_DATA}
                    onBack={handleNavigateHome}
                    onOpenInstall={handleOpenInstallFromDetail}
                    onSelectOtherPanel={handleSelectPanel}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Standard Fluid Responsive View */
          <div className="w-full">
            {activeView === 'store' ? (
              <StorePage
                panels={PANELS_DATA}
                onSelectPanel={handleSelectPanel}
                onQuickInstall={handleQuickInstall}
              />
            ) : (
              <DetailPage
                panel={selectedPanel}
                allPanels={PANELS_DATA}
                onBack={handleNavigateHome}
                onOpenInstall={handleOpenInstallFromDetail}
                onSelectOtherPanel={handleSelectPanel}
              />
            )}
          </div>
        )}
      </main>

      {/* Interactive Installation & Verification Modal */}
      <InstallModal
        panel={modalPanel}
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}
