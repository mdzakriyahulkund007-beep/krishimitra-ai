import { useState } from "react";
import { User, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/store/AppContext";
import { t, LANGUAGES, type LangCode } from "@/i18n/translations";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { lang, setLang, profile, setProfile } = useApp();
  const [form, setForm] = useState(profile);
  const [selectedLang, setSelectedLang] = useState<LangCode>(lang);
  const { toast } = useToast();

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setLang(selectedLang);
    toast({ title: t("save", selectedLang) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User className="h-7 w-7 text-green-700" />
        <h1 className="text-2xl md:text-3xl font-bold">{t("profile", lang)}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("profile", lang)}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>{t("name", lang)}</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="input-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("village", lang)}</Label>
              <Input
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
                data-testid="input-village"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("state", lang)}</Label>
              <Input
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                data-testid="input-state"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("farmSize", lang)}</Label>
              <Input
                type="number"
                step="0.1"
                value={form.farmSize}
                onChange={(e) => setForm({ ...form, farmSize: Number(e.target.value) })}
                data-testid="input-farm-size"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("cropType", lang)}</Label>
              <Input
                value={form.cropType}
                onChange={(e) => setForm({ ...form, cropType: e.target.value })}
                data-testid="input-crop-type"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("soilType", lang)}</Label>
              <Input
                value={form.soilType}
                onChange={(e) => setForm({ ...form, soilType: e.target.value })}
                data-testid="input-soil-type"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("irrigationType", lang)}</Label>
              <Input
                value={form.irrigationType}
                onChange={(e) => setForm({ ...form, irrigationType: e.target.value })}
                data-testid="input-irrigation-type"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("preferredLanguage", lang)}</Label>
              <Select value={selectedLang} onValueChange={(v) => setSelectedLang(v as LangCode)}>
                <SelectTrigger data-testid="select-pref-lang">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      {l.nativeLabel} ({l.label})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="sm:col-span-2 bg-green-700 hover:bg-green-800 text-white gap-1"
              data-testid="button-save-profile"
            >
              <Save className="h-4 w-4" /> {t("save", lang)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
