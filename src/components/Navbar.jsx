import React from 'react';
import { Sun, Moon, Briefcase, FileText, PhoneCall, ChevronRight } from 'lucide-react';

export default function Navbar({
  theme,
  setTheme,
  scopeCount = 0,
  onOpenScope,
}) {
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[var(--bg-canvas)]/85 border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="container-custom flex items-center justify-between h-[var(--nav-height)]">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-brass)] group-hover:border-[var(--accent-brass)] transition-colors duration-300 shadow-sm">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
            >
              <path d="M3 29h26M7 29V9m18 20V9M3 9h26M7 9l9-6 9 6" />
              <path d="M7 29l18-20" stroke="var(--accent-amber)" strokeWidth="1.8" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-wide font-normal text-[var(--text-primary)] leading-tight">
              Ventures Engineering
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
              Structural & Forensic Div.
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide text-[var(--text-secondary)]">
          <a
            href="#services"
            className="hover:text-[var(--text-primary)] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-brass)] hover:after:w-full after:transition-all"
          >
            27 Services
          </a>
          <a
            href="#lifecycle"
            className="hover:text-[var(--text-primary)] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-brass)] hover:after:w-full after:transition-all"
          >
            Diagnostic Lifecycle
          </a>
          <a
            href="#commitments"
            className="hover:text-[var(--text-primary)] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-brass)] hover:after:w-full after:transition-all"
          >
            Standards
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--text-primary)] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--accent-brass)] hover:after:w-full after:transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Suite */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent-brass)] hover:border-[var(--accent-brass)] transition-colors duration-200"
            aria-label="Toggle visual theme"
            title={theme === 'dark' ? 'Switch to Studio Light' : 'Switch to Obsidian Dark'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Interactive Scope Basket Pill */}
          <button
            onClick={onOpenScope}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono transition-all duration-300 ${
              scopeCount > 0
                ? 'bg-[var(--accent-brass-dim)] border-[var(--accent-brass)] text-[var(--accent-brass)] shadow-sm'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-medium)]'
            }`}
          >
            <Briefcase size={14} className={scopeCount > 0 ? 'text-[var(--accent-brass)]' : ''} />
            <span className="hidden sm:inline">SCOPE:</span>
            <span className="font-bold">{scopeCount}</span>
          </button>

          {/* Primary RFQ Action */}
          <a
            href="#contact"
            className="btn-primary text-xs !py-2.5 !px-5 hidden sm:inline-flex"
          >
            <span>Request Assessment</span>
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

