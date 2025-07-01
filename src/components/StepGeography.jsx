import React, { useState } from 'react';

export default function StepGeography({ onNext, onBack }) {
  const [currentCountry, setCurrentCountry] = useState('');
  const [expansionRegions, setExpansionRegions] = useState([]);

  const regions = [
    "European Union",
    "United Kingdom",
    "United States",
    "Asia-Pacific",
    "Other Regions"
  ];

  const toggleRegion = (region) => {
    setExpansionRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const handleSubmit = () => {
    onNext({
      countries: {
        base: currentCountry,
        expansion: expansionRegions
      }
    });
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
          <span role="img" aria-label="globe">🌍</span> Where are you based, and where do you want to expand?
        </h2>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 600, fontSize: 12, marginBottom: 6, display: 'block' }}>
            Current Country:
            <select
              value={currentCountry}
              onChange={e => setCurrentCountry(e.target.value)}
              style={{
                display: 'block',
                marginTop: 6,
                padding: '7px 10px',
                borderRadius: 6,
                border: '1px solid #bdbdbd',
                fontSize: 13,
                width: '100%',
                background: '#fff',
                marginBottom: 0
              }}
            >
              <option value="">--Select--</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 6 }}>Select expansion regions:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {regions.map(region => (
              <label
                key={region}
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
                  border: expansionRegions.includes(region) ? '2px solid #2563eb' : '1.5px solid #bdbdbd',
                  color: expansionRegions.includes(region) ? '#2563eb' : '#222',
                  minWidth: 90
                }}
              >
                <input
                  type="checkbox"
                  checked={expansionRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                  style={{ marginRight: 6 }}
                />
                {region}
              </label>
            ))}
          </div>
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
            disabled={!currentCountry}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '7px 18px',
              fontWeight: 600,
              fontSize: 13,
              cursor: !currentCountry ? 'not-allowed' : 'pointer',
              opacity: !currentCountry ? 0.6 : 1,
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
