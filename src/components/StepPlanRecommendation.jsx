import React from 'react';
import calculatePrice from '../utils/calculatePrice';

export default function StepPlanRecommendation({ onNext, onBack, data }) {
  const country = data.countries?.base || 'Netherlands';
  const services = data.services || [];
  const addons = data.addons || [];
  const timeline = data.timeline || '';

  console.log("📦 Selected Country:", country);
  console.log("🛠 Selected Services:", services);
  console.log("✨ Selected Add-ons:", addons);
  console.log("⏰ Timeline:", timeline);

  const price = calculatePrice({ country, services, addons, timeline });

  const handleSelectPlan = () => {
    onNext({ plan: 'eBranch', totalCost: price.total });
  };

  return (
    <div>
      <h3>💼 Based on your needs, we recommend the eBranch Plan.</h3>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', margin: '1rem 0' }}>
        <h4>eBranch Plan for {country}</h4>

        <ul>
          {services.map((service, i) => (
            <li key={i}>🛠 {service}</li>
          ))}
          {addons.map((addon, i) => (
            <li key={`addon-${i}`}>✨ {addon}</li>
          ))}
        </ul>

        <hr />

        <p><strong>Base Fee:</strong> €{price.base}</p>
        <p><strong>Notary Fee:</strong> €{price.notary}</p>
        <p><strong>Gov’t Fee:</strong> €{price.government}</p>
        <p><strong>Service Fee:</strong> €{price.serviceCost}</p>
        <p><strong>Add-on Fee:</strong> €{price.addonCost}</p>
        <p><strong>Rush Fee:</strong> €{price.rushFee}</p>

        <hr />
        <h4>Total: €{price.total}</h4>
      </div>

      <div>
        <button onClick={onBack}>⬅ Back</button>
        <button onClick={handleSelectPlan}>Next ➡</button>
      </div>
    </div>
  );
}
