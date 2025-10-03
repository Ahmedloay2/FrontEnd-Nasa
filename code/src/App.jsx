import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

function App  (){
  const routers = createBrowserRouter([
    { path: "/", element: <Layout />, children:[
        { index: true, element: <Home /> },
        { path: "/nbl-game", element: <NBLGame /> },
        { path: "/cupola-earth", element: <CupolaEarth /> },
        { path: "/story", element: <Story /> },
        { path: "/ebook", element: <EBook /> },
        { path: "*", element: <NotFound /> }
    ]}]);

  return (
    <>
    <Starfield/>
    <RouterProvider router={routers}>  
    </RouterProvider>
    </>
  )

}


export default App;
