import { Activity, Droplets, Sprout, Bug, TrendingUp, Calendar, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";
import { downloadReport } from "@/utils/report";
import { VoiceButton } from "./VoiceButton";

export function MonitoringBar() {
  const { lang, profile, metrics, tasks, activities } = useApp();

  const yieldPct = Math.min(100, Math.round((metrics.currentYield / metrics.expectedYield) * 100));
  const isRTL = lang === "ur";

  const summary = [
    `${t("monitoring", lang)}.`,
    `${t("currentYield", lang)}: ${metrics.currentYield} ${t("yield", lang)}.`,
    `${t("expectedYield", lang)}: ${metrics.expectedYield} ${t("yield", lang)}.`,
    `${t("daysToHarvest", lang)}: ${metrics.daysToHarvest}.`,
    `${t("farmHealth", lang)}: ${t(metrics.health, lang)}.`,
  ].join(" ");

  const handleDownload = () => {
    downloadReport(lang, profile, metrics, tasks, activities);
  };

  return (
    <Card
      className="p-4 md:p-5 border-2 border-green-600/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
      dir={isRTL ? "rtl" : "ltr"}
      data-testid="monitoring-bar"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-700" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              {t("monitoring", lang)}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <VoiceButton text={summary} />
            <Button
              onClick={handleDownload}
              size="sm"
              className="gap-1.5 bg-green-700 hover:bg-green-800 text-white"
              data-testid="button-download-report"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("download", lang)}</span>
            </Button>
          </div>
        </div>

        {/* Yield Progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-sm font-medium text-green-900 dark:text-green-100">
              <TrendingUp className="h-4 w-4" />
              {t("yieldProgress", lang)}
            </div>
            <span className="text-sm font-bold text-green-700 dark:text-green-300">
              {metrics.currentYield} / {metrics.expectedYield} ({yieldPct}%)
            </span>
          </div>
          <Progress value={yieldPct} className="h-3" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Stat
            icon={<TrendingUp className="h-4 w-4" />}
            label={t("currentYield", lang)}
            value={`${metrics.currentYield} ${t("yield", lang).split(" ")[1] ?? ""}`}
            color="text-green-700"
          />
          <Stat
            icon={<Calendar className="h-4 w-4" />}
            label={t("daysToHarvest", lang)}
            value={`${metrics.daysToHarvest}`}
            color="text-amber-700"
          />
          <Stat
            icon={<Droplets className="h-4 w-4" />}
            label={t("irrigation", lang)}
            value={`${metrics.irrigationCount}`}
            color="text-blue-700"
          />
          <Stat
            icon={<Sprout className="h-4 w-4" />}
            label={t("fertilizer", lang)}
            value={`${metrics.fertilizerCount}`}
            color="text-emerald-700"
          />
          <Stat
            icon={<Bug className="h-4 w-4" />}
            label={t("pestControl", lang)}
            value={`${metrics.pestControlCount}`}
            color="text-rose-700"
          />
        </div>
      </div>
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white/70 dark:bg-black/30 px-3 py-2 border border-green-100 dark:border-green-900/40">
      <div className={`flex items-center gap-1.5 text-xs ${color}`}>
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-1 text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}
