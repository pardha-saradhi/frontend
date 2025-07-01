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
        <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0, marginBottom: 10 }}>
          <span role="img" aria-label="wrench">🛠</span> Which services do you need help with?
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
          {serviceOptions.map(option => (
            <label
              key={option.id}
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
                border: selectedServices.includes(option.id) ? '2px solid #2563eb' : '1.5px solid #bdbdbd',
                color: selectedServices.includes(option.id) ? '#2563eb' : '#222',
                minWidth: 90
              }}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(option.id)}
                onChange={() => toggleService(option.id)}
                style={{ marginRight: 6 }}
              />
              {option.label}
            </label>
          ))}
        </div>
        {selectedServices.includes('other') && (
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <label style={{ fontWeight: 500, fontSize: 12 }}>
              Please specify:
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Your other service needs"
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '7px 10px',
                  borderRadius: 6,
                  border: '1px solid #bdbdbd',
                  fontSize: 12,
                  background: '#fff',
                }}
              />
            </label>
          </div>
        )}
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
            disabled={selectedServices.length === 0 && !otherText}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '7px 18px',
              fontWeight: 600,
              fontSize: 13,
              cursor: selectedServices.length === 0 && !otherText ? 'not-allowed' : 'pointer',
              opacity: selectedServices.length === 0 && !otherText ? 0.6 : 1,
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
