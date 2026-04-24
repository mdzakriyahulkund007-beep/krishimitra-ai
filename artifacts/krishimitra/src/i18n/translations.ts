export type LangCode = "en" | "hi" | "kn" | "te" | "ur";

export const LANGUAGES: { code: LangCode; label: string; nativeLabel: string; voice: string }[] = [
  { code: "en", label: "English", nativeLabel: "English", voice: "en-US" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", voice: "hi-IN" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", voice: "kn-IN" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", voice: "te-IN" },
  { code: "ur", label: "Urdu", nativeLabel: "اُردُو", voice: "ur-PK" },
];

type Dict = Record<LangCode, string>;

export const T: Record<string, Dict> = {
  appName: {
    en: "KrishiMitra AI",
    hi: "कृषिमित्र एआई",
    kn: "ಕೃಷಿಮಿತ್ರ ಎಐ",
    te: "కృషిమిత్ర ఏఐ",
    ur: "کرشی متر اے آئی",
  },
  tagline: {
    en: "Your AI Farming Companion",
    hi: "आपका एआई खेती साथी",
    kn: "ನಿಮ್ಮ ಎಐ ಕೃಷಿ ಸಹಚರ",
    te: "మీ ఏఐ వ్యవసాయ సహచరుడు",
    ur: "آپ کا اے آئی کھیتی ساتھی",
  },
  // Navigation
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", te: "డాష్‌బోర్డ్", ur: "ڈیش بورڈ" },
  advisory: { en: "AI Advisory", hi: "एआई सलाह", kn: "ಎಐ ಸಲಹೆ", te: "ఏఐ సలహా", ur: "اے آئی مشاورت" },
  weather: { en: "Weather", hi: "मौसम", kn: "ಹವಾಮಾನ", te: "వాతావరణం", ur: "موسم" },
  marketplace: { en: "Marketplace", hi: "बाज़ार", kn: "ಮಾರುಕಟ್ಟೆ", te: "మార్కెట్", ur: "بازار" },
  tasks: { en: "Tasks", hi: "कार्य", kn: "ಕಾರ್ಯಗಳು", te: "పనులు", ur: "کام" },
  alerts: { en: "Alerts", hi: "चेतावनियाँ", kn: "ಎಚ್ಚರಿಕೆಗಳು", te: "హెచ్చరికలు", ur: "انتباہات" },
  soilPest: { en: "Soil & Pest", hi: "मिट्टी और कीट", kn: "ಮಣ್ಣು ಮತ್ತು ಕೀಟ", te: "నేల & తెగుళ్లు", ur: "مٹی اور کیڑے" },
  multiAgent: { en: "AI Agents", hi: "एआई एजेंट", kn: "ಎಐ ಏಜೆಂಟ್‌ಗಳು", te: "ఏఐ ఏజెంట్లు", ur: "اے آئی ایجنٹس" },
  profile: { en: "Profile", hi: "प्रोफ़ाइल", kn: "ಪ್ರೊಫೈಲ್", te: "ప్రొఫైల్", ur: "پروفائل" },

  // Common
  language: { en: "Language", hi: "भाषा", kn: "ಭಾಷೆ", te: "భాష", ur: "زبان" },
  listen: { en: "Listen", hi: "सुनें", kn: "ಆಲಿಸಿ", te: "వినండి", ur: "سنیں" },
  stop: { en: "Stop", hi: "रोकें", kn: "ನಿಲ್ಲಿಸಿ", te: "ఆపండి", ur: "روکیں" },
  download: { en: "Download Report", hi: "रिपोर्ट डाउनलोड करें", kn: "ವರದಿ ಡೌನ್‌ಲೋಡ್", te: "నివేదిక డౌన్‌లోడ్", ur: "رپورٹ ڈاؤن لوڈ" },
  save: { en: "Save", hi: "सहेजें", kn: "ಉಳಿಸಿ", te: "సేవ్", ur: "محفوظ" },
  edit: { en: "Edit", hi: "संपादित करें", kn: "ಸಂಪಾದಿಸು", te: "సవరించు", ur: "ترمیم" },
  cancel: { en: "Cancel", hi: "रद्द करें", kn: "ರದ್ದು", te: "రద్దు", ur: "منسوخ" },
  add: { en: "Add", hi: "जोड़ें", kn: "ಸೇರಿಸಿ", te: "జోడించు", ur: "شامل" },
  delete: { en: "Delete", hi: "हटाएँ", kn: "ಅಳಿಸಿ", te: "తొలగించు", ur: "حذف" },
  done: { en: "Done", hi: "पूर्ण", kn: "ಪೂರ್ಣಗೊಂಡಿದೆ", te: "పూర్తయింది", ur: "مکمل" },
  pending: { en: "Pending", hi: "लंबित", kn: "ಬಾಕಿ", te: "పెండింగ్", ur: "زیر التواء" },
  contact: { en: "Contact", hi: "संपर्क", kn: "ಸಂಪರ್ಕ", te: "సంప్రదించండి", ur: "رابطہ" },
  search: { en: "Search", hi: "खोजें", kn: "ಹುಡುಕಿ", te: "వెతకండి", ur: "تلاش" },
  filter: { en: "Filter", hi: "फ़िल्टर", kn: "ಫಿಲ್ಟರ್", te: "ఫిల్టర్", ur: "فلٹر" },
  loading: { en: "Loading...", hi: "लोड हो रहा है...", kn: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...", te: "లోడ్ అవుతోంది...", ur: "لوڈ ہو رہا ہے..." },

  // Profile fields
  name: { en: "Name", hi: "नाम", kn: "ಹೆಸರು", te: "పేరు", ur: "نام" },
  village: { en: "Village", hi: "गाँव", kn: "ಗ್ರಾಮ", te: "గ్రామం", ur: "گاؤں" },
  state: { en: "State", hi: "राज्य", kn: "ರಾಜ್ಯ", te: "రాష్ట్రం", ur: "ریاست" },
  farmSize: { en: "Farm Size (Acres)", hi: "खेत का आकार (एकड़)", kn: "ಕೃಷಿ ಗಾತ್ರ (ಎಕರೆ)", te: "వ్యవసాయ పరిమాణం (ఎకరాలు)", ur: "کھیت کا سائز (ایکڑ)" },
  cropType: { en: "Crop Type", hi: "फसल प्रकार", kn: "ಬೆಳೆ ಪ್ರಕಾರ", te: "పంట రకం", ur: "فصل کی قسم" },
  soilType: { en: "Soil Type", hi: "मिट्टी का प्रकार", kn: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", te: "నేల రకం", ur: "مٹی کی قسم" },
  irrigationType: { en: "Irrigation Type", hi: "सिंचाई का प्रकार", kn: "ನೀರಾವರಿ ಪ್ರಕಾರ", te: "నీటిపారుదల రకం", ur: "آبپاشی کی قسم" },
  preferredLanguage: { en: "Preferred Language", hi: "पसंदीदा भाषा", kn: "ಆದ್ಯತೆಯ ಭಾಷೆ", te: "ప్రాధాన్య భాష", ur: "پسندیدہ زبان" },

  // Dashboard
  farmHealth: { en: "Farm Health", hi: "खेत स्वास्थ्य", kn: "ಕೃಷಿ ಆರೋಗ್ಯ", te: "వ్యవసాయ ఆరోగ్యం", ur: "کھیت کی صحت" },
  soilStatus: { en: "Soil Status", hi: "मिट्टी की स्थिति", kn: "ಮಣ್ಣಿನ ಸ್ಥಿತಿ", te: "నేల స్థితి", ur: "مٹی کی حالت" },
  cropStage: { en: "Crop Stage", hi: "फसल चरण", kn: "ಬೆಳೆ ಹಂತ", te: "పంట దశ", ur: "فصل کا مرحلہ" },
  quickInsights: { en: "Quick AI Insights", hi: "त्वरित एआई अंतर्दृष्टि", kn: "ತ್ವರಿತ ಎಐ ಒಳನೋಟಗಳು", te: "శీఘ్ర ఏఐ అంతర్దృష్టులు", ur: "فوری اے آئی بصیرت" },
  welcome: { en: "Welcome", hi: "स्वागत है", kn: "ಸ್ವಾಗತ", te: "స్వాగతం", ur: "خوش آمدید" },

  // Status values
  excellent: { en: "Excellent", hi: "उत्कृष्ट", kn: "ಅತ್ಯುತ್ತಮ", te: "అద్భుతమైనది", ur: "بہترین" },
  good: { en: "Good", hi: "अच्छा", kn: "ಒಳ್ಳೆಯದು", te: "మంచిది", ur: "اچھا" },
  warning: { en: "Warning", hi: "चेतावनी", kn: "ಎಚ್ಚರಿಕೆ", te: "హెచ్చరిక", ur: "انتباہ" },
  critical: { en: "Critical", hi: "गंभीर", kn: "ಗಂಭೀರ", te: "క్రిటికల్", ur: "اہم" },
  safe: { en: "Safe", hi: "सुरक्षित", kn: "ಸುರಕ್ಷಿತ", te: "సురక్షితం", ur: "محفوظ" },
  high: { en: "High", hi: "उच्च", kn: "ಹೆಚ್ಚಿನ", te: "అధిక", ur: "زیادہ" },
  medium: { en: "Medium", hi: "मध्यम", kn: "ಮಧ್ಯಮ", te: "మధ్యస్థం", ur: "درمیانہ" },
  low: { en: "Low", hi: "कम", kn: "ಕಡಿಮೆ", te: "తక్కువ", ur: "کم" },

  // Advisory
  analyzeFarm: { en: "Analyze Farm", hi: "फसल जांचें", kn: "ಬೆಳೆ ಪರಿಶೀಲಿಸಿ", te: "పంట విశ్లేషించు", ur: "فصل تجزیہ کریں" },
  crop: { en: "Crop", hi: "फसल", kn: "ಬೆಳೆ", te: "పంట", ur: "فصل" },
  soilMoisture: { en: "Soil Moisture (%)", hi: "मिट्टी की नमी (%)", kn: "ಮಣ್ಣಿನ ತೇವಾಂಶ (%)", te: "నేల తేమ (%)", ur: "مٹی کی نمی (%)" },
  temperature: { en: "Temperature (°C)", hi: "तापमान (°C)", kn: "ತಾಪಮಾನ (°C)", te: "ఉష్ణోగ్రత (°C)", ur: "درجہ حرارت (°C)" },
  humidity: { en: "Humidity (%)", hi: "नमी (%)", kn: "ಆರ್ದ್ರತೆ (%)", te: "తేమ (%)", ur: "نمی (%)" },
  pestRisk: { en: "Pest Risk", hi: "कीट जोखिम", kn: "ಕೀಟ ಅಪಾಯ", te: "తెగుళ్ల ప్రమాదం", ur: "کیڑوں کا خطرہ" },
  waterStress: { en: "Water Stress", hi: "जल तनाव", kn: "ನೀರಿನ ಒತ್ತಡ", te: "నీటి ఒత్తిడి", ur: "پانی کا دباؤ" },
  nutrientDeficiency: { en: "Nutrient Deficiency", hi: "पोषक तत्व की कमी", kn: "ಪೋಷಕಾಂಶ ಕೊರತೆ", te: "పోషక లోపం", ur: "غذائیت کی کمی" },
  recommendations: { en: "Recommendations", hi: "सिफ़ारिशें", kn: "ಶಿಫಾರಸುಗಳು", te: "సిఫార్సులు", ur: "سفارشات" },
  health: { en: "Health", hi: "स्वास्थ्य", kn: "ಆರೋಗ್ಯ", te: "ఆరోగ్యం", ur: "صحت" },

  // Weather
  forecast5Day: { en: "5-Day Forecast", hi: "5 दिन का पूर्वानुमान", kn: "5 ದಿನಗಳ ಮುನ್ಸೂಚನೆ", te: "5 రోజుల సూచన", ur: "5 دن کی پیش گوئی" },
  rainProbability: { en: "Rain Probability", hi: "वर्षा संभावना", kn: "ಮಳೆ ಸಂಭವನೀಯತೆ", te: "వర్ష సంభావ్యత", ur: "بارش کا امکان" },
  aiSuggestion: { en: "AI Suggestion", hi: "एआई सुझाव", kn: "ಎಐ ಸಲಹೆ", te: "ఏఐ సూచన", ur: "اے آئی تجویز" },

  // Marketplace
  createListing: { en: "Create Listing", hi: "लिस्टिंग बनाएँ", kn: "ಪಟ್ಟಿ ರಚಿಸಿ", te: "జాబితా సృష్టించు", ur: "فہرست بنائیں" },
  browseListings: { en: "Browse Listings", hi: "सूचियाँ ब्राउज़ करें", kn: "ಪಟ್ಟಿಗಳನ್ನು ಬ್ರೌಸ್", te: "జాబితాలను బ్రౌజ్", ur: "فہرستیں براؤز کریں" },
  quantityKg: { en: "Quantity (kg)", hi: "मात्रा (किग्रा)", kn: "ಪ್ರಮಾಣ (ಕೆಜಿ)", te: "పరిమాణం (కిలోలు)", ur: "مقدار (کلو)" },
  pricePerKg: { en: "Price per kg (₹)", hi: "मूल्य प्रति किग्रा (₹)", kn: "ಕೆಜಿ ಬೆಲೆ (₹)", te: "కిలో ధర (₹)", ur: "فی کلو قیمت (₹)" },
  location: { en: "Location", hi: "स्थान", kn: "ಸ್ಥಳ", te: "ప్రదేశం", ur: "مقام" },
  qualityGrade: { en: "Quality Grade", hi: "गुणवत्ता ग्रेड", kn: "ಗುಣಮಟ್ಟದ ಶ್ರೇಣಿ", te: "నాణ్యత గ్రేడ్", ur: "کوالٹی گریڈ" },
  harvestDate: { en: "Harvest Date", hi: "कटाई तिथि", kn: "ಸುಗ್ಗಿ ದಿನಾಂಕ", te: "పంట కోత తేదీ", ur: "کٹائی کی تاریخ" },
  myListings: { en: "My Listings", hi: "मेरी लिस्टिंग", kn: "ನನ್ನ ಪಟ್ಟಿಗಳು", te: "నా జాబితాలు", ur: "میری فہرستیں" },
  buyer: { en: "Buyer View", hi: "खरीदार दृश्य", kn: "ಖರೀದಿದಾರ ನೋಟ", te: "కొనుగోలుదారు వీక్షణ", ur: "خریدار منظر" },
  seller: { en: "Seller View", hi: "विक्रेता दृश्य", kn: "ಮಾರಾಟಗಾರ ನೋಟ", te: "విక్రేత వీక్షణ", ur: "بیچنے والا منظر" },

  // Monitoring bar
  monitoring: { en: "Field Monitoring", hi: "क्षेत्र निगरानी", kn: "ಕ್ಷೇತ್ರ ಮೇಲ್ವಿಚಾರಣೆ", te: "క్షేత్ర పర్యవేక్షణ", ur: "فیلڈ نگرانی" },
  yield: { en: "Yield (Quintals)", hi: "उपज (क्विंटल)", kn: "ಇಳುವರಿ (ಕ್ವಿಂಟಾಲ್)", te: "దిగుబడి (క్వింటాళ్లు)", ur: "پیداوار (کوئنٹل)" },
  yieldProgress: { en: "Yield Progress", hi: "उपज प्रगति", kn: "ಇಳುವರಿ ಪ್ರಗತಿ", te: "దిగుబడి పురోగతి", ur: "پیداوار کی پیشرفت" },
  irrigation: { en: "Irrigation", hi: "सिंचाई", kn: "ನೀರಾವರಿ", te: "నీటిపారుదల", ur: "آبپاشی" },
  fertilizer: { en: "Fertilizer", hi: "उर्वरक", kn: "ಗೊಬ್ಬರ", te: "ఎరువు", ur: "کھاد" },
  pestControl: { en: "Pest Control", hi: "कीट नियंत्रण", kn: "ಕೀಟ ನಿಯಂತ್ರಣ", te: "తెగుళ్ల నియంత్రణ", ur: "کیڑوں کا کنٹرول" },
  expectedYield: { en: "Expected Yield", hi: "अपेक्षित उपज", kn: "ನಿರೀಕ್ಷಿತ ಇಳುವರಿ", te: "ఆశించిన దిగుబడి", ur: "متوقع پیداوار" },
  currentYield: { en: "Current Yield", hi: "वर्तमान उपज", kn: "ಪ್ರಸ್ತುತ ಇಳುವರಿ", te: "ప్రస్తుత దిగుబడి", ur: "موجودہ پیداوار" },
  daysToHarvest: { en: "Days to Harvest", hi: "कटाई तक के दिन", kn: "ಸುಗ್ಗಿಯವರೆಗೆ ದಿನಗಳು", te: "పంట కోతకు రోజులు", ur: "کٹائی تک کے دن" },

  // Report
  reportTitle: { en: "Farm Analytics Report", hi: "फार्म विश्लेषण रिपोर्ट", kn: "ಕೃಷಿ ವಿಶ್ಲೇಷಣಾ ವರದಿ", te: "వ్యవసాయ విశ్లేషణ నివేదిక", ur: "فارم تجزیاتی رپورٹ" },
  cropAnalytics: { en: "Crop Analytics", hi: "फसल विश्लेषण", kn: "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ", te: "పంట విశ్లేషణ", ur: "فصل کا تجزیہ" },
  activitiesSummary: { en: "Activities Summary", hi: "गतिविधियों का सारांश", kn: "ಚಟುವಟಿಕೆಗಳ ಸಾರಾಂಶ", te: "కార్యకలాపాల సారాంశం", ur: "سرگرمیوں کا خلاصہ" },
  generatedOn: { en: "Generated on", hi: "तैयार किया गया", kn: "ರಚಿಸಲಾಗಿದೆ", te: "ఉత్పత్తి చేయబడింది", ur: "تیار کردہ" },

  // Tasks
  taskList: { en: "AI-Generated Tasks", hi: "एआई-जनित कार्य", kn: "ಎಐ-ರಚಿತ ಕಾರ್ಯಗಳು", te: "ఏఐ-ఉత్పన్న పనులు", ur: "اے آئی سے بنائے گئے کام" },
  markComplete: { en: "Mark Complete", hi: "पूर्ण चिह्नित करें", kn: "ಪೂರ್ಣವೆಂದು ಗುರುತಿಸಿ", te: "పూర్తిగా గుర్తించండి", ur: "مکمل نشان زد کریں" },

  // Alerts
  pestAlert: { en: "Pest Alert", hi: "कीट चेतावनी", kn: "ಕೀಟ ಎಚ್ಚರಿಕೆ", te: "తెగుళ్ల హెచ్చరిక", ur: "کیڑوں کا انتباہ" },
  weatherAlert: { en: "Weather Alert", hi: "मौसम चेतावनी", kn: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ", te: "వాతావరణ హెచ్చరిక", ur: "موسمی انتباہ" },
  waterAlert: { en: "Water Stress Alert", hi: "जल तनाव चेतावनी", kn: "ನೀರಿನ ಒತ್ತಡ ಎಚ್ಚರಿಕೆ", te: "నీటి ఒత్తిడి హెచ్చరిక", ur: "پانی کے دباؤ کا انتباہ" },

  // Soil & Pest
  suitableCrops: { en: "Suitable Crops", hi: "उपयुक्त फसलें", kn: "ಸೂಕ್ತ ಬೆಳೆಗಳು", te: "అనువైన పంటలు", ur: "موزوں فصلیں" },
  commonPests: { en: "Common Pests", hi: "सामान्य कीट", kn: "ಸಾಮಾನ್ಯ ಕೀಟಗಳು", te: "సాధారణ తెగుళ్లు", ur: "عام کیڑے" },
  fertilizerSuggestion: { en: "Fertilizer Suggestions", hi: "उर्वरक सुझाव", kn: "ಗೊಬ್ಬರ ಸಲಹೆಗಳು", te: "ఎరువు సూచనలు", ur: "کھاد کی تجاویز" },

  // Multi-Agent
  agentPipeline: { en: "Multi-Agent Pipeline", hi: "मल्टी-एजेंट पाइपलाइन", kn: "ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಪೈಪ್‌ಲೈನ್", te: "మల్టీ-ఏజెంట్ పైప్‌లైన్", ur: "ملٹی ایجنٹ پائپ لائن" },
  dataIngestion: { en: "Data Ingestion Agent", hi: "डेटा संग्रहण एजेंट", kn: "ಡೇಟಾ ಸಂಗ್ರಹ ಏಜೆಂಟ್", te: "డేటా ఇన్‌గెస్షన్ ఏజెంట్", ur: "ڈیٹا اکٹھا کرنے والا ایجنٹ" },
  riskDetection: { en: "Risk Detection Agent", hi: "जोखिम पहचान एजेंट", kn: "ಅಪಾಯ ಪತ್ತೆ ಏಜೆಂಟ್", te: "రిస్క్ గుర్తింపు ఏజెంట్", ur: "خطرے کی شناخت ایجنٹ" },
  decision: { en: "Decision Agent", hi: "निर्णय एजेंट", kn: "ನಿರ್ಧಾರ ಏಜೆಂಟ್", te: "నిర్ణయ ఏజెంట్", ur: "فیصلہ ایجنٹ" },
  orchestrator: { en: "Action Orchestrator", hi: "एक्शन ऑर्केस्ट्रेटर", kn: "ಕ್ರಿಯಾ ಆರ್ಕೆಸ್ಟ್ರೇಟರ್", te: "యాక్షన్ ఆర్కెస్ట్రేటర్", ur: "ایکشن آرکیسٹریٹر" },
};

export function t(key: string, lang: LangCode): string {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}
