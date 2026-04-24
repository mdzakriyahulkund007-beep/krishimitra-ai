import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, MapPin, Trophy, BarChart3 } from "lucide-react";
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
import { VoiceButton } from "@/components/VoiceButton";

type Mandi = {
  name: Record<LangCode, string>;
  base: number; // ₹ per quintal baseline today
  distance: number; // km
};

// Realistic mandi names per crop region in Karnataka / South India
const MANDIS: Record<string, Mandi[]> = {
  tomato: [
    { name: { en: "Kolar Mandi", hi: "कोलार मंडी", kn: "ಕೋಲಾರ ಮಂಡಿ", te: "కోలార్ మండీ", ur: "کولار منڈی" }, base: 2200, distance: 28 },
    { name: { en: "Hiriyur APMC", hi: "हिरियुर एपीएमसी", kn: "ಹಿರಿಯೂರು ಎಪಿಎಂಸಿ", te: "హిరియూర్ ఎపిఎంసి", ur: "ہیریور اے پی ایم سی" }, base: 2100, distance: 6 },
    { name: { en: "Bengaluru Yeshwanthpur", hi: "बेंगलुरु येश्वंतपुर", kn: "ಬೆಂಗಳೂರು ಯಶವಂತಪುರ", te: "బెంగళూరు యశ్వంతపూర్", ur: "بنگلور یشونتپور" }, base: 2400, distance: 95 },
    { name: { en: "Tumkur Mandi", hi: "तुमकुर मंडी", kn: "ತುಮಕೂರು ಮಂಡಿ", te: "తుమకూరు మండీ", ur: "تومکور منڈی" }, base: 2050, distance: 42 },
  ],
  onion: [
    { name: { en: "Bellary Mandi", hi: "बेल्लारी मंडी", kn: "ಬಳ್ಳಾರಿ ಮಂಡಿ", te: "బళ్లారి మండీ", ur: "بلاری منڈی" }, base: 1800, distance: 18 },
    { name: { en: "Hubli APMC", hi: "हुबली एपीएमसी", kn: "ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ", te: "హుబ్లి ఎపిఎంసి", ur: "ہبلی اے پی ایم سی" }, base: 1750, distance: 86 },
    { name: { en: "Lasalgaon Mandi", hi: "लासलगाँव मंडी", kn: "ಲಸಲಗಾಂವ್ ಮಂಡಿ", te: "లసల్‌గావ్ మండీ", ur: "لاسلگاؤں منڈی" }, base: 1900, distance: 240 },
    { name: { en: "Chitradurga APMC", hi: "चित्रदुर्ग एपीएमसी", kn: "ಚಿತ್ರದುರ್ಗ ಎಪಿಎಂಸಿ", te: "చిత్రదుర్గ ఎపిఎంసి", ur: "چترادرگ اے پی ایم سی" }, base: 1820, distance: 32 },
  ],
  cotton: [
    { name: { en: "Raichur Mandi", hi: "रायचूर मंडी", kn: "ರಾಯಚೂರು ಮಂಡಿ", te: "రాయచూర్ మండీ", ur: "رائچور منڈی" }, base: 6800, distance: 52 },
    { name: { en: "Guntur Cotton APMC", hi: "गुंटूर कपास एपीएमसी", kn: "ಗುಂಟೂರು ಹತ್ತಿ ಎಪಿಎಂಸಿ", te: "గుంటూరు ప్రత్తి ఎపిఎంసి", ur: "گنٹور کپاس اے پی ایم سی" }, base: 7100, distance: 180 },
    { name: { en: "Adoni Mandi", hi: "अडोनी मंडी", kn: "ಆದೋನಿ ಮಂಡಿ", te: "ఆదోని మండీ", ur: "ادونی منڈی" }, base: 6950, distance: 96 },
    { name: { en: "Hubli APMC", hi: "हुबली एपीएमसी", kn: "ಹುಬ್ಬಳ್ಳಿ ಎಪಿಎಂಸಿ", te: "హుబ్లి ఎపిఎంసి", ur: "ہبلی اے پی ایم سی" }, base: 6700, distance: 140 },
  ],
  rice: [
    { name: { en: "Mandya APMC", hi: "मांड्या एपीएमसी", kn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ", te: "మాండ్య ఎపిఎంసి", ur: "منڈیا اے پی ایم سی" }, base: 3200, distance: 95 },
    { name: { en: "Raichur Rice Mandi", hi: "रायचूर चावल मंडी", kn: "ರಾಯಚೂರು ಅಕ್ಕಿ ಮಂಡಿ", te: "రాయచూర్ వరి మండీ", ur: "رائچور چاول منڈی" }, base: 3050, distance: 110 },
    { name: { en: "Davangere APMC", hi: "दावणगेरे एपीएमसी", kn: "ದಾವಣಗೆರೆ ಎಪಿಎಂಸಿ", te: "దావణగెరె ఎపిఎంసి", ur: "داونگیرے اے پی ایم سی" }, base: 3100, distance: 60 },
    { name: { en: "Karimnagar Mandi", hi: "करीमनगर मंडी", kn: "ಕರೀಮ್‌ನಗರ್ ಮಂಡಿ", te: "కరీంనగర్ మండీ", ur: "کریم نگر منڈی" }, base: 3250, distance: 350 },
  ],
  wheat: [
    { name: { en: "Hubli Wheat APMC", hi: "हुबली गेहूँ एपीएमसी", kn: "ಹುಬ್ಬಳ್ಳಿ ಗೋಧಿ ಎಪಿಎಂಸಿ", te: "హుబ్లి గోధుమ ఎపిఎంసి", ur: "ہبلی گندم اے پی ایم سی" }, base: 2600, distance: 45 },
    { name: { en: "Indore Mandi", hi: "इंदौर मंडी", kn: "ಇಂದೋರ್ ಮಂಡಿ", te: "ఇండోర్ మండీ", ur: "اندور منڈی" }, base: 2750, distance: 800 },
    { name: { en: "Davangere APMC", hi: "दावणगेरे एपीएमसी", kn: "ದಾವಣಗೆರೆ ಎಪಿಎಂಸಿ", te: "దావణగెరె ఎపిఎంసి", ur: "داونگیرے اے پی ایم سی" }, base: 2580, distance: 60 },
    { name: { en: "Bidar Mandi", hi: "बीदर मंडी", kn: "ಬೀದರ್ ಮಂಡಿ", te: "బీదర్ మండీ", ur: "بیدر منڈی" }, base: 2620, distance: 220 },
  ],
  maize: [
    { name: { en: "Davangere Maize APMC", hi: "दावणगेरे मक्का एपीएमसी", kn: "ದಾವಣಗೆರೆ ಜೋಳ ಎಪಿಎಂಸಿ", te: "దావణగెరె మొక్కజొన్న ఎపిఎంసి", ur: "داونگیرے مکئی اے پی ایم سی" }, base: 2100, distance: 60 },
    { name: { en: "Ranebennur Mandi", hi: "रानेबेन्नूर मंडी", kn: "ರಾಣೆಬೆನ್ನೂರು ಮಂಡಿ", te: "రాణేబెన్నూరు మండీ", ur: "رانے بنور منڈی" }, base: 2050, distance: 75 },
    { name: { en: "Nizamabad Mandi", hi: "निज़ामाबाद मंडी", kn: "ನಿಜಾಮಾಬಾದ್ ಮಂಡಿ", te: "నిజామాబాద్ మండీ", ur: "نظام آباد منڈی" }, base: 2150, distance: 280 },
    { name: { en: "Hassan APMC", hi: "हासन एपीएमसी", kn: "ಹಾಸನ ಎಪಿಎಂಸಿ", te: "హాసన్ ఎపిఎంసి", ur: "حسن اے پی ایم سی" }, base: 2080, distance: 110 },
  ],
  potato: [
    { name: { en: "Hassan Potato APMC", hi: "हासन आलू एपीएमसी", kn: "ಹಾಸನ ಆಲೂಗಡ್ಡೆ ಎಪಿಎಂಸಿ", te: "హాసన్ బంగాళదుంప ఎపిఎంసి", ur: "حسن آلو اے پی ایم سی" }, base: 1400, distance: 110 },
    { name: { en: "Chickmagaluru Mandi", hi: "चिकमगलूरु मंडी", kn: "ಚಿಕ್ಕಮಗಳೂರು ಮಂಡಿ", te: "చిక్‌మగళూరు మండీ", ur: "چک مگلور منڈی" }, base: 1380, distance: 145 },
    { name: { en: "Kolar Mandi", hi: "कोलार मंडी", kn: "ಕೋಲಾರ ಮಂಡಿ", te: "కోలార్ మండీ", ur: "کولار منڈی" }, base: 1450, distance: 28 },
    { name: { en: "Agra Potato Mandi", hi: "आगरा आलू मंडी", kn: "ಆಗ್ರಾ ಆಲೂಗಡ್ಡೆ ಮಂಡಿ", te: "ఆగ్రా బంగాళదుంప మండీ", ur: "آگرہ آلو منڈی" }, base: 1500, distance: 1900 },
  ],
  sugarcane: [
    { name: { en: "Mandya Sugar APMC", hi: "मांड्या चीनी एपीएमसी", kn: "ಮಂಡ್ಯ ಸಕ್ಕರೆ ಎಪಿಎಂಸಿ", te: "మాండ్య చక్కెర ఎపిఎంసి", ur: "منڈیا چینی اے پی ایم سی" }, base: 320, distance: 95 },
    { name: { en: "Belagavi Mandi", hi: "बेलगावी मंडी", kn: "ಬೆಳಗಾವಿ ಮಂಡಿ", te: "బెళగావి మండీ", ur: "بلگاوی منڈی" }, base: 310, distance: 200 },
    { name: { en: "Mysuru APMC", hi: "मैसूर एपीएमसी", kn: "ಮೈಸೂರು ಎಪಿಎಂಸಿ", te: "మైసూరు ఎపిఎంసి", ur: "میسور اے پی ایم سی" }, base: 315, distance: 130 },
    { name: { en: "Chamarajanagar Mandi", hi: "चामराजनगर मंडी", kn: "ಚಾಮರಾಜನಗರ ಮಂಡಿ", te: "చామరాజనగర్ మండీ", ur: "چامراج نگر منڈی" }, base: 305, distance: 170 },
  ],
  groundnut: [
    { name: { en: "Chitradurga APMC", hi: "चित्रदुर्ग एपीएमसी", kn: "ಚಿತ್ರದುರ್ಗ ಎಪಿಎಂಸಿ", te: "చిత్రదుర్గ ఎపిఎంసి", ur: "چترادرگ اے پی ایم سی" }, base: 5400, distance: 32 },
    { name: { en: "Anantapur Mandi", hi: "अनंतपुर मंडी", kn: "ಅನಂತಪುರ ಮಂಡಿ", te: "అనంతపూర్ మండీ", ur: "اننت پور منڈی" }, base: 5550, distance: 150 },
    { name: { en: "Tumkur APMC", hi: "तुमकुर एपीएमसी", kn: "ತುಮಕೂರು ಎಪಿಎಂಸಿ", te: "తుమకూరు ఎపిఎంసి", ur: "تومکور اے پی ایم سی" }, base: 5350, distance: 42 },
    { name: { en: "Davangere Mandi", hi: "दावणगेरे मंडी", kn: "ದಾವಣಗೆರೆ ಮಂಡಿ", te: "దావణగెరె మండీ", ur: "داونگیرے منڈی" }, base: 5300, distance: 60 },
  ],
  chili: [
    { name: { en: "Guntur Chili Mandi", hi: "गुंटूर मिर्च मंडी", kn: "ಗುಂಟೂರು ಮೆಣಸಿನಕಾಯಿ ಮಂಡಿ", te: "గుంటూరు మిర్చి మండీ", ur: "گنٹور مرچ منڈی" }, base: 18000, distance: 180 },
    { name: { en: "Byadgi Mandi", hi: "ब्याडगी मंडी", kn: "ಬ್ಯಾಡಗಿ ಮಂಡಿ", te: "బ్యాడగి మండీ", ur: "بیاڈگی منڈی" }, base: 17500, distance: 90 },
    { name: { en: "Khammam Chili APMC", hi: "खम्मम मिर्च एपीएमसी", kn: "ಖಮ್ಮಂ ಮೆಣಸಿನಕಾಯಿ ಎಪಿಎಂಸಿ", te: "ఖమ్మం మిర్చి ఎపిఎంసి", ur: "کھمم مرچ اے پی ایم سی" }, base: 17800, distance: 350 },
    { name: { en: "Warangal Mandi", hi: "वारंगल मंडी", kn: "ವಾರಂಗಲ್ ಮಂಡಿ", te: "వరంగల్ మండీ", ur: "ورنگل منڈی" }, base: 17200, distance: 320 },
  ],
};

// Deterministic pseudo-random so prices stay stable per session/load
function seededNoise(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generate7Day(base: number, seedKey: string) {
  const seed = seedKey.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const days: { day: string; price: number }[] = [];
  let price = Math.round(base * 0.92);
  for (let i = 6; i >= 0; i--) {
    const variance = (seededNoise(seed + i) - 0.5) * base * 0.08;
    const trend = ((6 - i) / 6) * base * 0.08; // gentle upward drift to today
    price = Math.round(base * 0.92 + trend + variance);
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price,
    });
  }
  return days;
}

export default function MandiPrices() {
  const { lang, profile } = useApp();
  const [crop, setCrop] = useState(profile.cropType || "tomato");

  const mandis = MANDIS[crop] ?? MANDIS.tomato;
  const cropLabel = getCropLabel(crop, lang);
  const cropImage = getCropImage(crop);

  const enriched = useMemo(() => {
    return mandis.map((m) => {
      const series = generate7Day(m.base, `${crop}-${m.name.en}`);
      const today = series[series.length - 1].price;
      const yesterday = series[series.length - 2].price;
      const weekAgo = series[0].price;
      const dailyChange = ((today - yesterday) / yesterday) * 100;
      const weekChange = ((today - weekAgo) / weekAgo) * 100;
      return { ...m, series, today, dailyChange, weekChange };
    });
  }, [mandis, crop]);

  const best = useMemo(
    () => [...enriched].sort((a, b) => b.today - a.today)[0],
    [enriched],
  );

  // Combined chart: each mandi as a line keyed by name in user's language
  const chartData = useMemo(() => {
    const days = enriched[0].series.map((d) => d.day);
    return days.map((day, idx) => {
      const row: Record<string, string | number> = { day };
      enriched.forEach((m) => {
        row[m.name[lang]] = m.series[idx].price;
      });
      return row;
    });
  }, [enriched, lang]);

  const colors = ["#15803d", "#b45309", "#0369a1", "#7c3aed"];

  // Recommendation logic: based on best mandi week-over-week trend
  const trendAdvice =
    best.weekChange > 6
      ? t("sellNow", lang)
      : best.weekChange < -3
        ? t("holdSell", lang)
        : t("steadyPrices", lang);

  const speakText = [
    `${t("mandiPrices", lang)}: ${cropLabel}.`,
    `${t("bestMandi", lang)}: ${best.name[lang]}, ₹${best.today} ${t("pricePerQuintal", lang)}.`,
    `${t("weekTrend", lang)}: ${best.weekChange > 0 ? "+" : ""}${best.weekChange.toFixed(1)}%.`,
    `${t("recommendation", lang)}: ${trendAdvice}.`,
  ].join(" ");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-7 w-7 text-green-700" />
          <h1 className="text-2xl md:text-3xl font-bold">{t("mandiPrices", lang)}</h1>
        </div>
        <VoiceButton text={speakText} />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-center">
            <div className="flex items-center gap-3">
              <div
                className="h-16 w-16 rounded-xl bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${cropImage})` }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{t("crop", lang)}</div>
                <Select value={crop} onValueChange={setCrop}>
                  <SelectTrigger data-testid="select-mandi-crop" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value} data-testid={`option-mandi-${o.value}`}>
                        {o.labels[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{t("selectCropForPrices", lang)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Best mandi highlight */}
      <Card className="border-green-300 dark:border-green-900/60 bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950/20 dark:to-amber-950/10">
        <CardContent className="p-4">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-amber-400/30 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{t("bestMandi", lang)}</div>
                <div className="text-xl font-bold">{best.name[lang]}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {best.distance} {t("km", lang)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{t("todayPrice", lang)}</div>
              <div className="text-3xl font-bold text-green-800 dark:text-green-300">
                ₹{best.today.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">/ quintal</div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-white/70 dark:bg-black/30 p-3 border border-green-200 dark:border-green-900/40">
            <div className="text-xs text-muted-foreground">{t("recommendation", lang)}</div>
            <div className="text-sm font-medium">{trendAdvice}</div>
          </div>
        </CardContent>
      </Card>

      {/* 7-day chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-700" />
            {t("weekTrend", lang)} — {cropLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => `₹${v.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {enriched.map((m, i) => (
                  <Line
                    key={m.name.en}
                    type="monotone"
                    dataKey={m.name[lang]}
                    stroke={colors[i % colors.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Mandi list */}
      <Card>
        <CardHeader>
          <CardTitle>{t("nearbyMandis", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {enriched
              .slice()
              .sort((a, b) => b.today - a.today)
              .map((m, i) => (
                <div
                  key={m.name.en}
                  className="rounded-xl border p-3 hover-elevate"
                  data-testid={`mandi-${i}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {i === 0 && <Trophy className="h-4 w-4 text-amber-500 shrink-0" />}
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{m.name[lang]}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {m.distance} {t("km", lang)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">₹{m.today.toLocaleString()}</div>
                      <ChangeBadge value={m.dailyChange} />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {t("weekTrend", lang)}: {m.weekChange > 0 ? "+" : ""}
                      {m.weekChange.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChangeBadge({ value }: { value: number }) {
  const up = value > 0.2;
  const down = value < -0.2;
  const cls = up
    ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/40 dark:text-green-300"
    : down
      ? "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300"
      : "bg-muted text-muted-foreground";
  const Icon = up ? TrendingUp : down ? TrendingDown : Minus;
  return (
    <Badge className={`gap-1 mt-1 ${cls}`}>
      <Icon className="h-3 w-3" />
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </Badge>
  );
}
