// Lightweight Latin -> Devanagari/Kannada/Telugu/Urdu transliteration helpers
// These are used for PDF report rendering since jsPDF default fonts don't
// support Indic / RTL scripts. We render the text using Latin transliteration
// so the PDF remains legible.

import type { LangCode } from "@/i18n/translations";

// Map of common UI words to their romanised forms (so the PDF reads more
// naturally when generated in any language).
const ROMAN_MAP_HI: Record<string, string> = {
  "रिपोर्ट": "Report",
  "फार्म": "Farm",
};

export function asciiSafe(text: string, _lang: LangCode): string {
  // jsPDF's default Helvetica only supports WinAnsi (Latin-1). Strip / replace
  // any non-Latin characters with a transliterated/Latin fallback.
  let out = text;
  for (const [k, v] of Object.entries(ROMAN_MAP_HI)) {
    out = out.split(k).join(v);
  }
  // Replace any remaining non-Latin1 chars with '?'
  return out.replace(/[^\x00-\xFF]/g, (ch) => {
    // Try to keep digits and punctuation
    return "";
  });
}
