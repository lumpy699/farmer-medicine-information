import React, { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { fetchDistrictWeather, AVAILABLE_DISTRICTS } from '../services/weatherService';
import { useLanguage } from '../context/LanguageContext';
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  RefreshCw,
  MapPin,
  Calendar,
} from 'lucide-react';

export const WeatherAdvisory: React.FC = () => {
  const { language, t } = useLanguage();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');
  const [villageInput, setVillageInput] = useState<string>('');
  const [customVillageName, setCustomVillageName] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadWeather = async (district: string) => {
    setIsLoading(true);
    const data = await fetchDistrictWeather(district);
    setWeatherData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
  }, [selectedDistrict]);

  const handleVillageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (villageInput.trim()) {
      setCustomVillageName(villageInput.trim());
    }
  };

  const getSprayBadgeConfig = (suitability: WeatherData['spraySuitability']) => {
    switch (suitability) {
      case 'EXCELLENT':
        return {
          bg: 'bg-emerald-100 border-emerald-300 text-emerald-950',
          icon: ShieldCheck,
          label: t('sprayStatusGood'),
          color: 'text-emerald-700',
        };
      case 'MODERATE':
        return {
          bg: 'bg-amber-100 border-amber-300 text-amber-950',
          icon: AlertTriangle,
          label: t('sprayStatusModerate'),
          color: 'text-amber-700',
        };
      case 'NOT_RECOMMENDED':
        return {
          bg: 'bg-red-100 border-red-300 text-red-950 font-bold',
          icon: XCircle,
          label: t('sprayStatusBad'),
          color: 'text-red-700',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with District Selector & Custom Village Input */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
              <CloudSun className="w-6 h-6 text-emerald-700" />
              <span>{t('weatherTitle')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'रिअल-टाइम हवामान माहिती आणि हवेचा वेग, पाऊस व आर्द्रतेनुसार तज्ज्ञ फवारणी सल्ला.'
                : 'Real-time weather data & precision spray suitability indicator based on wind speed and precipitation.'}
            </p>
          </div>

          <button
            onClick={() => loadWeather(selectedDistrict)}
            disabled={isLoading}
            className="flex items-center gap-1.5 self-start md:self-auto bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-2 px-3 rounded-lg transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{language === 'mr' ? 'हवामान ताजे करा' : 'Refresh Weather'}</span>
          </button>
        </div>

        {/* District and Village Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 border-t border-stone-100">
          <div className="md:col-span-6">
            <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
              {t('selectDistrict')}
            </label>
            <select
              value={selectedDistrict}
              onChange={e => {
                setSelectedDistrict(e.target.value);
                setCustomVillageName('');
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-900 outline-none focus:border-emerald-600"
            >
              {AVAILABLE_DISTRICTS.map(distKey => (
                <option key={distKey} value={distKey}>
                  📍 {distKey}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleVillageSubmit} className="md:col-span-6">
            <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
              {language === 'mr' ? 'किंवा तुमचे गाव / तालुका प्रविष्ट करा:' : 'Or enter your Village / Taluka:'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={villageInput}
                onChange={e => setVillageInput(e.target.value)}
                placeholder={language === 'mr' ? 'उदा. निफाड, सिन्नर, बारामती...' : 'e.g. Niphad, Baramati...'}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs sm:text-sm outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-lg transition shrink-0"
              >
                {language === 'mr' ? 'लागू करा' : 'Apply'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Weather Cockpit */}
      {weatherData && (
        <div className="space-y-6">
          {/* Top Big Spray Advisory Card */}
          {(() => {
            const badge = getSprayBadgeConfig(weatherData.spraySuitability);
            const BadgeIcon = badge.icon;
            return (
              <div className={`p-6 rounded-2xl border shadow-sm ${badge.bg} transition`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-xs">
                      <BadgeIcon className={`w-7 h-7 ${badge.color}`} />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold tracking-wider block opacity-80">
                        {language === 'mr' ? 'फवारणी अनुकूलता स्थिती' : 'Spray Suitability Status'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black leading-tight">
                        {badge.label}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto bg-white/80 px-3 py-1.5 rounded-lg border border-black/5 text-xs font-semibold text-stone-800">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {customVillageName ? `${customVillageName}, ${weatherData.district}` : weatherData.district}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 text-xs sm:text-sm leading-relaxed">
                  <strong className="font-bold">
                    {language === 'mr' ? 'हवामान आधारित कृषी सल्ला:' : 'Agro-Meteorological Advisory:'}
                  </strong>{' '}
                  {weatherData.sprayAdvisory[language] || weatherData.sprayAdvisory.mr}
                </div>
              </div>
            );
          })()}

          {/* Meteorological Metrics 4-grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. Temp */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{language === 'mr' ? 'तापमान' : 'Temperature'}</span>
                <Thermometer className="w-4 h-4 text-amber-500" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-black text-stone-900">
                  {weatherData.temperature}°C
                </span>
                <span className="text-[11px] text-stone-400 block">
                  जाणवणारे: {weatherData.feelsLike}°C
                </span>
              </div>
              <span className="text-[11px] text-stone-600 font-medium">
                स्थिती: {weatherData.condition}
              </span>
            </div>

            {/* 2. Wind */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{language === 'mr' ? 'हवेचा वेग' : 'Wind Speed'}</span>
                <Wind className="w-4 h-4 text-blue-500" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-black text-stone-900">
                  {weatherData.windSpeed}
                </span>
                <span className="text-xs text-stone-500 font-bold ml-1">किमी/तास</span>
              </div>
              <span className={`text-[11px] font-semibold ${weatherData.windSpeed > 15 ? 'text-red-700' : 'text-emerald-700'}`}>
                {weatherData.windSpeed > 15 ? '⚠️ जास्त वारा (फवारा उडण्याचा धोका)' : '✓ फवारणीसाठी शांत वारा'}
              </span>
            </div>

            {/* 3. Rain Probability */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{language === 'mr' ? 'पावसाची शक्यता' : 'Rain Probability'}</span>
                <CloudRain className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-black text-stone-900">
                  {weatherData.rainChance}%
                </span>
              </div>
              <span className={`text-[11px] font-semibold ${weatherData.rainChance > 40 ? 'text-red-700' : 'text-emerald-700'}`}>
                {weatherData.rainChance > 40 ? '⚠️ पावसाचा धोका (औषध वाहू शकते)' : '✓ पाऊस पडण्याची शक्यता कमी'}
              </span>
            </div>

            {/* 4. Humidity */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>{language === 'mr' ? 'हवेतील आर्द्रता' : 'Humidity'}</span>
                <Droplets className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="my-2">
                <span className="text-3xl font-black text-stone-900">
                  {weatherData.humidity}%
                </span>
              </div>
              <span className="text-[11px] text-stone-600 font-medium">
                {weatherData.humidity > 75 ? 'बुरशीजन्य रोगांचा प्रादुर्भाव वाढू शकतो' : 'सामान्य आर्द्रता'}
              </span>
            </div>
          </div>

          {/* 3-Day Forecast */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>{language === 'mr' ? 'पुढील ३ दिवसांचा हवामान अंदाज' : 'Next 3 Days Forecast'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {weatherData.forecast.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center font-bold text-stone-800">
                    <span>{f.day}</span>
                    <span className="text-stone-500">{f.condition}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-900 font-extrabold text-base">
                      {f.maxTemp}°C / {f.minTemp}°C
                    </span>
                    <span className="text-[11px] text-cyan-800 font-semibold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      पाऊस: {f.rainProb}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
