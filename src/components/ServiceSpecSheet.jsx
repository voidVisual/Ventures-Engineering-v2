import React from 'react';
import { ArrowUpRight, Check, Plus, ShieldCheck } from 'lucide-react';

export default function ServiceSpecSheet({
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
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
            <th className="py-3.5 px-4 font-medium">Code</th>
            <th className="py-3.5 px-4 font-medium">Service Nomenclature</th>
            <th className="py-3.5 px-4 font-medium hidden md:table-cell">Sub-discipline</th>
            <th className="py-3.5 px-4 font-medium hidden lg:table-cell">Regulatory Standard</th>
            <th className="py-3.5 px-4 font-medium hidden xl:table-cell">Turnaround</th>
            <th className="py-3.5 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)] font-sans">
          {services.map((service) => {
            const isInScope = selectedScopeIds.includes(service.id);

            return (
              <tr
                key={service.id}
                onMouseEnter={() => onHoverService?.(service)}
                onMouseLeave={() => onHoverService?.(null)}
                className="hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer group"
                onClick={() => onOpenDossier(service)}
              >
                {/* Code */}
                <td className="py-3 px-4 font-mono font-semibold text-[var(--accent-brass)] whitespace-nowrap">
                  {service.code}
                </td>

                {/* Title & Short Desc */}
                <td className="py-3 px-4 max-w-xs">
                  <div className="font-medium text-[var(--text-primary)] text-sm group-hover:text-[var(--accent-brass)] transition-colors">
                    {service.title}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                    {service.shortDesc}
                  </div>
                </td>

                {/* Subgroup */}
                <td className="py-3 px-4 hidden md:table-cell font-mono text-[11px] text-[var(--text-secondary)] whitespace-nowrap">
                  {service.subGroup}
                </td>

                {/* Standard */}
                <td className="py-3 px-4 hidden lg:table-cell font-mono text-[11px] text-[var(--text-muted)] max-w-[220px] truncate">
                  <span className="flex items-center gap-1.5 truncate" title={service.standard}>
                    <ShieldCheck size={13} className="text-[var(--accent-brass)] shrink-0" />
                    <span className="truncate">{service.standard}</span>
                  </span>
                </td>

                {/* Turnaround */}
                <td className="py-3 px-4 hidden xl:table-cell font-mono text-[11px] text-[var(--text-secondary)] whitespace-nowrap">
                  {service.turnaround}
                </td>

                {/* Action buttons */}
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDossier(service);
                      }}
                      className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-chip)] transition-colors"
                      title="Open Technical Dossier"
                    >
                      <ArrowUpRight size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleScope(service);
                      }}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                        isInScope
                          ? 'bg-[var(--accent-brass)] text-[var(--text-inverse)] font-bold'
                          : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-brass)] hover:text-[var(--accent-brass)]'
                      }`}
                    >
                      {isInScope ? <Check size={11} /> : <Plus size={11} />}
                      <span>{isInScope ? 'Added' : 'Scope'}</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

