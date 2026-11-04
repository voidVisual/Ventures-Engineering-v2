'use client';

import { useRef, useState } from 'react';
import { projectTypes } from '../project-capabilities';

const serviceLinks = [
  { id: 'audit', title: 'Structural audit', detail: 'Assessment and certification' },
  { id: 'ndt', title: 'Non-destructive testing', detail: 'Concrete, steel, and pavement testing' },
  { id: 'design', title: 'Design and detailing', detail: 'RCC, steel, and PEB structures' },
  { id: 'infra', title: 'Infrastructure', detail: 'Roads, bridges, and tunnels' },
  { id: 'repair', title: 'Repair and strengthening', detail: 'Rehabilitation and quality review' },
];

export function SiteNavigation() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="glass site-nav" aria-label="Main">
      <a className="brand" href="/" aria-label="Ventures Engineering home">
        <svg viewBox="0 0 32 32" fill="none" stroke="#f4d9a0" strokeWidth="1.4" aria-hidden="true">
          <path d="M3 29h26M7 29V9m18 20V9M3 9h26M7 9l9-6 9 6" /><path d="M7 29l18-20" stroke="#e39a4d" />
        </svg>
        Ventures Engineering
      </a>
      <div className="links">
        <a href="/">Home</a>
        <div
          className={`nav-dropdown ${isServicesOpen ? 'is-open' : ''}`}
          ref={menuRef}
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => {
            if (!menuRef.current?.contains(document.activeElement)) setIsServicesOpen(false);
          }}
          onFocus={() => setIsServicesOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsServicesOpen(false);
          }}
        >
          <button
            className="nav-dropdown-trigger"
            type="button"
            aria-haspopup="true"
            aria-expanded={isServicesOpen}
            aria-controls="services-mega-menu"
            onClick={() => setIsServicesOpen((open) => !open)}
          >
            Services <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg>
          </button>
          <div id="services-mega-menu" className="nav-mega-panel" inert={!isServicesOpen}>
            <div className="mega-intro">
              <span className="eyebrow">Engineering services</span>
              <h2>One accountable team, from audit to drawing.</h2>
              <p>Explore structural assessment, testing, design, and rehabilitation services.</p>
              <a className="mega-all-link" href="/#overview">View all services <span aria-hidden="true">↗</span></a>
              <span className="mega-service-count">{serviceLinks.length} disciplines · {projectTypes.length} project capabilities</span>
            </div>
            <div className="mega-link-list">
              {serviceLinks.map((service, index) => (
                <a href={`/#${service.id}`} key={service.id}>
                  <span className="mega-number">0{index + 1}</span>
                  <span className="mega-link-copy"><strong>{service.title}</strong><small>{service.detail}</small></span>
                  <span className="mega-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <a href="/projects">Projects</a>
        <a href="/#why">About</a>
        <a href="/#contact">Contact</a>
      </div>
      <a className="btn amb" href="/#contact">Get a quote</a>
    </nav>
  );
}
