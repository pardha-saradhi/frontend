import React, { useState, useRef, useEffect } from 'react';
import StepWelcome from './StepWelcome';
import StepBusinessStage from './StepBusinessStage';
import StepGeography from './StepGeography';
import StepServices from './StepServices';
import StepTimeline from './StepTimeline';
import StepPlanRecommendation from './StepPlanRecommendation';
import StepAddOns from './StepAddOns';
import StepContactInfo from './StepContactInfo';
import StepSummary from './StepSummary';
import './ChatBotContainer.css';

const stepComponents = [
  StepWelcome,
  StepBusinessStage,
  StepGeography,
  StepServices,
  StepTimeline,
  StepPlanRecommendation,
  StepAddOns,
  StepContactInfo,
  StepSummary
];

export default function ChatBotContainer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({
    businessStage: '',
    countries: {},
    services: [],
    timeline: '',
    addons: [],
    contact: {}
  });
  const [dataSnapshots, setDataSnapshots] = useState([{
    businessStage: '',
    countries: {},
    services: [],
    timeline: '',
    addons: [],
    contact: {}
  }]);
  const [userMessages, setUserMessages] = useState([]); // {text: string, atStep: number}
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [stepIndex, userMessages]);

  function goNext() {
    setStepIndex(prev => Math.min(prev + 1, stepComponents.length - 1));
  }

  function goBack() {
    setStepIndex(prev => Math.max(prev - 1, 0));
  }

  function collectData(newData) {
    setData(prev => {
      const updated = { ...prev, ...newData };
      setDataSnapshots(snaps => {
        // Always update the snapshot for the current step
        const newSnaps = snaps.slice(0, stepIndex + 1);
        newSnaps[stepIndex + 1] = { ...updated };
        return newSnaps;
      });
      return updated;
    });
    goNext();
  }

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setUserMessages([...userMessages, { text: input, atStep: stepIndex }]);
    setInput('');
  }

  // Helper to render static summary for each step
  function renderStepSummary(stepIdx, stepData) {
    const StepComponent = stepComponents[stepIdx];
    if (StepComponent === StepWelcome) return <div className="chat-bubble bot">👋 Welcome to House of Companies!</div>;
    if (StepComponent === StepBusinessStage) return <div className="chat-bubble bot">Business Stage: <b>{stepData.businessStage || 'Not selected'}</b></div>;
    if (StepComponent === StepGeography) return <div className="chat-bubble bot">Country: <b>{stepData.countries?.base || 'Not selected'}</b><br/>Expansion: <b>{stepData.countries?.expansion?.length ? stepData.countries.expansion.join(', ') : 'None'}</b></div>;
    if (StepComponent === StepServices) return <div className="chat-bubble bot">Services: <b>{stepData.services?.length ? stepData.services.join(', ') : 'None'}</b></div>;
    if (StepComponent === StepTimeline) return <div className="chat-bubble bot">Timeline: <b>{stepData.timeline || 'Not selected'}</b></div>;
    if (StepComponent === StepPlanRecommendation) return <div className="chat-bubble bot">Recommended Plan: <b>eBranch</b> for <b>{stepData.countries?.base || 'your country'}</b></div>;
    if (StepComponent === StepAddOns) return <div className="chat-bubble bot">Add-ons: <b>{stepData.addons?.length ? stepData.addons.join(', ') : 'None'}</b></div>;
    if (StepComponent === StepContactInfo) return <div className="chat-bubble bot">Contact: <b>{stepData.contact?.name || ''} {stepData.contact?.email || ''} {stepData.contact?.phone || ''}</b></div>;
    if (StepComponent === StepSummary) return <div className="chat-bubble bot">Summary shown above.</div>;
    return null;
  }

  // Build chat bubbles: steps + user messages in order
  let chatBubbles = [];
  for (let i = 0; i <= stepIndex; i++) {
    // For the current step, use the latest data; for previous, use the snapshot
    const stepData = (i === stepIndex) ? data : (dataSnapshots[i + 1] || {});
    chatBubbles.push(renderStepSummary(i, stepData));
    userMessages.filter(m => m.atStep === i).forEach((m, idx) => {
      chatBubbles.push(<div key={`user-msg-${i}-${idx}`} className="chat-bubble user">{m.text}</div>);
    });
  }

  // Only the current step is interactive
  const StepComponent = stepComponents[stepIndex];
  let stepProps = {};
  if (StepComponent === StepWelcome) stepProps.onNext = () => goNext();
  if (StepComponent === StepBusinessStage) stepProps.onNext = collectData;
  if (StepComponent === StepGeography) {
    stepProps.onNext = collectData;
    stepProps.onBack = goBack;
  }
  if (StepComponent === StepServices) {
    stepProps.onNext = collectData;
    stepProps.onBack = goBack;
  }
  if (StepComponent === StepTimeline) {
    stepProps.onNext = collectData;
    stepProps.onBack = goBack;
  }
  if (StepComponent === StepPlanRecommendation) {
    stepProps.data = data;
    stepProps.onNext = collectData;
    stepProps.onBack = goBack;
  }
  if (StepComponent === StepAddOns) {
    stepProps.data = data;
    stepProps.onNext = collectData;
    stepProps.onBack = goBack;
  }
  if (StepComponent === StepContactInfo) {
    stepProps.data = data.contact || {};
    stepProps.onChange = (contactData) => setData(prev => ({ ...prev, contact: contactData }));
    stepProps.onNext = collectData;
    stepProps.onBack = goBack;
  }
  if (StepComponent === StepSummary) {
    stepProps.data = data;
    stepProps.onBack = goBack;
  }

  // Replace the last bot bubble with the interactive step
  chatBubbles[chatBubbles.length - 1] = (
    <div className="chat-bubble bot" key={`step-active-${stepIndex}`}>
      <StepComponent {...stepProps} />
    </div>
  );

  return (
    <div className="chat-window" style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <div className="chat-body" style={{ flex: 1, overflowY: 'auto' }}>
        {chatBubbles}
        <div ref={chatEndRef} />
      </div>
      {/* Chat input always at the bottom */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: 4, padding: '1rem', borderTop: '1px solid #eee', background: '#fff' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, borderRadius: 6, border: '1px solid #ccc', padding: 6 }}
        />
        <button type="submit" style={{ borderRadius: 6, padding: '6px 12px', background: '#007bff', color: '#fff', border: 'none' }}>Send</button>
      </form>
    </div>
  );
}
