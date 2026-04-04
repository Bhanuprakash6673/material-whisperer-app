import { useState, useEffect, useCallback } from "react";
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
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Cursor glow */}
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: 220,
            height: 220,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 35%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="relative min-h-screen"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="fixed inset-0 z-0">
            <Crystal3D className="w-full h-full" interactive={false} forceHover={hovered} />
          </div>
          <div className="relative z-10">
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
