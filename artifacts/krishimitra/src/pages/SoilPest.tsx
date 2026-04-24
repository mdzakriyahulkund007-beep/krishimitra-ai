import { Sprout, Bug, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import { t, type LangCode } from "@/i18n/translations";
import { VoiceButton } from "@/components/VoiceButton";

const DATA: Record<LangCode, { crops: string[]; pests: string[]; fertilizer: string[] }> = {
  en: {
    crops: ["Tomato", "Onion", "Cotton", "Groundnut", "Maize"],
    pests: ["Aphids", "Whitefly", "Fruit borer", "Leaf miner"],
    fertilizer: [
      "NPK 19:19:19 — base dose 50kg/acre",
      "Vermicompost — 2 tons/acre",
      "Zinc sulphate — 10kg/acre at sowing",
    ],
  },
  hi: {
    crops: ["टमाटर", "प्याज", "कपास", "मूँगफली", "मक्का"],
    pests: ["एफिड्स", "सफ़ेद मक्खी", "फल बेधक", "पत्ती सुरंगक"],
    fertilizer: [
      "एनपीके 19:19:19 — आधार खुराक 50 किग्रा/एकड़",
      "वर्मीकम्पोस्ट — 2 टन/एकड़",
      "जिंक सल्फेट — 10 किग्रा/एकड़ बुवाई पर",
    ],
  },
  kn: {
    crops: ["ಟೊಮ್ಯಾಟೋ", "ಈರುಳ್ಳಿ", "ಹತ್ತಿ", "ಶೇಂಗಾ", "ಮುಸುಕಿನ ಜೋಳ"],
    pests: ["ಅಫಿಡ್ಸ್", "ಬಿಳಿ ನೊಣ", "ಹಣ್ಣಿನ ಕೊರೆಯುವ ಹುಳು", "ಎಲೆ ಗಣಿಗಾರ"],
    fertilizer: [
      "NPK 19:19:19 — ಬೇಸ್ ಡೋಸ್ 50 ಕೆಜಿ/ಎಕರೆ",
      "ವರ್ಮಿಕಾಂಪೋಸ್ಟ್ — 2 ಟನ್/ಎಕರೆ",
      "ಜಿಂಕ್ ಸಲ್ಫೇಟ್ — ಬಿತ್ತನೆಯಲ್ಲಿ 10 ಕೆಜಿ/ಎಕರೆ",
    ],
  },
  te: {
    crops: ["టమోటో", "ఉల్లి", "ప్రత్తి", "వేరుశెనగ", "మొక్కజొన్న"],
    pests: ["అఫిడ్స్", "తెల్ల నల్లి", "పండు రంధ్రకం", "ఆకు తొలుచు పురుగు"],
    fertilizer: [
      "NPK 19:19:19 — బేస్ డోస్ 50 కిలోలు/ఎకరం",
      "వర్మికంపోస్ట్ — 2 టన్నులు/ఎకరం",
      "జింక్ సల్ఫేట్ — విత్తనానికి 10 కిలోలు/ఎకరం",
    ],
  },
  ur: {
    crops: ["ٹماٹر", "پیاز", "کپاس", "مونگ پھلی", "مکئی"],
    pests: ["تیلا", "سفید مکھی", "پھل کا کیڑا", "پتی کا کان کن"],
    fertilizer: [
      "این پی کے 19:19:19 — بنیادی خوراک 50 کلو/ایکڑ",
      "ورمی کمپوسٹ — 2 ٹن/ایکڑ",
      "زنک سلفیٹ — بوائی پر 10 کلو/ایکڑ",
    ],
  },
};

export default function SoilPest() {
  const { lang } = useApp();
  const data = DATA[lang];
  const speakText = [
    `${t("suitableCrops", lang)}: ${data.crops.join(", ")}.`,
    `${t("commonPests", lang)}: ${data.pests.join(", ")}.`,
    `${t("fertilizerSuggestion", lang)}: ${data.fertilizer.join(". ")}`,
  ].join(" ");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Sprout className="h-7 w-7 text-green-700" />
          <h1 className="text-2xl md:text-3xl font-bold">{t("soilPest", lang)}</h1>
        </div>
        <VoiceButton text={speakText} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-700" />
              {t("suitableCrops", lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.crops.map((c, i) => (
                <Badge key={i} className="bg-green-100 text-green-800 border-green-300">
                  {c}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-red-600" />
              {t("commonPests", lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm">
              {data.pests.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {p}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-amber-600" />
              {t("fertilizerSuggestion", lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm">
              {data.fertilizer.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
