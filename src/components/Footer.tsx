import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, PhoneCall, ShieldCheck, HeartHandshake, Layers } from 'lucide-react';

interface FooterProps {
  onOpenArchitecture: () => void;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchitecture, onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About & App Name */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="font-extrabold text-white text-base">
                {t('appName')}
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              {language === 'mr'
                ? 'शेतकरी बांधवांसाठी कीड व रोग नियंत्रण, प्रमाणित औषध डोस आणि हवामान सल्ला देणारी एकात्मिक कृषी व्यवस्थापन प्रणाली.'
                : 'Smart agriculture management platform dedicated to crop disease diagnosis, verified dosages per 15L pump, and meteorological spray advisory.'}
            </p>
            <div className="pt-1">
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                CIBRC & ICAR Certified Knowledge Base
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'mr' ? 'जलद दुवे' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('diseases')} className="hover:text-emerald-400 transition">
                  {t('diseases')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dosage')} className="hover:text-emerald-400 transition">
                  {t('dosageCalc')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('weather')} className="hover:text-emerald-400 transition">
                  {t('weather')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('crops')} className="hover:text-emerald-400 transition">
                  {t('crops')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Helpline Numbers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'mr' ? 'आपत्कालीन कृषी हेल्पलाइन' : 'Emergency Agri Helplines'}</span>
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
                <span className="text-stone-400 block text-[10px]">किसान कॉल सेंटर (Kisan Call Center):</span>
                <a href="tel:18001801551" className="text-emerald-400 font-bold text-xs hover:underline">
                  1800-180-1551 (टोल फ्री)
                </a>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700">
                <span className="text-stone-400 block text-[10px]">विष नियंत्रण केंद्र (National Poison Control):</span>
                <span className="text-red-400 font-bold text-xs">
                  1800-116-117 (AIIMS Poison Centre)
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Project & Research Specs */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'mr' ? 'प्रकल्प आर्किटेक्चर' : 'Project Architecture'}</span>
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Spring Boot REST API, 10-Table MySQL Normalized Schema, JWT Security and React client.
            </p>
            <button
              onClick={onOpenArchitecture}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Spring Boot & MySQL Docs</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © 2026 {t('appName')} · Final Year Engineering Project Deliverable
          </div>
          <div className="flex items-center gap-4">
            <span>MPKV Rahuri / ICAR Agronomy Data</span>
            <span>·</span>
            <span>CIBRC Approved Formulations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
