import type { Metadata } from 'next';
import { SiteNavigation } from '../components/SiteNavigation';
import { WhatsAppButton } from '../components/SocialRail';
import { projectTypes, type ProjectCapability } from '../project-capabilities';

export const metadata: Metadata = {
  title: 'Projects | Ventures Engineering',
  description: 'Explore the building, industrial, and infrastructure project types supported by Ventures Engineering.',
};

function ProjectDrawing({ mark }: { mark: ProjectCapability['mark'] }) {
  return (
    <svg viewBox="0 0 360 180" fill="none" aria-hidden="true">
      {mark === 'industrial' && <g className="drawing-lines"><path d="M58 145V86l42-24v24l44-26v85M48 145h122M75 145v-25h27v25m20-29h17m-17 13h17M112 61V39h15v14M162 89h24V55h22v90M189 55V35h14v20M186 145h51M218 145V98h22v47m-20-70h15" /><path d="M87 104V92m31-2V78m47 38h12" /></g>}
      {mark === 'infrastructure' && <g className="drawing-lines"><path d="M36 142h286M57 142l25-51h196l26 51M82 91c6-48 189-48 196 0M93 91v51m48-51v51m49-51v51m48-51v51M72 109h216M65 126h230M45 151h270" /><path d="M95 68h171M110 56h143" /></g>}
      {mark === 'building' && <g className="drawing-lines"><path d="M92 146V50l90-25 87 25v96M76 146h206M108 62l74-20 71 20M118 72v19m28-27v27m31-35v35m32-27v27m27-19v19M118 105v21m28-28v28m31-35v35m32-28v28m27-21v21M168 146v-24h29v24M82 151h198" /><path d="M111 50V35l71-20 72 20v15" /></g>}
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <a className="skip" href="#project-list">Skip to project capabilities</a>

      <WhatsAppButton />
      <header className="hero projects-hero">
        <SiteNavigation />
        <div className="projects-hero-content pad">
          <span className="hero-aside-kicker">Projects · Capability profiles</span>
          <h1>Built around<br />the structure.<em>Engineering support shaped by the demands of each project.</em></h1>
          <p>Explore the building, industrial, and infrastructure work our services are designed to support.</p>
          <a className="btn amb" href="/#contact">Discuss your project</a>
        </div>
        <div className="projects-hero-index" aria-hidden="true"><span>01 — 03</span><span>Structures · Testing · Design</span></div>
      </header>

      <main id="project-list" className="projects-page">
        <div className="projects-page-intro pad">
          <span className="eyebrow">Representative project types</span>
          <h2>Engineering scope for real-world structures.</h2>
          <p>These capability profiles describe the types of work we support. Project-specific references and outcomes can be added as approved case studies become available.</p>
        </div>
        <div className="project-profile-list">
          {projectTypes.map((project) => (
            <article className="project-profile pad" id={project.id} key={project.id}>
              <div className="profile-visual">
                <span className="project-index">{project.number} / CAPABILITY</span>
                <div className={`project-visual ${project.mark}`}><ProjectDrawing mark={project.mark} /></div>
                <span className="profile-scope">{project.scope}</span>
              </div>
              <div className="profile-content">
                <span className="eyebrow">{project.number} · Project capability</span>
                <h2>{project.title}</h2>
                <p className="profile-overview">{project.overview}</p>
                <h3>Typical engineering scope</h3>
                <ul>{project.focus.map((item) => <li key={item}>{item}</li>)}</ul>
                <a className="profile-link" href="/#contact">Discuss this project type <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <section className="close pad"><div className="cta">
        <div><h2>Have a structure in mind?</h2><p>Tell us about the site, the challenge, and what you need to move forward.</p></div>
        <div className="cta-row"><a className="btn dk" href="/#contact">Start an enquiry</a><a className="btn" href="/">Back to services</a></div>
      </div></section>

      <footer className="pad"><div className="fg">
        <div><a className="brand" href="/">Ventures Engineering</a><p className="q">Measured, documented and built to last.</p></div>
        <div><h5>Explore</h5><a href="/#overview">Services</a><a href="/projects">Project capabilities</a><a href="/#why">Our approach</a></div>
        <div><h5>Contact</h5><span>Pune, Maharashtra</span><a href="/#contact">Send a project enquiry</a></div>
      </div><div className="copy">© 2026 Ventures Engineering. All rights reserved.</div></footer>
    </>
  );
}
