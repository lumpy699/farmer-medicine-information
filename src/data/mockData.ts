import { Crop, Disease, Medicine, User, WeatherData } from '../types';

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'crop-cotton',
    name: {
      mr: 'कापूस (पांढरे सोने)',
      hi: 'कपास (कॉटन)',
      en: 'Cotton (White Gold)',
    },
    botanicalName: 'Gossypium hirsutum',
    category: 'CASH_CROP',
    season: 'KHARIF',
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'मध्यम ते भारी, उत्तम निचऱ्याची काळी कसदार जमीन (रेगूर माती), खोली किमान ९० सें.मी.',
      hi: 'मध्यम से भारी, अच्छे जल निकास वाली काली उपजाऊ मिट्टी (रेगुर मिट्टी), गहराई न्यूनतम ९० सेमी।',
      en: 'Medium to deep, well-drained black cotton soil (Regur), rich in clay, depth >90 cm.',
    },
    phRange: '6.5 - 8.0',
    durationDays: '150 - 180 दिवस',
    irrigation: {
      mr: 'ठिबक सिंचन उत्तम. बोंडे भरण्याच्या आणि फुलधारणेच्या अवस्थेत पाण्याचा ताण पडू देऊ नये.',
      hi: 'ड्रिप सिंचाई सर्वोत्तम। फूल आने और गूलर (टिंडे) बनने की अवस्था में सिंचाई बहुत महत्वपूर्ण है।',
      en: 'Drip irrigation recommended. Critical stages: Flowering, square formation, and boll development.',
    },
    fertilizers: {
      npkRatio: '120:60:60 kg/Ha',
      schedule: [
        {
          stage: { mr: 'पेरणीच्या वेळी (Basal)', hi: 'बुआई के समय', en: 'At Sowing' },
          dose: { mr: '२०% नत्र, पूर्ण स्फुरद व पालाश (१०:२६:२६ किंवा डीएपी)', hi: '२०% यूरिया, पूर्ण डीएपी और पोटाश', en: '20% N, 100% P and K' },
        },
        {
          stage: { mr: 'पेरणीनंतर ३०-३५ दिवस', hi: 'बुआई के ३०-३५ दिन बाद', en: '30-35 Days after sowing' },
          dose: { mr: '४०% नत्र (युरिया) व सूक्ष्म अन्नद्रव्ये फवारणी', hi: '४०% यूरिया छिड़काव', en: '40% Nitrogen top dress' },
        },
        {
          stage: { mr: 'बोंड भरण्याची अवस्था (६० दिवस)', hi: 'टिंडे भरने के समय (६० दिन)', en: 'Boll formation (60 days)' },
          dose: { mr: 'उर्वरित ४०% नत्र + १९:१९:१९ व बोरॉन १ ग्रॅम/लि फवारणी', hi: 'बचा हुआ यूरिया + १९:१९:१९ छिड़काव', en: 'Remaining N + 19:19:19 + Boron' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'जमीन मशागत व नांगरणी', hi: 'खेत की जुताई व तैयारी', en: 'Land Preparation' },
        desc: { mr: 'उन्हाळ्यात खोल नांगरट करून रोटाव्हेटर फिरवून ढेकळे फोडावीत. हेक्टरी १० टन शेणखत मिसळावे.', hi: 'गहरी जुताई कर १० टन गोबर की खाद मिलाएं।', en: 'Deep ploughing during summer, apply 10 tonnes FYM/ha.' },
      },
      {
        step: { mr: 'बीजप्रक्रिया', hi: 'बीजोपचार', en: 'Seed Treatment' },
        desc: { mr: 'इमिडाक्लोप्रिड ७० WS ५ ग्रॅम + ट्रायकोडर्मा ५ ग्रॅम प्रती किलो बियाणे चोळावे.', hi: 'इमिडाक्लोप्रिड ५ ग्राम + ट्राइकोडर्मा ५ ग्राम प्रति किलो बीज।', en: 'Treat with Imidacloprid 70 WS (5g) + Trichoderma (5g) per kg.' },
      },
      {
        step: { mr: 'पेरणी व अंतर', hi: 'बुआई व दूरी', en: 'Sowing & Spacing' },
        desc: { mr: 'मध्यम जमिनीसाठी ४ x १.५ फूट किंवा ५ x १.५ फूट अंतरावर टोकण पद्धतीने पेरणी करावी.', hi: '४ x १.५ फीट दूरी पर टोकन विधि से बुआई करें।', en: 'Pair row or 4x1.5 ft spacing for Bt Cotton.' },
      },
      {
        step: { mr: 'आंतरमशागत व कीड नियंत्रण', hi: 'निराई-गुड़ाई एवं कीट प्रबंधन', en: 'Weeding & Pest Management' },
        desc: { mr: 'पेरणीनंतर २० आणि ४० दिवसांनी कोळपणी व खुरपणी करावी. फेरोमोन ट्रॅप लावावेत.', hi: '२० व ४० दिन बाद खुरपाई करें। फेरोमोन ट्रैप लगाएं।', en: 'Hoeing at 20 & 40 DAS, install pheromone traps for bollworm.' },
      },
    ],
    commonDiseasesCount: 3,
  },
  {
    id: 'crop-soybean',
    name: {
      mr: 'सोयाबीन (पिवळे सोने)',
      hi: 'सोयाबीन',
      en: 'Soybean',
    },
    botanicalName: 'Glycine max',
    category: 'OILSEED',
    season: 'KHARIF',
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'मध्यम ते काळी, पाण्याचा चांगला निचरा होणारी जमीन. पाणथळ चोपण जमिनीत पेरणी टाळावी.',
      hi: 'मध्यम से भारी दोमट मिट्टी, जल निकासी उत्तम होनी चाहिए।',
      en: 'Well-drained medium loam to clay loam soils with high organic matter.',
    },
    phRange: '6.0 - 7.5',
    durationDays: '90 - 105 दिवस',
    irrigation: {
      mr: 'पावसाच्या पाण्यावर येणारे पीक; मात्र शेंगा भरताना पावसाचा खंड पडल्यास संरक्षक पाणी द्यावे.',
      hi: 'वर्षा आधारित फसल, लेकिन फलियां भरते समय सिंचाई आवश्यक है।',
      en: 'Rainfed; critical protective irrigation at flowering and pod filling stages.',
    },
    fertilizers: {
      npkRatio: '30:60:30:20 (NPK + Sulphur) kg/Ha',
      schedule: [
        {
          stage: { mr: 'पेरणीच्या वेळी (एकच मात्रा)', hi: 'बुआई के समय', en: 'At Sowing Time' },
          dose: { mr: 'डीएपी १०० किलो + पोटॅश ५० किलो + गंधक (सल्फर) २५ किलो/हेक्टरी', hi: 'डीएपी १०० किग्रा + पोटाश ५० किग्रा + सल्फर २५ किग्रा', en: 'DAP 100 kg + MOP 50 kg + Sulphur 25 kg per hectare' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'बियाणे व रायझोबियम जीवाणू प्रक्रिया', hi: 'बीज व राइजोबियम उपचार', en: 'Rhizobium Seed Treatment' },
        desc: { mr: 'पेरणीपूर्वी २५० ग्रॅम रायझोबियम + २५० ग्रॅम पीएसबी प्रती १० किलो बियाण्यास चोळावे.', hi: '२५० ग्राम राइजोबियम कल्चर प्रति १० किलो बीज को लगाएं।', en: 'Treat seed with Rhizobium japonicum + PSB @ 25g/kg seed.' },
      },
      {
        step: { mr: 'पेरणीची वेळ व खोली', hi: 'बुआई का समय व गहराई', en: 'Sowing Depth' },
        desc: { mr: 'किमान ७५ ते १०० मि.मी. पाऊस पडल्यावर ३ ते ५ सें.मी. खोलीवर ४५ x ५ सें.मी. अंतरावर पेरणी.', hi: 'पर्याप्त बारिश के बाद ४५ x ५ सेमी दूरी पर ३-५ सेमी गहराई में बुआई।', en: 'Sow at 45x5 cm spacing, 3-4 cm depth after >75mm rain.' },
      },
    ],
    commonDiseasesCount: 3,
  },
  {
    id: 'crop-onion',
    name: {
      mr: 'कांदा (लाल/पांढरा कांदा)',
      hi: 'प्याज (अनियन)',
      en: 'Onion',
    },
    botanicalName: 'Allium cepa',
    category: 'VEGETABLE',
    season: 'RABI',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'मध्यम, गाळाची व उत्तम निचऱ्याची भुसभुशीत जमीन. चुनखडीयुक्त जमीन टाळावी.',
      hi: 'रेतीली दोमट व अच्छे जल निकास वाली उपजाऊ जमीन।',
      en: 'Sandy loam to clay loam, rich in organic matter and free from hard pans.',
    },
    phRange: '6.5 - 7.5',
    durationDays: '110 - 130 दिवस',
    irrigation: {
      mr: 'तुषार (स्प्रिंकलर) अथवा ठिबक सिंचन. कांदा पोसताना नियमित हलके पाणी द्यावे.',
      hi: 'स्प्रिंकलर या ड्रिप सिंचाई। कंद बनते समय नियमित सिंचाई दें।',
      en: 'Sprinkler or drip. Regular light irrigations; stop watering 15 days before harvest.',
    },
    fertilizers: {
      npkRatio: '100:50:50 kg/Ha + 30 kg Sulphur',
      schedule: [
        {
          stage: { mr: 'रोप लागवडीच्या वेळी', hi: 'रोपाई के समय', en: 'At Transplanting' },
          dose: { mr: '५० किलो नत्र, पूर्ण स्फुरद, पालाश व सल्फर', hi: 'आधा यूरिया + पूरा डीएपी व पोटाश', en: '50% N, full P, K and Sulphur' },
        },
        {
          stage: { mr: 'लागवडीनंतर ३० ते ४५ दिवस', hi: 'रोपाई के ३०-४५ दिन बाद', en: '30-45 Days after transplanting' },
          dose: { mr: 'उर्वरित ५० किलो नत्र (युरिया) विभागून देणे', hi: 'बचा हुआ यूरिया देना', en: 'Remaining 50% N top dress' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'गादीवाफ्यावर रोपवाटिका तयार करणे', hi: 'नर्सरी तैयार करना', en: 'Nursery Raising' },
        desc: { mr: '१ मीटर रुंद व ३ मीटर लांब गादीवाफ्यावर बियाणे पेरून ४० ते ४५ दिवसांत रोपे तयार करावीत.', hi: 'उठे हुए क्यारियों में बीज बोकर ४०-४५ दिन में पौध तैयार करें।', en: 'Raise seedlings on raised beds for 40-45 days.' },
      },
      {
        step: { mr: 'रोप पुनर्लागवड', hi: 'पौध रोपाई', en: 'Transplanting' },
        desc: { mr: '१५ x १० सें.मी. अंतरावर रोप लागवड करावी. लागवडीपूर्वी रोपांची मुळे कार्बेन्डाझिम द्रावणात बुडवावीत.', hi: '१५ x १० सेमी अंतर पर रोपाई करें।', en: 'Transplant at 15x10 cm, dip seedling roots in fungicide.' },
      },
    ],
    commonDiseasesCount: 3,
  },
  {
    id: 'crop-tomato',
    name: {
      mr: 'टोमॅटो',
      hi: 'टमाटर',
      en: 'Tomato',
    },
    botanicalName: 'Solanum lycopersicum',
    category: 'VEGETABLE',
    season: 'KHARIF',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'मध्यम काळी, पाण्याचा उत्तम निचरा असणारी कसदार जमीन.',
      hi: 'जीवांश युक्त उपजाऊ दोमट मिट्टी।',
      en: 'Well drained sandy loam to heavy loam soil.',
    },
    phRange: '6.0 - 7.0',
    durationDays: '120 - 140 दिवस',
    irrigation: {
      mr: 'ठिबक सिंचन पद्धती अत्यंत उपयुक्त. फळधारणेच्या वेळी पाण्याचा ताण पडू देऊ नये.',
      hi: 'ड्रिप सिंचाई विधि सबसे उपयुक्त। फल आने पर नमी बनाए रखें।',
      en: 'Drip irrigation with fertigation schedule.',
    },
    fertilizers: {
      npkRatio: '150:100:100 kg/Ha',
      schedule: [
        {
          stage: { mr: 'बेसल डोस (लागवडीवेळी)', hi: 'बुआई के समय', en: 'Basal Dose' },
          dose: { mr: '१०:२६:२६ १०० किलो + २५ किलो सूक्ष्म अन्नद्रव्ये', hi: '१०:२६:२६ १०० किग्रा + सूक्ष्म पोषक', en: '10:26:26 (100kg) + micronutrients' },
        },
        {
          stage: { mr: 'फर्टिगेशन (ठिबकद्वारे)', hi: 'ड्रिप द्वारा खाद', en: 'Fertigation' },
          dose: { mr: '१९:१९:१९ व १२:६१:० आणि ०:०:५० आलटून पालटून देणे', hi: '१९:१९:१९ और ०:०:५० ड्रिप से दें', en: 'Water soluble 19:19:19 & 0:0:50 weekly' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'मल्चिंग पेपर व ठिबक जोडणी', hi: 'मल्चिंग व ड्रिप बिछाना', en: 'Mulching & Drip' },
        desc: { mr: '३० मायक्रॉन सिल्व्हर-ब्लॅक मल्चिंग पेपर पसरून झिग-झॅग पद्धतीने छिद्रे पाडावीत.', hi: 'सिल्वर ब्लैक मल्चिंग शीट बिछाएं।', en: 'Lay 30-micron silver-black plastic mulch.' },
      },
      {
        step: { mr: 'तार-बांबू आधार (Staking)', hi: 'सहारा देना (स्टेकिंग)', en: 'Trellising / Staking' },
        desc: { mr: 'लागवडीनंतर २५-३० दिवसांनी बांबू व तारेच्या सहाय्याने सुतळीने झाडांना आधार द्यावा.', hi: 'तार और बांस से पौधों को सहारा दें।', en: 'Stake plants with wire & bamboo at 30 days.' },
      },
    ],
    commonDiseasesCount: 3,
  },
  {
    id: 'crop-sugarcane',
    name: {
      mr: 'ऊस (साखर पीक)',
      hi: 'गन्ना (ईख)',
      en: 'Sugarcane',
    },
    botanicalName: 'Saccharum officinarum',
    category: 'CASH_CROP',
    season: 'ANNUAL',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'भारी काळी, १ मीटरपेक्षा खोल, चुनखडी विरहित आणि पाण्याचा निचरा होणारी जमीन.',
      hi: 'गहरी काली उपजाऊ दोमट मिट्टी।',
      en: 'Deep rich loam to heavy clay soil with good drainage.',
    },
    phRange: '6.5 - 7.5',
    durationDays: '360 - 450 दिवस (अडसाली/सुरू)',
    irrigation: {
      mr: 'मध्यम ते भारी जमिनीस १०-१२ दिवसांच्या अंतराने किंवा ठिबकद्वारे पाणी द्यावे.',
      hi: 'ड्रिप सिंचाई या १०-१२ दिन के अंतराल पर सिंचाई।',
      en: 'Sub-surface or inline drip irrigation with 7-10 day cycle.',
    },
    fertilizers: {
      npkRatio: '250:115:115 kg/Ha (सुरू ऊस)',
      schedule: [
        {
          stage: { mr: 'लागवडीच्या वेळी', hi: 'बुआई के समय', en: 'At Planting' },
          dose: { mr: '१०% नत्र, ५०% स्फुरद, ५०% पालाश', hi: '१०% यूरिया + ५०% डीएपी व पोटाश', en: '10% N, 50% P, 50% K' },
        },
        {
          stage: { mr: 'मोठी बांधणी (१२०-१३५ दिवस)', hi: 'मिट्टी चढ़ाने के समय', en: 'Earthing Up (120 days)' },
          dose: { mr: 'उर्वरित ४०% नत्र, ५०% स्फुरद व ५०% पालाश', hi: '४०% यूरिया व बची खाद', en: '40% N, remaining P & K' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'बेणे निवड व बेणेप्रक्रिया', hi: 'बीज उपचार', en: 'Sett Treatment' },
        desc: { mr: '९ ते १० महिने वयाच्या निरोगी उसाची एक डोळा किंवा दोन डोळ्यांची बेणी निवडून कार्बेन्डाझिम + मॅलॅथिऑन द्रावणात बुडवावीत.', hi: 'कार्बेंडाजिम में गन्ने के टुकड़ों को डुबोएं।', en: 'Treat 2-bud setts with Carbendazim & Malathion.' },
      },
    ],
    commonDiseasesCount: 2,
  },
  {
    id: 'crop-citrus',
    name: {
      mr: 'संत्रा / मोसंबी / लिंबू',
      hi: 'संतरा / मौसंबी / नींबू',
      en: 'Citrus (Orange / Sweet Lime / Lemon)',
    },
    botanicalName: 'Citrus sinensis / aurantifolia',
    category: 'HORTICULTURE',
    season: 'ANNUAL',
    imageUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'हलकी ते मध्यम मुरमाड, पाण्याचा उत्तम निचरा असणारी जमीन (खोली किमान ७५ ते १०० सें.मी.).',
      hi: 'अच्छे निकास वाली दोमट मिट्टी।',
      en: 'Well-aerated sandy loam to medium black soil, free of hard caliche layer.',
    },
    phRange: '6.5 - 7.5',
    durationDays: 'बहुवर्षीय फळबाग (१५-२० वर्षे)',
    irrigation: {
      mr: 'दुहेरी रिंग पद्धत किंवा ठिबक सिंचन. खोडाला पाणी थेट लागू देऊ नये.',
      hi: 'डबल रिंग या ड्रिप सिंचाई। तने पर पानी न लगने दें।',
      en: 'Double ring basin or drip irrigation keeping water away from tree trunk.',
    },
    fertilizers: {
      npkRatio: '800:400:400 g NPK प्रति पूर्ण वाढलेले झाड (८+ वर्षे)',
      schedule: [
        {
          stage: { mr: 'अंबिया बहार (जानेवारी-फेब्रुवारी)', hi: 'फरवरी में बहार प्रबंधन', en: 'Spring Bloom (Jan-Feb)' },
          dose: { mr: '१/३ नत्र + संपूर्ण स्फुरद व पालाश + ५० किलो शेणखत', hi: '१/३ यूरिया + पूरा डीएपी व पोटाश + गोबर खाद', en: '33% N, full P & K + 50kg FYM' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'बहार व्यवस्थापन व छाटणी', hi: 'कटाई-छंटाई', en: 'Pruning & Bahar Management' },
        desc: { mr: 'वाळलेल्या व रोगट फांद्या कापून त्यावर बोर्डो पेस्ट लावावी. पाण्याचा ताण देऊन बहार धरावा.', hi: 'सूखी टहनियां काटकर बोर्डो पेस्ट लगाएं।', en: 'Prune dead twigs, apply 10% Bordeaux paste to trunks.' },
      },
    ],
    commonDiseasesCount: 2,
  },
  {
    id: 'crop-wheat',
    name: {
      mr: 'गहू (शरबती / सिहोर)',
      hi: 'गेहूं',
      en: 'Wheat',
    },
    botanicalName: 'Triticum aestivum',
    category: 'CEREAL',
    season: 'RABI',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'मध्यम ते भारी, कसदार काळी जमीन. सेंद्रिय कर्ब जास्त असणारी जमीन उपयुक्त.',
      hi: 'उपजाऊ दोमट व भारी काली मिट्टी।',
      en: 'Fertile, well-drained loam to clay loam soil.',
    },
    phRange: '6.0 - 7.5',
    durationDays: '110 - 125 दिवस',
    irrigation: {
      mr: 'मुकुट मुळे फुटणे (२१ दिवस), कांडी धरणे (४२ दिवस), ओंबी बाहेर पडणे (६५ दिवस) व दाणे भरणे (८५ दिवस) या नाजूक अवस्थांमध्ये पाणी द्यावे.',
      hi: 'ताजमूल अवस्था (२१ दिन), कल्ले फूटते समय व दाना भरते समय सिंचाई दें।',
      en: 'CRI (Crown Root Initiation at 21 days), Tillering, Booting, and Grain Filling stages.',
    },
    fertilizers: {
      npkRatio: '120:60:40 kg/Ha',
      schedule: [
        {
          stage: { mr: 'पेरणीच्या वेळी', hi: 'बुआई के समय', en: 'At Sowing' },
          dose: { mr: 'अर्धे नत्र, पूर्ण स्फुरद व पालाश (उदा. डीएपी + पोटॅश)', hi: 'आधा यूरिया + पूरा डीएपी व पोटाश', en: '50% N, 100% P and K' },
        },
        {
          stage: { mr: 'पहिल्या पाण्याच्या वेळी (२१ दिवस)', hi: 'पहली सिंचाई के समय (२१ दिन)', en: 'At 1st Irrigation (21 days)' },
          dose: { mr: 'उर्वरित अर्धे नत्र (युरिया) खुरपणीनंतर देणे', hi: 'बचा हुआ यूरिया देना', en: 'Remaining 50% Nitrogen' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'पेरणीची वेळ व पद्धत', hi: 'बुआई का समय', en: 'Sowing Timing' },
        desc: { mr: '१ ते १५ नोव्हेंबर दरम्यान पेरणी करावी. २२.५ सें.मी. ओळीतील अंतरावर दुचाकी पाभरीने पेरणी करावी.', hi: '१ से १५ नवंबर के बीच बुआई करें।', en: 'Sow between Nov 1-15 at 22.5 cm row spacing.' },
      },
    ],
    commonDiseasesCount: 2,
  },
  {
    id: 'crop-maize',
    name: {
      mr: 'मका (कणिक व चारा)',
      hi: 'मक्का',
      en: 'Maize (Corn)',
    },
    botanicalName: 'Zea mays',
    category: 'CEREAL',
    season: 'KHARIF',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    soil: {
      mr: 'मध्यम ते भारी निचऱ्याची कसदार जमीन. पाणथळ जमीन मका पिकास चालत नाही.',
      hi: 'बलुई दोमट या मध्यम दोमट उपजाऊ मिट्टी।',
      en: 'Well-aerated deep, fertile loam soil rich in organic matter.',
    },
    phRange: '6.5 - 7.5',
    durationDays: '95 - 110 दिवस',
    irrigation: {
      mr: 'तुरा बाहेर पडताना आणि कणीस भरताना पाण्याचा ताण पडू नये.',
      hi: 'मंजरी निकलते समय व दाना भरते समय सिंचाई दें।',
      en: 'Tasseling and silking are critical water demand stages.',
    },
    fertilizers: {
      npkRatio: '120:60:40 kg/Ha',
      schedule: [
        {
          stage: { mr: 'पेरणीच्या वेळी', hi: 'बुआई के समय', en: 'At Sowing' },
          dose: { mr: '३० किलो नत्र, पूर्ण स्फुरद व पालाश', hi: '३० किग्रा यूरिया + पूरा डीएपी व पोटाश', en: '30kg N, full P & K' },
        },
      ],
    },
    cultivationSteps: [
      {
        step: { mr: 'टोकण पेरणी व अंतर', hi: 'बुआई व दूरी', en: 'Spacing' },
        desc: { mr: '६० x २० सें.मी. अंतरावर एक-एक दाणा ४-५ सें.मी. खोलीवर टोकावा.', hi: '६० x २० सेमी दूरी पर एक-एक बीज लगाएं।', en: '60x20 cm spacing, 1 seed per hill at 4 cm depth.' },
      },
    ],
    commonDiseasesCount: 2,
  },
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-coragen',
    commercialName: {
      mr: 'कोराजन (Coragen)',
      hi: 'कोराजन (Coragen)',
      en: 'Coragen (FMC)',
    },
    technicalName: 'Chlorantraniliprole 18.5% SC',
    type: 'CHEMICAL_INSECTICIDE',
    toxicityColor: 'GREEN',
    toxicityLabel: {
      mr: 'हिरवा त्रिकोण (किमान विषारी)',
      hi: 'हरा त्रिकोण (कम विषैला)',
      en: 'Green Triangle (Slightly Toxic)',
    },
    dosePerPump15L: '6 ml (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '60 ml (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'पानांवर व बोंडांवर बारीक तुषाराने एकसारखी फवारणी करावी. अळी लहान अवस्थेत असताना प्रभावी.',
      hi: 'पत्तियों व कलियों पर समान रूप से छिड़काव करें। इल्ली की शुरुआती अवस्था में सर्वोत्तम।',
      en: 'Foliar spray covering leaves and fruit bolls. Most effective on early larval instar.',
    },
    waitingPeriodDays: 14,
    precautions: {
      mr: [
        'फवारणी करताना हातमोजे व मास्क वापरावा.',
        'मधमाश्यांच्या सक्रियतेच्या वेळी फवारणी टाळावी (सकाळी ९ पूर्वी किंवा संध्याकाळी ४ नंतर करावी).',
        'औषधाची रिकामी बाटली धुवून जमिनीत गाडून टाकावी.',
      ],
      hi: [
        'छिड़काव करते समय दस्ताने और मास्क पहनें।',
        'सुबह जल्दी या शाम को छिड़काव करें।',
        'खाली डिब्बे को नष्ट कर जमीन में दबा दें।',
      ],
      en: [
        'Wear gloves and protective mask during handling.',
        'Spray during early morning or late evening to protect honeybees.',
        'Puncture and safely bury empty containers away from water bodies.',
      ],
    },
    approvedCrops: ['Cotton', 'Soybean', 'Maize', 'Tomato', 'Sugarcane'],
    approxCostPerPack: '₹180 - ₹220 (10 ml)',
  },
  {
    id: 'med-proclaim',
    commercialName: {
      mr: 'प्रोक्लेम (Proclaim)',
      hi: 'प्रोक्लेम (Proclaim)',
      en: 'Proclaim (Syngenta)',
    },
    technicalName: 'Emamectin Benzoate 5% SG',
    type: 'CHEMICAL_INSECTICIDE',
    toxicityColor: 'BLUE',
    toxicityLabel: {
      mr: 'निळा त्रिकोण (मध्यम विषारी)',
      hi: 'नीला त्रिकोण (मध्यम विषैला)',
      en: 'Blue Triangle (Moderately Toxic)',
    },
    dosePerPump15L: '4 gm (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '80 gm (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'बोंडअळी, पाने खाणारी अळी व फळ पोखरणाऱ्या अळीसाठी उत्कृष्ट स्पर्श व जठर विष.',
      hi: 'इल्ली व सुंडी नियंत्रण के लिए पत्तियों पर छिड़काव।',
      en: 'Foliar spray for bollworm, caterpillar and fruit borers.',
    },
    waitingPeriodDays: 5,
    precautions: {
      mr: [
        'फवारणीनंतर लगेच शेतात जनावरांना चरू देऊ नये.',
        'पाण्यामध्ये औषध काठीने चांगले ढवळून एकजीव करावे.',
      ],
      hi: ['छिड़काव के बाद पशुओं को खेत में न जाने दें।', 'दवा को पानी में अच्छी तरह मिलाएं।'],
      en: ['Do not allow cattle into treated field.', 'Mix thoroughly in a small bucket first.'],
    },
    approvedCrops: ['Cotton', 'Tomato', 'Chickpea', 'Soybean'],
    approxCostPerPack: '₹340 - ₹380 (50 gm)',
  },
  {
    id: 'med-confidor',
    commercialName: {
      mr: 'कॉन्फिडोर (Confidor)',
      hi: 'कॉन्फिडोर (Confidor)',
      en: 'Confidor (Bayer)',
    },
    technicalName: 'Imidacloprid 17.8% SL',
    type: 'CHEMICAL_INSECTICIDE',
    toxicityColor: 'YELLOW',
    toxicityLabel: {
      mr: 'पिवळा त्रिकोण (अत्यंत विषारी)',
      hi: 'पीला त्रिकोण (अत्यधिक विषैला)',
      en: 'Yellow Triangle (Highly Toxic)',
    },
    dosePerPump15L: '3 to 5 ml (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '50 to 60 ml (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'अंतर्प्रवाही कीटकनाशक. मावा, तुडतुडे, पांढरी माशी व फुलकिडे (थ्रिप्स) या रसशोषक किडींसाठी पानाच्या खालच्या बाजूवर फवारावे.',
      hi: 'माहू, सफेद मक्खी, थ्रिप्स के नियंत्रण के लिए पत्तियों की निचली सतह पर छिड़कें।',
      en: 'Systemic insecticide for sucking pests (aphids, jassids, whiteflies, thrips). Spray underside of leaves.',
    },
    waitingPeriodDays: 21,
    precautions: {
      mr: [
        'पिवळा त्रिकोण असल्याने तोंडावर रुमाल/मास्क व डोळ्यांवर चष्मा लावावा.',
        'फवारणी दरम्यान धुम्रपान, तंबाखू अथवा खाणे पिणे टाळावे.',
      ],
      hi: ['पीला त्रिकोण: चेहरे पर मास्क लगाएं और छिड़काव के दौरान तंबाकू न खाएं।', 'छिड़काव बाद साबुन से हाथ धोएं।'],
      en: ['Wear protective eye shield & respirator mask.', 'Do not eat or drink during application.'],
    },
    approvedCrops: ['Cotton', 'Onion', 'Tomato', 'Citrus'],
    approxCostPerPack: '₹220 - ₹260 (50 ml)',
  },
  {
    id: 'med-dithane-m45',
    commercialName: {
      mr: 'डायथेन एम-४५ (Dithane M-45)',
      hi: 'डाइथेन एम-४५ (Dithane M-45)',
      en: 'Dithane M-45 (Mancozeb)',
    },
    technicalName: 'Mancozeb 75% WP',
    type: 'CHEMICAL_FUNGICIDE',
    toxicityColor: 'GREEN',
    toxicityLabel: {
      mr: 'हिरवा त्रिकोण (किमान विषारी संपर्क बुरशीनाशक)',
      hi: 'हरा त्रिकोण (कम विषैला)',
      en: 'Green Triangle (Slightly Toxic Contact Fungicide)',
    },
    dosePerPump15L: '30 to 35 gm (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '400 to 500 gm (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'पानावरील करपा, तांबेरा आणि भुरी रोगाच्या सुरुवातीच्या लक्षणांवर संरक्षक फवारणी.',
      hi: 'झुलसा व पत्तियों के धब्बों के शुरुआती लक्षणों पर छिड़काव।',
      en: 'Protective broad-spectrum contact foliar spray for blights, spots, and rusts.',
    },
    waitingPeriodDays: 7,
    precautions: {
      mr: ['पावसाची शक्यता असल्यास सिलिकॉन स्टिकर अवश्य वापरावे.', 'द्रावण तयार करताना पावडर हळूहळू पाण्यात टाकावी.'],
      hi: ['स्टीकर जरूर मिलाएं ताकि बारिश में दवा न धुले।', 'घोल अच्छी तरह बनाएं।'],
      en: ['Add non-ionic sticker if rain is anticipated within 48h.', 'Make smooth slurry before adding to tank.'],
    },
    approvedCrops: ['Onion', 'Tomato', 'Cotton', 'Soybean', 'Wheat'],
    approxCostPerPack: '₹300 - ₹350 (500 gm)',
  },
  {
    id: 'med-amistar-top',
    commercialName: {
      mr: 'अमिस्टार टॉप (Amistar Top)',
      hi: 'एमिस्टार टॉप (Amistar Top)',
      en: 'Amistar Top (Syngenta)',
    },
    technicalName: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
    type: 'CHEMICAL_FUNGICIDE',
    toxicityColor: 'BLUE',
    toxicityLabel: {
      mr: 'निळा त्रिकोण (मध्यम विषारी आंतरप्रवाही)',
      hi: 'नीला त्रिकोण (मध्यम विषैला)',
      en: 'Blue Triangle (Moderately Toxic Systemic)',
    },
    dosePerPump15L: '15 ml (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '200 ml (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'कांद्यावरील जांभळा करपा, ट्विस्टर रोग आणि टोमॅटोवरील अर्ली-लेट ब्लाइटवर दुहेरी आंतरप्रवाही नियंत्रण.',
      hi: 'प्याज के जामुनी धब्बे और टमाटर के झुलसा रोग पर प्रभावी।',
      en: 'Dual systemic preventive and curative action for blights, powdery mildew, and anthracnose.',
    },
    waitingPeriodDays: 5,
    precautions: {
      mr: ['सलग दोनपेक्षा जास्त वेळा हेच औषध फवारू नये (रेझिस्टन्स टाळण्यासाठी).'],
      hi: ['प्रतिरोधकता से बचने के लिए लगातार दो बार से अधिक न छिड़कें।'],
      en: ['Rotate with different chemical group fungicide to avoid resistance.'],
    },
    approvedCrops: ['Onion', 'Tomato', 'Soybean'],
    approxCostPerPack: '₹450 - ₹520 (100 ml)',
  },
  {
    id: 'med-blitox',
    commercialName: {
      mr: 'ब्लिटॉक्स ५० (Blitox 50)',
      hi: 'ब्लिटॉक्स ५० (Blitox 50)',
      en: 'Blitox 50 (Tata Rallis)',
    },
    technicalName: 'Copper Oxychloride 50% WP',
    type: 'CHEMICAL_FUNGICIDE',
    toxicityColor: 'BLUE',
    toxicityLabel: {
      mr: 'निळा त्रिकोण (ताम्रयुक्त संपर्क बुरशीनाशक)',
      hi: 'नीला त्रिकोण (कॉपर फफूंदनाशक)',
      en: 'Blue Triangle (Copper Fungicide)',
    },
    dosePerPump15L: '35 to 40 gm (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '500 gm (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'जिवाणूजन्य करपा, सिट्रस कॅन्कर आणि फळकूज यावर खोड व पानांवर फवारणी अथवा खोडावर लेप देणे.',
      hi: 'जीवाणु झुलसा और सिट्रस कैंकर पर पत्तियों व तनों पर छिड़कें।',
      en: 'Copper-based bactericide and fungicide. Ideal for citrus canker and bacterial blights.',
    },
    waitingPeriodDays: 7,
    precautions: {
      mr: ['इतर कोणत्याही कीटकनाशकांसोबत किंवा खतांसोबत मिसळू नये. स्वतंत्र फवारणी करावी.'],
      hi: ['अन्य कीटनाशकों के साथ न मिलाएं। अलग से छिड़काव करें।'],
      en: ['Do not mix with acidic chemicals or organophosphates.'],
    },
    approvedCrops: ['Citrus', 'Tomato', 'Pomegranate', 'Cotton'],
    approxCostPerPack: '₹320 - ₹360 (500 gm)',
  },
  {
    id: 'med-neem-oil',
    commercialName: {
      mr: 'निंबोळी अर्क १०,००० पीपीएम (Neem Oil 10,000 PPM)',
      hi: 'नीम का तेल १०,००० पीपीएम',
      en: 'Neem Oil 10,000 PPM (Azadirachtin)',
    },
    technicalName: 'Azadirachtin 1% (10,000 PPM) EC',
    type: 'BIO_PESTICIDE',
    toxicityColor: 'GREEN',
    toxicityLabel: {
      mr: 'हिरवा त्रिकोण (१००% सेंद्रिय व सुरक्षित)',
      hi: 'हरा त्रिकोण (पूर्णतः जैविक)',
      en: 'Green Triangle (100% Organic & Eco-Safe)',
    },
    dosePerPump15L: '25 to 30 ml (प्रती १५ लिटर पंप)',
    dosePerAcre200L: '350 to 400 ml (प्रती एकर २०० लि. पाणी)',
    applicationMethod: {
      mr: 'किडींच्या अंड्यांचा नाश करतो, अळ्यांना पाना खाण्यापासून रोखतो (Anti-feedant). पिकांच्या वाढीच्या सुरुवातीपासून दर १५ दिवसांनी प्रतिबंधक फवारणी.',
      hi: 'कीटों के अंडे नष्ट करता है और भोजन निरोधक है। हर १५ दिन में निवारक छिड़काव करें।',
      en: 'Ovicide, repellent, and antifeedant action. Preventive foliar spray every 15 days.',
    },
    waitingPeriodDays: 0,
    precautions: {
      mr: ['कोणताही दुष्परिणाम नाही. मित्रकीटकांना (उदा. मधमाश्या, लेडीबर्ड बीटल) पूर्णपणे सुरक्षित.'],
      hi: ['मित्र कीटों (जैसे मधुमक्खियों) के लिए पूरी तरह सुरक्षित।'],
      en: ['Safe for pollinators and natural predators. Zero waiting period.'],
    },
    approvedCrops: ['Cotton', 'Soybean', 'Onion', 'Tomato', 'Maize', 'Citrus', 'Wheat', 'Sugarcane'],
    approxCostPerPack: '₹220 - ₹280 (500 ml)',
  },
  {
    id: 'med-trichoderma',
    commercialName: {
      mr: 'ट्रायकोडर्मा विरिडी (Trichoderma viride)',
      hi: 'ट्राइकोडर्मा विरिडी (Trichoderma viride)',
      en: 'Trichoderma viride (Bio-fungicide)',
    },
    technicalName: 'Trichoderma viride 1% WP (2 x 10^6 cfu/g)',
    type: 'BIO_FUNGICIDE',
    toxicityColor: 'GREEN',
    toxicityLabel: {
      mr: 'हिरवा त्रिकोण (सेंद्रिय मित्र बुरशी)',
      hi: 'हरा त्रिकोण (जैविक फफूंद)',
      en: 'Green Triangle (Beneficial Bio-fungus)',
    },
    dosePerPump15L: '40 to 50 gm (आळवणी/Drenching साठी)',
    dosePerAcre200L: '1 ते 2 किलो शेणखतात मिसळून एकरी देणे',
    applicationMethod: {
      mr: 'मुळकूज, खोडकूज आणि मर रोगासाठी बियाणे प्रक्रिया किंवा मुळांशी आळवणी (Drenching).',
      hi: 'जड़ सड़न व उकठा रोग के लिए बीजोपचार या जड़ों के पास ड्रेन्चिंग।',
      en: 'Seed treatment or root zone drenching against soil-borne root rot, wilt, and damping-off.',
    },
    waitingPeriodDays: 0,
    precautions: {
      mr: ['ट्रायकोडर्मा वापरल्यानंतर किमान ७ दिवस कोणतेही रासायनिक बुरशीनाशक जमिनीत टाकू नये.'],
      hi: ['इसके प्रयोग के बाद ७ दिन तक रासायनिक फफूंदनाशक न डालें।'],
      en: ['Do not apply chemical fungicides for 7 days before or after application.'],
    },
    approvedCrops: ['Cotton', 'Soybean', 'Tomato', 'Onion', 'Chickpea'],
    approxCostPerPack: '₹140 - ₹180 (1 kg)',
  },
];

export const INITIAL_DISEASES: Disease[] = [
  {
    id: 'dis-cotton-bollworm',
    name: {
      mr: 'गुलाबी बोंडअळी (Pink Bollworm)',
      hi: 'गुलाबी सुंडी (Pink Bollworm)',
      en: 'Pink Bollworm (Pectinophora gossypiella)',
    },
    cropId: 'crop-cotton',
    cropName: {
      mr: 'कापूस',
      hi: 'कपास',
      en: 'Cotton',
    },
    category: 'PEST_INSECT',
    severity: 'CRITICAL',
    symptoms: {
      mr: [
        'कापसाची फुले गुलाबाच्या कळीसारखी अर्धवट उमललेली दिसणे (रोझेट फ्लॉवर).',
        'लहान बोंडांमध्ये छिद्र करून अळी आत शिरते व छिद्र बुजवून टाकते.',
        'बोंड फोडल्यावर आत गुलाबी रंगाची अळी आणि सरकी व कापूस खाल्लेला दिसतो.',
        'बोंडे अकाली परिपक्व होऊन सडतात व कापसाची प्रत खालावते.',
      ],
      hi: [
        'फूल गुलाब की कली की तरह बंद रह जाते हैं (रोसेट फूल)।',
        'टिंडों में छोटा छेद कर इल्ली अंदर घुस जाती है।',
        'टिंडा खोलने पर गुलाबी रंग की इल्ली और बीज खाए हुए मिलते हैं।',
        'टिंडे समय से पहले सड़ जाते हैं।',
      ],
      en: [
        'Rosetted flowers that fail to open normally.',
        'Tiny entry holes on developing bolls that seal over quickly.',
        'Presence of pink larvae feeding on seeds inside bolls.',
        'Premature boll opening with stained, stained lint and ruined seeds.',
      ],
    },
    favorableConditions: {
      mr: 'ढगाळ वातावरण, २८ ते ३२ अंश से. तापमान, ८०% पेक्षा जास्त हवेतील आर्द्रता आणि कापसाची बोंड भरण्याची अवस्था.',
      hi: 'बादल छाए रहना, २८-३२ डिग्री तापमान और अधिक आर्द्रता।',
      en: 'Cloudy weather, 28-32°C temperature, >80% RH during boll formation stage.',
    },
    preventionTips: {
      mr: [
        'पेरणीनंतर ४५ दिवसांनी हेक्टरी ५ फेरोमोन ट्रॅप (कामगंध सापळे) लावावेत.',
        'सलग ३ दिवस एका ट्रॅपमध्ये ८ पेक्षा जास्त पतंग आढळल्यास (ETL लेव्हल) त्वरित फवारणी करावी.',
        'रासायनिक कीटकनाशकांची फवारणी करण्यापूर्वी निंबोळी अर्क १०,००० पीपीएम ची प्रतिबंधक फवारणी करावी.',
        'शेतातील पडलेली रोझेट फुले गोळा करून नष्ट करावीत.',
      ],
      hi: [
        'प्रति एकड़ २-३ फेरोमोन ट्रैप लगाएं।',
        'नीम तेल १०,००० पीपीएम का छिड़काव करें।',
        'प्रभावित फूलों व टिंडों को तोड़कर नष्ट करें।',
      ],
      en: [
        'Install 5 pheromone traps per hectare at 45 DAS to monitor adult moths.',
        'Economic Threshold Level (ETL): 8 moths/trap/night for 3 consecutive days.',
        'Preventive spraying of Neem Oil (10,000 PPM) at 45-60 DAS.',
        'Collect and destroy rosetted flowers manually.',
      ],
    },
    chemicalTreatments: [INITIAL_MEDICINES[0], INITIAL_MEDICINES[1]],
    organicTreatments: [
      {
        name: {
          mr: 'दशपर्णी अर्क + निंबोळी अर्क ५%',
          hi: 'दशपर्णी अर्क + नीम तेल',
          en: 'Dashparni Ark + Neem Oil 5%',
        },
        description: {
          mr: 'कडुलिंब, करंज, सीताफळ, धोत्रा, एरंडी, निरगुडी यांच्या पाल्यापासून तयार केलेला घरगुती दशपर्णी अर्क अळीवर अत्यंत प्रभावी ठरतो.',
          hi: 'नीम, धतूरा और अन्य पत्तियों से बना दशपर्णी अर्क इल्लियों को भगाता है।',
          en: 'Traditional 10-leaf fermented botanical extract acts as strong repellent and antifeedant.',
        },
        dosage: '५० मिली दशपर्णी अर्क + ३० मिली निंबोळी अर्क प्रती १५ लिटर पंप',
      },
      {
        name: {
          mr: 'ट्रायकोग्रामा परोपजीवी कीटक (Trichogramma Cards)',
          hi: 'ट्राइकोग्रामा परजीवी कार्ड',
          en: 'Trichogramma Egg Parasitoids',
        },
        description: {
          mr: 'बोंडअळीच्या अंड्यांवर जगणारे मित्रकीटक. हेक्टरी १.५ लाख अंडी असलेले ट्रायको-कार्ड शेतात झाडांच्या पानांमागे स्टेपल करावेत.',
          hi: 'प्रति एकड़ ५०,००० मित्र कीट अंडे पत्तों के पीछे लगाएं।',
          en: 'Biological control using Trichogramma bactrae cards @ 1.5 lakh eggs/ha at weekly intervals.',
        },
        dosage: '३ ते ४ ट्रायको-कार्ड प्रती एकर (दर आठवड्याला)',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dis-cotton-sucking-pest',
    name: {
      mr: 'कापसावरील रसशोषक कीड (मावा, तुडतुडे, थ्रिप्स)',
      hi: 'कपास के रस चूसक कीट (माहू, थ्रिप्स, जेसिड)',
      en: 'Sucking Pests of Cotton (Aphids, Jassids, Thrips)',
    },
    cropId: 'crop-cotton',
    cropName: {
      mr: 'कापूस',
      hi: 'कपास',
      en: 'Cotton',
    },
    category: 'PEST_INSECT',
    severity: 'HIGH',
    symptoms: {
      mr: [
        'कापसाची पाने कडेने पिवळी व लालसर पडून खालच्या बाजूने किंवा वरच्या बाजूने आकसतात (होडीसारखा आकार).',
        'पानांच्या मागच्या बाजूला बारीक पिवळे-हिरवे किडे व चिकट चिकटा दिसून येतो.',
        'झाडांची वाढ खुंटते आणि पातेगळ मोठ्या प्रमाणावर होते.',
      ],
      hi: [
        'पत्तियां मुड़ जाती हैं और किनारों से पीली या लाल हो जाती हैं।',
        'पत्ती के नीचे चिपचिपा पदार्थ और छोटे कीड़े दिखाई देते हैं।',
        'पौधों की बढ़वार रुक जाती है।',
      ],
      en: [
        'Leaves cup upwards or downwards (hopper burn symptoms).',
        'Yellowing and curling of leaf margins, turning brown and necrotic.',
        'Honeydew secretion leading to black sooty mold.',
      ],
    },
    favorableConditions: {
      mr: 'पावसाचा दीर्घ खंड, कोरडे व उष्ण हवामान, ढगाळ वातावरण.',
      hi: 'सूखा मौसम और बारिश में लंबा अंतराल।',
      en: 'Dry spells during monsoon, warm temperature, and dense canopy.',
    },
    preventionTips: {
      mr: [
        'शेतात एकरी १० पिवळे व निळे चिकट सापळे (Sticky Traps) पिकाच्या उंचीवर लावावेत.',
        'नत्राचा (युरिया) अतिवापर टाळावा, कारण जास्त युरियामुळे पाने कोवळी राहून किडी आकर्षित होतात.',
      ],
      hi: ['एकड़ में १० पीले व नीले चिपचिपे कार्ड लगाएं।', 'यूरिया का अत्यधिक उपयोग न करें।'],
      en: ['Install 10 yellow and blue sticky cards per acre.', 'Avoid excessive nitrogenous fertilizer application.'],
    },
    chemicalTreatments: [INITIAL_MEDICINES[2]],
    organicTreatments: [
      {
        name: {
          mr: 'निंबोळी अर्क ५% + देशी गाईचे गोमूत्र',
          hi: 'नीम अर्क ५% + गौमूत्र',
          en: 'Neem Extract 5% + Cow Urine Spray',
        },
        description: {
          mr: 'रसशोषक किडींचे तोंड चुरचुरते व त्या पिकापासून दूर पळतात.',
          hi: 'प्राकृतिक घोल से रस चूसक कीट दूर भागते हैं।',
          en: 'Eco-friendly repellent suppressing aphid and jassid populations.',
        },
        dosage: '३५ मिली निंबोळी अर्क + १०० मिली ताजे गोमूत्र प्रती १५ लिटर पंप',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dis-onion-purple-blotch',
    name: {
      mr: 'कांद्यावरील जांभळा करपा (Purple Blotch)',
      hi: 'प्याज का जामुनी धब्बा रोग (Purple Blotch)',
      en: 'Purple Blotch of Onion (Alternaria porri)',
    },
    cropId: 'crop-onion',
    cropName: {
      mr: 'कांदा',
      hi: 'प्याज',
      en: 'Onion',
    },
    category: 'FUNGAL',
    severity: 'HIGH',
    symptoms: {
      mr: [
        'पानांवर सुरुवातीला पांढरट-तपकिरी रंगाचे लहान पाण्याचे ठिपके पडतात.',
        'नंतर हे ठिपके मोठे होऊन मध्यभागी जांभळट किंवा गर्द लालसर-तपकिरी होतात.',
        'पाती मध्यभागी पिवळी पडून कोलमडून पडते (ट्विस्टर किंवा पिळा रोग).',
        'कांद्याचा आकार बारीक राहतो आणि साठवणुकीत कांदा सडतो.',
      ],
      hi: [
        'पत्तियों पर छोटे धब्बे बनते हैं जो बाद में केंद्र में जामुनी हो जाते हैं।',
        'पत्तियां पीली होकर बीच से गिर जाती हैं।',
        'प्याज का आकार छोटा रह जाता है।',
      ],
      en: [
        'Small, sunken whitish spots that enlarge and turn purple-brown in the center.',
        'Concentric rings visible within the lesions on onion leaves.',
        'Leaves girdle, collapse, and dry up from tips downwards.',
      ],
    },
    favorableConditions: {
      mr: '८०% पेक्षा जास्त हवेतील आर्द्रता, २५ ते ३० अंश तापमान आणि पानांवर पाण्याचे थेंब जास्त वेळ साचणे.',
      hi: '८०% से अधिक नमी, २५-३० डिग्री तापमान।',
      en: 'High relative humidity (>80%), temperature 25-30°C, prolonged leaf wetness.',
    },
    preventionTips: {
      mr: [
        'रोप लागवडीपूर्वी रोपांची मुळे कार्बेन्डाझिम द्रावणात बुडवून लावावीत.',
        'स्प्रिंकलरने पाणी देणे टाळावे, शक्यतो ठिबक सिंचन वापरावे जेणेकरून पातीवर पाणी साचणार नाही.',
        'पातीवरील मेणासारखा थर औषध धरून ठेवत नसल्याने फवारणीत सिलिकॉन स्टिकर अवश्य वापरावे.',
      ],
      hi: ['रोपाई पूर्व पौध की जड़ों को फफूंदनाशक में डुबोएं।', 'छिड़काव में स्टिकर अवश्य मिलाएं।'],
      en: ['Dip seedling roots in fungicide before planting.', 'Use silicon sticker due to waxy onion leaves.'],
    },
    chemicalTreatments: [INITIAL_MEDICINES[3], INITIAL_MEDICINES[4]],
    organicTreatments: [
      {
        name: {
          mr: 'ट्रायकोडर्मा विरिडी + ताक (Sour Buttermilk) फवारणी',
          hi: 'ट्राइकोडर्मा + खट्टी छाछ छिड़काव',
          en: 'Trichoderma viride + Fermented Buttermilk Spray',
        },
        description: {
          mr: '४-५ दिवस आंबवलेले ताक पानावरील बुरशीची वाढ रोखते आणि नैसर्गिक प्रतिकारशक्ती वाढवते.',
          hi: 'खट्टी छाछ पत्ती पर फफूंद के संक्रमण को रोकती है।',
          en: 'Fermented sour buttermilk produces lactic acid inhibiting fungal spore germination.',
        },
        dosage: '५० मिली ताक + ३५ ग्रॅम ट्रायकोडर्मा प्रती १५ लिटर पंप',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dis-tomato-early-late-blight',
    name: {
      mr: 'टोमॅटोवरील लवकर व उशिरा येणारा करपा (Blight)',
      hi: 'टमाटर का अगेती व पछेती झुलसा (Early & Late Blight)',
      en: 'Tomato Blight (Alternaria / Phytophthora)',
    },
    cropId: 'crop-tomato',
    cropName: {
      mr: 'टोमॅटो',
      hi: 'टमाटर',
      en: 'Tomato',
    },
    category: 'FUNGAL',
    severity: 'CRITICAL',
    symptoms: {
      mr: [
        'खालच्या जुन्या पानांवर काळे-तपकिरी गोलाकार चक्राकार (टार्गेट बोर्डसारखे) डाग पडतात.',
        'लेट ब्लाइटमध्ये पानांवर ओले पाण्याचे डाग पडून पान करपल्यासारखे जळून जाते.',
        'हिरव्या व पिकलेल्या फळांवर काळसर खड्डे पडून फळे सडतात.',
      ],
      hi: [
        'पत्तियों पर गहरे भूरे रंग के छल्लेदार धब्बे बनते हैं।',
        'पौधा झुलसा हुआ सा दिखाई देता है और फल सड़ने लगते हैं।',
      ],
      en: [
        'Dark brown concentric rings (target-like spots) on lower older leaves.',
        'Rapid water-soaked lesions turning dark brown and greasy on leaves & stems.',
        'Dark brown sunken leathery lesions on green and ripening fruits.',
      ],
    },
    favorableConditions: {
      mr: 'थंड व दमट हवामान, सकाळी दाट धुके, पानांवर दीर्घकाळ दव साचून राहणे.',
      hi: 'ठंडा व नम मौसम, कोहरा और नमी।',
      en: 'Cool moist weather, fog, high humidity, and continuous leaf wetness.',
    },
    preventionTips: {
      mr: [
        'खालची जमिनीला टेकलेली रोगट पाने छाटून नष्ट करावीत.',
        'ठिबक सिंचनाचा वापर करावा; वरून तुषार पाणी टाळावे.',
      ],
      hi: ['जमीन से छूने वाली निचली पत्तियों को तोड़कर नष्ट करें।', 'ड्रिप से पानी दें।'],
      en: ['Prune bottom foliage touching the soil.', 'Ensure good air circulation via staking.'],
    },
    chemicalTreatments: [INITIAL_MEDICINES[3], INITIAL_MEDICINES[4]],
    organicTreatments: [
      {
        name: {
          mr: 'सुडोमोनास फ्लुरोसन्स (Pseudomonas fluorescens)',
          hi: 'स्यूडोमोनास फ्लोरेसेंस',
          en: 'Pseudomonas fluorescens Bio-control',
        },
        description: {
          mr: 'जिवाणूजन्य व बुरशीजन्य करप्याविरुद्ध अत्यंत प्रभावी जैविक संरक्षक.',
          hi: 'जैविक फफूंद नियंत्रक जो पौधों की प्रतिरोधक क्षमता बढ़ाता है।',
          en: 'Antagonistic bacteria providing systemic acquired resistance against blights.',
        },
        dosage: '३५ ग्रॅम प्रती १५ लिटर पंप',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dis-soybean-yellow-mosaic',
    name: {
      mr: 'सोयाबीनवरील पिवळा मोझॅक (Yellow Mosaic Virus)',
      hi: 'सोयाबीन पीला मोजेक वायरस (Yellow Mosaic)',
      en: 'Soybean Yellow Mosaic Virus (YMV)',
    },
    cropId: 'crop-soybean',
    cropName: {
      mr: 'सोयाबीन',
      hi: 'सोयाबीन',
      en: 'Soybean',
    },
    category: 'VIRAL',
    severity: 'HIGH',
    symptoms: {
      mr: [
        'कोवळ्या पानांवर पिवळे व हिरवे चट्टे पडतात आणि संपूर्ण पान हळूहळू चमकदार पिवळे पडते.',
        'पाने जाड व खडबडीत होतात आणि झाडांची वाढ पूर्णपणे थांबते.',
        'झाडाला शेंगा कमी लागतात आणि दाणे बारीक चपटे राहतात.',
        'हा रोग पांढऱ्या माशीमुळे (Whitefly) वेगाने संपूर्ण शेतात पसरतो.',
      ],
      hi: [
        'पत्तियों पर पीले व हरे धब्बे बनते हैं और पूरी पत्ती पीली हो जाती है।',
        'पौधों की बढ़वार रुक जाती है और फलियां नहीं बनतीं।',
        'यह रोग सफेद मक्खी द्वारा फैलता है।',
      ],
      en: [
        'Alternating bright yellow and green patches on trifoliate leaves.',
        'Complete yellowing and stunting of infected plants.',
        'Severe reduction in pod formation and shriveled seeds.',
        'Transmitted rapidly by Bemisia tabaci (whitefly vector).',
      ],
    },
    favorableConditions: {
      mr: 'उष्ण व कोरडे हवामान, पांढऱ्या माशीचा मोठा प्रादुर्भाव, पावसाचा दीर्घ खंड.',
      hi: 'गर्म मौसम और सफेद मक्खी का प्रकोप।',
      en: 'Warm dry conditions favoring whitefly multiplication.',
    },
    preventionTips: {
      mr: [
        'व्हायरसवर कोणतेही थेट रासायनिक औषध नसते, त्यामुळे वाहक पांढऱ्या माशीचे तातडीने नियंत्रण करावे.',
        'रोगट झाडे दिसताच मुळासकट उपटून जमिनीत गाडावीत जेणेकरून इतर झाडांना संसर्ग होणार नाही.',
        'शेतात हेक्टरी २० पिवळे चिकट सापळे लावावेत.',
      ],
      hi: [
        'रोगग्रस्त पौधों को उखाड़कर जमीन में दबा दें।',
        'सफेद मक्खी के नियंत्रण के लिए पीले चिपचिपे कार्ड लगाएं।',
      ],
      en: [
        'Rogue out and destroy infected plants immediately.',
        'Control vector whitefly immediately to arrest secondary transmission.',
        'Install 20 yellow sticky traps per hectare.',
      ],
    },
    chemicalTreatments: [INITIAL_MEDICINES[2]],
    organicTreatments: [
      {
        name: {
          mr: 'निंबोळी तेल १०,००० पीपीएम + ५% दशपर्णी अर्क',
          hi: 'नीम तेल १०,००० पीपीएम',
          en: 'Neem Oil 10,000 PPM Whitefly Repellent',
        },
        description: {
          mr: 'पांढऱ्या माशीला अंडी घालण्यापासून रोखते आणि रस शोषण्यास प्रतिबंध करते.',
          hi: 'सफेद मक्खी को अंडे देने से रोकता है।',
          en: 'Antifeedant and oviposition deterrent against whitefly.',
        },
        dosage: '३० मिली प्रती १५ लिटर पंप (दर १० दिवसांनी)',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dis-citrus-canker',
    name: {
      mr: 'लिंबूवर्गीय पिकांवरील खैरा / सिट्रस कॅन्कर (Citrus Canker)',
      hi: 'सिट्रस कैंकर रोग (Citrus Canker)',
      en: 'Citrus Canker (Xanthomonas axonopodis pv. citri)',
    },
    cropId: 'crop-citrus',
    cropName: {
      mr: 'संत्रा / मोसंबी / लिंबू',
      hi: 'संतरा / नींबू',
      en: 'Citrus',
    },
    category: 'BACTERIAL',
    severity: 'HIGH',
    symptoms: {
      mr: [
        'पानांवर, कोवळ्या फांद्यांवर आणि फळांवर खडबडीत, उठावदार तपकिरी रंगाचे खपलीसारखे चट्टे पडतात.',
        'डागांच्या भोवती पिवळसर वलय (Yellow Halo) स्पष्ट दिसते.',
        'फळांवर चट्टे पडल्यामुळे फळांचा दर्जा घसरतो आणि फळगळ होते.',
      ],
      hi: [
        'पत्तियों, टहनियों और फलों पर उभरे हुए भूरे खुरदरे धब्बे बनते हैं।',
        'धब्बों के चारों ओर पीला घेरा (Yellow Halo) दिखाई देता है।',
        'फल बदरंग हो जाते हैं और समय से पहले गिरते हैं।',
      ],
      en: [
        'Raised, corky, crater-like lesions on leaves, stems, and fruits.',
        'Characteristic oily margins with prominent yellowish halos.',
        'Fruit drop and significant reduction in commercial market value.',
      ],
    },
    favorableConditions: {
      mr: 'पावसाची संततधार, वादळी वारा, पाने पोखरणारी अळी (लीफ मायनर) चे जखमा झालेले झाड.',
      hi: 'लगातार बारिश, तेज हवा और लीफ माइनर कीट का प्रकोप।',
      en: 'Warm rainy weather, high wind driving bacterial spray, leaf miner damage.',
    },
    preventionTips: {
      mr: [
        'पाने पोखरणाऱ्या अळीचे (Leaf Miner) वेळीच नियंत्रण करावे कारण तिच्या जखमांमधून जिवाणू शिरतात.',
        'छाटणीनंतर झाडांवर १% बोर्डो मिश्रण किंवा ब्लिटॉक्सची फवारणी करावी.',
      ],
      hi: ['लीफ माइनर कीट को रोकें। छांटने के बाद बोर्डो मिश्रण का छिड़काव करें।'],
      en: ['Control leaf miner aggressively as larvae provide infection courts.', 'Apply 1% Bordeaux mixture post-pruning.'],
    },
    chemicalTreatments: [INITIAL_MEDICINES[5]],
    organicTreatments: [
      {
        name: {
          mr: 'बोर्डो मिश्रण (Bordeaux Mixture 1%)',
          hi: 'बोर्डो मिश्रण (१%)',
          en: 'Bordeaux Mixture (1% Cupric Sulfate + Lime)',
        },
        description: {
          mr: '१ किलो मोरचूद + १ किलो कळीचा चुना + १०० लिटर पाणी. फळबागेतील जिवाणू व बुरशीवर पारंपरिक रामबाण उपाय.',
          hi: 'मोरचूद और चूने का १% घोल जिवाणु रोगों पर अत्यंत प्रभावी है।',
          en: 'Classic neutral copper sulfate and slaked lime suspension providing bactericidal barrier.',
        },
        dosage: '१% द्रावण (१०० ग्रॅम मोरचूद + १०० ग्रॅम चुना १० लिटर पाण्यात)',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80',
  },
];

export const INITIAL_WEATHER_DISTRICTS: Record<string, WeatherData> = {
  Nashik: {
    district: 'नाशिक (Nashik)',
    temperature: 28.5,
    feelsLike: 29.2,
    humidity: 62,
    windSpeed: 8.5,
    rainChance: 15,
    condition: 'अंशतः ढगाळ व कोरडे',
    conditionCode: 'PARTLY_CLOUDY',
    spraySuitability: 'EXCELLENT',
    sprayAdvisory: {
      mr: 'हवेचा वेग कमी (८.५ किमी/तास) व पावसाची शक्यता फक्त १५% असल्याने आज सकाळी किंवा संध्याकाळी फवारणीसाठी अत्यंत अनुकूल वातावरण आहे. स्टिकर वापरल्यास उत्तम.',
      hi: 'हवा की गति शांत (८.५ किमी/घंटा) और बारिश की केवल १५% संभावना है। आज सुबह या शाम का छिड़काव उपयुक्त रहेगा।',
      en: 'Wind speed is calm (8.5 km/h) and rain risk is low (15%). Ideal window for foliar spraying today.',
    },
    forecast: [
      { day: 'आज', maxTemp: 31, minTemp: 19, rainProb: 15, condition: 'अंशतः ढगाळ' },
      { day: 'उद्या', maxTemp: 32, minTemp: 20, rainProb: 10, condition: 'निरभ्र आकाश' },
      { day: 'रविवार', maxTemp: 30, minTemp: 19, rainProb: 25, condition: 'हलके ढग' },
    ],
  },
  Pune: {
    district: 'पुणे (Pune)',
    temperature: 29.8,
    feelsLike: 31.0,
    humidity: 58,
    windSpeed: 9.2,
    rainChance: 10,
    condition: 'स्वच्छ व सूर्यप्रकाशित',
    conditionCode: 'SUNNY',
    spraySuitability: 'EXCELLENT',
    sprayAdvisory: {
      mr: 'वातावरण स्वच्छ असून फवारणीसाठी सुरक्षित आहे. दुपारचे कडक ऊन टाळून सकाळी ९ च्या आधी किंवा दुपारी ४ नंतर फवारणी करावी.',
      hi: 'मौसम साफ है। दोपहर की तेज धूप छोड़कर सुबह या शाम को छिड़काव करें।',
      en: 'Clear weather. Avoid high midday sun; conduct sprays before 9:30 AM or post 4:00 PM.',
    },
    forecast: [
      { day: 'आज', maxTemp: 32, minTemp: 18, rainProb: 10, condition: 'स्वच्छ ऊन' },
      { day: 'उद्या', maxTemp: 33, minTemp: 19, rainProb: 5, condition: 'स्वच्छ ऊन' },
      { day: 'रविवार', maxTemp: 32, minTemp: 18, rainProb: 15, condition: 'अंशतः ढग' },
    ],
  },
  'Chhatrapati Sambhajinagar': {
    district: 'छत्रपती संभाजीनगर (Aurangabad)',
    temperature: 32.2,
    feelsLike: 33.5,
    humidity: 48,
    windSpeed: 11.0,
    rainChance: 20,
    condition: 'उबदार व हलके वारे',
    conditionCode: 'PARTLY_CLOUDY',
    spraySuitability: 'MODERATE',
    sprayAdvisory: {
      mr: 'हवेचा वेग ११ किमी/तास आहे. फवारणी करताना वाऱ्याच्या दिशेने फवारा मारावा जेणेकरून औषधाचे थेंब उडणार नाहीत.',
      hi: 'हवा की गति ११ किमी/घंटा है। छिड़काव करते समय हवा की दिशा का ध्यान रखें।',
      en: 'Wind at 11 km/h. Moderate conditions; spray downwind with drift reduction nozzles.',
    },
    forecast: [
      { day: 'आज', maxTemp: 34, minTemp: 21, rainProb: 20, condition: 'हलके वारे' },
      { day: 'उद्या', maxTemp: 35, minTemp: 22, rainProb: 15, condition: 'उष्ण' },
      { day: 'रविवार', maxTemp: 33, minTemp: 21, rainProb: 30, condition: 'ढगाळ' },
    ],
  },
  Nagpur: {
    district: 'नागपूर (Nagpur)',
    temperature: 33.0,
    feelsLike: 35.5,
    humidity: 70,
    windSpeed: 18.5,
    rainChance: 65,
    condition: 'मेघगर्जना व पावसाची शक्यता',
    conditionCode: 'RAIN',
    spraySuitability: 'NOT_RECOMMENDED',
    sprayAdvisory: {
      mr: 'सावधान! ६५% पावसाची शक्यता आणि १८.५ किमी वेगाने वारे वाहत आहेत. आज कोणतीही महागडी फवारणी करू नका, अन्यथा औषध वाहून जाऊन नुकसान होईल.',
      hi: 'सावधान! ६५% बारिश की संभावना व तेज हवा। आज कोई भी महंगी दवा न छिड़कें।',
      en: 'Warning: 65% rain probability and wind gusts of 18.5 km/h. Spraying strictly NOT recommended.',
    },
    forecast: [
      { day: 'आज', maxTemp: 33, minTemp: 23, rainProb: 65, condition: 'पावसाच्या सरी' },
      { day: 'उद्या', maxTemp: 31, minTemp: 22, rainProb: 55, condition: 'ढगाळ व पाऊस' },
      { day: 'रविवार', maxTemp: 32, minTemp: 22, rainProb: 35, condition: 'विखुरलेले ढग' },
    ],
  },
  Solapur: {
    district: 'सोलापूर (Solapur)',
    temperature: 34.0,
    feelsLike: 35.0,
    humidity: 45,
    windSpeed: 10.0,
    rainChance: 5,
    condition: 'कोरडे व उष्ण',
    conditionCode: 'SUNNY',
    spraySuitability: 'EXCELLENT',
    sprayAdvisory: {
      mr: 'हवामान कोरडे असून पाऊस नाही. डाळिंब व कांदा फवारणीसाठी योग्य वेळ. संध्याकाळी फवारणी करावी.',
      hi: 'मौसम सूखा है, बारिश नहीं। अनार व प्याज के छिड़काव के लिए अनुकूल समय।',
      en: 'Dry conditions, low humidity. Optimal for pomegranate and onion protection.',
    },
    forecast: [
      { day: 'आज', maxTemp: 36, minTemp: 22, rainProb: 5, condition: 'स्वच्छ ऊन' },
      { day: 'उद्या', maxTemp: 36, minTemp: 23, rainProb: 5, condition: 'कोरडे' },
      { day: 'रविवार', maxTemp: 35, minTemp: 22, rainProb: 10, condition: 'हलके ढग' },
    ],
  },
  Kolhapur: {
    district: 'कोल्हापूर (Kolhapur)',
    temperature: 28.0,
    feelsLike: 29.5,
    humidity: 78,
    windSpeed: 9.0,
    rainChance: 30,
    condition: 'दमट व अंशतः ढगाळ',
    conditionCode: 'CLOUDY',
    spraySuitability: 'MODERATE',
    sprayAdvisory: {
      mr: 'हवेत आर्द्रता जास्त (७८%) आहे. ऊस व सोयाबीन पिकांवर बुरशीचा प्रादुर्भाव वाढू शकतो. फवारणीमध्ये स्टीकर अवश्य मिसळा.',
      hi: 'हवा में नमी ७८% है। गन्ने में फफूंद का खतरा बढ़ सकता है। दवा में स्टीकर अवश्य मिलाएं।',
      en: 'High humidity (78%) encourages fungal proliferation. Add non-ionic sticker if spraying.',
    },
    forecast: [
      { day: 'आज', maxTemp: 29, minTemp: 21, rainProb: 30, condition: 'दमट' },
      { day: 'उद्या', maxTemp: 30, minTemp: 21, rainProb: 25, condition: 'ढगाळ' },
      { day: 'रविवार', maxTemp: 29, minTemp: 20, rainProb: 20, condition: 'अंशतः ऊन' },
    ],
  },
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user-farmer-1',
    name: 'सदाशिवराव पाटील (Sadashivrao Patil)',
    mobile: '9822334455',
    email: 'patil.farmer@agrimail.com',
    role: 'FARMER',
    village: 'निफाड (Niphad)',
    district: 'Nashik',
    state: 'Maharashtra',
    landAreaAcres: 5.5,
    primaryCrops: ['crop-onion', 'crop-cotton', 'crop-tomato'],
    createdAt: '2026-03-15',
  },
  {
    id: 'user-admin-1',
    name: 'डॉ. विलासराव देशमुख (Dr. V. Deshmukh - Agri Officer)',
    mobile: '9422001122',
    email: 'admin@farmerinfo.gov.in',
    role: 'ADMIN',
    village: 'कृषी भवन, शिवाजीनगर',
    district: 'Pune',
    state: 'Maharashtra',
    landAreaAcres: 0,
    primaryCrops: [],
    createdAt: '2025-01-10',
  },
];
