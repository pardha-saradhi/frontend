import React, { useState } from 'react';

const options = [
  { id: 'URGENT', label: '⚡ URGENT (Next 14 days)' },
  { id: 'STANDARD', label: '🚀 STANDARD (15–45 days)' },
  { id: 'PLANNING PHASE', label: '📝 PLANNING PHASE (46–90 days)' },
  { id: 'FUTURE PLANNING', label: '🗓 FUTURE PLANNING (90+ days)' }
];

export default function StepTimeline({ onNext, onBack }) {
  const [selected, setSelected] = useState('');

  const handleSubmit = () => {
    if (selected) {
      onNext({ timeline: selected });
    }
  };

  return (
    <div>
      <h3>📅 When are you looking to launch in your target country?</h3>
      <p>This affects service availability and preparation timelines.</p>

      <div style={{ marginTop: '1rem' }}>
        {options.map(opt => (
          <label key={opt.id} style={{ display: 'block', marginBottom: '0.75rem' }}>
            <input
              type="radio"
              name="timeline"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
            />
            <span style={{ marginLeft: '0.5rem' }}>{opt.label}</span>
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button onClick={onBack}>⬅ Back</button>
        <button onClick={handleSubmit} disabled={!selected}>Next ➡</button>
      </div>
    </div>
  );
}
