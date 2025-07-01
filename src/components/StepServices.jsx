import React, { useState } from 'react';

const serviceOptions = [
  { id: 'virtualOffice', label: '📦 Virtual Office' },
  { id: 'localEntity', label: '💼 Local Entity Setup' },
  { id: 'vatId', label: '🧾 VAT ID Application' },
  { id: 'vatFiling', label: '🔄 VAT Filing' },
  { id: 'annualReports', label: '📊 Annual Financial Reports' },
  { id: 'other', label: '➕ Other' }
];

export default function StepServices({ onNext, onBack }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherText, setOtherText] = useState('');

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const serviceLabelMap = {
  virtualOffice: 'Virtual Office',
  localEntity: 'Local Entity Setup',
  vatId: 'VAT ID Application',
  vatFiling: 'VAT Filing',
  annualReports: 'Annual Financial Reports',
  other: 'Other'
};

const handleSubmit = () => {
  const services = selectedServices.map(id => {
    if (id === 'other' && otherText.trim()) {
      return `Other: ${otherText.trim()}`;
    }
    return serviceLabelMap[id] || id;
  });

  onNext({ services });
};

  return (
    <div>
      <h3>🛠 Which services do you need help with?</h3>

      <div className="services-list" style={{ display: 'grid', gap: '10px', marginTop: '1rem' }}>
        {serviceOptions.map(option => (
          <label key={option.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={selectedServices.includes(option.id)}
              onChange={() => toggleService(option.id)}
            />
            <span style={{ marginLeft: '0.5rem' }}>{option.label}</span>
          </label>
        ))}
      </div>

      {selectedServices.includes('other') && (
        <div style={{ marginTop: '1rem' }}>
          <label>
            Please specify:
            <input
              type="text"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Your other service needs"
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </label>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button onClick={onBack}>⬅ Back</button>
        <button onClick={handleSubmit} disabled={selectedServices.length === 0 && !otherText}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
