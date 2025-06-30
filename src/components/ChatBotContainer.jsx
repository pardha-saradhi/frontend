import React, { useState } from 'react';
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

export default function ChatBotContainer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({
    businessStage: '',
    countries: [],
    services: [],
    timeline: '',
    addons: [],
    contact: {}
  });

  const steps = [
    {
      type: 'bot',
      component: <StepWelcome onNext={() => goNext()} />
    },
    {
      type: 'bot',
      component: <StepBusinessStage onNext={collectData} />
    },
    {
      type: 'bot',
      component: <StepGeography onNext={collectData} onBack={goBack} />
    },
    {
      type: 'bot',
      component: <StepServices onNext={collectData} onBack={goBack} />
    },
    {
      type: 'bot',
      component: <StepTimeline onNext={collectData} onBack={goBack} />
    },
    {
      type: 'bot',
      component: <StepPlanRecommendation data={data} onNext={collectData} onBack={goBack} />
    },
    {
      type: 'bot',
      component: <StepAddOns data={data} onNext={collectData} onBack={goBack} />
    },
    {
      type: 'bot',
      component: <StepContactInfo onNext={collectData} onBack={goBack} />
    },
    {
      type: 'bot',
      component: <StepSummary data={data} onBack={goBack} />
    }
  ];

  function goNext() {
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  }

  function goBack() {
    setStepIndex(prev => Math.max(prev - 1, 0));
  }

  function collectData(newData) {
    setData(prev => ({ ...prev, ...newData }));
    goNext();
  }

  return (
    <div className="chat-window">
      <div className="chat-body">
        {steps.slice(0, stepIndex + 1).map((step, i) => (
          <div key={i} className={`chat-bubble ${step.type}`}>
            {step.component}
          </div>
        ))}
      </div>
    </div>
  );
}
