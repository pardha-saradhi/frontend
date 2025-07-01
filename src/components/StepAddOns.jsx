import React, { useState, useEffect } from 'react';

const addOnOptions = [
  { id: 'taxFiling', label: '🧾 Corporate Tax Filing', price: 125 },
  { id: 'vatFiling', label: '🔄 VAT Return Filing', price: 175 },
  { id: 'financials', label: '📊 Financial Statement Assistance', price: 650 }
];

export default function StepAddOns({ onNext, onBack, data }) {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [addOnTotal, setAddOnTotal] = useState(0);

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const total = selectedAddOns.reduce((sum, id) => {
      const addOn = addOnOptions.find((a) => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    setAddOnTotal(total);
  }, [selectedAddOns]);

  const handleSubmit = () => {
    onNext({ addons: selectedAddOns, finalTotal: data.totalCost + addOnTotal });
  };

  return (
    <div>
      <h3>➕ Would you like to add any of these services?</h3>

      <div style={{ marginTop: '1rem' }}>
        {addOnOptions.map((addOn) => (
          <label key={addOn.id} style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={selectedAddOns.includes(addOn.id)}
              onChange={() => toggleAddOn(addOn.id)}
            />
            <span style={{ marginLeft: '0.5rem' }}>
              {addOn.label} – €{addOn.price}
            </span>
          </label>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <strong>Current Total: €{data.totalCost + addOnTotal}</strong>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <button onClick={onBack}>⬅ Back</button>
        <button onClick={handleSubmit}>Next ➡</button>
      </div>
    </div>
  );
}
