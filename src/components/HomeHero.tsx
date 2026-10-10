import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  ShieldAlert,
  Droplets,
  CloudSun,
  AlertTriangle,
  ArrowRight,
  Sprout,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (tab: string) => void;
  onSearch: (query: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate, onSearch }) => {
  const { language, t } = useLanguage();
  const { addSearchHistory } = useAuth();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    addSearchHistory(searchInput.trim(), 'शोध परिणाम');
    onSearch(searchInput.trim());
    onNavigate('diseases');
  };

  const quickSearchTags = [
    { label: language === 'mr' ? 'कापूस बोंडअळी' : language === 'hi' ? 'कपास सुंडी' : 'Pink Bollworm', query: 'बोंडअळी' },
    { label: language === 'mr' ? 'कांदा करपा' : language === 'hi' ? 'प्याज झुलसा' : 'Onion Blight', query: 'जांभळा करपा' },
    { label: language === 'mr' ? 'टोमॅटो फळ अळी' : language === 'hi' ? 'टमाटर इल्ली' : 'Fruit Borer', query: 'टोमॅटो' },
    { label: language === 'mr' ? 'कोराजन डोस' : language === 'hi' ? 'कोराजन खुराक' : 'Coragen Dose', query: 'कोराजन' },
    { label: language === 'mr' ? 'दशपर्णी अर्क' : language === 'hi' ? 'दशपर्णी अर्क' : 'Dashparni Ark', query: 'दशपर्णी' },
  ];

  return (
    <div className="space-y-6">
      {/* Alert Ticker for Emergency Pest Advisory */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 flex items-start sm:items-center gap-3 text-amber-900 shadow-xs">
        <div className="p-1.5 bg-amber-200 text-amber-900 rounded shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm flex-1">
          <strong className="font-bold">
            {language === 'mr' ? 'महत्त्वाची कृषी सूचना:' : language === 'hi' ? 'महत्वपूर्ण कृषि चेतावनी:' : 'Urgent Agri Alert:'}
          </strong>{' '}
          {language === 'mr'
            ? 'कापूस उत्पादक शेतकऱ्यांनी पाते व बोंड अवस्थेत दर हेक्टरी ५ फेरोमोन ट्रॅप लावावेत. रसशोषक किडींसाठी निंबोळी अर्क ५% ची प्रतिबंधक फवारणी करावी.'
            : language === 'hi'
            ? 'कपास किसान टिंडे की अवस्था में प्रति एकड़ फेरोमोन ट्रैप लगाएं और नीम तेल ५% का छिड़काव करें।'
            : 'Cotton growers are advised to install 5 pheromone traps/ha and apply preventive 5% Neem extract for sucking pests.'}
        </div>
        <button
          onClick={() => {
            onSearch('बोंडअळी');
            onNavigate('diseases');
          }}
          className="text-xs font-bold text-amber-800 underline hover:text-amber-950 whitespace-nowrap shrink-0"
        >
          {language === 'mr' ? 'उपचार पहा →' : language === 'hi' ? 'उपचार देखें →' : 'View Remedy →'}
        </button>
      </div>

      {/* Main Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#2d6a4f_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>

        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {language === 'mr'
                ? 'महाराष्ट्र कृषी विद्यापीठ आणि CIBRC शिफारसींवर आधारित'
                : language === 'hi'
                ? 'कृषि विश्वविद्यालय एवं CIBRC सिफारिशों पर आधारित'
                : 'Verified by Agri Universities & Central Insecticides Board (CIBRC)'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {t('heroTitle')}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal">
            {t('heroSubtitle')}
          </p>

          {/* Unified Search Input */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-xl shadow-2xl p-1.5 focus-within:ring-3 focus-within:ring-emerald-400">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full px-3 py-2.5 text-stone-900 text-sm sm:text-base outline-none bg-transparent placeholder:text-stone-400 font-medium"
              />
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <span>{language === 'mr' ? 'शोधा' : language === 'hi' ? 'खोजें' : 'Search'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick search chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-emerald-200/90">
              <span className="font-medium text-emerald-300">
                {language === 'mr' ? 'नेहमीचे शोध:' : language === 'hi' ? 'प्रचलित खोज:' : 'Trending:'}
              </span>
              {quickSearchTags.map(tag => (
                <button
                  key={tag.query}
                  type="button"
                  onClick={() => {
                    setSearchInput(tag.query);
                    onSearch(tag.query);
                    onNavigate('diseases');
                  }}
                  className="bg-emerald-800/80 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-xs transition border border-emerald-600/40"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </form>

          {/* Key Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-700/50 text-left">
            <div className="flex items-center gap-2 text-xs text-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'mr' ? 'अचूक १५ लि. पंप प्रमाण' : language === 'hi' ? 'सटीक १५ लीटर खुराक' : 'Accurate 15L Pump Dose'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'mr' ? 'जैविक व रासायनिक पर्याय' : language === 'hi' ? 'जैविक व रासायनिक उपचार' : 'Chemical & Organic Options'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'mr' ? 'प्रतिक्षा कालावधी (PHI) माहिती' : language === 'hi' ? 'सुरक्षित प्रतीक्षा अवधि' : 'Verified Waiting Days'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'mr' ? 'हवामान फवारणी मार्गदर्शक' : language === 'hi' ? 'मौसम छिड़काव सलाह' : 'Weather Spray Indicator'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Module Gateway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Disease Diagnosis */}
        <div
          onClick={() => onNavigate('diseases')}
          className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-emerald-600 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center group-hover:scale-105 transition">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {t('instantScannerTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t('instantScannerDesc')}
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
            <span>{t('diagnoseNowBtn')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 2: Spray Dosage & Calculator */}
        <div
          onClick={() => onNavigate('dosage')}
          className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-emerald-600 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition">
              <Droplets className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {t('verifiedDoseTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t('verifiedDoseDesc')}
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
            <span>{t('calculateDoseBtn')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>

        {/* Card 3: Weather & Spray Advisory */}
        <div
          onClick={() => onNavigate('weather')}
          className="group bg-white p-6 rounded-xl border border-stone-200 hover:border-emerald-600 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition">
              <CloudSun className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition">
              {t('weatherSprayTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t('weatherSprayDesc')}
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
            <span>{language === 'mr' ? 'हवामान तपासा' : language === 'hi' ? 'मौसम जांचें' : 'Check Weather Advisory'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">१०+ प्रमुख पिके</div>
          <div className="text-xs text-stone-400 mt-1">कापूस, सोयाबीन, कांदा, टोमॅटो, ऊस इ.</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">२५+ कीड व रोग</div>
          <div className="text-xs text-stone-400 mt-1">लक्षणे, कारणे व प्रतिबंधक उपाय</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">१००% प्रमाणित डोस</div>
          <div className="text-xs text-stone-400 mt-1">CIBRC व कृषी विद्यापीठ मान्यताप्राप्त</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">३ भाषांमध्ये उपलब्ध</div>
          <div className="text-xs text-stone-400 mt-1">मराठी, हिंदी आणि इंग्रजी</div>
        </div>
      </div>
    </div>
  );
};
