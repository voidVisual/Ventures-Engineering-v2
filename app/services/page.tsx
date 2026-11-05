import type { Metadata } from 'next';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Services | Ventures Engineering', description: 'Structural assessment, design, and rehabilitation services.' };

const services = [
  ['01', 'Structural audit', 'A practical evaluation of condition, safety, and next actions for existing structures.', 'Visual surveys · stability certification · estimates'],
  ['02', 'Non-destructive testing', 'Targeted material and reinforcement testing that shows what is happening within the asset.', 'Rebar scan · UPV · rebound hammer · corrosion review'],
  ['03', 'Design & detailing', 'Clear structural systems and coordinated drawings for concrete, steel, and PEB projects.', 'RCC · steel · PEB · shop drawings'],
  ['04', 'Repair & strengthening', 'Measured repair strategies that restore capacity and extend useful service life.', 'Methodology · CFRP · jacketing · quality review'],
];

export default function ServicesPage() {
  return <main className="editorial-detail-page">
    <header className="editorial-nav detail-nav"><a className="editorial-brand" href="/">VENTURES<span> / ENGINEERING</span></a><nav><a href="/services">SERVICES</a><a href="/approach">APPROACH</a><a href="/capabilities">CAPABILITIES</a></nav><a className="nav-contact" href="/#contact">START A PROJECT <ArrowRight size={15} /></a></header>
    <section className="detail-hero services-hero"><p className="eyebrow">ENGINEERING SERVICES · 01—04</p><h1>Evidence first.<br /><em>Every time.</em></h1><p>Services built around what a structure needs now and what it needs to keep working for years ahead.</p><ArrowDownRight className="detail-scroll" /></section>
    <section className="detail-list">{services.map(([number, title, copy, scope]) => <article key={number} className="detail-service reveal"><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div><small>{scope}</small><a href="/#contact" aria-label={`Discuss ${title}`}><ArrowDownRight /></a></article>)}</section>
    <section className="detail-cta"><p className="eyebrow">PROJECT ENQUIRY</p><h2>Start with<br /><em>the structure.</em></h2><a href="/#contact">TELL US ABOUT THE PROJECT <ArrowRight size={16} /></a></section>
    <footer className="editorial-footer"><a className="editorial-brand" href="/">VENTURES<span> / ENGINEERING</span></a><span>PUNE, MAHARASHTRA · INDIA</span><a href="/#top">BACK TO TOP ↑</a></footer>
  </main>;
}
