import React, { useState } from 'react';
import { Mail, PhoneCall, Send, CheckCircle2, FileDown, Clock, MapPin } from 'lucide-react';

export default function QuoteSection({ onOpenScope }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    structureType: 'Commercial Complex',
    serviceType: 'Structural Audit',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[var(--accent-brass)]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Call to Action */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-brass)] block mb-3">
              CONSULTATION & RFQ
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[var(--text-primary)] mb-6 leading-tight">
              Need Structural Engineering Support?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Discuss your project directly with our chartered structural engineers. We provide an initial technical evaluation and preliminary quote within one working day.
            </p>

            {/* Quick Contacts */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:hello@venturesengineering.example"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-brass)] transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[var(--bg-chip)] text-[var(--accent-brass)]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Direct Email</div>
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-brass)]">
                    hello@venturesengineering.example
                  </div>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-brass)] transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[var(--bg-chip)] text-[var(--accent-amber)]">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Engineering Hotline</div>
                  <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-brass)]">
                    +91 98765 43210
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <div className="p-2.5 rounded-lg bg-[var(--bg-chip)] text-[var(--accent-cyan)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Registered Office</div>
                  <div className="text-sm font-medium text-[var(--text-primary)]">
                    Pune, Maharashtra, India
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenScope}
              className="btn-secondary w-full text-center"
            >
              <span>Open Interactive Scope Builder</span>
            </button>
          </div>

          {/* Right Column: Architectural RFQ Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl relative">
              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-brass-dim)] border border-[var(--accent-brass)] flex items-center justify-center text-[var(--accent-brass)] mx-auto mb-4">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-[var(--text-primary)] mb-2">
                    Inquiry Transmitted.
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
                    Our structural engineering team in Pune has received your request. A designated engineer will review your specs and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-secondary text-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl font-light text-[var(--text-primary)] mb-2">
                    Request Engineering Quotation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1 uppercase">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Mehta"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1 uppercase">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="v.mehta@enterprise.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1 uppercase">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1 uppercase">
                        Primary Discipline
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans"
                      >
                        <option>Structural Audit & Certification</option>
                        <option>Non-Destructive Testing (NDT)</option>
                        <option>Design and Detailing</option>
                        <option>Infrastructure / Heavy Civil</option>
                        <option>Repair & Strengthening</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-muted)] mb-1 uppercase">
                      Project Description & Location
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify building age, approximate built-up area, observed distress symptoms, or specific testing requirements..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-brass)] transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center !py-3.5 mt-2"
                  >
                    <Send size={15} />
                    <span>Submit Request for Evaluation</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[var(--text-muted)] pt-2">
                    <Clock size={12} />
                    <span>GUARANTEED RESPONSE WITHIN 24 BUSINESS HOURS</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

