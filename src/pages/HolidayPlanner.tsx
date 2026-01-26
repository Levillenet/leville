import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WizardData, PlanDay } from '@/types/planner';
import { generatePlan } from '@/lib/planGenerator';
import PlannerWizard from '@/components/planner/PlannerWizard';
import PlannerView from '@/components/planner/PlannerView';

interface HolidayPlannerProps {
  lang?: 'fi' | 'en';
}

const translations = {
  fi: {
    meta: {
      title: 'Levi Lomasuunnittelija – Suunnittele täydellinen Lapin-lomasi | Leville.net',
      description: 'Suunnittele oma Levi-lomasi interaktiivisella työkalulla. Valitse aktiviteetit, luo ohjelma ja muokkaa sitä vapaasti.',
      canonical: 'https://leville.net/lomasuunnittelija',
    },
  },
  en: {
    meta: {
      title: 'Levi Holiday Planner – Plan Your Perfect Lapland Trip | Leville.net',
      description: 'Plan your Levi holiday with our interactive tool. Choose activities, create a program, and customize it freely.',
      canonical: 'https://leville.net/en/holiday-planner',
    },
  }
};

const HolidayPlanner = ({ lang = 'fi' }: HolidayPlannerProps) => {
  const t = translations[lang];
  const [step, setStep] = useState<'wizard' | 'planner'>('wizard');
  const [wizardData, setWizardData] = useState<WizardData | null>(null);
  const [plan, setPlan] = useState<PlanDay[]>([]);

  const handleWizardComplete = (data: WizardData) => {
    setWizardData(data);
    const generatedPlan = generatePlan(data, lang);
    setPlan(generatedPlan);
    setStep('planner');
  };

  const handleReset = () => {
    setStep('wizard');
    setWizardData(null);
    setPlan([]);
  };

  return (
    <>
      <Helmet>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={t.meta.canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:url" content={t.meta.canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16 px-4">
          {step === 'wizard' ? (
            <PlannerWizard lang={lang} onComplete={handleWizardComplete} />
          ) : wizardData ? (
            <PlannerView
              lang={lang}
              wizardData={wizardData}
              initialPlan={plan}
              onReset={handleReset}
            />
          ) : null}
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
};

export default HolidayPlanner;
