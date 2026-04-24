import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Phone,
  Trash2,
  Search,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp, type Listing } from "@/store/AppContext";
import { t, type LangCode } from "@/i18n/translations";
import {
  CROP_OPTIONS,
  QUALITY_GRADE_OPTIONS,
  getCropImage,
  getCropLabel,
  findOption,
} from "@/i18n/options";

type SortKey = "recent" | "low" | "high";

export default function Marketplace() {
  const { lang, listings, addListing, removeListing, profile } = useApp();
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("recent");

  const [form, setForm] = useState({
    crop: "tomato",
    quantity: 0,
    pricePerKg: 0,
    location: `${profile.village}, ${profile.state}`,
    qualityGrade: "A",
    harvestDate: new Date().toISOString().slice(0, 10),
    sellerName: profile.name,
    sellerPhone: profile.phone ?? "+91 ",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.crop || !form.quantity) return;
    addListing({
      ...form,
      rating: 4.5,
      image: getCropImage(form.crop),
    });
    setForm({ ...form, quantity: 0, pricePerKg: 0 });
  };

  const filtered = useMemo(() => {
    let list = listings.slice();
    if (cropFilter !== "all") {
      list = list.filter((l) => l.crop.toLowerCase() === cropFilter.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((l) =>
        [getCropLabel(l.crop, "en"), getCropLabel(l.crop, lang), l.location, l.sellerName].some(
          (s) => s.toLowerCase().includes(q),
        ),
      );
    }
    if (sortBy === "low") list.sort((a, b) => a.pricePerKg - b.pricePerKg);
    else if (sortBy === "high") list.sort((a, b) => b.pricePerKg - a.pricePerKg);
    else list.sort((a, b) => (a.harvestDate < b.harvestDate ? 1 : -1));
    return list;
  }, [listings, search, cropFilter, sortBy, lang]);

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

        {/* BUYER VIEW */}
        <TabsContent value="buyer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("browseListings", lang)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative sm:col-span-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("search", lang)}
                    className="pl-8"
                    data-testid="input-search"
                  />
                </div>
                <Select value={cropFilter} onValueChange={setCropFilter}>
                  <SelectTrigger data-testid="select-crop-filter">
                    <SelectValue placeholder={t("filter", lang)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allCrops", lang)}</SelectItem>
                    {CROP_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.labels[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
                  <SelectTrigger data-testid="select-sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">{t("sortRecent", lang)}</SelectItem>
                    <SelectItem value="low">{t("sortPriceLow", lang)}</SelectItem>
                    <SelectItem value="high">{t("sortPriceHigh", lang)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((l) => (
                  <BuyerCard key={l.id} listing={l} lang={lang} />
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-full text-center text-muted-foreground py-8">
                    {t("noResults", lang)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SELLER VIEW */}
        <TabsContent value="seller" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("createListing", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("cropType", lang)}</Label>
                  <Select value={form.crop} onValueChange={(v) => setForm({ ...form, crop: v })}>
                    <SelectTrigger data-testid="select-listing-crop">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CROP_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.labels[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    value={form.qualityGrade}
                    onValueChange={(v) => setForm({ ...form, qualityGrade: v })}
                  >
                    <SelectTrigger data-testid="select-listing-grade">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {QUALITY_GRADE_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.labels[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <div className="space-y-1.5">
                  <Label>{t("seller_name", lang)}</Label>
                  <Input
                    value={form.sellerName}
                    onChange={(e) => setForm({ ...form, sellerName: e.target.value })}
                    data-testid="input-listing-seller"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("call", lang)}</Label>
                  <Input
                    value={form.sellerPhone}
                    onChange={(e) => setForm({ ...form, sellerPhone: e.target.value })}
                    data-testid="input-listing-phone"
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
                {listings
                  .filter((l) => l.sellerName === profile.name)
                  .map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center gap-3 rounded-lg border p-3 hover-elevate"
                    >
                      <div
                        className="h-14 w-14 rounded-lg bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage: `url(${import.meta.env.BASE_URL}${l.image ?? getCropImage(l.crop)})`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">
                          {getCropLabel(l.crop, lang)} · {l.quantity}kg · ₹{l.pricePerKg}/kg
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {l.location} · {findOption(QUALITY_GRADE_OPTIONS, l.qualityGrade)?.labels[lang]}
                        </div>
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
                {listings.filter((l) => l.sellerName === profile.name).length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    {t("noResults", lang)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BuyerCard({ listing, lang }: { listing: Listing; lang: LangCode }) {
  const cropLabel = getCropLabel(listing.crop, lang);
  const total = listing.quantity * listing.pricePerKg;
  const grade = findOption(QUALITY_GRADE_OPTIONS, listing.qualityGrade)?.labels[lang];
  const harvestDate = new Date(listing.harvestDate);
  const daysSinceHarvest = Math.floor((Date.now() - harvestDate.getTime()) / 86400000);
  const isFresh = daysSinceHarvest <= 3;

  return (
    <Card
      className="overflow-hidden hover-elevate flex flex-col"
      data-testid={`listing-${listing.id}`}
    >
      <div
        className="h-44 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${listing.image ?? getCropImage(listing.crop)})` }}
      >
        <div className="absolute top-2 left-2 flex gap-1.5">
          <Badge className="bg-green-700 text-white border-0 shadow-md">
            {listing.qualityGrade}
          </Badge>
          {isFresh && (
            <Badge className="bg-amber-500 text-white border-0 shadow-md gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {t("freshlyHarvested", lang)}
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 rounded-full bg-white/95 dark:bg-black/80 px-2 py-1 flex items-center gap-1 shadow">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span className="text-xs font-bold">{listing.rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-lg font-bold">{cropLabel}</div>
            <div className="text-xs text-muted-foreground">{grade}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-700">₹{listing.pricePerKg}</div>
            <div className="text-xs text-muted-foreground">/ kg</div>
          </div>
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>
              {listing.quantity} kg {t("available", lang)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {t("harvestDate", lang)}: {listing.harvestDate}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 px-3 py-2 border border-green-200 dark:border-green-900/40">
          <div className="text-xs text-muted-foreground">{t("totalPrice", lang)}</div>
          <div className="text-lg font-bold text-green-800 dark:text-green-300">
            ₹{total.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2 mt-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>{t("verifiedFarmer", lang)}: {listing.sellerName}</span>
          </div>
        </div>

        <Button
          size="sm"
          className="w-full bg-green-700 hover:bg-green-800 text-white gap-1.5"
          onClick={() => window.open(`tel:${listing.sellerPhone}`)}
          data-testid={`button-contact-${listing.id}`}
        >
          <Phone className="h-4 w-4" />
          {t("contact", lang)}
        </Button>
      </CardContent>
    </Card>
  );
}
