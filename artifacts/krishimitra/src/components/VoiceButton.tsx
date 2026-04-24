import { useState } from "react";
import { Volume2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speak, stop } from "@/utils/voice";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";

type Props = {
  text: string;
  size?: "sm" | "default" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary";
};

export function VoiceButton({ text, size = "sm", variant = "outline" }: Props) {
  const { lang } = useApp();
  const [playing, setPlaying] = useState(false);

  const handleListen = () => {
    if (playing) {
      stop();
      setPlaying(false);
      return;
    }
    speak(text, lang);
    setPlaying(true);
    // Approximate end of utterance using setTimeout based on text length
    const ms = Math.min(60000, Math.max(2500, text.length * 90));
    setTimeout(() => setPlaying(false), ms);
  };

  return (
    <Button
      type="button"
      onClick={handleListen}
      variant={variant}
      size={size}
      className="gap-1.5"
      data-testid="button-voice"
    >
      {playing ? (
        <>
          <Square className="h-4 w-4" />
          <span className="hidden sm:inline">{t("stop", lang)}</span>
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4" />
          <span className="hidden sm:inline">{t("listen", lang)}</span>
        </>
      )}
    </Button>
  );
}
