import type { LangCode } from "./translations";

export type ActivityType =
  | "soilPrep"
  | "sowing"
  | "transplanting"
  | "irrigation"
  | "fertilizer"
  | "pestControl"
  | "weeding"
  | "harvesting";

export type CalendarEntry = {
  type: ActivityType;
  intensity: 1 | 2 | 3; // 1 = light, 3 = critical
  note: Record<LangCode, string>;
};

// 1-indexed months (1=Jan ... 12=Dec). Each crop maps months to a list of activities.
export type CropPlan = {
  season: "kharif" | "rabi" | "zaid" | "yearRound";
  months: Partial<Record<number, CalendarEntry[]>>;
};

const tipSoilPrep = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "soilPrep",
  intensity: 2,
  note: { en, hi, kn, te, ur },
});
const tipSowing = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "sowing",
  intensity: 3,
  note: { en, hi, kn, te, ur },
});
const tipTransplant = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "transplanting",
  intensity: 3,
  note: { en, hi, kn, te, ur },
});
const tipIrrigation = (
  en: string,
  hi: string,
  kn: string,
  te: string,
  ur: string,
  intensity: 1 | 2 | 3 = 2,
): CalendarEntry => ({ type: "irrigation", intensity, note: { en, hi, kn, te, ur } });
const tipFertilizer = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "fertilizer",
  intensity: 2,
  note: { en, hi, kn, te, ur },
});
const tipPest = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "pestControl",
  intensity: 2,
  note: { en, hi, kn, te, ur },
});
const tipWeeding = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "weeding",
  intensity: 1,
  note: { en, hi, kn, te, ur },
});
const tipHarvest = (en: string, hi: string, kn: string, te: string, ur: string): CalendarEntry => ({
  type: "harvesting",
  intensity: 3,
  note: { en, hi, kn, te, ur },
});

export const CROP_CALENDAR: Record<string, CropPlan> = {
  tomato: {
    season: "yearRound",
    months: {
      6: [
        tipSoilPrep(
          "Plough field, add 2 t/acre FYM",
          "खेत जोतें, 2 टन/एकड़ FYM डालें",
          "ಭೂಮಿ ಉಳುಮೆ, 2 ಟನ್/ಎಕರೆ FYM",
          "భూమి దున్నడం, 2 టన్నులు FYM",
          "کھیت کی جتائی، 2 ٹن FYM",
        ),
        tipSowing(
          "Nursery sowing — broadcast hybrid seed",
          "नर्सरी में संकर बीज छिड़कें",
          "ನರ್ಸರಿಯಲ್ಲಿ ಸಂಕರ ಬೀಜ ಬಿತ್ತನೆ",
          "నర్సరీలో హైబ్రిడ్ విత్తనం",
          "نرسری میں ہائبرڈ بیج",
        ),
      ],
      7: [
        tipTransplant(
          "Transplant 25-day-old seedlings, 60×45 cm",
          "25-दिन के पौधे रोपें, 60×45 सेमी",
          "25-ದಿನದ ಸಸಿಗಳನ್ನು ನಾಟಿ, 60×45 ಸೆಂ.ಮೀ",
          "25-రోజుల మొక్కలు నాటండి",
          "25 دن کی پنیری لگائیں",
        ),
        tipFertilizer(
          "Basal NPK 19:19:19 50 kg/acre",
          "बेसल NPK 19:19:19, 50 किग्रा/एकड़",
          "ಬೇಸಾಲ್ NPK 19:19:19, 50 ಕೆಜಿ/ಎಕರೆ",
          "బేసల్ NPK 19:19:19, 50 కిలోలు",
          "بنیادی NPK 19:19:19، 50 کلو",
        ),
      ],
      8: [
        tipIrrigation(
          "Drip every 2 days; mulch root zone",
          "हर 2 दिन ड्रिप; मल्चिंग",
          "2 ದಿನಕ್ಕೊಮ್ಮೆ ಡ್ರಿಪ್; ಮಲ್ಚಿಂಗ್",
          "2 రోజులకు డ్రిప్; మల్చ్",
          "ہر 2 دن ڈرپ؛ ملچنگ",
          3,
        ),
        tipWeeding("First weeding", "पहली निराई", "ಮೊದಲ ಕಳೆ ತೆಗೆಯುವಿಕೆ", "మొదటి కలుపు", "پہلی گوڈی"),
      ],
      9: [
        tipPest(
          "Scout for fruit borer; neem oil spray",
          "फल बेधक की निगरानी; नीम तेल छिड़काव",
          "ಫಲ ಕೊರಕ ಪರಿಶೀಲನೆ; ಬೇವಿನ ಎಣ್ಣೆ",
          "ఫ్రూట్ బోరర్ తనిఖీ; వేప నూనె",
          "پھل بورر کی نگرانی؛ نیم تیل",
        ),
        tipFertilizer(
          "Top-dress potash 25 kg/acre at flowering",
          "फूल आने पर पोटाश 25 किग्रा",
          "ಹೂಬಿಡುವಾಗ ಪೊಟಾಷ್ 25 ಕೆಜಿ",
          "పుష్పించేప్పుడు పొటాష్ 25 కిలోలు",
          "پھول آنے پر پوٹاش 25 کلو",
        ),
      ],
      10: [
        tipHarvest(
          "First harvest at 70-75 days; pick every 3 days",
          "70-75 दिन पहली कटाई; हर 3 दिन चुनें",
          "70-75 ದಿನಗಳಲ್ಲಿ ಮೊದಲ ಕೊಯ್ಲು",
          "70-75 రోజుల్లో మొదటి కోత",
          "70-75 دن پہلی کٹائی",
        ),
      ],
      11: [
        tipHarvest(
          "Continue harvesting; grade for market",
          "कटाई जारी; बाज़ार के लिए ग्रेडिंग",
          "ಕೊಯ್ಲು ಮುಂದುವರಿಸಿ; ಗ್ರೇಡಿಂಗ್",
          "కోత కొనసాగించండి; గ్రేడింగ్",
          "کٹائی جاری؛ گریڈنگ",
        ),
      ],
    },
  },
  onion: {
    season: "rabi",
    months: {
      9: [
        tipSoilPrep(
          "Deep ploughing, level field, add compost",
          "गहरी जुताई, मेड़बंदी, खाद",
          "ಆಳವಾದ ಉಳುಮೆ, ಗೊಬ್ಬರ",
          "లోతైన దున్నడం, ఎరువు",
          "گہری جتائی، کھاد",
        ),
        tipSowing(
          "Nursery sowing — Bellary Red / N-53",
          "नर्सरी बुवाई — बेल्लारी रेड",
          "ನರ್ಸರಿ ಬಿತ್ತನೆ — ಬಳ್ಳಾರಿ ಕೆಂಪು",
          "నర్సరీ విత్తనం — బళ్లారి రెడ్",
          "نرسری بوائی — بلاری ریڈ",
        ),
      ],
      10: [
        tipTransplant(
          "Transplant 6-week seedlings, 15×10 cm",
          "6-सप्ताह के पौधे रोपें",
          "6 ವಾರಗಳ ಸಸಿ ನಾಟಿ",
          "6 వారాల మొక్కలు నాటండి",
          "6 ہفتے کی پنیری لگائیں",
        ),
      ],
      11: [
        tipIrrigation(
          "Light irrigation every 7 days",
          "हर 7 दिन हल्की सिंचाई",
          "ಪ್ರತಿ 7 ದಿನಕ್ಕೊಮ್ಮೆ ನೀರಾವರಿ",
          "ప్రతి 7 రోజులకు నీరు",
          "ہر 7 دن ہلکی آبپاشی",
        ),
        tipFertilizer(
          "Top-dress urea 30 kg/acre",
          "यूरिया 30 किग्रा/एकड़",
          "ಯೂರಿಯಾ 30 ಕೆಜಿ/ಎಕರೆ",
          "యూరియా 30 కిలోలు",
          "یوریا 30 کلو",
        ),
      ],
      12: [
        tipWeeding(
          "Hand weeding, hoeing for bulb growth",
          "हाथ से निराई, गुड़ाई",
          "ಕೈ ಕಳೆ ತೆಗೆಯುವಿಕೆ",
          "చేతితో కలుపు తీత",
          "ہاتھ سے گوڈی",
        ),
      ],
      1: [
        tipPest(
          "Watch for thrips — apply insecticide if needed",
          "थ्रिप्स पर नज़र, आवश्यकता हो तो छिड़काव",
          "ಥ್ರಿಪ್ಸ್ ಮೇಲೆ ಗಮನ",
          "థ్రిప్స్ గమనించండి",
          "تھرپس پر نظر",
        ),
      ],
      2: [
        tipIrrigation(
          "Stop irrigation 10 days before harvest",
          "कटाई से 10 दिन पहले सिंचाई बंद",
          "ಕೊಯ್ಲು 10 ದಿನ ಮುನ್ನ ನೀರು ನಿಲ್ಲಿಸಿ",
          "కోత 10 రోజుల ముందు నీరు ఆపండి",
          "کٹائی سے 10 دن پہلے پانی بند",
          1,
        ),
        tipHarvest(
          "Harvest when 50% tops fall",
          "50% शीर्ष गिरने पर कटाई",
          "50% ತುದಿ ಬಿದ್ದಾಗ ಕೊಯ್ಲು",
          "50% శిఖరం పడినప్పుడు కోత",
          "50% سرے گرنے پر کٹائی",
        ),
      ],
      3: [
        tipHarvest(
          "Cure bulbs 3-5 days in shade",
          "बल्ब छाँव में 3-5 दिन सुखाएँ",
          "ಬಲ್ಬ್ ನೆರಳಿನಲ್ಲಿ 3-5 ದಿನ ಒಣಗಿಸಿ",
          "బల్బ్ నీడలో 3-5 రోజులు",
          "بلب کو سائے میں 3-5 دن",
        ),
      ],
    },
  },
  cotton: {
    season: "kharif",
    months: {
      4: [
        tipSoilPrep(
          "Deep summer ploughing for pest control",
          "कीट नियंत्रण हेतु गहरी ग्रीष्म जुताई",
          "ಬೇಸಿಗೆ ಆಳ ಉಳುಮೆ",
          "వేసవి లోతైన దున్నడం",
          "گرمیوں کی گہری جتائی",
        ),
      ],
      6: [
        tipSowing(
          "Sow Bt cotton seed, 90×45 cm spacing",
          "बीटी कपास बुवाई, 90×45 सेमी",
          "ಬಿಟಿ ಹತ್ತಿ ಬಿತ್ತನೆ",
          "బిటి ప్రత్తి విత్తనం",
          "بی ٹی کپاس بوائی",
        ),
        tipFertilizer(
          "Basal SSP 200 kg + DAP 50 kg/acre",
          "बेसल SSP 200 + DAP 50 किग्रा",
          "ಬೇಸಾಲ್ SSP 200 + DAP 50 ಕೆಜಿ",
          "బేసల్ SSP 200 + DAP 50 కిలోలు",
          "بنیادی SSP 200 + DAP 50 کلو",
        ),
      ],
      7: [
        tipWeeding("Inter-cultivation, hand weeding", "अंतर-खेती, निराई", "ಅಂತರ-ಬೇಸಾಯ", "అంతర సేద్యం", "بین کاشت"),
        tipPest(
          "Monitor for sucking pests — yellow sticky traps",
          "रसचूसक कीटों की निगरानी, येलो ट्रैप",
          "ರಸ ಹೀರುವ ಕೀಟ ನಿಗಾ",
          "రసం పీల్చే తెగుళ్లు",
          "رس چوسنے والے کیڑے",
        ),
      ],
      8: [
        tipFertilizer(
          "Top-dress urea 50 kg + potash 30 kg/acre",
          "यूरिया 50 + पोटाश 30 किग्रा",
          "ಯೂರಿಯಾ 50 + ಪೊಟಾಷ್ 30 ಕೆಜಿ",
          "యూరియా 50 + పొటాష్ 30 కిలోలు",
          "یوریا 50 + پوٹاش 30 کلو",
        ),
      ],
      9: [
        tipPest(
          "Pink bollworm scouting — pheromone traps",
          "गुलाबी बॉलवर्म निगरानी",
          "ಪಿಂಕ್ ಬಾಲ್‌ವರ್ಮ್ ನಿಗಾ",
          "పింక్ బోల్‌వార్మ్ తనిఖీ",
          "گلابی بال ورم نگرانی",
        ),
      ],
      10: [
        tipHarvest(
          "First picking — clean dry kapas",
          "पहली चुनाई — साफ़ सूखी कपास",
          "ಮೊದಲ ಕೊಯ್ಲು — ಶುದ್ಧ ಒಣ ಹತ್ತಿ",
          "మొదటి కోత — శుభ్రమైన ప్రత్తి",
          "پہلی چنائی — صاف خشک کپاس",
        ),
      ],
      11: [
        tipHarvest(
          "Second picking; grade by staple length",
          "दूसरी चुनाई; स्टेपल लम्बाई से ग्रेडिंग",
          "ಎರಡನೇ ಕೊಯ್ಲು; ಗ್ರೇಡಿಂಗ್",
          "రెండవ కోత; గ్రేడింగ్",
          "دوسری چنائی؛ گریڈنگ",
        ),
      ],
      12: [
        tipHarvest(
          "Final picking; uproot stalks after",
          "अंतिम चुनाई; डंठल उखाड़ें",
          "ಅಂತಿಮ ಕೊಯ್ಲು",
          "చివరి కోత",
          "آخری چنائی",
        ),
      ],
    },
  },
  rice: {
    season: "kharif",
    months: {
      5: [
        tipSoilPrep(
          "Puddle the field, build bunds",
          "खेत में कीचड़ बनाएँ, मेड़ बनाएँ",
          "ಗದ್ದೆ ಪಡ್ಡಿಂಗ್",
          "నీటి దున్నడం, గట్లు",
          "کیچڑ بنائیں، بند بنائیں",
        ),
        tipSowing("Nursery sowing", "नर्सरी बुवाई", "ನರ್ಸರಿ ಬಿತ್ತನೆ", "నర్సరీ విత్తనం", "نرسری بوائی"),
      ],
      6: [
        tipTransplant(
          "Transplant 25-day seedlings, 20×15 cm",
          "25-दिन के पौधे रोपें",
          "25-ದಿನದ ಸಸಿ ನಾಟಿ",
          "25-రోజుల మొక్కలు",
          "25 دن کی پنیری",
        ),
      ],
      7: [
        tipIrrigation(
          "Maintain 5 cm standing water during tillering",
          "कल्ले निकलते समय 5 सेमी पानी",
          "ಟಿಲರಿಂಗ್‌ನಲ್ಲಿ 5 ಸೆಂ.ಮೀ ನೀರು",
          "టిల్లరింగ్ సమయంలో 5 సెం.మీ నీరు",
          "ٹلرنگ کے دوران 5 سینٹی میٹر پانی",
          3,
        ),
        tipFertilizer(
          "Top-dress urea 30 kg/acre",
          "यूरिया 30 किग्रा/एकड़",
          "ಯೂರಿಯಾ 30 ಕೆಜಿ",
          "యూరియా 30 కిలోలు",
          "یوریا 30 کلو",
        ),
      ],
      8: [
        tipPest(
          "Stem borer scouting; light traps",
          "तना बेधक निगरानी; प्रकाश ट्रैप",
          "ಕಾಂಡ ಕೊರಕ ನಿಗಾ",
          "కాండం బోరర్ తనిఖీ",
          "ٹہنی بورر نگرانی",
        ),
      ],
      9: [
        tipFertilizer(
          "Final urea dose at panicle initiation",
          "बाली अवस्था पर अंतिम यूरिया",
          "ಪ್ಯಾನಿಕಲ್‌ನಲ್ಲಿ ಅಂತಿಮ ಯೂರಿಯಾ",
          "పానికిల్ వద్ద చివరి యూరియా",
          "پینکل پر آخری یوریا",
        ),
      ],
      10: [
        tipIrrigation(
          "Drain field 10 days before harvest",
          "कटाई से 10 दिन पहले पानी निकालें",
          "ಕೊಯ್ಲು 10 ದಿನ ಮುನ್ನ ನೀರು ತೆಗೆಯಿರಿ",
          "కోతకు 10 రోజుల ముందు నీరు తీయండి",
          "کٹائی سے 10 دن پہلے پانی نکالیں",
          1,
        ),
        tipHarvest(
          "Harvest when 80% grains turn golden",
          "80% दाने सुनहरे होने पर कटाई",
          "80% ಧಾನ್ಯ ಚಿನ್ನದ ಬಣ್ಣ",
          "80% గింజలు బంగారు రంగు",
          "80% دانے سنہرے ہونے پر",
        ),
      ],
      11: [
        tipHarvest(
          "Threshing, drying to 14% moisture",
          "थ्रेसिंग, 14% नमी तक सुखाना",
          "ಒಕ್ಕಣೆ, 14% ತೇವಾಂಶ",
          "నూర్పిడి, 14% తేమ",
          "تھریشنگ، 14% نمی",
        ),
      ],
    },
  },
  wheat: {
    season: "rabi",
    months: {
      10: [
        tipSoilPrep(
          "Plough field, level with planker",
          "खेत जोतें, समतल करें",
          "ಭೂಮಿ ಉಳುಮೆ, ಸಮತಲ",
          "భూమి దున్నడం, చదును",
          "کھیت کی جتائی، ہموار",
        ),
      ],
      11: [
        tipSowing(
          "Sow HD-2967 / DBW-187, 100 kg seed/acre",
          "HD-2967 बुवाई, 100 किग्रा/एकड़",
          "HD-2967 ಬಿತ್ತನೆ",
          "HD-2967 విత్తనం",
          "HD-2967 بوائی",
        ),
        tipFertilizer(
          "Basal DAP 50 kg + MOP 25 kg/acre",
          "बेसल DAP 50 + MOP 25 किग्रा",
          "ಬೇಸಾಲ್ DAP 50 + MOP 25 ಕೆಜಿ",
          "బేసల్ DAP 50 + MOP 25 కిలోలు",
          "بنیادی DAP 50 + MOP 25 کلو",
        ),
      ],
      12: [
        tipIrrigation(
          "First irrigation at 21 days (CRI stage)",
          "21 दिन पर पहली सिंचाई",
          "21 ದಿನಗಳಲ್ಲಿ ಮೊದಲ ನೀರಾವರಿ",
          "21 రోజులకు మొదటి నీరు",
          "21 دن پر پہلی آبپاشی",
          3,
        ),
      ],
      1: [
        tipFertilizer(
          "Top-dress urea 30 kg at tillering",
          "कल्ले पर यूरिया 30 किग्रा",
          "ಟಿಲರಿಂಗ್‌ನಲ್ಲಿ ಯೂರಿಯಾ 30 ಕೆಜಿ",
          "టిల్లరింగ్ వద్ద యూరియా 30 కిలోలు",
          "ٹلرنگ پر یوریا 30 کلو",
        ),
        tipIrrigation(
          "Second irrigation",
          "दूसरी सिंचाई",
          "ಎರಡನೇ ನೀರಾವರಿ",
          "రెండవ నీరు",
          "دوسری آبپاشی",
        ),
      ],
      2: [
        tipPest(
          "Watch for aphids; spray imidacloprid if heavy",
          "एफिड्स पर नज़र रखें",
          "ಎಫಿಡ್ಸ್ ನಿಗಾ",
          "అఫిడ్స్ గమనించండి",
          "اے فڈ پر نظر",
        ),
        tipIrrigation(
          "Irrigation at flowering — most critical",
          "फूल आने पर सिंचाई — सबसे ज़रूरी",
          "ಹೂಬಿಡುವಿಕೆಗೆ ನೀರಾವರಿ",
          "పుష్పించడానికి నీరు — అత్యంత ముఖ్యం",
          "پھول پر آبپاشی — انتہائی اہم",
          3,
        ),
      ],
      3: [
        tipIrrigation(
          "Final irrigation at grain filling",
          "दाना भरने पर अंतिम सिंचाई",
          "ಧಾನ್ಯ ತುಂಬುವಾಗ ಅಂತಿಮ ನೀರು",
          "గింజ నింపే సమయంలో చివరి నీరు",
          "دانہ بھرنے پر آخری آبپاشی",
        ),
      ],
      4: [
        tipHarvest(
          "Harvest when grains hard, 14% moisture",
          "दाने सख्त, 14% नमी पर कटाई",
          "ಧಾನ್ಯ ಗಟ್ಟಿ, 14% ತೇವಾಂಶ",
          "గింజలు గట్టిగా, 14% తేమ",
          "دانے سخت، 14% نمی",
        ),
      ],
    },
  },
  maize: {
    season: "kharif",
    months: {
      6: [
        tipSoilPrep("Plough and level", "जुताई और समतलीकरण", "ಉಳುಮೆ ಸಮತಲ", "దున్నడం", "جتائی"),
        tipSowing(
          "Sow hybrid maize, 60×20 cm spacing",
          "संकर मक्का बुवाई, 60×20 सेमी",
          "ಸಂಕರ ಜೋಳ ಬಿತ್ತನೆ",
          "హైబ్రిడ్ మొక్కజొన్న",
          "ہائبرڈ مکئی بوائی",
        ),
      ],
      7: [
        tipFertilizer(
          "Basal NPK 60 kg/acre + zinc",
          "बेसल NPK 60 किग्रा + ज़िंक",
          "ಬೇಸಾಲ್ NPK 60 ಕೆಜಿ + ಸತು",
          "బేసల్ NPK 60 కిలోలు + జింక్",
          "بنیادی NPK 60 کلو + زنک",
        ),
        tipWeeding("First weeding at 25 days", "25 दिन पर पहली निराई", "25 ದಿನಗಳಲ್ಲಿ ಕಳೆ", "25 రోజులకు కలుపు", "25 دن پر گوڈی"),
      ],
      8: [
        tipPest(
          "Fall armyworm scouting; trichogramma cards",
          "फॉल आर्मीवर्म निगरानी",
          "ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್ ನಿಗಾ",
          "ఫాల్ ఆర్మీవార్మ్ తనిఖీ",
          "فال آرمی ورم نگرانی",
        ),
        tipFertilizer(
          "Top-dress urea 40 kg/acre at knee height",
          "घुटने ऊँचाई पर यूरिया 40 किग्रा",
          "ಮೊಣಕಾಲು ಎತ್ತರದಲ್ಲಿ ಯೂರಿಯಾ 40 ಕೆಜಿ",
          "మోకాలు ఎత్తులో యూరియా 40 కిలోలు",
          "گھٹنے کی اونچائی پر یوریا 40 کلو",
        ),
      ],
      9: [
        tipIrrigation(
          "Critical irrigation at tasseling",
          "तासेलिंग पर अहम सिंचाई",
          "ಟ್ಯಾಸಲಿಂಗ್‌ನಲ್ಲಿ ನೀರು",
          "టాసెలింగ్ వద్ద నీరు",
          "ٹیسلنگ پر آبپاشی",
          3,
        ),
      ],
      10: [
        tipHarvest(
          "Harvest when husks dry, kernels hard",
          "भूसे सूखने पर कटाई",
          "ಹೊಟ್ಟು ಒಣಗಿದಾಗ ಕೊಯ್ಲು",
          "పొట్టు ఎండినప్పుడు కోత",
          "بھوسے سوکھنے پر",
        ),
      ],
    },
  },
  potato: {
    season: "rabi",
    months: {
      9: [
        tipSoilPrep(
          "Deep ploughing, ridge formation",
          "गहरी जुताई, मेड़ बनाएँ",
          "ಆಳ ಉಳುಮೆ, ರಿಡ್ಜ್",
          "లోతైన దున్నడం",
          "گہری جتائی",
        ),
      ],
      10: [
        tipSowing(
          "Plant tubers 60×20 cm, 6-8 cm deep",
          "कंद 60×20 सेमी, 6-8 सेमी गहरे",
          "ಗೆಡ್ಡೆ ನಾಟಿ 60×20 ಸೆಂ.ಮೀ",
          "దుంపలు నాటండి",
          "آلو لگائیں",
        ),
        tipFertilizer(
          "Basal NPK + FYM 5 t/acre",
          "बेसल NPK + FYM 5 टन/एकड़",
          "ಬೇಸಾಲ್ NPK + FYM 5 ಟನ್",
          "బేసల్ NPK + FYM 5 టన్నులు",
          "بنیادی NPK + FYM 5 ٹن",
        ),
      ],
      11: [
        tipIrrigation(
          "Light irrigation every 7-10 days",
          "हर 7-10 दिन हल्की सिंचाई",
          "7-10 ದಿನಕ್ಕೊಮ್ಮೆ ನೀರು",
          "7-10 రోజులకు నీరు",
          "ہر 7-10 دن آبپاشی",
        ),
        tipPest(
          "Late blight watch — Mancozeb spray if humid",
          "लेट ब्लाइट निगरानी, मैनकोज़ेब",
          "ಲೇಟ್ ಬ್ಲೈಟ್ ನಿಗಾ",
          "లేట్ బ్లైట్ తనిఖీ",
          "لیٹ بلائٹ نگرانی",
        ),
      ],
      12: [
        tipFertilizer(
          "Earthing-up + urea 25 kg/acre",
          "मिट्टी चढ़ाई + यूरिया 25 किग्रा",
          "ಮಣ್ಣು ಎಬ್ಬಿಸುವಿಕೆ + ಯೂರಿಯಾ",
          "మట్టి ఎత్తడం + యూరియా",
          "مٹی چڑھانا + یوریا",
        ),
      ],
      1: [
        tipHarvest(
          "Stop irrigation 10 days before harvest",
          "कटाई से 10 दिन पहले सिंचाई बंद",
          "ಕೊಯ್ಲು 10 ದಿನ ಮುನ್ನ ನೀರು ನಿಲ್ಲಿಸಿ",
          "కోతకు 10 రోజుల ముందు నీరు ఆపండి",
          "10 دن پہلے پانی بند",
        ),
        tipHarvest(
          "Harvest when foliage yellows",
          "पत्तियाँ पीली होने पर कटाई",
          "ಎಲೆ ಹಳದಿಯಾದಾಗ ಕೊಯ್ಲು",
          "ఆకులు పసుపు రంగులోకి",
          "پتے زرد ہونے پر",
        ),
      ],
    },
  },
  sugarcane: {
    season: "yearRound",
    months: {
      2: [
        tipSoilPrep(
          "Deep ploughing, furrows 90 cm apart",
          "गहरी जुताई, 90 सेमी कूँड़",
          "ಆಳ ಉಳುಮೆ, 90 ಸೆಂ.ಮೀ ಸಾಲು",
          "లోతైన దున్నడం",
          "گہری جتائی، 90 سینٹی میٹر گڑھے",
        ),
        tipSowing(
          "Plant 2-bud setts in furrows",
          "2-कली सेट्स लगाएँ",
          "2-ಮೊಗ್ಗು ಸೆಟ್ ನಾಟಿ",
          "2-మొగ్గ సెట్స్ నాటండి",
          "2 کلی سیٹ لگائیں",
        ),
      ],
      3: [
        tipFertilizer(
          "Basal NPK + FYM 10 t/acre",
          "बेसल NPK + FYM 10 टन",
          "ಬೇಸಾಲ್ NPK + FYM 10 ಟನ್",
          "బేసల్ NPK + FYM 10 టన్నులు",
          "بنیادی NPK + FYM 10 ٹن",
        ),
        tipIrrigation("Pre-monsoon irrigation weekly", "हर सप्ताह सिंचाई", "ಸಾಪ್ತಾಹಿಕ ನೀರಾವರಿ", "వారపు నీరు", "ہفتہ وار آبپاشی"),
      ],
      6: [
        tipFertilizer(
          "Top-dress urea 100 kg/acre + earthing-up",
          "यूरिया 100 किग्रा + मिट्टी चढ़ाई",
          "ಯೂರಿಯಾ 100 ಕೆಜಿ + ಮಣ್ಣು",
          "యూరియా 100 కిలోలు + మట్టి",
          "یوریا 100 کلو + مٹی",
        ),
      ],
      8: [
        tipPest(
          "Internode borer scouting",
          "इंटरनोड बेधक निगरानी",
          "ಇಂಟರ್‌ನೋಡ್ ಕೊರಕ ನಿಗಾ",
          "ఇంటర్‌నోడ్ బోరర్ తనిఖీ",
          "انٹرنوڈ بورر نگرانی",
        ),
      ],
      11: [
        tipHarvest(
          "Cane maturity test — Brix > 18%",
          "गन्ना परिपक्वता — ब्रिक्स > 18%",
          "ಕಬ್ಬು ಪಕ್ವತೆ — ಬ್ರಿಕ್ಸ್ > 18%",
          "చెరకు పక్వత — బ్రిక్స్ > 18%",
          "گنا پختگی — برکس > 18%",
        ),
      ],
      12: [
        tipHarvest(
          "Harvest at ground level; transport in 24 hrs",
          "ज़मीनी स्तर पर कटाई; 24 घंटे में परिवहन",
          "ನೆಲಮಟ್ಟದಲ್ಲಿ ಕೊಯ್ಲು",
          "నేలమట్టం వద్ద కోత",
          "زمینی سطح پر کٹائی",
        ),
      ],
      1: [
        tipHarvest(
          "Continue harvest; replant if ratoon",
          "कटाई जारी; रटून पुनर्रोपण",
          "ಕೊಯ್ಲು ಮುಂದುವರಿಸಿ",
          "కోత కొనసాగించండి",
          "کٹائی جاری",
        ),
      ],
    },
  },
  groundnut: {
    season: "kharif",
    months: {
      6: [
        tipSoilPrep(
          "Plough field, add gypsum 200 kg/acre",
          "जुताई, जिप्सम 200 किग्रा",
          "ಉಳುಮೆ, ಜಿಪ್ಸಮ್ 200 ಕೆಜಿ",
          "దున్నడం, జిప్సం 200 కిలోలు",
          "جتائی، جپسم 200 کلو",
        ),
        tipSowing(
          "Sow TMV-2 / TAG-24, 30×10 cm",
          "TMV-2 बुवाई, 30×10 सेमी",
          "TMV-2 ಬಿತ್ತನೆ",
          "TMV-2 విత్తనం",
          "TMV-2 بوائی",
        ),
      ],
      7: [
        tipWeeding("First weeding at 25 days", "25 दिन पर निराई", "25 ದಿನಗಳಲ್ಲಿ ಕಳೆ", "25 రోజులకు కలుపు", "25 دن پر گوڈی"),
        tipFertilizer(
          "Foliar spray micronutrients",
          "सूक्ष्म पोषक स्प्रे",
          "ಸೂಕ್ಷ್ಮ ಪೋಷಕ ಸಿಂಪಡಣೆ",
          "సూక్ష్మ పోషక స్ప్రే",
          "مائکرو نیوٹرینٹ اسپرے",
        ),
      ],
      8: [
        tipIrrigation(
          "Critical: pegging stage water",
          "पेगिंग पर सिंचाई महत्वपूर्ण",
          "ಪೆಗ್ಗಿಂಗ್‌ನಲ್ಲಿ ನೀರು",
          "పెగ్గింగ్ వద్ద నీరు",
          "پیگنگ پر پانی",
          3,
        ),
        tipPest(
          "Leaf miner, tikka disease watch",
          "लीफ माइनर, टिक्का रोग",
          "ಲೀಫ್ ಮೈನರ್ ನಿಗಾ",
          "లీఫ్ మైనర్ తనిఖీ",
          "لیف مائنر نگرانی",
        ),
      ],
      9: [
        tipIrrigation(
          "Pod development water",
          "फली विकास सिंचाई",
          "ಪಾಡ್ ಬೆಳವಣಿಗೆಗೆ ನೀರು",
          "పాడ్ వృద్ధికి నీరు",
          "پھلی ترقی کے لیے پانی",
        ),
      ],
      10: [
        tipHarvest(
          "Harvest at 110-120 days; cure pods",
          "110-120 दिन पर कटाई",
          "110-120 ದಿನಗಳಲ್ಲಿ ಕೊಯ್ಲು",
          "110-120 రోజుల్లో కోత",
          "110-120 دن پر کٹائی",
        ),
      ],
    },
  },
  chili: {
    season: "yearRound",
    months: {
      6: [
        tipSoilPrep("Plough, add FYM 5 t/acre", "जुताई, FYM 5 टन", "ಉಳುಮೆ, FYM 5 ಟನ್", "దున్నడం, FYM 5 టన్నులు", "جتائی، FYM 5 ٹن"),
        tipSowing("Nursery sowing of hybrid chili", "नर्सरी बुवाई", "ನರ್ಸರಿ ಬಿತ್ತನೆ", "నర్సరీ విత్తనం", "نرسری بوائی"),
      ],
      7: [
        tipTransplant(
          "Transplant 6-week seedlings, 60×45 cm",
          "6-सप्ताह के पौधे रोपें",
          "6 ವಾರಗಳ ಸಸಿ ನಾಟಿ",
          "6 వారాల మొక్కలు",
          "6 ہفتے کی پنیری",
        ),
        tipFertilizer(
          "Basal NPK 50 kg/acre",
          "बेसल NPK 50 किग्रा",
          "ಬೇಸಾಲ್ NPK 50 ಕೆಜಿ",
          "బేసల్ NPK 50 కిలోలు",
          "بنیادی NPK 50 کلو",
        ),
      ],
      8: [
        tipPest(
          "Thrips & mites scouting; spinosad spray",
          "थ्रिप्स माइट्स; स्पिनोसैड",
          "ಥ್ರಿಪ್ಸ್ ನಿಗಾ",
          "థ్రిప్స్ తనిఖీ",
          "تھرپس نگرانی",
        ),
        tipWeeding("Inter-cultivation", "अंतर-खेती", "ಅಂತರ-ಬೇಸಾಯ", "అంతర సేద్యం", "بین کاشت"),
      ],
      9: [
        tipFertilizer(
          "Top-dress potash 30 kg at flowering",
          "फूलने पर पोटाश 30 किग्रा",
          "ಹೂಬಿಡುವಿಕೆಗೆ ಪೊಟಾಷ್ 30 ಕೆಜಿ",
          "పుష్పించడానికి పొటాష్ 30 కిలోలు",
          "پھول پر پوٹاش 30 کلو",
        ),
      ],
      10: [
        tipHarvest(
          "First green chili picking",
          "पहली हरी मिर्च चुनाई",
          "ಮೊದಲ ಹಸಿ ಮೆಣಸಿನಕಾಯಿ",
          "మొదటి పచ్చి మిర్చి",
          "پہلی ہری مرچ",
        ),
      ],
      11: [
        tipHarvest(
          "Continue picking every 7 days",
          "हर 7 दिन चुनाई",
          "ಪ್ರತಿ 7 ದಿನಕ್ಕೊಮ್ಮೆ ಕೊಯ್ಲು",
          "ప్రతి 7 రోజులకు కోత",
          "ہر 7 دن چنائی",
        ),
      ],
      12: [
        tipHarvest(
          "Final dry-red harvest, sun-dry pods",
          "लाल मिर्च कटाई, धूप में सुखाएँ",
          "ಒಣ ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ",
          "ఎండు ఎర్ర మిర్చి",
          "خشک سرخ مرچ",
        ),
      ],
    },
  },
};

export const MONTH_LABELS: Record<LangCode, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  hi: ["जन", "फ़र", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अग", "सित", "अक्टू", "नव", "दिस"],
  kn: ["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ"],
  te: ["జన", "ఫిబ్ర", "మార్చి", "ఏప్రి", "మే", "జూన్", "జులై", "ఆగ", "సెప్", "అక్టో", "నవం", "డిసెం"],
  ur: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"],
};
