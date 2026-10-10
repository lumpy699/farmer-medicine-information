import React, { useState } from 'react';
import { Crop } from '../types';
import { INITIAL_CROPS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { CropDetailModal } from './CropDetailModal';
import {
  Search,
  BookOpen,
  Filter,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface CropDirectoryProps {
  onNavigateToDisease: (diseaseId: string) => void;
}

export const CropDirectory: React.FC<CropDirectoryProps> = ({ onNavigateToDisease }) => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeason, setSelectedSeason] = useState<string>('ALL');
  const [activeModalCrop, setActiveModalCrop] = useState<Crop | null>(null);

  const categories = [
    { id: 'ALL', label: language === 'mr' ? 'सर्व पिके' : language === 'hi' ? 'सभी फसलें' : 'All Crops' },
    { id: 'CASH_CROP', label: language === 'mr' ? 'नगदी पिके (कापूस, ऊस)' : language === 'hi' ? 'नकदी फसलें' : 'Cash Crops' },
    { id: 'VEGETABLE', label: language === 'mr' ? 'भाजीपाला (कांदा, टोमॅटो)' : language === 'hi' ? 'सब्जियां' : 'Vegetables' },
    { id: 'OILSEED', label: language === 'mr' ? 'गळित धान्य (सोयाबीन)' : language === 'hi' ? 'तिलहन' : 'Oilseeds' },
    { id: 'CEREAL', label: language === 'mr' ? 'अन्नधान्य (गहू, मका)' : language === 'hi' ? 'अनाज' : 'Cereals' },
    { id: 'HORTICULTURE', label: language === 'mr' ? 'फळबागा (संत्रा/मोसंबी)' : language === 'hi' ? 'बागवानी' : 'Horticulture' },
  ];

  const seasons = [
    { id: 'ALL', label: language === 'mr' ? 'सर्व हंगाम' : language === 'hi' ? 'सभी मौसम' : 'All Seasons' },
    { id: 'KHARIF', label: language === 'mr' ? 'खरीप हंगाम' : language === 'hi' ? 'खरीफ' : 'Kharif' },
    { id: 'RABI', label: language === 'mr' ? 'रब्बी हंगाम' : language === 'hi' ? 'रबी' : 'Rabi' },
    { id: 'ANNUAL', label: language === 'mr' ? 'वार्षिक/बहुवर्षीय' : language === 'hi' ? 'वार्षिक' : 'Annual' },
  ];

  const filteredCrops = INITIAL_CROPS.filter(crop => {
    const matchesCategory = selectedCategory === 'ALL' || crop.category === selectedCategory;
    const matchesSeason = selectedSeason === 'ALL' || crop.season === selectedSeason;
    const nameMatch =
      crop.name.mr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.name.hi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.botanicalName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSeason && nameMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-700" />
              <span>{t('crops')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {language === 'mr'
                ? 'महाराष्ट्रातील प्रमुख पिके, जमीन निवड, खत व्यवस्थापन आणि लागवड तंत्रज्ञान मार्गदर्शक.'
                : language === 'hi'
                ? 'प्रमुख फसलों की जानकारी, मिट्टी, उर्वरक और उन्नत खेती के तरीके।'
                : 'Complete agronomic directory for major field crops, soil suitability, and fertilizer schedules.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? 'पिकाचे नाव शोधा...' : 'Search crop name...'}
              className="w-full pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-xs sm:text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-stone-50"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1 text-xs font-bold text-stone-600 mr-2">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'वर्गवारी:' : 'Category:'}</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Season Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-bold text-stone-600 mr-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'हंगाम:' : 'Season:'}</span>
          </div>
          {seasons.map(sea => (
            <button
              key={sea.id}
              onClick={() => setSelectedSeason(sea.id)}
              className={`px-2.5 py-1 rounded text-xs transition ${
                selectedSeason === sea.id
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sea.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map(crop => (
          <div
            key={crop.id}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-600 transition flex flex-col justify-between"
          >
            <div>
              {/* Crop Photo Card Header */}
              <div className="relative h-44 overflow-hidden bg-stone-100">
                <img
                  src={crop.imageUrl}
                  alt={crop.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                    {crop.season} · {crop.category.replace('_', ' ')}
                  </div>
                  <h3 className="text-xl font-bold leading-tight">
                    {crop.name[language] || crop.name.mr}
                  </h3>
                  <p className="text-xs text-stone-300 italic">{crop.botanicalName}</p>
                </div>
              </div>

              {/* Crop Quick Agronomic Specs */}
              <div className="p-5 space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">{language === 'mr' ? 'जमीन प्रकार:' : 'Soil:'}</strong>{' '}
                    <span className="line-clamp-2 text-stone-600">{crop.soil[language] || crop.soil.mr}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-600">
                  <span>⏱️ {crop.durationDays}</span>
                  <span>🌱 NPK: {crop.fertilizers.npkRatio}</span>
                </div>

                <div className="flex items-center gap-1.5 text-red-700 font-semibold text-[11px] bg-red-50 p-2 rounded-lg">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>
                    {language === 'mr'
                      ? `प्रमुख ${crop.commonDiseasesCount} रोगांचे निदान उपलब्ध`
                      : `${crop.commonDiseasesCount} verified disease remedies`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Card Button */}
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <button
                onClick={() => setActiveModalCrop(crop)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition shadow-xs"
              >
                <span>{language === 'mr' ? 'लागवड माहिती व रोग पहा' : 'View Cultivation & Diseases'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-stone-200 text-stone-500 text-sm">
          {language === 'mr' ? 'या शोधासाठी कोणतेही पीक सापडले नाही.' : 'No crops found matching criteria.'}
        </div>
      )}

      {/* Agronomy Details Modal */}
      <CropDetailModal
        crop={activeModalCrop}
        onClose={() => setActiveModalCrop(null)}
        onSelectDisease={diseaseId => {
          onNavigateToDisease(diseaseId);
        }}
      />
    </div>
  );
};
