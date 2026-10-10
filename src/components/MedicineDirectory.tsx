import React, { useState } from 'react';
import { Medicine } from '../types';
import { INITIAL_MEDICINES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  Droplets,
  Search,
  Filter,
  ShieldAlert,
  Calculator,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

interface MedicineDirectoryProps {
  onSelectMedicineForCalc: (med: Medicine) => void;
}

export const MedicineDirectory: React.FC<MedicineDirectoryProps> = ({
  onSelectMedicineForCalc,
}) => {
  const { language, t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedToxicity, setSelectedToxicity] = useState<string>('ALL');

  const types = [
    { id: 'ALL', label: language === 'mr' ? 'सर्व औषधे' : 'All Medicines' },
    { id: 'CHEMICAL_INSECTICIDE', label: language === 'mr' ? 'रासायनिक कीटकनाशक' : 'Chemical Insecticide' },
    { id: 'CHEMICAL_FUNGICIDE', label: language === 'mr' ? 'रासायनिक बुरशीनाशक' : 'Chemical Fungicide' },
    { id: 'BIO_PESTICIDE', label: language === 'mr' ? 'जैविक कीटकनाशक' : 'Bio-Pesticide' },
    { id: 'BIO_FUNGICIDE', label: language === 'mr' ? 'जैविक बुरशीनाशक' : 'Bio-Fungicide' },
  ];

  const toxicityOptions = [
    { id: 'ALL', label: language === 'mr' ? 'सर्व वर्ग' : 'All Labels' },
    { id: 'GREEN', label: language === 'mr' ? '🟢 हिरवा त्रिकोण (सुरक्षित)' : '🟢 Green (Safe)' },
    { id: 'BLUE', label: language === 'mr' ? '🔵 निळा त्रिकोण (मध्यम)' : '🔵 Blue (Moderate)' },
    { id: 'YELLOW', label: language === 'mr' ? '🟡 पिवळा त्रिकोण (अत्यंत विषारी)' : '🟡 Yellow (High)' },
  ];

  const filteredMedicines = INITIAL_MEDICINES.filter(med => {
    const matchesType = selectedType === 'ALL' || med.type === selectedType;
    const matchesTox = selectedToxicity === 'ALL' || med.toxicityColor === selectedToxicity;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      med.commercialName.mr.toLowerCase().includes(searchLower) ||
      med.commercialName.hi.toLowerCase().includes(searchLower) ||
      med.commercialName.en.toLowerCase().includes(searchLower) ||
      med.technicalName.toLowerCase().includes(searchLower);
    return matchesType && matchesTox && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
              <Droplets className="w-6 h-6 text-emerald-700" />
              <span>{t('medicines')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'केंद्रीय कीटकनाशक मंडळ (CIBRC) द्वारे मान्यताप्राप्त प्रमाणित कीटकनाशके, बुरशीनाशके आणि जैविक उपाय.'
                : 'CIBRC verified agricultural pesticides, fungicides, and biological formulations with label dosages.'}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? 'औषध किंवा टेक्निकल नाव शोधा...' : 'Search medicine or technical...'}
              className="w-full pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-xs sm:text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-stone-50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1 text-xs font-bold text-stone-600 mr-2">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'प्रकार:' : 'Type:'}</span>
          </div>
          {types.map(tOption => (
            <button
              key={tOption.id}
              onClick={() => setSelectedType(tOption.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                selectedType === tOption.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tOption.label}
            </button>
          ))}
        </div>

        {/* Toxicity Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-bold text-stone-600 mr-2">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('toxicityLevel')}</span>
          </div>
          {toxicityOptions.map(tox => (
            <button
              key={tox.id}
              onClick={() => setSelectedToxicity(tox.id)}
              className={`px-2.5 py-1 rounded text-xs transition ${
                selectedToxicity === tox.id
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tox.label}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map(med => (
          <div
            key={med.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-lg hover:border-emerald-600 transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-tight">
                    {med.commercialName[language] || med.commercialName.mr}
                  </h3>
                  <p className="text-xs text-emerald-800 font-mono font-semibold mt-0.5">
                    {med.technicalName}
                  </p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold border uppercase shrink-0 ${
                    med.toxicityColor === 'GREEN'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : med.toxicityColor === 'BLUE'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : med.toxicityColor === 'YELLOW'
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-red-50 text-red-900 border-red-300'
                  }`}
                >
                  {med.toxicityLabel[language] || med.toxicityLabel.mr}
                </span>
              </div>

              {/* Verified Dosage Box */}
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs space-y-1.5 text-stone-800">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-stone-600">{t('dosePerPump')}</span>
                  <span className="font-extrabold text-emerald-900 text-sm">{med.dosePerPump15L}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-stone-500">{t('dosePerAcre')}</span>
                  <span className="font-bold text-stone-700">{med.dosePerAcre200L}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-emerald-100">
                  <span className="text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{t('waitingPeriod')}</span>
                  </span>
                  <span className="font-bold text-red-700">{med.waitingPeriodDays} {t('days')}</span>
                </div>
              </div>

              {/* Application Details */}
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {med.applicationMethod[language] || med.applicationMethod.mr}
              </p>

              {/* Approved Crops Tags */}
              <div className="text-[11px] text-stone-500">
                <strong className="text-stone-700">शिफारस पिके:</strong>{' '}
                {med.approvedCrops.join(', ')}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-stone-700">
                {med.approxCostPerPack}
              </span>
              <button
                onClick={() => onSelectMedicineForCalc(med)}
                className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'डोस काढा' : 'Calculate'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-stone-200 text-stone-500 text-sm">
          {language === 'mr' ? 'कोणतेही औषध सापडले नाही.' : 'No medicines found.'}
        </div>
      )}
    </div>
  );
};
