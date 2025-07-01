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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 18, color: '#22c55e' }}>✔</span>
          <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>Thank you, {contact.name || ''}!</h2>
        </div>
        <div style={{ fontSize: 12, marginBottom: 10 }}>Here's a summary of your plan:</div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '0.7rem 1rem', marginBottom: 10, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12 }}>
            <li><strong>Business Stage:</strong> {businessStage}</li>
            <li><strong>Country:</strong> {countries.base}</li>
            <li><strong>Expansion Regions:</strong> {countries.expansion?.join(', ') || 'None'}</li>
            <li><strong>Services:</strong> {services.length > 0 ? services.join(', ') : 'None'}</li>
            <li><strong>Timeline:</strong> {timeline}</li>
            <li><strong>Plan:</strong> {plan}</li>
            <li><strong>Add-ons:</strong> {addons.length > 0 ? addons.join(', ') : 'None'}</li>
            <li><strong>Contact:</strong> {contact.email}{contact.phone ? `, ${contact.phone}` : ''}</li>
          </ul>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#1976d2', marginTop: 10 }}>
            Total Estimated Cost: €{finalTotal}
          </div>
        </div>
        <div style={{ background: '#e6fbe6', borderRadius: 8, padding: '8px 12px', color: '#15803d', fontWeight: 500, fontSize: 12, marginBottom: 10 }}>
          We'll be in touch shortly with your personalized business expansion solution!
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => alert('📅 Consultation Booking Coming Soon')}
            style={{
              background: '#fff',
              color: '#1976d2',
              border: '1.5px solid #1976d2',
              borderRadius: 7,
              padding: '7px 10px',
              fontWeight: 500,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            📞 Schedule Consultation
          </button>
          <button
            onClick={sendEmail}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 7,
              padding: '7px 10px',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
              transition: 'background 0.2s',
            }}
          >
            📩 Email Me This Plan
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#fff',
              color: '#1976d2',
              border: '1.5px solid #1976d2',
              borderRadius: 7,
              padding: '7px 10px',
              fontWeight: 500,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
