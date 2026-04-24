import { useState } from "react";
import { ShoppingCart, Plus, Phone, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";

export default function Marketplace() {
  const { lang, listings, addListing, removeListing, profile } = useApp();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    crop: "",
    quantity: 0,
    pricePerKg: 0,
    location: `${profile.village}, ${profile.state}`,
    qualityGrade: "A",
    harvestDate: new Date().toISOString().slice(0, 10),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.crop || !form.quantity) return;
    addListing(form);
    setForm({ ...form, crop: "", quantity: 0, pricePerKg: 0 });
  };

  const filtered = listings.filter((l) =>
    [l.crop, l.location, l.qualityGrade].some((s) =>
      s.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingCart className="h-7 w-7 text-green-700" />
        <h1 className="text-2xl md:text-3xl font-bold">{t("marketplace", lang)}</h1>
      </div>

      <Tabs defaultValue="buyer" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="buyer" data-testid="tab-buyer">{t("buyer", lang)}</TabsTrigger>
          <TabsTrigger value="seller" data-testid="tab-seller">{t("seller", lang)}</TabsTrigger>
        </TabsList>

        <TabsContent value="buyer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                <span>{t("browseListings", lang)}</span>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("search", lang)}
                    className="pl-8"
                    data-testid="input-search"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((l) => (
                  <Card key={l.id} className="hover-elevate" data-testid={`listing-${l.id}`}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-bold">{l.crop}</div>
                          <div className="text-xs text-muted-foreground">{l.location}</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          {l.qualityGrade}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("quantityKg", lang)}</span>
                        <span className="font-medium">{l.quantity} kg</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("pricePerKg", lang)}</span>
                        <span className="font-semibold text-green-700">₹{l.pricePerKg}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("harvestDate", lang)}</span>
                        <span>{l.harvestDate}</span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white gap-1"
                        data-testid={`button-contact-${l.id}`}
                      >
                        <Phone className="h-4 w-4" />
                        {t("contact", lang)}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-full text-center text-muted-foreground py-8">
                    {t("loading", lang).replace("...", "")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seller" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("createListing", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("crop", lang)}</Label>
                  <Input
                    value={form.crop}
                    onChange={(e) => setForm({ ...form, crop: e.target.value })}
                    data-testid="input-listing-crop"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("quantityKg", lang)}</Label>
                  <Input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                    data-testid="input-listing-quantity"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("pricePerKg", lang)}</Label>
                  <Input
                    type="number"
                    value={form.pricePerKg}
                    onChange={(e) => setForm({ ...form, pricePerKg: Number(e.target.value) })}
                    data-testid="input-listing-price"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("location", lang)}</Label>
                  <Input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    data-testid="input-listing-location"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("qualityGrade", lang)}</Label>
                  <Input
                    value={form.qualityGrade}
                    onChange={(e) => setForm({ ...form, qualityGrade: e.target.value })}
                    data-testid="input-listing-grade"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("harvestDate", lang)}</Label>
                  <Input
                    type="date"
                    value={form.harvestDate}
                    onChange={(e) => setForm({ ...form, harvestDate: e.target.value })}
                    data-testid="input-listing-harvest"
                  />
                </div>
                <Button
                  type="submit"
                  className="sm:col-span-2 bg-green-700 hover:bg-green-800 text-white gap-1"
                  data-testid="button-create-listing"
                >
                  <Plus className="h-4 w-4" /> {t("createListing", lang)}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("myListings", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {listings.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover-elevate"
                  >
                    <div>
                      <div className="font-semibold">{l.crop} · {l.quantity}kg · ₹{l.pricePerKg}/kg</div>
                      <div className="text-xs text-muted-foreground">{l.location} · {l.qualityGrade}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeListing(l.id)}
                      data-testid={`button-remove-${l.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
