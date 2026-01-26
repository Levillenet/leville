import { PlanDay, WizardData } from '@/types/planner';
import { getActivityById } from '@/data/leviActivities';

interface PrintViewProps {
  lang: 'fi' | 'en';
  plan: PlanDay[];
  wizardData: WizardData;
}

const translations = {
  fi: {
    title: 'Levi-lomasuunnitelma',
    day: 'Päivä',
    morning: 'Aamu',
    afternoon: 'Iltapäivä',
    evening: 'Ilta',
    notes: 'Muistiinpanot',
    travelers: 'Matkustajat',
    adults: 'aikuista',
    children: 'lasta',
    days: 'päivää',
    style: 'Lomatyyli',
    styles: {
      active: 'Aktiivinen',
      balanced: 'Tasapainoinen',
      relaxed: 'Rento',
    },
    transport: 'Liikkuminen',
    withCar: 'Autolla',
    withoutCar: 'Ilman autoa',
    requiresCar: '🚗',
    generatedBy: 'Luotu Leville.net-lomasuunnittelijalla',
  },
  en: {
    title: 'Levi Holiday Plan',
    day: 'Day',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    notes: 'Notes',
    travelers: 'Travelers',
    adults: 'adults',
    children: 'children',
    days: 'days',
    style: 'Holiday style',
    styles: {
      active: 'Active',
      balanced: 'Balanced',
      relaxed: 'Relaxed',
    },
    transport: 'Transport',
    withCar: 'With car',
    withoutCar: 'Without car',
    requiresCar: '🚗',
    generatedBy: 'Created with Leville.net Holiday Planner',
  }
};

const slotTypeLabels = {
  fi: { morning: 'Aamu', afternoon: 'Iltapäivä', evening: 'Ilta' },
  en: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' },
};

const PrintView = ({ lang, plan, wizardData }: PrintViewProps) => {
  const t = translations[lang];

  return (
    <div className="print-view bg-white text-black p-8 max-w-4xl mx-auto">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-view, .print-view * { visibility: visible; }
          .print-view { position: absolute; left: 0; top: 0; width: 100%; }
          @page { margin: 1cm; }
        }
      `}</style>

      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
        <div className="flex gap-6 mt-3 text-sm text-gray-600">
          <span>
            <strong>{t.travelers}:</strong> {wizardData.adults} {t.adults}
            {wizardData.children > 0 && `, ${wizardData.children} ${t.children}`}
          </span>
          <span>
            <strong>{wizardData.days} {t.days}</strong>
          </span>
          <span>
            <strong>{t.style}:</strong> {t.styles[wizardData.style]}
          </span>
          <span>
            <strong>{t.transport}:</strong> {wizardData.hasCar ? t.withCar : t.withoutCar}
          </span>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-6">
        {plan.map((day) => (
          <div key={day.dayNumber} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 font-semibold text-lg">
              {t.day} {day.dayNumber}
            </div>
            <div className="p-4 space-y-3">
              {day.slots.map((slot) => {
                const slotLabel = slotTypeLabels[lang][slot.type as keyof typeof slotTypeLabels.fi] || slot.label[lang];
                
                return (
                  <div key={slot.id} className="flex">
                    <div className="w-24 font-medium text-gray-600 text-sm pt-1">
                      {slotLabel}
                    </div>
                    <div className="flex-1">
                      {slot.activities.length > 0 ? (
                        slot.activities.map((activity) => {
                          const leviActivity = activity.activityId ? getActivityById(activity.activityId) : null;
                          const requiresCar = activity.requiresCar || leviActivity?.requiresCar;
                          
                          return (
                            <div key={activity.id} className="mb-1">
                              <span className="font-medium">
                                {activity.title}
                                {requiresCar && ` ${t.requiresCar}`}
                              </span>
                              {activity.note && (
                                <span className="text-gray-500 ml-2">— {activity.note}</span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 italic">—</span>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {day.note && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">{t.notes}: </span>
                    <span className="text-gray-700">{day.note}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
        {t.generatedBy} — leville.net
      </div>
    </div>
  );
};

export default PrintView;
