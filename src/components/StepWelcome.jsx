export default function StepWelcome({ onNext }) {
  return (
    <div>
      <h2>👋 Welcome to House of Companies!</h2>
      <p>I can help you expand globally — no accountant needed.</p>
      <button onClick={onNext}>Start Quick Questions</button>
    </div>
  );
}
