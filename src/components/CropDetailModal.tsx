import React from 'react';
import { Crop } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Calendar,
  Layers,
  Droplets,
  Sprout,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { INITIAL_DISEASES } from '../data/mockData';

interface CropDetailModalProps {
  crop: Crop | null;
  onClose: () => void;
  onSelectDisease: (diseaseId: string) => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  onClose,
  onSelectDisease,
}) => {
  const { language } = useLanguage();

  if (!crop) return null;

  const diseasesOfCrop = INITIAL_DISEASES.filter(d => d.cropId === crop.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="relative bg-emerald-900 text-white p-6 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-700/80 px-2.5 py-0.5 rounded text-emerald-100 font-semibold uppercase tracking-wider">
                {crop.category.replace('_', ' ')} · {crop.season}
              </span>
              <span className="text-xs text-emerald-300 italic">
                {crop.botanicalName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {crop.name[language] || crop.name.mr}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              {language === 'mr'
                ? `कालावधी: ${crop.durationDays} · जमीन pH: ${crop.phRange}`
                : language === 'hi'
                ? `अवधि: ${crop.durationDays} · मिट्टी pH: ${crop.phRange}`
                : `Crop Duration: ${crop.durationDays} · Soil pH: ${crop.phRange}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-2 rounded-full hover:bg-emerald-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800 text-sm">
          {/* Section 1: Soil and Irrigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'जमिनीची निवड व प्रकार' : language === 'hi' ? 'मिट्टी की आवश्यकता' : 'Soil Requirements'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {crop.soil[language] || crop.soil.mr}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <Droplets className="w-4 h-4 text-blue-700" />
                <span>{language === 'mr' ? 'पाणी व सिंचन नियोजन' : language === 'hi' ? 'सिंचाई प्रबंधन' : 'Irrigation Management'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {crop.irrigation[language] || crop.irrigation.mr}
              </p>
            </div>
          </div>

          {/* Section 2: Fertilizer Schedule */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2 font-bold text-base text-stone-900">
                <Sprout className="w-5 h-5 text-emerald-700" />
                <span>{language === 'mr' ? 'खत व्यवस्थापन वेळापत्रक' : language === 'hi' ? 'उर्वरक प्रबंधन अनुसूची' : 'Fertilizer Management Schedule'}</span>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                NPK: {crop.fertilizers.npkRatio}
              </span>
            </div>

            <div className="space-y-2">
              {crop.fertilizers.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 gap-1 sm:gap-4 text-xs"
                >
                  <span className="font-semibold text-emerald-900">
                    {item.stage[language] || item.stage.mr}
                  </span>
                  <span className="text-stone-700 font-medium sm:text-right">
                    {item.dose[language] || item.dose.mr}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Step-by-Step Cultivation Guide */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-base text-stone-900 border-b border-stone-200 pb-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>{language === 'mr' ? 'लागवड पद्धती व टप्पे' : language === 'hi' ? 'खेती के चरण' : 'Step-by-Step Cultivation Steps'}</span>
            </div>

            <div className="space-y-3">
              {crop.cultivationSteps.map((stepItem, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {stepItem.step[language] || stepItem.step.mr}
                    </h4>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      {stepItem.desc[language] || stepItem.desc.mr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Associated Major Diseases */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2 font-bold text-base text-red-900">
                <ShieldAlert className="w-5 h-5 text-red-700" />
                <span>{language === 'mr' ? 'पिकावरील प्रमुख रोग व कीड' : language === 'hi' ? 'प्रमुख रोग व कीट' : 'Associated Pests & Diseases'}</span>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {diseasesOfCrop.length} {language === 'mr' ? 'नोंदवलेले रोग' : 'recorded'}
              </span>
            </div>

            {diseasesOfCrop.length === 0 ? (
              <p className="text-xs text-stone-500 italic">
                {language === 'mr' ? 'या पिकासाठी अतिरिक्त रोगांची माहिती लवकरच जोडली जाईल.' : 'Additional disease data being updated.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diseasesOfCrop.map(dis => (
                  <div
                    key={dis.id}
                    onClick={() => {
                      onClose();
                      onSelectDisease(dis.id);
                    }}
                    className="p-3 rounded-xl border border-stone-200 hover:border-red-500 hover:bg-red-50/30 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {dis.name[language] || dis.name.mr}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {dis.category} · {dis.severity}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-red-600 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-lg text-xs transition"
          >
            {language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
