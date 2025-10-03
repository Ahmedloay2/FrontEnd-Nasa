import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Starfield from "./components/ui/Starfield/Starfield";
import Home from "./pages/Home/Home";
import NBLGame from "./pages/NBLGame/NBLGame";
import CupolaEarth from "./pages/CupolaEarth/CupolaEarth";
import Story from "./pages/Story/Story";
import EBook from "./pages/EBook/EBook";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="app-container">
        <Starfield />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nbl-game" element={<NBLGame />} />
            <Route path="/cupola-earth" element={<CupolaEarth />} />
            <Route path="/story" element={<Story />} />
            <Route path="/ebook" element={<EBook />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
