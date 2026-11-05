import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ControlBar from './components/ControlBar';
import ServiceGrid from './components/ServiceGrid';
import ServiceSpecSheet from './components/ServiceSpecSheet';
import ServiceDossierModal from './components/ServiceDossierModal';
import ScopeBuilderDrawer from './components/ScopeBuilderDrawer';
import DiagnosticLifecycle from './components/DiagnosticLifecycle';
import Commitments from './components/Commitments';
import QuoteSection from './components/QuoteSection';
import Footer from './components/Footer';
import { SERVICES } from './data/services';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'sheet'
  const [selectedScopeIds, setSelectedScopeIds] = useState([]);
  const [dossierService, setDossierService] = useState(null);
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [activeHoveredService, setActiveHoveredService] = useState(null);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Filtered Services computation
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || service.disciplineId === selectedCategory;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.code.toLowerCase().includes(q) ||
        service.subGroup.toLowerCase().includes(q) ||
        service.standard.toLowerCase().includes(q) ||
        service.disciplineName.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Scope Builder Handlers
  const toggleScope = (service) => {
    setSelectedScopeIds((prev) =>
      prev.includes(service.id)
        ? prev.filter((id) => id !== service.id)
        : [...prev, service.id]
    );
  };

  const removeScope = (id) => {
    setSelectedScopeIds((prev) => prev.filter((item) => item !== id));
  };

  const clearScope = () => {
    setSelectedScopeIds([]);
  };

  const selectedServicesObjects = useMemo(() => {
    return SERVICES.filter((s) => selectedScopeIds.includes(s.id));
  }, [selectedScopeIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Precision Top Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        scopeCount={selectedScopeIds.length}
        onOpenScope={() => setIsScopeOpen(true)}
      />

      {/* Hero Section with Interactive 3D Kinetic Character Stage */}
      <Hero
        theme={theme}
        onOpenScope={() => setIsScopeOpen(true)}
        activeHoveredService={activeHoveredService}
      />

      {/* Sticky Filter & Search Control Center */}
      <div id="services">
        <ControlBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredCount={filteredServices.length}
          totalCount={SERVICES.length}
        />
      </div>

      {/* Main Services View Area */}
      <main className="py-12 flex-1">
        <div className="container-custom">
          {viewMode === 'grid' ? (
            <ServiceGrid
              services={filteredServices}
              selectedScopeIds={selectedScopeIds}
              onToggleScope={toggleScope}
              onOpenDossier={(service) => setDossierService(service)}
              onHoverService={setActiveHoveredService}
            />
          ) : (
            <ServiceSpecSheet
              services={filteredServices}
              selectedScopeIds={selectedScopeIds}
              onToggleScope={toggleScope}
              onOpenDossier={(service) => setDossierService(service)}
              onHoverService={setActiveHoveredService}
            />
          )}
        </div>
      </main>

      {/* 4-Stage Diagnostic Lifecycle */}
      <DiagnosticLifecycle />

      {/* Standards & Engineering Principles */}
      <Commitments />

      {/* RFQ & Direct Contact Section */}
      <QuoteSection onOpenScope={() => setIsScopeOpen(true)} />

      {/* Precision Footer */}
      <Footer onSelectCategory={(catId) => setSelectedCategory(catId)} />

      {/* Interactive Service Dossier Slide-Over Modal */}
      {dossierService && (
        <ServiceDossierModal
          service={dossierService}
          onClose={() => setDossierService(null)}
          isInScope={selectedScopeIds.includes(dossierService.id)}
          onToggleScope={toggleScope}
        />
      )}

      {/* Interactive Scope of Work (SOW) Builder Drawer */}
      <ScopeBuilderDrawer
        isOpen={isScopeOpen}
        onClose={() => setIsScopeOpen(false)}
        selectedServices={selectedServicesObjects}
        onRemoveService={removeScope}
        onClearAll={clearScope}
      />
    </div>
  );
}

