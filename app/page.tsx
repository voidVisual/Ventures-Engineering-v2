'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react';

const services = [
  { n: '01', title: 'Assess', text: 'Structural audits, stability certification and non-destructive testing for buildings and infrastructure.' },
  { n: '02', title: 'Design', text: 'RCC, steel and pre-engineered building design, with coordinated drawings and clear calculations.' },
  { n: '03', title: 'Deliver', text: 'Repair, strengthening and rehabilitation plans built around verified site conditions.' },
];

const capabilities = [
  { title: 'Structural assessment', type: 'INSPECTION · TESTING', image: 'photo-1511818966892-d7d671e672a2' },
  { title: 'Industrial structures', type: 'DESIGN · DETAILING', image: 'photo-1486406146926-c627a92ad1ab' },
  { title: 'Repair & strengthening', type: 'REHABILITATION · QA', image: 'photo-1504307651254-35680f356dfd' },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const capabilitySection = useRef<HTMLElement>(null);
  const capabilityTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = capabilitySection.current;
    const track = capabilityTrack.current;
    if (!section || !track) return;

    let frame = 0;
    let distance = 0;

    const measure = () => {
      const clipFrame = section.querySelector<HTMLElement>('.capabilities-sticky');
      const lastCard = track.lastElementChild as HTMLElement | null;
      if (!clipFrame || !lastCard) return;

      // Measure the real painted endpoint against the sticky frame's clip edge.
      // The track is temporarily reset so resizing or a mid-gallery remeasure
      // cannot bake its current horizontal offset into the scroll distance.
      const previousTransform = track.style.transform;
      const previousTransition = track.style.transition;
      track.style.transition = 'none';
      track.style.transform = 'none';
      distance = Math.max(0, Math.ceil(lastCard.getBoundingClientRect().right - clipFrame.getBoundingClientRect().right) + 2);
      track.style.transform = previousTransform;
      track.style.transition = previousTransition;

      const pinnedHeight = clipFrame.getBoundingClientRect().height;
      section.style.setProperty('--capability-distance', `${distance}px`);
      // Sticky only releases after its own visible frame plus all horizontal
      // travel have been consumed. Using window height here left a gap at some
      // browser zoom levels because the pinned frame has a minimum height.
      section.style.height = `${Math.ceil(pinnedHeight + distance)}px`;
      update();
    };

    const update = () => {
      frame = 0;
      // The pinned section gets exactly one viewport of vertical travel per
      // pixel the track must move, so it can only release after the last card.
      const horizontalOffset = Math.min(distance, Math.max(0, -section.getBoundingClientRect().top));
      const progress = distance > 0 ? horizontalOffset / distance : 0;
      track.style.transform = `translate3d(${-horizontalOffset}px, 0, 0)`;
      section.style.setProperty('--capability-progress', `${progress}`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const images = track.querySelectorAll('.capability-image');
    images.forEach((image) => {
      const background = getComputedStyle(image).backgroundImage;
      const source = background.match(/url\(["']?(.*?)["']?\)/)?.[1];
      if (source) { const preload = new Image(); preload.src = source; preload.onload = measure; }
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, phone: values.phone, serviceNeeded: values.service, message: values.message }),
      });
      if (!response.ok) throw new Error('Request failed');
      setSent(true);
      form.reset();
    } catch {
      window.location.href = 'mailto:info@venture.cec?subject=Project%20enquiry';
    } finally { setSending(false); }
  }

  return (
    <main className="editorial-site">
      <header className="editorial-nav">
        <a className="editorial-brand" href="#top" aria-label="Ventures Engineering home">VENTURES<span> / ENGINEERING</span></a>
        <a className="nav-contact" href="#contact">START A PROJECT <ArrowRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}<span>{menuOpen ? 'CLOSE' : 'MENU'}</span></button>
      </header>

      <div className={`editorial-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>{[['Home', '#top'], ['Services', '/services'], ['Approach', '/approach'], ['Capabilities', '/capabilities'], ['Contact', '#contact']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowDownRight /></a>)}</nav>
        <span>PUNE, INDIA · STRUCTURAL ENGINEERING</span>
      </div>

      <section className="editorial-hero" id="top">
        <div className="hero-image" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="eyebrow hero-enter hero-enter-1">STRUCTURAL ENGINEERING · PUNE, INDIA</p>
          <h1 className="hero-enter hero-enter-2">Built on<br />good <em>judgment.</em></h1>
          <div className="hero-bottom hero-enter hero-enter-3"><p>We assess, design and strengthen the structures people rely on—bringing clear engineering to complex sites.</p><a href="#services" className="round-link" aria-label="Explore our services"><ArrowDownRight /></a></div>
        </div>
        <div className="hero-index"><span>01 / 04</span><span>ENGINEERING THAT ENDURES</span></div>
      </section>

      <section className="manifesto reveal" id="approach">
        <p className="eyebrow">OUR PRINCIPLE</p>
        <h2 className="heading-reveal">Understand the structure.<br /><span>Make the next move clear.</span></h2>
        <p className="manifesto-copy">Good engineering starts with evidence. We combine careful investigation, practical design and direct communication to help owners make confident decisions about their assets.</p>
      </section>

      <section className="editorial-services" id="services">
        <div className="section-top reveal"><p className="eyebrow">WHAT WE DO</p><span>01 — 03</span></div>
        <div className="service-list">{services.map((item) => <article className="service-row reveal" key={item.n}><span className="service-number">{item.n}</span><h3 className="word-rise">{item.title}</h3><p>{item.text}</p><ArrowDownRight className="service-arrow" /></article>)}</div>
        <p className="service-footnote">From a single building assessment to complex industrial and infrastructure scopes.</p>
      </section>

      <section className="capabilities-section" id="capabilities" ref={capabilitySection}>
        <div className="capabilities-sticky">
        <div className="section-top reveal"><div><p className="eyebrow">CAPABILITIES</p><h2 className="heading-reveal">Work shaped by<br />the real world.</h2></div><a href="/projects" className="text-link">VIEW PROJECT TYPES <ArrowRight size={16} /></a></div>
        <div className="capability-window"><div className="capability-grid" ref={capabilityTrack}>{capabilities.map((item, i) => <a className={`capability-card capability-${i + 1}`} href="/projects" key={item.title}><div className="capability-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(0,0,0,.72)), url(https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=1200&q=85)` }} /><span className="capability-type">{item.type}</span><div className="capability-title"><h3>{item.title}</h3><ArrowDownRight /></div></a>)}</div></div>
        <p className="capability-note">Representative project types. Scope and methods are defined for each site after review.</p>
        <div className="capability-progress" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="process-section">
        <div className="process-visual"><div className="process-image" /><span className="process-stamp">MEASURE<br />THEN BUILD</span></div>
        <div className="process-copy reveal"><p className="eyebrow">HOW WE WORK</p><h2 className="heading-reveal">Clear process.<br /><em>Sound decisions.</em></h2><ol><li><span>01</span><div><b>Understand</b><p>We define the concern, review available records and plan the right investigation.</p></div></li><li><span>02</span><div><b>Verify</b><p>Site observations and tests establish what is happening inside the structure.</p></div></li><li><span>03</span><div><b>Recommend</b><p>You receive a documented assessment and practical next steps for the asset.</p></div></li></ol></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro reveal"><p className="eyebrow">LET’S TALK STRUCTURES</p><h2 className="heading-reveal">Start with<br /><em>the facts.</em></h2><p>Tell us what you’re working on. We’ll help define a useful next step.</p><a href="mailto:info@venture.cec">INFO@VENTURE.CEC <ArrowRight size={15} /></a></div>
        <form className="contact-form reveal" onSubmit={submitInquiry}>{sent ? <div className="form-success"><span>THANK YOU</span><h3>Your enquiry is with our team.</h3><p>We’ll be in touch to discuss the project.</p></div> : <><label>Your name<input name="name" placeholder="Name" required /></label><label>Email address<input name="email" type="email" placeholder="you@company.com" required /></label><label>Phone number<input name="phone" type="tel" placeholder="+91" required /></label><label>What do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Structural audit or testing</option><option>Design and detailing</option><option>Repair or strengthening</option><option>Other project enquiry</option></select></label><label className="message-field">A little about the project<textarea name="message" placeholder="Structure, location, and what you need to understand…" rows={3} /></label><button type="submit" disabled={sending}>{sending ? 'SENDING…' : 'SEND ENQUIRY'} <ArrowRight size={16} /></button></>}</form>
      </section>

      <footer className="editorial-footer"><a className="editorial-brand" href="#top">VENTURES<span> / ENGINEERING</span></a><span>PUNE, MAHARASHTRA · INDIA</span><span>© 2026 VENTURES ENGINEERING</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
