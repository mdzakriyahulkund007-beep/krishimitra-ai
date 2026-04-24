import { Bell, Bug, CloudRain, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/store/AppContext";
import { t, type LangCode } from "@/i18n/translations";
import { VoiceButton } from "@/components/VoiceButton";

type AlertItem = {
  type: "pest" | "weather" | "water";
  titleKey: string;
  icon: React.ReactNode;
  color: string;
  message: Record<LangCode, string>;
};

const ALERTS: AlertItem[] = [
  {
    type: "pest",
    titleKey: "pestAlert",
    icon: <Bug className="h-5 w-5" />,
    color: "bg-red-50 border-red-300 dark:bg-red-950/20",
    message: {
      en: "High pest risk detected on tomato plants. Apply neem spray within 48 hours.",
      hi: "टमाटर के पौधों पर उच्च कीट जोखिम मिला। 48 घंटों में नीम का छिड़काव करें।",
      kn: "ಟೊಮ್ಯಾಟೋ ಸಸ್ಯಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ಕೀಟ ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ. 48 ಗಂಟೆಗಳಲ್ಲಿ ಬೇವಿನ ಸಿಂಪರಣೆ ಮಾಡಿ.",
      te: "టమోటో మొక్కలపై అధిక తెగుళ్ల ప్రమాదం. 48 గంటల్లో వేప స్ప్రే చేయండి.",
      ur: "ٹماٹر کے پودوں پر کیڑوں کا زیادہ خطرہ۔ 48 گھنٹوں میں نیم کا چھڑکاؤ کریں۔",
    },
  },
  {
    type: "weather",
    titleKey: "weatherAlert",
    icon: <CloudRain className="h-5 w-5" />,
    color: "bg-amber-50 border-amber-300 dark:bg-amber-950/20",
    message: {
      en: "Heavy rain expected on Wednesday. Postpone fertilizer application.",
      hi: "बुधवार को भारी बारिश की संभावना। उर्वरक प्रयोग स्थगित करें।",
      kn: "ಬುಧವಾರ ಭಾರೀ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಗೊಬ್ಬರ ಬಳಕೆ ಮುಂದೂಡಿ.",
      te: "బుధవారం భారీ వర్షం అంచనా. ఎరువు అప్లికేషన్ వాయిదా వేయండి.",
      ur: "بدھ کو شدید بارش متوقع۔ کھاد کا استعمال ملتوی کریں۔",
    },
  },
  {
    type: "water",
    titleKey: "waterAlert",
    icon: <Droplets className="h-5 w-5" />,
    color: "bg-blue-50 border-blue-300 dark:bg-blue-950/20",
    message: {
      en: "Soil moisture below 30% in north field. Increase irrigation today.",
      hi: "उत्तरी खेत में मिट्टी की नमी 30% से कम। आज सिंचाई बढ़ाएँ।",
      kn: "ಉತ್ತರ ಕ್ಷೇತ್ರದಲ್ಲಿ ಮಣ್ಣಿನ ತೇವಾಂಶ 30% ಗಿಂತ ಕಡಿಮೆ. ಇಂದು ನೀರಾವರಿ ಹೆಚ್ಚಿಸಿ.",
      te: "ఉత్తర పొలంలో నేల తేమ 30% కంటే తక్కువ. ఈరోజు నీటిపారుదల పెంచండి.",
      ur: "شمالی کھیت میں مٹی کی نمی 30% سے کم۔ آج آبپاشی بڑھائیں۔",
    },
  },
];

export default function Alerts() {
  const { lang } = useApp();
  const speakText = ALERTS.map((a) => `${t(a.titleKey, lang)}: ${a.message[lang]}`).join(" ");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Bell className="h-7 w-7 text-amber-600" />
          <h1 className="text-2xl md:text-3xl font-bold">{t("alerts", lang)}</h1>
        </div>
        <VoiceButton text={speakText} />
      </div>

      <div className="space-y-3">
        {ALERTS.map((alert, i) => (
          <Card key={i} className={`border-2 ${alert.color}`} data-testid={`alert-${alert.type}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                {alert.icon}
                {t(alert.titleKey, lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{alert.message[lang]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
