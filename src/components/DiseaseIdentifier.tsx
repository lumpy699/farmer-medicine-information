import React, { useState, useEffect } from 'react';
import { Disease, Medicine } from '../types';
import { INITIAL_CROPS, INITIAL_DISEASES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { runDiseaseDiagnosis, DiagnosisResult } from '../services/aiDiagnosisService';
import {
  ShieldAlert,
  Search,
  Upload,
  CheckCircle,
  AlertCircle,
  Droplets,
  Sprout,
  Info,
  Clock,
  Sparkles,
  Calculator,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';

interface DiseaseIdentifierProps {
  initialSearchQuery?: string;
  initialDiseaseId?: string;
  onSelectMedicineForCalc: (med: Medicine) => void;
}

export const DiseaseIdentifier: React.FC<DiseaseIdentifierProps> = ({
  initialSearchQuery = '',
  initialDiseaseId = '',
  onSelectMedicineForCalc,
}) => {
  const { language, t } = useLanguage();
  const { addSearchHistory } = useAuth();

  const [selectedCropId, setSelectedCropId] = useState<string>('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customDescription, setCustomDescription] = useState<string>('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([]);
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(initialDiseaseId || null);

  // Quick symptom library for easy touch selection on mobile
  const symptomOptions = [
    { id: 'sym-1', label: { mr: 'पानांवर जांभळे / काळे डाग (करपा)', hi: 'पत्तियों पर जामुनी/काले धब्बे', en: 'Purple or dark concentric spots on leaves' } },
    { id: 'sym-2', label: { mr: 'कापसाची फुले गुलाबासारखी बंद राहणे (रोझेट)', hi: 'गुलाब की कली जैसे बंद फूल', en: 'Rosetted cotton flowers / Pink caterpillar in bolls' } },
    { id: 'sym-3', label: { mr: 'पाने पिवळी पडून वाकडी होणे (रसशोषक किडी)', hi: 'पत्तियां पीली होकर मुड़ना', en: 'Curling and yellowing leaves / Aphids / Thrips' } },
    { id: 'sym-4', label: { mr: 'पाने चमकदार पिवळी पडणे (पिवळा मोझॅक)', hi: 'पत्तियों का पीला पड़ना (मोजेक)', en: 'Bright yellow mosaic discoloration' } },
    { id: 'sym-5', label: { mr: 'फळांवर व फांद्यांवर खपलीसारखे खडबडीत डाग', hi: 'फलों पर खुरदरे धब्बे', en: 'Corky raised lesions on fruit and stems (Canker)' } },
    { id: 'sym-6', label: { mr: 'पाती किंवा शेंडा पिळवटून कोलमडणे (ट्विस्टर)', hi: 'पत्तियों का मुड़ना और सूखना', en: 'Twisted, distorted neck and leaves' } },
  ];

  // Pre-set sample field images for instant testing
  const samplePhotos = [
    {
      label: language === 'mr' ? 'कापूस बोंडअळी नमुना' : 'Cotton Bollworm sample',
      url: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=600&q=80',
      cropId: 'crop-cotton',
      desc: 'पाते व बोंडावर बारीक छिद्र व अळी',
    },
    {
      label: language === 'mr' ? 'कांदा जांभळा करपा नमुना' : 'Onion Blotch sample',
      url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      cropId: 'crop-onion',
      desc: 'पातीवर जांभळट लांबट डाग',
    },
    {
      label: language === 'mr' ? 'टोमॅटो करपा नमुना' : 'Tomato Blight sample',
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      cropId: 'crop-tomato',
      desc: 'खालच्या पानांवर गोल रिंग डाग',
    },
  ];

  useEffect(() => {
    if (initialDiseaseId) {
      setExpandedDiseaseId(initialDiseaseId);
      const dis = INITIAL_DISEASES.find(d => d.id === initialDiseaseId);
      if (dis) {
        setSelectedCropId(dis.cropId);
      }
    }
  }, [initialDiseaseId]);

  useEffect(() => {
    if (initialSearchQuery) {
      setCustomDescription(initialSearchQuery);
      handleAnalyze(initialSearchQuery);
    } else {
      // Default initial load
      handleAnalyze('');
    }
  }, [initialSearchQuery]);

  const toggleSymptom = (symText: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symText) ? prev.filter(s => s !== symText) : [...prev, symText]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImagePreview(reader.result as string);
        setCustomDescription(prev => prev || (language === 'mr' ? 'अपलोड केलेल्या फोटोचे लक्षण विश्लेषण' : 'Uploaded photo visual analysis'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (overrideDesc?: string) => {
    setIsAnalyzing(true);
    const desc = overrideDesc !== undefined ? overrideDesc : customDescription;

    const results = await runDiseaseDiagnosis({
      cropId: selectedCropId === 'all' ? undefined : selectedCropId,
      selectedSymptoms,
      imageDescription: desc,
      imageDataUrl: uploadedImagePreview || undefined,
    });

    setDiagnosisResults(results);
    setIsAnalyzing(false);

    if (results.length > 0) {
      setExpandedDiseaseId(results[0].matchedDisease.id);
      addSearchHistory(
        desc || (selectedCropId !== 'all' ? selectedCropId : 'रोग निदान'),
        results[0].matchedDisease.cropName[language] || results[0].matchedDisease.cropName.mr,
        results[0].matchedDisease.name[language] || results[0].matchedDisease.name.mr
      );
    }
  };

  const getToxicityBadgeClass = (category: string) => {
    switch (category) {
      case 'GREEN':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'BLUE':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'YELLOW':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'RED':
        return 'bg-red-100 text-red-900 border-red-300 font-bold';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-700" />
            <span>{t('diseaseIdentifierTitle')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {t('diseaseIdentifierSubtitle')}
          </p>
        </div>

        {/* Diagnosis Input Workspace */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Crop & Symptoms (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                १. {t('selectCropLabel')}
              </label>
              <select
                value={selectedCropId}
                onChange={e => setSelectedCropId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              >
                <option value="all">🌾 {t('allCrops')} (सर्व पिके)</option>
                {INITIAL_CROPS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name[language] || c.name.mr} ({c.botanicalName})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Symptom Multi-check selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
                २. {t('chooseSymptoms')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {symptomOptions.map(sym => {
                  const labelText = sym.label[language] || sym.label.mr;
                  const isChecked = selectedSymptoms.includes(labelText);
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => toggleSymptom(labelText)}
                      className={`text-left p-2.5 rounded-lg border text-xs font-medium transition flex items-start gap-2 ${
                        isChecked
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                          : 'border-stone-200 bg-stone-50/70 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && '✓'}
                      </div>
                      <span className="leading-snug">{labelText}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Text description */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                ३. {language === 'mr' ? 'इतर काही लक्षणे जाणवत असल्यास लिहा:' : 'Or describe specific symptoms:'}
              </label>
              <input
                type="text"
                value={customDescription}
                onChange={e => setCustomDescription(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'उदा. पानांच्या कडा जळाल्यासारख्या दिसतात, फळावर किडे आहेत...'
                    : 'e.g. leaf margins scorched, small holes in pods...'
                }
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Right Column: Visual Photo Scanner (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>{t('uploadLeafPhoto')}</span>
              </label>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-xl p-4 text-center bg-white transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {uploadedImagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={uploadedImagePreview}
                      alt="Uploaded crop leaf"
                      className="h-28 mx-auto rounded-lg object-cover shadow-xs border border-stone-200"
                    />
                    <div className="text-[11px] text-emerald-800 font-bold flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'फोटो निवडला (बदलण्यासाठी क्लिक करा)' : 'Photo uploaded (Click to change)'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-stone-400" />
                    <p className="text-xs font-semibold text-stone-700">
                      {t('clickToUpload')}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      JPG, PNG किंवा कॅमेऱ्याने थेट फोटो काढा
                    </p>
                  </div>
                )}
              </div>

              {/* Pre-set sample photos */}
              <div className="mt-3">
                <p className="text-[11px] font-semibold text-stone-500 mb-1.5">
                  {language === 'mr' ? 'किंवा चाचणीसाठी तयार नमुना निवडा:' : 'Or test with sample image:'}
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {samplePhotos.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setUploadedImagePreview(sample.url);
                        setSelectedCropId(sample.cropId);
                        setCustomDescription(sample.desc);
                      }}
                      className="text-left p-1 rounded border border-stone-200 bg-white hover:border-emerald-600 transition group"
                    >
                      <img
                        src={sample.url}
                        alt={sample.label}
                        className="w-full h-12 object-cover rounded"
                      />
                      <span className="block text-[10px] text-stone-700 group-hover:text-emerald-800 font-medium truncate mt-0.5">
                        {sample.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Analyze Action Button */}
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold py-3 px-4 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'mr' ? 'लक्षणे तपासत आहे...' : 'Analyzing symptoms...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t('analyzeSymptomsBtn')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Verified Diagnosis Results Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>
              {language === 'mr' ? 'निदान निकाल व उपाययोजना' : language === 'hi' ? 'पहचान परिणाम व उपचार' : 'Diagnosis Results & Verified Treatments'}
            </span>
            <span className="text-xs bg-stone-200 text-stone-800 font-bold px-2 py-0.5 rounded-full">
              {diagnosisResults.length} {language === 'mr' ? 'रोग आढळले' : 'matches'}
            </span>
          </h2>
        </div>

        {diagnosisResults.map((result) => {
          const disease = result.matchedDisease;
          const isExpanded = expandedDiseaseId === disease.id;

          return (
            <div
              key={disease.id}
              className={`bg-white rounded-2xl border transition shadow-xs overflow-hidden ${
                isExpanded ? 'border-emerald-700 ring-2 ring-emerald-600/10' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Disease Summary Header */}
              <div
                onClick={() => setExpandedDiseaseId(isExpanded ? null : disease.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer bg-white hover:bg-stone-50/70"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={disease.imageUrl}
                    alt={disease.name.en}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                        🌾 {disease.cropName[language] || disease.cropName.mr}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {disease.category}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold ${
                          disease.severity === 'CRITICAL'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {disease.severity}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                      {disease.name[language] || disease.name.mr}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-1">
                      {result.diagnosticReasoning[language] || result.diagnosticReasoning.mr}
                    </p>
                  </div>
                </div>

                {/* Match Confidence Score */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 shrink-0">
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-800">
                      {result.confidenceScore}%
                    </div>
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">
                      अचूकता (Confidence)
                    </div>
                  </div>
                  <button className="text-xs font-bold text-emerald-700 underline mt-1">
                    {isExpanded ? (language === 'mr' ? 'माहिती लपवा ▲' : 'Collapse ▲') : (language === 'mr' ? 'सविस्तर उपचार पहा ▼' : 'View Treatment ▼')}
                  </button>
                </div>
              </div>

              {/* Expanded Treatment Drawer */}
              {isExpanded && (
                <div className="p-6 bg-stone-50/70 border-t border-stone-200 space-y-6 text-xs sm:text-sm text-stone-800">
                  {/* Diagnostic reasoning alert */}
                  <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 flex items-start gap-2.5 text-xs">
                    <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">
                        {language === 'mr' ? 'तज्ज्ञ रोग निदान अभिप्राय:' : 'Agronomy Diagnostic Reasoning:'}
                      </strong>{' '}
                      {result.diagnosticReasoning[language] || result.diagnosticReasoning.mr}
                    </div>
                  </div>

                  {/* Section 1: Detailed Symptoms & Favorable Conditions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{language === 'mr' ? 'दिसणारी प्रमुख लक्षणे:' : 'Primary Visible Symptoms:'}</span>
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-stone-700">
                        {(disease.symptoms[language] || disease.symptoms.mr).map((sym, idx) => (
                          <li key={idx}>{sym}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>{language === 'mr' ? 'रोगास पोषक वातावरण:' : 'Favorable Weather Conditions:'}</span>
                      </h4>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {disease.favorableConditions[language] || disease.favorableConditions.mr}
                      </p>
                      <div className="pt-2 border-t border-stone-100">
                        <strong className="text-stone-900 font-bold block mb-1">
                          {language === 'mr' ? 'प्रतिबंधक शेती पद्धती:' : 'Preventive Practices:'}
                        </strong>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-600">
                          {(disease.preventionTips[language] || disease.preventionTips.mr).slice(0, 2).map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Chemical Pesticides with Verified 15L Dosage */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-700" />
                        <span>{t('chemicalOption')}</span>
                      </h4>
                      <span className="text-[11px] text-stone-500 font-medium">
                        CIBRC प्रमाणित लेबल शिफारसी
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {disease.chemicalTreatments.map((med) => (
                        <div
                          key={med.id}
                          className="bg-white p-4 rounded-xl border border-stone-200 hover:border-emerald-600 transition shadow-xs space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h5 className="font-extrabold text-stone-900 text-sm">
                                  {med.commercialName[language] || med.commercialName.mr}
                                </h5>
                                <p className="text-[11px] text-emerald-800 font-semibold font-mono">
                                  {med.technicalName}
                                </p>
                              </div>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded border uppercase shrink-0 ${getToxicityBadgeClass(
                                  med.toxicityColor
                                )}`}
                              >
                                {med.toxicityLabel[language] || med.toxicityLabel.mr}
                              </span>
                            </div>

                            {/* Dosage Specs Box */}
                            <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 text-xs space-y-1 text-emerald-950">
                              <div className="flex justify-between font-bold">
                                <span>{t('dosePerPump')}</span>
                                <span className="text-emerald-900 font-extrabold text-sm">{med.dosePerPump15L}</span>
                              </div>
                              <div className="flex justify-between text-stone-600 text-[11px]">
                                <span>{t('dosePerAcre')}</span>
                                <span className="font-semibold text-stone-800">{med.dosePerAcre200L}</span>
                              </div>
                              <div className="flex justify-between text-stone-600 text-[11px]">
                                <span>{t('waitingPeriod')}</span>
                                <span className="font-semibold text-red-700">{med.waitingPeriodDays} {t('days')}</span>
                              </div>
                            </div>

                            {/* Application method */}
                            <p className="text-xs text-stone-600">
                              {med.applicationMethod[language] || med.applicationMethod.mr}
                            </p>
                          </div>

                          {/* Quick Calculate Tank Dose Button */}
                          <div className="pt-2 border-t border-stone-100">
                            <button
                              onClick={() => onSelectMedicineForCalc(med)}
                              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition shadow-xs"
                            >
                              <Calculator className="w-3.5 h-3.5" />
                              <span>{language === 'mr' ? 'या औषधाचा अचूक डोस काढा (Calculator)' : 'Calculate Tank Dose for this'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Organic & Biological Alternatives */}
                  {disease.organicTreatments.length > 0 && (
                    <div className="space-y-3">
                      <div className="border-b border-stone-200 pb-2">
                        <h4 className="font-bold text-emerald-900 text-sm sm:text-base flex items-center gap-2">
                          <Sprout className="w-4 h-4 text-emerald-700" />
                          <span>{t('organicOption')}</span>
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {disease.organicTreatments.map((org, idx) => (
                          <div
                            key={idx}
                            className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-200 space-y-2"
                          >
                            <h5 className="font-bold text-emerald-950 text-xs sm:text-sm">
                              🌱 {org.name[language] || org.name.mr}
                            </h5>
                            <p className="text-xs text-stone-700">
                              {org.description[language] || org.description.mr}
                            </p>
                            <div className="text-xs font-bold text-emerald-900 bg-white p-2 rounded border border-emerald-200">
                              प्रमाण: {org.dosage}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legal and Safety Disclaimer */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                    {t('diagnosisDisclaimer')}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {diagnosisResults.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200 text-stone-500 text-sm">
            {language === 'mr' ? 'कोणताही रोग जुळला नाही. कृपया वरील पीक अथवा लक्षणे बदलून पुन्हा प्रयत्न करा.' : 'No disease matched. Please select other symptoms.'}
          </div>
        )}
      </div>
    </div>
  );
};
