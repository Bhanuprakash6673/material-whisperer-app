import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Crystal3D from "@/components/Crystal3D";
import Index from "./pages/Index";
import Predict from "./pages/Predict";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [touching, setTouching] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="fixed inset-0 z-0">
          <Crystal3D className="w-full h-full" interactive={false} forceHover={touching} />
        </div>
        <div
          className="relative z-10 pointer-events-none"
          onMouseEnter={() => setTouching(true)}
          onMouseLeave={() => setTouching(false)}
        >
          <div className="pointer-events-auto">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
