'use client';

import { type FormEvent, useState } from 'react';

type SubmissionState = { type: 'idle' | 'sending' | 'success' | 'error'; message: string };

export function ContactSection() {
  const [state, setState] = useState<SubmissionState>({ type: 'idle', message: '' });

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ type: 'sending', message: 'Sending your enquiry…' });

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? 'Your enquiry could not be sent. Please try again.');
      }

      form.reset();
      setState({ type: 'success', message: result.message ?? 'Thank you. Your enquiry has been received.' });
    } catch (error) {
      setState({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your enquiry could not be sent. Please try again.',
      });
    }
  }

  return (
    <section className="contact-section pad" id="contact">
      <div className="contact-heading">
        <span className="eyebrow">Start a conversation</span>
        <h2>Tell us what you’re building.</h2>
        <p>Share a few details and our engineering team will get back to you.</p>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={submitInquiry}>
          <div className="form-row">
            <label>Name<input name="name" autoComplete="name" minLength={2} maxLength={120} required /></label>
            <label>Work email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          </div>
          <div className="form-row">
            <label>Company <span className="optional">Optional</span><input name="companyName" autoComplete="organization" maxLength={160} /></label>
            <label>Project type
              <select name="projectType" defaultValue="">
                <option value="">Choose a project type</option>
                <option>Structural assessment</option>
                <option>Testing and inspection</option>
                <option>Design and detailing</option>
                <option>Infrastructure</option>
                <option>Repair and strengthening</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <label>How can we help?<textarea name="message" rows={5} minLength={10} maxLength={4000} required /></label>
          <label className="form-trap" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="form-submit-row">
            <button className="btn submit-btn" type="submit" disabled={state.type === 'sending'}>
              {state.type === 'sending' ? 'Sending…' : 'Send enquiry'}
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5" /></svg>
            </button>
            <p className={`form-status ${state.type}`} role="status" aria-live="polite">{state.message}</p>
          </div>
        </form>

        <div className="contact-aside">
          <div className="contact-details">
            <span className="eyebrow">Our base</span>
            <h3>Pune, Maharashtra</h3>
            <p>Supporting building, industrial and infrastructure projects across India.</p>
          </div>
          <div className="map-frame">
            <iframe
              title="Map centered on Pune, Maharashtra"
              src="https://www.openstreetmap.org/export/embed.html?bbox=73.78%2C18.47%2C73.93%2C18.58&amp;layer=mapnik&amp;marker=18.5204%2C73.8567"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="map-link" href="https://www.openstreetmap.org/?mlat=18.5204&mlon=73.8567#map=12/18.5204/73.8567" target="_blank" rel="noreferrer">Open map <span aria-hidden="true">↗</span></a>
          </div>
          <p className="location-note">Map shows Pune city center; office address details can be added when available.</p>
        </div>
      </div>
    </section>
  );
}
