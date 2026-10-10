import { Language } from '../types';

export const translations = {
  // Common & Branding
  appName: {
    mr: 'शेतकरी औषध माहिती प्रणाली',
    hi: 'किसान औषधि सूचना प्रणाली',
    en: 'Farmer Medicine Information System',
  },
  appTagline: {
    mr: 'स्मार्ट कृषी व्यवस्थापन आणि कीड-रोग नियंत्रण व्यासपीठ',
    hi: 'स्मार्ट कृषि प्रबंधन एवं कीट-रोग नियंत्रण मंच',
    en: 'Smart Agriculture & Crop Protection Platform',
  },
  home: { mr: 'मुख्यपृष्ठ', hi: 'होम', en: 'Home' },
  dashboard: { mr: 'माझे डॅशबोर्ड', hi: 'मेरा डैशबोर्ड', en: 'Dashboard' },
  crops: { mr: 'पिके व लागवड', hi: 'फसलें एवं खेती', en: 'Crops' },
  diseases: { mr: 'रोग व कीड निदान', hi: 'रोग व कीट पहचान', en: 'Disease Diagnosis' },
  medicines: { mr: 'औषध व फवारणी', hi: 'दवाइयां एवं छिड़काव', en: 'Medicines & Spray' },
  dosageCalc: { mr: 'डोस कॅल्क्युलेटर', hi: 'खुराक कैलकुलेटर', en: 'Dosage Calculator' },
  weather: { mr: 'हवामान व सल्ला', hi: 'मौसम एवं सलाह', en: 'Weather Advisory' },
  profile: { mr: 'माझे प्रोफाईल', hi: 'मेरी प्रोफाइल', en: 'Profile' },
  adminPanel: { mr: 'प्रशासक पॅनेल', hi: 'व्यवस्थापक पैनल', en: 'Admin Panel' },
  architectureDoc: { mr: 'प्रकल्प आर्किटेक्चर (Spring Boot)', hi: 'परियोजना आर्किटेक्चर', en: 'System Architecture (Spring Boot & MySQL)' },
  login: { mr: 'लॉगिन करा', hi: 'लॉग इन करें', en: 'Login' },
  register: { mr: 'नोंदणी करा', hi: 'रजिस्टर करें', en: 'Register' },
  logout: { mr: 'बाहेर पडा', hi: 'लॉग आउट', en: 'Logout' },
  searchPlaceholder: {
    mr: 'पिक, रोग किंवा औषधाचे नाव शोधा (उदा. कापूस बोंडअळी, टोमॅटो करपा, कोराजन)...',
    hi: 'फसल, बीमारी या दवा का नाम खोजें (उदा. कपास सुंडी, टमाटर झुलसा)...',
    en: 'Search crop, disease or medicine (e.g., Pink bollworm, Tomato blight, Coragen)...',
  },

  // Hero Section
  heroTitle: {
    mr: 'तुमच्या पिकांचे आरोग्य सुरक्षित ठेवा',
    hi: 'अपनी फसलों का स्वास्थ्य सुरक्षित रखें',
    en: 'Protect Your Crop Health with Verified Remedies',
  },
  heroSubtitle: {
    mr: 'पिकांचे रोग ओळखा, कृषी तज्ज्ञ प्रमाणित फवारणी डोस मिळवा आणि हवामानानुसार योग्य वेळी फवारणीचे नियोजन करा.',
    hi: 'फसलों के रोगों को पहचानें, कृषि विशेषज्ञों द्वारा प्रमाणित दवा खुराक जानें और मौसम अनुसार छिड़काव की योजना बनाएं।',
    en: 'Identify crop diseases accurately, get verified pesticide dosages per 15L pump, and plan sprays based on real-time weather.',
  },
  diagnoseNowBtn: { mr: 'रोगाचे त्वरित निदान करा', hi: 'रोग की तुरंत पहचान करें', en: 'Diagnose Disease Now' },
  exploreCropsBtn: { mr: 'पिकांची माहिती पहा', hi: 'फसलों की जानकारी देखें', en: 'Explore Crops' },
  calculateDoseBtn: { mr: 'फवारणी डोस काढा', hi: 'छिड़काव खुराक निकालें', en: 'Calculate Spray Dose' },

  // Stats
  verifiedMedicinesCount: { mr: 'प्रमाणित औषधे व जैविक उपचार', hi: 'प्रमाणित दवाइयां और जैविक उपचार', en: 'Verified Medicines & Biologics' },
  cropDiseasesCovered: { mr: 'पिकांवरील मुख्य रोग व कीड', hi: 'फसलों के मुख्य रोग एवं कीट', en: 'Major Diseases & Pests Covered' },
  farmerUsersCount: { mr: 'नोंदणीकृत शेतकरी बांधव', hi: 'पंजीकृत किसान भाई', en: 'Active Registered Farmers' },
  expertAdvisoryAccuracy: { mr: 'कृषी विद्यापीठ शिफारस अचूकता', hi: 'कृषि विश्वविद्यालय सिफारिश', en: 'Agri-University Verified Data' },

  // Quick Action cards
  instantScannerTitle: { mr: 'छायाचित्र / लक्षण स्कॅनर', hi: 'फोटो / लक्षण स्कैनर', en: 'Photo & Symptom Scanner' },
  instantScannerDesc: {
    mr: 'पानांचा किंवा खोडाचा फोटो अपलोड करा अथवा लक्षणे निवडून त्वरित योग्य उपचार मिळवा.',
    hi: 'पत्तियों या तने की फोटो अपलोड करें या लक्षण चुनकर तुरंत उपचार पाएं।',
    en: 'Upload crop leaf image or select visible symptoms for instant expert diagnosis.',
  },
  verifiedDoseTitle: { mr: 'प्रती १५ लिटर पंप डोस', hi: 'प्रति १५ लीटर पंप खुराक', en: '15L Spray Pump Dosage' },
  verifiedDoseDesc: {
    mr: 'अंदाज लावू नका! औषधाचे अचूक प्रमाण, सुरक्षित प्रतीक्षा कालावधी (PHI) आणि विषारीपणा वर्ग तपासा.',
    hi: 'अनुमान न लगाएं! दवा की सटीक मात्रा, प्रतीक्षा अवधि (PHI) और विषाक्तता लेबल जांचें।',
    en: 'Never guess dosages! Get exact ml/gm per backpack pump and Pre-Harvest Intervals.',
  },
  weatherSprayTitle: { mr: 'हवामान फवारणी सल्ला', hi: 'मौसम छिड़काव सलाह', en: 'Weather Spray Advisory' },
  weatherSprayDesc: {
    mr: 'हवेचा वेग, पाऊस आणि आर्द्रता तपासून फवारणी करणे योग्य आहे की नाही ते पहा.',
    hi: 'हवा की गति, बारिश की संभावना और आर्द्रता देखकर जानें कि क्या आज छिड़काव सही है।',
    en: 'Check wind speed, humidity, and rainfall probability to ensure safe spraying.',
  },

  // Disease Identification
  diseaseIdentifierTitle: { mr: 'पीक रोग व कीड ओळख केंद्र', hi: 'फसल रोग एवं कीट पहचान केंद्र', en: 'Crop Disease & Pest Identification' },
  diseaseIdentifierSubtitle: {
    mr: 'तुमचे पीक निवडा, दिसणारी लक्षणे सांगा किंवा पानांचा फोटो अपलोड करा.',
    hi: 'अपनी फसल चुनें, दिखाई देने वाले लक्षण बताएं या पत्तियों की फोटो अपलोड करें।',
    en: 'Select your crop, pick visible symptoms or upload an image to identify the disease.',
  },
  selectCropLabel: { mr: 'पीक निवडा', hi: 'फसल चुनें', en: 'Select Crop' },
  allCrops: { mr: 'सर्व पिके', hi: 'सभी फसलें', en: 'All Crops' },
  chooseSymptoms: { mr: 'झाडावर दिसणारी लक्षणे निवडा:', hi: 'पौधे पर दिखने वाले लक्षण चुनें:', en: 'Select Visible Symptoms:' },
  uploadLeafPhoto: { mr: 'किंवा पिकाच्या पानावरील डागांचा फोटो अपलोड करा:', hi: 'या फसल की पत्ती की फोटो अपलोड करें:', en: 'Or Upload Leaf / Pest Photo:' },
  clickToUpload: { mr: 'फोटो अपलोड करण्यासाठी येथे क्लिक करा किंवा ड्रॅग करा', hi: 'फोटो अपलोड करने के लिए यहां क्लिक करें', en: 'Click or drag photo to analyze' },
  analyzeSymptomsBtn: { mr: 'रोगाचे विश्लेषण करा', hi: 'रोग का विश्लेषण करें', en: 'Analyze & Identify Disease' },
  diagnosisDisclaimer: {
    mr: '* सूचना: हे विश्लेषण प्रारंभिक मार्गदर्शनासाठी आहे. गंभीर प्रादुर्भाव असल्यास जवळच्या कृषी विज्ञान केंद्रातील (KVK) कृषी शास्त्रज्ञांचा सल्ला घ्या.',
    hi: '* सूचना: यह विश्लेषण प्रारंभिक मार्गदर्शन के लिए है। गंभीर प्रकोप होने पर नजदीकी कृषि विज्ञान केंद्र (KVK) के विशेषज्ञों से संपर्क करें।',
    en: '* Disclaimer: Suggested diagnoses are for advisory guidance. For critical infestations, please consult local Krishi Vigyan Kendra (KVK) agronomists.',
  },

  // Medicine & Treatment
  treatmentTitle: { mr: 'प्रमाणित औषधोपचार आणि फवारणी नियोजन', hi: 'प्रमाणित उपचार और छिड़काव प्रबंधन', en: 'Verified Treatments & Spray Management' },
  chemicalOption: { mr: 'रासायनिक कीटकनाशक / बुरशीनाशक', hi: 'रासायनिक कीटनाशक / फफूंदनाशक', en: 'Chemical Pesticides / Fungicides' },
  organicOption: { mr: 'जैविक व नैसर्गिक उपचार (विषमुक्त)', hi: 'जैविक एवं प्राकृतिक उपचार', en: 'Organic & Biological Solutions' },
  technicalName: { mr: 'तांत्रिक घटक (Technical Name):', hi: 'तकनीकी घटक (Technical Name):', en: 'Active Technical:' },
  dosePerPump: { mr: 'प्रती १५ लिटर पंप डोस:', hi: 'प्रति १५ लीटर पंप खुराक:', en: 'Dose per 15L Pump:' },
  dosePerAcre: { mr: 'प्रती एकर (२०० लि. पाणी) डोस:', hi: 'प्रति एकड़ (२०० ली. पानी) खुराक:', en: 'Dose per Acre (200L Water):' },
  waitingPeriod: { mr: 'काढणीपूर्वी प्रतीक्षा काळ (PHI):', hi: 'कटाई से पहले प्रतीक्षा अवधि (PHI):', en: 'Pre-Harvest Interval (PHI):' },
  days: { mr: 'दिवस', hi: 'दिन', en: 'days' },
  toxicityLevel: { mr: 'विषारीपणा वर्ग:', hi: 'विषाक्तता वर्ग:', en: 'Toxicity Category:' },
  safetyPrecautions: { mr: 'सुरक्षिततेच्या सूचना व खबरदारी:', hi: 'सुरक्षा निर्देश और सावधानियां:', en: 'Safety Precautions & PPE:' },

  // Dosage Calculator
  calcTitle: { mr: 'स्मार्ट फवारणी डोस कॅल्क्युलेटर', hi: 'स्मार्ट छिड़काव खुराक कैलकुलेटर', en: 'Smart Spray Dosage Calculator' },
  calcSubtitle: {
    mr: 'तुमच्या पंपाच्या अथवा ड्रमच्या पाण्याच्या क्षमतेनुसार औषधाचे अचूक प्रमाण त्वरित काढा.',
    hi: 'अपने पंप या ड्रम की पानी की क्षमता अनुसार दवा की सही मात्रा तुरंत निकालें।',
    en: 'Calculate exact chemical and organic dosages based on your sprayer tank capacity.',
  },
  waterQuantity: { mr: 'पाण्याचे प्रमाण (लिटरमध्ये):', hi: 'पानी की मात्रा (लीटर में):', en: 'Water Quantity (in Litres):' },
  quickTankPresets: { mr: 'नेहमीचे पंप पर्याय:', hi: 'सामान्य पंप विकल्प:', en: 'Common Tank Sizes:' },
  pump15L: { mr: '१५ लिटर मॅन्युअल पंप', hi: '१५ लीटर हाथ पंप', en: '15L Manual Pump' },
  pump16L: { mr: '१६ लिटर बॅटरी पंप', hi: '१६ लीटर बैटरी पंप', en: '16L Battery Pump' },
  pump200L: { mr: '२०० लिटर ड्रम (१ एकर)', hi: '२०० लीटर ड्रम (१ एकड़)', en: '200L Barrel (1 Acre)' },
  pump500L: { mr: '५०० लिटर ट्रॅक्टर टँकर', hi: '५०० लीटर ट्रैक्टर टैंकर', en: '500L Tractor Tanker' },
  calculatedRequirement: { mr: 'आवश्यक औषधाची एकूण मात्रा:', hi: 'आवश्यक दवा की कुल मात्रा:', en: 'Total Medicine Required:' },
  spreaderStickerTip: {
    mr: 'टिप: पावसाळ्यात किंवा पानावर औषध चांगले पसरण्यासाठी १ मिली प्रती लिटर सिलिकॉन स्प्रेडर/स्टिकर अवश्य वापरा.',
    hi: 'टिप: बारिश के मौसम में या बेहतर फैलाव के लिए १ मिली प्रति लीटर सिलिकॉन स्प्रेडर/स्टिकर अवश्य मिलाएं।',
    en: 'Tip: Add 1ml per litre silicon-based spreader/sticker for rain-fastness and leaf coverage.',
  },

  // Weather Advisory
  weatherTitle: { mr: 'हवामान अंदाज व कृषी सल्ला', hi: 'मौसम पूर्वानुमान एवं कृषि सलाह', en: 'Weather Forecast & Agri Advisory' },
  selectDistrict: { mr: 'तुमचा जिल्हा निवडा:', hi: 'अपना जिला चुनें:', en: 'Select Your District:' },
  sprayStatusGood: { mr: 'फवारणीसाठी अनुकूल वातावरण', hi: 'छिड़काव के लिए अनुकूल मौसम', en: 'Excellent for Spraying' },
  sprayStatusModerate: { mr: 'सावधगिरी बाळगा (हवेचा वेग / आर्द्रता)', hi: 'सावधानी बरतें (हवा / नमी)', en: 'Moderate Spray Conditions' },
  sprayStatusBad: { mr: 'फवारणी करू नका (पाऊस / वादळ शक्यता)', hi: 'छिड़काव न करें (बारिश की संभावना)', en: 'Do Not Spray (Rain Expected)' },

  // Farmer Dashboard
  welcomeFarmer: { mr: 'रामराम / नमस्कार,', hi: 'राम-राम / नमस्ते,', en: 'Welcome,' },
  myCrops: { mr: 'माझी निवडलेली पिके', hi: 'मेरी चुनी हुई फसलें', en: 'My Selected Crops' },
  addCrop: { mr: '+ पीक जोडा', hi: '+ फसल जोड़ें', en: '+ Add Crop' },
  recentSearches: { mr: 'माझे अलीकडील शोध', hi: 'मेरी हालिया खोजें', en: 'Recent Searches' },
  spraySchedule: { mr: 'नियोजित फवारणी कॅलेंडर', hi: 'नियोजित छिड़काव कैलेंडर', en: 'Upcoming Spray Calendar' },
  dailyAgriTip: { mr: 'आजचा कृषी सल्ला', hi: 'आज की कृषि सलाह', en: 'Today’s Agri Tip' },

  // Admin
  adminTitle: { mr: 'प्रशासक नियंत्रण केंद्र (Admin Portal)', hi: 'व्यवस्थापक नियंत्रण केंद्र', en: 'Administrator Management Portal' },
  manageCrops: { mr: 'पिके व्यवस्थापन', hi: 'फसल प्रबंधन', en: 'Manage Crops' },
  manageDiseases: { mr: 'रोग व कीड नोंदी', hi: 'रोग व कीट रिकॉर्ड', en: 'Manage Diseases' },
  manageMedicines: { mr: 'औषध व डोस मान्यता', hi: 'दवा व खुराक सत्यापन', en: 'Verified Medicines' },
  registeredFarmers: { mr: 'नोंदणीकृत शेतकरी', hi: 'पंजीकृत किसान', en: 'Registered Farmers' },
  addNewRecord: { mr: '+ नवीन नोंद जोडा', hi: '+ नया रिकॉर्ड जोड़ें', en: '+ Add New Record' },

  // Form Fields
  nameLabel: { mr: 'शेतकऱ्याचे पूर्ण नाव', hi: 'किसान का पूरा नाम', en: 'Farmer Full Name' },
  mobileLabel: { mr: 'मोबाईल नंबर', hi: 'मोबाइल नंबर', en: 'Mobile Number' },
  emailLabel: { mr: 'ईमेल पत्ता', hi: 'ईमेल पता', en: 'Email Address' },
  villageLabel: { mr: 'गाव / तालुका', hi: 'गांव / तहसील', en: 'Village / Taluka' },
  districtLabel: { mr: 'जिल्हा', hi: 'जिला', en: 'District' },
  landAreaLabel: { mr: 'शेतजमीन (एकरमध्ये)', hi: 'खेती की जमीन (एकड़ में)', en: 'Farmland (in Acres)' },
  passwordLabel: { mr: 'पासवर्ड', hi: 'पासवर्ड', en: 'Password' },
  submitBtn: { mr: 'जतन करा / पुढे जा', hi: 'सेव करें / आगे बढ़ें', en: 'Save / Proceed' },
  cancelBtn: { mr: 'रद्द करा', hi: 'रद्द करें', en: 'Cancel' },

  // Toxicity categories
  greenLabel: { mr: 'हिरवा त्रिकोण (किमान विषारी - सुरक्षित)', hi: 'हरा त्रिकोण (कम विषैला)', en: 'Green Triangle (Slightly Toxic)' },
  blueLabel: { mr: 'निळा त्रिकोण (मध्यम विषारी)', hi: 'नीला त्रिकोण (मध्यम विषैला)', en: 'Blue Triangle (Moderately Toxic)' },
  yellowLabel: { mr: 'पिवळा त्रिकोण (अत्यंत विषारी)', hi: 'पीला त्रिकोण (अत्यधिक विषैला)', en: 'Yellow Triangle (Highly Toxic)' },
  redLabel: { mr: 'लाल त्रिकोण (अतिघातक विषारी)', hi: 'लाल त्रिकोण (अति विषैला)', en: 'Red Triangle (Extremely Toxic)' },
};

export const getTranslation = (key: keyof typeof translations, lang: Language): string => {
  const item = translations[key];
  if (!item) return key;
  return item[lang] || item['en'];
};
