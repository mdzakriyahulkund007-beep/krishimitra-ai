import { useState } from "react";
import { Brain, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";
import { RECOMMENDATIONS } from "@/i18n/recommendations";
import { VoiceButton } from "@/components/VoiceButton";

type Result = {
  health: "excellent" | "good" | "warning" | "critical";
  pestRisk: "low" | "medium" | "high";
  waterStress: "low" | "medium" | "high";
  nutrient: "low" | "medium" | "high";
  recommendations: string[];
};

export default function Advisory() {
  const { lang, profile, setMetrics } = useApp();

  const [crop, setCrop] = useState(profile.cropType);
  const [moisture, setMoisture] = useState(40);
  const [temp, setTemp] = useState(28);
  const [humidity, setHumidity] = useState(65);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const analyze = async () => {
    setLoading(true);
    // Simulate AI analysis (in production this would call /api or n8n webhook)
    await new Promise((r) => setTimeout(r, 900));

    const waterStress: "low" | "medium" | "high" =
      moisture < 25 ? "high" : moisture < 45 ? "medium" : "low";
    const pestRisk: "low" | "medium" | "high" =
      humidity > 80 && temp > 26 ? "high" : humidity > 65 ? "medium" : "low";
    const nutrient: "low" | "medium" | "high" =
      moisture < 30 ? "low" : "medium";

    let health: Result["health"] = "good";
    if (waterStress === "high" || pestRisk === "high") health = "critical";
    else if (waterStress === "medium" || pestRisk === "medium") health = "warning";
    else if (waterStress === "low" && pestRisk === "low") health = "excellent";

    const recs: string[] = [];
    if (waterStress === "high") recs.push(...RECOMMENDATIONS.high_water_stress[lang]);
    if (pestRisk === "high") recs.push(...RECOMMENDATIONS.pest_risk_high[lang]);
    if (nutrient === "low") recs.push(...RECOMMENDATIONS.nutrient_low[lang]);
    if (recs.length === 0) recs.push(...RECOMMENDATIONS.general_healthy[lang]);

    const r: Result = { health, pestRisk, waterStress, nutrient, recommendations: recs };
    setResult(r);
    setMetrics({ soilMoisture: moisture, temperature: temp, humidity, health });
    setLoading(false);
  };

  const speakText = result
    ? [
        `${t("health", lang)}: ${t(result.health, lang)}.`,
        `${t("pestRisk", lang)}: ${t(result.pestRisk, lang)}.`,
        `${t("waterStress", lang)}: ${t(result.waterStress, lang)}.`,
        `${t("nutrientDeficiency", lang)}: ${t(result.nutrient, lang)}.`,
        `${t("recommendations", lang)}: ${result.recommendations.join(". ")}`,
      ].join(" ")
    : "";

  const statusBadge = (level: string) => {
    const map: Record<string, string> = {
      low: "bg-green-100 text-green-800 border-green-300",
      medium: "bg-amber-100 text-amber-800 border-amber-300",
      high: "bg-red-100 text-red-800 border-red-300",
      excellent: "bg-green-100 text-green-800 border-green-300",
      good: "bg-emerald-100 text-emerald-800 border-emerald-300",
      warning: "bg-amber-100 text-amber-800 border-amber-300",
      critical: "bg-red-100 text-red-800 border-red-300",
    };
    return map[level] ?? "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-7 w-7 text-green-700" />
        <h1 className="text-2xl md:text-3xl font-bold">{t("advisory", lang)}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("analyzeFarm", lang)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">{t("crop", lang)}</Label>
              <Input
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                data-testid="input-crop"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moisture">{t("soilMoisture", lang)}</Label>
              <Input
                id="moisture"
                type="number"
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
                data-testid="input-moisture"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temp">{t("temperature", lang)}</Label>
              <Input
                id="temp"
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                data-testid="input-temperature"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity">{t("humidity", lang)}</Label>
              <Input
                id="humidity"
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                data-testid="input-humidity"
              />
            </div>
          </div>
          <Button
            onClick={analyze}
            disabled={loading}
            size="lg"
            className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white"
            data-testid="button-analyze"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {t("loading", lang)}
              </>
            ) : (
              t("analyzeFarm", lang)
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card data-testid="advisory-result">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle>{t("recommendations", lang)}</CardTitle>
              <VoiceButton text={speakText} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ResultStat label={t("health", lang)} value={t(result.health, lang)} cls={statusBadge(result.health)} />
              <ResultStat label={t("pestRisk", lang)} value={t(result.pestRisk, lang)} cls={statusBadge(result.pestRisk)} />
              <ResultStat label={t("waterStress", lang)} value={t(result.waterStress, lang)} cls={statusBadge(result.waterStress)} />
              <ResultStat label={t("nutrientDeficiency", lang)} value={t(result.nutrient, lang)} cls={statusBadge(result.nutrient)} />
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">{t("recommendations", lang)}</h3>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg bg-green-50 dark:bg-green-950/20 p-3 border border-green-200 dark:border-green-900/40"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-green-600 shrink-0" />
                    <span className="text-sm">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ResultStat({ label, value, cls }: { label: string; value: string; cls: string }) {
  return (
    <div className="rounded-xl border p-3 bg-card">
      <div className="text-xs text-muted-foreground">{label}</div>
      <Badge className={`mt-1.5 ${cls}`}>{value}</Badge>
    </div>
  );
}
