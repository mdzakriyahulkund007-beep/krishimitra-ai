import { Network, Database, ShieldAlert, Brain, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/store/AppContext";
import { t, type LangCode } from "@/i18n/translations";

const DESC: Record<string, Record<LangCode, string>> = {
  dataIngestion: {
    en: "Collects sensor, weather, and user inputs.",
    hi: "सेंसर, मौसम और उपयोगकर्ता इनपुट एकत्र करता है।",
    kn: "ಸೆನ್ಸರ್, ಹವಾಮಾನ ಮತ್ತು ಬಳಕೆದಾರ ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ.",
    te: "సెన్సార్, వాతావరణం మరియు యూజర్ ఇన్‌పుట్‌లను సేకరిస్తుంది.",
    ur: "سینسر، موسم اور صارف ان پٹس جمع کرتا ہے۔",
  },
  riskDetection: {
    en: "Detects pest, water stress, and weather risks.",
    hi: "कीट, जल तनाव और मौसमी जोखिमों का पता लगाता है।",
    kn: "ಕೀಟ, ನೀರಿನ ಒತ್ತಡ ಮತ್ತು ಹವಾಮಾನ ಅಪಾಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ.",
    te: "తెగుళ్లు, నీటి ఒత్తిడి మరియు వాతావరణ ప్రమాదాలను గుర్తిస్తుంది.",
    ur: "کیڑے، پانی کے دباؤ اور موسمی خطرات کا پتہ لگاتا ہے۔",
  },
  decision: {
    en: "Recommends best actions for the farm.",
    hi: "खेत के लिए सर्वोत्तम कार्यों की सिफारिश करता है।",
    kn: "ಕೃಷಿಗೆ ಉತ್ತಮ ಕ್ರಿಯೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ.",
    te: "వ్యవసాయానికి ఉత్తమ చర్యలను సిఫార్సు చేస్తుంది.",
    ur: "کھیت کے لیے بہترین اقدامات کی سفارش کرتا ہے۔",
  },
  orchestrator: {
    en: "Sends alerts and triggers tasks automatically.",
    hi: "स्वचालित रूप से अलर्ट भेजता है और कार्य ट्रिगर करता है।",
    kn: "ಎಚ್ಚರಿಕೆಗಳನ್ನು ಕಳುಹಿಸುತ್ತದೆ ಮತ್ತು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕಾರ್ಯಗಳನ್ನು ಪ್ರಚೋದಿಸುತ್ತದೆ.",
    te: "హెచ్చరికలను పంపుతుంది మరియు పనులను స్వయంచాలకంగా ట్రిగ్గర్ చేస్తుంది.",
    ur: "خود بخود انتباہ بھیجتا ہے اور کاموں کو متحرک کرتا ہے۔",
  },
};

export default function MultiAgent() {
  const { lang } = useApp();

  const agents = [
    { key: "dataIngestion", icon: Database, color: "from-blue-500 to-blue-700" },
    { key: "riskDetection", icon: ShieldAlert, color: "from-amber-500 to-amber-700" },
    { key: "decision", icon: Brain, color: "from-purple-500 to-purple-700" },
    { key: "orchestrator", icon: Zap, color: "from-green-500 to-green-700" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Network className="h-7 w-7 text-green-700" />
        <h1 className="text-2xl md:text-3xl font-bold">{t("multiAgent", lang)}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("agentPipeline", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            {agents.map((a, i) => (
              <div key={a.key} className="flex items-center gap-3 flex-1">
                <div className="flex-1">
                  <div
                    className={`rounded-2xl p-5 bg-gradient-to-br ${a.color} text-white shadow-md h-full`}
                    data-testid={`agent-${a.key}`}
                  >
                    <a.icon className="h-7 w-7 mb-2" />
                    <div className="font-bold text-base">{t(a.key, lang)}</div>
                    <div className="text-xs mt-1.5 opacity-90">{DESC[a.key][lang]}</div>
                  </div>
                </div>
                {i < agents.length - 1 && (
                  <ArrowRight className="hidden lg:block h-6 w-6 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
