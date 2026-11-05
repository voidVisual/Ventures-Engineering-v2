import React, { useState } from 'react';
import { X, Trash2, Mail, Copy, Check, Briefcase, Building, MapPin, User, FileText } from 'lucide-react';

export default function ScopeBuilderDrawer({
  isOpen,
  onClose,
  selectedServices = [],
  onRemoveService,
  onClearAll,
}) {
  const [projectTitle, setProjectTitle] = useState('');
  const [structureType, setStructureType] = useState('Commercial / Industrial');
  const [projectLocation, setProjectLocation] = useState('Pune / Maharashtra');
  const [clientContact, setClientContact] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateScopeText = () => {
    const header = `VENTURES ENGINEERING - REQUEST FOR SCOPE OF WORK (RFQ)\n=======================================================\n`;
    const details = `Project: ${projectTitle || 'Untitled Project'}\nAsset Type: ${structureType}\nLocation: ${projectLocation}\nContact: ${clientContact || 'Not specified'}\nGenerated Date: ${new Date().toLocaleDateString()}\n\n`;
    const servicesList = selectedServices
      .map((s, idx) => `${idx + 1}. [${s.code}] ${s.title} (${s.disciplineName})\n   - Governing Code: ${s.standard}\n   - Expected Deliverable: ${s.keyDeliverables ? s.keyDeliverables[0] : 'Engineering Report'}`)
      .join('\n\n');
    const footer = `\n\n-------------------------------------------------------\nPlease provide quotation and resource scheduling.`;
    return header + details + `SELECTED ENGINEERING SCOPE (${selectedServices.length} ITEMS):\n` + servicesList + footer;
  };

  const handleCopy = () => {
    const text = generateScopeText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = `mailto:hello@venturesengineering.example?subject=${encodeURIComponent(
    `RFQ: Scope of Work for ${projectTitle || 'Engineering Project'} (${selectedServices.length} Services)`
  )}&body=${encodeURIComponent(generateScopeText())}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xl h-full bg-[var(--bg-elevated)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 font-sans">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between sticky top-0 bg-[var(--bg-elevated)]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-brass-dim)] border border-[var(--accent-brass)] flex items-center justify-center text-[var(--accent-brass)]">
              <Briefcase size={17} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-light text-[var(--text-primary)]">
                Project Scope Builder
              </h2>
              <div className="text-xs font-mono text-[var(--text-muted)]">
                {selectedServices.length} {selectedServices.length === 1 ? 'service' : 'services'} selected
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedServices.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-mono text-[var(--text-muted)] hover:text-red-400 p-2 transition-colors"
                title="Clear all selected services"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-1">
          {selectedServices.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-[var(--border-subtle)] rounded-xl">
              <FileText size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="font-serif text-xl text-[var(--text-secondary)] mb-1">
                Your scope basket is empty.
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)] max-w-xs mx-auto">
                Browse the 27 services and click "+ Scope" to assemble an instant specification package.
              </p>
            </div>
          ) : (
            <>
              {/* Selected Services Checklist */}
              <div>
                <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Selected Services ({selectedServices.length})
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        <span className="font-mono font-semibold text-[var(--accent-brass)]">
                          {service.code}
                        </span>
                        <span className="text-[var(--text-primary)] truncate font-medium">
                          {service.title}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveService(service.id)}
                        className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-1"
                        title="Remove service"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Specification Form */}
              <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
                <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  Project Metadata (Optional)
                </h4>

                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                    PROJECT TITLE / IDENTIFIER
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Phoenix Industrial Warehouse"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      STRUCTURE CATEGORY
                    </label>
                    <select
                      value={structureType}
                      onChange={(e) => setStructureType(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                    >
                      <option>Commercial / Industrial</option>
                      <option>Residential High-Rise</option>
                      <option>Infrastructure / Bridge / Tunnel</option>
                      <option>Pre-Engineered Building (PEB)</option>
                      <option>Heritage / Masonry Restoration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                      LOCATION / CITY
                    </label>
                    <input
                      type="text"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      placeholder="Pune, Maharashtra"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                    YOUR NAME & CONTACT
                  </label>
                  <input
                    type="text"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="Eng. Rajesh Sharma / +91 98..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {selectedServices.length > 0 && (
          <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-3 sticky bottom-0">
            <a
              href={mailtoUrl}
              className="btn-primary w-full text-center"
            >
              <Mail size={15} />
              <span>Email Scope Request to Engineers</span>
            </a>

            <button
              onClick={handleCopy}
              className="btn-secondary w-full text-center"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied SOW to Clipboard!' : 'Copy Formatted Scope Brief'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

