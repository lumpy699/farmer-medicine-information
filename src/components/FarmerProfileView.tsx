import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_CROPS } from '../data/mockData';
import { AVAILABLE_DISTRICTS } from '../services/weatherService';
import {
  User as UserIcon,
  MapPin,
  Sprout,
  Save,
  CheckCircle,
  History,
  Trash2,
} from 'lucide-react';

export const FarmerProfileView: React.FC = () => {
  const { user, updateProfile, searchHistory, clearSearchHistory } = useAuth();
  const { language, t } = useLanguage();

  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [village, setVillage] = useState(user?.village || '');
  const [district, setDistrict] = useState(user?.district || 'Nashik');
  const [landArea, setLandArea] = useState<number>(user?.landAreaAcres || 5.0);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(
    user?.primaryCrops || ['crop-cotton', 'crop-onion']
  );
  const [isSaved, setIsSaved] = useState(false);

  const toggleCrop = (cropId: string) => {
    setSelectedCrops(prev =>
      prev.includes(cropId) ? prev.filter(id => id !== cropId) : [...prev, cropId]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      mobile,
      village,
      district,
      landAreaAcres: landArea,
      primaryCrops: selectedCrops,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-emerald-700" />
          <span>{t('profile')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          {language === 'mr'
            ? 'तुमची वैयक्तिक माहिती, शेतजमीन, पिके आणि अलीकडील शोध व्यवस्थापित करा.'
            : 'Manage personal details, land records, chosen crops, and search history.'}
        </p>

        {isSaved && (
          <div className="mt-4 p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>प्रोफाईल यशस्वीरीत्या अपडेट करण्यात आले! (Profile Saved Successfully)</span>
          </div>
        )}

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('nameLabel')} *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('mobileLabel')} *
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('villageLabel')}
              </label>
              <input
                type="text"
                value={village}
                onChange={e => setVillage(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('districtLabel')}
              </label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600 font-semibold"
              >
                {AVAILABLE_DISTRICTS.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('landAreaLabel')}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={landArea}
                onChange={e => setLandArea(parseFloat(e.target.value) || 1)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                खाते प्रकार (Role)
              </label>
              <input
                type="text"
                value={user?.role === 'ADMIN' ? 'प्रशासक (Admin)' : 'शेतकरी (Farmer)'}
                disabled
                className="w-full bg-stone-100 border border-stone-200 text-stone-500 rounded-lg p-2.5 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Primary Crops Selector */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="block font-bold text-stone-800 text-xs uppercase tracking-wider">
              {language === 'mr' ? 'माझी पिके (पिके निवडा):' : 'My Farm Crops:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {INITIAL_CROPS.map(c => {
                const isChecked = selectedCrops.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCrop(c.id)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition ${
                      isChecked
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span>{c.name[language] || c.name.mr}</span>
                    <span className="text-emerald-700">{isChecked ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-6 rounded-lg text-xs sm:text-sm transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{t('submitBtn')}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Search History Management */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <History className="w-4 h-4 text-emerald-700" />
            <span>{language === 'mr' ? 'पूर्वी शोधलेले रोग व औषधे' : 'Search & Diagnostic History'}</span>
          </div>
          {searchHistory.length > 0 && (
            <button
              onClick={clearSearchHistory}
              className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'इतिहास पुसा' : 'Clear History'}</span>
            </button>
          )}
        </div>

        {searchHistory.length === 0 ? (
          <p className="text-xs text-stone-400 italic">कोणताही जुना इतिहास उपलब्ध नाही.</p>
        ) : (
          <div className="space-y-2">
            {searchHistory.map(item => (
              <div
                key={item.id}
                className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-stone-900">{item.query}</strong>
                  <div className="text-[11px] text-stone-500">
                    पीक: {item.cropName} {item.diseaseName ? `· रोग: ${item.diseaseName}` : ''}
                  </div>
                </div>
                <span className="text-[11px] text-stone-400">{item.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
