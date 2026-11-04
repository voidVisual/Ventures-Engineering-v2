'use client';

import { useEffect, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { SiteNavigation } from './components/SiteNavigation';
import { SocialRail, WhatsAppButton } from './components/SocialRail';
import { projectTypes } from './project-capabilities';

type Service = { title: string; description: string };
type Group = { title?: string; services: Service[] };
type Discipline = {
  id: string;
  tone: 'dark' | 'gold' | 'amber';
  short: string;
  name: string;
  description: string;
  groups: Group[];
};

const disciplines: Discipline[] = [
  {
    id: 'audit', tone: 'dark', short: 'Audit and certification', name: 'Structural audit and certification',
    description: 'Thorough structural assessment and compliance certification.',
    groups: [{ services: [
      { title: 'Structural audit', description: 'A full evaluation of structural health: visual inspection, material testing and load-carrying capacity, to determine adequacy and safety.' },
      { title: 'Stability certificate', description: 'Official stability certification as per industry standards, confirming a building is sound for occupancy and continued use.' },
      { title: 'Estimation and costing', description: 'Accurate cost estimates for repair, strengthening and rehabilitation, based on detailed assessment and a bill of quantities.' },
    ] }],
  },
  {
    id: 'ndt', tone: 'gold', short: 'Testing', name: 'Non-destructive testing',
    description: 'Advanced testing methods that assess structural health without causing damage.',
    groups: [
      { title: 'On RCC structures', services: [
        { title: 'Rebar scanning', description: 'Detects and maps reinforcement in concrete to verify cover depth, bar diameter and spacing.' },
        { title: 'Rebound hammer test', description: 'Estimates in-situ compressive strength by measuring surface hardness rebound values.' },
        { title: 'Ultrasonic pulse velocity test', description: 'Evaluates concrete quality and homogeneity and detects internal flaws using ultrasonic waves.' },
        { title: 'Carbonation depth test', description: 'Measures the carbonation front to assess vulnerability to reinforcement corrosion.' },
        { title: 'Concrete core test', description: 'Extracts cores for laboratory testing and accurate compressive strength.' },
        { title: 'Half-cell potential test', description: 'Assesses the probability of rebar corrosion through electrochemical potential.' },
      ] },
      { title: 'On steel members', services: [
        { title: 'Ultrasonic thickness gauge test', description: 'Precisely measures member thickness to detect corrosion loss.' },
        { title: 'Dye and liquid penetration test', description: 'Detects surface cracks and discontinuities in steel weldments.' },
        { title: 'Flaw detection test', description: 'Identifies internal and surface flaws in structural steel members.' },
        { title: 'Vibration meter test', description: 'Measures and analyses structural vibrations for dynamic assessment.' },
        { title: 'Magnetic particle test', description: 'Detects surface and near-surface defects in ferromagnetic materials.' },
      ] },
      { title: 'On road and paving surfaces', services: [
        { title: 'Skid resistance test', description: 'Measures pavement surface friction for road safety assessment and compliance.' },
      ] },
    ],
  },
  {
    id: 'design', tone: 'amber', short: 'Design and detailing', name: 'Design and detailing',
    description: 'Structural design and detailed engineering drawings for every structure type.',
    groups: [{ services: [
      { title: 'PEB structures', description: 'Pre-engineered building design and detailing for industrial and commercial use, with optimised material and fast erection.' },
      { title: 'Steel structures', description: 'Complete steel design, analysis and connection detailing for buildings, industrial structures and special facilities.' },
      { title: 'RCC structures', description: 'Reinforced concrete design for residential, commercial and industrial buildings, with code-compliant analysis and detailing.' },
      { title: 'Erection and shop ticket drawings', description: 'Fabrication and erection drawings for precast members, columns, spandrels, double T sections, shear walls and hollow core.' },
    ] }],
  },
  {
    id: 'infra', tone: 'gold', short: 'Infrastructure', name: 'Infrastructure',
    description: 'Engineering solutions for large-scale infrastructure and industrial projects.',
    groups: [{ services: [
      { title: 'Tunnels', description: 'Lining design, portal structures and condition assessment of existing tunnels.' },
      { title: 'Roads and highways', description: 'Bridges, culverts, retaining walls and pavement assessment for road infrastructure.' },
      { title: 'Industrial structures', description: 'Design and assessment of power plants, silos, cooling towers, chimneys and other specialised facilities.' },
      { title: 'As-built drawings', description: 'Precise documentation of residential, commercial, industrial and infrastructure projects, using advanced surveying instruments.' },
    ] }],
  },
  {
    id: 'repair', tone: 'dark', short: 'Repair and strengthening', name: 'Repair and strengthening consultancy',
    description: 'Expert consultancy for structural repair, rehabilitation and strengthening.',
    groups: [{ services: [
      { title: 'Repair methodology', description: 'Detailed repair methods built on structural assessment and material test results.' },
      { title: 'Strengthening design', description: 'Carbon fibre wrapping, steel plate bonding and concrete jacketing designed to restore capacity.' },
      { title: 'Rehabilitation planning', description: 'Plans that extend the service life of ageing structures while keeping safety standards.' },
      { title: 'Quality assurance', description: 'Third-party inspection during repair and strengthening, to confirm compliance with specifications.' },
    ] }],
  },
];

const totalServices = disciplines.reduce(
  (total, discipline) => total + discipline.groups.reduce((sum, group) => sum + group.services.length, 0),
  0,
);

export default function HomePage() {
  const [activeDiscipline, setActiveDiscipline] = useState(disciplines[0].id);

  useEffect(() => {
    const sections = disciplines
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveDiscipline(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#cats">Skip to services</a>
      <SocialRail />
      <WhatsAppButton />
      <header className="hero">
        <SiteNavigation />
        <div className="stage pad">
          <div>
            <h1>Services<em>From the first audit to the final drawing.</em></h1>
            <p className="sub">Structural design, testing and rehabilitation for buildings, industrial sites and infrastructure, delivered by one accountable team.</p>
            <div className="cta-row"><a className="btn amb" href="#audit">Explore services</a><a className="btn glass" href="#contact">Talk to an engineer</a></div>
            <p className="facts"><b>{totalServices}</b> services across five disciplines, from audit to rehabilitation.</p>
          </div>
          <aside className="hero-aside" aria-label="Engineering process">
            <span className="hero-aside-kicker">A considered process</span>
            <ol>
              <li><span>01</span><div><strong>Assess</strong><small>Understand the structure and its condition.</small></div></li>
              <li><span>02</span><div><strong>Test</strong><small>Turn site evidence into useful data.</small></div></li>
              <li><span>03</span><div><strong>Design</strong><small>Develop practical, code-led solutions.</small></div></li>
              <li><span>04</span><div><strong>Rehabilitate</strong><small>Support safe repair and continued use.</small></div></li>
            </ol>
            <span className="hero-aside-note">Buildings · Industry · Infrastructure</span>
          </aside>
        </div>
      </header>

      <section className="intro pad" id="overview">
        <h2>Five disciplines. One team that answers for the work.</h2>
        <ol className="idx">
          {disciplines.map((discipline, index) => {
            const count = discipline.groups.reduce((sum, group) => sum + group.services.length, 0);
            return <li key={discipline.id}><a className="row" href={`#${discipline.id}`}>
              <span className="no">{String(index + 1).padStart(2, '0')}</span><span className="nm">{discipline.name}</span><span className="ds">{discipline.description}</span><span className="ct">{count} services</span>
            </a></li>;
          })}
        </ol>
      </section>

      <main id="cats">
        <nav className="jump" aria-label="Service categories"><ul className="glass">
          {disciplines.map((discipline) => <li key={discipline.id}><a className={activeDiscipline === discipline.id ? 'on' : ''} href={`#${discipline.id}`} aria-current={activeDiscipline === discipline.id ? 'true' : undefined}>{discipline.short}</a></li>)}
        </ul></nav>
        {disciplines.map((discipline, index) => {
          const count = discipline.groups.reduce((sum, group) => sum + group.services.length, 0);
          return <section className={`cat ${discipline.tone}`} id={discipline.id} key={discipline.id}>
            <div className="in pad"><div className="side"><span className="no">0{index + 1}</span><h2>{discipline.name}</h2><p>{discipline.description}</p><span className="n">{count} services</span><a className="more" href="#contact">Enquire about this discipline</a></div>
              <div>{discipline.groups.map((group, groupIndex) => <div key={`${discipline.id}-${groupIndex}`}>
                {group.title && <h3 className="grp">{group.title}</h3>}
                <ul className="items">{group.services.map((service) => <li key={service.title}><h3>{service.title}</h3><p>{service.description}</p></li>)}</ul>
              </div>)}</div>
            </div>
          </section>;
        })}
      </main>

      <section className="cat gold" id="why"><div className="in pad"><div className="side"><span className="no">Our approach</span><h2>How we work</h2><p>Three commitments behind every report, drawing and certificate.</p></div><div><ul className="items">
        <li><h3>Integrity over impression</h3><p>Our reports, designs and audits state facts, not formalities.</p></li>
        <li><h3>Data-driven decisions</h3><p>From test results to detailed analysis, every recommendation is backed by engineering logic.</p></li>
        <li><h3>As-built accuracy</h3><p>Advanced surveying and measuring instruments give precise drawings and site assessments.</p></li>
      </ul></div></div></section>

      <section className="projects-section pad" id="projects">
        <div className="projects-heading">
          <div><span className="eyebrow">Project capabilities</span><h2>Engineering for structures that matter.</h2></div>
          <p>Representative project types across our structural assessment, testing, design and rehabilitation services.</p>
        </div>
        <div className="project-grid">
          {projectTypes.map((project) => <article className="project-card" key={project.number}>
            <div className={`project-visual ${project.mark}`} aria-hidden="true">
              <svg viewBox="0 0 360 180" fill="none">
                {project.mark === 'industrial' && <g className="drawing-lines"><path d="M58 145V86l42-24v24l44-26v85M48 145h122M75 145v-25h27v25m20-29h17m-17 13h17M112 61V39h15v14M162 89h24V55h22v90M189 55V35h14v20M186 145h51M218 145V98h22v47m-20-70h15" /><path d="M87 104V92m31-2V78m47 38h12" /></g>}
                {project.mark === 'infrastructure' && <g className="drawing-lines"><path d="M36 142h286M57 142l25-51h196l26 51M82 91c6-48 189-48 196 0M93 91v51m48-51v51m49-51v51m48-51v51M72 109h216M65 126h230M45 151h270" /><path d="M95 68h171M110 56h143" /></g>}
                {project.mark === 'building' && <g className="drawing-lines"><path d="M92 146V50l90-25 87 25v96M76 146h206M108 62l74-20 71 20M118 72v19m28-27v27m31-35v35m32-27v27m27-19v19M118 105v21m28-28v28m31-35v35m32-28v28m27-21v21M168 146v-24h29v24M82 151h198" /><path d="M111 50V35l71-20 72 20v15" /></g>}
              </svg>
              <span className="project-index">{project.number}</span>
            </div>
            <div className="project-copy"><span className="project-scope">{project.scope}</span><h3>{project.title}</h3><p>{project.description}</p><a href="#contact">Discuss a similar project <span aria-hidden="true">↗</span></a></div>
          </article>)}
        </div>
        <a className="projects-view-all" href="/projects">Explore project capabilities <span aria-hidden="true">↗</span></a>
      </section>

      <section className="close pad" id="quote"><div className="cta">
        <div><h2>Need structural engineering support?</h2><p>Tell us about your project. We reply within one working day.</p></div>
        <div className="cta-row"><a className="btn dk" href="#contact">Get a quote</a><a className="btn" href="#contact">Talk to our team</a></div>
      </div></section>

      <ContactSection />

      <footer className="pad"><div className="fg">
        <div><div className="brand">Ventures Engineering</div><p className="q">Measured, documented and built to last.</p></div>
        <div><h5>Services</h5><a href="#audit">Structural audit</a><a href="#ndt">NDT testing</a><a href="#design">Design and detailing</a><a href="#infra">Infrastructure</a><a href="#repair">Repair and strengthening</a></div>
        <div><h5>Contact</h5><span>Pune, Maharashtra</span><a href="#contact">Send a project enquiry</a><a href="#projects">Project capabilities</a></div>
      </div><div className="copy">© 2026 Ventures Engineering. All rights reserved.</div></footer>
    </>
  );
}
