import React from 'react';
import { ArrowUp, Shield } from 'lucide-react';
import { DISCIPLINES } from '../data/services';

export default function Footer({ onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] pt-16 pb-12">
      <div className="container-custom">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand & Statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-brass)]">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
                  <path d="M3 29h26M7 29V9m18 20V9M3 9h26M7 9l9-6 9 6" />
                  <path d="M7 29l18-20" stroke="var(--accent-amber)" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="font-serif text-xl tracking-wide text-[var(--text-primary)]">
                Ventures Engineering
              </span>
            </div>

            <p className="font-serif text-2xl font-light text-[var(--text-primary)] max-w-sm leading-snug">
              Measured, documented and built to last.
            </p>

            <p className="text-xs text-[var(--text-muted)] max-w-md leading-relaxed">
              Chartered Structural Engineering Consultancy specializing in in-situ non-destructive testing, forensic structural health audits, computational analysis, and retrofit engineering.
            </p>

            <div className="text-[11px] font-mono text-[var(--accent-brass)]">
              TELEMETRY: PUNE HQ // 18.5204° N, 73.8567° E
            </div>
          </div>

          {/* Quick Discipline Directory */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]">
              Five Disciplines (27 Services)
            </h5>
            <div className="flex flex-col space-y-2 text-xs">
              {DISCIPLINES.filter(d => d.id !== 'all').map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    onSelectCategory(d.id);
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-[var(--text-secondary)] hover:text-[var(--accent-brass)] transition-colors flex items-center justify-between group py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {d.name}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    {d.count} services
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Governance */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h5 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary)]">
              Engineering Office
            </h5>
            <div className="text-[var(--text-secondary)] space-y-1">
              <div>Pune, Maharashtra, India</div>
              <div>
                <a href="tel:+919876543210" className="hover:text-[var(--accent-brass)] font-mono">
                  +91 98765 43210
                </a>
              </div>
              <div>
                <a href="mailto:hello@venturesengineering.example" className="hover:text-[var(--accent-brass)] font-mono">
                  hello@venturesengineering.example
                </a>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-start gap-2">
                <Shield size={14} className="text-[var(--accent-brass)] shrink-0 mt-0.5" />
                <span>NABL Accredited Test Protocols • IS & ASTM Code Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} Ventures Engineering. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[var(--accent-brass)] transition-colors p-2"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

