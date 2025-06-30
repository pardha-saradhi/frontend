import React, { useState } from 'react';

export default function StepContactInfo({ onNext, onBack }) {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    method: 'email'
  });

  const isValid = contact.name && /\S+@\S+\.\S+/.test(contact.email);

  const handleSubmit = () => {
    if (isValid) {
      onNext({ contact });
    }
  };

  return (
    <div>
      <h3>📥 I’m ready with your tailored solution.</h3>
      <p>How should I send it to you?</p>

      <label>
        Full Name:
        <input
          type="text"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required
        />
      </label>

      <label>
        Email (required):
        <input
          type="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          required
        />
      </label>

      <label>
        Phone (optional):
        <input
          type="tel"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
      </label>

      <div style={{ marginTop: '1rem' }}>
        <label>
          <input
            type="radio"
            checked={contact.method === 'email'}
            onChange={() => setContact({ ...contact, method: 'email' })}
          />
          ✉ Email Only
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            checked={contact.method === 'email+phone'}
            onChange={() => setContact({ ...contact, method: 'email+phone' })}
          />
          ☎ Email + Phone
        </label>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={onBack}>⬅ Back</button>
        <button onClick={handleSubmit} disabled={!isValid}>Next ➡</button>
      </div>
    </div>
  );
}
