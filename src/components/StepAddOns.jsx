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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#2563eb',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 12,
        marginTop: 0
      }}>
        HC
      </div>
      <div style={{
        background: '#eaf3fe',
        borderRadius: 12,
        padding: '0.7rem 0.7rem 0.7rem 0.7rem',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
        minWidth: 0,
        maxWidth: 250
      }}>
        <h2 style={{ fontSize: 12, fontWeight: 800, margin: 0, marginBottom: 6 }}>
          <span role="img" aria-label="plus">➕</span> Would you like to add any of these services?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
          {addOnOptions.map((addOn) => (
            <label
              key={addOn.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 7,
                padding: '5px 8px',
                fontSize: 10,
                fontWeight: 500,
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.03)',
                cursor: 'pointer',
                border: selectedAddOns.includes(addOn.id) ? '1.2px solid #2563eb' : '1px solid #bdbdbd',
                color: selectedAddOns.includes(addOn.id) ? '#2563eb' : '#222',
                minWidth: 0
              }}
            >
              <input
                type="checkbox"
                checked={selectedAddOns.includes(addOn.id)}
                onChange={() => toggleAddOn(addOn.id)}
                style={{ marginRight: 6, width: 13, height: 13 }}
              />
              {addOn.label} <span style={{ marginLeft: 6, fontWeight: 400, color: '#1976d2', fontSize: 10 }}>€{addOn.price}</span>
            </label>
          ))}
        </div>
        <div style={{ marginTop: 5, marginBottom: 8, fontWeight: 700, fontSize: 11, color: '#1976d2', background: '#eaf3fe', borderRadius: 7, padding: '5px 8px' }}>
          Current Total: <span style={{ float: 'right' }}>€{data.totalCost + addOnTotal}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <button
            onClick={onBack}
            style={{
              background: '#fff',
              color: '#1976d2',
              border: '1.2px solid #1976d2',
              borderRadius: 6,
              padding: '4px 10px',
              fontWeight: 500,
              fontSize: 10,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              minWidth: 0
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '4px 10px',
              fontWeight: 600,
              fontSize: 10,
              cursor: 'pointer',
              boxShadow: '0 2px 6px 0 rgba(37,99,235,0.07)',
              transition: 'background 0.2s',
              minWidth: 0
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
