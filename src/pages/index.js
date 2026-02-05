import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';

const formatCurrency = (value) => {
  const numberValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat('en-NA', {
    style: 'currency',
    currency: 'NAD',
    minimumFractionDigits: 2,
  }).format(numberValue);
};

const parseAmount = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const calculateTax2025 = (annualIncome) => {
  if (annualIncome <= 100000) {
    return 0;
  }
  if (annualIncome <= 150000) {
    return (annualIncome - 100000) * 0.18;
  }
  if (annualIncome <= 350000) {
    return (annualIncome - 150000) * 0.25 + 9000;
  }
  if (annualIncome <= 550000) {
    return (annualIncome - 350000) * 0.28 + 59000;
  }
  if (annualIncome <= 850000) {
    return (annualIncome - 550000) * 0.3 + 115000;
  }
  if (annualIncome <= 1550000) {
    return (annualIncome - 850000) * 0.32 + 205000;
  }
  return (annualIncome - 1550000) * 0.37 + 429000;
};

const calculateTax2023 = (annualIncome) => {
  if (annualIncome <= 50000) {
    return 0;
  }
  if (annualIncome <= 100000) {
    return (annualIncome - 50000) * 0.18;
  }
  if (annualIncome <= 300000) {
    return (annualIncome - 100000) * 0.25 + 9000;
  }
  if (annualIncome <= 500000) {
    return (annualIncome - 300000) * 0.28 + 59000;
  }
  if (annualIncome <= 800000) {
    return (annualIncome - 500000) * 0.3 + 115000;
  }
  if (annualIncome <= 1500000) {
    return (annualIncome - 800000) * 0.32 + 205000;
  }
  return (annualIncome - 1500000) * 0.37 + 429000;
};

const buildBreakdown = (annualTax) => ({
  annual: formatCurrency(annualTax),
  biannual: formatCurrency(annualTax / 2),
  quarterly: formatCurrency(annualTax / 4),
  monthly: formatCurrency(annualTax / 12),
});

const META_TITLE = 'Namibia Tax Calculator 2025 | PAYE, Salary After Tax, Take Home Pay';
const META_DESCRIPTION =
  'Free Namibia tax calculator to estimate PAYE, salary after tax, and take home pay using Namibia tax brackets. Includes simple explanations and salary examples.';
const CANONICAL_URL = 'https://namfreetaxcalc.vercel.app';

const faqItems = [
  {
    question: 'How is PAYE calculated in Namibia?',
    answer:
      'PAYE is calculated by annualizing your taxable income, applying the Namibia tax brackets, and dividing the result back into monthly withholding. The calculator mirrors the official bands and rates, so the estimate reflects how PAYE is typically derived for employees. This helps you understand your likely deduction each month without manual tax table lookups.',
  },
  {
    question: 'How do I calculate my take home pay in Namibia?',
    answer:
      'Start with your gross monthly salary and subtract the estimated monthly PAYE amount from the calculator. The remainder is your take home pay, before any additional deductions like medical aid or retirement contributions. This is a quick way to estimate net pay from your pay slip using the same logic as the tax bands.',
  },
  {
    question: 'What are the Namibia tax brackets?',
    answer:
      'The Namibia tax brackets are tiered income bands with increasing rates, starting at a 0% threshold and rising as income grows. This calculator uses the 2025/26 rates and thresholds to keep results consistent with current guidance. Reviewing the brackets helps explain why PAYE increases as income rises.',
  },
  {
    question: 'Is this a free Namibia tax calculator?',
    answer:
      'Yes. This is a free Namibia tax calculator designed to give fast estimates without sign-up or fees. It is a net salary calculator Namibia users can rely on for quick planning, with results displayed instantly. For formal filings, always verify figures with official sources.',
  },
  {
    question: 'What is the difference between gross salary and net salary in Namibia?',
    answer:
      'Gross salary is your total pay before deductions, while net salary is what you receive after PAYE and other mandatory withholdings. The calculator shows a gross to net salary Namibia view by subtracting estimated tax from gross income. This helps you see the impact of PAYE on monthly cash flow.',
  },
];

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [carCost, setCarCost] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [annualBonus, setAnnualBonus] = useState('');
  const [includeOtherIncentives, setIncludeOtherIncentives] = useState(false);
  const [otherIncentives, setOtherIncentives] = useState('');
  const [retirementContribution, setRetirementContribution] = useState('');
  const [educationContribution, setEducationContribution] = useState('');
  const [businessProfit, setBusinessProfit] = useState('');
  const [businessTurnover, setBusinessTurnover] = useState('');
  const [corporateYear, setCorporateYear] = useState('2025/26');
  const [isSmeSez, setIsSmeSez] = useState(false);
  const [dividendAmount, setDividendAmount] = useState('');
  const [applyDividendTax, setApplyDividendTax] = useState(false);
  const [interestWithholding, setInterestWithholding] = useState('');
  const [viewMode, setViewMode] = useState('individual');

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.target.type === 'range') {
        event.preventDefault();
      }
    };

    document.body.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleSliderChange = (event) => {
    setAmount(Number(event.target.value));
  };

  const handleReset = () => {
    setAmount(0);
    setCarCost('');
    setHousingAllowance('');
    setAnnualBonus('');
    setIncludeOtherIncentives(false);
    setOtherIncentives('');
    setRetirementContribution('');
    setEducationContribution('');
    setBusinessProfit('');
    setBusinessTurnover('');
    setCorporateYear('2025/26');
    setIsSmeSez(false);
    setDividendAmount('');
    setApplyDividendTax(false);
    setInterestWithholding('');
  };

  const handleSliderWheel = (event) => {
    const currentValue = parseAmount(amount);
    const newValue = currentValue + (event.deltaY > 0 ? -1000 : 1000);

    if (newValue >= 0 && newValue <= 250000) {
      setAmount(newValue);
    }
  };

  const shareUrl = CANONICAL_URL;

  const today = new Date();
  const year = today.getFullYear();

  const monthlySalary = parseAmount(amount);
  const annualBaseSalary = monthlySalary * 12;
  const carCostValue = parseAmount(carCost);
  const housingAllowanceValue = parseAmount(housingAllowance);
  const annualBonusValue = parseAmount(annualBonus);
  const otherIncentivesValue = includeOtherIncentives ? parseAmount(otherIncentives) : 0;
  const retirementContributionValue = parseAmount(retirementContribution);
  const educationContributionValue = parseAmount(educationContribution);
  const totalContributionValue = retirementContributionValue + educationContributionValue;
  const deductibleContributions = Math.min(totalContributionValue, 150000);
  const carBenefitMonthly = carCostValue * 0.015;
  const annualHousingBenefitRaw = housingAllowanceValue * 12;
  const annualHousingBenefit = Math.min(annualHousingBenefitRaw, 400000);
  const annualCarBenefit = carBenefitMonthly * 12;
  const annualGrossIncome =
    annualBaseSalary + annualBonusValue + otherIncentivesValue + annualCarBenefit + annualHousingBenefit;
  const taxableAnnualIncome = Math.max(annualGrossIncome - deductibleContributions, 0);
  const taxableMonthlyIncome = taxableAnnualIncome / 12;

  const newAnnualTax = calculateTax2025(taxableAnnualIncome);
  const oldAnnualTax = calculateTax2023(taxableAnnualIncome);
  const newBreakdown = buildBreakdown(newAnnualTax);
  const oldBreakdown = buildBreakdown(oldAnnualTax);
  const taxSavings = oldAnnualTax - newAnnualTax;

  const sscEmployee = monthlySalary > 0 ? Math.max(monthlySalary * 0.009, 81) : 0;
  const sscEmployer = monthlySalary > 0 ? Math.max(monthlySalary * 0.009, 81) : 0;
  const annualSscEmployee = sscEmployee * 12;
  const netAnnualIncome = annualGrossIncome - newAnnualTax - annualSscEmployee - totalContributionValue;
  const netMonthlyIncome = netAnnualIncome / 12;

  const whatsappMessage = useMemo(() => {
    return [
      'Namibia Tax Calculator 2025/26 Summary',
      `Monthly Salary: ${formatCurrency(monthlySalary)}`,
      `Annual Gross Income: ${formatCurrency(annualGrossIncome)}`,
      `Taxable Annual Income: ${formatCurrency(taxableAnnualIncome)}`,
      `New Annual Tax (2025/26): ${formatCurrency(newAnnualTax)}`,
      `Annual SSC (Employee): ${formatCurrency(annualSscEmployee)}`,
      `Estimated Net Annual Pay: ${formatCurrency(netAnnualIncome)}`,
      `Old Annual Tax (2023): ${formatCurrency(oldAnnualTax)}`,
      `Estimated Savings: ${formatCurrency(taxSavings)}`,
      'Generated by NamFreeTaxCalc',
    ].join('\n');
  }, [
    monthlySalary,
    annualGrossIncome,
    taxableAnnualIncome,
    newAnnualTax,
    annualSscEmployee,
    netAnnualIncome,
    oldAnnualTax,
    taxSavings,
  ]);

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  const corporateProfitValue = parseAmount(businessProfit);
  const corporateTurnoverValue = parseAmount(businessTurnover);
  const corporateBaseRate = corporateYear === '2026/27' ? 0.28 : 0.3;
  const corporateRate = isSmeSez ? 0.2 : corporateBaseRate;
  const corporateTax = corporateProfitValue * corporateRate;
  const vatRequired = corporateTurnoverValue >= 1000000;
  const dividendAmountValue = parseAmount(dividendAmount);
  const dividendTax = applyDividendTax ? dividendAmountValue * 0.1 : 0;
  const interestWithholdingValue = parseAmount(interestWithholding);
  const interestWithholdingTax = interestWithholdingValue * 0.1;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const salaryExamples = [
    { label: 'N$10,000 monthly', monthlyGross: 10000 },
    { label: 'N$20,000 monthly', monthlyGross: 20000 },
    { label: 'N$30,000 monthly', monthlyGross: 30000 },
    { label: 'N$50,000 monthly', monthlyGross: 50000 },
  ].map((example) => {
    const annualIncome = example.monthlyGross * 12;
    const annualTax = calculateTax2025(annualIncome);
    const monthlyTax = annualTax / 12;
    const monthlyTakeHome = example.monthlyGross - monthlyTax;

    return {
      ...example,
      monthlyTax,
      monthlyTakeHome,
    };
  });

  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${CANONICAL_URL}/namtaxcalcimage.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Namibia Tax Calculator',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'NAD',
              },
              description: META_DESCRIPTION,
              url: CANONICAL_URL,
            }),
          }}
        />
      </Head>
      <main className="con dflex shadow1">
        <div className="mxauto mb3 p2 content">
            <div className="dflex p2">
              <Image width={100} height={65} src="/flag.png" alt="Namibian Flag" className="mxauto shadow1" />
            </div>
            <h1 className="txtbold h4 txtfont2 txtcenter">Namibia Tax Calculator</h1>
            <p className="h5 txtfont1 txtcenter">
              Use this free Namibia tax calculator to estimate PAYE, salary after tax, and take home pay. Enter your
              gross salary to see a clear breakdown based on Namibia tax brackets.
            </p>
            <div className="toggle-group">
              <button
                type="button"
                className={`toggle-button ${viewMode === 'individual' ? 'toggle-active' : ''}`}
                onClick={() => setViewMode('individual')}
              >
                Individual
              </button>
              <button
                type="button"
                className={`toggle-button ${viewMode === 'business' ? 'toggle-active' : ''}`}
                onClick={() => setViewMode('business')}
              >
                Business
              </button>
            </div>

            {viewMode === 'individual' ? (
              <>
                <section className="section" aria-labelledby="monthly-salary-heading">
                  <h2 className="section-title txtcenter" id="monthly-salary-heading">
                    Monthly Salary (N$)
                  </h2>
                  <div className="dflex">
                    <input
                      id="monthly-salary-input"
                      type="number"
                      step="500"
                      name="amount"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="border border1 bordercol1 mr1 p2 mxauto txtcenter txtfont2"
                      min="0"
                      aria-label="Monthly salary amount"
                    />
                  </div>
                  <div className="dflex">
                    <input
                      id="monthly-salary-range"
                      type="range"
                      min="0"
                      max="250000"
                      step="50"
                      value={amount}
                      onChange={handleSliderChange}
                      onWheel={handleSliderWheel}
                      className="border border1 bordercol1 mr1 p2 mxauto txtcenter txtfont2"
                      aria-label="Monthly salary slider"
                    />
                  </div>
                </section>

                <section className="section card" aria-labelledby="annual-income-heading">
                  <h2 className="section-title" id="annual-income-heading">
                    Annual Income Details & One-Time Payments
                  </h2>
                  <div className="grid">
                    <label className="field" htmlFor="annual-bonus">
                      Annual Bonus / 13th Cheque (N$)
                      <input
                        id="annual-bonus"
                        type="number"
                        value={annualBonus}
                        onChange={(event) => setAnnualBonus(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                    <label className="field" htmlFor="other-incentives">
                      Other Incentives (Annual N$)
                      <input
                        id="other-incentives"
                        type="number"
                        value={otherIncentives}
                        onChange={(event) => setOtherIncentives(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                        disabled={!includeOtherIncentives}
                      />
                      <span className="helper-text">
                        <input
                          id="other-incentives-toggle"
                          type="checkbox"
                          checked={includeOtherIncentives}
                          onChange={(event) => setIncludeOtherIncentives(event.target.checked)}
                        />
                        <span>Include other incentives</span>
                      </span>
                    </label>
                  </div>
                </section>

                <section className="section card" aria-labelledby="fringe-benefits-heading">
                  <h2 className="section-title" id="fringe-benefits-heading">
                    Fringe Benefit Calculator (Namibian)
                  </h2>
                  <p className="section-subtitle">
                    Company Car (1.5% of cost price) & Housing Allowance (annual cap N$400,000)
                  </p>
                  <div className="grid">
                    <label className="field" htmlFor="company-car-cost">
                      Company Car Cost Price (N$)
                      <input
                        id="company-car-cost"
                        type="number"
                        value={carCost}
                        onChange={(event) => setCarCost(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                    <label className="field" htmlFor="housing-allowance">
                      Housing Allowance (Monthly N$)
                      <input
                        id="housing-allowance"
                        type="number"
                        value={housingAllowance}
                        onChange={(event) => setHousingAllowance(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                  </div>
                  <div className="summary">
                    <p>Company Car Benefit (Monthly): {formatCurrency(carBenefitMonthly)}</p>
                    <p>Housing Allowance (Monthly): {formatCurrency(housingAllowanceValue)}</p>
                    <p>Housing Benefit (Annual, capped): {formatCurrency(annualHousingBenefit)}</p>
                    <p className="txtbold">Taxable Monthly Income (after deductions): {formatCurrency(taxableMonthlyIncome)}</p>
                  </div>
                </section>

                <section className="section card" aria-labelledby="deductions-heading">
                  <h2 className="section-title" id="deductions-heading">
                    Deductions
                  </h2>
                  <details className="accordion">
                    <summary className="accordion-summary">Retirement & Education Contributions</summary>
                    <div className="grid">
                      <label className="field" htmlFor="retirement-contribution">
                        Retirement Fund Contributions (Annual N$)
                        <input
                          id="retirement-contribution"
                          type="number"
                          value={retirementContribution}
                          onChange={(event) => setRetirementContribution(event.target.value)}
                          className="border border1 bordercol1 p2 txtcenter txtfont2"
                          min="0"
                        />
                      </label>
                      <label className="field" htmlFor="education-contribution">
                        Education Policy Contributions (Annual N$)
                        <input
                          id="education-contribution"
                          type="number"
                          value={educationContribution}
                          onChange={(event) => setEducationContribution(event.target.value)}
                          className="border border1 bordercol1 p2 txtcenter txtfont2"
                          min="0"
                        />
                      </label>
                    </div>
                    <div className="summary">
                      <p>Total Contributions: {formatCurrency(totalContributionValue)}</p>
                      <p className="txtbold">
                        Deductible Amount (capped at N$150,000): {formatCurrency(deductibleContributions)}
                      </p>
                    </div>
                  </details>
                </section>

                <div className="result-container txtfont2">
                  <p className="txtcenter">Annual Base Salary: {formatCurrency(annualBaseSalary)}</p>
                  <p className="txtcenter">Annual Gross Income (incl. benefits): {formatCurrency(annualGrossIncome)}</p>
                  <p className="txtcenter">Total Deductions Applied: {formatCurrency(deductibleContributions)}</p>
                  <p className="txtcenter">Taxable Annual Income (after deductions): {formatCurrency(taxableAnnualIncome)}</p>
                  <p className="txtbold txtcenter">Annual Tax Payable (2025/26): {newBreakdown.annual}</p>
                  <p className="txtcenter">Bi-Annual Tax Payable: {newBreakdown.biannual}</p>
                  <p className="txtcenter">Quarterly Tax Payable: {newBreakdown.quarterly}</p>
                  <p className="txtcenter">Monthly Tax Payable: {newBreakdown.monthly}</p>
                  <p className="txtcenter">Annual SSC (Employee): {formatCurrency(annualSscEmployee)}</p>
                  <p className="txtbold txtcenter">Estimated Net Annual Pay: {formatCurrency(netAnnualIncome)}</p>
                  <p className="txtcenter">Estimated Net Monthly Pay: {formatCurrency(netMonthlyIncome)}</p>
                </div>

                <section className="section card" aria-labelledby="comparison-heading">
                  <h2 className="section-title" id="comparison-heading">
                    Side-by-Side Comparison
                  </h2>
                  <div className="comparison">
                    <div>
                      <p className="txtbold">Old Tax (2023)</p>
                      <p>Annual: {oldBreakdown.annual}</p>
                      <p>Monthly: {oldBreakdown.monthly}</p>
                    </div>
                    <div>
                      <p className="txtbold">New Tax (2025/26)</p>
                      <p>Annual: {newBreakdown.annual}</p>
                      <p>Monthly: {newBreakdown.monthly}</p>
                    </div>
                    <div>
                      <p className="txtbold">Estimated Savings</p>
                      <p>Annual: {formatCurrency(taxSavings)}</p>
                      <p>Monthly: {formatCurrency(taxSavings / 12)}</p>
                    </div>
                  </div>
                </section>

                <section className="section card" aria-labelledby="ssc-heading">
                  <h2 className="section-title" id="ssc-heading">
                    Social Security (SSC)
                  </h2>
                  <p>Employee Contribution (0.9%, minimum N$81): {formatCurrency(sscEmployee)}</p>
                  <p>Employer Contribution (0.9%, minimum N$81): {formatCurrency(sscEmployer)}</p>
                </section>

                <section className="section actions" aria-label="Download or share results">
                  <button type="button" className="action-button" onClick={handlePrint}>
                    Download Salary Breakdown (PDF)
                  </button>
                  <a className="action-button secondary" href={whatsappLink} target="_blank" rel="noreferrer">
                    Share to WhatsApp
                  </a>
                </section>

                <div className="dflex pb3">
                  <Image
                    width={35}
                    height={35}
                    src="/rotate-right-solid.png"
                    alt="Reset Button"
                    className="mxauto mt3 fillblue"
                    onClick={handleReset}
                  />
                </div>
              </>
            ) : (
              <>
                <section className="section card" aria-labelledby="corporate-tax-heading">
                  <h2 className="section-title" id="corporate-tax-heading">
                    Corporate Tax & VAT Calculator
                  </h2>
                  <p className="section-subtitle">
                    Non-mining corporate tax rate: 30% (2025/26) with placeholder 28% (2026/27).
                  </p>
                  <div className="grid">
                    <label className="field" htmlFor="corporate-year">
                      Fiscal Year
                      <select
                        id="corporate-year"
                        value={corporateYear}
                        onChange={(event) => setCorporateYear(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                      >
                        <option value="2025/26">2025/26</option>
                        <option value="2026/27">2026/27 (proposed)</option>
                      </select>
                    </label>
                    <label className="field" htmlFor="business-profit">
                      Annual Taxable Profit (N$)
                      <input
                        id="business-profit"
                        type="number"
                        value={businessProfit}
                        onChange={(event) => setBusinessProfit(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                    <label className="field" htmlFor="business-turnover">
                      Annual Turnover (N$)
                      <input
                        id="business-turnover"
                        type="number"
                        value={businessTurnover}
                        onChange={(event) => setBusinessTurnover(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                    <label className="field" htmlFor="sme-sez-toggle">
                      SME or SEZ Status
                      <div className="inline-toggle">
                        <input
                          id="sme-sez-toggle"
                          type="checkbox"
                          checked={isSmeSez}
                          onChange={(event) => setIsSmeSez(event.target.checked)}
                        />
                        <span>Apply SME/SEZ rate (20%)</span>
                      </div>
                    </label>
                  </div>
                  <div className="summary">
                    <p className="txtbold">Applied Corporate Tax Rate: {(corporateRate * 100).toFixed(0)}%</p>
                    <p className="txtbold">Corporate Tax Payable: {formatCurrency(corporateTax)}</p>
                    <p>VAT Registration Threshold: {formatCurrency(1000000)}</p>
                    <p className={vatRequired ? 'status-good' : 'status-muted'}>
                      {vatRequired
                        ? 'VAT registration required based on turnover.'
                        : 'VAT registration not yet required based on turnover.'}
                    </p>
                  </div>
                </section>

                <section className="section card" aria-labelledby="dividend-tax-heading">
                  <h2 className="section-title" id="dividend-tax-heading">
                    Dividend & Withholding Taxes
                  </h2>
                  <div className="grid">
                    <label className="field" htmlFor="dividend-amount">
                      Dividend Payout (N$)
                      <input
                        id="dividend-amount"
                        type="number"
                        value={dividendAmount}
                        onChange={(event) => setDividendAmount(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                    <label className="field" htmlFor="dividend-tax-toggle">
                      Dividend Tax (10% from 1 Jan 2026)
                      <div className="inline-toggle">
                        <input
                          id="dividend-tax-toggle"
                          type="checkbox"
                          checked={applyDividendTax}
                          onChange={(event) => setApplyDividendTax(event.target.checked)}
                        />
                        <span>Apply 10% dividend tax</span>
                      </div>
                    </label>
                    <label className="field" htmlFor="interest-withholding">
                      Interest Paid by Bank (N$)
                      <input
                        id="interest-withholding"
                        type="number"
                        value={interestWithholding}
                        onChange={(event) => setInterestWithholding(event.target.value)}
                        className="border border1 bordercol1 p2 txtcenter txtfont2"
                        min="0"
                      />
                    </label>
                  </div>
                  <div className="summary">
                    <p className="txtbold">Dividend Tax Payable: {formatCurrency(dividendTax)}</p>
                    <p>Withholding Tax on Interest (10%): {formatCurrency(interestWithholdingTax)}</p>
                  </div>
                </section>
              </>
            )}

            <section className="section card" aria-labelledby="quick-answers-heading">
              <h2 className="section-title" id="quick-answers-heading">
                Quick answers
              </h2>
              <ul className="list">
                <li>PAYE calculator Namibia; estimate what you owe</li>
                <li>Salary after tax Namibia; see take home pay</li>
                <li>Gross to net salary breakdown</li>
                <li>Tax brackets used by this calculator</li>
              </ul>
            </section>

            <section className="section card" aria-labelledby="paye-explainer-heading">
              <h2 className="section-title" id="paye-explainer-heading">
                How PAYE is calculated in Namibia
              </h2>
              <p className="section-body">
                A PAYE calculation starts by converting your monthly income into an annual figure so the brackets can
                be applied consistently. This Namibia PAYE calculation then works through each bracket, adding the
                amounts owed in each band until your total taxable income is covered. The estimate reflects taxable
                salary plus benefits like a company car or housing allowance because those items increase taxable pay.
                If you are searching for “how much tax do I pay Namibia”, the calculator gives a fast estimate by
                following the same tiered logic, returning the annual tax, and dividing it into a monthly figure for
                payslips. It is designed for planning and comparisons, not for formal submission, but it helps you see
                the impact of moving into higher bands.
              </p>
              <ul className="list">
                <li>Start with gross salary to determine total taxable income.</li>
                <li>Apply tax brackets and rates used by the calculator to each band.</li>
                <li>The result is estimated tax and take home pay.</li>
              </ul>
              <p className="disclaimer">
                This is an estimate; confirm final amounts with official guidance for your situation.
              </p>
            </section>

            <section className="section card" aria-labelledby="salary-examples-heading">
              <h2 className="section-title" id="salary-examples-heading">
                Salary after tax examples in Namibia
              </h2>
              <p className="section-body">
                These estimates show take home pay Namibia insights alongside salary after tax Namibia comparisons using
                the same calculator logic.
              </p>
              <div className="example-grid">
                {salaryExamples.map((example) => (
                  <div className="card example-card" key={example.label}>
                    <p className="txtbold">{example.label}</p>
                    <p>Gross salary: {formatCurrency(example.monthlyGross)}</p>
                    <p>Estimated PAYE: {formatCurrency(example.monthlyTax)}</p>
                    <p>Estimated take home pay: {formatCurrency(example.monthlyTakeHome)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section card" aria-labelledby="tax-brackets-heading">
              <h2 className="section-title" id="tax-brackets-heading">
                Namibia tax brackets and tax table
              </h2>
              <p className="section-body">
                The calculator applies the latest Namibian tax brackets to estimate your liability and explain how your
                income moves through each band. Reviewing the table below helps you see how Namibian income tax rates
                build progressively as earnings rise. This summary is a practical reference for planning because it
                matches the calculation logic and shows the threshold where the tax rate changes.
              </p>
              <details className="accordion">
                <summary className="accordion-summary">View the Namibia tax table</summary>
                <p className="tax-year-label">Tax year used: 2025</p>
                <table className="tax-table">
                  <caption className="txtbold pb3">Namibia tax table for 2025/26 PAYE bands</caption>
                  <thead>
                    <tr>
                      <th scope="col">Annual taxable income (N$)</th>
                      <th scope="col">Tax rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N$ 0 - 100 000</td>
                      <td>0% (Tax free threshold)</td>
                    </tr>
                    <tr>
                      <td>N$ 100 001 - 150 000</td>
                      <td>18% of amount over N$ 100 000</td>
                    </tr>
                    <tr>
                      <td>N$ 150 001 - 350 000</td>
                      <td>N$ 9 000 + 25% of amount over N$ 150 000</td>
                    </tr>
                    <tr>
                      <td>N$ 350 001 - 550 000</td>
                      <td>N$ 59 000 + 28% of amount over N$ 350 000</td>
                    </tr>
                    <tr>
                      <td>N$ 550 001 - 850 000</td>
                      <td>N$ 115 000 + 30% of amount over N$ 550 000</td>
                    </tr>
                    <tr>
                      <td>N$ 850 001 - 1 550 000</td>
                      <td>N$ 205 000 + 32% of amount over N$ 850 000</td>
                    </tr>
                    <tr>
                      <td>Above N$ 1 550 000</td>
                      <td>N$ 429 000 + 37% of amount over N$ 1 550 000</td>
                    </tr>
                  </tbody>
                </table>
              </details>
              <h3 className="txtbold pb3 mt3">Business Updates</h3>
              <ul className="calendar">
                <li>Corporate tax for non-mining companies: 30% (from 1 Jan 2025)</li>
                <li>VAT registration threshold: N$ 1 000 000 annual turnover</li>
              </ul>
              <h3 className="txtbold pb3 mt3">NamRA Tax Calendar Notifications</h3>
              <ul className="calendar">
                <li>30 June: Individual income tax return deadline.</li>
                <li>Monthly (20th): PAYE remittance to NamRA.</li>
                <li>Bi-monthly (last day): VAT return submission for registered vendors.</li>
              </ul>
              <h3 className="txtbold pb3 mt3">NamRA Integration Links</h3>
              <p>
                File directly on the{' '}
                <a href="https://itas.mof.gov.na" target="_blank" rel="noreferrer">
                  NamRA ITAS portal
                </a>{' '}
                or read the{' '}
                <a href="https://itas.mof.gov.na/Account/Register" target="_blank" rel="noreferrer">
                  ITAS registration guide
                </a>
                .
              </p>
            </section>

            <section className="section card" aria-labelledby="faq-heading">
              <h2 className="section-title" id="faq-heading">
                FAQ
              </h2>
              <div className="faq-list">
                {faqItems.map((item) => (
                  <details className="accordion" key={item.question}>
                    <summary className="accordion-summary">
                      <h3 className="faq-question">{item.question}</h3>
                    </summary>
                    <p className="faq-answer">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
        </div>
      </main>
      <div className="con2">
        <footer className="con footer">
          <div className="dflex">
            <div className=" txtcenter mxauto">
              <p className=" txtbold txtfont2">Share</p>
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <PinterestShareButton url={shareUrl}>
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <RedditShareButton url={shareUrl}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
          <div className="txtcenter txtfont2">
            <p className="footer-disclaimer">
              Based on the 2025 PwC Tax Rate Card. Consult a professional for official filing.{' '}
              <a
                href="https://www.namra.org.na/tax/"
                target="_blank"
                rel="nofollow external noreferrer"
              >
                NamRA official tax resources
              </a>
              .
            </p>
            <p className="last-updated">Last updated: February 2, 2026</p>
            <span className="txtfont1">
              &#169; {year} <a href="https://www.facebook.com/ciestomedia" target="_blank" rel="noreferrer">CiestoMedia</a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
