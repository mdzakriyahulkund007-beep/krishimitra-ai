import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { LangCode } from "@/i18n/translations";

export type Profile = {
  name: string;
  village: string;
  state: string;
  farmSize: number;
  cropType: string;
  soilType: string;
  irrigationType: string;
};

export type Listing = {
  id: string;
  crop: string;
  quantity: number;
  pricePerKg: number;
  location: string;
  qualityGrade: string;
  harvestDate: string;
};

export type Task = {
  id: string;
  titleKey: string;
  customTitle?: { en: string; hi: string; kn: string; te: string; ur: string };
  done: boolean;
  date: string;
};

export type Activity = {
  id: string;
  type: "irrigation" | "fertilizer" | "pestControl" | "harvest" | "other";
  date: string;
  note: { en: string; hi: string; kn: string; te: string; ur: string };
};

export type FieldMetrics = {
  expectedYield: number; // quintals
  currentYield: number; // quintals so far / projected
  daysToHarvest: number;
  irrigationCount: number;
  fertilizerCount: number;
  pestControlCount: number;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  health: "excellent" | "good" | "warning" | "critical";
};

type AppState = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  profile: Profile;
  setProfile: (p: Profile) => void;
  listings: Listing[];
  addListing: (l: Omit<Listing, "id">) => void;
  removeListing: (id: string) => void;
  tasks: Task[];
  toggleTask: (id: string) => void;
  activities: Activity[];
  addActivity: (a: Omit<Activity, "id">) => void;
  metrics: FieldMetrics;
  setMetrics: (m: Partial<FieldMetrics>) => void;
};

const AppContext = createContext<AppState | null>(null);

const DEFAULT_PROFILE: Profile = {
  name: "Ravi Kumar",
  village: "Hiriyur",
  state: "Karnataka",
  farmSize: 4.5,
  cropType: "Tomato",
  soilType: "Red Soil",
  irrigationType: "Drip",
};

const DEFAULT_METRICS: FieldMetrics = {
  expectedYield: 120,
  currentYield: 78,
  daysToHarvest: 18,
  irrigationCount: 24,
  fertilizerCount: 6,
  pestControlCount: 3,
  soilMoisture: 42,
  temperature: 28,
  humidity: 65,
  health: "good",
};

const DEFAULT_TASKS: Task[] = [
  { id: "t1", titleKey: "irrigation", done: false, date: new Date().toISOString() },
  { id: "t2", titleKey: "fertilizer", done: true, date: new Date().toISOString() },
  { id: "t3", titleKey: "pestControl", done: false, date: new Date().toISOString() },
];

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    type: "irrigation",
    date: new Date(Date.now() - 86400000).toISOString(),
    note: {
      en: "Drip irrigation for 45 minutes",
      hi: "45 मिनट के लिए ड्रिप सिंचाई",
      kn: "45 ನಿಮಿಷಗಳ ಡ್ರಿಪ್ ನೀರಾವರಿ",
      te: "45 నిమిషాలు డ్రిప్ ఇరిగేషన్",
      ur: "45 منٹ کی ڈرپ آبپاشی",
    },
  },
  {
    id: "a2",
    type: "fertilizer",
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    note: {
      en: "Applied NPK 19:19:19, 25kg",
      hi: "NPK 19:19:19, 25 किग्रा डाला",
      kn: "NPK 19:19:19, 25 ಕೆಜಿ ಹಾಕಲಾಗಿದೆ",
      te: "NPK 19:19:19, 25 కిలోలు వేశారు",
      ur: "این پی کے 19:19:19، 25 کلو ڈالا",
    },
  },
  {
    id: "a3",
    type: "pestControl",
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    note: {
      en: "Neem oil spray on east field",
      hi: "पूर्वी खेत पर नीम तेल का छिड़काव",
      kn: "ಪೂರ್ವ ಕ್ಷೇತ್ರದಲ್ಲಿ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಣೆ",
      te: "తూర్పు పొలంలో వేప నూనె స్ప్రే",
      ur: "مشرقی کھیت پر نیم کے تیل کا چھڑکاؤ",
    },
  },
];

const DEFAULT_LISTINGS: Listing[] = [
  {
    id: "l1",
    crop: "Tomato",
    quantity: 200,
    pricePerKg: 22,
    location: "Hiriyur, Karnataka",
    qualityGrade: "A",
    harvestDate: new Date().toISOString().slice(0, 10),
  },
  {
    id: "l2",
    crop: "Onion",
    quantity: 500,
    pricePerKg: 18,
    location: "Bellary, Karnataka",
    qualityGrade: "B",
    harvestDate: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
  },
];

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

function persist<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => read<LangCode>("km_lang", "en"));
  const [profile, setProfileState] = useState<Profile>(() => read<Profile>("km_profile", DEFAULT_PROFILE));
  const [listings, setListings] = useState<Listing[]>(() => read<Listing[]>("km_listings", DEFAULT_LISTINGS));
  const [tasks, setTasks] = useState<Task[]>(() => read<Task[]>("km_tasks", DEFAULT_TASKS));
  const [activities, setActivities] = useState<Activity[]>(() =>
    read<Activity[]>("km_activities", DEFAULT_ACTIVITIES),
  );
  const [metrics, setMetricsState] = useState<FieldMetrics>(() =>
    read<FieldMetrics>("km_metrics", DEFAULT_METRICS),
  );

  useEffect(() => persist("km_lang", lang), [lang]);
  useEffect(() => persist("km_profile", profile), [profile]);
  useEffect(() => persist("km_listings", listings), [listings]);
  useEffect(() => persist("km_tasks", tasks), [tasks]);
  useEffect(() => persist("km_activities", activities), [activities]);
  useEffect(() => persist("km_metrics", metrics), [metrics]);

  const value = useMemo<AppState>(
    () => ({
      lang,
      setLang: (l) => setLangState(l),
      profile,
      setProfile: (p) => setProfileState(p),
      listings,
      addListing: (l) =>
        setListings((prev) => [...prev, { ...l, id: `l${Date.now()}` }]),
      removeListing: (id) => setListings((prev) => prev.filter((x) => x.id !== id)),
      tasks,
      toggleTask: (id) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
      activities,
      addActivity: (a) =>
        setActivities((prev) => [{ ...a, id: `a${Date.now()}` }, ...prev]),
      metrics,
      setMetrics: (m) => setMetricsState((prev) => ({ ...prev, ...m })),
    }),
    [lang, profile, listings, tasks, activities, metrics],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
