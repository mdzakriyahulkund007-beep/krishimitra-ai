import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Advisory from "@/pages/Advisory";
import Weather from "@/pages/Weather";
import Marketplace from "@/pages/Marketplace";
import Tasks from "@/pages/Tasks";
import Alerts from "@/pages/Alerts";
import SoilPest from "@/pages/SoilPest";
import MultiAgent from "@/pages/MultiAgent";
import MandiPrices from "@/pages/MandiPrices";
import Profile from "@/pages/Profile";
import { Layout } from "@/components/Layout";
import { AppProvider } from "@/store/AppContext";
import { initVoices } from "@/utils/voice";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/advisory" component={Advisory} />
        <Route path="/weather" component={Weather} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/soil-pest" component={SoilPest} />
        <Route path="/agents" component={MultiAgent} />
        <Route path="/mandi" component={MandiPrices} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  useEffect(() => {
    initVoices();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
