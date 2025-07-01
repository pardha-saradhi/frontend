import React from 'react';
import calculatePrice from '../utils/calculatePrice';

export default function StepPlanRecommendation({ onNext, onBack, data }) {
  const country = data.countries?.base || 'Netherlands';
  const services = data.services || [];
  const addons = data.addons || [];
  const timeline = data.timeline || '';

  const price = calculatePrice({ country, services, addons, timeline });

  const handleSelectPlan = () => {
    onNext({ plan: 'eBranch', totalCost: price.total });
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
          <span role="img" aria-label="briefcase">💼</span> Based on your needs, we recommend the eBranch Plan.
        </h2>
        <div style={{
          background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          borderRadius: 8,
          padding: '0.4rem 0.7rem',
          margin: '0.5rem 0 0.7rem 0',
          fontWeight: 700,
          fontSize: 11,
        }}>
          eBranch Plan for {country}
          <div style={{ fontWeight: 400, fontSize: 9, color: '#e0e7ef', marginTop: 1 }}>
            Tailored to your business needs
          </div>
        </div>
        <div style={{ marginBottom: 7 }}>
          <div style={{ fontWeight: 600, fontSize: 10, marginBottom: 4 }}>Included Services:</div>
          <ul style={{ paddingLeft: 15, margin: 0, marginBottom: 4 }}>
            {services.map((service, i) => (
              <li key={i} style={{ fontSize: 10, marginBottom: 1 }}>✔ {service}</li>
            ))}
            {addons.map((addon, i) => (
              <li key={`addon-${i}`} style={{ fontSize: 10, marginBottom: 1, color: '#1976d2' }}>+ {addon}</li>
            ))}
          </ul>
        </div>
        <div style={{ borderTop: '1px solid #dbeafe', margin: '7px 0 4px 0' }} />
        <div style={{ fontSize: 9, marginBottom: 4 }}>
          <div>Base Fee: <span style={{ float: 'right' }}>€{price.base}</span></div>
          <div>Notary Fee: <span style={{ float: 'right' }}>€{price.notary}</span></div>
          <div>Gov't Fee: <span style={{ float: 'right' }}>€{price.government}</span></div>
          <div>Service Fee: <span style={{ float: 'right' }}>€{price.serviceCost}</span></div>
          <div>Add-on Fee: <span style={{ float: 'right' }}>€{price.addonCost}</span></div>
          <div>Rush Fee: <span style={{ float: 'right' }}>€{price.rushFee}</span></div>
        </div>
        <div style={{ borderTop: '1px solid #dbeafe', margin: '7px 0 4px 0' }} />
        <div style={{
          background: '#eaf3fe',
          borderRadius: 6,
          padding: '5px 8px',
          fontWeight: 700,
          fontSize: 11,
          color: '#1976d2',
          marginBottom: 7
        }}>
          Total: <span style={{ float: 'right' }}>€{price.total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
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
            onClick={handleSelectPlan}
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
