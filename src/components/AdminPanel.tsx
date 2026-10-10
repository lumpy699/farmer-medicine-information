import React, { useState } from 'react';
import { Crop, Disease, Medicine, User } from '../types';
import { INITIAL_CROPS, INITIAL_DISEASES, INITIAL_MEDICINES, INITIAL_USERS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  Settings,
  BookOpen,
  ShieldAlert,
  Droplets,
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  X,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { language, t } = useLanguage();

  const [activeAdminTab, setActiveAdminTab] = useState<'crops' | 'diseases' | 'medicines' | 'users'>('crops');
  const [cropsList, setCropsList] = useState<Crop[]>(INITIAL_CROPS);
  const [diseaseList, setDiseaseList] = useState<Disease[]>(INITIAL_DISEASES);
  const [medicinesList, setMedicinesList] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);

  // Modal for adding a new crop
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [newCropNameMr, setNewCropNameMr] = useState('');
  const [newCropNameEn, setNewCropNameEn] = useState('');
  const [newCropBotanical, setNewCropBotanical] = useState('');
  const [newCropCategory, setNewCropCategory] = useState<Crop['category']>('CASH_CROP');
  const [newCropSeason, setNewCropSeason] = useState<Crop['season']>('KHARIF');
  const [newCropDuration, setNewCropDuration] = useState('120 - 140 दिवस');
  const [newCropNpk, setNewCropNpk] = useState('100:50:50');

  // Modal for adding a new medicine
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [newMedNameMr, setNewMedNameMr] = useState('');
  const [newMedTechnical, setNewMedTechnical] = useState('');
  const [newMedDose15L, setNewMedDose15L] = useState('5 ml');
  const [newMedDose200L, setNewMedDose200L] = useState('70 ml');
  const [newMedToxicity, setNewMedToxicity] = useState<Medicine['toxicityColor']>('GREEN');

  const handleDeleteCrop = (id: string) => {
    setCropsList(prev => prev.filter(c => c.id !== id));
  };

  const handleDeleteDisease = (id: string) => {
    setDiseaseList(prev => prev.filter(d => d.id !== id));
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicinesList(prev => prev.filter(m => m.id !== id));
  };

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropNameMr || !newCropNameEn) return;

    const newCrop: Crop = {
      id: `crop-${Date.now()}`,
      name: { mr: newCropNameMr, hi: newCropNameMr, en: newCropNameEn },
      botanicalName: newCropBotanical || 'Botanical sp.',
      category: newCropCategory,
      season: newCropSeason,
      imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      soil: {
        mr: 'मध्यम ते भारी, उत्तम निचऱ्याची कसदार जमीन.',
        hi: 'अच्छे निकास वाली दोमट मिट्टी।',
        en: 'Well drained fertile loam soil.',
      },
      phRange: '6.5 - 7.5',
      durationDays: newCropDuration,
      irrigation: {
        mr: 'नियमित ठिबक सिंचन.',
        hi: 'ड्रिप सिंचाई।',
        en: 'Regular drip irrigation.',
      },
      fertilizers: {
        npkRatio: newCropNpk,
        schedule: [
          {
            stage: { mr: 'पेरणीवेळी (Basal)', hi: 'बुआई समय', en: 'Basal Dose' },
            dose: { mr: 'पूर्ण स्फुरद व पालाश + अर्धे नत्र', hi: 'डीएपी + पोटाश', en: 'Full P, K + half N' },
          },
        ],
      },
      cultivationSteps: [
        {
          step: { mr: 'मशागत व पेरणी', hi: 'बुआई', en: 'Sowing' },
          desc: { mr: 'योग्य खोलीवर टोकण पद्धतीने पेरणी करावी.', hi: 'सही गहराई पर बुआई करें।', en: 'Sow at proper depth.' },
        },
      ],
      commonDiseasesCount: 1,
    };

    setCropsList(prev => [newCrop, ...prev]);
    setIsAddCropModalOpen(false);
    setNewCropNameMr('');
    setNewCropNameEn('');
  };

  const handleCreateMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedNameMr || !newMedTechnical) return;

    const newMed: Medicine = {
      id: `med-${Date.now()}`,
      commercialName: { mr: newMedNameMr, hi: newMedNameMr, en: newMedNameMr },
      technicalName: newMedTechnical,
      type: 'CHEMICAL_INSECTICIDE',
      toxicityColor: newMedToxicity,
      toxicityLabel: {
        mr: `${newMedToxicity} त्रिकोण`,
        hi: `${newMedToxicity} त्रिकोण`,
        en: `${newMedToxicity} label`,
      },
      dosePerPump15L: newMedDose15L,
      dosePerAcre200L: newMedDose200L,
      applicationMethod: {
        mr: 'सकाळच्या किंवा संध्याकाळच्या वेळी एकसारखी फवारणी.',
        hi: 'सुबह या शाम को छिड़काव करें।',
        en: 'Foliar spray in morning/evening.',
      },
      waitingPeriodDays: 7,
      precautions: {
        mr: ['मास्क व हातमोजे वापरावे.'],
        hi: ['मास्क पहनें।'],
        en: ['Wear protective gear.'],
      },
      approvedCrops: ['Cotton', 'Soybean', 'Onion'],
      approxCostPerPack: '₹250',
    };

    setMedicinesList(prev => [newMed, ...prev]);
    setIsAddMedModalOpen(false);
    setNewMedNameMr('');
    setNewMedTechnical('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-700" />
            <span>{t('adminTitle')}</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'कृषी अधिकारी व पोर्टल प्रशासकांसाठी पिके, रोग, औषध डोस आणि शेतकरी वापरकर्ते व्यवस्थापन.'
              : 'Full agricultural CRUD management portal for crops, disease records, verified dosages, and users.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full border border-emerald-300">
            ✓ ROLE_ADMIN (सक्रिय)
          </span>
        </div>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-bold block">एकूण पिके (Crops)</span>
          <span className="text-2xl font-black text-stone-900 mt-1 block">{cropsList.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-bold block">रोग व कीड नोंदी (Diseases)</span>
          <span className="text-2xl font-black text-stone-900 mt-1 block">{diseaseList.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-bold block">प्रमाणित औषधे (Medicines)</span>
          <span className="text-2xl font-black text-stone-900 mt-1 block">{medicinesList.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-bold block">नोंदणीकृत शेतकरी (Users)</span>
          <span className="text-2xl font-black text-stone-900 mt-1 block">{usersList.length}</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-stone-200 bg-stone-50 p-2 gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('crops')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'crops'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('manageCrops')}</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('diseases')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'diseases'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t('manageDiseases')}</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('medicines')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'medicines'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>{t('manageMedicines')}</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'users'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t('registeredFarmers')}</span>
          </button>
        </div>

        {/* Tab 1: Crops Management */}
        {activeAdminTab === 'crops' && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-stone-900">सर्व पिके यादी ({cropsList.length})</h2>
              <button
                onClick={() => setIsAddCropModalOpen(true)}
                className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2 px-3.5 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('addNewRecord')}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">पीक नाव</th>
                    <th className="p-3">वनस्पती नाव (Botanical)</th>
                    <th className="p-3">वर्गवारी</th>
                    <th className="p-3">हंगाम</th>
                    <th className="p-3">NPK खत प्रमाण</th>
                    <th className="p-3 text-right">कृती</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {cropsList.map(c => (
                    <tr key={c.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">{c.name.mr} ({c.name.en})</td>
                      <td className="p-3 italic text-stone-600">{c.botanicalName}</td>
                      <td className="p-3">{c.category}</td>
                      <td className="p-3 font-semibold text-emerald-800">{c.season}</td>
                      <td className="p-3">{c.fertilizers.npkRatio}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteCrop(c.id)}
                          className="text-red-600 hover:text-red-800 font-bold p-1 rounded hover:bg-red-50"
                          title="हटवा"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Disease Management */}
        {activeAdminTab === 'diseases' && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-stone-900">नोंदवलेले रोग व कीड ({diseaseList.length})</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">रोगाचे नाव</th>
                    <th className="p-3">प्रभावित पीक</th>
                    <th className="p-3">प्रकार</th>
                    <th className="p-3">तीव्रता</th>
                    <th className="p-3">रासायनिक औषध</th>
                    <th className="p-3 text-right">कृती</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {diseaseList.map(d => (
                    <tr key={d.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">{d.name.mr}</td>
                      <td className="p-3 font-semibold text-emerald-800">{d.cropName.mr}</td>
                      <td className="p-3">{d.category}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                          {d.severity}
                        </span>
                      </td>
                      <td className="p-3 text-stone-600">
                        {d.chemicalTreatments.map(m => m.commercialName.mr).join(', ')}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteDisease(d.id)}
                          className="text-red-600 hover:text-red-800 font-bold p-1 rounded hover:bg-red-50"
                          title="हटवा"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Medicines Management */}
        {activeAdminTab === 'medicines' && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-stone-900">CIBRC प्रमाणित औषधे ({medicinesList.length})</h2>
              <button
                onClick={() => setIsAddMedModalOpen(true)}
                className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2 px-3.5 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ औषध जोडा</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">ब्रँड नाव</th>
                    <th className="p-3">तांत्रिक घटक (Technical Name)</th>
                    <th className="p-3">१५ लि. पंप डोस</th>
                    <th className="p-3">२०० लि. एकर डोस</th>
                    <th className="p-3">विषारी वर्ग</th>
                    <th className="p-3 text-right">कृती</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {medicinesList.map(m => (
                    <tr key={m.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">{m.commercialName.mr}</td>
                      <td className="p-3 font-mono text-emerald-800">{m.technicalName}</td>
                      <td className="p-3 font-bold text-emerald-900">{m.dosePerPump15L}</td>
                      <td className="p-3">{m.dosePerAcre200L}</td>
                      <td className="p-3 font-semibold">{m.toxicityColor}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteMedicine(m.id)}
                          className="text-red-600 hover:text-red-800 font-bold p-1 rounded hover:bg-red-50"
                          title="हटवा"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Users Management */}
        {activeAdminTab === 'users' && (
          <div className="p-6 space-y-4">
            <h2 className="text-base font-bold text-stone-900">नोंदणीकृत शेतकरी यादी ({usersList.length})</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">शेतकऱ्याचे नाव</th>
                    <th className="p-3">मोबाईल</th>
                    <th className="p-3">ईमेल</th>
                    <th className="p-3">गाव व जिल्हा</th>
                    <th className="p-3">शेतजमीन</th>
                    <th className="p-3">भूमिका (Role)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {usersList.map(u => (
                    <tr key={u.id} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900">{u.name}</td>
                      <td className="p-3 font-mono">{u.mobile}</td>
                      <td className="p-3 text-stone-500">{u.email}</td>
                      <td className="p-3">{u.village}, {u.district}</td>
                      <td className="p-3 font-semibold">{u.landAreaAcres || 0} एकर</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-900' : 'bg-emerald-100 text-emerald-900'}`}>
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Crop Modal */}
      {isAddCropModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
              <h3 className="font-bold text-stone-900 text-base">नवीन पीक नोंदवा (Add Crop)</h3>
              <button onClick={() => setIsAddCropModalOpen(false)}>
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <form onSubmit={handleCreateCrop} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">पीक नाव (मराठी) *</label>
                <input
                  type="text"
                  required
                  value={newCropNameMr}
                  onChange={e => setNewCropNameMr(e.target.value)}
                  placeholder="उदा. हळद"
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">पीक नाव (English) *</label>
                <input
                  type="text"
                  required
                  value={newCropNameEn}
                  onChange={e => setNewCropNameEn(e.target.value)}
                  placeholder="e.g. Turmeric"
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">वनस्पती नाव (Botanical)</label>
                <input
                  type="text"
                  value={newCropBotanical}
                  onChange={e => setNewCropBotanical(e.target.value)}
                  placeholder="Curcuma longa"
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">वर्गवारी</label>
                  <select
                    value={newCropCategory}
                    onChange={e => setNewCropCategory(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs font-semibold"
                  >
                    <option value="CASH_CROP">नगदी पीक</option>
                    <option value="VEGETABLE">भाजीपाला</option>
                    <option value="CEREAL">अन्नधान्य</option>
                    <option value="OILSEED">गळित धान्य</option>
                    <option value="HORTICULTURE">फळबाग</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">हंगाम</label>
                  <select
                    value={newCropSeason}
                    onChange={e => setNewCropSeason(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs font-semibold"
                  >
                    <option value="KHARIF">खरीप</option>
                    <option value="RABI">रब्बी</option>
                    <option value="ANNUAL">वार्षिक</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddCropModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 font-semibold"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded font-bold"
                >
                  जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
              <h3 className="font-bold text-stone-900 text-base">नवीन औषध नोंदणी (Add Medicine)</h3>
              <button onClick={() => setIsAddMedModalOpen(false)}>
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <form onSubmit={handleCreateMedicine} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">ब्रँड / व्यापारी नाव *</label>
                <input
                  type="text"
                  required
                  value={newMedNameMr}
                  onChange={e => setNewMedNameMr(e.target.value)}
                  placeholder="उदा. अलिका (Alika)"
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">तांत्रिक घटक (Technical Name) *</label>
                <input
                  type="text"
                  required
                  value={newMedTechnical}
                  onChange={e => setNewMedTechnical(e.target.value)}
                  placeholder="Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC"
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">१५ लि. पंप डोस</label>
                  <input
                    type="text"
                    value={newMedDose15L}
                    onChange={e => setNewMedDose15L(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">२०० लि. एकर डोस</label>
                  <input
                    type="text"
                    value={newMedDose200L}
                    onChange={e => setNewMedDose200L(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">विषारीपणा वर्ग (Toxicity Label)</label>
                <select
                  value={newMedToxicity}
                  onChange={e => setNewMedToxicity(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-xs font-semibold"
                >
                  <option value="GREEN">🟢 हिरवा त्रिकोण (Green - Safe)</option>
                  <option value="BLUE">🔵 निळा त्रिकोण (Blue - Moderate)</option>
                  <option value="YELLOW">🟡 पिवळा त्रिकोण (Yellow - High)</option>
                  <option value="RED">🔴 लाल त्रिकोण (Red - Extremely Toxic)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 font-semibold"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded font-bold"
                >
                  मान्यता द्या व जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
