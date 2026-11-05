'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Clock, ShieldCheck, Send, ArrowRight, Layers } from 'lucide-react';

interface StructurePreset {
  id: string;
  name: string;
  factor: number;
  icon: string;
}

const STRUCTURE_TYPES: StructurePreset[] = [
  { id: 'commercial', name: 'Commercial High-Rise', factor: 1.25, icon: '🏢' },
  { id: 'industrial', name: 'Industrial PEB / Plant', factor: 1.15, icon: '🏭' },
  { id: 'residential', name: 'Residential Complex', factor: 1.0, icon: '🏙️' },
  { id: 'infrastructure', name: 'Bridge / Tunnel / Civil', factor: 1.45, icon: '🌉' },
  { id: 'heritage', name: 'Heritage / Retrofit', factor: 1.35, icon: '🏛️' },
];

const AVAILABLE_TESTS = [
  { id: 'audit', name: 'Structural Audit & Stability Cert', days: 3, points: 12 },
  { id: 'rebar', name: 'Electromagnetic Rebar Scanning', days: 2, points: 18 },
  { id: 'upv', name: 'Ultrasonic Pulse Velocity (UPV)', days: 2, points: 24 },
  { id: 'core', name: 'Diamond Core Compressive Testing', days: 4, points: 8 },
  { id: 'peb', name: 'PEB & Structural Detailing', days: 7, points: 0 },
  { id: 'carbon', name: 'Carbonation & Corrosion Mapping', days: 2, points: 16 },
];

export default function InteractiveEstimator({ onOpenQuote }: { onOpenQuote?: (summary: string) => void }) {
  const [selectedStructure, setSelectedStructure] = useState<string>('commercial');
  const [areaSqFt, setAreaSqFt] = useState<number>(45000);
  const [selectedTests, setSelectedTests] = useState<string[]>(['audit', 'rebar', 'upv']);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string; ref?: string } | null>(null);

  const toggleTest = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((t) => t !== id) : prev) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const struct = STRUCTURE_TYPES.find((s) => s.id === selectedStructure) || STRUCTURE_TYPES[0];
    const areaMultiplier = Math.max(1, areaSqFt / 25000);

    let baseDays = 0;
    let basePoints = 0;

    selectedTests.forEach((tId) => {
      const test = AVAILABLE_TESTS.find((t) => t.id === tId);
      if (test) {
        baseDays += test.days;
        basePoints += test.points;
      }
    });

    const totalDays = Math.max(3, Math.round(baseDays * struct.factor * Math.sqrt(areaMultiplier)));
    const totalPoints = Math.round(basePoints * areaMultiplier);
    const engineerTeamSize = areaSqFt > 100000 ? '4 Senior Engineers + 2 NDT Technicians' : '2 Senior Engineers + 1 NDT Specialist';

    return {
      structureName: struct.name,
      totalDays,
      totalPoints,
      engineerTeamSize,
    };
  }, [selectedStructure, areaSqFt, selectedTests]);

  const handleSubmitScope = async () => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    const scopeSummary = `${calculation.structureName} (${areaSqFt.toLocaleString()} sq ft) | Scope: ${selectedTests
      .map((id) => AVAILABLE_TESTS.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join(', ')} | Estimated Field Duration: ~${calculation.totalDays} Days`;

    if (onOpenQuote) {
      onOpenQuote(scopeSummary);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Online Estimator Client',
          serviceNeeded: selectedTests.join(', '),
          message: scopeSummary,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmissionResult({
          success: true,
          ref: data.referenceCode,
          message: `Scope registered! Reference: ${data.referenceCode}. A lead structural engineer will evaluate this data within 24 business hours.`,
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.message || 'Submission error. Please reach out via WhatsApp or phone.',
        });
      }
    } catch {
      setSubmissionResult({
        success: false,
        message: 'Could not connect to server. Please call +91 98765 43210 directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="estimator-card">
      {/* Background radial gradient glow */}
      <div className="estimator-glow-1" />
      <div className="estimator-glow-2" />

      {/* Header */}
      <div className="estimator-header-row">
        <div>
          <div className="estimator-badge-pill">
            <span className="estimator-pulse-dot" />
            <span>FULLSTACK PROJECT CONFIGURATOR</span>
          </div>
          <h3 className="estimator-title">
            Interactive Scope & Testing Estimator
          </h3>
          <p className="estimator-desc">
            Simulate diagnostic requirements, field duration, and inspection densities in real time.
          </p>
        </div>

        <div className="estimator-compliance-tag">
          <Calculator size={14} style={{ color: 'var(--amber-400)' }} />
          <span>IS 456 / NBC 2016 ALIGNED</span>
        </div>
      </div>

      <div className="estimator-grid-split">
        {/* Left Column: Configurator Controls */}
        <div>
          {/* 1. Structure Type */}
          <div style={{ marginBottom: '24px' }}>
            <label className="estimator-step-label">
              1. Select Asset / Structure Category
            </label>
            <div className="estimator-preset-grid">
              {STRUCTURE_TYPES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStructure(st.id)}
                  className={`estimator-preset-btn ${selectedStructure === st.id ? 'active' : ''}`}
                >
                  <span style={{ fontSize: '1.15rem' }}>{st.icon}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Built-Up Area */}
          <div className="estimator-slider-wrap">
            <div className="estimator-slider-header">
              <label className="estimator-step-label" style={{ marginBottom: 0 }}>
                2. Approximate Built-Up Area
              </label>
              <span className="estimator-slider-value">
                {areaSqFt.toLocaleString()} sq. ft.
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={300000}
              step={5000}
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(Number(e.target.value))}
              className="estimator-range-input"
            />
            <div className="estimator-slider-limits">
              <span>5,000 sq ft</span>
              <span>150,000 sq ft</span>
              <span>300,000+ sq ft</span>
            </div>
          </div>

          {/* 3. Diagnostic & Engineering Modules */}
          <div>
            <label className="estimator-step-label">
              3. Select Engineering Modules Required
            </label>
            <div className="estimator-modules-grid">
              {AVAILABLE_TESTS.map((test) => {
                const isChecked = selectedTests.includes(test.id);
                return (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => toggleTest(test.id)}
                    className={`estimator-module-btn ${isChecked ? 'active' : ''}`}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                      {test.name}
                    </span>
                    <span className="estimator-check-pill">
                      {isChecked ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Projection Card */}
        <div className="estimator-summary-panel">
          <div>
            <div className="estimator-summary-top">
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-300)' }}>
                CALCULATED ESTIMATION
              </span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', padding: '2px 10px', borderRadius: '999px', background: 'var(--amber-light)', color: 'var(--amber-400)', border: '1px solid rgba(234, 160, 35, 0.3)', fontWeight: 700 }}>
                LIVE SPEC
              </span>
            </div>

            <div className="estimator-stat-rows">
              <div className="estimator-stat-row">
                <span className="estimator-stat-label">
                  <Clock size={15} />
                  Estimated Field Duration
                </span>
                <span className="estimator-stat-val">
                  ~{calculation.totalDays} Business Days
                </span>
              </div>

              <div className="estimator-stat-row">
                <span className="estimator-stat-label">
                  <Layers size={15} />
                  Estimated Testing Points
                </span>
                <span className="estimator-stat-val">
                  {calculation.totalPoints} Structural Locations
                </span>
              </div>

              <div className="estimator-stat-row">
                <span className="estimator-stat-label">
                  <ShieldCheck size={15} />
                  Inspection Deployment
                </span>
                <span className="estimator-stat-val" style={{ fontSize: '0.76rem', textAlign: 'right' }}>
                  {calculation.engineerTeamSize}
                </span>
              </div>
            </div>

            <div className="estimator-legal-note">
              <strong>Statutory Note:</strong> Preliminary estimations are generated using standard municipal IS 456 & NBC sampling densities. Final bill of quantities is calibrated during preliminary site walk-through.
            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            {submissionResult && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  marginBottom: '12px',
                  background: submissionResult.success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                  color: submissionResult.success ? '#a7f3d0' : '#fecdd3',
                  border: submissionResult.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
                }}
              >
                {submissionResult.message}
              </div>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitScope}
              className="btn-amber"
              style={{ width: '100%', justifyContent: 'center', paddingBlock: '14px', borderRadius: '10px' }}
            >
              <Send size={15} />
              <span>{isSubmitting ? 'Registering with Engineering Desk...' : 'Transmit Scope for Formal Quotation'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
