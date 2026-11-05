import type { Metadata } from 'next';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Capabilities | Ventures Engineering', description: 'Engineering support for buildings, industrial structures, and infrastructure.' };

const capabilities = [
  ['Existing buildings', 'AUDIT · NDT · REHABILITATION', 'photo-1511818966892-d7d671e672a2'],
  ['Industrial structures', 'DESIGN · DETAILING · QA', 'photo-1486406146926-c627a92ad1ab'],
  ['Transport infrastructure', 'INSPECTION · ANALYSIS · DESIGN', 'photo-1504307651254-35680f356dfd'],
];

export default function CapabilitiesPage() {
  return <main className="editorial-detail-page capabilities-page">
    <header className="editorial-nav detail-nav"><a className="editorial-brand" href="/">VENTURES<span> / ENGINEERING</span></a><nav><a href="/services">SERVICES</a><a href="/approach">APPROACH</a><a href="/capabilities">CAPABILITIES</a></nav><a className="nav-contact" href="/#contact">START A PROJECT <ArrowRight size={15} /></a></header>
    <section className="detail-hero capabilities-hero"><p className="eyebrow">PROJECT CAPABILITIES · 01—03</p><h1>Built around<br /><em>the structure.</em></h1><p>Support shaped by the loads, materials, operations, and service life of the asset in front of us.</p></section>
    <section className="capability-page-list">{capabilities.map(([title, type, image], index) => <a href="/projects" className="capability-page-card reveal" key={title}><div className="capability-page-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,.78)), url(https://images.unsplash.com/${image}?auto=format&fit=crop&w=1500&q=85)` }} /><span>{`0${index + 1}`} · {type}</span><h2>{title}</h2><ArrowDownRight /></a>)}</section>
    <section className="detail-cta"><p className="eyebrow">PROJECT TYPES</p><h2>Find the right<br /><em>starting point.</em></h2><a href="/projects">EXPLORE PROJECT TYPES <ArrowRight size={16} /></a></section>
    <footer className="editorial-footer"><a className="editorial-brand" href="/">VENTURES<span> / ENGINEERING</span></a><span>PUNE, MAHARASHTRA · INDIA</span><a href="/#top">BACK TO TOP ↑</a></footer>
  </main>;
}
