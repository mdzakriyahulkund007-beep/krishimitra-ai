import { useMemo, useState } from "react";
import {
  Calendar as CalendarIcon,
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
  Scissors,
  Shovel,
  Leaf,
  Wheat,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/store/AppContext";
import { t, type LangCode } from "@/i18n/translations";
import { CROP_OPTIONS, getCropImage, getCropLabel } from "@/i18n/options";
import { CROP_CALENDAR, MONTH_LABELS, type ActivityType } from "@/i18n/cropCalendar";
import { VoiceButton } from "@/components/VoiceButton";

const ACTIVITY_META: Record<
  ActivityType,
  { icon: React.ComponentType<{ className?: string }>; cls: string }
> = {
  soilPrep: { icon: Shovel, cls: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300" },
  sowing: { icon: Sprout, cls: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-300" },
  transplanting: { icon: Leaf, cls: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300" },
  irrigation: { icon: Droplets, cls: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300" },
  fertilizer: { icon: FlaskConical, cls: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300" },
  pestControl: { icon: Bug, cls: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300" },
  weeding: { icon: Scissors, cls: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900/40 dark:text-slate-300" },
  harvesting: { icon: Wheat, cls: "bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-950/40 dark:text-yellow-300" },
};

export default function CropCalendar() {
  const { lang, profile } = useApp();
  const [crop, setCrop] = useState(profile.cropType || "tomato");

  const plan = CROP_CALENDAR[crop] ?? CROP_CALENDAR.tomato;
  const cropLabel = getCropLabel(crop, lang);
  const cropImage = getCropImage(crop);
  const months = MONTH_LABELS[lang];
  const currentMonth = new Date().getMonth() + 1; // 1-12

  const seasonKey = plan.season;

  const monthList = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        label: months[i],
        activities: plan.months[i + 1] ?? [],
      })),
    [plan, months],
  );

  const thisMonth = monthList.find((m) => m.month === currentMonth);

  // Speak: this month's activities
  const speakText = thisMonth
    ? [
        `${cropLabel}. ${t("thisMonth", lang)}: ${thisMonth.label}.`,
        ...thisMonth.activities.map((a) => `${t(a.type, lang)}: ${a.note[lang]}.`),
      ].join(" ")
    : `${cropLabel}. ${t("noActivity", lang)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-7 w-7 text-green-700" />
          <h1 className="text-2xl md:text-3xl font-bold">{t("cropCalendar", lang)}</h1>
        </div>
        <VoiceButton text={speakText} />
      </div>

      {/* Header card */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
            <div
              className="h-20 w-20 rounded-xl bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${cropImage})` }}
            />
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">{t("cropType", lang)}</div>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger data-testid="select-calendar-crop" className="max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CROP_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} data-testid={`option-cal-${o.value}`}>
                      {o.labels[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{t("season", lang)}</div>
              <Badge className="mt-1 bg-green-700 text-white border-0">
                {t(seasonKey, lang)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This month focus */}
      <Card className="border-green-300 dark:border-green-900/60 bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950/20 dark:to-amber-950/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-green-700" />
              {t("thisMonth", lang)}: {thisMonth?.label}
            </span>
            <Badge className="bg-amber-500 text-white border-0">
              {thisMonth?.activities.length ?? 0} {t("monthlyActivities", lang)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {thisMonth && thisMonth.activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {thisMonth.activities.map((a, i) => (
                <ActivityCard key={i} activity={a} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground py-6 text-center">
              {t("noActivity", lang)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Year-long timeline */}
      <Card>
        <CardHeader>
          <CardTitle>{t("monthlyActivities", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {monthList.map((m) => {
              const isCurrent = m.month === currentMonth;
              const hasActivities = m.activities.length > 0;
              return (
                <div
                  key={m.month}
                  className={`flex flex-col md:flex-row md:items-start gap-3 p-3 rounded-xl border ${
                    isCurrent
                      ? "bg-green-50 dark:bg-green-950/30 border-green-400 dark:border-green-700"
                      : hasActivities
                        ? "bg-card"
                        : "bg-muted/30"
                  }`}
                  data-testid={`month-${m.month}`}
                >
                  <div className="flex md:flex-col items-center md:items-start gap-2 md:w-24 shrink-0">
                    <div
                      className={`text-2xl font-bold ${
                        isCurrent ? "text-green-700" : "text-muted-foreground"
                      }`}
                    >
                      {m.label}
                    </div>
                    {isCurrent && (
                      <Badge className="bg-green-700 text-white border-0 text-[10px]">
                        {t("thisMonth", lang)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {hasActivities ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {m.activities.map((a, i) => (
                          <ActivityChip key={i} activity={a} lang={lang} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">
                        {t("noActivity", lang)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityCard({
  activity,
  lang,
}: {
  activity: { type: ActivityType; intensity: 1 | 2 | 3; note: Record<LangCode, string> };
  lang: LangCode;
}) {
  const meta = ACTIVITY_META[activity.type];
  const Icon = meta.icon;
  return (
    <div className="rounded-lg border bg-card p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Badge className={`gap-1 ${meta.cls}`}>
          <Icon className="h-3 w-3" />
          {t(activity.type, lang)}
        </Badge>
        {activity.intensity === 3 && (
          <Badge className="bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300 text-[10px]">
            {t("critical", lang)}
          </Badge>
        )}
      </div>
      <div className="text-sm">{activity.note[lang]}</div>
    </div>
  );
}

function ActivityChip({
  activity,
  lang,
}: {
  activity: { type: ActivityType; intensity: 1 | 2 | 3; note: Record<LangCode, string> };
  lang: LangCode;
}) {
  const meta = ACTIVITY_META[activity.type];
  const Icon = meta.icon;
  return (
    <div className="flex items-start gap-2 p-2 rounded-md hover-elevate">
      <div className={`mt-0.5 rounded-md border px-1.5 py-1 ${meta.cls}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold">{t(activity.type, lang)}</div>
        <div className="text-xs text-muted-foreground">{activity.note[lang]}</div>
      </div>
    </div>
  );
}
