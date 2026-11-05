import React from 'react';
import { CORE_VALUES } from '../data/services';
import { Shield, Database, Crosshair } from 'lucide-react';

export default function Commitments() {
  const icons = [
    <Shield size={22} className="text-[var(--accent-brass)]" />,
    <Database size={22} className="text-[var(--accent-amber)]" />,
    <Crosshair size={22} className="text-[var(--accent-cyan)]" />,
  ];

  return (
    <section id="commitments" className="py-20 lg:py-28 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Philosophy */}
          <div className="lg:col-span-5 sticky top-28">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-brass)] block mb-3">
              OUR COMMITMENT
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[var(--text-primary)] mb-6 leading-tight">
              Integrity Over <br />
              <span className="italic">Impression.</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md">
              In structural engineering, diplomacy must never supersede physics. Every calculation, non-destructive wave profile, and stability certificate we release is anchored to objective engineering truth.
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-muted)] space-y-2">
              <div className="flex items-center justify-between">
                <span>SEISMIC COMPLIANCE</span>
                <span className="text-[var(--accent-brass)]">IS 1893:2016</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CONCRETE CODE</span>
                <span className="text-[var(--accent-brass)]">IS 456:2000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NDT STANDARDS</span>
                <span className="text-[var(--accent-brass)]">IS 13311 / ASTM</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300 relative group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-chip)] border border-[var(--border-subtle)]">
                    {icons[idx]}
                  </div>
                  <span className="font-mono text-xs text-[var(--accent-brass)] tracking-widest">
                    {val.code}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-[var(--text-primary)] mb-3">
                  {val.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

