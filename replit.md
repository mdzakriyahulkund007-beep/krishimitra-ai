# KrishiMitra AI

A full-stack React + Vite multilingual AI farming advisory and marketplace web app for Indian farmers.

## Artifact
- `artifacts/krishimitra` — main web app (React + Vite + Tailwind v4 + shadcn/ui + wouter)

## Features
- **Multilingual UI** in 5 languages — English, Hindi, Kannada, Telugu, Urdu — every label, option, heading, recommendation, alert, and forecast switches dynamically with the language selector.
- **Voice assistant** using Web Speech API speaks the selected language (en-US, hi-IN, kn-IN, te-IN, ur-PK). "Listen" buttons appear on Dashboard, Advisory, Weather, Alerts, Soil & Pest, and the Monitoring Bar.
- **AI Farm Advisory** — analyzes crop, soil moisture, temperature, humidity → returns health, pest risk, water stress, nutrient deficiency + localized recommendations.
- **5-Day Weather Forecast** with localized day labels and AI-generated suggestions in selected language.
- **OLX-style Marketplace** with Buyer/Seller tabs, create/browse/delete listings, search filter.
- **AI Tasks** with mark-complete toggle.
- **Alerts** for pest, weather, water — fully translated messages.
- **Soil & Pest** info with suitable crops, common pests, fertilizer suggestions.
- **Multi-Agent Pipeline** UI showing Data Ingestion → Risk Detection → Decision → Orchestrator agents.
- **Mandi Price Trends** — pick a crop to see today's price across 4 nearby mandis, a 7-day multi-line trend chart (recharts), the best-selling mandi highlighted with distance, and an AI buy/hold/sell recommendation. All mandi names localized to all 5 languages.
- **Crop Calendar** — month-by-month farming activities for each of the 10 crops (sowing, transplanting, irrigation, fertilizer, pest control, weeding, harvesting, soil prep). Shows season (Kharif/Rabi/Zaid/Year-Round), highlights the current month with a focused card, and renders a full 12-month timeline with color-coded activity chips. All notes localized in 5 languages with voice readout for the current month.
- **Field Monitoring Bar** tracking yield progress (current/expected quintals + %), days to harvest, irrigation/fertilizer/pest-control counts.
- **Downloadable PDF Report** (jsPDF) with farmer profile, crop analytics (yield bar), activities summary, tasks status — generated from current state.
- **Profile** page to update farmer info and preferred language; persisted in localStorage.
- **RTL support** for Urdu (`dir="rtl"` toggled per-language).

## Architecture
- `src/i18n/translations.ts` — `LANGUAGES` constant + `T` dictionary + `t(key, lang)` helper.
- `src/i18n/options.ts` — `CROP_OPTIONS`, `SOIL_OPTIONS`, `IRRIGATION_OPTIONS`, `GROWTH_STAGE_OPTIONS`, `QUALITY_GRADE_OPTIONS` with localized labels for all 5 languages and crop image paths.
- `src/i18n/recommendations.ts` — localized AI recommendation strings keyed by condition; also exports `CROP_TIPS`, `CROP_YIELD`, `CROP_WATER_NEED` lookup tables for data-driven advisory.
- `src/store/AppContext.tsx` — global state with `lang`, `profile`, `listings`, `tasks`, `activities`, `metrics` (FieldMetrics) — all persisted to localStorage.
- `src/utils/voice.ts` — speech synthesis wrapper with language-voice mapping.
- `src/utils/report.ts` — `downloadReport()` builds a multi-page PDF using jsPDF.
- `src/components/Layout.tsx` — sidebar + topbar + mobile bottom nav, RTL-aware.
- `src/components/MonitoringBar.tsx` — yield progress + 5 stat tiles + Listen + Download buttons.
- `src/components/VoiceButton.tsx` + `LanguageSelector.tsx` — reusable controls.
- `src/pages/*` — Dashboard, Advisory, Weather, Marketplace, Tasks, Alerts, SoilPest, MultiAgent, Profile.

## Routes (`previewPath` = `/`)
- `/` Dashboard, `/advisory`, `/weather`, `/marketplace`, `/tasks`, `/alerts`, `/soil-pest`, `/agents`, `/profile`.

## Notes
- jsPDF default Helvetica supports only Latin-1; report includes English labels alongside the localized title and uses `safeText()` to strip Indic/RTL chars in the PDF body so the file remains legible across languages.
- All data is stored client-side (localStorage) — no backend required.
- Theme is a custom green agriculture palette set in `src/index.css` (light + dark).
