import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, type LangCode } from "@/i18n/translations";
import { useApp } from "@/store/AppContext";

export function LanguageSelector() {
  const { lang, setLang } = useApp();
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={lang} onValueChange={(v) => setLang(v as LangCode)}>
        <SelectTrigger className="w-[150px]" data-testid="select-language">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((l) => (
            <SelectItem key={l.code} value={l.code} data-testid={`option-lang-${l.code}`}>
              {l.nativeLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
