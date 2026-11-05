import React, { useRef, useEffect } from 'react';
import { Search, X, LayoutGrid, TableProperties, SlidersHorizontal } from 'lucide-react';
import { DISCIPLINES } from '../data/services';

export default function ControlBar({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
}) {
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to quickly focus the search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="sticky top-[var(--nav-height)] z-30 w-full py-4 bg-[var(--bg-canvas)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-sm">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Filter Pills (Scrollable horizontally on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none no-scrollbar">
            {DISCIPLINES.map((disc) => {
              const isSelected = selectedCategory === disc.id;
              return (
                <button
                  key={disc.id}
                  onClick={() => setSelectedCategory(disc.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[var(--accent-brass)] text-[var(--text-inverse)] border-[var(--accent-brass)] font-semibold shadow-sm'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{disc.shortName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[var(--text-inverse)]/20 text-[var(--text-inverse)]'
                        : 'bg-[var(--bg-chip)] text-[var(--text-muted)]'
                    }`}
                  >
                    {disc.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & View Mode Toggle */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 27 services (press '/' to focus)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-brass)] focus:bg-[var(--bg-surface-hover)] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* View Mode Toggle: Cards vs Spec Sheet Grid */}
            <div className="flex items-center p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[var(--accent-brass)] text-[var(--text-inverse)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Curated Architectural Cards View"
              >
                <LayoutGrid size={15} />
              </button>

              <button
                onClick={() => setViewMode('sheet')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'sheet'
                    ? 'bg-[var(--accent-brass)] text-[var(--text-inverse)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Technical Spec Sheet Data Table"
              >
                <TableProperties size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Status count feedback */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border-subtle)]/50">
          <div>
            SHOWING <span className="text-[var(--text-primary)] font-semibold">{filteredCount}</span> OF {totalCount} SERVICES
            {searchQuery && (
              <span> FOR QUERY: <strong className="text-[var(--accent-brass)]">"{searchQuery}"</strong></span>
            )}
          </div>
          <div className="hidden sm:block">
            CLICK ANY SERVICE TO VIEW ENGINEERING DOSSIER & STANDARDS
          </div>
        </div>
      </div>
    </div>
  );
}

