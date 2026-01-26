import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WizardData, WizardStep, WIZARD_STEPS } from '@/types/planner';
import WizardStepGroup from './WizardStepGroup';
import WizardStepDuration from './WizardStepDuration';
import WizardStepStyle from './WizardStepStyle';
import WizardStepActivities from './WizardStepActivities';
import WizardStepTransport from './WizardStepTransport';

interface PlannerWizardProps {
  lang: 'fi' | 'en';
  onComplete: (data: WizardData) => void;
}

const translations = {
  fi: {
    title: 'Suunnittele Levi-lomasi',
    subtitle: 'Vastaa muutamaan kysymykseen, niin luomme sinulle räätälöidyn lomaohjelman.',
    step: 'Askel',
    of: '/',
    back: 'Takaisin',
    next: 'Seuraava',
    createPlan: 'Luo lomaohjelma',
  },
  en: {
    title: 'Plan Your Levi Holiday',
    subtitle: 'Answer a few questions and we\'ll create a personalized holiday program for you.',
    step: 'Step',
    of: '/',
    back: 'Back',
    next: 'Next',
    createPlan: 'Create Program',
  }
};

const PlannerWizard = ({ lang, onComplete }: PlannerWizardProps) => {
  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    adults: 2,
    children: 0,
    childAges: [],
    days: 4,
    style: 'balanced',
    mustHave: [],
    hasCar: true,
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (partial: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...partial }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    } else {
      onComplete(wizardData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case WIZARD_STEPS.GROUP:
        return wizardData.adults >= 1;
      case WIZARD_STEPS.DURATION:
        return wizardData.days >= 1;
      case WIZARD_STEPS.STYLE:
        return !!wizardData.style;
      case WIZARD_STEPS.ACTIVITIES:
        return true; // Optional step
      case WIZARD_STEPS.TRANSPORT:
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case WIZARD_STEPS.GROUP:
        return <WizardStepGroup lang={lang} data={wizardData} onChange={updateData} />;
      case WIZARD_STEPS.DURATION:
        return <WizardStepDuration lang={lang} data={wizardData} onChange={updateData} />;
      case WIZARD_STEPS.STYLE:
        return <WizardStepStyle lang={lang} data={wizardData} onChange={updateData} />;
      case WIZARD_STEPS.ACTIVITIES:
        return <WizardStepActivities lang={lang} data={wizardData} onChange={updateData} />;
      case WIZARD_STEPS.TRANSPORT:
        return <WizardStepTransport lang={lang} data={wizardData} onChange={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t.subtitle}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{t.step} {currentStep} {t.of} {totalSteps}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.back}
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentStep === totalSteps ? t.createPlan : t.next}
          {currentStep < totalSteps && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default PlannerWizard;
