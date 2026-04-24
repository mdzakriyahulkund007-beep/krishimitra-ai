import { LANGUAGES, type LangCode } from "@/i18n/translations";

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string, lang: LangCode) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }
  stop();
  const utter = new SpeechSynthesisUtterance(text);
  const langMeta = LANGUAGES.find((l) => l.code === lang);
  utter.lang = langMeta?.voice ?? "en-US";
  utter.rate = 0.95;
  utter.pitch = 1;

  // Try to pick a voice that matches the language
  const voices = window.speechSynthesis.getVoices();
  const match =
    voices.find((v) => v.lang.toLowerCase() === utter.lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(utter.lang.split("-")[0].toLowerCase()));
  if (match) utter.voice = match;

  currentUtterance = utter;
  window.speechSynthesis.speak(utter);
}

export function stop() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

export function isSpeaking(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return window.speechSynthesis.speaking;
}

// Initialize voices (some browsers load asynchronously)
export function initVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
