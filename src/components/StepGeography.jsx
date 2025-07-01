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
    <div>
      <h3>🌍 Where are you based, and where do you want to expand?</h3>
      
      <label>
        Current Country:
        <select value={currentCountry} onChange={e => setCurrentCountry(e.target.value)}>
          <option value="">--Select--</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          {/* Add more as needed */}
        </select>
      </label>

      <div style={{ marginTop: '1rem' }}>
        <p>Select expansion regions:</p>
        {regions.map(region => (
          <label key={region}>
            <input
              type="checkbox"
              checked={expansionRegions.includes(region)}
              onChange={() => toggleRegion(region)}
            />
            {region}
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button onClick={onBack}>⬅ Back</button>
        <button onClick={handleSubmit} disabled={!currentCountry}>Next ➡</button>
      </div>
    </div>
  );
}
