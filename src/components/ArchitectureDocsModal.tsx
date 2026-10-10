import React, { useState } from 'react';
import { SPRING_BOOT_PROJECT_FILES, CodeFile } from '../data/springBootCode';
import {
  X,
  FileCode,
  Database,
  Server,
  Layers,
  Copy,
  Check,
  Download,
  Terminal,
  Cpu,
  Workflow,
  BookOpen,
} from 'lucide-react';

interface ArchitectureDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocsModal: React.FC<ArchitectureDocsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(SPRING_BOOT_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'database_er' | 'code_browser' | 'api_endpoints'>('architecture');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-stone-900 text-stone-100 rounded-2xl max-w-6xl w-full h-[90vh] flex flex-col shadow-2xl border border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  System Architecture, Spring Boot & MySQL Engine
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono">
                  Final Year IT Engineering
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Full-stack project blueprint: REST APIs, 10-table normalized database, JWT security, and agronomy engine.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-900 px-5 gap-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>1. System Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('database_er')}
            className={`py-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'database_er'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>2. MySQL ER Diagram (10 Tables)</span>
          </button>

          <button
            onClick={() => setActiveTab('code_browser')}
            className={`py-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'code_browser'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>3. Spring Boot Source Code</span>
          </button>

          <button
            onClick={() => setActiveTab('api_endpoints')}
            className={`py-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'api_endpoints'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>4. REST API Endpoints</span>
          </button>
        </div>

        {/* Tab 1: System Architecture Diagram */}
        {activeTab === 'architecture' && (
          <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-[11px]">
                  Frontend Presentation Layer
                </span>
                <h4 className="text-sm font-extrabold text-white">React 19 + TypeScript + Tailwind</h4>
                <ul className="list-disc pl-4 space-y-1 text-stone-400">
                  <li>Multilingual Engine (Marathi default, Hindi, English)</li>
                  <li>15L Backpack Pump & 200L Drum Dosage Calculator</li>
                  <li>Symptom matcher & Leaf Image Scanner</li>
                  <li>Real-time Open-Meteo Weather Integration</li>
                  <li>Role-Based UI (Farmer & Administrator)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[11px]">
                  Backend Application Layer
                </span>
                <h4 className="text-sm font-extrabold text-white">Java 17 + Spring Boot 3.3.x</h4>
                <ul className="list-disc pl-4 space-y-1 text-stone-400">
                  <li>Spring Security 6 with BCrypt & Stateless JWT</li>
                  <li>RESTful Controllers with DTO validation</li>
                  <li>Spring Data JPA & Hibernate ORM mapping</li>
                  <li>Agronomy disease-matching algorithm</li>
                  <li>Weather aggregation service with fallback cache</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-blue-400 font-bold uppercase tracking-wider block text-[11px]">
                  Persistence & Data Layer
                </span>
                <h4 className="text-sm font-extrabold text-white">MySQL 8.0 Relational Database</h4>
                <ul className="list-disc pl-4 space-y-1 text-stone-400">
                  <li>10 Normalized Third Normal Form (3NF) Tables</li>
                  <li>CIBRC verified active chemical formulations</li>
                  <li>Bi-directional Foreign Keys with CASCADE rules</li>
                  <li>B-tree indexes on mobile, technicalName, cropId</li>
                  <li>Full UTF8MB4 Devanagari multilingual charset</li>
                </ul>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="p-5 bg-stone-950 rounded-xl border border-stone-800 space-y-3 font-mono text-[11px]">
              <span className="text-stone-400 font-bold uppercase tracking-wider">
                End-to-End Workflow & Request Lifecycle:
              </span>
              <div className="p-4 bg-stone-900 rounded-lg text-emerald-400 border border-stone-800 overflow-x-auto leading-relaxed">
                {`[Farmer Client / Browser]
       │
       ├── (1) HTTP POST /api/v1/auth/login ──────> [Spring Security / JWT Filter]
       │                                                 │ validates BCrypt hash in MySQL 'users'
       │
       ├── (2) HTTP POST /api/v1/diseases/diagnose ──> [DiseaseController]
       │         { cropId: 1, symptoms: ["बोंडअळी"] }     │
       │                                                 ▼
       │                                            [DiseaseService]
       │                                                 │ queries CropDiseaseRepository
       │                                                 ▼
       │                                            [MySQL: crop_diseases JOIN medicines]
       │                                                 │ computes overlap confidence
       │                                                 ▼
       │   <── Returns Verified 15L Dosage & PHI ────────┘
       │
       └── (3) HTTP GET /api/v1/weather/forecast ─────> [WeatherService]
                                                         │ calls Open-Meteo REST API
                                                         ▼
                                                    [Spray Suitability Evaluation Engine]`}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MySQL Relational ER Diagram */}
        {activeTab === 'database_er' && (
          <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Entity-Relationship (ER) Schema Overview
                </h3>
                <p className="text-stone-400 text-xs">
                  10 normalized relational tables in 3NF schema defined in <code className="text-amber-400 font-mono">database/schema.sql</code>
                </p>
              </div>

              <span className="bg-stone-800 text-amber-300 border border-stone-700 px-3 py-1 rounded text-xs font-mono">
                Engine: InnoDB | Charset: utf8mb4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Table 1 */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                  <span className="font-bold text-white font-mono">users</span>
                  <span className="text-[10px] text-amber-400">PK: id</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-stone-400">
                  <div>+ id: BIGINT (PK)</div>
                  <div>+ full_name: VARCHAR(150)</div>
                  <div>+ mobile_number: VARCHAR(15) (UNIQUE)</div>
                  <div>+ email: VARCHAR(120) (UNIQUE)</div>
                  <div>+ password_hash: VARCHAR(255)</div>
                  <div>+ role: ENUM('FARMER', 'ADMIN')</div>
                </div>
              </div>

              {/* Table 2 */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                  <span className="font-bold text-white font-mono">farmer_profiles</span>
                  <span className="text-[10px] text-blue-400">FK: user_id</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-stone-400">
                  <div>+ id: BIGINT (PK)</div>
                  <div>+ user_id: BIGINT (FK -&gt; users.id)</div>
                  <div>+ village, district, state</div>
                  <div>+ land_area_acres: DECIMAL(6,2)</div>
                  <div>+ preferred_language: ENUM</div>
                </div>
              </div>

              {/* Table 3 */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                  <span className="font-bold text-white font-mono">crops</span>
                  <span className="text-[10px] text-amber-400">PK: id</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-stone-400">
                  <div>+ id: BIGINT (PK)</div>
                  <div>+ crop_code: VARCHAR(50) (UNIQUE)</div>
                  <div>+ name_mr, name_hi, name_en</div>
                  <div>+ botanical_name, npk_ratio</div>
                  <div>+ category, suitable_season</div>
                </div>
              </div>

              {/* Table 4 */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                  <span className="font-bold text-white font-mono">crop_diseases</span>
                  <span className="text-[10px] text-blue-400">FK: crop_id</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-stone-400">
                  <div>+ id: BIGINT (PK)</div>
                  <div>+ crop_id: BIGINT (FK -&gt; crops.id)</div>
                  <div>+ name_mr, name_hi, name_en</div>
                  <div>+ category: ENUM (FUNGAL, PEST...)</div>
                  <div>+ severity: ENUM (LOW..CRITICAL)</div>
                </div>
              </div>

              {/* Table 5 */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                  <span className="font-bold text-white font-mono">medicines</span>
                  <span className="text-[10px] text-amber-400">PK: id</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-stone-400">
                  <div>+ id: BIGINT (PK)</div>
                  <div>+ commercial_name_mr, name_en</div>
                  <div>+ technical_name: VARCHAR(250)</div>
                  <div>+ toxicity_category: ENUM (GREEN..)</div>
                  <div>+ dose_per_pump_15l, dose_per_acre</div>
                  <div>+ pre_harvest_interval_days: INT</div>
                </div>
              </div>

              {/* Table 6 */}
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                  <span className="font-bold text-white font-mono">treatment_medicines</span>
                  <span className="text-[10px] text-purple-400">Junction M:N</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-stone-400">
                  <div>+ treatment_id (FK -&gt; treatments.id)</div>
                  <div>+ medicine_id (FK -&gt; medicines.id)</div>
                  <div>+ specific_dosage_notes</div>
                  <div>PRIMARY KEY (treatment_id, medicine_id)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Code Browser with Copy & Download */}
        {activeTab === 'code_browser' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left File Tree Sidebar */}
            <div className="w-full md:w-72 bg-stone-950 border-r border-stone-800 p-3 space-y-1 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold text-stone-500 px-2 block mb-2">
                Backend Source Tree
              </span>
              {SPRING_BOOT_PROJECT_FILES.map(file => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center justify-between ${
                    selectedFile.path === file.path
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                      : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                  }`}
                >
                  <span className="truncate">{file.filename}</span>
                  <span className="text-[9px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400">
                    {file.category}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Code Display */}
            <div className="flex-1 flex flex-col bg-stone-900 overflow-hidden">
              {/* Code toolbar */}
              <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white font-mono">{selectedFile.path}</span>
                  <p className="text-[11px] text-stone-400">{selectedFile.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs px-3 py-1.5 rounded-lg border border-stone-700 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="flex-1 p-4 overflow-auto font-mono text-xs text-stone-200 bg-stone-900">
                <pre className="whitespace-pre">
                  <code>{selectedFile.code}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: REST API Endpoints */}
        {activeTab === 'api_endpoints' && (
          <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-300">
            <h3 className="text-base font-extrabold text-white">
              REST API Endpoints Specification (Spring Boot Web Controller)
            </h3>

            <div className="space-y-3 font-mono">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-bold">GET</span>
                  <span className="text-white font-bold">/api/v1/crops</span>
                </div>
                <p className="text-stone-400 text-[11px]">Returns all crop agronomy profiles, NPK ratios, and soil instructions.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded font-bold">POST</span>
                  <span className="text-white font-bold">/api/v1/diseases/diagnose</span>
                </div>
                <p className="text-stone-400 text-[11px]">Submits cropId & symptom array. Returns matching diseases and verified 15L chemical & organic doses.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-bold">GET</span>
                  <span className="text-white font-bold">/api/v1/medicines</span>
                </div>
                <p className="text-stone-400 text-[11px]">Lists CIBRC approved active technical formulations with toxicity triangle classifications.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-900 text-purple-300 px-2 py-0.5 rounded font-bold">POST</span>
                  <span className="text-white font-bold">/api/v1/auth/login</span>
                </div>
                <p className="text-stone-400 text-[11px]">Authenticates mobile/email and returns signed JWT Bearer token.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
