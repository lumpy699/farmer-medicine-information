/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { FarmerDashboard } from './components/FarmerDashboard';
import { CropDirectory } from './components/CropDirectory';
import { DiseaseIdentifier } from './components/DiseaseIdentifier';
import { MedicineDirectory } from './components/MedicineDirectory';
import { DosageCalculator } from './components/DosageCalculator';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { FarmerProfileView } from './components/FarmerProfileView';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { ArchitectureDocsModal } from './components/ArchitectureDocsModal';
import { Footer } from './components/Footer';
import { Medicine } from './types';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQueryForDisease, setSearchQueryForDisease] = useState<string>('');
  const [targetDiseaseId, setTargetDiseaseId] = useState<string>('');
  const [preselectedMedicineForCalc, setPreselectedMedicineForCalc] = useState<Medicine | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  const handleSearchFromHome = (query: string) => {
    setSearchQueryForDisease(query);
    setTargetDiseaseId('');
    setActiveTab('diseases');
  };

  const handleSelectDiseaseFromCrop = (diseaseId: string) => {
    setTargetDiseaseId(diseaseId);
    setSearchQueryForDisease('');
    setActiveTab('diseases');
  };

  const handleSelectMedicineForCalc = (med: Medicine) => {
    setPreselectedMedicineForCalc(med);
    setActiveTab('dosage');
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeHero
            onNavigate={setActiveTab}
            onSearch={handleSearchFromHome}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmerDashboard
            onNavigate={setActiveTab}
            onSearchDisease={handleSearchFromHome}
          />
        )}

        {activeTab === 'crops' && (
          <CropDirectory
            onNavigateToDisease={handleSelectDiseaseFromCrop}
          />
        )}

        {activeTab === 'diseases' && (
          <DiseaseIdentifier
            initialSearchQuery={searchQueryForDisease}
            initialDiseaseId={targetDiseaseId}
            onSelectMedicineForCalc={handleSelectMedicineForCalc}
          />
        )}

        {activeTab === 'medicines' && (
          <MedicineDirectory
            onSelectMedicineForCalc={handleSelectMedicineForCalc}
          />
        )}

        {activeTab === 'dosage' && (
          <DosageCalculator
            preselectedMedicine={preselectedMedicineForCalc}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherAdvisory />
        )}

        {activeTab === 'profile' && (
          <FarmerProfileView />
        )}

        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      <Footer
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onNavigate={setActiveTab}
      />

      {/* Auth Modal (Login & Registration) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Project Architecture, Spring Boot Code & MySQL Schema Modal */}
      <ArchitectureDocsModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
