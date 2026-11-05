import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Approach | Ventures Engineering', description: 'A measured process for structural engineering decisions.' };

const steps = [
  ['01', 'Listen & define', 'We establish the concern, the asset context, and the decision the project needs to support.'],
  ['02', 'Inspect & verify', 'We select the right site observations, records review, and testing to build an evidence base.'],
  ['03', 'Analyse & design', 'Findings become calculations, options, drawings, and a practical plan for the asset.'],
  ['04', 'Document & support', 'We present a clear report and remain available through design, repair, and quality review.'],
];

export default function ApproachPage() {
  return <main className="editorial-detail-page approach-page">
    <header className="editorial-nav detail-nav"><a className="editorial-brand" href="/">VENTURES<span> / ENGINEERING</span></a><nav><a href="/services">SERVICES</a><a href="/approach">APPROACH</a><a href="/capabilities">CAPABILITIES</a></nav><a className="nav-contact" href="/#contact">START A PROJECT <ArrowRight size={15} /></a></header>
    <section className="detail-hero approach-hero"><p className="eyebrow">OUR APPROACH · A CLEAR PATH FORWARD</p><h1>Measure what<br />matters <em>most.</em></h1><p>We make complicated structural questions easier to act on through a disciplined process and direct communication.</p></section>
    <section className="approach-statement"><p className="eyebrow">THE PRINCIPLE</p><h2>Good decisions need<br /><span>good evidence.</span></h2><p>Our role is to turn site conditions into useful direction: what is sound, what needs attention, and how to move safely and efficiently.</p></section>
    <section className="approach-steps">{steps.map(([number, title, copy]) => <article className="reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</section>
    <section className="detail-cta"><p className="eyebrow">LET’S TALK</p><h2>Bring us<br /><em>the question.</em></h2><a href="/#contact">START A CONVERSATION <ArrowRight size={16} /></a></section>
    <footer className="editorial-footer"><a className="editorial-brand" href="/">VENTURES<span> / ENGINEERING</span></a><span>PUNE, MAHARASHTRA · INDIA</span><a href="/#top">BACK TO TOP ↑</a></footer>
  </main>;
}
