import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';
import {
  Sprout,
  ShieldAlert,
  Droplets,
  CloudSun,
  User as UserIcon,
  Layers,
  Settings,
  LogOut,
  LogIn,
  Menu,
  X,
  Languages,
  BookOpen,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenArchitecture: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenArchitecture,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout, switchToFarmerDemo, switchToAdminDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home'), icon: Sprout },
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'crops', label: t('crops'), icon: BookOpen },
    { id: 'diseases', label: t('diseases'), icon: ShieldAlert },
    { id: 'medicines', label: t('medicines'), icon: Droplets },
    { id: 'dosage', label: t('dosageCalc'), icon: Layers },
    { id: 'weather', label: t('weather'), icon: CloudSun },
  ];

  if (user?.role === 'ADMIN') {
    navLinks.push({ id: 'admin', label: t('adminPanel'), icon: Settings });
  }

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner with Helpline and Demo Switcher */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-emerald-300">
            🌾 {language === 'mr' ? 'किसान कॉल सेंटर हेल्पलाइन:' : language === 'hi' ? 'किसान कॉल सेंटर हेल्पलाइन:' : 'Kisan Call Center Helpline:'}
          </span>
          <a href="tel:18001801551" className="hover:underline font-bold text-white tracking-wide">
            1800-180-1551 (टोल फ्री)
          </a>
          <span className="hidden sm:inline text-emerald-400/60">|</span>
          <span className="hidden sm:inline text-emerald-200">
            {language === 'mr' ? 'प्रमाणित कृषी विद्यापीठ मार्गदर्शक' : language === 'hi' ? 'प्रमाणित कृषि विश्वविद्यालय गाइड' : 'ICAR & State Agri University Verified'}
          </span>
        </div>

        {/* Quick Demo Switcher for Evaluation */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="text-[11px] bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-2.5 py-0.5 rounded border border-emerald-700 flex items-center gap-1 transition"
          >
            <span>रोल: <strong>{user?.role === 'ADMIN' ? 'प्रशासक (Admin)' : 'शेतकरी (Farmer)'}</strong></span>
            <span className="text-[9px]">▼</span>
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 top-6 mt-1 w-52 bg-white text-stone-800 shadow-xl rounded-md border border-stone-200 p-2 z-50 text-xs">
              <p className="font-semibold text-stone-500 mb-1.5 text-[10px] uppercase tracking-wider">
                डेमो रोल बदला (Switch Role)
              </p>
              <button
                onClick={() => {
                  switchToFarmerDemo();
                  setShowRoleSwitcher(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-emerald-50 text-emerald-900 font-medium mb-1 flex items-center justify-between"
              >
                <span>👨‍🌾 शेतकरी (Sadashivrao)</span>
                {user?.role === 'FARMER' && <span className="text-emerald-600 font-bold">✓</span>}
              </button>
              <button
                onClick={() => {
                  switchToAdminDemo();
                  setShowRoleSwitcher(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between"
              >
                <span>🏛️ प्रशासक (Dr. Deshmukh)</span>
                {user?.role === 'ADMIN' && <span className="text-emerald-600 font-bold">✓</span>}
              </button>
            </div>
          )}

          <button
            onClick={onOpenArchitecture}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] px-2.5 py-0.5 rounded border border-amber-500 transition shadow-xs"
          >
            Spring Boot & MySQL Docs
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-sm">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-base sm:text-lg leading-tight tracking-tight flex items-center gap-1.5">
                <span>{t('appName')}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded uppercase">
                  Agri-Pro
                </span>
              </div>
              <div className="text-[11px] text-stone-500 hidden sm:block">
                {t('appTagline')}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50 border-b-2 border-emerald-700'
                      : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Switcher & Profile/Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown / Toggle */}
            <div className="flex items-center border border-stone-300 rounded-md bg-stone-50 p-0.5 text-xs font-semibold">
              <Languages className="w-3.5 h-3.5 text-stone-500 ml-1.5 mr-1" />
              {(['mr', 'hi', 'en'] as Language[]).map(langCode => (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`px-2 py-1 rounded transition text-xs ${
                    language === langCode
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {langCode === 'mr' ? 'मराठी' : langCode === 'hi' ? 'हिंदी' : 'EN'}
                </button>
              ))}
            </div>

            {/* User Account / Login */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
                    activeTab === 'profile'
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900'
                      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={logout}
                  title={t('logout')}
                  className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-md text-xs font-bold transition shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher Mini */}
            <div className="flex items-center border border-stone-300 rounded bg-stone-50 p-0.5 text-[11px] font-semibold">
              {(['mr', 'hi', 'en'] as Language[]).map(langCode => (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`px-1.5 py-0.5 rounded ${
                    language === langCode ? 'bg-emerald-700 text-white' : 'text-stone-600'
                  }`}
                >
                  {langCode === 'mr' ? 'मरा' : langCode === 'hi' ? 'हिं' : 'EN'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-700 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-stone-700 bg-stone-50 rounded"
            >
              <span className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-emerald-700" />
                <span>{user?.name || 'अतिथी शेतकरी'}</span>
              </span>
              <span className="text-xs text-stone-500">{user?.village || 'गाव'}</span>
            </button>

            <button
              onClick={() => {
                onOpenArchitecture();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 bg-amber-600 text-white rounded font-semibold text-xs"
            >
              Spring Boot & MySQL Architecture
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-red-700 border border-red-200 rounded hover:bg-red-50"
              >
                {t('logout')}
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-bold text-white bg-emerald-700 rounded hover:bg-emerald-800"
              >
                {t('login')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
