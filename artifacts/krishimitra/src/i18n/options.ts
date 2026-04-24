import type { LangCode } from "./translations";

export type Option = {
  value: string;
  labels: Record<LangCode, string>;
  image?: string;
};

export const CROP_OPTIONS: Option[] = [
  {
    value: "tomato",
    labels: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮ್ಯಾಟೋ",
      te: "టమోటో",
      ur: "ٹماٹر",
    },
    image: "crops/crop_tomato.jpg",
  },
  {
    value: "onion",
    labels: { en: "Onion", hi: "प्याज", kn: "ಈರುಳ್ಳಿ", te: "ఉల్లి", ur: "پیاز" },
    image: "crops/crop_onion.jpg",
  },
  {
    value: "cotton",
    labels: { en: "Cotton", hi: "कपास", kn: "ಹತ್ತಿ", te: "ప్రత్తి", ur: "کپاس" },
    image: "crops/crop_cotton.jpg",
  },
  {
    value: "rice",
    labels: { en: "Rice", hi: "चावल", kn: "ಅಕ್ಕಿ", te: "వరి", ur: "چاول" },
    image: "crops/crop_rice.jpg",
  },
  {
    value: "wheat",
    labels: { en: "Wheat", hi: "गेहूँ", kn: "ಗೋಧಿ", te: "గోధుమ", ur: "گندم" },
    image: "crops/crop_wheat.jpg",
  },
  {
    value: "maize",
    labels: { en: "Maize", hi: "मक्का", kn: "ಮುಸುಕಿನ ಜೋಳ", te: "మొక్కజొన్న", ur: "مکئی" },
    image: "crops/crop_maize.jpg",
  },
  {
    value: "potato",
    labels: { en: "Potato", hi: "आलू", kn: "ಆಲೂಗಡ್ಡೆ", te: "బంగాళదుంప", ur: "آلو" },
    image: "crops/crop_potato.jpg",
  },
  {
    value: "sugarcane",
    labels: { en: "Sugarcane", hi: "गन्ना", kn: "ಕಬ್ಬು", te: "చెరకు", ur: "گنا" },
    image: "crops/crop_sugarcane.jpg",
  },
  {
    value: "groundnut",
    labels: { en: "Groundnut", hi: "मूँगफली", kn: "ಶೇಂಗಾ", te: "వేరుశెనగ", ur: "مونگ پھلی" },
    image: "crops/crop_groundnut.jpg",
  },
  {
    value: "chili",
    labels: { en: "Chili", hi: "मिर्च", kn: "ಮೆಣಸಿನಕಾಯಿ", te: "మిర్చి", ur: "مرچ" },
    image: "crops/crop_chili.jpg",
  },
];

export const SOIL_OPTIONS: Option[] = [
  {
    value: "red",
    labels: { en: "Red Soil", hi: "लाल मिट्टी", kn: "ಕೆಂಪು ಮಣ್ಣು", te: "ఎర్ర నేల", ur: "سرخ مٹی" },
  },
  {
    value: "black",
    labels: { en: "Black Soil", hi: "काली मिट्टी", kn: "ಕಪ್ಪು ಮಣ್ಣು", te: "నల్ల నేల", ur: "کالی مٹی" },
  },
  {
    value: "alluvial",
    labels: { en: "Alluvial Soil", hi: "जलोढ़ मिट्टी", kn: "ಮೆಕ್ಕಲು ಮಣ್ಣು", te: "ఒండ్రు నేల", ur: "آبی مٹی" },
  },
  {
    value: "loamy",
    labels: { en: "Loamy Soil", hi: "दोमट मिट्टी", kn: "ಲೋಮಿ ಮಣ್ಣು", te: "లోమీ నేల", ur: "دومٹ مٹی" },
  },
  {
    value: "sandy",
    labels: { en: "Sandy Soil", hi: "रेतीली मिट्टी", kn: "ಮರಳು ಮಣ್ಣು", te: "ఇసుక నేల", ur: "ریتلی مٹی" },
  },
  {
    value: "clay",
    labels: { en: "Clay Soil", hi: "चिकनी मिट्टी", kn: "ಜೇಡಿ ಮಣ್ಣು", te: "మట్టి నేల", ur: "چکنی مٹی" },
  },
];

export const IRRIGATION_OPTIONS: Option[] = [
  {
    value: "drip",
    labels: { en: "Drip", hi: "ड्रिप", kn: "ಡ್ರಿಪ್", te: "డ్రిప్", ur: "ڈرپ" },
  },
  {
    value: "sprinkler",
    labels: { en: "Sprinkler", hi: "स्प्रिंकलर", kn: "ಸ್ಪ್ರಿಂಕ್ಲರ್", te: "స్ప్రింక్లర్", ur: "اسپرنکلر" },
  },
  {
    value: "flood",
    labels: { en: "Flood", hi: "बाढ़ सिंचाई", kn: "ಪ್ರವಾಹ", te: "వరద", ur: "سیلاب" },
  },
  {
    value: "rainfed",
    labels: { en: "Rain-fed", hi: "वर्षा आधारित", kn: "ಮಳೆ ಆಧಾರಿತ", te: "వర్షాధార", ur: "بارش پر منحصر" },
  },
  {
    value: "canal",
    labels: { en: "Canal", hi: "नहर", kn: "ಕಾಲುವೆ", te: "కాలువ", ur: "نہر" },
  },
];

export const GROWTH_STAGE_OPTIONS: Option[] = [
  {
    value: "seedling",
    labels: { en: "Seedling", hi: "अंकुरण", kn: "ಮೊಳಕೆ", te: "మొలక", ur: "پنیری" },
  },
  {
    value: "vegetative",
    labels: { en: "Vegetative", hi: "वानस्पतिक", kn: "ಸಸ್ಯವರ್ಗ", te: "వృక్ష", ur: "نباتاتی" },
  },
  {
    value: "flowering",
    labels: { en: "Flowering", hi: "फूल आना", kn: "ಹೂಬಿಡುವಿಕೆ", te: "పూత", ur: "پھول" },
  },
  {
    value: "fruiting",
    labels: { en: "Fruiting", hi: "फलन", kn: "ಫಲ ಬಿಡುವಿಕೆ", te: "కాయ", ur: "پھل" },
  },
  {
    value: "ripening",
    labels: { en: "Ripening", hi: "पकना", kn: "ಪಕ್ವತೆ", te: "పక్వం", ur: "پختگی" },
  },
];

export const QUALITY_GRADE_OPTIONS: Option[] = [
  {
    value: "A",
    labels: {
      en: "Grade A — Premium",
      hi: "ग्रेड A — प्रीमियम",
      kn: "ಗ್ರೇಡ್ A — ಪ್ರೀಮಿಯಂ",
      te: "గ్రేడ్ A — ప్రీమియం",
      ur: "گریڈ A — پریمیم",
    },
  },
  {
    value: "B",
    labels: {
      en: "Grade B — Standard",
      hi: "ग्रेड B — मानक",
      kn: "ಗ್ರೇಡ್ B — ಸ್ಟ್ಯಾಂಡರ್ಡ್",
      te: "గ్రేడ్ B — ప్రామాణికం",
      ur: "گریڈ B — معیاری",
    },
  },
  {
    value: "C",
    labels: {
      en: "Grade C — Economy",
      hi: "ग्रेड C — किफायती",
      kn: "ಗ್ರೇಡ್ C — ಎಕಾನಮಿ",
      te: "గ్రేడ్ C — ఎకానమీ",
      ur: "گریڈ C — اکانومی",
    },
  },
];

export function getCropImage(value: string): string {
  const c = CROP_OPTIONS.find(
    (o) => o.value.toLowerCase() === value.toLowerCase() || o.labels.en.toLowerCase() === value.toLowerCase(),
  );
  return c?.image ?? "crops/crop_tomato.jpg";
}

export function getCropLabel(value: string, lang: LangCode): string {
  const c = CROP_OPTIONS.find(
    (o) => o.value.toLowerCase() === value.toLowerCase() || o.labels.en.toLowerCase() === value.toLowerCase(),
  );
  return c?.labels[lang] ?? value;
}

export function findOption(opts: Option[], value: string): Option | undefined {
  return opts.find(
    (o) => o.value.toLowerCase() === value.toLowerCase() || o.labels.en.toLowerCase() === value.toLowerCase(),
  );
}
