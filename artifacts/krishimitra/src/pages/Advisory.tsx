import { useState, useMemo } from "react";
import { Brain, Loader2, Sprout, Droplets, Bug, Leaf, TrendingUp, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";
import {
  CROP_OPTIONS,
  SOIL_OPTIONS,
  GROWTH_STAGE_OPTIONS,
  getCropImage,
  getCropLabel,
  findOption,
} from "@/i18n/options";
import { RECOMMENDATIONS, CROP_TIPS, CROP_YIELD, CROP_WATER_NEED } from "@/i18n/recommendations";
import { VoiceButton } from "@/components/VoiceButton";

type Severity = "low" | "medium" | "high";
type Health = "excellent" | "good" | "warning" | "critical";

type Result = {
  health: Health;
  pestRisk: Severity;
  waterStress: Severity;
  nutrient: Severity;
  ph: "acidic" | "neutral" | "alkaline";
  yieldEstimatePerAcre: number;
  yieldEstimateTotal: number;
  waterNeed: number; // L/day
  recommendations: string[];
  fertilizerPlan: string;
};

const FERTILIZER_PLANS: Record<string, Record<string, string>> = {
  // soilType -> growthStage -> plan
  red: {
    seedling: "DAP 50 kg/acre at sowing",
    vegetative: "Urea 40 kg/acre + Potash 25 kg/acre",
    flowering: "NPK 19:19:19 50 kg/acre + foliar boron",
    fruiting: "MOP 30 kg/acre + Calcium nitrate spray",
    ripening: "Maintenance dose only",
  },
  black: {
    seedling: "SSP 60 kg/acre",
    vegetative: "Urea 35 kg/acre + Zinc sulphate 10 kg",
    flowering: "NPK 19:19:19 45 kg/acre",
    fruiting: "MOP 35 kg/acre",
    ripening: "Maintenance dose only",
  },
  alluvial: {
    seedling: "DAP 60 kg/acre",
    vegetative: "Urea 50 kg/acre",
    flowering: "NPK 12:32:16 50 kg/acre",
    fruiting: "MOP 40 kg + Calcium nitrate 20 kg",
    ripening: "Maintenance dose only",
  },
  loamy: {
    seedling: "DAP 50 kg/acre + farmyard manure 2 t",
    vegetative: "Urea 45 kg/acre",
    flowering: "NPK 19:19:19 45 kg/acre",
    fruiting: "MOP 30 kg/acre",
    ripening: "Maintenance dose only",
  },
  sandy: {
    seedling: "Compost 3 t/acre + DAP 40 kg",
    vegetative: "Urea 30 kg/acre split twice",
    flowering: "NPK 19:19:19 40 kg/acre",
    fruiting: "MOP 25 kg + foliar zinc",
    ripening: "Maintenance dose only",
  },
  clay: {
    seedling: "SSP 70 kg/acre + gypsum 100 kg",
    vegetative: "Urea 40 kg/acre",
    flowering: "NPK 12:32:16 50 kg/acre",
    fruiting: "MOP 35 kg/acre",
    ripening: "Maintenance dose only",
  },
};

export default function Advisory() {
  const { lang, profile, setMetrics } = useApp();

  // Farm inputs
  const [crop, setCrop] = useState(profile.cropType || "tomato");
  const [fieldArea, setFieldArea] = useState(profile.farmSize || 1);
  const [soilType, setSoilType] = useState(profile.soilType || "red");
  const [growthStage, setGrowthStage] = useState("vegetative");
  const [soilPH, setSoilPH] = useState(6.8);

  // Environmental inputs
  const [moisture, setMoisture] = useState(40);
  const [temp, setTemp] = useState(28);
  const [humidity, setHumidity] = useState(65);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const cropImage = useMemo(() => getCropImage(crop), [crop]);
  const cropLabel = useMemo(() => getCropLabel(crop, lang), [crop, lang]);

  const analyze = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    // Data-driven analysis
    const baseYield = CROP_YIELD[crop] ?? 50;
    const baseWater = CROP_WATER_NEED[crop] ?? 5000;

    // Water stress factors moisture against crop demand
    const waterStress: Severity =
      moisture < 25 ? "high" : moisture < 45 ? "medium" : "low";

    // Pest risk: high humidity + warm temp + flowering/fruiting stage = higher risk
    let pestScore = 0;
    if (humidity > 75) pestScore += 2;
    else if (humidity > 60) pestScore += 1;
    if (temp > 30) pestScore += 2;
    else if (temp > 26) pestScore += 1;
    if (growthStage === "flowering" || growthStage === "fruiting") pestScore += 1;
    const pestRisk: Severity = pestScore >= 4 ? "high" : pestScore >= 2 ? "medium" : "low";

    // Nutrient deficiency: lower if soil is alluvial/loamy, higher if sandy
    let nutrientScore = moisture < 30 ? 2 : 0;
    if (soilType === "sandy") nutrientScore += 2;
    if (soilType === "clay") nutrientScore += 1;
    if (growthStage === "fruiting" || growthStage === "ripening") nutrientScore += 1;
    const nutrient: Severity = nutrientScore >= 3 ? "high" : nutrientScore >= 1 ? "medium" : "low";

    const ph: "acidic" | "neutral" | "alkaline" = soilPH < 6.0 ? "acidic" : soilPH > 7.5 ? "alkaline" : "neutral";

    // Yield modifier based on conditions
    let yieldFactor = 1.0;
    if (waterStress === "high") yieldFactor -= 0.25;
    else if (waterStress === "medium") yieldFactor -= 0.1;
    if (pestRisk === "high") yieldFactor -= 0.2;
    else if (pestRisk === "medium") yieldFactor -= 0.08;
    if (nutrient === "high") yieldFactor -= 0.18;
    else if (nutrient === "medium") yieldFactor -= 0.07;
    if (ph !== "neutral") yieldFactor -= 0.05;
    yieldFactor = Math.max(0.4, yieldFactor);

    const yieldEstimatePerAcre = Math.round(baseYield * yieldFactor);
    const yieldEstimateTotal = Math.round(yieldEstimatePerAcre * fieldArea);

    // Water need adjusted for temperature
    const tempAdj = temp > 32 ? 1.2 : temp > 28 ? 1.05 : 1.0;
    const waterNeed = Math.round(baseWater * tempAdj * fieldArea);

    let health: Health = "good";
    if (waterStress === "high" || pestRisk === "high" || nutrient === "high") health = "critical";
    else if (waterStress === "medium" || pestRisk === "medium" || nutrient === "medium") health = "warning";
    else if (waterStress === "low" && pestRisk === "low" && nutrient === "low" && ph === "neutral") health = "excellent";

    const recs: string[] = [];
    if (waterStress === "high") recs.push(...RECOMMENDATIONS.high_water_stress[lang]);
    else if (waterStress === "medium") recs.push(...RECOMMENDATIONS.medium_water_stress[lang]);
    if (pestRisk === "high") recs.push(...RECOMMENDATIONS.pest_risk_high[lang]);
    if (nutrient === "high" || nutrient === "medium") recs.push(...RECOMMENDATIONS.nutrient_low[lang]);
    if (ph === "acidic") recs.push(...RECOMMENDATIONS.ph_acidic[lang]);
    if (ph === "alkaline") recs.push(...RECOMMENDATIONS.ph_alkaline[lang]);
    if (growthStage === "flowering") recs.push(...RECOMMENDATIONS.growth_flowering[lang]);
    if (growthStage === "fruiting") recs.push(...RECOMMENDATIONS.growth_fruiting[lang]);
    if (CROP_TIPS[crop]) recs.push(...CROP_TIPS[crop][lang]);
    if (recs.length === 0) recs.push(...RECOMMENDATIONS.general_healthy[lang]);

    const fertilizerPlan =
      FERTILIZER_PLANS[soilType]?.[growthStage] ?? "NPK 19:19:19 at recommended dose";

    const r: Result = {
      health,
      pestRisk,
      waterStress,
      nutrient,
      ph,
      yieldEstimatePerAcre,
      yieldEstimateTotal,
      waterNeed,
      recommendations: recs,
      fertilizerPlan,
    };
    setResult(r);
    setMetrics({
      soilMoisture: moisture,
      temperature: temp,
      humidity,
      health,
      expectedYield: yieldEstimateTotal,
    });
    setLoading(false);
  };

  const speakText = result
    ? [
        `${t("crop", lang)}: ${cropLabel}.`,
        `${t("health", lang)}: ${t(result.health, lang)}.`,
        `${t("yieldEstimate", lang)}: ${result.yieldEstimateTotal} ${t("yield", lang)}.`,
        `${t("waterNeed", lang)}: ${result.waterNeed} ${t("litersPerDay", lang)}.`,
        `${t("pestRisk", lang)}: ${t(result.pestRisk, lang)}.`,
        `${t("waterStress", lang)}: ${t(result.waterStress, lang)}.`,
        `${t("nutrientDeficiency", lang)}: ${t(result.nutrient, lang)}.`,
        `${t("recommendations", lang)}: ${result.recommendations.join(". ")}`,
      ].join(" ")
    : "";

  const sevBadge = (level: string) => {
    const map: Record<string, string> = {
      low: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-300",
      medium: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300",
      high: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300",
      excellent: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-300",
      good: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300",
      warning: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300",
      critical: "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300",
    };
    return map[level] ?? "";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-7 w-7 text-green-700" />
        <h1 className="text-2xl md:text-3xl font-bold">{t("advisory", lang)}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-700" />
              {t("farmInputs", lang)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{t("cropType", lang)}</Label>
                <Select value={crop} onValueChange={setCrop}>
                  <SelectTrigger data-testid="select-crop">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value} data-testid={`option-crop-${o.value}`}>
                        {o.labels[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>{t("fieldArea", lang)}</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={fieldArea}
                  onChange={(e) => setFieldArea(Number(e.target.value))}
                  data-testid="input-field-area"
                />
              </div>

              <div className="space-y-1.5">
                <Label>{t("soilType", lang)}</Label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger data-testid="select-soil">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOIL_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value} data-testid={`option-soil-${o.value}`}>
                        {o.labels[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>{t("growthStage", lang)}</Label>
                <Select value={growthStage} onValueChange={setGrowthStage}>
                  <SelectTrigger data-testid="select-growth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GROWTH_STAGE_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value} data-testid={`option-growth-${o.value}`}>
                        {o.labels[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>{t("soilPH", lang)}</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="3"
                  max="10"
                  value={soilPH}
                  onChange={(e) => setSoilPH(Number(e.target.value))}
                  data-testid="input-ph"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-green-800">
                <Droplets className="h-4 w-4" />
                {t("envInputs", lang)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>{t("soilMoisture", lang)}</Label>
                  <Input
                    type="number"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    data-testid="input-moisture"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("temperature", lang)}</Label>
                  <Input
                    type="number"
                    value={temp}
                    onChange={(e) => setTemp(Number(e.target.value))}
                    data-testid="input-temperature"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("humidity", lang)}</Label>
                  <Input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(Number(e.target.value))}
                    data-testid="input-humidity"
                  />
                </div>
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

        <Card>
          <div
            className="aspect-square w-full rounded-t-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${cropImage})` }}
          />
          <CardContent className="p-4 space-y-1">
            <div className="text-xs text-muted-foreground">{t("crop", lang)}</div>
            <div className="text-lg font-bold">{cropLabel}</div>
            <div className="text-sm text-muted-foreground">
              {findOption(SOIL_OPTIONS, soilType)?.labels[lang]} ·{" "}
              {findOption(GROWTH_STAGE_OPTIONS, growthStage)?.labels[lang]}
            </div>
            <div className="text-sm">
              {fieldArea} {t("acres", lang)}
            </div>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card data-testid="advisory-result">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-700" />
                {t("analysisResult", lang)}
              </CardTitle>
              <VoiceButton text={speakText} />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Top metric tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricTile
                icon={<Leaf className="h-4 w-4" />}
                label={t("health", lang)}
                value={t(result.health, lang)}
                badgeCls={sevBadge(result.health)}
              />
              <MetricTile
                icon={<TrendingUp className="h-4 w-4" />}
                label={t("yieldEstimate", lang)}
                value={`${result.yieldEstimateTotal}`}
                sub={t("yield", lang)}
              />
              <MetricTile
                icon={<Droplets className="h-4 w-4" />}
                label={t("waterNeed", lang)}
                value={`${result.waterNeed.toLocaleString()}`}
                sub={t("litersPerDay", lang)}
              />
              <MetricTile
                icon={<FlaskConical className="h-4 w-4" />}
                label={t("soilPH", lang)}
                value={`${soilPH.toFixed(1)}`}
                sub={result.ph}
              />
            </div>

            {/* Risk badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <RiskTile
                icon={<Bug className="h-4 w-4" />}
                label={t("pestRisk", lang)}
                value={t(result.pestRisk, lang)}
                cls={sevBadge(result.pestRisk)}
              />
              <RiskTile
                icon={<Droplets className="h-4 w-4" />}
                label={t("waterStress", lang)}
                value={t(result.waterStress, lang)}
                cls={sevBadge(result.waterStress)}
              />
              <RiskTile
                icon={<Sprout className="h-4 w-4" />}
                label={t("nutrientDeficiency", lang)}
                value={t(result.nutrient, lang)}
                cls={sevBadge(result.nutrient)}
              />
            </div>

            {/* Fertilizer plan */}
            <div className="rounded-xl border bg-amber-50 dark:bg-amber-950/20 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                <FlaskConical className="h-4 w-4" />
                {t("fertilizerPlan", lang)}
              </div>
              <div className="text-sm">{result.fertilizerPlan}</div>
            </div>

            {/* Recommendations */}
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

function MetricTile({
  icon,
  label,
  value,
  sub,
  badgeCls,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  badgeCls?: string;
}) {
  return (
    <div className="rounded-xl border p-3 bg-card">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      {badgeCls ? (
        <Badge className={`mt-1.5 ${badgeCls}`}>{value}</Badge>
      ) : (
        <div className="mt-1 text-xl font-bold">{value}</div>
      )}
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function RiskTile({
  icon,
  label,
  value,
  cls,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  cls: string;
}) {
  return (
    <div className="rounded-xl border p-3 bg-card flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <Badge className={cls}>{value}</Badge>
    </div>
  );
}
