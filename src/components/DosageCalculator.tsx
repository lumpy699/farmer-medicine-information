import React, { useState } from 'react';
import { Medicine } from '../types';
import { INITIAL_MEDICINES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  Layers,
  Droplets,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface DosageCalculatorProps {
  preselectedMedicine?: Medicine | null;
}

export const DosageCalculator: React.FC<DosageCalculatorProps> = ({
  preselectedMedicine = null,
}) => {
  const { language, t } = useLanguage();

  const [selectedMedId, setSelectedMedId] = useState<string>(
    preselectedMedicine ? preselectedMedicine.id : INITIAL_MEDICINES[0].id
  );
  const [waterVolume, setWaterVolume] = useState<number>(15); // default 15 Litres (standard pump)
  const [includeSpreader, setIncludeSpreader] = useState<boolean>(true);

  // Parse baseline dose per 15L from selected medicine
  const currentMed = INITIAL_MEDICINES.find(m => m.id === selectedMedId) || INITIAL_MEDICINES[0];

  // Extract numerical value from "6 ml" or "30 gm"
  const extractDoseNumber = (str: string): { val: number; unit: string } => {
    const match = str.match(/(\d+(\.\d+)?)/);
    const val = match ? parseFloat(match[0]) : 5;
    const isGram = str.toLowerCase().includes('gm') || str.toLowerCase().includes('g') || str.toLowerCase().includes('ग्रॅम');
    return { val, unit: isGram ? (language === 'mr' ? 'ग्रॅम (gm)' : 'grams (g)') : (language === 'mr' ? 'मिली (ml)' : 'ml') };
  };

  const parsed15LDose = extractDoseNumber(currentMed.dosePerPump15L);

  // Exact math: dose per litre = baseDose / 15
  const dosePerLitre = parsed15LDose.val / 15;
  const totalMedicineNeeded = Math.round(dosePerLitre * waterVolume * 10) / 10;
  const spreaderNeeded = includeSpreader ? Math.round(waterVolume * 1) : 0; // 1 ml per litre
  const pumpsCount = Math.round((waterVolume / 15) * 10) / 10;

  const presets = [
    { label: t('pump15L'), volume: 15 },
    { label: t('pump16L'), volume: 16 },
    { label: t('pump200L'), volume: 200 },
    { label: t('pump500L'), volume: 500 },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-700" />
          <span>{t('calcTitle')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          {t('calcSubtitle')}
        </p>

        {/* Form Inputs Grid */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Selection (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* 1. Medicine selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                १. {language === 'mr' ? 'फवारणीचे औषध निवडा:' : 'Select Medicine:'}
              </label>
              <select
                value={selectedMedId}
                onChange={e => setSelectedMedId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              >
                {INITIAL_MEDICINES.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.commercialName[language] || m.commercialName.mr} ({m.technicalName})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-stone-500 mt-1">
                प्रमाणित आधार: १५ लिटरसाठी {currentMed.dosePerPump15L}
              </p>
            </div>

            {/* 2. Water Tank Presets */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                २. {t('quickTankPresets')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map(p => (
                  <button
                    key={p.volume}
                    type="button"
                    onClick={() => setWaterVolume(p.volume)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition ${
                      waterVolume === p.volume
                        ? 'border-emerald-700 bg-emerald-800 text-white shadow-xs'
                        : 'border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Water Volume Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                <span>{t('waterQuantity')}</span>
                <span className="text-emerald-800 text-base font-extrabold bg-emerald-50 px-3 py-0.5 rounded border border-emerald-200">
                  {waterVolume} {language === 'mr' ? 'लिटर' : 'Litres'}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="600"
                step="5"
                value={waterVolume}
                onChange={e => setWaterVolume(parseInt(e.target.value) || 15)}
                className="w-full accent-emerald-700 cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-medium">
                <span>५ लि.</span>
                <span>१०० लि.</span>
                <span>२०० लि. (१ एकर)</span>
                <span>६०० लि.</span>
              </div>
            </div>

            {/* 4. Silicon Spreader Checkbox */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="spreader"
                  checked={includeSpreader}
                  onChange={e => setIncludeSpreader(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-500 accent-emerald-700"
                />
                <label htmlFor="spreader" className="text-xs font-semibold text-stone-800 cursor-pointer">
                  {language === 'mr' ? 'सिलिकॉन स्प्रेडर/स्टिकर जोडणे (१ मिली/लि.)' : 'Add Silicon Spreader/Sticker (1 ml/L)'}
                </label>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold">शिफारस</span>
            </div>
          </div>

          {/* Right: Calculated Dosage Output Display (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                    गणना निकाल (Exact Calculation)
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {currentMed.commercialName[language] || currentMed.commercialName.mr}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono">
                    {currentMed.technicalName}
                  </span>
                </div>
              </div>

              {/* Huge Highlight Box for Medicine Requirement */}
              <div className="bg-emerald-800/60 border border-emerald-500/40 rounded-xl p-5 text-center space-y-1 backdrop-blur-xs">
                <span className="text-xs text-emerald-200 font-medium">
                  {t('calculatedRequirement')}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                  {totalMedicineNeeded} {parsed15LDose.unit}
                </div>
                <span className="text-xs text-emerald-300 font-semibold block pt-1">
                  ({waterVolume} लिटर पाण्यासाठी अचूक प्रमाण)
                </span>
              </div>

              {/* Sub items breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-emerald-300 block text-[11px]">पाण्याची क्षमता:</span>
                  <strong className="text-white text-sm font-bold">{waterVolume} लिटर</strong>
                  <span className="text-[10px] text-emerald-200 block mt-0.5">
                    (~{pumpsCount} १५ लि. पंप फेऱ्या)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-emerald-300 block text-[11px]">स्प्रेडर/स्टिकर प्रमाण:</span>
                  <strong className="text-white text-sm font-bold">
                    {includeSpreader ? `${spreaderNeeded} मिली` : 'नाही'}
                  </strong>
                  <span className="text-[10px] text-emerald-200 block mt-0.5">
                    (औषध वाहून जाण्यापासून संरक्षण)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-emerald-300 block text-[11px]">प्रतिक्षा कालावधी (PHI):</span>
                  <strong className="text-amber-300 text-sm font-bold">
                    {currentMed.waitingPeriodDays} दिवस
                  </strong>
                  <span className="text-[10px] text-emerald-200 block mt-0.5">
                    (काढणीपूर्वी आवश्यक अंतर)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white/10 border border-white/10">
                  <span className="text-emerald-300 block text-[11px]">अंदाजे पॅक किंमत:</span>
                  <strong className="text-white text-sm font-bold">
                    {currentMed.approxCostPerPack || '₹200 - ₹350'}
                  </strong>
                  <span className="text-[10px] text-emerald-200 block mt-0.5">
                    (बाजारभावानुसार बदलू शकते)
                  </span>
                </div>
              </div>
            </div>

            {/* Safety & Mixing Advice */}
            <div className="p-3.5 bg-black/30 rounded-xl border border-white/10 text-xs text-emerald-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{language === 'mr' ? 'द्रावण तयार करण्याची योग्य पद्धत:' : 'Proper Mixing Technique:'}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-200">
                औषध थेट मोठ्या टाकीत ओतू नका. प्रथम ५ लिटर पाण्याच्या बादलीत औषध काठीने चांगले विरघळवून द्रावण (Slurry) तयार करा, नंतर उर्वरित पाण्यात ओतून ढवळावे.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Checklist for Spraying */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
        <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{t('safetyPrecautions')}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>फवारणी करताना डोळ्यांवर गॉगल, तोंडावर मास्क आणि हातात रबरी हातमोजे वापरा.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>फवारणी वाऱ्याच्या दिशेने करा; वाऱ्याच्या उलट दिशेने कधीही फवारा मारू नका.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>फवारणीनंतर साबणाने हात-पाय स्वच्छ धुवा आणि वापरलेले कपडे धुवून टाका.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
