'use client';

import { type CSSProperties, useEffect, useState } from 'react';
import { socialLinks, whatsappHref, whatsappIsConfigured } from '../site-config';

function SocialIcon({ name }: { name: (typeof socialLinks)[number]['icon'] }) {
  if (name === 'linkedin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.4H2.1V22h3.1V8.4ZM3.65 2a1.82 1.82 0 1 0 0 3.64 1.82 1.82 0 0 0 0-3.64ZM22 13.9c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.4H9.8V22h3.1v-6.7c0-1.8.4-3.6 2.6-3.6s2.2 2.1 2.2 3.7V22H22v-8.1Z" /></svg>;
  }

  if (name === 'instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="icon-fill" cx="17.5" cy="6.8" r="1" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5H17V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.4v2.2H7.5v3.2h2.8V21h3.3Z" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 .1 11.9 11.9 0 0 0 1.7 18L0 24l6.2-1.6A12 12 0 0 0 24 12a11.9 11.9 0 0 0-3.5-8.5ZM12 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.5A9.9 9.9 0 1 1 12 21.9Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4 0-.1-.2-.2-.5-.4Z" /></svg>;
}

export function SocialRail() {
  const [isOpen, setIsOpen] = useState(true);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [surface, setSurface] = useState({ color: '#fbf6ea', dark: false });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(
      '.hero, .intro, .jump, .cat, .projects-section, .close, .contact-section, footer',
    ));

    const syncSurface = () => {
      const marker = window.innerHeight * 0.48;
      const section = sections.find((candidate) => {
        const bounds = candidate.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      }) ?? sections.reduce<HTMLElement | null>((nearest, candidate) => {
        if (!nearest) return candidate;
        const distance = (element: HTMLElement) => {
          const bounds = element.getBoundingClientRect();
          return marker < bounds.top ? bounds.top - marker : marker > bounds.bottom ? marker - bounds.bottom : 0;
        };
        return distance(candidate) < distance(nearest) ? candidate : nearest;
      }, null);

      if (!section) {
        setSurface({ color: getComputedStyle(document.body).backgroundColor, dark: false });
        return;
      }

      const dark = section.matches('.close, footer');
      const color = section.matches('.hero')
        ? '#f4d9a0'
        : section.matches('.close')
          ? '#2a1d13'
          : section.matches('footer')
            ? '#21170f'
            : getComputedStyle(section).backgroundColor;

      setSurface((current) => current.color === color && current.dark === dark ? current : { color, dark });
    };

    syncSurface();
    window.addEventListener('scroll', syncSurface, { passive: true });
    window.addEventListener('resize', syncSurface);
    return () => {
      window.removeEventListener('scroll', syncSurface);
      window.removeEventListener('resize', syncSurface);
    };
  }, []);

  return (
    <div
      className={`social-dock ${isOpen ? 'is-open' : 'is-closed'} ${surface.dark ? 'surface-dark' : 'surface-light'}`}
      style={{ '--social-surface': surface.color } as CSSProperties}
    >
      <aside className="social-rail" aria-label="Social media links" aria-hidden={!isOpen}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className={`social-link ${link.icon}${activePopup === link.icon ? ' is-popped' : ''}`}
            href={link.href ?? '#contact'}
            aria-label={link.href ? `Visit Ventures Engineering on ${link.label}` : `${link.label} profile link to be configured`}
            title={link.label}
            tabIndex={isOpen ? 0 : -1}
            target={link.href ? '_blank' : undefined}
            rel={link.href ? 'noreferrer' : undefined}
            onClick={(event) => {
              setActivePopup((active) => active === link.icon ? null : link.icon);
              if (!link.href) event.preventDefault();
            }}
          >
            <SocialIcon name={link.icon} />
            <span className="social-tooltip" aria-hidden="true"><SocialIcon name={link.icon} /></span>
          </a>
        ))}
      </aside>
      <button
        className="social-toggle"
        type="button"
        aria-label={isOpen ? 'Hide social links' : 'Show social links'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
      </button>
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappHref}
      aria-label={whatsappIsConfigured ? 'Chat with Ventures Engineering on WhatsApp' : 'Go to the project enquiry form'}
      title={whatsappIsConfigured ? 'Chat on WhatsApp' : 'Set a WhatsApp number in the site configuration'}
      target={whatsappIsConfigured ? '_blank' : undefined}
      rel={whatsappIsConfigured ? 'noreferrer' : undefined}
    >
      <WhatsAppIcon />
    </a>
  );
}
