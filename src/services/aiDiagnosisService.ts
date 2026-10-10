import { Disease } from '../types';
import { INITIAL_DISEASES } from '../data/mockData';

export interface DiagnosisResult {
  matchedDisease: Disease;
  confidenceScore: number; // 0 to 100%
  matchedSymptoms: string[];
  diagnosticReasoning: {
    mr: string;
    hi: string;
    en: string;
  };
  urgency: 'IMMEDIATE_ACTION' | 'MONITOR' | 'PREVENTIVE';
}

export async function runDiseaseDiagnosis(params: {
  cropId?: string;
  selectedSymptoms: string[];
  imageDescription?: string;
  imageDataUrl?: string;
}): Promise<DiagnosisResult[]> {
  const { cropId, selectedSymptoms, imageDescription } = params;

  // Filter candidates by crop if selected
  const candidates = cropId && cropId !== 'all'
    ? INITIAL_DISEASES.filter(d => d.cropId === cropId)
    : INITIAL_DISEASES;

  const results: DiagnosisResult[] = [];

  for (const disease of candidates) {
    let matchScore = 0;
    const foundSymptoms: string[] = [];

    // Check symptom text matches
    const allDiseaseSymptoms = [
      ...disease.symptoms.mr,
      ...disease.symptoms.hi,
      ...disease.symptoms.en,
    ].map(s => s.toLowerCase());

    for (const userSym of selectedSymptoms) {
      const uLower = userSym.toLowerCase();
      const hasMatch = allDiseaseSymptoms.some(ds => ds.includes(uLower) || uLower.includes(ds));
      if (hasMatch) {
        matchScore += 35;
        foundSymptoms.push(userSym);
      }
    }

    // Check text notes or image description
    if (imageDescription) {
      const descLower = imageDescription.toLowerCase();
      if (
        descLower.includes(disease.name.mr.toLowerCase()) ||
        descLower.includes(disease.name.hi.toLowerCase()) ||
        descLower.includes(disease.name.en.toLowerCase()) ||
        descLower.includes(disease.category.toLowerCase())
      ) {
        matchScore += 25;
      }
      if (descLower.includes('पिवळे') || descLower.includes('yellow') || descLower.includes('पीली')) {
        if (disease.id.includes('mosaic') || disease.id.includes('sucking')) matchScore += 20;
      }
      if (descLower.includes('करपा') || descLower.includes('blight') || descLower.includes('डाग') || descLower.includes('spot')) {
        if (disease.id.includes('blotch') || disease.id.includes('blight')) matchScore += 20;
      }
      if (descLower.includes('अळी') || descLower.includes('worm') || descLower.includes('सुंडी') || descLower.includes('borer')) {
        if (disease.category === 'PEST_INSECT') matchScore += 25;
      }
    }

    // Default base match when only crop is selected
    if (selectedSymptoms.length === 0 && !imageDescription) {
      matchScore = 75; // show all diseases of this crop
    } else if (matchScore === 0 && selectedSymptoms.length > 0) {
      // Partial baseline
      matchScore = 20;
    }

    const confidence = Math.min(Math.max(matchScore, 35), 96);

    let urgency: DiagnosisResult['urgency'] = 'PREVENTIVE';
    if (disease.severity === 'CRITICAL') urgency = 'IMMEDIATE_ACTION';
    else if (disease.severity === 'HIGH') urgency = 'MONITOR';

    results.push({
      matchedDisease: disease,
      confidenceScore: confidence,
      matchedSymptoms: foundSymptoms.length > 0 ? foundSymptoms : [disease.symptoms.mr[0]],
      diagnosticReasoning: {
        mr: `लक्षणे व पीक अवस्थेच्या आधारे ${disease.name.mr} असण्याची शक्यता ${confidence}% आहे. प्रादुर्भाव वाढण्यापूर्वी खालील प्रमाणित औषध अथवा जैविक फवारणी करावी.`,
        hi: `लक्षणों के आधार पर ${disease.name.hi} होने की संभावना ${confidence}% है। कृपया प्रमाणित खुराक अनुसार छिड़काव करें।`,
        en: `Based on observed symptoms and crop characteristics, there is a ${confidence}% confidence match for ${disease.name.en}. Immediate verified treatment advised.`,
      },
      urgency,
    });
  }

  // Sort descending by confidence score
  return results.sort((a, b) => b.confidenceScore - a.confidenceScore);
}
