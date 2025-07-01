import React, { useState } from 'react';

const options = [
  { id: 'URGENT', label: '⚡ URGENT', desc: 'Next 14 days' },
  { id: 'STANDARD', label: '🚀 STANDARD', desc: '15–45 days' },
  { id: 'PLANNING PHASE', label: '📝 PLANNING PHASE', desc: '46–90 days' },
  { id: 'FUTURE PLANNING', label: '🗓 FUTURE PLANNING', desc: '90+ days' }
];

export default function StepTimeline({ onNext, onBack }) {
  const [selected, setSelected] = useState('');

  const handleSubmit = () => {
    if (selected) {
      onNext({ timeline: selected });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#2563eb',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 15,
        marginTop: 4
      }}>
        HC
      </div>
      <div style={{
        background: '#eaf3fe',
        borderRadius: 16,
        padding: '1rem 1.2rem 1rem 1.2rem',
        boxShadow: '0 2px 10px 0 rgba(0,0,0,0.07)',
        minWidth: 0,
        maxWidth: 270
      }}>
        <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0, marginBottom: 6 }}>
          <span role="img" aria-label="calendar">📅</span> When are you looking to launch in your target country?
        </h2>
        <div style={{ fontSize: 12, color: '#444', marginBottom: 10 }}>
          This affects service availability and preparation timelines.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
          {options.map(opt => (
            <label
              key={opt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 8,
                padding: '6px 10px',
                fontSize: 12,
                fontWeight: 500,
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
                cursor: 'pointer',
                border: selected === opt.id ? '2px solid #2563eb' : '1.5px solid #bdbdbd',
                color: selected === opt.id ? '#2563eb' : '#222',
                minWidth: 90
              }}
            >
              <input
                type="radio"
                name="timeline"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => setSelected(opt.id)}
                style={{ marginRight: 6 }}
              />
              <span style={{ fontSize: 15, marginRight: 6 }}>{opt.label.split(' ')[0]}</span>
              <span>
                <span style={{ fontWeight: 700 }}>{opt.label.replace(/^[^ ]+ /, '')}</span>
                <div style={{ fontWeight: 400, fontSize: 11, color: '#444', marginTop: 2 }}>{opt.desc}</div>
              </span>
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <button
            onClick={onBack}
            style={{
              background: '#fff',
              color: '#1976d2',
              border: '1.5px solid #1976d2',
              borderRadius: 7,
              padding: '7px 14px',
              fontWeight: 500,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '7px 18px',
              fontWeight: 600,
              fontSize: 13,
              cursor: !selected ? 'not-allowed' : 'pointer',
              opacity: !selected ? 0.6 : 1,
              boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
              transition: 'background 0.2s',
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
