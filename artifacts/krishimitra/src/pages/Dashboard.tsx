import { Heart, Droplets, Thermometer, Sprout, CloudSun, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";
import { MonitoringBar } from "@/components/MonitoringBar";
import { VoiceButton } from "@/components/VoiceButton";

export default function Dashboard() {
  const { lang, profile, metrics } = useApp();

  const healthColor: Record<string, string> = {
    excellent: "bg-green-100 text-green-800 border-green-300",
    good: "bg-emerald-100 text-emerald-800 border-emerald-300",
    warning: "bg-amber-100 text-amber-800 border-amber-300",
    critical: "bg-red-100 text-red-800 border-red-300",
  };

  const insights = [
    `${t("welcome", lang)}, ${profile.name}.`,
    `${t("farmHealth", lang)}: ${t(metrics.health, lang)}.`,
    `${t("soilMoisture", lang)} ${metrics.soilMoisture}%, ${t("temperature", lang)} ${metrics.temperature}°C.`,
    `${t("daysToHarvest", lang)}: ${metrics.daysToHarvest}.`,
  ].join(" ");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t("welcome", lang)}, {profile.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {profile.village}, {profile.state} · {profile.farmSize} {t("farmSize", lang).split(" ")[0]}
          </p>
        </div>
        <VoiceButton text={insights} variant="outline" />
      </div>

      <MonitoringBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Heart className="h-5 w-5 text-green-700" />}
          title={t("farmHealth", lang)}
          value={t(metrics.health, lang)}
          badge={healthColor[metrics.health]}
        />
        <StatCard
          icon={<Droplets className="h-5 w-5 text-blue-600" />}
          title={t("soilMoisture", lang)}
          value={`${metrics.soilMoisture}%`}
        />
        <StatCard
          icon={<Thermometer className="h-5 w-5 text-orange-600" />}
          title={t("temperature", lang)}
          value={`${metrics.temperature}°C`}
        />
        <StatCard
          icon={<CloudSun className="h-5 w-5 text-amber-600" />}
          title={t("humidity", lang)}
          value={`${metrics.humidity}%`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-700" />
              {t("cropStage", lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("crop", lang)}</span>
                <span className="font-medium">{profile.cropType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("soilType", lang)}</span>
                <span className="font-medium">{profile.soilType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("irrigationType", lang)}
                </span>
                <span className="font-medium">{profile.irrigationType}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              {t("quickInsights", lang)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600" />
                <span>{t("farmHealth", lang)}: {t(metrics.health, lang)}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>{t("soilMoisture", lang)}: {metrics.soilMoisture}% — {metrics.soilMoisture < 30 ? t("low", lang) : metrics.soilMoisture > 70 ? t("high", lang) : t("medium", lang)}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-600" />
                <span>{t("daysToHarvest", lang)}: {metrics.daysToHarvest}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  badge?: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {icon}
            <span className="truncate">{title}</span>
          </div>
        </div>
        {badge ? (
          <Badge className={`mt-2 ${badge}`}>{value}</Badge>
        ) : (
          <div className="mt-2 text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
