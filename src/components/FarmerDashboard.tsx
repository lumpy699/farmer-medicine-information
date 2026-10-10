import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_CROPS, INITIAL_DISEASES } from '../data/mockData';
import {
  Sprout,
  ShieldAlert,
  Droplets,
  CloudSun,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
  PlusCircle,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface FarmerDashboardProps {
  onNavigate: (tab: string) => void;
  onSearchDisease: (query: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  onNavigate,
  onSearchDisease,
}) => {
  const { user, searchHistory } = useAuth();
  const { language, t } = useLanguage();

  const selectedCrops = INITIAL_CROPS.filter(c =>
    (user?.primaryCrops || ['crop-cotton', 'crop-onion']).includes(c.id)
  );

  const upcomingSprays = [
    {
      crop: language === 'mr' ? 'कापूस (बोंडअळी प्रतिबंध)' : 'Cotton Bollworm Spray',
      medicine: 'कोराजन (Coragen 6 ml)',
      dueIn: '३ दिवसांत',
      status: 'नियोजित',
      stage: 'फुलधारणा ते बोंड अवस्था',
    },
    {
      crop: language === 'mr' ? 'कांदा (करपा संरक्षण)' : 'Onion Blight Prevention',
      medicine: 'डायथेन एम-४५ (३० ग्रॅम) + स्टिकर',
      dueIn: '७ दिवसांत',
      status: 'नियोजित',
      stage: 'पाती वाढीची अवस्था',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Farmer Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            <span>
              {user?.village || 'निफाड'}, {user?.district || 'नाशिक'} ({user?.state || 'महाराष्ट्र'}) · शेतजमीन: {user?.landAreaAcres || 5.5} एकर
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('welcomeFarmer')}{' '}
            <span className="text-amber-300">{user?.name || 'शेतकरी बांधव'}</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            {language === 'mr'
              ? 'तुमच्या शेतातील पिकांचे आरोग्य सुरक्षित आहे. आजच्या हवामानानुसार फवारणीसाठी योग्य नियोजन खाली पहा.'
              : 'Your crops are being monitored. Check verified spray schedules and live weather advisories below.'}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
          <button
            onClick={() => onNavigate('diseases')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-sm"
          >
            <ShieldAlert className="w-4 h-4 text-stone-900" />
            <span>{t('diagnoseNowBtn')}</span>
          </button>
          <button
            onClick={() => onNavigate('dosage')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition border border-white/20"
          >
            <Layers className="w-4 h-4 text-emerald-300" />
            <span>{t('calculateDoseBtn')}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: My Crops & Spray Calendar (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Module 1: My Selected Crops */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-stone-900 text-base">
                <Sprout className="w-5 h-5 text-emerald-700" />
                <span>{t('myCrops')}</span>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>{t('addCrop')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedCrops.map(crop => (
                <div
                  key={crop.id}
                  onClick={() => onNavigate('crops')}
                  className="group p-4 rounded-xl border border-stone-200 hover:border-emerald-600 hover:shadow-md transition cursor-pointer flex gap-4 bg-stone-50/50"
                >
                  <img
                    src={crop.imageUrl}
                    alt={crop.name.en}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200 group-hover:scale-105 transition"
                  />
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      {crop.season}
                    </span>
                    <h3 className="font-extrabold text-stone-900 text-sm group-hover:text-emerald-800 transition">
                      {crop.name[language] || crop.name.mr}
                    </h3>
                    <p className="text-stone-500 text-[11px] line-clamp-1">
                      कालावधी: {crop.durationDays}
                    </p>
                    <span className="text-emerald-700 font-bold text-[11px] inline-flex items-center gap-1 mt-1">
                      लागवड मार्गदर्शक पहा →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Upcoming Spray Schedule Calendar */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-stone-900 text-base">
                <Calendar className="w-5 h-5 text-blue-700" />
                <span>{t('spraySchedule')}</span>
              </div>
              <span className="text-xs font-bold text-stone-500">
                {language === 'mr' ? 'कीड नियंत्रण नियोजन' : 'Pest Management Plan'}
              </span>
            </div>

            <div className="space-y-3">
              {upcomingSprays.map((spray, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{spray.crop}</span>
                      <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded">
                        {spray.status}
                      </span>
                    </div>
                    <div className="text-stone-600">
                      शिफारस औषध: <strong className="text-emerald-800">{spray.medicine}</strong>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      अवस्था: {spray.stage}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="font-extrabold text-amber-700 text-xs">
                      {spray.dueIn}
                    </span>
                    <button
                      onClick={() => onNavigate('dosage')}
                      className="text-emerald-700 hover:underline font-bold text-[11px] mt-1"
                    >
                      डोस तपासा →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weather Summary, Recent Searches & Daily Tip (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mini Weather Snapshot Widget */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-stone-700 font-bold text-sm">
              <div className="flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-amber-600" />
                <span>{language === 'mr' ? 'आजचे स्थानिक हवामान' : 'Local Weather'}</span>
              </div>
              <button
                onClick={() => onNavigate('weather')}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                सविस्तर →
              </button>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
              <div className="flex justify-between items-center font-bold text-stone-900">
                <span>{user?.district || 'नाशिक'} परिसर</span>
                <span className="text-emerald-900 text-base font-extrabold">२८.५°C</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-800 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>फवारणीसाठी अनुकूल वातावरण</span>
              </div>
              <p className="text-[11px] text-stone-600">
                हवेचा वेग शांत (८.५ किमी/तास), पाऊस शक्यता अल्प. सकाळी फवारणी करावी.
              </p>
            </div>
          </div>

          {/* Recent Searches */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-stone-700 font-bold text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>{t('recentSearches')}</span>
              </div>
            </div>

            {searchHistory.length === 0 ? (
              <p className="text-xs text-stone-400 italic">कोणताही अलीकडील शोध नाही.</p>
            ) : (
              <div className="space-y-2">
                {searchHistory.slice(0, 4).map(item => (
                  <button
                    key={item.id}
                    onClick={() => onSearchDisease(item.query)}
                    className="w-full text-left p-2.5 rounded-lg border border-stone-100 hover:border-emerald-600 bg-stone-50 hover:bg-emerald-50/50 transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-800">{item.query}</div>
                      <div className="text-[10px] text-stone-500">{item.cropName} · {item.timestamp}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Daily Seasonal Agronomy Tip */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 space-y-2 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t('dailyAgriTip')}</span>
            </div>
            <p className="leading-relaxed">
              {language === 'mr'
                ? 'कीटकनाशकांची फवारणी करताना नेहमी सकाळी ९ पूर्वी किंवा दुपारी ४ नंतर करावी. दुपारच्या कडक उन्हात औषधाचे बाष्पीभवन होऊन कार्यक्षमता कमी होते आणि मधमाश्यांना हानी पोहोचते.'
                : 'Always perform pesticide spraying early morning or after 4 PM to prevent chemical evaporation and protect pollinators.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
