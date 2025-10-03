import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Starfield from "./components/Starfield";
import Home from "./pages/Home";
import NBLGame from "./pages/NBLGame";
import CupolaEarth from "./pages/CupolaEarth";
import Story from "./pages/Story";
import EBook from "./pages/EBook";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Starfield />
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nbl-game" element={<NBLGame />} />
            <Route path="/cupola-earth" element={<CupolaEarth />} />
            <Route path="/story" element={<Story />} />
            <Route path="/ebook" element={<EBook />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
