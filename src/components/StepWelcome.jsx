export default function StepWelcome({ onNext }) {
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
        <h2 style={{ fontSize: 17, fontWeight: 800, margin: 0, marginBottom: 8 }}>
          <span role="img" aria-label="wave">👋</span> Welcome to House of Companies!
        </h2>
        <p style={{ fontSize: 13, margin: '0 0 18px 0', color: '#222' }}>
          I can help you expand globally — no accountant needed.
        </p>
        <button
          onClick={onNext}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(37,99,235,0.08)',
            transition: 'background 0.2s',
            marginTop: 6
          }}
        >
          Start Quick Questions
        </button>
      </div>
    </div>
  );
}
