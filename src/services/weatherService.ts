import { WeatherData } from '../types';
import { INITIAL_WEATHER_DISTRICTS } from '../data/mockData';

// Coordinates for major districts in Maharashtra / Central India
const DISTRICT_COORDINATES: Record<string, { lat: number; lon: number; displayName: string }> = {
  Nashik: { lat: 19.9975, lon: 73.7898, displayName: 'नाशिक (Nashik)' },
  Pune: { lat: 18.5204, lon: 73.8567, displayName: 'पुणे (Pune)' },
  'Chhatrapati Sambhajinagar': { lat: 19.8762, lon: 75.3433, displayName: 'छत्रपती संभाजीनगर (Aurangabad)' },
  Nagpur: { lat: 21.1458, lon: 79.0882, displayName: 'नागपूर (Nagpur)' },
  Solapur: { lat: 17.6599, lon: 75.9064, displayName: 'सोलापूर (Solapur)' },
  Kolhapur: { lat: 16.7050, lon: 74.2433, displayName: 'कोल्हापूर (Kolhapur)' },
  Amravati: { lat: 20.9320, lon: 77.7523, displayName: 'अमरावती (Amravati)' },
  Jalgaon: { lat: 21.0077, lon: 75.5626, displayName: 'जळगाव (Jalgaon)' },
  Ahmednagar: { lat: 19.0948, lon: 74.7480, displayName: 'अहिल्यानगर (Ahmednagar)' },
  Satara: { lat: 17.6805, lon: 73.9998, displayName: 'सातारा (Satara)' },
};

export async function fetchDistrictWeather(districtKey: string): Promise<WeatherData> {
  const coords = DISTRICT_COORDINATES[districtKey];
  const fallback = INITIAL_WEATHER_DISTRICTS[districtKey] || INITIAL_WEATHER_DISTRICTS['Nashik'];

  if (!coords) {
    return fallback;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) {
      return fallback;
    }
    const data = await res.json();
    const current = data.current;
    const daily = data.daily;

    const temp = Math.round((current.temperature_2m || fallback.temperature) * 10) / 10;
    const feelsLike = Math.round((current.apparent_temperature || temp) * 10) / 10;
    const humidity = Math.round(current.relative_humidity_2m || fallback.humidity);
    const windSpeed = Math.round((current.wind_speed_10m || fallback.windSpeed) * 10) / 10;
    const rainChance = daily?.precipitation_probability_max?.[0] ?? fallback.rainChance;

    let conditionCode: WeatherData['conditionCode'] = 'SUNNY';
    let conditionText = 'स्वच्छ आकाश';
    const code = current.weather_code || 0;

    if (code >= 51 || rainChance > 45) {
      conditionCode = 'RAIN';
      conditionText = 'पावसाची शक्यता';
    } else if (code >= 3) {
      conditionCode = 'CLOUDY';
      conditionText = 'ढगाळ वातावरण';
    } else if (code >= 1) {
      conditionCode = 'PARTLY_CLOUDY';
      conditionText = 'अंशतः ढगाळ';
    }

    // Determine Spray Suitability based on agrometeorological rules
    let spraySuitability: WeatherData['spraySuitability'] = 'EXCELLENT';
    let advisoryMr = '';
    let advisoryHi = '';
    let advisoryEn = '';

    if (rainChance > 40 || windSpeed > 16) {
      spraySuitability = 'NOT_RECOMMENDED';
      advisoryMr = `सावधान! ${rainChance}% पावसाची शक्यता आणि ${windSpeed} किमी/तास वारा आहे. आज फवारणी करू नका, अन्यथा औषध वाहून जाईल.`;
      advisoryHi = `सावधान! ${rainChance}% बारिश की संभावना और तेज हवा है। आज छिड़काव न करें।`;
      advisoryEn = `Warning: High rain chance (${rainChance}%) and wind (${windSpeed} km/h). Spraying is NOT recommended to prevent chemical runoff.`;
    } else if (windSpeed > 12 || temp > 35) {
      spraySuitability = 'MODERATE';
      advisoryMr = `मध्यम परिस्थिती: हवेचा वेग ${windSpeed} किमी/तास आहे. वाऱ्याच्या दिशेने काळजीपूर्वक फवारणी करा व सिलिकॉन स्टिकर वापरा.`;
      advisoryHi = `मध्यम स्थिति: हवा की गति ${windSpeed} किमी/घंटा है। सावधानीपूर्वक छिड़काव करें।`;
      advisoryEn = `Moderate conditions: Wind speed is ${windSpeed} km/h. Spray carefully in wind direction using a non-ionic spreader.`;
    } else {
      spraySuitability = 'EXCELLENT';
      advisoryMr = `फवारणीसाठी अतिशय उत्तम वेळ! हवेचा वेग कमी (${windSpeed} किमी/तास) आणि वातावरण कोरडे आहे. सकाळी ९ पूर्वी किंवा संध्याकाळी ४ नंतर फवारावे.`;
      advisoryHi = `छिड़काव के लिए बहुत अच्छा मौसम! हवा शांत है। सुबह या शाम को छिड़काव करें।`;
      advisoryEn = `Optimal conditions for spraying. Calm wind (${windSpeed} km/h) and minimal rain risk. Best before 9 AM or after 4 PM.`;
    }

    const forecast = (daily?.time || []).slice(0, 3).map((t: string, idx: number) => {
      const dayNamesMr = ['आज', 'उद्या', 'परवा'];
      return {
        day: dayNamesMr[idx] || t,
        maxTemp: Math.round(daily.temperature_2m_max[idx] || 32),
        minTemp: Math.round(daily.temperature_2m_min[idx] || 20),
        rainProb: daily.precipitation_probability_max[idx] || 10,
        condition: daily.precipitation_probability_max[idx] > 30 ? 'ढगाळ / पाऊस' : 'स्वच्छ ऊन',
      };
    });

    return {
      district: coords.displayName,
      temperature: temp,
      feelsLike,
      humidity,
      windSpeed,
      rainChance,
      condition: conditionText,
      conditionCode,
      spraySuitability,
      sprayAdvisory: {
        mr: advisoryMr,
        hi: advisoryHi,
        en: advisoryEn,
      },
      forecast: forecast.length > 0 ? forecast : fallback.forecast,
    };
  } catch {
    return fallback;
  }
}

export const AVAILABLE_DISTRICTS = Object.keys(DISTRICT_COORDINATES);
