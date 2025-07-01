// StepBusinessStage.jsx
export default function StepBusinessStage({ onNext, onBack }) {
  const handleSelect = (stage) => {
    onNext({ businessStage: stage });
  };

  const options = [
    {
      label: 'Exploring Ideas',
      desc: `I'm researching options for global expansion`,
      icon: '💡',
      value: 'Exploring Ideas',
    },
    {
      label: 'Existing Company',
      desc: 'I have an established business looking to expand',
      icon: '🏢',
      value: 'Existing Company',
    },
    {
      label: 'Need New Entity',
      desc: 'I need to set up a legal entity in a new market',
      icon: '📝',
      value: 'Need New Entity',
    },
    {
      label: 'Managing Multiple',
      desc: 'I have entities in multiple countries already',
      icon: '🌐',
      value: 'Managing Multiple',
    },
  ];

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
          Where are you in your business journey?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                background: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '8px 10px',
                fontSize: 13,
                fontWeight: 600,
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
                cursor: 'pointer',
                textAlign: 'left',
                gap: 10,
                transition: 'background 0.18s',
              }}
            >
              <span style={{ fontSize: 18, marginRight: 8 }}>{opt.icon}</span>
              <span>
                {opt.label}
                <div style={{ fontWeight: 400, fontSize: 11, color: '#444', marginTop: 2 }}>{opt.desc}</div>
              </span>
            </button>
          ))}
        </div>
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
      </div>
    </div>
  );
}
