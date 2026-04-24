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
  phone?: string;
};

export type Listing = {
  id: string;
  crop: string; // option value (e.g. "tomato")
  quantity: number;
  pricePerKg: number;
  location: string;
  qualityGrade: string; // "A" | "B" | "C"
  harvestDate: string;
  sellerName: string;
  sellerPhone: string;
  rating: number; // 0–5
  image?: string; // public path
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
  expectedYield: number;
  currentYield: number;
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
  cropType: "tomato",
  soilType: "red",
  irrigationType: "drip",
  phone: "+91 98765 43210",
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
    crop: "tomato",
    quantity: 250,
    pricePerKg: 22,
    location: "Hiriyur, Karnataka",
    qualityGrade: "A",
    harvestDate: new Date().toISOString().slice(0, 10),
    sellerName: "Ravi Kumar",
    sellerPhone: "+91 98765 43210",
    rating: 4.7,
    image: "crops/crop_tomato.jpg",
  },
  {
    id: "l2",
    crop: "onion",
    quantity: 500,
    pricePerKg: 18,
    location: "Bellary, Karnataka",
    qualityGrade: "B",
    harvestDate: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
    sellerName: "Lakshmi Devi",
    sellerPhone: "+91 99887 65432",
    rating: 4.5,
    image: "crops/crop_onion.jpg",
  },
  {
    id: "l3",
    crop: "rice",
    quantity: 1200,
    pricePerKg: 32,
    location: "Mandya, Karnataka",
    qualityGrade: "A",
    harvestDate: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
    sellerName: "Mahesh Patil",
    sellerPhone: "+91 90909 12345",
    rating: 4.9,
    image: "crops/crop_rice.jpg",
  },
  {
    id: "l4",
    crop: "wheat",
    quantity: 800,
    pricePerKg: 26,
    location: "Hubli, Karnataka",
    qualityGrade: "A",
    harvestDate: new Date(Date.now() - 86400000 * 10).toISOString().slice(0, 10),
    sellerName: "Suresh Reddy",
    sellerPhone: "+91 98123 55678",
    rating: 4.4,
    image: "crops/crop_wheat.jpg",
  },
  {
    id: "l5",
    crop: "chili",
    quantity: 150,
    pricePerKg: 95,
    location: "Guntur, Andhra Pradesh",
    qualityGrade: "A",
    harvestDate: new Date(Date.now() - 86400000 * 1).toISOString().slice(0, 10),
    sellerName: "Anil Reddy",
    sellerPhone: "+91 88996 77123",
    rating: 4.8,
    image: "crops/crop_chili.jpg",
  },
  {
    id: "l6",
    crop: "potato",
    quantity: 600,
    pricePerKg: 14,
    location: "Hassan, Karnataka",
    qualityGrade: "B",
    harvestDate: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10),
    sellerName: "Geetha Bai",
    sellerPhone: "+91 96543 21987",
    rating: 4.3,
    image: "crops/crop_potato.jpg",
  },
];

const STORAGE_VERSION = "v2";

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(`${STORAGE_VERSION}_${key}`);
    if (!v) return fallback;
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

function persist<T>(key: string, value: T) {
  try {
    localStorage.setItem(`${STORAGE_VERSION}_${key}`, JSON.stringify(value));
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
        setListings((prev) => [{ ...l, id: `l${Date.now()}` }, ...prev]),
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
