import React, { useState } from 'react';
import { HOW_WE_WORK_STEPS } from '../data/services';
import { Activity, Cpu, FileCheck2, ShieldCheck, ChevronRight } from 'lucide-react';

export default function DiagnosticLifecycle() {
  const [activeStep, setActiveStep] = useState(0);

  const icons = [
    <Activity size={20} className="text-[var(--accent-brass)]" />,
    <Cpu size={20} className="text-[var(--accent-cyan)]" />,
    <FileCheck2 size={20} className="text-[var(--accent-amber)]" />,
    <ShieldCheck size={20} className="text-[var(--accent-emerald)]" />,
  ];

  return (
    <section id="lifecycle" className="py-20 lg:py-28 border-b border-[var(--border-subtle)] relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-brass)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-brass)]">
                ENGINEERING PROTOCOL
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[var(--text-primary)]">
              The 4-Stage Diagnostic Lifecycle.
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            From initial in-situ sensor telemetry to legal municipal certification, our methodology guarantees zero ambiguity at every phase.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_WE_WORK_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[var(--bg-surface)] border-[var(--border-accent)] shadow-xl ring-1 ring-[var(--accent-brass)]/30'
                    : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface)]/60'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-light text-[var(--accent-brass)]">
                      {step.step}
                    </span>
                    <div className="p-2 rounded-lg bg-[var(--bg-chip)] border border-[var(--border-subtle)]">
                      {icons[idx]}
                    </div>
                  </div>

                  {/* Phase & Title */}
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] block mb-1">
                    {step.phase}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[var(--text-primary)] mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Sub items checklist */}
                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                  {step.subItems.map((item, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-[11px] text-[var(--text-muted)]">
                      <ChevronRight size={12} className="text-[var(--accent-brass)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

