import React, { useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Clock, Building, FileSpreadsheet, Mail, Plus, Check } from 'lucide-react';

export default function ServiceDossierModal({
  service,
  onClose,
  isInScope = false,
  onToggleScope,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const mailtoUrl = `mailto:hello@venturesengineering.example?subject=${encodeURIComponent(
    `Engineering Inquiry: [${service.code}] ${service.title}`
  )}&body=${encodeURIComponent(
    `Hello Ventures Engineering,\n\nWe require engineering support regarding: ${service.title} (${service.code}).\n\nProject Location:\nAsset Type:\nTimeline:\n\nThank you.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Content Drawer */}
      <div className="relative w-full max-w-xl h-full bg-[var(--bg-elevated)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 font-sans">
        {/* Drawer Header */}
        <div className="p-6 sm:p-8 border-b border-[var(--border-subtle)] flex items-start justify-between gap-4 sticky top-0 bg-[var(--bg-elevated)]/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-[var(--accent-brass)] font-semibold">[{service.code}]</span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)]">{service.disciplineName}</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-[var(--text-primary)] leading-tight">
              {service.title}
            </h2>
            <div className="inline-block mt-2 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-chip)] text-[var(--accent-brass)] border border-[var(--border-subtle)]">
              {service.subGroup}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-brass)] transition-colors"
            aria-label="Close dossier"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Engineering Overview */}
          <div>
            <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Engineering Scope & Methodology
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Regulatory Standards Card */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-start gap-3">
            <ShieldCheck size={20} className="text-[var(--accent-brass)] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                Governing Standards & Codes
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)] font-mono">
                {service.standard}
              </div>
            </div>
          </div>

          {/* Key Deliverables */}
          {service.keyDeliverables && service.keyDeliverables.length > 0 && (
            <div>
              <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Key Engineering Deliverables
              </h4>
              <ul className="space-y-2.5">
                {service.keyDeliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 size={14} className="text-[var(--accent-brass)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Typical Applications */}
          <div>
            <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Typical Asset Applications
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
              <Building size={14} className="text-[var(--accent-cyan)] shrink-0 mt-0.5" />
              <span>{service.typicalApplications}</span>
            </div>
          </div>

          {/* Turnaround Time */}
          <div>
            <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Standard Turnaround
            </h4>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
              <Clock size={14} className="text-[var(--accent-amber)]" />
              <span>{service.turnaround}</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={() => onToggleScope(service)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono transition-all ${
              isInScope
                ? 'bg-[var(--accent-brass)] text-[var(--text-inverse)] font-bold shadow-md'
                : 'border border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--accent-brass)] hover:text-[var(--accent-brass)]'
            }`}
          >
            {isInScope ? <Check size={14} /> : <Plus size={14} />}
            <span>{isInScope ? 'Included in Scope' : 'Add to Scope Basket'}</span>
          </button>

          <a
            href={mailtoUrl}
            className="btn-secondary !text-xs !py-2.5 !px-4"
          >
            <Mail size={14} className="text-[var(--accent-brass)]" />
            <span>Enquire Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
}

