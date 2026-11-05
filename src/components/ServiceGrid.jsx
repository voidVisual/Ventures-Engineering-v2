import React from 'react';
import { ArrowUpRight, Check, Plus, ShieldCheck, Clock } from 'lucide-react';

export default function ServiceGrid({
  services,
  selectedScopeIds = [],
  onToggleScope,
  onOpenDossier,
  onHoverService,
}) {
  if (services.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-2xl text-[var(--text-secondary)] mb-2">
          No engineering services match your search filter.
        </p>
        <p className="text-xs font-mono text-[var(--text-muted)]">
          Try clearing query terms or selecting "All Disciplines".
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const isInScope = selectedScopeIds.includes(service.id);

        return (
          <div
            key={service.id}
            onMouseEnter={() => onHoverService?.(service)}
            onMouseLeave={() => onHoverService?.(null)}
            className="service-card group cursor-pointer"
            onClick={() => onOpenDossier(service)}
          >
            {/* Top Card Bar: Code, Subgroup, In-Scope Badge */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-brass)]">
                  [{service.code}]
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-chip)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                    {service.subGroup}
                  </span>

                  {isInScope && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--accent-brass)] text-[var(--text-inverse)]">
                      <Check size={11} />
                      <span>IN SCOPE</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Short Summary */}
              <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] group-hover:text-[var(--accent-brass)] transition-colors duration-200 mb-2 leading-tight">
                {service.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-6">
                {service.shortDesc}
              </p>
            </div>

            {/* Bottom Card Bar: Standard & Interactive Actions */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-1.5 truncate max-w-[200px]" title={service.standard}>
                  <ShieldCheck size={13} className="text-[var(--accent-brass)] shrink-0" />
                  <span className="truncate">{service.standard}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Clock size={12} />
                  <span>{service.turnaround}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDossier(service);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group-hover:translate-x-0.5"
                >
                  <span>Dossier Specs</span>
                  <ArrowUpRight size={14} className="text-[var(--accent-brass)]" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleScope(service);
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isInScope
                      ? 'bg-[var(--accent-brass)] text-[var(--text-inverse)] font-semibold'
                      : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-brass)] hover:text-[var(--accent-brass)]'
                  }`}
                  title={isInScope ? 'Remove from RFQ Scope' : 'Add to RFQ Scope'}
                >
                  {isInScope ? (
                    <>
                      <Check size={12} />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus size={12} />
                      <span>Scope</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

