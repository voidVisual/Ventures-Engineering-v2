import React from 'react';
import { ArrowDown, ShieldCheck, Compass, FileCheck, PhoneCall, Sparkles } from 'lucide-react';
import ThreeStage from './ThreeStage';

export default function Hero({ theme, onOpenScope, activeHoveredService }) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-brass)]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[var(--accent-cyan)]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="container-custom">
        {/* Top Telemetry Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-brass)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--accent-brass)] tracking-widest uppercase">
              PUNE HQ // LAT 18.5204° N, LON 73.8567° E
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-[var(--text-muted)]">
            <span>[CODE: NBC 2016 // IS 456 // ASTM]</span>
            <span>[STATUTORY STABILITY CELL]</span>
          </div>
        </div>

        {/* Hero Main Grid: Editorial Typography Left, 3D Character Stage Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial & Conversion */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] w-fit mb-6 shadow-sm">
              <Sparkles size={13} className="text-[var(--accent-brass)]" />
              <span className="text-xs font-mono tracking-wider text-[var(--text-secondary)]">
                Next-Gen Structural Intelligence
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[var(--text-primary)] font-light tracking-tight leading-[0.98] mb-6">
              From First Diagnostic <br />
              <span className="italic font-normal text-[var(--accent-brass)]">
                to Final Certificate.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed mb-8">
              Structural design, non-destructive testing (NDT), forensic audits, and retrofitting for high-rises, industrial plants, and mega-infrastructure. Delivered by one accountable engineering team.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#services" className="btn-primary">
                <span>Explore 27 Services</span>
                <ArrowDown size={16} />
              </a>

              <button
                onClick={onOpenScope}
                className="btn-secondary"
              >
                <Compass size={16} className="text-[var(--accent-brass)]" />
                <span>Launch Scope Builder</span>
              </button>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-2 px-3"
              >
                <PhoneCall size={14} className="text-[var(--accent-amber)]" />
                <span>+91 98765 43210</span>
              </a>
            </div>

            {/* Live Metrics Telemetry Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-subtle)]">
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text-primary)]">
                  27
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                  Core Disciplines
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[var(--accent-brass)]">
                  100%
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                  Non-Destructive
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[var(--text-primary)]">
                  24-48h
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                  Test Turnaround
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Kinetic Character Stage */}
          <div className="lg:col-span-6 relative">
            <ThreeStage
              theme={theme}
              activeHoveredService={activeHoveredService}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

