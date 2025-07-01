import React from 'react';

export default function StepSummary({ data, onBack }) {
  const {
    businessStage,
    countries = {},
    services = [],
    timeline,
    plan = 'eBranch',
    addons = [],
    contact = {},
    finalTotal = 0
  } = data;

  const sendEmail = async () => {
    try {
      const res = await fetch('https://backend-2-21vd.onrender.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          plan: plan || 'eBranch',
          contact: {
            name: contact.name || '',
            email: contact.email || '',
            phone: contact.phone || ''
          },
          services,
          addons,
          countries: {
            base: countries.base || '',
            expansion: countries.expansion || []
          }
        })
      });

      const result = await res.json();
      if (result.status === 'success') {
        alert('✅ Email sent successfully!');
      } else {
        alert('❌ Email failed: ' + result.error);
      }
    } catch (err) {
      alert('❌ Email error: ' + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#e7faff', padding: '1rem', borderRadius: '10px', position: 'relative', height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
        <h3>✅ Thank you, {contact.name}!</h3>
        <p>Here’s a summary of your plan:</p>
        <ul>
          <li><strong>Business Stage:</strong> {businessStage}</li>
          <li><strong>Country:</strong> {countries.base}</li>
          <li><strong>Expansion Regions:</strong> {countries.expansion?.join(', ') || 'None'}</li>
          <li><strong>Services:</strong> {services.length > 0 ? services.join(', ') : 'None'}</li>
          <li><strong>Timeline:</strong> {timeline}</li>
          <li><strong>Plan:</strong> {plan}</li>
          <li><strong>Add-ons:</strong> {addons.length > 0 ? addons.join(', ') : 'None'}</li>
          <li><strong>Contact:</strong> {contact.email}{contact.phone ? `, ${contact.phone}` : ''}</li>
        </ul>
        <h4>Total Estimated Cost: €{finalTotal}</h4>
        <div style={{ marginTop: '1rem' }}>
          <p>Next step?</p>
          <button onClick={() => alert('📅 Consultation Booking Coming Soon')}>📞 Schedule Consultation</button>
          <button onClick={sendEmail}>📩 Email Me This Plan</button>
          <button onClick={onBack}>⬅ Back</button>
        </div>
      </div>
      {/* REMOVE the ChatWindow from the summary */}
    </div>
  );
}
