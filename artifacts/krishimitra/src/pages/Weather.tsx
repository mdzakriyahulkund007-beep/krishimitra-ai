import { CloudSun, CloudRain, Sun, CloudDrizzle, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import { t, type LangCode } from "@/i18n/translations";
import { VoiceButton } from "@/components/VoiceButton";

type Day = {
  day: { en: string; hi: string; kn: string; te: string; ur: string };
  icon: React.ReactNode;
  tempHigh: number;
  tempLow: number;
  rain: number;
};

const FORECAST: Day[] = [
  { day: { en: "Today", hi: "आज", kn: "ಇಂದು", te: "ఈరోజు", ur: "آج" }, icon: <Sun className="h-7 w-7 text-amber-500" />, tempHigh: 31, tempLow: 22, rain: 10 },
  { day: { en: "Tomorrow", hi: "कल", kn: "ನಾಳೆ", te: "రేపు", ur: "کل" }, icon: <CloudSun className="h-7 w-7 text-amber-400" />, tempHigh: 30, tempLow: 23, rain: 25 },
  { day: { en: "Wed", hi: "बुध", kn: "ಬುಧ", te: "బుధ", ur: "بدھ" }, icon: <CloudRain className="h-7 w-7 text-blue-500" />, tempHigh: 28, tempLow: 22, rain: 75 },
  { day: { en: "Thu", hi: "गुरु", kn: "ಗುರು", te: "గురు", ur: "جمعرات" }, icon: <CloudDrizzle className="h-7 w-7 text-blue-400" />, tempHigh: 27, tempLow: 21, rain: 60 },
  { day: { en: "Fri", hi: "शुक्र", kn: "ಶುಕ್ರ", te: "శుక్ర", ur: "جمعہ" }, icon: <Cloud className="h-7 w-7 text-slate-400" />, tempHigh: 29, tempLow: 22, rain: 30 },
];

export default function Weather() {
  const { lang } = useApp();

  // AI suggestions in current language
  const SUGGESTIONS: Record<LangCode, string[]> = {
    en: [
      "Rain expected on Wednesday — avoid irrigation that day.",
      "Humidity is rising; monitor for fungal pest risks.",
      "Plan harvest before Thursday's heavy rain.",
    ],
    hi: [
      "बुधवार को बारिश की संभावना है — उस दिन सिंचाई से बचें।",
      "नमी बढ़ रही है; फंगल कीट के जोखिम पर नज़र रखें।",
      "गुरुवार की भारी बारिश से पहले कटाई करें।",
    ],
    kn: [
      "ಬುಧವಾರ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ — ಆ ದಿನ ನೀರಾವರಿ ತಪ್ಪಿಸಿ.",
      "ಆರ್ದ್ರತೆ ಹೆಚ್ಚುತ್ತಿದೆ; ಶಿಲೀಂಧ್ರ ಕೀಟ ಅಪಾಯವನ್ನು ಗಮನಿಸಿ.",
      "ಗುರುವಾರದ ಭಾರೀ ಮಳೆಗೂ ಮುನ್ನ ಸುಗ್ಗಿ ಯೋಜಿಸಿ.",
    ],
    te: [
      "బుధవారం వర్షం పడే అవకాశం — ఆ రోజు నీటిపారుదల నివారించండి.",
      "తేమ పెరుగుతోంది; ఫంగల్ తెగుళ్ల ప్రమాదాన్ని పర్యవేక్షించండి.",
      "గురువారం భారీ వర్షం ముందు పంట కోతకు ప్రణాళిక చేయండి.",
    ],
    ur: [
      "بدھ کو بارش متوقع — اس دن آبپاشی سے گریز کریں۔",
      "نمی بڑھ رہی ہے؛ فنگل کیڑوں کے خطرے پر نظر رکھیں۔",
      "جمعرات کی شدید بارش سے پہلے کٹائی کا منصوبہ بنائیں۔",
    ],
  };

  const speakText = `${t("forecast5Day", lang)}. ${SUGGESTIONS[lang].join(" ")}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <CloudSun className="h-7 w-7 text-amber-500" />
          <h1 className="text-2xl md:text-3xl font-bold">{t("weather", lang)}</h1>
        </div>
        <VoiceButton text={speakText} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("forecast5Day", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FORECAST.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 rounded-xl border p-4 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950/20 dark:to-transparent"
              >
                <div className="text-sm font-semibold">{d.day[lang]}</div>
                {d.icon}
                <div className="text-lg font-bold">{d.tempHigh}°</div>
                <div className="text-xs text-muted-foreground">/ {d.tempLow}°</div>
                <Badge variant="outline" className="text-xs">
                  {t("rainProbability", lang)}: {d.rain}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("aiSuggestion", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {SUGGESTIONS[lang].map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 border border-amber-200 dark:border-amber-900/40"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
