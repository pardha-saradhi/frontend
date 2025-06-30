// StepBusinessStage.jsx
export default function StepBusinessStage({ onNext, onBack }) {
  const handleSelect = (stage) => {
    onNext({ businessStage: stage });
  };

  return (
    <div>
      <h3>Where are you in your business journey?</h3>
      <button onClick={() => handleSelect('Exploring Ideas')}>💡 Exploring Ideas</button>
      <button onClick={() => handleSelect('Existing Company')}>🏢 Existing Company</button>
      <button onClick={() => handleSelect('Need New Entity')}>📝 Need New Entity</button>
      <button onClick={() => handleSelect('Managing Multiple')}>🌐 Managing Multiple</button>
      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
}
