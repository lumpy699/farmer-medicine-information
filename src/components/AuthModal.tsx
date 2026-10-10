import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  LogIn,
  UserPlus,
  ShieldCheck,
  Smartphone,
  Mail,
  Lock,
  User as UserIcon,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, switchToFarmerDemo, switchToAdminDemo } = useAuth();
  const { language, t } = useLanguage();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('9822334455');
  const [password, setPassword] = useState('Farmer@123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Registration form states
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regDistrict, setRegDistrict] = useState('Nashik');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await login(identifier, password);
    setIsLoading(false);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.error || 'लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await register({
      name: regName,
      mobile: regMobile,
      email: regEmail || `${regMobile}@agri.local`,
      village: regVillage || 'ग्राम',
      district: regDistrict,
      state: 'Maharashtra',
      landAreaAcres: 5.0,
      primaryCrops: ['crop-cotton', 'crop-onion'],
    });

    setIsLoading(false);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.error || 'नोंदणी अयशस्वी.');
    }
  };

  const fillFarmerTest = () => {
    setAuthMode('login');
    setIdentifier('9822334455');
    setPassword('Farmer@123');
  };

  const fillAdminTest = () => {
    setAuthMode('login');
    setIdentifier('admin@farmerinfo.gov.in');
    setPassword('Admin@123');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-1 mb-5">
          <div className="w-12 h-12 bg-emerald-700 text-white rounded-xl mx-auto flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900">
            {authMode === 'login' ? t('login') : t('register')}
          </h2>
          <p className="text-xs text-stone-500">
            {t('appName')}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border border-stone-200 p-1 rounded-lg bg-stone-50 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 rounded transition ${
              authMode === 'login' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600'
            }`}
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-1.5 rounded transition ${
              authMode === 'register' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600'
            }`}
          >
            {t('register')}
          </button>
        </div>

        {/* 1-Click Test Credentials Buttons for rapid evaluation */}
        <div className="mb-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs space-y-2">
          <span className="font-bold text-amber-900 block text-[11px]">
            ⚡ जलद चाचणीसाठी टेस्ट खाती भरा (Quick Demo Fill):
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillFarmerTest}
              className="flex-1 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold py-1.5 px-2 rounded text-[11px] transition text-center"
            >
              👨‍🌾 शेतकरी खाते (Sadashivrao)
            </button>
            <button
              type="button"
              onClick={fillAdminTest}
              className="flex-1 bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold py-1.5 px-2 rounded text-[11px] transition text-center"
            >
              🏛️ प्रशासक खाते (Admin)
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('mobileLabel')} किंवा {t('emailLabel')}
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="9822334455 किंवा patil.farmer@agrimail.com"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'तपासत आहे...' : t('login')}</span>
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('nameLabel')} *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="उदा. रमेश मारुती पवार"
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('mobileLabel')} *
                </label>
                <input
                  type="tel"
                  required
                  value={regMobile}
                  onChange={e => setRegMobile(e.target.value)}
                  placeholder="९८xxxxxxxx"
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('emailLabel')}
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="optional"
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('villageLabel')} *
                </label>
                <input
                  type="text"
                  required
                  value={regVillage}
                  onChange={e => setRegVillage(e.target.value)}
                  placeholder="उदा. दिंडोरी"
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('districtLabel')} *
                </label>
                <input
                  type="text"
                  required
                  value={regDistrict}
                  onChange={e => setRegDistrict(e.target.value)}
                  placeholder="नाशिक"
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {t('passwordLabel')} *
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                placeholder="किमान ६ अक्षरे"
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isLoading ? 'नोंदणी करत आहे...' : t('register')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
