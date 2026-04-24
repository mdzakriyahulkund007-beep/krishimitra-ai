import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Brain,
  CloudSun,
  ShoppingCart,
  ListChecks,
  Bell,
  Sprout,
  Network,
  User,
  Leaf,
} from "lucide-react";
import { useApp } from "@/store/AppContext";
import { t } from "@/i18n/translations";
import { LanguageSelector } from "./LanguageSelector";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/", key: "dashboard", icon: LayoutDashboard },
  { path: "/advisory", key: "advisory", icon: Brain },
  { path: "/weather", key: "weather", icon: CloudSun },
  { path: "/marketplace", key: "marketplace", icon: ShoppingCart },
  { path: "/tasks", key: "tasks", icon: ListChecks },
  { path: "/alerts", key: "alerts", icon: Bell },
  { path: "/soil-pest", key: "soilPest", icon: Sprout },
  { path: "/agents", key: "multiAgent", icon: Network },
  { path: "/profile", key: "profile", icon: User },
];

export function Layout({ children }: { children: ReactNode }) {
  const { lang, profile } = useApp();
  const [location] = useLocation();
  const isRTL = lang === "ur";

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white shadow-md">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">{t("appName", lang)}</div>
              <div className="text-xs text-muted-foreground leading-tight">
                {t("tagline", lang)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/profile"
              className="hidden md:flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1.5 text-sm hover-elevate"
              data-testid="link-profile"
            >
              <User className="h-4 w-4 text-green-700" />
              <span className="font-medium">{profile.name}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex sticky top-16 h-[calc(100vh-4rem)] w-64 flex-col border-r bg-card overflow-y-auto">
          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(({ path, key, icon: Icon }) => {
              const active = location === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover-elevate",
                    active
                      ? "bg-green-700 text-white"
                      : "text-foreground",
                  )}
                  data-testid={`link-nav-${key}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t(key, lang)}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-3 text-xs text-muted-foreground border-t">
            {t("appName", lang)} v1.0
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">{children}</div>

          {/* Mobile bottom nav */}
          <div className="md:hidden sticky bottom-0 z-20 border-t bg-card/95 backdrop-blur">
            <div className="grid grid-cols-5 gap-0">
              {NAV.slice(0, 5).map(({ path, key, icon: Icon }) => {
                const active = location === path;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={cn(
                      "flex flex-col items-center justify-center py-2 text-[10px]",
                      active ? "text-green-700" : "text-muted-foreground",
                    )}
                    data-testid={`link-mobile-${key}`}
                  >
                    <Icon className="h-5 w-5 mb-0.5" />
                    <span className="truncate max-w-full px-1">{t(key, lang)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
