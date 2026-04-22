import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Web3Provider } from "@/lib/web3/Web3Provider";
import { Layout } from "./components/Layout";
import Landing from "./pages/Landing";
import Swarm from "./pages/Swarm";
import Fitness from "./pages/Fitness";
import Evolution from "./pages/Evolution";
import Integration from "./pages/Integration";
import Graduation from "./pages/Graduation";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3Provider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/swarm" element={<Swarm />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/evolution" element={<Evolution />} />
              <Route path="/integration" element={<Integration />} />
              <Route path="/graduation" element={<Graduation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </Web3Provider>
  </QueryClientProvider>
);

export default App;
