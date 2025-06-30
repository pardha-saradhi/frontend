import pricing from './pricingData';

const servicePricing = {
  'Virtual Office': 500,
  'Local Entity Setup': 1000,
  'VAT ID Application': 300,
  'VAT Filing': 350,
  'Annual Financial Reports': 600,
  'Other': 200
};

const addonPricing = {
  'AI Dashboard': 250,
  'Translation Services': 150,
  'Priority Support': 180
};

const timelineFees = {
  URGENT: 500,
  STANDARD: 250,
  'PLANNING PHASE': 0,
  'FUTURE PLANNING': 0
};

export default function calculatePrice({ country = 'Netherlands', services = [], addons = [], timeline = '' }) {
  const baseData = pricing[country] || { base: 0, notary: 0, government: 0 };

  const serviceCost = services.reduce((total, name) => total + (servicePricing[name] || 0), 0);
  const addonCost = addons.reduce((total, name) => total + (addonPricing[name] || 0), 0);
  const rushFee = timelineFees[timeline] || 0;

  const total = baseData.base + baseData.notary + baseData.government + serviceCost + addonCost + rushFee;

  return {
    country,
    base: baseData.base,
    notary: baseData.notary,
    government: baseData.government,
    serviceCost,
    addonCost,
    rushFee,
    total
  };
}
